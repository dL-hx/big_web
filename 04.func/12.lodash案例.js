// 柯里化案例

// 判断字符串中是否有空白字符 (match 方法, 正则)

const _ = require("lodash");
// ''.match(/\s+/g)// 提取字符串中的空白
// ''.match(/\d+/g)// 提取字符串中的数字

// 提取数组中含有空白字符的元素

function matchStr(reg, str) {
    return str.match(reg)
}

// 转换为curry函数
const currMatch= _.curry((reg, str)=> {
    return str.match(reg)
})
const haveSpace= currMatch(/\s+/g)  // 当前字符串中是否有空格 返回空格else null
// console.log(haveSpace('hello world'));

const haveNumber= currMatch(/\d+/g) // 当前字符串中是否有数字  返回数字 else null

// console.log(haveNumber('123abc456'));

const myFilter = _.curry(function (func, array) {
    return array.filter(func)
})


// console.log(myFilter(haveSpace, ['join conner', 'join_down']));

const findSpace = myFilter(haveSpace)// 生成一个具有空白字符的函数

console.log(findSpace(['join conner', 'join_down']));

