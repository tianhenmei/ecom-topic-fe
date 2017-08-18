var merge = require('merge'),
    nodeExternals = require('webpack-node-externals'),
    VueSSRServerPlugin = require('vue-server-renderer/server-plugin');


module.exports = {
    // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
    // 并且还会在编译 Vue 组件时，
    // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
    target: 'node',
    // 对 bundle renderer 提供 source map 支持
    devtool: 'source-map',
    entry:'./server-renderer/editorPC/h5/entry-server.js',

}