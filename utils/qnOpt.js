
qiniu = require('qiniu');

let accessKey = "mTPa-pWHfGa2jB_VfphIDEBiMnBz8mGENJkab7on";
let secretKey = "nNZM_K6gnDtdl44g0b5oSsoP88QXmAtkhHRIqOGp"
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

// 获得指定 path 的上传凭证
exports.getUploadKey = function(){
    //自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
    const options = {
        scope: 'stary:boards/' + '1.txt',
        // 默认 300 s
        expires:  300//expiredTime ||
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    return uploadToken
};



// export {
//     getUploadKey
//
// }

