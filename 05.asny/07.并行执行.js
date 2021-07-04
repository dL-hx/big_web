// Promise 并行执行
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

// ajax('/api/users.json')
// ajax('/api/post.json')

// 入参 [] 数组对象 
// @return promise Obj
// 多个接口 并行执行 
// Promise.all() 等待所有任务结束
const promise = Promise.all([
    ajax('/api/users.json'),
    ajax('/api/post.json')]
    )
promise.then(function (values) {// 都成功才会返回
    console.log(values);
    
}).catch(function (error) {// 其中一个失败 就会失败
    console.log(error);
})



ajax('/api/users.json')// 1 获取所有url地址
    .then(value=>{
        const urls = Object.values(value)
        const task = urls.map(url=> ajax(url))
        return Promise.all(task)
    }).then(values=>{// 拿到每一个异步任务的结果, 是一个数组
        console.log(values);
    })

    // Promise.race() // 只会等待第一个结束的任务

    const request = ajax('/api/users.json')
    const timeout = new Promise((resolve, reject)=>{// 500 ms 后reject
        setTimeout(() => {
            reject(new Error('time out'))
        },500)
    })


    Promise.race([request,timeout]) // 500ms 如果第一个promise 没有返回, 就返回第二个error promise
        .then((values) => {
            console.log(values);
        
        })
        .catch((error) => {// 其中一个失败 就会失败
            console.log(error);
        })