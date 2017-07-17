var gulp = require('gulp');
var fs = require("fs");
var path = require("path");
var express = require("express");
// 暂未找到browserify编译打包.vue 文件，修改使用webpack方式
var webpack = require('webpack');
var getConfig = require('./build/config.js').getConfig;
// 连接服务器
var webpackDev = require('webpack-dev-middleware');
var webpackHot = require('webpack-hot-middleware');
// 生成编译后文件
var mkdirp = require('mkdirp');
// 其他
// chalk : 给打印添加色彩
var chalk = require('chalk');
// gulp-upload: 上传文件到服务器上
var upload = require('gulp-upload');
// rimraf: 删除过去生成的hash版本js、css
var rimraf = require('rimraf');
// glob 动态获取入口文件
var glob = require('glob');
// gulp-watch 动态监听.vue文件
var watch = require('gulp-watch');
// memory-fs 将内存的文件保存为实际文件
var memoryFS = require('memory-fs');
// 编译es6->es5
var babel = require('gulp-babel');
// 将es6编译后的es5打包（require浏览器不识别）
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var through2 = require('through2');
var rename = require('gulp-rename');
// gulp-clean-css gulp 压缩css
var cleanCSS = require('gulp-clean-css');
// gulp-sass gulp 监听scss文件，输出css文件
var scss = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

// 创建一个express实例
var app = express();

var src = './src',
    dist = './dist',
    js_src = './publish',
    js_dist = './publish';

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

/********************************************************************
 * compile: 将es6 打包成 es5
 * ****************************************************/
