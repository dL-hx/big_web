// 高阶函数---函数作为返回值(函数生成一个函数)
/* 
函数作为返回值:
闭包,  函数柯里化
> // 多次调用只会执行一次

// 函数返回是一个函数,  将返回的这个函数再进行调用
makeFn()()
*/
// function makeFn() {
//     let msg = 'Hello function'
//     return function () {
//         console.log(msg);
        
//     }
// }

// 调用函数
// const fn = makeFn()
// fn()

// 函数返回是一个函数,  将返回的这个函数再进行调用
// makeFn()()


// once
// 对一个函数只能执行一次
// 使用场景:  
// 支付业务,  只希望这个<函数点击后只能执行一次>
function myOnce(fn) {// 控制这个函数只能执行一次
    let done = false // 这个函数是否执行的标志  false: 未执行  true: 执行

    return function () {
        if (!done) {// 没有执行
            done = true // 没有执行, 执行这个函数
            return fn.apply(this, arguments )// arguments 第二个函数调用的参数
        }
    }
}


let pay = myOnce(function (money) {
    console.log(`支付: ${money} RMB`);
    
})

// 多次调用只会执行一次
pay(5)
pay(5)
pay(5)
pay(5)
pay(5)