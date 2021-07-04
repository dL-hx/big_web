// lodash 中的组合函数
// flow / flowRight  组合多个函数

// flow()       从左到右 运行
//* flowRight()  从右到左运行, 用的更多
const _ = require("lodash");

// 取出数组最后一个元素并且大写

const toUpper = (str)=>str.toLocaleUpperCase()

const first = (arr)=>arr[0]

const reverse = (arr)=>arr.reverse()

// 从右到左执行    <-------------
const upLastItem= _.flowRight(toUpper,first, reverse)

console.log(upLastItem(['a','b', 'cba']));

