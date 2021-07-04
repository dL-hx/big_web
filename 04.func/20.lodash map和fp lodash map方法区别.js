const _ = require("lodash");
const fp = require("lodash/fp");

// console.log(_.map(['23','8','10'], parseInt));
// parseInt '23' 0 array    ---> 23
// parseInt '8' 1 array     ---->NaN
// parseInt '10' 2 array    --->2  10 进制的2

// 函数优先, 数据置后
console.log(fp.map(parseInt, ['23','8','10']));// =>[ 23, 8, 10 ]


