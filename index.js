/**
 * Created by dagou on 16/8/24.
 */
/*库文件**************/
var fs = require('fs');
var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser'); // cookie 解析
var bodyParser = require('body-parser'); // 基于表单处理，必须引用此中间件
var morgan = require('morgan');
var rfs = require('rotating-file-stream');
var statusMonitor = require('express-status-monitor');
var PrettyError = require('pretty-error');
var winston = require('winston');

/*自定义js文件**************/
var app_router = require('./routes/vue-control');  // 路由  控制 js

/*库文件的基本使用**************/
var app = express();

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

let logDirectory = 'logs';
// ensure log directory exists
fs.existsSync(logDirectory) || mkdirsSync(logDirectory,'0777');
if ( process.env.NODE_ENV === 'production' ) {
    // create a rotating write stream
    let accessLogStream = rfs('access.log', {
      interval: '1d', // rotate daily
      path: logDirectory
    });

    // setup the logger
    // Simple app that will log all requests in the Apache combined format to the file access.log.
    app.use(morgan('combined', {stream: accessLogStream}));
}
app.disable('x-powered-by'); // remove fingerprint
app.enable('trust proxy'); // Express behind Nginx

//-----------------------------------------------------------------------------
// Express 运行状态监控
//-----------------------------------------------------------------------------
app.use(statusMonitor({
    title: 'Express Status', // Default title
    path: '/status',
    spans: [{
        interval: 5,         // Every 5 second
        retention: 60        // Keep 60 datapoints in memory
    }]
}));

app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
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

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

const fileLogger = new (winston.Logger)({
    level: 'error',
    transports: [
      new (winston.transports.File)({ filename: `${logDirectory}/error.log` })
    ]
});

//定制404 页面
app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - not found.');
});
//定制500页面
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    // if ( process.env.NODE_ENV === 'production' ) {
        fileLogger.error(err);
    // }
    console.error(pe.render(err));

    res.status(err.status || 500);
    res.send('Server Error');
});
// app.use(function(err,req,res,next){
//     console.error(err.stack);
//     res.type('text/plain');
//     res.status(500);
//     res.send('500 - Server Error');

// });

var server = app.listen(app.get('port'),function(){
    var host = 'http://0.0.0.0';server.address().address;
    var port = server.address().port;

    console.log('Example app listening at %s:%s',host,port);
});

