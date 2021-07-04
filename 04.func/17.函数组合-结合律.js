// 满足结合律
// g h 结合 == h g 结合

// let fn =  compose(f,g,h)
// let associativity =  compose(compose(f,g),h) === compose(compose(f,(g,h))


const _ = require("lodash");

// 取出数组最后一个元素并且大写

const toUpper = (str)=> _.toUpper(str)

const first = (arr)=>_.first(arr)

const reverse = (arr)=>_.reverse(arr)

// 从右到左执行    <-------------
const upLastItem= _.flowRight(toUpper,first, reverse)

// console.log(upLastItem(['a','b', 'cba']));

// 先结合前面两个-->再结合后面那个
// const upLastItem1= _.flowRight(_.flowRight(toUpper,first), reverse)

// console.log(upLastItem1(['a','b', 'cba']));

// 先结合后面两个-->再结合前面那个
const upLastItem2= _.flowRight(toUpper,_.flowRight(first, reverse))

console.log(upLastItem2(['a','b', 'cba']));


