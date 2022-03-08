// var {event, path, token, data} = {}
// var board = null

// function checkMethod(support, method){
//     if (ctx.request.method == 'POST'){
//         ctx.body = JSON.stringify({
//             "status": -1,
//             "errcode": 401,
//             "msg": "仅支持 GET",
//             "data": {},
//         })
//         return;
//     }
// }


// const ret_data = function (success, msg, data) {
//     return {
//         "status": -1,
//         "errcode": 504,
//         "msg": msg ? msg : "服务错误",
//         "data": {},
//     }
// }
// const bad_request = function (msg) {
//     return {
//         "status": -1,
//         "errcode": 402,
//         "msg": msg ? msg : "错误的请求",
//         "data": {},
//     }
// }
//
//
// const author_fail = function (msg) {
//     return {
//         "status": -1,
//         "errcode": 401,
//         "msg": msg ? msg : "请输入密码",
//         "data": {},
//     }
// }
//
// const method_error = function (msg) {
//     return {
//         "status": -1,
//         "errcode": 402,
//         "msg": msg ? `仅支持 ${msg}` : "不支持的方法",
//         "data": {},
//     }
// }
//
// const serve_error = function (msg) {
//     return {
//         "status": -1,
//         "errcode": 504,
//         "msg": msg ? msg : "服务错误",
//         "data": {},
//     }
// }
//
// const not_found = function (msg) {
//     return {
//         "status": -1,
//         "errcode": 404,
//         "msg": msg ? msg : "不可用",
//         "data": {},
//     }
// }
//
// const not_allow = function (msg) {
//     return {
//         "status": -1,
//         "errcode": 501,
//         "msg": msg ? msg : "非法操作",
//         "data": {},
//     }
// }

const MODEL = require('../model/model.js')
const DB = require('../utils/mysql.js')
let Board = require('../model/board')
const QN = require('../utils/qnOpt')
const CONFIG = require('../config/config')

const STATUS = {
    success: {
        "status": 0,
        "errcode": 200,
        "msg": "success",
        "data": {}
    },
    author_fail: {
        "status": -1,
        "errcode": 401,
        "msg": "请输入密码",
        "data": {}
    },
    bad_request: {
        "status": -1,
        "errcode": 402,
        "msg": "错误的请求",
        "data": {},
    },
    method_error: {
        "status": -1,
        "errcode": 402,
        "msg": `不支持的方法`,
        "data": {},
    },
    serve_error: {
        "status": -1,
        "errcode": 504,
        "msg": "服务错误",
        "data": {},
    },
    not_found: {
        "status": -1,
        "errcode": 404,
        "msg": "不可用",
        "data": {},
    },
    not_allow: {
        "status": -1,
        "errcode": 501,
        "msg": "非法操作",
        "data": {},
    }

}

const response = function (status, msg, data) {
    console.log("response:", msg, data)
    return {
        "status": status.status,
        "errcode": status.errcode,
        "msg": msg ? msg : status.msg,
        "data": data ? data : status.data,
    }
}

// function authorPasswd(client_passwd, session,){
//     if (!board_passwd && board_passwd === ''){
//         return true
//     }
//     if ()
// }

const get = async function (ctx) {
    if (ctx.request.method == 'POST') {
        console.log("mehod err")
        ctx.body = JSON.stringify(response(STATUS.method_error, "test", {}))
        return;
    }
    const {path, data, password} = ctx.request.query
    const board = ctx.params.board_name || ctx.params[0] || path
    if (board == null) {
        ctx.body = JSON.stringify(response(STATUS.bad_request))
    }
    console.log(board)
    let mBoard = new Board(board)
    await mBoard.read()
    // 有密码，需要检验 session
    // console.log("board paswd:", mBoard.password);
    // console.log("client passwd:", password)
    if (mBoard.password !== '') {
        if (password === mBoard.password) {
            ctx.session.session = mBoard.session;
        }
        // else {
        //     // 主动输入错误密码，失去登录态
        //     ctx.body = JSON.stringify(response(STATUS.author_fail))
        //     return
        // }
        if (ctx.session.session !== mBoard.session) {
            ctx.body = JSON.stringify(response(STATUS.author_fail))
            return
        }
    }
    mBoard.views += 1;
    mBoard.save()
    var boardObj = mBoard.toSafeObj()
    console.log(boardObj)
    boardObj.contentUrlRead = QN.getDownloadUrl(mBoard.contentUrl, 3600)
    boardObj.contentUrl = CONFIG.site.qiniu_url + '/' + boardObj.contentUrl
    boardObj.readonlyUrl = '/p/' + boardObj.readonlyId
    ctx.body = JSON.stringify(response(STATUS.success, "success", {context: boardObj}))

}


