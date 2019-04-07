const {qiniu_AccessKey, qiniu_SecretKey, port, token_secret} = require ('../../config')
const jwt = require ('jsonwebtoken')
const qiniu = require ('qiniu')
const moment = require ('moment')
const {userModel} = require ('../models')

const controllers = {
  login (req, res, next) {
    const {username, password} = req.body
    if (username && password) {
      userModel.findOne ({username, password: password}, (err, user) => {
        if (err) {
          console.log (err)
          return
        }
        console.log (user)
        if (user) {
          let payload = {
            username,
            admin: true
          }
          let token = jwt.sign (payload, token_secret)
          res.cookie ('token', token)
          res.send ('登陆成功')
        } else {
          res.status (403).send ('未找到用户')
        }
      })
    } else {
      res.status (400).send ('参数错误')
    }
  },
  register (req, res, next) {
    const {username, password} = req.body
    if (username && password) {
      userModel.findOne ({username}, (err, user) => {
          if (err) {
            console.log (err)
            return
          }
          if (!user) {
            let user = new userModel ({username, password})
            user.save ((err, user) => {
              if (err) {
                console.log (err)
                return
              }
              if (user) {
                let payload = {
                  username,
                  admin: true
                }
                let token = jwt.sign (payload, token_secret)
                res.cookie ('token', token)
                res.send ('登陆成功')
              }
            })
          } else {
            res.status (400).send ('该用户名已注册')
          }
        }
      )
    } else {
      res.status (400).send ('参数错误')
    }
  },
  checkAuth (req, res, next) {
    const {token} = req.cookies
    if (token) {
      jwt.verify (token, token_secret, (err, decoded) => {
        if (err) {
          console.log (err)
          return
        }
        if (decoded && decoded.username) {
          // userModel.findOne ({username: decoded.username}, (err, user) => {
          //   if (err) {
          //     console.log (err)
          //     return
          //   }
          //   if (user) {
          //     next ()
          //   } else {
          //     res.clearCookie ('token')
          //     res.status (403).send ('未找到用户')
          //   }
          // })
          next ()
        } else {
          res.clearCookie ('token')
          res.status (403).send ('未找到用户')
        }
      })
    } else {
      res.status (403).send ('未登录')
    }
  },
  getQiniuToken (req, res, next) {
    let mac = new qiniu.auth.digest.Mac (qiniu_AccessKey, qiniu_SecretKey)
    let putPolicy = new qiniu.rs.PutPolicy ({scope: 'sombra'})
    var uploadToken = putPolicy.uploadToken (mac)
    res.send ({token: uploadToken})
  }
}

module.exports = controllers
