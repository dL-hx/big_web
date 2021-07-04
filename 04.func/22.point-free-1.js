// point free

// 把一个字符串中的首字母提取并转换为大写,  使用. 作为分隔符
// world wild web===>W. W. W.

const _ = require("lodash");
const fp = require("lodash/fp");

// world wild web===>W. W. W.

// const f = fp.flowRight(fp.join('. '),fp.map(fp.first),fp.split(' '), fp.toUpper)
// console.log(f('world wild web'));

// const fistLetterToUpper = fp.flowRight(fp.join('. '),fp.map((value)=> fp.toUpper(value)[0]),fp.split(' '))
const fistLetterToUpper = fp.flowRight(fp.join('. '),fp.map(fp.flowRight( fp.first, fp.toUpper)),fp.split(' '))

console.log(fistLetterToUpper('world wild web'));