// 1.Promise 是一个构造函数, 既然是构造函数, 那么,我们就可以 new Promise()得到一个Promise 的实例;
// 2.在Promise上, 有两个函数, 分别叫做resolve (成功之后的回调函数)和reject (失败之后的回调函数)
// 3.在Promise 构造函数的Prototype 属性上, 有一个 .then()方法, 也就是说, 只要是Promise 构造函数创建的实例, 都可以访问到.then() 方法
// 4.Promise 表示一个异步操作, 每当我们new 一个Promise 的实例, 这个实例, 就表示一个具体的异步操作
// 5. 既然Promise 创建的实例, 是一个异步操作, 那么, 这个异步操作的结果, 只能由两种状态
//  + 状态1 : 成功, 在内部调用 成功的回调函数 resolve 把结果返回给调用者
//  + 状态2 : 失败, 在内部调用 失败的回调函数 reject 把失败的结果返回给调用者
//  + 由于Promise 的实例, 是一个异步操作, 所以, 内部拿到操作的结果后, 无法使用 return 把操作的结果返回给调用者; 这时候, 只能使用回调函数的形式, 来把 成功 or 失败的结果, 返回给调用者;
//6. 我们可以在new 出来的Promise 实例上, 调用 .then() 方法, [预先]为这个 Promise 异步操作, 指定成功(resolve) 和 失败(reject) 回调函数

// 注意: 这里 new 出来的promise, 只是代表[形式上]的一个异步操作;
// 什么是形式上的异步操作, 就是说, 我们只知道它是一个异步操作, 但是做什么具体的异步事情, 目前还不清除

// var promise = new Promise();

// 这是一个具体的异步操作, 其中, 使用 function 指定一个具体的异步操作
/* var promise = new Promise(function(){
    // 这里function 内部写的就是具体的异步操作
})
 */

const fs = require("fs");

// 每当new 一个Promise 实例的时候, 就会立即执行 这个异步操作中 的代码

// 也就是说, new 的时候, 除了能够得到一个promise 实例之外, 还会立即调用 我们为Promise构造函数传递的那个function, 执行这个function 中的操作代码;

/* var promise = new Promise(function(){
    fs.readFile('./files/2.txt','utf-8', (err, dataStr)=>{
        if(err) throw err

        console.log(dataStr);
    } )
})
 */

//  初衷, 给路径, 返回读取到的内容
function getFileByPath(fpath) {
  var promise = new Promise(function (resolve, reject) {
    fs.readFile(fpath, "utf-8", (err, dataStr) => {
      if (err) {
        return reject(err);
      }
      resolve(dataStr);
    });
  });

  return promise;
}

// Promise.then 的作用, 预先为 promise 的回调函数, 指定[成功/ 失败]的回调
var p = getFileByPath("./files/222.txt");

p.then(
  function (data) {
    console.log(data + "----");
  },
  function (err) {
    console.log(err.messaage);
  }
);
