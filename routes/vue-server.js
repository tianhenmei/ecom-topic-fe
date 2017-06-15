var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

var Vue = require('vue');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

var root = __dirname.split('/').slice(0,-1).join('/');
// 获取HTML布局
var layout = fs.readFileSync(root+'/src/template/index.html', 'utf8');
// 拆分布局成两段HTML
var layoutSections = layout.split('<div id="app"></div>');
var preAppHTML = layoutSections[0];
var postAppHTML = layoutSections[1];
// 创建一个渲染器
var renderer = require('vue-server-renderer').createRenderer();

// router.get('/*',function(req,res){
//     // 将 Vue实例 渲染成 HTML
//     var createApp = require('../template/vue/components/'+req.url);
//     var stream = renderer.renderToStream();
//     // 将预先的HTML写入响应
//     res.write(preAppHTML);

//     stream.on('data',function(chunk){
//         res.write(chunk);
//     });
//     stream.on('end',function(){
//         console.log('request finished');
//         // 将post-app HTML写入响应
//         response.end(postAppHTML);
//     });
//     stream.on('error',function(error){
//         console.error(error);

//         return res.status(500)
//                   .send('Server Error!');
//     });
// });
router.get('/*',function(req,res){
    var html = '',
        root = __dirname.split(/\//g).slice(0,-1).join('/');
    if(req.url.indexOf('/dist/') != -1){
        console.log(req.url);
        fs.readFile(root+req.url,function(err,data){
            if(err){
                console.error(err);
                res.send('Cannot open '+req.url);
            }else{
                res.send(data);
            }
        });
    }else{
        switch(req.url){
            case '/test':
                // 将 Vue实例 渲染成 HTML
                var createApp = require('../template/vue/components'+req.url);   // test.js
                console.log(Vue);
                renderer.renderToString(
                    createApp(),
                    function(error,html){
                        if (error){
                            console.error(error);
                            res.status(500)
                                .send('Server Error');
                        }
                        res.send(layout.replace('<div id="app"></div>', html));
                    });
                break;
            default:
                getFile(root+'/template/vue'+req.url,function(data){
                    res.send(data);
                });
                break;
        }
        
    }
});

function getFile(url,callback){
    //__dirname.split(/\//g).slice(0,-1).join('/')+'/template/vue'+req.url
    fs.readFile(url,{
        encoding:'utf-8'
    },function(err,data){
        if(err){
            console.error(err);
            res.send('Cannot open '+url);
        }else{
            callback(data);
        }
    });
}



router.use(function(req,res,next){
    res.status(404).send('Sorry cant find that!');
});

router.use(function(err,req,res,next){
    console.log(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = router;