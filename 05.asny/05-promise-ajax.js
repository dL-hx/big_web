// Promise 方式的Ajax
function ajax(url) {
    return new Promise(function (resolve, reject) {
        var xhr =  new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'json'
        xhr.onload = function () {
            if (this.status === 200) {
                resolve(this.response)
            }else{
                reject(new Error(this.statusText))
            }
        }


        xhr.send()
    });
}

// ajax('/api/urls.json')
//     .then(function (res) {//onFullFilled 成功回调
//         console.log(res);
//     }, function (error) {//onRejected,失败回调可以省略
//         console.log(error);
//     })

// 等价于
ajax('/api/urls.json')
    .then(function (res) {//onFullFilled 成功回调
        console.log(res);
    })
    .catch( function (error) {//onRejected,失败回调可以省略
        console.log(error);
    })


// ajax('/api/urls.json')
//     .then(function (res) {//onFullFilled 成功回调
//         console.log(res);
//     })
//     .then( undefined ,function (error) {//onRejected,失败回调可以省略
//         console.log(error);
//     })
// 链式调用
var promise = ajax('/api/urls.json')

var promise2 = promise.then(function (res) {//onFullFilled 成功回调
        console.log(res);
    }, function (error) {//onRejected,处理异常回调可以省略
        console.log(error);
    })

// console.log(promise2);

// 链式调用
promise.then(function (res) {//promise
    console.log(111);
    return ajax('/api/urls1.json')
}).then(function (res) {//promise
    console.log(222);
    return ajax('/api/urls2.json')

}).then(function (res) {//promise
    console.log(333);
    return ajax('/api/urls3.json')
}).then(function (res) {//promise
    console.log(444);
    return 'foo'
}).then(function (res) {//promise
    // res = 'foo'
    console.log(444);
}).then(function (res) {//promise
    // res = undefined
    console.log(444);
})




promise.then(function (res) {//promise
    console.log(111);
    return ajax('/api/urls1.json')
}).then(function (res) {//promise
    console.log(222);
    return ajax('/api/urls2.json')

}).then(function (res) {//promise
    console.log(333);
    return ajax('/api/urls3.json')
}).then(function (res) {//promise
    console.log(444);
    return 'foo'
}).then(function (res) {//promise
    // res = 'foo'
    console.log(444);
}).then(function (res) {//promise
    // res = undefined
    console.log(444);
}).catch(function onRejected(error){// 为整个promise链条注册的失败回调
    console.log('onRejected', error);
    
})

// 在代码中明确的捕获每一个可能的异常,  而不是丢给全局统一处理