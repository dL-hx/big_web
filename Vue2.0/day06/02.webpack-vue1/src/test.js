// 这是Node 中向外暴露成员的方式
// module.exports = {}

// 在ES6中 , 也通过规范的形式, 规定了ES6中如何导入 和导出模块

//ES6 中, 导入模块   import 模块名称 from '模块标识符'

// import '标识路径'



// 在ES6 中 使用export default 和  export 向外暴露成员


// 在NODE 中, 使用 var 名称 = require('模块标识符') 导入成员

// module exports 和 exports 来暴露成员


/* export default {
    name:'张三',
    age:20
} */

// 注意 exports default 可以使用任意的变量来接收

var info =  {
    name:'张三',
    age:20
}

export default info

// 注意: 在一个模块中, export default 只允许 向外暴露一次
/* export default {
    address:'北京'
} */

// 注意: 在一个模块, 可以同时使用export default 和 export 同时向外暴露成员

export var title = '小星星'
export var content = '哈哈哈'


// 注意: 使用export 向外暴露的成员, 只能使用 {} 的形式 来接收, 这种形式, 叫做[按需导出]
// 注意 export 可以向外暴露多个成员, 同时 export default 只能暴露一个成员

// 某些成员, 我们在import 的时候, 如果 不需要, 则可以不在 {} 定义, [按需导入]

// 注意使用 export 导出的成员, 必须严格按照, 导出时候的名称, 使用 { } 来接收

// 注意使用 export 导出的成员,如果就想换个名称, 可以使用 as 来起别名

// import {title as title1, content} from './test'