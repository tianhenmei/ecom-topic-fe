/**
 * Created by dagou on 16/10/31.
 */
var bodyParser = require('body-parser');
var express = require('express');

var fs = require("fs");
// var test = require("../public/dist/demo/js/test-main.js");

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.param('file',function(req,res,next,id){
    console.log('CALLED WORKS: '+id);
    next();
});

router.get('*',function(req,res){
    var html = getFile(req);

    res.send(html);
});


function getFile(req){
    var root = __dirname.split('/').slice(0,-1).join('/'),
        data = {
            filename:'',
            root:root+'/src/vue/system',
            options:{
                encoding:'utf-8'
            }
        },
        html = '';

    switch(req.url){
        case '/':
            data.filename = data.root+'/main.html';
            break;
        default:
            data.filename = data.root+req.url;
            break;
    }
    console.log(data.filename);
    html = fs.readFileSync(data.filename,data.options);
    return html;
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