gulp.task('compile:es6',function(){
    var file = js_src+'/'+argv[4]
    return gulp.src(file+'/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest(js_dist+'/'+argv[4]));
});
/********************************************************************
 * compile: 将es6 打包成 es5 后能在浏览器上直接调用
 * ****************************************************/
gulp.task('compile:browser',['compile:es6'],function(){
    var initJSPath = js_dist+'/'+argv[4]
    return gulp.src(initJSPath+'/**/*.js')
        .pipe(through2.obj(function(file, enc, next) {
            var folder = file.path.split(/\//g),
                filename = folder[folder.length - 1],
                filePath = folder.slice(0,folder.length-1).join('/'),
                bundlePath = file.path.replace(/(\.js)?$/, '.bundle.js'),
                extname = /(.bundle)/g.test(filename) ? '.js' : '.bundle.js';

            browserify(file.path)
                // .transform(reactify)
                .bundle(function(err, res) {
                    err && console.log(err.stack);
                    file.contents = res;
                    next(null, file);
                })
                .pipe(source(filename))
                .pipe(rename({
                    extname:extname,//'.bundle.js'
                }))
                .pipe(gulp.dest(filePath));
    }));
});


gulp.task('compile',['compile:es6','compile:browser']);

/********************************************************************
 * dev: 将es6 打包成 es5，同时将vue文件打包成js使用浏览器访问
 * ****************************************************/

/********************************************************************
 * create: 新建项目或新建某个项目中的组件
 * ****************************************************/
gulp.task('create:componet',function(){
    if(params.create.components){
        let arr = params.create.components.split(/\//g),
            name = arr[0],
            style = arr.length > 1 ? arr[1] : 'style1',
            dir = './src/'+params.create.sys+'/components/',
            filepath = dir + params.create.components,
            demopath = dir+'/demo/style1',
            isExist = fs.existsSync(filepath)

        if(!isExist){
            console.log('Starting creating...')
            mkdirp(filepath, function(err) {
                if (err) console.error(err)
            })
            fs.readdir(demopath,function(err,files){
                var i = 0,
                    newpath = ''
                for(i = 0; i < files.length; i++){
                    newpath = path.join(demopath,files[i])
                    gulp.src(newpath)
                        .pipe(gulp.dest(filepath))
                }
                console.log('创建成功')
            })
        }else{
            fs.readdir(dir+name,function(err,files){
                if(err){
                    console.log(err.message)
                    return
                }
                var start = 'style'.length,
                    curr = 1,
                    num = 1
                for(var i = 0; i < files.length; i++){
                    curr = parseInt(files[i].slice(start))
                    if(curr > num){
                        num = curr
                    }
                }
                console.log(chalk.red('【创建失败，当前目录已存在！】')+chalk.yellow('您可以创建: style'+(num+1)))
            })
        }
    }
})
gulp.task('create:system',function(){
    if(!params.create.components){
        let dir = './src/'+params.create.sys,
            isExist = fs.existsSync(dir)

        if(!isExist){
            console.log('Starting creating...')
            mkdirp(dir, function(err) {
                if (err) console.error(err)
            })
            console.log('创建成功')
        }else{
            console.log(chalk.red('【创建失败，当前项目已存在！请重新起名！】'))
        }
    }
})
// npm run create -- --sys:editorPC --components:test/style1
// 新建项目editorPC的组件，类型: test ，样式：style1
gulp.task('create',['create:componet','create:system'],function(){
    
});
/********************************************************************
 * create: 新建项目或新建某个项目中的组件
 * ****************************************************/





gulp.task('dev:client',function(){
    
});

function watchFileCompile(config){
    let fileDir = path.join(config.output.path)
    !fs.existsSync(fileDir) && mkdirp(fileDir, function(err) {
        if (err) console.error(err)
    })
    let compiler = webpack(config),
        mfs = new memoryFS();
    compiler.outputFileSystem = mfs
    compiler.run((err,stats) => {
        let filePath = path.join(config.output.path, config.output.filename),
            reader = mfs.createReadStream(filePath)
        reader.pipe(fs.createWriteStream(filePath))
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');
    })
}

gulp.task('dev:watch',function(){
    var systemName = params.dev.sys
    if(!systemName) return
    watch('./src/'+systemName+'/components*/*/*/*.vue')
        .on('change',function(filepath){
            console.log('watch vue change: '+filepath)
            var dirArr = path.dirname(filepath).split('/'),
                componentsname = dirArr[dirArr.length-3],
                modulename = dirArr[dirArr.length-2],
                dirname = dirArr[dirArr.length-1],
                filename = path.basename(filepath).split('.')[0]

            var config = Object.assign({},getConfig(systemName,modulename+'_'+dirname,'vuePlugins'),{
                entry: path.resolve(__dirname,`./src/${systemName}/${componentsname}/${modulename}/${dirname}/${filename}.vue`),
                output: {
                    path: path.resolve(__dirname,'./dist/'+systemName+'/'+componentsname+'/'),//path.resolve(__dirname, `../dist/${systemName}/js/`),
                    publicPath: '',
                    filename:modulename+'_'+dirname+'.js',
                    hashDigestLength:8
                }
            })

            watchFileCompile(config)
        })
    watch('./src/'+systemName+'/components*/*/*/*.js')
        .on('change',function(filepath){
            var dirArr = path.dirname(filepath).split('/'),
                componentsname = dirArr[dirArr.length-3],
                modulename = dirArr[dirArr.length-2],
                dirname = dirArr[dirArr.length-1],
                filename = path.basename(filepath).split('.')[0],
                narr = componentsname.split(/[-]/g),
                type = narr.length > 1 ? '_'+narr[1] : ''

            var config = Object.assign({},getConfig(systemName,modulename+'_'+filename,'jsPlugins'),{
                entry: path.resolve(__dirname,`./src/${systemName}/${componentsname}/${modulename}/${dirname}/${filename}.js`),
                output: {
                    path: path.resolve(__dirname,'./dist/'+systemName+'/publish/js'),//path.resolve(__dirname, `../dist/${systemName}/js/`),
                    publicPath: '',
                    filename:modulename+'_'+dirname+type+'.js',
                    hashDigestLength:8
                }
            })
            watchFileCompile(config)
        })
    watch('./src/'+systemName+'/components*/common/*.js')
        .on('change',function(filepath){
            var dirArr = path.dirname(filepath).split('/'),
                componentsname = dirArr[dirArr.length-3],
                filename = path.basename(filepath).split('.')[0]

            var config = Object.assign({},getConfig(systemName,filename,'jsPlugins'),{
                entry: path.resolve(__dirname,`./src/${systemName}/${componentsname}/common/${filename}.js`),
                output: {
                    path: path.resolve(__dirname,'./dist/'+systemName+'/publish/js'),//path.resolve(__dirname, `../dist/${systemName}/js/`),
                    publicPath: '',
                    filename:filename+'.js',
                    hashDigestLength:8
                }
            })

            watchFileCompile(config)
        })
        .on('unlink',function(filepath){
            var dirArr = filepath.split('/'),
                filename = dirArr[dirArr.length-1].split('.')[0]
            fs.unlink(path.resolve(__dirname,'./dist/'+systemName+'/publish/js/'+filename+'.js'))
        })
    watch('./src/'+systemName+'/components*/*/*/*.scss')
        .on('change', function(filepath) {
            var dirArr = path.dirname(filepath).split('/'),
                componentsname = dirArr[dirArr.length-3],
                modulename = dirArr[dirArr.length-2],
                dirname = dirArr[dirArr.length-1],
                filename = path.basename(filepath).split('.')[0],
                narr = componentsname.split(/[-]/g),
                type = narr.length > 1 ? '_'+narr[1] : ''

            gulp.src(path.resolve(__dirname,`./src/${systemName}/${componentsname}/${modulename}/${dirname}/${filename}.scss`))
                .pipe(scss().on('error', function(error){
                    console.log(error)
                }))
                .pipe(rename({
                    basename:filename,
                    extname: '.css'
                }))
                .pipe(postcss([autoprefixer()]))
                .pipe(cleanCSS({compatibility: 'ie8'}))
                .pipe(gulp.dest(path.resolve(__dirname,`./src/${systemName}/${componentsname}/${modulename}/${dirname}/`)))
                .pipe(rename({
                    basename:modulename+'_'+dirname,
                    extname: '.css'
                }))
                .pipe(gulp.dest(path.resolve(__dirname,'./dist/'+systemName+'/'+componentsname+'/')));
        })
        .on('unlink',function(filepath){
            var dirArr = filepath.split('/'),
                componentsname = dirArr[dirArr.length-4],
                modulename = dirArr[dirArr.length-3],
                dirname = dirArr[dirArr.length-2],
                filename = dirArr[dirArr.length-1].split('.')[0]
            console.log(filepath)
            fs.unlink(path.resolve(__dirname,`./src/${systemName}/${componentsname}/${modulename}/${dirname}/${filename}.css`))
        })
    watch('./src/'+systemName+'/components*/*/*/*.css')
        .on('change', function(filepath) {
            var dirArr = path.dirname(filepath).split('/'),
                componentsname = dirArr[dirArr.length-3],
                modulename = dirArr[dirArr.length-2],
                dirname = dirArr[dirArr.length-1],
                filename = path.basename(filepath).split('.')[0],
                narr = componentsname.split(/[-]/g),
                type = narr.length > 1 ? '_'+narr[1] : ''

            gulp.src(path.resolve(__dirname,`./src/${systemName}/${componentsname}/${modulename}/${dirname}/${filename}.css`))
                // .pipe(scss().on('error', gutil.log))
                .pipe(rename({
                    basename:modulename+'_'+dirname,
                    extname: '.css'
                }))
                // .pipe(postcss([autoprefixer()]))
                .pipe(cleanCSS({compatibility: 'ie8'}))
                .pipe(gulp.dest(path.resolve(__dirname,'./dist/'+systemName+'/'+componentsname+'/')));
        })
        .on('unlink',function(filepath){
            console.log(filepath)
            var dirArr = filepath.split('/'),
                componentsname = dirArr[dirArr.length-4],
                dirname = dirArr[dirArr.length-3],
                filename = dirArr[dirArr.length-2],
                narr = componentsname.split(/[-]/g),
                type = narr.length > 1 ? '_'+narr[1] : ''
            fs.unlink(path.resolve(__dirname,'./dist/'+systemName+'/'+componentsname+'/'+dirname+'_'+filename+'.css'))
        })
})

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

gulp.task('dev:server',function(){
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
});

gulp.task('dev',['dev:watch','dev:client', 'dev:server']);

gulp.task('dist:client-h5',function(){
    var systemName = params.dist.sys
    if(!systemName) return
    
    var clientConfig = require('./build/webpack.client.config')();
    let fileDir = path.join(clientConfig.output.path)
    !fs.existsSync(fileDir) && mkdirp(fileDir, function(err) {
        if (err) console.error(err)
    })
    rimraf(fileDir+'/components-h5-js',(err) => {
        if (err) throw err;
        webpack(clientConfig, function(err, stats) {
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n');
        });
    })
})

gulp.task('dist:server-h5',function(){
    var systemName = params.dist.sys
    if(!systemName) return
    
    var serverConfig = require('./build/webpack.server.config.js')();
    let fileDir = path.join(serverConfig.output.path)
    !fs.existsSync(fileDir) && mkdirp(fileDir, function(err) {
        if (err) console.error(err)
    })
    rimraf(fileDir+'/components-h5-js',(err) => {
        if (err) throw err;
        webpack(serverConfig, function(err, stats) {
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n');
        });
    })
});

gulp.task('dist:pc',function(){
    var systemName = params.dist.sys
    if(!systemName) return
    
    var serverConfig = Object.assign({},getConfig(systemName,'index','distPlugins'),{
        entry:{
            lib:['vue','vuex'],
            index:[
                path.resolve(__dirname,`./src/${systemName}/js/index.js`)
            ]
        },
        output:{
            path: path.resolve(__dirname,'./dist',systemName+'/'),
            publicPath: '',
            filename: 'js/[name].[hash].js',
            hashDigestLength:8
        }
    });
    let fileDir = path.join(serverConfig.output.path)
    !fs.existsSync(fileDir) && mkdirp(fileDir, function(err) {
        if (err) console.error(err)
    })
    rimraf(fileDir+'/js',(err) => {
        if (err) throw err;
        webpack(serverConfig, function(err, stats) {
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n');
        });
    })
})

gulp.task('dist',['dist:pc','dist:client-h5','dist:server-h5']);

/** 推送线上单台 */
gulp.task('upload', function() {
    return gulp.src(['dist/**/*'])
    .pipe(upload({
        server: 'http://receiver1.lagou.com/upload',
        data: {
            to: (file) => {
                let src = file.history[0].replace(path.resolve(__dirname, 'dist'), '')
                           .replace(/^[\\\/]/, '')
                           .replace(/^template[\\\/]/i, '');

                let dst = `/data/data/static/topic/${src}`;

                if ( /[\\\/]index\.html$/i.test(src) ) {
                    dst = `/data/data/ecom/topic/${src}`;
                }
                
                console.log(chalk.cyan(src) + chalk.yellow(' => ') + chalk.magenta(dst)); // 打印提示信息

                return dst;
            }
        }
    }));
})