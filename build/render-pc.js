var fs = require('fs');
var path = require('path');
var Vue = require('vue'),
    serverRenderer = require('vue-server-renderer') ,
    LRU = require('lru-cache'),
    setupDevServer = require('../build/setup-dev-server.js'),
    { createBundleRenderer } = serverRenderer,
    // createAppH5 = require('./server-app-h5.js'),
    resolve = file => path.resolve(__dirname, file),
    templatePC = fs.readFileSync(resolve('../server-renderer/editorPC/pc/index.html'), 'utf-8'),
    isProd = process.env.NODE_ENV === 'production',
    // renderPath: 渲染H5时，替换编辑页面用到的http://localhost:9000/
    renderPath = isProd ? 'http://topic.lagou.com/v3/' : '/'

function writeFile(path,string,saveDone,status){
    switch(status){
        case 200:
            break
        default:
            saveDone(status)
            break
    }
    fs.writeFile(path,string,function(err) {
        if(err) {
            return console.log(err);
        }
        console.log('UPDATE PC: '+path);
        switch(status){
            case 200:
                console.log('PC保存成功！')
                saveDone(status)
                break
        }
    });
}

function createRenderer (bundle, options) {
	return createBundleRenderer(bundle, Object.assign(options, {
        template:templatePC,// （可选）页面模板
        inject: false,
		// for component caching
		cache: LRU({
			max: 1000,
			maxAge: 1000 * 60 * 15
		}),
		// this is only needed when vue-server-renderer is npm-linked
		basedir: resolve('./dist'),
		// recommended for performance
		runInNewContext: false
	}))
}

function render (filename,filePath,pagedata,data,renderer,res,saveDone) {
    let elemdataStr = '#PAGEDATASTART#'+JSON.stringify(pagedata)+'#PAGEDATAEND#',
        context = {
            elemdata:elemdataStr
        }
	const s = Date.now()
    console.log('PC Rendering '+filename)
	const handleError = err => {
		if(err.code === 404) {
            writeFile(filePath,'404 | Page Not Found',saveDone,404)
            // res.json({
            //     state:404,
            //     success:true,
            //     message:'页面不存在'
            // });
            // saveDone(404)
		} else {
			// Render Error Page or Redirect
            writeFile(filePath,'500 | Internal Server Error',saveDone,500)
            // res.json({
            //     state:200,
            //     success:true,
            //     message:'页面渲染失败'
            // });
            // saveDone(500)
		}
	}
    console.log('Starting to render PC ......')
	renderer.renderToString({
        filename,
        pagedata,
        data,
        elemdata:elemdataStr
    }, (err, html) => {
		if (err) {
            console.log(err)
			return handleError(err)
        }
        writeFile(filePath,html.replace(/(http:\/\/localhost:9000\/)/g,renderPath),saveDone,200)
        // console.log('PC保存成功！')
        // res.json({
        //     state:200,
        //     success:true,
        //     message:'保存成功'
        // });
        // saveDone(200)
		if (!isProd) {
			console.log(`whole request: ${Date.now() - s}ms`)
		}
	})
}

module.exports = function writeHTML(router,filename,filePath,pagedata,data,res,saveDone){
    let renderer = null,
        readyPromise
    if(isProd){
        // In production: create server renderer using built server bundle.
        // The server bundle is generated by vue-ssr-webpack-plugin.
        const bundle = require(path.resolve(__dirname,'../dist/editorPC/js-pc/vue-ssr-server-bundle.json'))
        // The client manifests are optional, but it allows the renderer
        // to automatically infer preload/prefetch links and directly add <script>
        // tags for any async chunks used during render, avoiding waterfall requests.
        const clientManifest = require(path.resolve(__dirname,'../dist/editorPC/js-pc/vue-ssr-client-manifest.json'))
        renderer = createRenderer(bundle, {
            clientManifest
        })
        render(filename,filePath,pagedata,JSON.parse(data),renderer,res,saveDone)
    } else {
        readyPromise = setupDevServer(router,'pc', (bundle, options) => {
            renderer = createRenderer(bundle, options)
        })
        console.log('Start writing HTML pc......')
        readyPromise.then(() => {
            render(filename,filePath,pagedata,JSON.parse(data),renderer,res,saveDone)
        })
    }
}

// exports.writeHTML = function(pageHTML,filePath,pagedata){
//     var elemdataStr = '#PAGEDATASTART#'+JSON.stringify(pagedata)+'#PAGEDATAEND#', 
//         app = new Vue({
//             template:'<div class="main">'+pageHTML.trim()+'</div>'
//         }),
//         renderer = serverRenderer.createRenderer({
//             template: fs.readFileSync(path.resolve(__dirname,'../server-renderer/editorPC/pc/index.html'), 'utf-8')
//         }),
//         context = {
//             elemdata:elemdataStr
//         }
//     renderer.renderToString(app,context,function(err,html){
//         writeFile(filePath,html)
//     })
// }