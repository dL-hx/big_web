// promise 中几个静态方法
// Promise.resolve() / Promise.reject()
// 快速把一个值转换为promise对象
// 快速把创建一个失败的promise
Promise.resolve('foo')
    .then(function (value) {
        console.log(value);// 'foo'
    })

// 等价于 1
new Promise((resolve, reject)=>{
    resolve('foo')
})
// 等价于 2
Promise.resolve({// 实现了thenabled 接口 
    then:function (onFulfilled, onRejected) {
        onFulfilled('foo')
    }
}) .then(function (value) {
    console.log(value);// 'foo'
})


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

// var promise = ajax('/api/urls.json')
// var promise2 = Promise.resolve(promise)
// console.log(promise2==promise); // then


Promise.reject(new Error('rejected'))
    .catch(err=>{
        console.log(err);
    })
