// point free
// 1. 不需要指明处理数据
// 2. 只需要合成运算过程
// 3. 需要定义基本运算函数

// const f = fp.flowRight(fp.join('-'),fp.map(fp.toLower),fp.split(' '))

const _ = require("lodash");
const fp = require("lodash/fp");

// Hello  world  => hello__world

const f = fp.flowRight(fp.replace(/\s+/g, '_'),fp.toLower)
console.log(f('Hello  world'));
