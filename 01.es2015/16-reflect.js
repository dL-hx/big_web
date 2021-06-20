// Reflect 对象
// > https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set 
// const obj = {
//   foo: '123',
//   bar: '456'
// }

// const proxy = new Proxy(obj, {
//   get (target, property) {
//     console.log('watch logic~')
    
//     return Reflect.get(target, property)
//   }
// })

// console.log(proxy.foo)

const obj = {
  name: 'zce',
  age: 18
}

// console.log('name' in obj)
// console.log(delete obj['age'])
// console.log(Object.keys(obj))

console.log(Reflect.has(obj, 'name'))
console.log(Reflect.deleteProperty(obj, 'age'))
console.log(Reflect.ownKeys(obj))

// Object
var obj = { x: 1, y: 2 };
Reflect.get(obj, "x"); // 1

// Array
Reflect.get(["zero", "one"], 1); // "one"



// Object
var obj = {};
Reflect.set(obj, "prop", "value"); // true
obj.prop; // "value"

// Array
var arr = ["duck", "duck", "duck"];
Reflect.set(arr, 2, "goose"); // true
arr[2]; // "goose"