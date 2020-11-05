const path = require('path')
const { name } = require('./package')

// 转发地址
// const targetUrl = process.env.PROXY_URL

function resolve(dir) {
  return path.join(__dirname, dir)
}

// console.log(resolve('src'))

const port = 7101 // dev port

// vue.config.js
module.exports = {
  // 选项...
  // publicPath: process.env.NODE_ENV === 'production' ? process.env.PUBLIC_PATH : '/',
  // indexPath: path.resolve(__dirname, process.env.INDEX_PATH),
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  devServer: {
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    // port: 7101,
    watchOptions: {
      ignored: /node_modules/,
    },
    // proxy: {
    //   '/api': {
    //     target: targetUrl,
    //     changeOrigin: true,
    //   },
    //   '/upload': {
    //     target: targetUrl,
    //     changeOrigin: true,
    //   },
    // },
  },
  configureWebpack: {
    // entry: {
    //   app: './src/main.js',
    // },
    resolve: {
      alias: {
        // src: resolve('src'),
        '@': resolve('src'),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('src', resolve('src'))
  // },
}
