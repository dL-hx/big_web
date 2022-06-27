<template>
  <div>
    <h1>这是Account组件</h1>
    <router-link to="/account/login">登录</router-link>
    <router-link to="/account/register">注册</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
</script>


<style lang='scss' scoped>
// 普通的style 标签只支持 普通的样式, 如果想要启用 scss/less , 需要
// 为style 元素, 设置lang 属性

// 只要 咱们的style 标签, 是在 .vue 组件中定义的, 那么, 推荐都为style开启scoped 属性


body{
  div{
    font-style: italic;
  }
}
</style>

