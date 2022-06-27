import Vue from 'vue'
// 安装vue-router
// npm install vue-router --save
// 1. 导入vue-router 包
import VueRouter from 'vue-router'
import Account from './main/account.vue'
import GoodsList from './main/goodslist.vue'
import NoFound from './main/noFound.vue'

// 2. 手动安装 VueRouter 
Vue.use(VueRouter)

// 3. 创建路由对象
var router = new VueRouter({
  mode: 'history', // 去掉url中的#

  routes:[
    // account, goodslist
    {path:'/', redirect:'/account'},
    {path:'/account', component:Account},
    {path:'/goodslist', component:GoodsList},
  ],
  
 
})

// 导入app 组件
import App from './App.vue'


var vm = new Vue({
  el:'#app',
  render:c=>c(App),// render 会把el 指定的容器中的所有内容清空覆盖, 
  // 不要 直接把路由的 router-view 和 router-link 直接写到el 所控制的元素中
  router// 将路由对象挂载到 vm 上
})
// 注意:App 这个组件, 是通过VM 实例的render 函数 , 渲染出来的,render函数 如果要渲染, 
// 组件, 渲染出来的组件, 只能放到el:'#app' 所指定的元素中

//Account 和 GoodsList 是通过路由匹配监听的, 所以这两个组件, 只能展示到属于路由的
//     <router-view></router-view> 中