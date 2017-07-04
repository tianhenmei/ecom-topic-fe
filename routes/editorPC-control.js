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
var Vue = require('vue')

var router = express.Router();

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

function writeFile(path,string){
    // fs.open(path,'w+',function(err,fd){
    //     if (err) { throw err; }
    //     var writeBuffer = new Buffer( string),
    //         bufferPosition = 0,
    //         bufferLength = writeBuffer.length, filePosition = null;
    //     fs.write( fd, writeBuffer,bufferPosition,bufferLength,filePosition,function(err, written) {
    //         if (err) { throw err; }
    //         console.log('update: '+path);
    //     });
    // });
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