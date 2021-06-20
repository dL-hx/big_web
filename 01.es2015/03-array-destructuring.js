// 数组的解构

// const arr = [100, 200, 300]
// const foo = arr[0]
// const bar = arr[1]
// const baz = arr[2]
// console.log(foo, bar, baz)

// const arr = [100, 200, 300]
// const [foo, bar, baz ]= arr
// console.log(foo, bar, baz)


// const arr = [100, 200, 300]
// const [, , baz ]= arr
// console.log(foo, bar, baz)



// const arr = [100, 200, 300]
// const [foo, ...rest ]= arr
// console.log(foo, rest)



// const arr = [100, 200, 300]
// const [foo, bar, baz , more]= arr
// console.log(foo,  bar, baz , more) //=>more:undefiend



// const arr = [100, 200, 300]// 给默认值
// const [foo, bar, baz=123 , more='default value']= arr
// console.log(foo,  bar, baz , more) //=>more:'default value'


const path = '/foo/bar/baz'
// const tmp = path.split('/')
// const rootdir = tmp[1]

// 使用数组解构, 少定义一个中间变量
const [, rootdir ] = path.split('/')
console.log(rootdir)