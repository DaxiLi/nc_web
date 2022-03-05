// var FormData = require('form-data');
//
// const axios = require('axios')
// const util = require('./utils/qnOpt')
// fs = require('fs')
//
// var k = util.getUploadKey()
//
// var f = fs.readFileSync('./doc.md');
//
// const formData = new FormData();
// let url = "https://up-cn-east-2.qiniup.com/"
// formData.append('token', k);
// formData.append('key', 'boards/1.txt')
// formData.append('fileName', '1.txt')
// formData.append('file', f)
//
// axios({
//     method: 'post',
//     url: url,
//     data: formData,
//     headers: {
//         'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
//     }
// }).then((r)=>{
//     console.log(r.data)
// }).catch((e) => {
//     console.log('上传失败！',e)
// })

// **************************************** TEST UPLOAD END ************************************
sql = require('./utils/mysql')


