// Either 函子
class Left{
    static of(value){
        return new Left(value);
    }

    constructor(value) {
        this._value = value
    }

    map(fn){
        return this
    }
}


class Right{
    static of(value){
        return new Right(value);
    }

    constructor(value) {
        this._value = value
    }

    map(fn){
        return Right.of(fn(this._value))
    }
}


// let r1 = Right.of(12).map((x)=>x+2)
// let r2 = Left.of(12).map((x)=>x+2)
// console.log(r1);
// console.log(r2);

function parseJSON(str) {
    try {
        return Right.of(JSON.parse(str))
    } catch (e) {// 传递错误信息
        return Left.of({error: e.message})
    }
}
// let r = parseJSON('{name: zs}')
// console.log(r);


let r1 = parseJSON('{"name": "zs"}')
        .map(x=>x.name.toUpperCase())// 将name 属性值转换为大写

console.log(r1);