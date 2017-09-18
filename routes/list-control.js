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
var Vue = require('vue'),
    exec = require('child_process').exec

var mysql = require("./mysql.js");
// var test = require("../public/dist/demo/js/test-main.js");

var router = express.Router();

// saveDir: 发布页面时保存的页面目录
var isProd = process.env.NODE_ENV === 'production',
    saveDir = isProd ? '/data/data/topic-publish/topic/v3/' : 'publish/',
    publishPage = require('./publish-control.js'),
    // getDataPath: 获取发布页面时保存的页面的数据目录
    getDataPath = isProd ? '/data/data/topic-publish/topic/v3/' : '../publish/',
    rimraf = require('rimraf')

// router.use(bodyParser.json({limit: '50mb'}));
// router.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded());

function copyFile(srcPath, tarPath, cb){
    var rs = fs.createReadStream(srcPath)
    rs.on('error', function(err) {
      if (err) {
        console.log('read error', srcPath)
      }
      cb && cb(err)
    })
  
    var ws = fs.createWriteStream(tarPath)
    ws.on('error', function(err) {
      if (err) {
        console.log('write error', tarPath)
      }
      cb && cb(err)
    })
    ws.on('close', function(ex) {
      cb && cb(ex)
    })
  
    rs.pipe(ws)
}

function copyFolder(srcDir, tarDir, cb){
    fs.readdir(srcDir, function(err, files) {
        var count = 0
        var checkEnd = function() {
             ++count == files.length && cb && cb()
        }
        if (err) {
            // checkEnd()
            console.log(err)
            res.json({
                state:200,
                success:false,
                message:'拷贝失败！',
            })
            return
        }
        files.forEach(function(file) {
            var srcPath = path.join(srcDir, file)
            var tarPath = path.join(tarDir, file)
    
            fs.stat(srcPath, function(err, stats) {
                if (stats.isDirectory()) {
                    fs.mkdir(tarPath, function(err) {
                        if (err) {
                            console.log(err)
                            return
                        }
                        copyFolder(srcPath, tarPath, checkEnd)
                    })
                } else {
                    copyFile(srcPath, tarPath, checkEnd)
                }
            })
        })
        //为空时直接回调
        files.length === 0 && cb && cb()
    })
}

router.get('/api/list/publish',function(req,res){
    var templateId = req.query.templateId,
        name = req.query.name;
        saveStatus = 0,
        str = ''
    fs.readFile(path.resolve(__dirname,getDataPath+name+'/js/index.json'),'utf-8',function(err,data){
        if(err){
            console.log(err)
            res.json({
                state:200,
                success:false,
                message:'发布失败！',
            })
        }else{
            var data = JSON.parse(data)
            publishPage({
                name:name,
                includes:data.includes,
                count:data.count,
                elemDatas:JSON.stringify({
                    pageInfo:data.pageInfo,
                    elements:data.elements,
                    includes:data.includes,
                    count:data.count
                })
            },name,res)
        }
    })
});

router.get('/api/list/copy',function(req,res){
    var templateId = req.query.templateId,
        name = req.query.name;
        saveStatus = 0,
        str = '' ,
        copyName = name+new Date().getTime()
    mkdirsSync(saveDir+copyName+'','0777');
    // mkdirsSync(saveDir+copyName+'/css','0777');
    copyFolder(path.resolve(__dirname,getDataPath+name), path.resolve(__dirname,getDataPath+copyName), function(err) {
        if (err) {
            console.log(err)
            res.json({
                state:200,
                success:false,
                message:'拷贝失败！',
            })
        }else{
            let pagedata = fs.readFileSync(path.resolve(__dirname,getDataPath+copyName+'/js/index.json'), 'utf8'),
                data = JSON.parse(pagedata)
            data.pageInfo.html = copyName
            data.pageInfo.title = copyName
            data.pageInfo.name = copyName
            fs.writeFileSync(
                path.resolve(__dirname,getDataPath+copyName+'/js/index.json'), 
                JSON.stringify(data), 
                'utf8'
            );
            getList(function(list){
                res.json({
                    state:200,
                    success:true,
                    message:'拷贝成功！',
                    result:{
                        list:list.slice(0,10),
                        total:list.length,
                        totalPage:Math.ceil(list.length / 10)
                    }
                });
            })
        }
    })
});

router.get('/api/list/delete',function(req,res){
    var templateId = req.query.templateId,
        name = req.query.name,
        page = req.query.page ? parseInt(req.query.page) : 1,
        eachPage = req.query.eachPage ? req.query.eachPage : 10;  // 当前页
    if(!page){
        page = 1
    }
    // fs.rmdir(saveDir+name, function(err){
    rimraf(saveDir+name, function(err){
        if(err){
            console.log(err);
        }else{
            getList(function(list){
                let totalPage = Math.ceil(list.length / eachPage)
                if(totalPage < page){
                    page = totalPage
                }
                res.json({
                    state:200,
                    success:true,
                    message:'删除成功！',
                    result:{
                        list:list.slice((page-1)*eachPage,page*eachPage),
                        total:list.length,
                        totalPage:totalPage
                    }
                });
            })
        }
    });
});

router.post('/api/list/getListData',function(req,res){
    var page = req.body.page ? req.body.page : 1,
        eachPage = req.body.eachPage ? req.body.eachPage : 10;
    
    getList(function(list){
        res.json({
            state:200,
            success:true,
            result:{
                list:list.slice((page-1)*eachPage,page*eachPage),
                total:list.length,
                totalPage:Math.ceil(list.length / eachPage)
            }
        });
    })
});

function getList(callback){
    let list = []
    exec('ls -t '+path.resolve(__dirname,'../publish'), function(err, stdout, stderr) {
        if(stderr){
            return console.log(stderr)
        }
        let arr = stdout.split(/[\n\r,]/g),
            files = [],
            i = 0
        for(i = 0; i < arr.length; i++){
            if(arr[i].trim()){
                files.push(arr[i].trim())
            }
        }
        files.forEach(function(file){
            let filePath = path.resolve(__dirname,'../publish/'+file),
                statInfo = fs.statSync(filePath)
            
            if(statInfo.isDirectory()){  // 目录
                let content = JSON.parse(fs.readFileSync(filePath+'/js/index.json','utf-8'))
                list.push(content.pageInfo)
            }
        })
        callback(list)
    })
    // fs.readdir(path.resolve(__dirname,'../publish'),function(err,files){
    //     if(err){
    //         return console.log(err)
    //     }
    //     files.forEach(function(file){
    //         let filePath = path.resolve(__dirname,'../publish/'+file),
    //             statInfo = fs.statSync(filePath)
            
    //         if(statInfo.isDirectory()){  // 目录
    //             let content = JSON.parse(fs.readFileSync(filePath+'/js/index.json','utf-8'))
    //             list.push(content.pageInfo)
    //         }
    //     })
    //     callback(list)
    // })
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