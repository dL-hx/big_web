// 调试
// 如何调试组合函数?--> (log  / trace)  参数也是从右到左  
const _ = require("lodash");

// const f= _.flowRight(toUpper,first, reverse)
// console.log(f(['a','b', 'cba']));

// NEVER SAY DIE -> never-say-die

// _.split
const split = _.curry((sep, str)=>_.split(str, sep))

//  _.toLower
const toLower = (str)=> _.toLower(str)

// _.join
const join = _.curry((sep, arr)=>_.join(arr, sep))

// 改造log 函数 跟踪函数
const trace=_.curry((tag, v)=> {
    console.log(tag, v);
    return v
    
})
const log = (v)=>{ 
    console.log(v);
    return v
}
// const f = _.flowRight(join('-'),log, split(','),toLower,log,split(' '))

// console.log(f('NEVER SAY DIE'));

const map = _.curry((fn, arr)=> _.map(arr,fn))
// const f1 = _.flowRight(join('-'),log,map(toLower),log,split(' '))
// console.log(f1('NEVER SAY DIE'));

const f2 = _.flowRight(join('-'),trace('map之后 '),map(toLower),trace('map之前 '),split(' '))
console.log(f2('NEVER SAY DIE'));





