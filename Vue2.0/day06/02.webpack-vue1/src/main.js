// 这是入口文件
// console.log('ok');

// 如何在webpack 构建的项目中 , 使用Vue 开发
// 复习: 如何在普通网页中使用Vue
//1. 使用script 标签, 引入vue 的包
//2. 在index 页面中, 创建 一个id 为 app div 的容器
//3. 通过new Vue 得到一个vm 的实例

// 在webpack 中尝试使用Vue
// 注意: 在webpack 中  import Vue from 'vue' 导入的Vue 构造函数, 功能不完整,
// 只提供了runtime-only 的方式, 并没有提法网页中那种使用的方式
import Vue from "vue";
// import Vue from '../node_modules/vue/dist/vue.js'

// 1. 导入 login组件
import login from "./login.vue";
// 默认, webpack无法打包 .vue 文件, 需要安装 相关loader

// cnpm i vue-loader vue-template-compiler -D

// 在配置文件中, 新增loader 配置项
//  { test: /\.vue$/, use: 'vue-loader' } // 处理 .vue 文件的 loader

/* var login = {
  template:'<h1>这是login , 是网页中的形式创建出来的组件</h1>'
} */

// var Vue = require('vue')
// 回顾, 包的查找规则:
// 1.找项目的根目录中有没有node_modules 文件夹
// 2.根据包名, 找对应的文件夹
// 3.在vue 文件夹中, 找 package.json 的配置文件
// 4. 在 package.json  中, 找 main属性, [main 属性, 指定了这个包 被加载  时候的入口文件]

var vm = new Vue({
  el: "#app",
  data: {
    msg: 1234,
  },
  /*   render:function(createElements){// 在webpack中如果想要通过, vue 把一个组件放到页面中展示, vm 中 的 render函数可以展示
    return createElements(login)
  } */
  render: (c) => c(login),
  // components:{
  //   login
  // }
});


// 总结: 
// webpack 中如何使用vue
//1. 安装vue 的包, cnpm i vue -S
// 2. 由于 在webpack 中 , 推荐使用 .vue 这个组件模板文件定义组件, 所以, 需要安装, 能解析这种文件的loader

// npm i vue-loader vue-template-compiler -D


// 3. 在main.js 中 导入vue 模块, import Vue from "vue";


// 4. 定义一个 .vue 结尾的组件,  其中, 组件由三部分组成,  template   script   style


// 5. 使用 import login from "./login.vue" 导入这个组件

// 6.  创建vm 的实例,  var vm = new Vue({el:'#app', render:c=>c(login)})

// 7.在页面中创建一个id 为app 的div 元素, 作为我们vm 实例  要控制的区域

import m222,{title as title1, content} from './test'

console.log(m222.name);

// console.log(title + '-' + content);
console.log(title1);