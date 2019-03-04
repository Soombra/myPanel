<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    max-width: 980px;
    margin: 50px auto 0;
    input{
      min-width: 300px;
      border: 1px solid #ddd;
      border-radius: 4px;
      line-height: 24px;
      padding-left: 8px;
      outline: none;
    }
    .router-link{
      color: #333;
      text-decoration: none;
      &:hover{
        color: #000;
        text-decoration: none;
      }
    }
  }
</style>
