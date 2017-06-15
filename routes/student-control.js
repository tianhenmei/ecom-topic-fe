/**
 * 学生信息获取
 */
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var child_process = require('child_process');
var mysql = require("./mysql.js");

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.post('/save',function(req,res){
    var page = req.body,
        querey_string = 'select id from student WHERE id='+page.id,
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

router.post('/getSign',function(req,res){
    var userid = req.body.userid ? req.body.userid : 0,
        now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth()+1,
        time = req.body.time ? req.body.time : (year+'-'+(month < 10 ? '0'+month : month)),
        querey_string = 'select * from sign WHERE studentID='+userid+' and time="'+time+'"',
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

router.post('/getFavorites',function(req,res){
    getFavorites(req,res)
});

function getFavorites(req,res){
    var userid = req.body.userid ? req.body.userid : 0,
        querey_string = 'select * from favorites WHERE studentID='+userid+' ORDER BY id desc',
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
}

router.post('/addFavorite',function(req,res){
    var favorite = req.body,
        userid = favorite.userid ? favorite.userid : 0,
        favoriteString = "'"+favorite.userid+"',"
            +(favorite.english ? "'"+favorite.english+"'" : "''")+","
            +(favorite.chinese ? "'"+favorite.chinese+"'" : "''")+","
            +"NOW()";
    var querey_string = "INSERT INTO favorites " +
                "(studentID,english,chinese,createTime) " +
                "values("+favoriteString+")";
    mysql.query(querey_string,function(err,rows,fields){
        if(err){
            throw err;
        }
        // res.json({
        //     state:200,
        //     success:true,
        //     message:'添加成功'
        // });
        getFavorites(req,res)
    });
});

router.post('/editFavorite',function(req,res){
    var favorite = req.body,
        id = favorite.id ? favorite.id : 0,
        english = favorite.english ? favorite.english : "",
        chinese = favorite.chinese ? favorite.chinese : "";
    var querey_string = "update favorites SET " +
                "english='"+english+"',"+
                "chinese='"+chinese+"',"+
                "lastTime=NOW() "+
                "WHERE id="+id;
    mysql.query(querey_string,function(err,rows,fields){
        if(err){
            throw err;
        }
        res.json({
            state:200,
            success:true,
            message:'修改成功'
        });
    });
});

router.post('/deleteFavorite',function(req,res){
    var id = req.body.id ? req.body.id : 0,
        querey_string = 'DELETE FROM `KITTY ENGLISH`.favorites where id='+id;
    mysql.query(querey_string,function(err,rows,fields){
        if(err){
            throw err;
        }
        getFavorites(req,res)
    });
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