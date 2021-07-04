// 纯函数的代表 lodash
// https://www.lodashjs.com/

/* 
1. 初始化 package.json
$   npm init -y

2. 安装lodash 
npm install lodash -S

*/


// 演示lodash 

// first / last /toUpper /reverse /each/ includes / find / findIndex

const _ = require('lodash')

const array = ['jack', 'tom', 'lucy', 'kate']
console.log(_.first(array));
console.log(_.last(array));

console.log(_.toUpper(_.first(array)));
console.log(_.reverse(array));// 会改变原数组

 const r = _.each(array, (item,index) => {
   console.log(item, index);
   
})

// console.log(r);

// _.includes(array)
const c = _.findIndex(array, function (o) { return o=='jack' })
const d = _.find(array, function (o) { return o=='jack' })
console.log(c);
console.log(d);



