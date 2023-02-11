// 1.函数做返回值
// function create() {
//     const a = 100
//     return function () {
//         console.log(a);
//     }
// }
// const fn = create() 
// const a = 200
// fn()//100

// 2.函数做参数传递
function print(fn) {
    const a = 200
    fn()
}

const a = 100
function fn() {
    console.log(a);
    
}

/* 
闭包:
自由变量的查找, 是在函数定义的地方, 向上级作用域查找,
不是在函数执行的地方
*/
print(fn)// a=> 100
