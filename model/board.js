const DB = require('../utils/mysql.js')
const CONFIG = require('../config/config')
const TOOLS = require('../utils/tools')


/*
    ~~一个懒加载的~~ 类，~~只有在的确需要操作数据库的情况下，才~~会操作数据库

    我觉得在我的代码中，懒加载意义不大，徒增判断罢了

 */

module.exports = class Board {

    #now = Math.round(new Date().getTime() / 1000)
    // #jj = "ll"
    #_kk = "xsx"
    #_id = null
    #_name
    #_created
    #_expired
    #_views
    #_contentUrl
    #_password
    #_new_password = ''
    #_activeTime
    #_lastView
    #_ban
    #_readonlyId
    #_session

    #_refreshed = false
    #_default_expired = 259200

    constructor(name) {
        this.name = name || TOOLS.getRandomName();
        // this.read()
    }


// 强制从数据库刷新数据
    async read() {
        console.log("start read")
        let sql = "select * from boards where name = ?"
        sql = "SELECT " +
            "`id`, `name`, `created`, `expired`  as expired, \n" +
            "`views`, `active_time` as activeTime,`ban`, `content_uri` as contentUrl,\n" +
            "`last_view` as lastView, `password`, `readonly_id` as readonlyId, `session` \n" +
            "FROM record WHERE \n" +
            "name = ?;"
        console.log("do search")
        var res = await DB.querySync(sql, [this.#_name])
        if (res.length === 0) {                                     // 没有查询到记录
            console.log("no board named: " + this.#_name);
            await this.createBoard()
            res = await DB.querySync(sql, [this.#_name])
        } else if (res[0].expired < this.#now) {                    // 已过期
            await this.deleted()
            await this.createBoard()
            res = await DB.querySync(sql, [this.#_name])
        }
        console.log("finded..")
        for (var val in res[0]) {
            if (val === 'password') {
                this.#_password = res[0][val]
            } else {
                this[val] = res[0][val]
            }
        }
        console.log(typeof (res[0].created))
        console.log(res[0].created.keys)
        console.log(typeof (res[0].expired))
        console.log("read finished")
        this.#_refreshed = true;
    }


    async deleted() {
        console.log("deleted name:" + this.#_name)
        let sql = "UPDATE boards SET `deleted` = 1 WHERE name = ? AND deleted = 0;"
        await DB.querySync(sql, [this.#_name]);
    }

    async createBoard() {
        console.log("create a new board named: " + this.#_name)
        let timestamp = new Date().getTime();
        let sql = "INSERT INTO boards ( `name`, `expired`, `content_uri`, `readonly_id`, `session` )\n" +
            "VALUES ( ?, DATE_ADD( now(), INTERVAL 3 DAY ), ?, ?, ?);"
        let vals = [this.#_name, CONFIG.site.content_dir + TOOLS.getUniqueID(), TOOLS.getUniqueID(), TOOLS.getUniqueID()]
        let res = await DB.querySync(sql, vals);
        console.log(res)
    }

    getAll() {

    }

    // 将数据写入数据库
    async save() {
        let sql = "UPDATE boards SET `expired` = ? ,`views` = ?,`password` = ?,`active_time` = ?,`session` = ? WHERE id = ?;"
        await DB.querySync(sql, [this.expired, this.views, this.password, this.activeTime, this.session, this.id]);
        console.log("save array:", [this.expired, this.views, this.password, this.activeTime, this.session, this.id])
    }

    get name() {
        return this.#_name
    }

    set name(name) {
        this.#_name = name;
    }

    get contentUrl() {
        // while (!this.#refreshed){
        //     // console.log("wait...,", this.#refreshed)
        // }
        return this.#_contentUrl
    }

    set contentUrl(uri) {
        this.#_contentUrl = uri;
    }

    get id() {
        return this.#_id;
    }

    set id(value) {
        this.#_id = value;
    }

    get created() {
        return this.#_created;
    }

    set created(value) {
        this.#_created = value;
    }

    get expired() {
        return this.#_expired;
    }

    set expired(value) {
        this.#_expired = value;
    }

    get views() {
        return this.#_views;
    }

    set views(value) {
        this.#_views = value;
    }

    get password() {
        return this._new_password || this.#_password;
    }

    set password(value) {
        if (value !== this.password) {
            this.#_password = value;
            this.#_session = TOOLS.getUniqueID()
        }
    }

    set newPassword(value) {
        if (value !== this.password) {
            this.#_password = value;
            this.#_session = TOOLS.getUniqueID()
        }
    }


    get activeTime() {
        return this.#_activeTime;
    }

    set activeTime(value) {
        this.#_activeTime = value;
    }

    get lastView() {
        return this.#_lastView;
    }

    set lastView(value) {
        this.#_lastView = value;
    }

    get ban() {
        return this.#_ban;
    }

    set ban(value) {
        this.#_ban = value;
    }

    get readonlyId() {
        return this.#_readonlyId;
    }

    set readonlyId(value) {
        this.#_readonlyId = value;
    }

    get session() {
        return this.#_session;
    }

    set session(value) {
        this.#_session = value;
    }

    get refreshed() {
        return this.#_refreshed;
    }

    set refreshed(value) {
        this.#_refreshed = value;
    }

    toObj() {
        return {
            name: this.name,
            id: this.id,
            created: this.created,
            expired: this.expired,
            views: this.views,
            contentUrl: this.contentUrl,
            password: this.password,
            activeTime: this.activeTime,
            lastView: this.lastView,
            ban: this.ban,
            readonlyId: this.readonlyId,
            session: this.session
        }
    }

    toSafeObj() {
        return {
            name: this.name,
            id: this.id,
            created: this.created,
            expired: this.expired,
            views: this.views,
            contentUrl: this.contentUrl,
            activeTime: this.activeTime,
            lastView: this.lastView,
            readonlyId: this.readonlyId
        }
    }

    toString() {
        return JSON.stringify({
            name: this.name,
            id: this.id,
            created: this.created,
            expired: this.expired,
            views: this.views,
            contentUrl: this.contentUrl,
            password: this.password,
            activeTime: this.activeTime,
            lastView: this.lastView,
            ban: this.ban,
            readonlyId: this.readonlyId,
            session: this.session
        })
    }

    parse(board) {
        this.name = board.name,
        this.id = board.id,
        this.created = board.created,
        this.expired = board.expired,
        this.views = board.views,
        this.contentUrl = board.contentUrl,
        this.password = board.password,
        this.activeTime = board.activeTime,
        this.lastView = board.lastView,
        this.ban = board.ban,
        this.readonlyId = board.readonlyId,
        this.session = board.session
    }
}