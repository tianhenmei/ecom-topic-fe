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

var mysql = require("./mysql.js");
// var test = require("../public/dist/demo/js/test-main.js");

var router = express.Router(),
saveDir = isProd ? '/data/data/topic-publish/topic/v3/' : 'publish/'

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.post('/save',function(req,res){
    var page = req.body,
        querey_string = 'select id from pages WHERE id='+page.id,
        pageString = '';
    mysql.query(querey_string,function(err,rows,fields){
        if(err){
            throw err;
        }
        if(rows && rows.length > 0){  // 修改
            querey_string = "update pages SET " +
                        "name='"+page.name+"',"+
                        "style='"+(page.style ? page.style : "")+"',"+
                        "html='"+(page.html ? page.html : "")+"',"+
                        "js='"+(page.js ? page.js : "")+"',"+
                        "json='"+(page.json ? page.json : "")+"',"+
                        "editor='"+page.author+"',"+
                        "modifyTime=NOW() "+
                        "WHERE id="+page.id;
        }else{  // 新增
            pageString = "'"+page.name+"',"
                    +(page.style ? "'"+page.style+"'" : "''")+","
                    +(page.html ? "'"+page.html+"'" : "''")+","
                    +(page.js ? "'"+page.js+"'" : "''")+","
                    +(page.json ? "'"+page.json+"'" : "''")+","
                    +"'"+page.author+"',"
                    +"'"+page.author+"',"
                    +"NOW(),"
                    +"NOW()";
            querey_string = "INSERT INTO pages " +
                        "(name,style,html,js,json,author,editor,createTime,modifyTime) " +
                        "values("+pageString+")";
        }
        // 创建文件及文件夹
        setFile(page);

        mysql.query(querey_string,function(err,rows,fields){
            if(err){
                throw err;
            }
            res.json({
                state:200,
                success:true,
                message:'保存成功',
                content:{
                    id:rows.insertId ? rows.insertId : page.id,
                }
            });
        });
    });
});

router.post('/getList',function(req,res){
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

router.post('/getPageData',function(req,res){
    var templateID = req.body.id ? req.body.id : 0,
        querey_string = 'select * from pages WHERE id='+templateID,
        pageString = '';
    mysql.query(querey_string,function(err,rows,fields){
        if(err){
            throw err;
        }
        if(rows && rows.length > 0){
            res.json({
                state:200,
                success:true,
                content:rows[0]
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
    mkdirsSync(saveDir+page.name+'/js','0777');
    mkdirsSync(saveDir+page.name+'/css','0777');
    if(page.js){
        writeJS(JSON.parse(page.js),saveDir+page.name+'/js/index.js');
    }
    // writeFile(saveDir+page.name+'/js/index.js',page.js ? writeJS(JSON.parse(page.js)) : '')
    writeFile(saveDir+page.name+'/css/index.css',page.style ? page.style.replace(/(http:\/\/localhost:9000\/)/g,'/') : '')
    writeFile(saveDir+page.name+'/index.json',page.json ? page.json : '')
    writeFile(saveDir+page.name+'/index.html',writeHTML(page.html.replace(/(http:\/\/localhost:9000\/)/g,'/')))
}

function concat(fileIn,fileOut,data){
    var fileArray = Array.isArray(fileIn)? fileIn : [fileIn],
        origCode,
        ast,
        finalCode='';
    for(var i = 0; i < fileArray.length; i++) {
        origCode = fs.readFileSync('./publish/base/js/'+fileArray[i]+'.js', 'utf8');
        switch(fileArray[i]){
            case 'state':
                finalCode += 'elementStates = '+JSON.stringify(data.elementsStates)+';\n'
                break
            case 'event':
                finalCode += 'elementsEvent = '+JSON.stringify(data.elementsEvent)+';\n'
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
                '<link type="text/css" rel="stylesheet" href="/static/css/init.css" />'+'\n'+
                '<link type="text/css" rel="stylesheet" href="/static/css/common.css" />'+'\n'+
                '<link type="text/css" rel="stylesheet" href="/static/css/animation.css" />'+'\n'+
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
                '<script type="text/javascript" src="/static/js/lib/jquery.1.10.1.min.js"></script>'+'\n'+
                '<script type="text/javascript" src="./js/index.bundle.js"></script>'+'\n'+
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