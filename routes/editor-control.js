/**
 * Created by dagou on 16/10/31.
 */
var fs = require('fs');
var path = require('path');
// var bodyParser = require('body-parser');
var express = require('express');
var multiparty = require('multiparty');
var sizeOf = require('image-size');
var child_process = require('child_process');
var uglify = require('uglify-js'),
    crypto = require('crypto');

var mysql = require("./mysql.js");
// var test = require("../public/dist/demo/js/test-main.js");

var router = express.Router(),
    isProd = process.env.NODE_ENV === 'production',
    // saveDir: 发布页面时保存的页面目录
    saveDir = isProd ? '/data/data/topic-publish/topic/v3/' : 'publish/',
    // getDataPath: 获取发布页面时保存的页面的数据目录
    getDataPath = isProd ? '/data/data/topic-publish/topic/v3/' : '../publish/',
    // concatPath: 开发与生成应该属于同一个目录，所以不会改变
    concatPath = isProd ? './dist/editor/publish/' : './dist/editor/publish/'
    

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded());

router.post('/api/editor/save',function(req,res,next){
    var page = req.body,
        pageString = '';

    // 创建文件及文件夹
    setFile(page,res);
    // res.json({
    //     state:200,
    //     success:true,
    //     message:'保存成功',
    //     content:{
    //         id:rows.insertId ? rows.insertId : page.id,
    //     }
    // });
});

router.post('/api/editor/getList',function(req,res){
    var querey_string = 'select * from pages',
        pageString = '';
    mysql.query(querey_string,function(err,rows,fields){
        if(err){
            throw err;
        }
        if(rows && rows.length > 0){
            res.json({
                state:200,
                success:true,
                content:rows
            });
        }else{
            res.json({
                state:200,
                success:true,
                content:{}
            });
        }
    });
});

