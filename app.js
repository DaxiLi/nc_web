/*
 * @Description: 
 * @Author: Yuan Jie
 * @Data: 
 * @LastEdit: moogila@outlook.com
 * @LastEditTime: 2022-01-23 20:51:32
 * @FileName: 
 */
const Koa = require('koa');
// const response = require('koa/lib/response');

const controller = require('./controller');

const body_Parser = require('koa-bodyparser');

const app = new Koa();

const config = require('./config/config')


app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// parse request body:
app.use(body_Parser());

app.use(controller());

app.listen(config.serve.port);
console.log(`app start at port ${config.serve.port}`);