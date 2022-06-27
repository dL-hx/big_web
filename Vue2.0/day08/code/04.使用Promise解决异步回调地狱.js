const fs = require("fs");

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

// 先读取文件1, 再读取文件2, 最后读取3
// 注意: 通过 .then 指定回调函数的时候,成功的 回调函数,
// 必须传,
// 但是, 失败的回调, 可以省略不传

// 这是一个错误的示范, 千万不要这样用
/* getFileByPath("./files/1.txt").then(
  function (data) {
    console.log(data);

    getFileByPath("./files/2.txt").then(
        function (data) {
          console.log(data);

          getFileByPath("./files/3.txt").then(
            function (data) {
              console.log(data);
          });
      });

}); */

// 读取文件1
// 在上一个 .then中, 返回一个新的promise实例, 可以继续用下一个 .then 来处理
// 如果, 前面的Promise 执行失败, 我们不想让后续的Promise 操作被终止, 可以为每一个Promise 指定失败的回调
/* getFileByPath("./files/11.txt")
  .then(function (data1) {
    console.log(data1);
    // 读取文件2
    return getFileByPath("./files/2.txt");
  }, function(err){
    console.log('这是失败的结果' + err.message);

    // return 一个新的Promise
    return getFileByPath("./files/2.txt");
  })
  .then(function (data2) {
    console.log(data2);

    // 读取文件3
    return getFileByPath("./files/3.txt");
  })
  .then(function (data3) {
    console.log(data3);
  });

 */
console.log("OKOKOK");

// 当我们有这样的需求, 哪怕前面的Promise 执行失败了, 但是, 不要影响后续的Promise 的正常执行,
// 此时, 我们可以单独为 每个promise 通过 .then 的方式, 指定一个失败的回调

// 有时候，我们有这样的需求，个上面的需求刚好相反：如果 后续的Promise 执行，依赖于 前面 Promise 执行的结果，
// 如果前面的失败了，则后面的就没有继续执行下去的意义了，此时，我们想要实现，一旦有报错，则立即终止所有 Promise的执行；

getFileByPath("./files/11.txt")
  .then(function (data1) {
    console.log(data1);
    // 读取文件2
    return getFileByPath("./files/2.txt");
  })
  .then(function (data2) {
    console.log(data2);

    // 读取文件3
    return getFileByPath("./files/3.txt");
  })
  .then(function (data3) {
    console.log(data3);
  })
  .catch(function (err) {
    // catch的作用: 如果前面有任何Promise 执行失败, 则立即终止所有promise 的执行,
    // 并马上 进入catch 去处理Promise 中抛出的异常
    console.log("这是自己的处理方式:" + err.message);
  });
