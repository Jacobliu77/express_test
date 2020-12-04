/*
 * @Author: jacob
 * @Date: 2020-12-01 17:25:50
 * @LastEditTime: 2020-12-04 16:41:43
 * @LastEditors: jacob
 * @Description: express框架下的尝试
 */
const express = require('express')

const app = express()

const mysql = require('mysql');
const md5 = require('md5');
const bodyParser = require('body-parser');

// console.log(md5('123'));
///解决跨域
app.use((req,res,next)=>{
       res.header('Access-Control-Allow-Origin', req.headers.origin); //需要显示设置来源
       res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
       res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
       res.header('Access-Control-Allow-Credentials', true); //带cookies
       next();
    })
 //对于数据库数据查询的相关整理

 app.use(bodyParser.urlencoded({extended:false}));

app.get('/all', (req, res) => {
        var connection = mysql.createConnection({
             host     : 'localhost',
             user     : 'root',
             password : 'root',
             database : 'express_mysql'
         });
        connection.connect();
        connection.query('select names,sexs,ages from test', function (error, results, fields) {
         if (error) throw error;
         console.log('The name is: ', results[0]);
         res.send(results)
        });
        connection.end();
    })

 app.get('/name', (req, res) => {
     var connection = mysql.createConnection({
          host     : 'localhost',
          user     : 'root',
          password : 'root',
          database : 'express_mysql'
      });
     connection.connect();
     connection.query('select names from test', function (error, results, fields) {
      if (error) throw error;
      console.log('The name is: ', results[0]);
      res.send(results)
     });
     connection.end();
 })

 app.post('/login',(req,res)=>{
    var sqlpw =''
    var inpw = ''
    var connection = mysql.createConnection({
         host     : 'localhost',
         user     : 'root',
         password : 'root',
         database : 'express_mysql'
     });
    connection.connect();

    connection.query("SELECT pwd FROM users WHERE username = '" + req.body.username + "'" , function (error, results, fields) {
    if (error) throw error;
    inpw = req.body.pwd
    if(results[0] && results[0].pwd){
        sqlpw = results[0].pwd

        if( inpw && sqlpw && inpw === sqlpw){
            res.send('登陆成功')
        }else {
            res.send('用户名或密码有误')
        }
        
    }else {
        res.send('未查询到相关用户')
    }
   
   
    
    });
    connection.end();
    
 })


app.listen(3000, () => console.log('app listening on port 3000!'))

