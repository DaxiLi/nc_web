/*
 * @Description: 
 * @Author: Yuan Jie
 * @Data: 
 * @LastEdit: moogila@outlook.com
 * @LastEditTime: 2022-03-03 14:41:41
 * @FileName: 
 */
const fs = require('fs');


function addRoute(router, routes) {
    for (i in routes) {
        let rule = routes[i];
        switch (rule.method){
            case 'GET':
                if (rule.path && rule.fun){
                    router.get(rule.path, rule.fun)
                    console.log("GET add route: ", rule.path)
                }else {
                    console.log("POST route invalid path!")
                }
                break;
            case 'POST':
                if (rule.path && rule.fun){
                    router.post(rule.path, rule.fun)
                    console.log("POST add route: ", rule.path)
                }else {
                    console.log("POST route invalid path!")
                }
                break;
            case 'PUT':
                if (rule.path && rule.fun){
                    router.put(rule.path, rule.fun)
                    console.log("PUT add route: ", rule.path)
                }else {
                    console.log("PUT route invalid path!")
                }
                break;
            case 'DELETE':
                if (rule.path && rule.fun){
                    router.delete(rule.path, rule.fun)
                    console.log("DELETE add route: ", rule.path)
                }else {
                    console.log("DELETE route invalid path!")
                }
                break;
            case 'HEAD':
                if (rule.path && rule.fun){
                    router.head(rule.path, rule.fun)
                    console.log("HEAD add route: ", rule.path)
                }else {
                    console.log("HEAD route invalid path!")
                }
                break;
            default:
                console.log('Unsupport Method: ', rule.method);
        }
    }
    console.log("controller added end")
}
function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`process controller: ${f}...`);
        let control = require(__dirname + '/' + dir + '/' + f);
        addRoute(router, control.router);
    });
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};