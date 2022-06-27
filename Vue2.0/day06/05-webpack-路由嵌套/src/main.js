import Vue from "vue";
// 安装vue-router
// npm install vue-router --save


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
