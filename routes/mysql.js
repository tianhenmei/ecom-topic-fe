/**
 * Created by dagou on 16/10/26.
 */
var mysql = require('mysql');
/***************************
 * 数据库连接
 * ********************/
/*var connection = mysql.createConnection({
    host:'0.0.0.0',
    user:'dagou',
    password:'dagou',
    database:'KITTY ENGLISH',
    port:0
});*/
var pool = mysql.createPool({
    host:'0.0.0.0',
    user:'root',
    password:'dagou',
    database:'KITTY ENGLISH',
    port:0
});

var mysql = {};

mysql.query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};

module.exports = mysql;