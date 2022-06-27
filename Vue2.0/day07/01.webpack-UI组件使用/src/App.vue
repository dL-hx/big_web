<template>
  <div>
    <h1>这是App组件</h1>
    <!-- 为什么这里 叫做mt-button 的Button , 直接就能用?? -->
    <mt-button type="default" icon="back">default</mt-button>
    <mt-button type="default" icon="more">default</mt-button>
    <mt-button type="primary">primary</mt-button>

    <mt-button type="danger" size="small" disabled>default</mt-button>
    <mt-button type="danger" size="large" plain>large</mt-button>
    <mt-button type="danger" size="normal">normal</mt-button>

    <mt-button @click="show">点击按钮</mt-button>

    <!-- <mbtn type="primary">12345</mbtn> -->

    <button type="button" class="mui-btn mui-btn-royal">紫色</button>

    <button type="button" class="mui-btn mui-btn-danger">红色</button>

    <router-link to="/account">account</router-link>
    <router-link to="/goodslist">goodslist</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// 按需导入Toast 组件
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      toastInstance: null
    };
  },

  created() {
    // 当组件一被创建, 调用 getList 方法
    this.getList();
  },

  methods: {
    /**
     * 模拟3s 延迟 , 使Toast自动消失
     */
    getList() {
      // 模拟获取列表的一个Ajax 方法
      // 在获取数据之前, 立即弹出Toast, 提示用户, 正在加载数据
      this.show();

      setTimeout(() => {
        // 当三秒过后, 数据获取回来了, 要把Toast 移除
        this.toastInstance.close();
      }, 3000);
    },
    show() {
      this.toastInstance = Toast({
        message: "提示信息",
        position: "top",
        duration: -1, // 如果是-1, 则弹出之后不消失
        iconClass: "glyphicon glyphicon-heart", // 设置图标的类
        className: "mytoast" // 这是自定义Toast 的样式, 需要自己提供一个类名
      });
    }
  }
};
</script>

<style>
</style>