const promise = new Promise(function (resolve, reject) {
    // 这里用来"兑现"承诺

    // resolve(100)// 承诺达成

    reject(new Error('promise rejected'))// 承诺失败
})


promise
    .then(function(value){
        console.log(value);
    },function (error) {
        console.log(error);
    })

console.log('end');// 先打印同步代码 ,  后执行异步任务

