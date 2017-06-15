/**
 * Created by dagou on 16/10/21.
 */

var express = require('express');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var bodyParser = require('body-parser');
//var babel = require('babel-core/register');

var router = express.Router();
//var list = require('../bin/list.js');   // list 控制 js
var mysql = require("./mysql.js");
var teacher_control = require('./teacher-control.js');
var vue_server = require('./vue-server.js');
var system_control = require('./system-control.js');
var editor_control = require('./editor-control.js');
var editorPC_control = require('./editorPC-control.js');
var student_control = require('./student-control.js')

router.use(bodyParser.json({limit: '50mb'}));
router.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//router.use(express.static('public'));  //多次调用 express.static 中间件
router.use('/static',express.static('public'));  // 指定挂载路径（虚拟）
router.use('/dist',express.static('dist'));  // 指定挂载路径（虚拟）
router.use('/yh',express.static('publish')); // 指定挂载路径（虚拟）
router.use('/works/teacher',teacher_control);
// router.use('/vue',vue_server);
// router.use('/dist',system_control);
router.use('/editor',editor_control);
router.use('/editorPC',editorPC_control);
router.use('/student',student_control)

router.get('/',function(req,res){
    var html = getFile(req,res);
    res.send(html);
});
// router.get('/yh/*',function(req,res){
//     var html = getFile(req,res);
//     res.send(html);
// });

router.param('file',function(req,res,next,id){
    console.log('CALLED WORKS: '+id);
    next();
});

router.get('/works/:file',function(req,res){
    var html = getFile(req,res);

    res.send(html);
});

router.param('json',function(req,res,next,id){
    console.log('CALLED WORKS DATA: '+id);
    next();
});

router.get('/works/data/:json',function(req,res){
    var listData = [
        {
            name:'2015，1024程序员节',
            href:'http://ca.lagou.com/programmer/index'
        },{
            name:'游戏-找你妹',
            href:'http://tianhenmei.github.io/cocos2d-js/ZhaoNiMei/'
        },{
            name:'游戏-糖果',
            href:'http://tianhenmei.github.io/cocos2d-js/Candy/'
        },{
            name:'游戏-勇夺飞刀',
            href:'http://tianhenmei.github.io/cocos2d-js/YongDuoFeiDao/'
        }
    ];
    res.send(listData);
});

router.post('/works/api/register',function(req,res){
    var attr = '',
        data = {
            content:{

            },
            state:200,
            success:true
        };
    for( attr in req.body ){
        data.content[attr] = req.body[attr];
    }


    res.json(data);
});

router.param('nickname',function(req,res,next,id){
    /*for( var attr in req.body ){
        data[attr] = req.body[attr];
    }*/
    next();
});

router.post('/works/api/login/nickname',function(req,res){
    console.log('nickname: '+req.body.nickname);
    var querey_string = 'select nickname from user where nickname="'+req.body.nickname+'"';
    mysql.query(querey_string,function(err,rows,fields){
        if(err){
            throw err;
        }
        if(rows && rows.length > 0){
            res.json({
                state:200,
                success:true,
                content:{
                    nickname:req.body.nickname
                }
            });
        }else{
            res.json({
                state:401,
                success:false,
                message:'当前用户名不存在'
            });
        }

    });
});

router.post('/works/api/login',function(req,res){
    var attr = '',
        data = {

        },
        querey_string = '';
    for( attr in req.body ){
        data[attr] = req.body[attr];
    }
    querey_string = 'select nickname,password from user where nickname="'+data.nickname+'"';
    mysql.query(querey_string,function(err,rows,fields){
        if(err){
            throw err;
        }
        if(rows && rows.length > 0){
            if(rows[0].password == data.password){
                res.json({
                    state:200,
                    success:true,
                    message:'登录成功'
                });
            }else{
                res.json({
                    state:402,
                    success:false,
                    message:'密码错误'
                });
            }
        }else{
            res.json({
                state:401,
                success:false,
                message:'当前用户名不存在'
            });
        }

    });
});



function getFile(req,res){
    var root = __dirname.split('/').slice(0,-1).join('/'),
        data = {
            filename:'',
            root:root+(req.url.indexOf('/yh/')!= -1 ? '' : '/template/vue'),
            options:{
                encoding:'utf-8',
                // headers:{
                //     'x-timestamp':Date.now(),
                //     'x-sent':true
                // }
            }
        },
        html = '';
    
    switch(req.url){
        case '/':
            data.filename = data.root+'/main.html';
            break;
        default:
            data.filename = data.root+req.url.replace('/yh/','/publish/');
            break;
    }
    // res.sendFile(data.filename,options,function(err){
    //     if(err){
    //         console.log(err);
    //         res.status(err.status).end();
    //     }else{
    //         console.log('Sent: ',filename);
    //     }
    // })
    console.log(data.filename);
    html = fs.readFileSync(data.filename,data.options);
    return html;
}





router.use(function(req,res,next){
    res.status(404).send('Sorry cant find that!');
});

router.use(function(err,req,res,next){
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = router;