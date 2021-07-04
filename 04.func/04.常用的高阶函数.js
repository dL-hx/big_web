/* 
常用的高阶函数

+ forEach
+ map
+ filter
+ every
+ some
+ find / findIndex
+ reduce
+ sort
+ reverse
...

*/
// 模拟常用的高阶函数: map, every, some

// 作用: 对数组中的每一个元素进行遍历, 并对每一个元素进行处理, 并将处理的结果通过一个数组返回
// array  : 操作的数组
// fn     : 操作这个数组处理的方法
// return : []  arr
const myMap = (array, fn) =>{
    const results = []
    // for (const [index, item] of array.entries()) {
    //     const mapItem = fn(item,index) // 处理过的数据
    //     results.push(mapItem)
    // }
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        const mapItem = fn(item, i) // 处理过的数据
        results.push(mapItem)
    }

    return results
}

// const arr = [1,2,3,4,5]

// // 测试: 求数组元素的平方
// const r = myMap(arr, function (value) {
//     value = value * value
//     return value
// })
// console.log(r);

//数组中的每一个元素 都满足判断
// array  : 操作的数组
// fn     : 都匹配这个条件
// return : <bool>  
const myEvery=(array, fn)=>{
    let results = true

    for (const value of array) {
        if(!fn(value)){
            results = false
            break
        }
    }
    return results
}

// const arr = [1,2,3,4,5]
// const r = myEvery(arr, function (value) {
//     return value>0
// })
// console.log(r);

// some
const mySome=(array, fn)=>{
    let results = false

    for (const value of array) {
        if(fn(value)){
            results = true
            break
        }
    }
    return results
}

// 测试(是否有偶数)
const arr = [1,1,3,3,5]
const r = mySome(arr, function (value) {
    return value%2==0
})
// console.log(r);
