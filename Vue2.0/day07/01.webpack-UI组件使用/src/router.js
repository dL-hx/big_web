import Vue from "vue";

// 1. 导入vue-router 包
import VueRouter from "vue-router";
import Account from "./main/account.vue";
import GoodsList from "./main/goodslist.vue";
import NoFound from "./main/noFound.vue";


// 导入Account的两个子组件
import login from "./subcom/login.vue";
import register from "./subcom/register.vue";


// 2. 手动安装 VueRouter
Vue.use(VueRouter);

// 3. 创建路由对象
var router = new VueRouter({
  mode: "history", // 去掉url中的#

  routes: [
    // account, goodslist
    // { path: "/", redirect: "/account" },
    {
      path: "/account",
      component: Account,
      children: [
        { path: "login", component: login },
        { path: "register", component: register },
      ],
    },
    { path: "/goodslist", component: GoodsList },
  ],
});

// 把路由对象 router 暴露出去
export default router