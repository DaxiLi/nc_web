
var nid = 1
var uid = 1

let getRandomName = function (){
    let timestmp = new Date().getTime();
    if (nid >= 999) {
        nid = 1;
    }else {
        nid++;
    }
    let rand = Math.round(Math.random() * 1000);
    timestmp = timestmp -  1646000000000 + nid;
    return timestmp.toString(36)
}

let getUniqueID = function () {
    let timestmp = new Date().getTime();
    if (uid >= 99999) {
        uid = 1;
    }else {
        uid++;
    }
    let rand = Math.round(Math.random() * 1000);
    return  rand.toString(36)  + uid.toString(36)  +  timestmp.toString(36);
    // return timestmp.toString(16) + "-" + uid.toString(16) + "-" + rand.toString(16);
    // return timestmp.toString() + "-" + uid.toString() + "-" + rand.toString();
    // return timestmp.toString(32) + "-" + (uid.toString() + rand.toString()).toString(32);
}
module.exports = {
    getUniqueID,
    getRandomName
}

// 716630244-2-625
// 716630245-3-481
// 716630245-4-394
// 716630245-5-551
// 716630245-6-459
// 716630245-7-774
// 716630246-8-714
