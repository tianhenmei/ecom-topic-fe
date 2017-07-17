/**
 * Created by dagou on 16/10/31.
 */
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var multiparty = require('multiparty');
var sizeOf = require('image-size');
var child_process = require('child_process');
var uglify = require('uglify-js');
var serverRenderer = require('vue-server-renderer')
var setupDevServer = require('../build/setup-dev-server.js')
var { createBundleRenderer } = serverRenderer
var router = express.Router();
var isProd = process.env.NODE_ENV === 'production'

var Vue = require('vue')

/****NODE SERVER RENDERER */
var LRU = require('lru-cache')
// var createAppH5 = require('./server-app-h5.js')
var resolve = file => path.resolve(__dirname, file)
const templateH5 = fs.readFileSync(resolve('../public/html/editorPC-h5.html'), 'utf-8')

/****NODE SERVER RENDERER */


router.use(bodyParser.json({limit: '50mb'}));
router.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.post('/savePage',function(req,res){
    var page = req.body;
    console.log('get save page')
    // 创建文件及文件夹
    setFile(page);
    res.json({
        state:200,
        success:true,
        message:'保存成功'
    });
});

router.get('/getPageData',function(req,res){
    var name = req.body.name ? req.body.name : 'text'
    fs.readFile(path.resolve(__dirname,'../publish/'+name+'/js/index.json'),'utf-8',function(err,data){
        if(err){
            console.log(err)
            res.json({
                state:200,
                success:false,
                content:'NOT FOUND PAGE '+name.toLocaleUpperCase()
            })
        }else{
            var data = JSON.parse(data)
            if(data.count){
                data.count = parseInt(data.count)
            }
            res.json({
                state:200,
                success:true,
                content:data
            });
        }
    })
    // fs.readFile(path.resolve(__dirname,'../publish/'+name+'/index.html'),'utf-8',function(err,data){
    //     if(err){
    //         console.log(err)
    //         res.json({
    //             state:200,
    //             success:false,
    //             content:'NOT FOUND PAGE '+name.toLocaleUpperCase()
    //         })
    //     }else{
    //         var // html
    //             index = data.indexOf('#PAGESTART#-->'),
    //             length = '#PAGESTART#-->'.length,
    //             lastIndex = data.indexOf('<!--#PAGEEND#'),
    //             html = data.slice(index+length,lastIndex),
    //             // elemdata
    //             dindex = data.indexOf('#PAGEDATASTART#'),
    //             dlength = '#PAGEDATASTART#'.length,
    //             dlastIndex = data.indexOf('#PAGEDATAEND#'),
    //             datastring = data.slice(dindex+dlength,dlastIndex)
    //             elemdata = {
    //                 includes:[],
    //                 count:0
    //             }
    //         if(dindex > -1 && datastring && datastring != undefined){
    //             elemdata = JSON.parse(datastring)
    //         }
    //         res.json({
    //             state:200,
    //             success:true,
    //             content:{
    //                 html:html,
    //                 includes:elemdata.includes,
    //                 count:elemdata.count
    //             }
    //         });
    //     }
    // })
});

router.post('/upload',function(req,res){
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './public/files/'});
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files,null,2);

        if(err){
            console.log('parse error: ' + err);
        } else {
            var inputFile = files.files[0]
            var uploadedPath = inputFile.path
            var dstPath = './public/files/' + inputFile.originalFilename
            var type = inputFile.headers['content-type']
            if(/(image)/g.test(type)){
                var dimensions = sizeOf(uploadedPath);
                res.json({
                    state:200,
                    success:true,
                    content:{
                        path:uploadedPath.replace('public/','static/'),
                        width:dimensions.width,
                        height:dimensions.height,
                        size:inputFile.size   // b 为单位
                    }
                });
            }else{
                res.json({
                    state:200,
                    success:true,
                    content:{
                        path:uploadedPath,
                        size:inputFile.size   // b 为单位
                    }
                });
            }
            
            //重命名为真实文件名
            // fs.rename(uploadedPath, dstPath, function(err) {
            //     if(err){
            //         console.log('rename error: ' + err);
            //     } else {
                    
            //     }
            // });
        }
    });
});

function setFile(page){
    mkdirsSync('publish/'+page.name+'/js','0777');
    mkdirsSync('publish/'+page.name+'/css','0777');
    if(!page.includes){
        page.includes = [];
    }
    writeCSS(page.includes,'publish/'+page.name+'/css/index.css')
    writeJS(page.includes,'publish/'+page.name+'/js/index.js');
    writeFile('publish/'+page.name+'/js/index.json',page.elemDatas)
    writeHTML(page.content.replace(/(http:\/\/localhost:9000\/)/g,'/'),'publish/'+page.name+'/index.html',{
        includes:page.includes,
        count:page.count
    })
    writeCSSH5(page.includes,'publish/'+page.name+'/css/m_index.css')
    writeJSH5(page.includes,'publish/'+page.name+'/js/m_index.js');
    writeHTMLH5(page.name,'publish/'+page.name+'/m_index.html',{
        includes:page.includes,
        count:page.count
    },page.elemDatas)
    // writeFile('publish/'+page.name+'/index.html',writeHTML(page.content.replace(/(http:\/\/localhost:9000\/)/g,'/')))
}

function concat(fileIn,fileOut,data){
    var fileArray = Array.isArray(fileIn)? fileIn : [fileIn],
        origCode,
        ast,
        finalCode='',
        path = '',
        status = false;
    for(var i = 0; i < fileArray.length; i++) {
        path = './dist/editorPC/publish/js/'+fileArray[i]+'.js'
        origCode = ''
        status = fs.existsSync(path)
        if(status){
            origCode = fs.readFileSync(path, 'utf8');
        }
        // switch(fileArray[i]){
        //     case 'state':
        //         finalCode += 'elementStates = '+JSON.stringify(data.elementsStates)+';\n'
        //         break
        //     case 'event':
        //         finalCode += 'elementsEvent = '+JSON.stringify(data.elementsEvent)+';\n'
        //         break
        // }
        finalCode += origCode + '\n\n\n\n\n\n\n\n';
    }
    fs.writeFileSync(fileOut, finalCode, 'utf8');
}

