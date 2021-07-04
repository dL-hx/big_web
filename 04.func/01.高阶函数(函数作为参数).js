// 高阶函数---函数作为参数
/* 
函数作为参数:
1. 可以让函数变得更灵活;
2. 调用时候不用关注内部实现细节
*/
// array: 操作的数组
// fn: 操作数组的回调方法
function myForEach(array,  fn) {
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        fn(item)
    }
}

// 测试
// 打印数组的每一项
/* let arr = [1,3,4,7,8]
myForEach(arr, function (value) {
    console.log('value', value);
}) */


// filter
// array: 操作的数组
// fn: 满足条件过滤的方法
function myFilter(array, fn) {
    let results = []      // 存储满足条件的结果数组
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (fn(item)) {      // 1. 如果是满足过滤条件的项目=
            results.push(item)// 2.将这一项存储到结果数组中
        }
        
    }

    return results
}

let arr = [1,3,4,7,8]
// 过滤数组的奇数项
let oddArr = myFilter(arr, function (item) {
    return item%2==1
})

console.log(oddArr);