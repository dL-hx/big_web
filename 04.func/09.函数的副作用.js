// 副作用

// 不纯的函数
let mini = 18
function checkAge(age) {
    return age>=mini
}


// 纯的函数

function checkAge(age) {
    let mini = 18// 硬编码(柯里化解决)
    return age>=mini
}




// 副作用让函数变得不纯
// 副作用:
// 1. 配置文件
// 2. 数据库
// 3. 获取用户的输入
// ....

// 所有的外部交互都会带来副作用, 尽可能控制副作用在可控范围发生