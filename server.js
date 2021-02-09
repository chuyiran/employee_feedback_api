const express = require('express')
const dotenv = require('dotenv')
const dbConnection=require('./config/dbconfig')
//全局环境路径配置
dotenv.config({
    path: './config.env'
})
const server = express();
server.use("/students",(req,res)=>{
    let sql='select * from students';
    let sqlArr=[];
    let callBack=function (err,data){
        if(err){
            console.log('连接出错');
            return;
        }
        res.send({data,statusCode:200})
    }
    dbConnection.sqlConnect(sql,sqlArr,callBack)
})
const PORT = process.env.PORT || 3001;
//监听端口
//
server.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
})