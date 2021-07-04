
// 读取文件 fs 模块
const fs = require('fs')
// IO 函子
// 输入输出函子
const fp = require("lodash/fp");
class IO{
    static of(value){
        return new IO(function(){
            return value
        });
    }

    constructor(fn) {
        this._value = fn
    }

    map(fn){
        // 组合为新函数 返回
        return new IO(fp.flowRight(fn, this._value))
    }
}

const {task} = require("folktale/concurrency/task");
const {split, find} = require("lodash/fp");
// 读取package.json version 信息

function readFile(filename) {// ./package.json
    return new IO(()=>{
        return fs.readFileSync(filename,'UTF-8');//同步读取文件
    });
}


function print(x) {// ./package.json
    return new IO(()=>{
        console.log(x);
        
        return x
    });
}


let cat = fp.flowRight(print, readFile)

// 函子嵌套
// IO(IO(x))
let r = cat('./package.json')._value()._value()
console.log(r);
