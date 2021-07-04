/* 高阶函数的意义

函数式编程:
将运算过程抽象成函数, 然后在任何地方都可以重用这些函数;

+ 1. 抽象可以屏蔽函数细节,  调用时候只需要关注与我们的目标
+ 2. 高阶函数就是用来抽象通用的问题


*/

// fn: 操作数组的回调方法
function myForEach(array,  fn) {
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        fn(item)
    }
}

let arr = [1,3,4,7,8]
myForEach(arr, function (value) {
    console.log('value', value);
})

let oddArr = myFilter(arr, function (item) {
    return item%2==1
})
 
console.log(oddArr);