// folktale 中的 compose ,curry
const {compose, curry} = require("folktale/core/lambda");
const {toUpper, first} = require("lodash/fp");
// const fp = require("lodash/fp");

// 求两个数的和
let f = curry(2, (x,y)=>x+y)

console.log(f(1,2));
console.log(f(1)(2));

// 组合两个纯函数(从右到左执行)
let g = compose(toUpper,first)
console.log(g(['one', 'two ']));// => ONE


