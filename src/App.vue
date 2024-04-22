<script setup>
</script>

<template>
  <div id="app1">
    <router-view></router-view>
  </div>
</template>

<style>
#app1{
  overflow: hidden;
}
</style>

<!-- 这里是共通样式，适用于所有组件，所以不要加scoped -->
<!--style>
html,body,div,span,h1,h2,h3,h4,h5,h6,ul,ol,li,p{
  margin: 0;
  padding: 0;
}
html,body,#app1 {
  width: 100%;
  height: 100%;
  font-family: "微软雅黑";
}
ul,ol {
  list-style: none;
}
a {
  text-decoration: none;
}
#app1{
  border: 1px solid aquamarine;
}
</style-->