router.post('/api/editor/getPageData',function(req,res){
    var name = req.body.html ? req.body.html : 'test-h5',
        templateId = req.body.id,
        dirpath = saveDir+req.body.html
    if(!fs.existsSync(dirpath) && !templateId && req.body.html){
        let secret = new Date().getTime()+'',
            // hash = crypto.createHmac('md5', secret)
            //             .update('yh')
            //             .digest('hex')
            hash = crypto.randomBytes(8)
                        .toString('hex'),
            newdata = {
                pageInfo:{
                    templateId:hash,
                    templateType:'H5',
                    name:'YH EDITOR H5',
                    templateCategory:'测试专题',
                    title:'YH EDITOR H5',
                    createTime:new Date(),
                    createAuthor:'gaohui',
                    updateTime:'',
                    updateAuthor:'gaohui',
                    html:req.body.html,
                    description:'YH EDITOR H5 TEST',
                    activeTimeStart:'',
                    activeTimeEnd:'',
                    keywords:'',
                    lgID:'',
                    lgH5ID:'',
                    scriptsJson:[],
                    share:{
                        status:false,
                        url:'',
                        title:'',
                        desc:'',
                        pic:''
                    }
                },
                elements:[],
                includes:[],
                count:0
            }
        mkdirsSync(dirpath+'/js','0777');
        writeFile(dirpath+'/js/index.json',JSON.stringify(newdata))
        res.json({
            state:200,
            success:true,
            content:newdata
        });
    }
    fs.readFile(path.resolve(__dirname,getDataPath+name+'/js/index.json'),'utf-8',function(err,data){
        if(err){
            console.log(err)
            res.json({
                state:200,
                success:false,
                content:{
                    message:'NOT FOUND PAGE '+name.toLocaleUpperCase(),
                    count:0,
                    includes:[],
                    elements:[]
                }
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
    // var templateID = req.body.id ? req.body.id : 0,
    //     querey_string = 'select * from pages WHERE id='+templateID,
    //     pageString = '';
    // mysql.query(querey_string,function(err,rows,fields){
    //     if(err){
    //         throw err;
    //     }
    //     if(rows && rows.length > 0){
    //         res.json({
    //             state:200,
    //             success:true,
    //             content:rows[0]
    //         });
    //     }else{
    //         res.json({
    //             state:200,
    //             success:true,
    //             content:{}
    //         });
    //     }
    // });
});

router.post('/api/editor/upload',function(req,res){
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

function setFile(page,res){
    mkdirsSync(saveDir+page.name+'/js','0777');
    mkdirsSync(saveDir+page.name+'/css','0777');
    if(!page.includes){
        page.includes = [];
    }
    if(page.js){
        writeJS(JSON.parse(page.js),saveDir+page.name+'/js/index.js');
    }
    // writeFile(saveDir+page.name+'/js/index.js',page.js ? writeJS(JSON.parse(page.js)) : '')
    writeFile(saveDir+page.name+'/css/index.css',page.style ? page.style.replace(/(http:\/\/localhost:9000\/)/g,'/') : '')
    writeFile(saveDir+page.name+'/js/index.json',page.elemDatas ? page.elemDatas : '')
    writeFile(saveDir+page.name+'/index.html',writeHTML(page.html.replace(/(http:\/\/localhost:9000\/)/g,'/')))
    res.json({
        state:200,
        success:true,
        message:'保存成功！'
    })
}

function concat(fileIn,fileOut,data){
    var fileArray = Array.isArray(fileIn)? fileIn : [fileIn],
        origCode,
        ast,
        finalCode='';
    console.log(fileArray)
    for(var i = 0; i < fileArray.length; i++) {
        if(!fileArray[i]){
            continue
        }
        origCode = fs.readFileSync(concatPath+'js/'+fileArray[i]+'.js', 'utf8');
        switch(fileArray[i]){
            case 'state':
                finalCode += 'elementStates = '+JSON.stringify(data.elementsStates)+';\n'
                break
            case 'event':
                finalCode += 'elementsEvent = {};\n'//+JSON.stringify(data.elementsEvent)+';\n'
                break
        }
        // ast = uglify.parser.parse(origCode);
        // ast = uglify.uglify.ast_mangle(ast);
        // ast = uglify.uglify.ast_squeeze(ast); 
        finalCode += origCode + '\n\n\n\n\n\n\n\n';//';' + uglify.uglify.gen_code(ast);
    }
    finalCode += 'PM = new PageMove({animation:"'+data.pageAnimation+'"});'
    fs.writeFileSync(fileOut, finalCode, 'utf8');
}

function writeJS(data,path){
    // uglify
    // child_process.exec(cmd, [options], callback)
    let jsList = ['page','event','state']
    jsList = data.eventList.concat(jsList)
    jsList = ['global'].concat(jsList)
    console.log(jsList)
    // console.log(data.elementsStates)
    concat(jsList,path,data);  // ,'./publish/base/js/bgmusic.js'
    
    child_process.exec('npm run compile -- --dir test',function(){
        console.log('node编译完成')
    })
}

function writeHTML(pageHTML){
    var html = ''+
        '<!DOCTYPE html>'+'\n'+
        '<html lang="zh">'+'\n'+
            '<head>'+'\n'+
                '<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no">'+'\n'+
                '<meta charset="utf-8">'+'\n'+
                '<title>首页</title>'+'\n'+
                '<link type="text/css" rel="stylesheet" href="../static/css/init.css" />'+'\n'+
                '<link type="text/css" rel="stylesheet" href="../static/css/editor-common.css" />'+'\n'+
                '<link type="text/css" rel="stylesheet" href="../static/css/animation.css" />'+'\n'+
                '<link type="text/css" rel="stylesheet" href="./css/index.css" />'+'\n'+
                '<script type="text/javascript">'+
                    'var RC = {'+
                            'w:750,'+
                            'h:1206'+
                        '},'+
                        'portrait =  false,'+
                        'resize = "orientationchange"in window ? window.orientationchange : window.resize,'+
                        'bodyElement = document.documentElement || document.body,'+
                        'GC = {'+
                            'w:bodyElement.clientWidth,'+
                            'h:bodyElement.clientHeight'+
                        '},'+
                        'rightSize = RC.w / RC.h,'+
                        'currentSize = GC.w / GC.h,'+
                        'lastHTMLSize = 16,'+
                        'html = document.getElementsByTagName("html")[0];'+
                    'if(rightSize > currentSize){ '+ // 长屏
                        'lastHTMLSize = 16;'+
                    '}else if(rightSize < currentSize){ '+ //宽屏
                        'lastHTMLSize = (RC.h / GC.h * GC.w) / RC.w * 16;'+
                    '}'+
                    'this.fontSize = GC.w / lastHTMLSize;'+
                    'html.style.fontSize = this.fontSize +"px";'+
                '</script>'+'\n'+
            '</head>'+'\n'+
            '<body>'+'\n'+
                '<div class="main">'+'\n'+
                    pageHTML.replace(/[’‘]/g,'\'') + '\n'+
                '</div>'+ '\n'+
                '<script type="text/javascript" src="../static/js/lib/jquery.1.10.1.min.js"></script>'+'\n'+
                '<script type="text/javascript" src="./js/index.js"></script>'+'\n'+
            '</body>'+'\n'+
        '</html>'+
    ''
    return html
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
    fs.writeFileSync(path,string);
    // fs.writeFile(path,string,function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     console.log('update: '+path);
    // });
}

//创建多层文件夹 同步
function mkdirsSync(dirpath, mode) { 
    if (!fs.existsSync(dirpath)) {
        var pathtmp,
            i = 0;
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
            }else if(i == 0 && !dirname){
                pathtmp = '/'
                i++;
            }
        });
    }
    return true; 
}

router.use(function(req,res,next){
    // console.log(req.url);
    // res.status(404).send('Sorry cant find that!');
    next();
});

router.use(function(err,req,res,next){
    // console.log(err.stack);
    // res.status(500).send('Something broke!');
    next(err);
});

module.exports = router;