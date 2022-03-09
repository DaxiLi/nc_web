/*
 * @Description: 
 * @Author: Yuan Jie
 * @Data: 
 * @LastEdit: moogila@outlook.com
 * @LastEditTime: 2022-03-05 15:59:02
 * @FileName: 
 */


let config = {
    "site":{
      "text_prefix":"http://stary.img.jieis.cn/",
        "content_dir":"boards/",   // 存放剪切板的目录
        "file_dir": "files/",
        "qiniu_url":"http://stary.img.jieis.cn",
        // "url": ""
    },
    "mysql": {
        "HOST": "127.0.0.1",
        "USERNAME": "web_transEZ",
        "PASSWORD": "web_transEZ_passwd",
        "DATABASE": "transEZ"
    },
    "serve": {
        port: 8005
    },
    qn_conf:{
        accessKey:"mTPa-pWHfGa2jB_VfphIDEBiMnBz8mGENJkab7on",
        secretKey:"nNZM_K6gnDtdl44g0b5oSsoP88QXmAtkhHRIqOGp"
    }
    ,
    session:{
        key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
        /** (number || 'session') maxAge in ms (default is 1 days) */
        /** 'session' will result in a cookie that expires when session/browser is closed */
        /** Warning: If a session cookie is stolen, this cookie will never expire */
        maxAge: 86400000,
        autoCommit: true, /** (boolean) automatically commit headers (default true) */
        overwrite: true, /** (boolean) can overwrite or not (default true) */
        httpOnly: true, /** (boolean) httpOnly or not (default true) */
        signed: true, /** (boolean) signed or not (default true) */
        rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
        renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
        secure: false, /** (boolean) secure cookie*/
        sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */

    }
}


module.exports = config;