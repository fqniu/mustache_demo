const path = require('path')
module.exports = {
  // 开发模式
  mode:'development',
  // 入口
  entry:'./src/index.js',
  // 出口
  output:{
    filename:'bundle.js'
  },
  devServer:{
    // 静态文件根目录
    contentBase:path.join(__dirname,"www"),
    // 不压缩
    compress:false,
    // 端口号
    port:8080,
    // 虚拟打包的路径，bundle.js文件没有真正的生成
    // 这个可以把 www 路径下的文件显示出来 虚拟打包到/xuni/ 路径中
    publicPath:'/xuni/'
  }
}