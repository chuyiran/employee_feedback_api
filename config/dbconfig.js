//mysql数据库配置文件
let mysql = require('mysql')
//引全局变量文件
require('dotenv').config({path: './config.env'})
//mysql数据库配置
let config={
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}
module.exports = {
    //连接数据库,使用mysql连接池方式连接
    sqlConnect: function (sql, sqlArr, callBack) {
        //连接池对象
        var pool = mysql.createPool(config)
        pool.getConnection((err, conn) => {
            if (err) {
                console.log(err);
                console.log('连接失败');
                return;
            }
            console.log('连接成功');
            //事件驱动回调
            conn.query(sql, sqlArr, callBack);
            //释放连接
            conn.release()
        })
    }
}
