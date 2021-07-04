//模拟ajax异步操作1
function ajax1() {
    const p = new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve('ajax 1 has be loaded!')
        }, 1000)
    })
    return p

}
//模拟ajax异步操作2
function ajax2() {
    const p = new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve('ajax 2 has be loaded!')
        }, 2000)
    })
    return p
}
//等待两个ajax异步操作执行完了后执行的方法
const myFunction = async function() {
    try {// 顺次执行
        const x = await ajax1()
        const y = await ajax2()
            //等待两个异步ajax请求同时执行完毕后打印出数据
        console.log(x, y)
    } catch (error) {
        console.log(error);
        
    }
}

// 函数调用
myFunction()