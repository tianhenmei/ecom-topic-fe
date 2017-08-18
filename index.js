/**
 * Created by dagou on 16/8/24.
 */
/*库文件**************/
var express = require('express');
var cookieParser = require('cookie-parser'); // cookie 解析
var bodyParser = require('body-parser'); // 基于表单处理，必须引用此中间件

/*自定义js文件**************/
var app_router = require('./routes/vue-control');  // 路由  控制 js

/*库文件的基本使用**************/
var app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
    if(/(.html)|(.css)|(.png)|(.jpg)|(.jpeg)|(.gif)/.test(req.url)){
        
    }else{
        // console.log(req.url);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Authorization,Origin,X-Requested-With,Content-Type, Accept");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
    }
    next();
});

app.use('/',app_router);





app.set('port',process.env.PORT || 9000);

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//定制404 页面
app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - not found.');
});
//定制500页面
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');

});

var server = app.listen(app.get('port'),function(){
    var host = 'http://0.0.0.0';server.address().address;
    var port = server.address().port;

    console.log('Example app listening at %s:%s',host,port);
});

