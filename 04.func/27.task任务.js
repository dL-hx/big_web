// Task 处理异步任务
// 读取文件 fs 模块
const fs = require('fs')
const {task} = require("folktale/concurrency/task");
const {split, find} = require("lodash/fp");
// 读取package.json version 信息

function readFile(filename) {// ./package.json
    return task((resolver)=>{
        fs.readFile(filename,'UTF-8',(err,data)=>{
            if(err) resolver.reject(err);
    
            resolver.resolve(data)
        });
    }) 
}
readFile('./package.json') 
    .map(split('\n'))// 截取为数组
    .map(find(x=>x.includes('version')))
    .run()
    .listen({// 监听执行结果
        onRejected:err=>{
            console.log(err);
        },
        onResolved:(value)=>{
            console.log(value);
        }
    })
