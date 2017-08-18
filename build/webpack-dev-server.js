var fs = require("fs");
var path = require("path");
var webpack = require('webpack');
var getConfig = require('./build/config.js').getConfig;

//获取任务参数 
var params = {}, argv = process.argv
params[argv[2]] = (argv.length > 2) && argv.slice(3).reduce(function(res, p) {
    var segs = p.slice(2).split(/[:]/g);
    if(segs.length < 2 && argv[1] == 'dev') {
        return console.log(chalk.red('[用法错误]') + ` 参数${p}必须用:分隔`)
    }
    res[segs[0]] = segs[1]
    return res
}, {}) || {}

function getEntries(systemName){
    var files = glob.sync('./src/'+systemName+'/components/*/*/*.vue');
    var newEntries = files.reduce(function(memo, file) {
        var dirArr = path.dirname(file).split('/'),
            modulename = dirArr[dirArr.length-2],
            dir = dirArr[dirArr.length-1],
            name = path.basename(file).split('.')[0]
        memo[modulename+'_'+dir] = path.resolve(__dirname,file)
        return memo
    }, {});
    return newEntries;
}

function webpackCompile(){
    var systemName = params.dev.sys
    if(!systemName) return
    var component = params.dev.component
    
    var serverConfig = getConfig(systemName,'index');
    if(component){  // 单独组件开发

    }else{  // 所有组件
        var cpath = getEntries(systemName)
        Object.assign(serverConfig.entry,cpath)
    }
    // 调用webpack并把配置传递过去
    var compiler = webpack(serverConfig)
    // 使用 webpack-dev-middleware 中间件
    var devMiddleware = webpackDev(compiler, {
        publicPath: serverConfig.output.publicPath,
        stats: {
            colors: true,
            chunks: false
        }
    })
    // 使用 webpack-hot-middleware 中间件
    var hotMiddleware = webpackHot(compiler)
    // webpack插件，监听html文件改变事件
    compiler.plugin('compilation', function (compilation) {
        compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
            // 发布事件
            hotMiddleware.publish({ action: 'reload' })
            cb()
        })
    })

    
    // 注册中间件
    app.use(devMiddleware)
    app.use(hotMiddleware)
    // 监听 8090端口，开启服务器
    app.listen(8090, function (err) {
        if (err) {
            console.log(err)
            return
        }
        console.log('Listening at http://localhost:8090')
    })
}
