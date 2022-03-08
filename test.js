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

// const doSomethingAsync = () => {
//     return new Promise(resolve => {
//         setTimeout(() => resolve('I did something'), 3000)
//     })
// }
//
// const doSomething = async () => {
//     console.log(await doSomethingAsync())
// }
//
// console.log('Before')
// doSomething()
// console.log('After')



// let tools = require('./utils/tools')
// // // var a = 16
// var i = 1
// while (i < 1000){
//     i++
//     console.log("NO:" + i + "  " + tools.getUniqueID())
// }
// console.log(tools.getUniqueID())
// console.log(tools.getRandomName())
// console.log(tools.getRandomName())
// console.log(tools.getRandomName())
// console.log(tools.getRandomName())
// console.log(tools.getRandomName())
// console.log(tools.getRandomName())
// console.log(tools.getRandomName())
// data = {}
// i = 1;
// while (i < 100000)
// {
//     i++
//     var r = tools.getRandomName()
//     if (data[r]){
//         console.log("chongfu!")
//         break;
//     }else {
//         data[r] = 1
//     }
//
// }
// console.log(data)
// console.log(new Date().getTime())
// *************************************************************************
Board = require('./model/board')

DB = require('./utils/mysql')
let main = async function(){
    var b = new Board('aajjjaa')
    await b.read()

    console.log(b.expired);
    b.expired = new Date();
    b.expired.setDate(b.expired.getDate() + 15);
    console.log(b.expired)

    // console.log(b.toString())
    // console.log(b.created)
    // d = new Date(b.created)
    // console.log(d.getTime())
    //
    // da = new  Date()
    //
    // console.log(b.expired < da)
    // console.log(b.expired == da)
    // console.log(b.expired > da)
    // console.log( da > b.expired)
    //
    // let sql = "update boards set `created` = ? where id = 12;"
    // await DB.querySync(sql,[da])
    // let sql2 = "select * from boards where id = 12;"
    // var  res = await DB.querySync(sql2)
    // console.log(res)


}


main()
// *************************************************************************

// const qiniu = require('./utils/qnOpt')
//
//
// let path = qiniu.getDownloadUrl("boards/1.txt", 3600)
// console.log(path)


/******************************************************/

// var d = {
//     // "created": 2022-03-08T08:31:17.205Z,
//     "expired": 1646987477,
//
// }

//
// B = require('./model/board')
//
// b = new B('a');
// await b.read()


// Board = require('./model/board')
//
// let b = new Board('aaa');
// b.read()