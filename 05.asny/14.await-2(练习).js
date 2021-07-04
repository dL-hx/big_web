let co = require("co");
//模拟异步操作
let wait = (t) => {
    return new Promise((resolve, reject) => {
        console.log("start:" + t);
        setTimeout(() => {
            console.log(t);
            resolve();
        }, t);
    })
}
//co库的用法
co(function* () {
    let p = yield [wait(500), wait(200), wait(2000)];
    console.log("finish");
})
//原生async/await的用法
let app = async () => {
    let p = await Promise.all([wait(500), wait(200), wait(2000)]);
    console.log("finish");
}
app();