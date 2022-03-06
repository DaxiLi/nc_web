/*
 * @Description: 
 * @Author: Yuan Jie
 * @Data: 
 * @LastEdit: moogila@outlook.com
 * @LastEditTime: 2022-03-03 15:05:28
 * @FileName: 
 */

var index = async (ctx, next) => {
    ctx.body = `<p>hello!</p>`
}
var fun_api = async (ctx, next) => {
    ctx.body = `<p>hello!</p>`
}


module.exports = {
    "router": [
        {
            "method": "GET",
            "path": '/',
            "fun": index
        },
        {
            "method": "GET",
            "path": "apil",
            "fun": fun_api
        }
    ]
    // 'GET /api/': index,
    // 'GET /apil/': fun_api
    // 'GET /:board_name': fun_board,
    // 'POST /signin': fn_signin
};