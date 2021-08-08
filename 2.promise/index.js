/* Promise核心代码 

1.Promise 就是一个类,在执行这个类的时候, 需要传递一个执行器
进去, 执行器会立即执行

2.Promise中有三种状态, 分别为成功 fulfilled  失败 rejected 等待 pending
pending--> fulfilled

pending--> rejected

一旦状态确定就不可更改

3. resolve和reject函数是用来更改状态的

resolve: 将状态改为 fulfilled成功
reject: 将状态改为 rejected 失败

4.then ,then方法内部做的事情, 就是判断状态
如果状态是成功,  调用成功回调函数
如果状态是失败,  调用失败回调函数

then方法被定义在原型对象上的方法

5.then成功回调后有一个参数, 表示成功之后的值
then失败后有一个reason ,表示失败后的原因
*/
// CommonJS 导入

const MyPromise = require('./myPromise')


let promise = new MyPromise((resolve, reject)=>{
    // resolve('成功..... ')

    // setTimeout(()=>{
    //     resolve('成功..... ')
    // },2000)
    // throw new Error('executor error')
    // resolve('成功')

    reject('失败')
})

var p1 = function () {
    return new MyPromise(function (resolve, reject) {
        setTimeout(function () {
            resolve('p1')
        }, 2000)
    });
}


var p2 = function () {
    return new MyPromise(function (resolve, reject) {
        // resolve('p2')
        // reject('p2 reject')
        // reject('失败')
        resolve('成功')
    });
}
// p2().finally(()=>{
//     console.log('finally');
//     return p1()
// }).then(value=>{
//     console.log(value);
  
// },
//   reason=>{
//     console.log(reason);
//  }
// )

p2()
    .then(value=>console.log(value))
    .catch(reason=>console.log(reason))

// MyPromise.all(['a', 'b', p1(),p2(),'c']) .then(result=>{
//     console.log(result);
//     //  ["a", "b", "p1", "p2", "c"]
// })



// MyPromise.resolve(100).then(result=>{
//     console.log(result);
// })


// // 隔了2s 输出p1
// MyPromise.resolve(p1()).then(result=>{
//     console.log(result);
// })

// promise.then()
//     .then()
//     .then(value=>console.log(value),reason=>console.log(reason))

// promise.then((value)=>{
//         console.log(value);
//         throw new Error('then error')
//         return 'aaa'

// },(reason)=>{
//         // console.log(reason.message);
//         return 10000
// }).then((value)=>{

//     console.log(value);
// },(reason)=>{
//     console.log('aaaa');
    
//     console.log(reason.message);
// })


// function other() {
//     return new MyPromise((resolve, reject)=>{
//         resolve('other')
//     });
// }
// promise.then((value)=>{
//     console.log(value);
//     return other()
// }).then((value)=>{
//     console.log(value);
// })


// let p1 = promise.then((value)=>{
//     console.log(value);
//     return p1
// })

// 自身调用自身, 会报一个错
// p1.then((value)=>{
//         console.log(value);
// },(reason)=>{
//         console.log(reason.message);
// })

// promise.then((value)=>{
//     console.log(value);
// },(reason)=>{
//     console.log(reason);
// })

// promise.then((value)=>{
//     console.log(value);
// },(reason)=>{
//     console.log(reason);
// })


// promise.then((value)=>{
//     console.log(value);
// },(reason)=>{
//     console.log(reason);
// })