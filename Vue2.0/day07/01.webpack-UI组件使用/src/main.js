import Vue from "vue";
// 安装vue-router
// npm install vue-router --save

/* // 导入所有的MintUI
import MintUI from 'mint-ui'// 把所有的组件都导入进来

// 这里可以省略node_modules 这一层目录
import 'mint-ui/lib/style.css'






// 将MintUI 安装到Vue 中
Vue.use(MintUI)// 把所有的组件注册为全局的组件 */

// 导入bootstrap 的样式
import 'bootstrap/dist/css/bootstrap.css'

// 引入全局样式
import './css/app.css'

// 按需导入MintUI 组件
import { Button } from 'mint-ui'

// 导入MUI 的样式表, 和bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 使用Vue.component 注册按钮组件

// Vue.component('mbtn', Button)
Vue.component(Button.name, Button)

console.log(Button.name);

/* var login={
  template:''
}

Vue.component('login', login) */


// 把自定义路由对象导入进来
import router from './router'

// 导入app 组件
import App from "./App.vue";

var vm = new Vue({
  el: "#app",
  render: (c) => c(App), // render 会把el 指定的容器中的所有内容清空覆盖,
  // 不要 直接把路由的 router-view 和 router-link 直接写到el 所控制的元素中
  router, // 将路由对象挂载到 vm 上
});
// 注意:App 这个组件, 是通过VM 实例的render 函数 , 渲染出来的,render函数 如果要渲染,
// 组件, 渲染出来的组件, 只能放到el:'#app' 所指定的元素中

//Account 和 GoodsList 是通过路由匹配监听的, 所以这两个组件, 只能展示到属于路由的
//     <router-view></router-view> 中