function writeJS(data,path){
    // uglify
    // child_process.exec(cmd, [options], callback)
    let jsList = ['event']
    jsList = data.concat(jsList)
    jsList = ['global'].concat(jsList)
    console.log(jsList)
    // console.log(data.elementsStates)
    concat(jsList,path,data);  // ,'./publish/base/js/bgmusic.js'
    
    child_process.exec('npm run compile -- --dir test',function(){
        console.log('node编译完成')
    })
}

function writeJSH5(data,path){
    let i = 0,
        sdata = JSON.parse(JSON.stringify(data))
    for(i = 0; i < sdata.length; i++){
        sdata[i] += '_h5';
    }
    let jsList = ['event']
    jsList = sdata.concat(jsList)
    jsList = ['global'].concat(jsList)

    concat(jsList,path,sdata);
    
    child_process.exec('npm run compile -- --dir test',function(){
        console.log('node编译完成')
    })
}

function writeCSS(data,fileOut){
    var finalCode = '',
        origCode = '',
        path = '',
        status = false,
        cssArr = ['init'].concat(data);
    for(var i = 0; i < cssArr.length; i++) {
        origCode = ''
        switch(cssArr[i]){
            case 'init':
                path = './public/css/'+cssArr[i]+'.css'
                break;
            default:
                path = './dist/editorPC/components/'+cssArr[i]+'.css'
                break;
        }
        status = fs.existsSync(path)
        if(status){
            origCode = fs.readFileSync(path, 'utf8');
        }
        
        // switch(fileArray[i]){
        //     case 'state':
        //         finalCode += 'elementStates = '+JSON.stringify(data.elementsStates)+';\n'
        //         break
        //     case 'event':
        //         finalCode += 'elementsEvent = '+JSON.stringify(data.elementsEvent)+';\n'
        //         break
        // }
        finalCode += origCode + '\n\n\n\n\n\n\n\n';
    }
    fs.writeFileSync(fileOut, finalCode, 'utf8');
}

function writeCSSH5(data,fileOut){
    var finalCode = '',
        origCode = '',
        path = '',
        status = false,
        cssArr = ['init'].concat(data);
    for(var i = 0; i < cssArr.length; i++) {
        origCode = ''
        switch(cssArr[i]){
            case 'init':
                path = './public/css/'+cssArr[i]+'.css'
                break;
            default:
                path = './dist/editorPC/components-h5/'+cssArr[i]+'.css'
                break;
        }
        status = fs.existsSync(path)
        if(status){
            origCode = fs.readFileSync(path, 'utf8');
        }
        finalCode += origCode + '\n\n\n\n\n\n\n\n';
    }
    fs.writeFileSync(fileOut, finalCode, 'utf8');
}

function writeHTML(pageHTML,filePath,pagedata){
    var elemdataStr = '#PAGEDATASTART#'+JSON.stringify(pagedata)+'#PAGEDATAEND#', 
        app = new Vue({
            template:'<div class="main">'+pageHTML.trim()+'</div>'
        }),
        renderer = serverRenderer.createRenderer({
            template: fs.readFileSync(path.resolve(__dirname,'../public/html/editorPC.html'), 'utf-8')
        }),
        context = {
            elemdata:elemdataStr
        }
    renderer.renderToString(app,context,function(err,html){
        writeFile(filePath,html)
    })
}

function createRenderer (bundle, options) {
	return createBundleRenderer(bundle, Object.assign(options, {
        template:templateH5,// （可选）页面模板
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
function render (filename,filePath,pagedata,data,renderer) {
	const s = Date.now()
    console.log('Rendering '+filename)
	const handleError = err => {
		if(err.code === 404) {
			writeFile(filePath,'404 | Page Not Found')
		} else {
			// Render Error Page or Redirect
			writeFile(filePath,'500 | Internal Server Error')
		}
	}

	renderer.renderToString({
        filename,
        pagedata,
        data
    }, (err, html) => {
		if (err) {
			return handleError(err)
        }
		writeFile(filePath,html)
		if (!isProd) {
			console.log(`whole request: ${Date.now() - s}ms`)
		}
	})
}
function writeHTMLH5(filename,filePath,pagedata,data){
    let renderer = null,
        readyPromise = setupDevServer(router, (bundle, options) => {
            console.log('callback')
            renderer = createRenderer(bundle, options)
        })
    console.log('writing HTML h5')
    readyPromise.then(() => {
        console.log('resoved...')
        render(filename,filePath,pagedata,JSON.parse(data),renderer)
    })
    
}

function writeFile(path,string){
    fs.writeFile(path,string,function(err) {
        if(err) {
            return console.log(err);
        }
        console.log('update: '+path);
    });
}

//创建多层文件夹 同步
function mkdirsSync(dirpath, mode) { 
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(path.sep).forEach(function(dirname) {
            if(dirname){
                if (pathtmp) {
                    pathtmp = path.join(pathtmp, dirname);
                }else {
                    pathtmp = dirname;
                }
                if (!fs.existsSync(pathtmp)) {
                    if (!fs.mkdirSync(pathtmp, mode)) {
                        return false;
                    }
                }
            }
        });
    }
    return true; 
}


router.use(function(req,res,next){
    console.log(req.url);
    res.status(404).send('Sorry cant find that!');
});

router.use(function(err,req,res,next){
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = router;