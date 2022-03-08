const mysql = require('mysql');
const config = require('../config/config.js');

const pool = mysql.createPool({
    host: config.mysql.HOST,
    user: config.mysql.USERNAME,
    password: config.mysql.PASSWORD,
    database: config.mysql.DATABASE
});

let querySync = async function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.error("sql error", err);
                // reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        console.error("sql error", err);
                        reject(err)
                    } else {
                        // console.log("mysql success")
                        resolve(rows)
                        // console.log("mysql: ",rows)
                        // return "success"
                    }
                    connection.release()
                })
            }
        })
    })

}

let query = async function (sql, values) {
    let res = await querySync(sql, values);
    return res
    // console.log('sql:', sql)
    // let r = await querySync(sql,values)
    // r.then(res => {
    //     console.log("query res:",res);
    // })
    // console.log("r 01", r);
    // return "haha"
    // var res = 'cc'
    // var bb = await querySync(sql, values)
    //     .then(r => {
    //     console.log("log r", r)
    //         res = r
    //     return "jjj"
    // }).catch
    // (err => {
    //     console.error(err)
    //     return {}
    // })
    // console.log("bb", bb)
    // return res

}


// let query = function( sql, values ) {
// pool.getConnection(function(err, connection) {
//   // 使用连接
//   connection.query( sql,values, function(err, rows) {
//     // 使用连接执行查询
//     console.log(rows)
//     connection.release();
//     //连接不再使用，返回到连接池
//   });
// });
// }

let boards =
    "CREATE TABLE\n" +
    "IF\n" +
    "\tNOT EXISTS `transez`.`boards` (\n" +
    "\t\t`expired` TIMESTAMP ( 6 ) NULL ON UPDATE CURRENT_TIMESTAMP ( 6 ) COMMENT '过期时间',\n" +
    "\t\t`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,\n" +
    "\t\t`name` VARCHAR ( 75 ) UNIQUE NOT NULL COMMENT '剪切板名称',\n" +
    "\t\t`created` TIMESTAMP ( 6 ) NULL ON UPDATE CURRENT_TIMESTAMP ( 6 ) COMMENT '创建时间',\n" +
    "\t\t`views` INT ( 4 ) NOT NULL COMMENT '浏览次数',\n" +
    "\t\t`content_uri` VARCHAR ( 255 ) NOT NULL COMMENT '文本地址',\n" +
    "\t\t`password` VARCHAR ( 30 ) NOT NULL COMMENT '密码',\n" +
    "\t\t`active_time` CHAR ( 7 ) NOT NULL COMMENT '过期时间（天数展示文本）',\n" +
    "\t\t`last_view` TIMESTAMP ( 6 ) NULL ON UPDATE CURRENT_TIMESTAMP ( 6 ) COMMENT '上次浏览时间',\n" +
    "\t\t`ban` INT ( 1 ) NOT NULL DEFAULT 0 COMMENT '是否可用',\n" +
    "\t\t`readonly_id` VARCHAR ( 255 ) NOT NULL COMMENT '只读id',\n" +
    "\t\t`session` VARCHAR ( 16 ) CHARACTER \n" +
    "\t\tSET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'session',\n" +
    "\tPRIMARY KEY ( `id`, `name`, `readonly_id` ));"

// console.log(boards)
let files =
    "CREATE TABLE\n" +
    "IF\n" +
    "\tNOT EXISTS `transez`.`boards` (\n" +
    "\t\t`expired` TIMESTAMP ( 6 ) NULL  DEFAULT CURRENT_TIMESTAMP ( 6 ) COMMENT '过期时间',\n" +
    "\t\t`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,\n" +
    "\t\t`name` VARCHAR ( 75 ) UNIQUE NOT NULL COMMENT '剪切板名称',\n" +
    "\t\t`created` TIMESTAMP ( 6 ) NULL DEFAULT CURRENT_TIMESTAMP ( 6 ) COMMENT '创建时间',\n" +
    "\t\t`views` INT ( 4 ) NOT NULL DEFAULT 0 COMMENT '浏览次数',\n" +
    "\t\t`content_uri` VARCHAR ( 255 ) NOT NULL COMMENT '文本地址',\n" +
    "\t\t`password` VARCHAR ( 30 ) NOT NULL DEFAULT '' COMMENT '密码',\n" +
    "\t\t`active_time` CHAR ( 7 ) NOT NULL DEFAULT '三天' COMMENT '过期时间（天数展示文本）',\n" +
    "\t\t`last_view` TIMESTAMP ( 6 ) NOT NULL DEFAULT CURRENT_TIMESTAMP ( 6 ) ON UPDATE CURRENT_TIMESTAMP ( 6 ) COMMENT '上次浏览时间',\n" +
    "\t\t`updated` TIMESTAMP ( 6 ) NOT NULL DEFAULT CURRENT_TIMESTAMP ( 6 ) ON UPDATE CURRENT_TIMESTAMP ( 6 ) COMMENT '更新时间',\n" +
    "\t\t`ban` INT ( 1 ) NOT NULL DEFAULT 0 COMMENT '是否可用',\n" +
    "\t\t`readonly_id` VARCHAR ( 255 ) NOT NULL COMMENT '只读id',\n" +
    "\t\t`session` VARCHAR ( 16 ) CHARACTER \n" +
    "\t\tSET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT 'session',\n" +
    "\tPRIMARY KEY ( `id`, `name`, `readonly_id` ));"

let createTable = function (sql) {
    console.log("create table")
    return querySync(sql, [])
}

// 建表
createTable(boards)
createTable(files)
// createTable(comment)


module.exports = {
    query,
    createTable,
    querySync

}

