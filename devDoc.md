# 路由

使用 controllers.js 解析 controller 目录下的js文件

controller目录下的文件 向外暴露一个 router 数组，数组 包含需要处理的路由，请求方式等信息

# 鉴权

通过 session 鉴别用户密码登录，session 中存有 key 字段，该字段保存在对应剪切板的数据库 session 字段中，
当 user.session.key == db.board.session 时，即认为该用户拥有该剪切板查看权。

# db.session 生成规则

更新密码时，session = md5(board.name + unix_timestamp) 

# 建表

```sql
CREATE TABLE
IF
	NOT EXISTS `transez`.`boards` (
		`expired` TIMESTAMP ( 6 ) NULL DEFAULT CURRENT_TIMESTAMP ( 6 ) COMMENT '过期时间',
		`id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
		`name` VARCHAR ( 75 ) NOT NULL COMMENT '剪切板名称',
		`created` TIMESTAMP ( 6 ) NULL DEFAULT CURRENT_TIMESTAMP ( 6 ) COMMENT '创建时间',
		`views` INT ( 4 ) NOT NULL DEFAULT 0 COMMENT '浏览次数',
		`content_uri` VARCHAR ( 255 ) NOT NULL COMMENT '文本地址',
		`password` VARCHAR ( 30 ) NOT NULL DEFAULT '' COMMENT '密码',
		`active_time` CHAR ( 7 ) NOT NULL DEFAULT '三天' COMMENT '过期时间（天数展示文本）',
		`last_view` TIMESTAMP ( 6 ) NOT NULL DEFAULT CURRENT_TIMESTAMP ( 6 ) ON UPDATE CURRENT_TIMESTAMP ( 6 ) COMMENT '上次浏览时间',
		`updated` TIMESTAMP ( 6 ) NOT NULL DEFAULT CURRENT_TIMESTAMP ( 6 ) COMMENT '更新时间',
		`ban` INT ( 1 ) NOT NULL DEFAULT 0 COMMENT '是否可用',
		`deleted` INT (1) NOT NULL DEFAULT 0 COMMENT '剪切板是否删除',
		`readonly_id` VARCHAR ( 255 ) UNIQUE NOT NULL COMMENT '只读id',
		`session` VARCHAR ( 16 ) CHARACTER 
		SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT 'session',
	PRIMARY KEY ( `id`, `name`, `readonly_id` ));
```

# SQL 处理

## 异步 

此处，在 JavaScript 的异步同步请求中，卡住。之前写微信小程序，使用过异步请求，但是，细节了解不清，导致这次在使用中出现了很多问题，搞得晕头转向

在 JavaScript 中，异步请求通常使用回调函数的方式，但是，这会让代码不断嵌套......很多问题。
类似这样
```javascript
function callback(){
    //dosomething call back.... w
}
syncFun(arg,callback())
```

在 ES2015 中，引入了 Promise ，不过，带来了更复杂的语法问题。
此时，可以这样

```javascript
let syncFun = function() {
    return Promise(
        resolve => {
        //do something success
        },
            reject => {
            // do something fail
        })
}

syncFun.then(res => {
    // doSomething call back
})
```

实际上， Promise 仅仅只是让异步回调过程更加美观而已（我在写小程序时，记录过这一条，但是由于表述不清，我忘了是这个意思）

因为这两种写法，在运行时，**都不会等待方法返回，直接执行后面的代码**，所以 Promise 仅仅只是让回调嵌套层数的问题

想要等待函数返回，需要使用  await 关键字

await 会等待函数执行完毕，再执行后面的代码，不过，await 关键字 必须在 async 的函数里面使用。

所以，
```javascript
let  syncFun = async function (){
    return Promise(resolve => {
        
    },reject => {
        
    })
}
// s函数内部使用 await ，函数必须表明 async
let fun1 = async function (){
    await syncFun();
}

let  main = async function (){
    await fun1()
}


await main()
```

就这样，每次调用 async 的函数，都必须使用 await ，否则，就是异步.......

你懂得吧？

## 唯一 ID

剪切板只读连接需要一个唯一 ID，生成使用
时间戳 +局部id + 随机数的方式