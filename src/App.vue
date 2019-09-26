<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
#app {
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url('./static/img/bg.gif') repeat;;
}
</style>
