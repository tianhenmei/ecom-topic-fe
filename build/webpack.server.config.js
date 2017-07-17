const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

function getServerConfig(){
    return merge(baseConfig, {
        // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
        // 并且还会在编译 Vue 组件时，
        // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
        target: 'node',
        // 对 bundle renderer 提供 source map 支持
        devtool: 'source-map',
        // 将 entry 指向应用程序的 server entry 文件
        entry: './src/editorPC/entry-server.js',
        // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
        output: {
            libraryTarget: 'commonjs2'
        },
        // https://webpack.js.org/configuration/externals/#function
        // https://github.com/liady/webpack-node-externals
        // 外置化应用程序依赖模块。可以使服务器构建速度更快，
        // 并生成较小的 bundle 文件。
        externals: nodeExternals({
            // 不要外置化 webpack 需要处理的依赖模块。
            // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
            // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
            whitelist: /\.css$/
        }),
        // 这是将服务器的整个输出
        // 构建为单个 JSON 文件的插件。
        // 默认文件名为 `vue-ssr-server-bundle.json`
        plugins: [
            // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
            // 以便可以在之后正确注入异步 chunk。
            // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
            // new webpack.optimize.CommonsChunkPlugin({
            // name: "manifest",
            // minChunks: Infinity
            // }),
            // 此插件在输出目录中
            // 生成 `vue-ssr-client-manifest.json`。
            new VueSSRServerPlugin()
        ]
    })
}

module.exports = getServerConfig