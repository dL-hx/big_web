// 字符串的扩展方法

const message = 'Error: foo is not defined.'

console.log(
  // message.startsWith('Error')
  // message.endsWith('.')
  message.includes('foo')
)
// 相比之前的使用 indexOf , 和 正则匹配更加方便
