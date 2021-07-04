// 微任务
// 回调队列中的任务, 称为[宏任务]
// [宏任务] 可以选择新的宏任务在队列中进行排队
// setTimeout 作为宏任务 在队列末尾进行排队

// 微任务在当前任务结束后, 立即执行
// promise 执行时序
// promise 作为微任务 执行
// promise&MutationObserver &process.nextTick
// 直接在本轮调用末尾执行

console.log('global start');
setTimeout(() => {
   console.log('setTimeout');
    
},0)// 0 立即进入回调队列
Promise.resolve()
    .then(() => {
        console.log('promise')
    })
    .then(() => {
        console.log('promise 2')
    })
    .then(() => {
        console.log('promise 3')
    })
console.log('global end');
