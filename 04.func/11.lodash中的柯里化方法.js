// 通过lodash 中的方法, 将函数转换为柯里化函数
// _.curry的基本使用

const _ = require("lodash");

function getSum(a, b, c) {
  return a + b + c;
}

// 柯里化之后的函数
// ====将多元的函数转换为一元的函数===
// 1. 可以传递所有参数
// 2. 传递部分参数
const curriedSum = _.curry(getSum);
console.log(curriedSum(1, 2, 3));
console.log(curriedSum(1)(2, 3));
console.log(curriedSum(1, 2)(3));
