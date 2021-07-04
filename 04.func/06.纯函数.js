// 纯函数(相同的输入会得到相同的输出)
// 相同的输入会得到相同的输出,   没有任何可观察的副作用

// slice 返回数组中的指定部分, 不会改变原数组

// splice 会对数组进行操作返回该数组, 会修改原数组


// slice/splice

let arr = [1,2,3,4,5]
// 纯函数
// console.log(arr.slice(0,3));//[ 1, 2, 3 ]
// console.log(arr.slice(0,3));
// console.log(arr.slice(0,3));

// 不纯的函数  截取数组中的元素
// console.log(arr.splice(0,3));// [ 1, 2, 3 ]
// console.log(arr.splice(0,3));// [ 4, 5 ]
// console.log(arr.splice(0,3));// []


/* 纯函数(相同的输入会得到相同的输出)*/
function getSum(n1, n2) {
    return n1 + n2
}


console.log(getSum(1,2));// 3
console.log(getSum(1,2));
console.log(getSum(1,2));
