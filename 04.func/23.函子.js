// 函子
// functor
// class Container {
//     constructor(value) {
//         this._value = value
//     }

//     map(fn){
//         let res = fn(this._value)
//         // 接收处理函数 fn , 返回新容器函子
//         return new Container(res)// 类型转换
//     }
// }

// let r = new Container(5)
//         .map(x=>x +1)
//         .map(x=>x*x)

// console.log(r);


class Container {
    constructor(value) {
        this._value = value
    }

    static of(value){
        return new Container(value)
    }

    map(fn){
        let res = fn(this._value)
        // 接收处理函数 fn , 返回新容器函子
        return Container.of(res)// 类型转换
    }
}



//MayBe 函子处理空值


class MayBe {
    constructor(value) {
        this._value = value
    }

    static of(value){
        return new MayBe(value)
    }

    map(fn){
        return this.isNothing()?MayBe.of(null):  MayBe.of(fn(this._value))// 类型转换
    }

    isNothing(){
        return this._value===null||this._value===undefined
    }
}


// let r = Container.of(5)// 链式调用
//         .map(x=>x +2)
//         .map(x=>x*x)

// console.log(r);// 返回函子对象， 值在函子盒子中
// console.log(r._value);

// 演示 null undefined 的问题

// let r = Container.of(null)
//         .map(x=>x.toUpperCase())
// console.log(r);


// let r = MayBe.of('hello world')// MayBe { _value: 'HELLO WORLD' }
//         .map(x=>x.toUpperCase())
// console.log(r);


// let r = MayBe.of(null)
//         .map(x=>x.toUpperCase())
// console.log(r);


let r = MayBe.of('hello world')
        .map(x=>x.toUpperCase())
        .map(x=>null)
        .map(x=>x.split(' '))
console.log(r);