const EXPIRE = {
    1: "1天", 2: "2天", 3: "3天", 7: "一周",
    15: "半个月", 30: "一个月", 90: "三个月",
    180: "六个月", 365: "一年",
}

const save = async function (ctx) {
    console.log("event: SAVE");
    if (ctx.request.method == 'GET') {
        ctx.body = JSON.stringify(response(STATUS.method_error))
        return;
    }
    // const {path, password, data} = ctx.request.query
    // POST 暂不支持 url encode
    const {path, password, data} = ctx.request.body
    const board = ctx.params.board_name || ctx.params[0] || path
    if (board == null) {
        ctx.body = JSON.stringify(response(STATUS.bad_request))
    }
    let mBoard = new Board(board)
    await mBoard.read()
    if (mBoard.password !== '') {
        // console.log("client passwd:", password)
        // console.log("serve passwd:", mBoard.password)
        // console.log(password === mBoard.password)
        if (password === mBoard.password) {
            ctx.session.session = mBoard.session;
        }
        // console.log("client session:", ctx.session.session)
        // console.log("serve session:", mBoard.session)
        // console.log("type client", typeof ctx.session.session)
        // console.log("type serve", typeof mBoard.session)
        // console.log(ctx.session.session !== mBoard.session)
        if (ctx.session.session !== mBoard.session) {
            ctx.body = JSON.stringify(response(STATUS.author_fail))
            return
        }
    }
    // 没有任何数据，bad
    if (!data || !data.expired) {
        ctx.body = JSON.stringify(response(STATUS.bad_request))
        return
    }
    if (typeof data.expired !== 'number') {
        ctx.body = JSON.stringify(response(STATUS.bad_request, "到期日期必须为数字"))
        return
    }
    if (!EXPIRE[data.expired]) {
        ctx.body = JSON.stringify(response(STATUS.bad_request, "到期日期必须不合法"))
        return
    }
    mBoard.expired.setDate(new Date().getDate() + data.expired);
    // mBoard.expired = mBoard.expired.getDate() + data.expired;
    mBoard.activeTime = EXPIRE[data.expired];
    //带有密码
    // 设置新密码
    if (data.password) {
        console.log("new passwd")
        mBoard.newPassword = data.password
        // 更新密码后，session 也会变
        ctx.session.session = mBoard.session
    }
    await mBoard.save()
    ctx.body = JSON.stringify(response(STATUS.success))
}

const upload = function (ctx) {
    if (ctx.request.method == 'GET') {
        ctx.body = JSON.stringify(response(STATUS.method_error))
        return;
    }
}

const uploadToken = function (ctx) {
    if (ctx.request.method == 'POST') {
        ctx.body = JSON.stringify(response(STATUS.method_error))
        return;
    }
}

const del = function (ctx) {
    if (ctx.request.method == 'GET') {
        ctx.body = JSON.stringify(response(STATUS.method_error))
        return;
    }
}

const default_fun = function (ctx) {
    ctx.body = JSON.stringify(response(STATUS.method_error))
}

// func = {
//     'get': get,
//     'save':save,
//     'upload': upload,
//     'uploadToken': uploadToken,
//     'del': del
// }


module.exports = async function (ctx, event) {
    // let event = ctx.request.body.event || ctx.request.query.event || "errorevent";
    if (!event) {
        console.log("err event")
        default_fun(ctx);
        return;
    }
    board = ctx.params.board_name || ctx.params[0] || path
    console.log("event12345:", event);
    if (event) {
        switch (event) {
            case 'get':
                await get(ctx);
                break;
            case 'save':
                await save(ctx);
                break;
            case 'upload':
                await upload(ctx);
                break;
            case 'uploadToken':
                await uploadToken(ctx);
                break;
            case 'del':
                await del(ctx);
                break;
            default:
                await default_fun(ctx);
                break;
        }
    }
}
