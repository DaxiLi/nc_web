const mysql = require('mysql');
const config = require('../config/config.js');

const pool = mysql.createPool({
    host: config.mysql.HOST,
    user: config.mysql.USERNAME,
    password: config.mysql.PASSWORD,
    database: config.mysql.DATABASE
});

let query = function (sql, values) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

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
    "CREATE TABLE if not exists `transez`.`boards`  (" +
    "    `expired` timestamp(6) NULL ON UPDATE CURRENT_TIMESTAMP(6)," +
    "    `id` int UNSIGNED NOT NULL AUTO_INCREMENT," +
    "    `name` varchar(75) NOT NULL," +
    "    `created` timestamp(6) NULL ON UPDATE CURRENT_TIMESTAMP(6)," +
    "    `views` int(4) NOT NULL," +
    "    `content_uri` varchar(255) NOT NULL," +
    "    `password` varchar(30) NOT NULL," +
    "    `active_time` char(7) NOT NULL," +
    "    `last_view` timestamp(6) NULL ON UPDATE CURRENT_TIMESTAMP(6)," +
    "    `ban` bit(1) NOT NULL DEFAULT 0," +
    "    `readonly_id` varchar(255) NOT NULL," +
    "    PRIMARY KEY (`id`, `name`, `readonly_id`)" +
    ");"

let files =
    "CREATE TABLE if not exists  `transez`.`files`  (\n" +
    "  `fid` int NOT NULL,\n" +
    "  `name` varchar(75) NOT NULL,\n" +
    "  `file_uri` varchar(255) NOT NULL,\n" +
    "  `created` timestamp(6) NULL,\n" +
    "  `download` int(4) NOT NULL DEFAULT 0,\n" +
    "  `size` bigint(15) NULL,\n" +
    "  `path` varchar(255) NULL,\n" +
    "  PRIMARY KEY (`fid`, `name`)\n" +
    ");"

let createTable = function (sql) {
    return query(sql, [])
}

// 建表
createTable(boards)
createTable(files)
// createTable(comment)


module.exports = {
    query,
    createTable,


}

