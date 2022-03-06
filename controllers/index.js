/*
 * @Description: 
 * @Author: Yuan Jie
 * @Data: 
 * @LastEdit: moogila@outlook.com
 * @LastEditTime: 2022-03-03 14:55:58
 * @FileName: 
 */
var fun_index = async (ctx, next) => {
    console.log('accept request GET /');
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};


var fun_board = async (ctx, next) => {
    console.log(ctx.params);
    const board = ctx.params.board_name
    ctx.body = `<p>hello board: ${board}</p>`
}
var fun_pboard = async (ctx, next) => {
    console.log(ctx.params);
    const board = ctx.params.board_name
    ctx.body = `<p>hello readonly board: ${board}</p>`
}

var fn_signin = async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
};


module.exports = {
    "router":[
        {
            "method":"GET",
            "path": '/',
            "fun": fun_index
        },
        {
            "method":"GET",
            "path": /^\/blog\/\d{4}-\d{2}-\d{2}\/?$/i,
            "fun": fun_index
        },
        {
            "method":"GET",
            "path": '/p/:board_name/',
            "fun": fun_pboard
        },
        {
            "method":"GET",
            "path": '/p/:board_name',
            "fun": fun_pboard
        }
        // ,
        // {
        //     "path": '',
        //     "fun": fun_index
        // }
    ]
    // 'GET /': fun_index,
    // 'GET /board': fun_board,
    // // 'GET /:board_name/': fun_board,
    // // 'GET /:board_name': fun_board,
    // 'GET /p/:board_name/': fun_pboard,
    // 'GET /p/:board_name': fun_pboard,
    // 'POST /signin': fn_signin
};