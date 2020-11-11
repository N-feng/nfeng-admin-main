const { override, overrideDevServer, fixBabelImports, addWebpackAlias } = require('customize-cra')
const path = require('path');
const { name } = require('./package');
const webpack = require('webpack');
// 打包配置
const addCustomize = () => config => {

  config.entry = config.entry.filter(
    (e) => !e.includes('webpackHotDevClient')
  );

  config.output.library = `${name}-[name]`;
  config.output.libraryTarget = 'umd';
  config.output.jsonpFunction = `webpackJsonp_${name}`;
  config.output.globalObject = 'window';

  config.plugins = config.plugins.filter(
    (p) => !(p instanceof webpack.HotModuleReplacementPlugin)
  );

  return config;
}
// 跨域配置
const devServerConfig = () => config => {
  return {
    ...config,
    // 服务开启gzip
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    hot: false,
    watchContentBase: false,
    liveReload: false,
    proxy: {
      '/api': {
        target: 'https://openadmintest92.aiyuangong.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        }
      }
    }
  }
}
module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    addWebpackAlias({
      '@': path.resolve(__dirname, './src'),
    }),
    addCustomize(),
  ),
  devServer: overrideDevServer(
    devServerConfig()
  )
}
