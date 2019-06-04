const moment = require('moment')
const {footprintModel} = require('../models')
const axios = require('axios')

const controllers = {
  async queryFootprints (req, res, next) {
    const page = req.query.page || 1
    const limit = req.query.per_page || 10
    try {
      const totalCount = await footprintModel.countDocuments()
      const footprints = await footprintModel.find ({}, 'name value date', {sort:{date_created: -1}, limit, skip: limit * (page - 1)})
      res.set('x-total-count', totalCount).send(footprints)
    } catch (e) {
      console.log(e)
      res.status(500).send('出了点错误')
    }
  },
  createFootprint (req, res, next) {
    const {body: {name, city, date}} = req
    if (name && city && date) {
      axios.get(`http://api.map.baidu.com/place/v2/search?query=${encodeURI(name)}&region=${encodeURI(city)}&city_limit=${encodeURI(city)}&output=json&ak=kNZgnH8dtsRDqktE9MYxAaItB3HyYG94`).then(({data = {}}) => {
        if(data.status === 0) {
          const {results} = data
          let footprint = new footprintModel({name, date, value: [results[0].location.lat, results[0].location.lng]})
          footprint.save(function (err, footprint) {
            if (err) {
              console.log(err)
              res.status(500).send('error');
            } else {
              res.status(201).send(footprint)
            }
          })
        } else {
          res.status(500).send('百度请求出错');
        }
      }).catch(err => {
        res.status(500).send('百度请求出错');
      })
    } else {
      res.status(400).send('Bad Request');
    }
  },
  deleteFootprint (req, res, next) {
    const _id = req.params.id
    footprintModel.remove({_id}, (err, docs) => {
      if(err){
        console.log(err)
        res.status(400).send('Bad Request')
      }
      res.status(204).send('删除成功:' + docs)
    })
  }
}

module.exports = controllers
