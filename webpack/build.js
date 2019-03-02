const webpack = require('webpack')
const prodConfig = require('./webpack.prod.conf')

webpack(prodConfig, (err, stats) => {
  if(err){
    console.log(err)
  }
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }))
})
