// 纯函数好处

// 纯函数缓存

// 记忆函数

// memorize

const _ = require('lodash');

function getArea(r) {
    console.log(r);
    
    return Math.PI * r * r
}

/* let getAreaWithMemoize = _.memoize(getArea)

// 函数只调用一次,  后面取值 从缓存中取值
console.log(getAreaWithMemoize(4));
console.log(getAreaWithMemoize(4));
console.log(getAreaWithMemoize(4)); */
/* 
4
50.26548245743669
50.26548245743669
50.26548245743669
*/


// 模拟memoize 方法的实现
function myMemoize(f) {
    let cache = {}
    return function () {
        let key = JSON.stringify(arguments)
        cache[key] = cache[key]||f.apply(f, arguments)

        return  cache[key]
    }
}

let getAreaWithMemoize = myMemoize(getArea)
console.log(getAreaWithMemoize(4));
console.log(getAreaWithMemoize(4));
console.log(getAreaWithMemoize(4));