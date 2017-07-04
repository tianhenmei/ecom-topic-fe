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

var mysql = require("./mysql.js");
// var test = require("../public/dist/demo/js/test-main.js");

var router = express.Router();

router.use(bodyParser.json({limit: '50mb'}));
router.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.get('/publish',function(req,res){
    var templateId = req.body.templateId;
        
    res.json({
        state:200,
        success:true,
        result:'发布成功！'
    });
});

router.get('/delete',function(req,res){
    var templateId = req.body.templateId;
        
    res.json({
        state:200,
        success:true,
        result:'删除成功！'
    });
});

router.post('/getListData',function(req,res){
    var page = req.body.page,
        eachPage = req.body.eachPage,
        i = 0,
        list = [];
    fs.readdir(path.resolve(__dirname,'../publish'),function(err,files){
        if(err){
            return console.log(err)
        }
        files.forEach(function(file){
            let filePath = path.resolve(__dirname,'../publish/'+file),
                statInfo = fs.statSync(filePath)
            
            if(statInfo.isDirectory()){  // 目录
                let content = JSON.parse(fs.readFileSync(filePath+'/js/index.json','utf-8'))
                list.push(content.pageInfo)
            }
        })
        res.json({
            state:200,
            success:true,
            result:{
                list:list,
                total:99,
                totalPage:10
            }
        });
    })
});




router.use(function(req,res,next){
    console.log(req.url);
    res.status(404).send('Sorry cant find that!');
});

router.use(function(err,req,res,next){
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = router;