/*
 * @Description: 
 * @Author: Yuan Jie
 * @Data: 
 * @LastEdit: moogila@outlook.com
 * @LastEditTime: 2022-03-03 14:55:58
 * @FileName: 
 */


const  events = require('../api/event.js')

var fun_index = async (ctx, next) => {
    console.log('accept request GET /');
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};


var get_board = async (ctx, next) => {
    // console.log(ctx.params);
    // console.info(ctx.request.query)
    // const {event, path, token, data} = ctx.request.query
    // const board = ctx.params.board_name || ctx.params[0] || path
    let event = (ctx.request.body.event ||  ctx.request.query.event);
    // console.log("body event:", ctx.request.body.event);
    // console.log("query event:", ctx.request.query.event);
    // console.log(ctx.request.body.event ||  ctx.request.query.event)
    console.log("beaore process")
    await events(ctx,event)
    console.log("after process")
    // switch (event){
    //     case 'event':
    //         break;
    //     case 'path':
    //         break;
    // }
    ctx.session.user = 'xxxx';
    // ctx.body = `<p>hello board: ${board}</p>`
};

var post_board = async (ctx, next) => {
    // const board = ctx.params.board_name || ctx.params[0]
    const {event} = ctx.request.body
    ctx.accepts('json')
    await events(ctx,event)
    // console.log('session', ctx.session);
    // ctx.session.user = 'zzz';
    // ctx.body = `<p>hello POST board: ${board} ${event} ${path}</p>`

};

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
            "path": ["/:board_name", /^\/([^\/]*)(\/.*)/i],
            "fun": get_board
        },
        {
            "method":"POST",
            "path": ["/:board_name", /^\/([^\/]*)(\/.*)/i],
            "fun": post_board
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
    ]

};