function f1(a,b,c) {
    console.log('this', this);
    console.log(a,b,c);
    return 'this is fn1'
    
}

const fn = f1.bind({x:100}, 100,200,400)

Function.prototype.mybind = function () {
    // 类数组不能直接使用数组方法,   Array.prototype.slice.call 转换为数组形式
    // 将类数组===> 转换为数组
    const args = Array.prototype.slice.call(arguments)

    // args = [1,2,3]

    // 获取this
    const t = args.shift() // 去除第一个参数, 会改变原数组==>1,  剩余 [2,3 ]

    const self = this

    return function () {
        return self.apply(t, args)
    }


}