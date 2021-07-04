// 模拟组合函数

// const upLastItem= _.flowRight(toUpper,first, reverse)


// function myCompose(...args) {
//     return function (value) {
//         // 1.数组反转
//         // 2.调用数组中的每一个函数 reduce 合并值
//         // 设置初始值
//         return args.reverse().reduce(function (acc, fn) {
//             return fn(acc)
//         }, value)
//     }
// }


const myCompose=(...args) =>(value) =>args.reverse().reduce((acc, fn)=> fn(acc), value)

const toUpper = (str)=>str.toLocaleUpperCase()

const first = (arr)=>arr[0]

const reverse = (arr)=>arr.reverse()

// 从右到左执行    <-------------
const upLastItem= myCompose(toUpper,first, reverse)

console.log(upLastItem(['a','b', 'cba']));
