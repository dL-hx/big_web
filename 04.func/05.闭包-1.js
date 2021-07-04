// 闭包案例
// console.log(Math.pow(4,2));
// console.log(Math.pow(5,2));

// 生成求xx次方的函数
const makePower = (power)=>{
    return function (number) {
       return Math.pow(number,power)
    }
}

// 求平方
let power2 = makePower(2)

// 求三次方
let power3 = makePower(3)
console.log(power2(4));
console.log(power2(5));


console.log(power3(4));
console.log(power3(5));

