// 函数组合compose
// 洋葱代码

// h(g(f(x)))
// 获取数组最后一个元素在转换为大写字母
// _.toUpper(_.last(array))

// 将细粒度的函数转换为一个新的函数

// 管道

// fn = compose(f1, f2, f3)
// b = fn('a')

// ==========
// 函数组合compose
// 函数相当于数据管道, 将管道连接
// 函数组合 默认  从 右 到左 执行


// 函数组合演示

function myCompose(f, g) {
    return function (value) {
        return f(g(value))
    }
}

// 利用组合: 求数组中的最后一个元素
// 先反转, 然后获取数组第一个元素
const f = function (arr) {// 求数组第一项
    return arr[0]
}

const g = function (arr) {// 反转数组
    return arr.reverse()
}

//=> 从右到左        <------------
const lastItem= myCompose(f, g)


console.log(lastItem([1,2,3,4,5]));//=>5
