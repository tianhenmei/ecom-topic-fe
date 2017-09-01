/**
 * Created by dagou on 16/10/21.
 */

var express = require('express');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
// var bodyParser = require('body-parser');
//var babel = require('babel-core/register');

var router = express.Router();
// var editor_control = require('./editor-control.js');
var list_control = require('./list-control.js');
var editorPC_control = require('./editorPC-control.js');
var company_control = require('./company-control.js');
var createPC_control = require('./createPC-control.js');

// router.use(bodyParser.json({limit: '50mb'}));
// router.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//router.use(express.static('public'));  //多次调用 express.static 中间件
router.use('/v3/static',express.static('public'));  // 指定挂载路径（虚拟）
router.use('/v3/dist',express.static('dist'));  // 指定挂载路径（虚拟）
router.use('/v3',express.static('publish')); // 指定挂载路径（虚拟）
router.use('/list',list_control);
// router.use('/editor',editor_control);
// router.use('/v3',createPC_control);
router.use('/v3',[editorPC_control,company_control,createPC_control]);  // /v3/api/editorPC
// router.use('/v3/static',express.static('public'));  // 指定挂载路径（虚拟）
// router.use('/v3',company_control);  // /v3/api/company
// router.use('/v3',createPC_control);

// router.get('/',function(req,res){
//     var html = getFile(req,res);
//     res.send(html);
// });

// function getFile(req,res){
//     var root = __dirname.split('/').slice(0,-1).join('/'),
//         data = {
//             filename:'',
//             root:root+(req.url.indexOf('/yh/')!= -1 ? '' : '/template/vue'),
//             options:{
//                 encoding:'utf-8',
//                 // headers:{
//                 //     'x-timestamp':Date.now(),
//                 //     'x-sent':true
//                 // }
//             }
//         },
//         html = '';
    
//     switch(req.url){
//         case '/':
//             data.filename = data.root+'/main.html';
//             break;
//         default:
//             data.filename = data.root+req.url.replace('/yh/','/publish/');
//             break;
//     }
    
//     console.log(data.filename);
//     html = fs.readFileSync(data.filename,data.options);
//     return html;
// }





router.use(function(req,res,next){
    // res.status(404).send('Sorry cant find that!');
    next()
});

router.use(function(err,req,res,next){
    // console.log(err.stack);
    // res.status(500).send('Something broke!');
    next(err)
});

module.exports = router;