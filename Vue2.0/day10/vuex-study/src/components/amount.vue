<template>
  <div>
    <!-- <h3>{{ '当前数量为: ' + this.$store.state.count }}</h3> -->
    <h3>{{ $store.getters.optCount }}</h3>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
</style>
