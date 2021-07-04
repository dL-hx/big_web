// 柯里化演示
// 传递部分参数,  让函数返回一个新的函数, 新的函数接收剩余参数, 返回一个新的结果
/* 
1. 当一个函数有多个参数的时候, 先传递一部分参数调用它(这部分参数以后永远不变)
2. 然后返回一个新的函数 接收剩余参数,  返回结果
*/

// function checkAge(age) {
//     let min = 18
//     return age >= min
// }

// 普通的纯函数
// function checkAge( min, age) {
//     return age >= min
// }
// console.log(checkAge(18, 20));
// console.log(checkAge(18, 24));
// console.log(checkAge(22, 24));

// 基准值重复问题
// 闭包处理(闭包 + 高阶函数)

// 函数柯里化
// function checkAge(min) {
//     return function (age) {
//         return age >= min
//     }
// }

// ES6
const checkAge = min=> (age => (age >= min))

const lage18 = checkAge(18)
const lage20= checkAge(20)
console.log(lage18(20));
console.log(lage18(22));
console.log(lage18(24));
