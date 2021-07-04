// promise chain 没有传统同步代码的可读性
// promise.then(function (res) {//promise
//     console.log(111);
//     return ajax('/api/urls1.json')
// }).then(function (res) {//promise
//     console.log(222);
//     return ajax('/api/urls2.json')

// }).then(function (res) {//promise
//     console.log(333);
//     return ajax('/api/urls3.json')
// }).then(function (res) {//promise
//     console.log(444);
//     return 'foo'
// }).then(function (res) {//promise
//     // res = 'foo'
//     console.log(444);
// }).then(function (res) {//promise
//     // res = undefined
//     console.log(444);
// }).catch((error)=>{// 为整个promise链条注册的失败回调
//     console.log('onRejected', error);
    
// })


// like sync mode
// 传统同步代码
/* try {
    const value1 = ajax('/api/url1')
    console.log(value1);
    
    const value2 = ajax('/api/url2')
    console.log(value2);

    const value3 = ajax('/api/url3')
    console.log(value3);

    const value4 = ajax('/api/url4')
    console.log(value4);

} catch (error) {
    console.log( error);
} */

// 更优的写法
// es2015 generator 写法

function * foo() {
    console.log('start');
    
    try {
        const res = yield 'foo'  // yield:   1. yield 对象拿到函数返回值 2. 暂停生成器函数执行
        console.log(res);
    } catch (e) {
        console.log(e);
        
    }
    
}
const generator = foo()
 // 调用next 方法 , generator 函数才会执行
 // result 拿到返回值
const result = generator.next()
console.log(result);

// generator.next('bar')  // 作为yield 参数的返回值

// generator.next()  

// 通过throw 在执行生成器函数时候, 抛出错误
generator.throw(new Error('generator error'))

