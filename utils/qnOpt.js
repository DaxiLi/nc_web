qiniu = require('qiniu');
const CONFIG = require('../config/config')

let accessKey = "mTPa-pWHfGa2jB_VfphIDEBiMnBz8mGENJkab7on";
let secretKey = "nNZM_K6gnDtdl44g0b5oSsoP88QXmAtkhHRIqOGp"
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var config = new qiniu.conf.Config();
var bucketManager = new qiniu.rs.BucketManager(mac, config);
// 获得指定 path 的上传凭证
let getUploadKey = function () {
    //自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
    const options = {
        scope: 'stary:boards/' + '1.txt',
        // 默认 300 s
        expires: 300//expiredTime ||
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    return uploadToken
};
// let req = {
//     "event": "save",
//     "path": "suf",
//     "password": "",
//     "data": {
//         "expired": 7,
//         "password": "kkk"
//     }
// }
// 对指定资源连接获得下载 url
// file key 是文件资源路径 不带 / ，
// out time 以秒为单位，表示，几秒内具有访问权限
let getDownloadUrl = function (file_key, out_time) {
    if (!file_key) {
        console.log("file key:", file_key)
        return "error"
    }
    // var privateBucketDomain = 'http://stary.img.jieis.cn';
    var deadline = parseInt(Date.now() / 1000) + (out_time ? out_time : 3600); // 1小时过期
    console.log(deadline)
    var privateDownloadUrl = bucketManager.privateDownloadUrl(CONFIG.site.qiniu_url, file_key, deadline);
    return privateDownloadUrl;

}

module.exports = {
    getDownloadUrl,
    getUploadKey
}


// export {
//     getUploadKey
//
// }

