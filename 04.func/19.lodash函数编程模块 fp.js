// _.map(['a', 'b','c'], _.toUpper)  // 数据优先,函数置后
// => ['A', 'B','C']


// fp模块 对函数编程提供的模块
// 提供了auto curried  函数优先 数据置后
const fp = require("lodash/fp");

const f = fp.flowRight(fp.join('-'),fp.map(fp.toLower),fp.split(' '))

console.log(f('NEVER SAY DIE'));//=> never-say-die



