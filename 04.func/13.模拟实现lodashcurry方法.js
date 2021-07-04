// 模拟实现 lodash 中的 curry方法
/* 
const curriedSum = _.curry(getSum);
console.log(curriedSum(1, 2, 3));
console.log(curriedSum(1)(2, 3));
console.log(curriedSum(1, 2)(3));

*/
function curry(func) {
    return function curriedFn(...args) {
        // 判断实参 与 形参 个数对比
        if (args.length<func.length) {
            return function () {// 数组展开
                return curriedFn(...args.concat(Array.from(arguments)))
            }
        }
        // >=
        return  func(...args)

    }
}

function getSum(n1, n2,n3) {
    return n1 + n2 + n3
}


const curriedSum = curry(getSum);
console.log(curriedSum(1, 2, 3));
console.log(curriedSum(1)(2, 3));
console.log(curriedSum(1, 2)(3));