/**
 * Created by dagou on 16/10/31.
 */
var bodyParser = require('body-parser');
var express = require('express');

var mysql = require("./mysql.js");
// var test = require("../public/dist/demo/js/test-main.js");

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.get('/list',function(req,res){
    var querey_string = 'select id,name,photo,age,sex,expertise,description,price from teacher order by name';
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
                state:401,
                success:false,
                message:'当前还没有老师'
            });
        }

    });
});

router.post('/add',function(req,res){
    var teacher = req.body,
        teacherString = "'"+teacher.name+"',"
            +"'"+teacher.password+"',"
            +"'"+teacher.photo+"',"
            +teacher.age+","
            +"'"+teacher.sex+"',"
            +"'"+teacher.expertise+"',"
            +"'"+teacher.description.replace(/'/g,'‘')+"',"
            +(teacher.class ? "'"+teacher.class+"'" : "''")+","
            +(teacher.pay ? teacher.pay : "0")+","
            +(teacher.price ? teacher.price : "0")+","
            +(teacher.account ? "'"+teacher.account+"'" : "''")+","
            +(teacher.contact ? "'"+teacher.contact+"'" : "''")+","
            +(teacher.country ? "'"+teacher.country+"'" : "''")+","
            +"NOW(),"
            +"NOW()";
    var querey_string = "INSERT INTO teacher " +
                "(name,password,photo,age,sex,expertise,description," +
                "class,pay,price,account,contact,country,createTime,lastTime) " +
                "values("+teacherString+")";
    mysql.query(querey_string,function(err,rows,fields){
        if(err){
            throw err;
        }
        res.json({
            state:200,
            success:true,
            message:'添加成功',
            content:{
                id:rows.insertId,
                name:teacher.name,
                photo:teacher.photo,
                age:teacher.age,
                sex:teacher.sex,
                expertise:teacher.expertise,
                description:teacher.description.replace(/'/g,'‘'),
                price:teacher.price
            }
        });
    });
});

router.get("/test",function(req,res){
    setTimeout(function(){
        res.send('welcome to server, dagou');
    },3000);
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