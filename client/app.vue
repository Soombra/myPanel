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
    input{
      min-width: 300px;
      border: 1px solid #ddd;
      border-radius: 4px;
      line-height: 24px;
      padding-left: 8px;
      outline: none;
    }
    a{
      color: #333;
      text-decoration: none;
      &:hover{
        color: #000;
        text-decoration: none;
      }
    }
    .list-head{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .list-item{
      display: flex;
      height: 40px;
      align-items: center;
      border-bottom: 1px solid #eee;
    }
    .option-btn{
      background-color: coral;
      color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
    }
    .article-head{
      font-size: 24px;
      margin-bottom: 50px;
      font-weight: bold;
    }
    .bottom-options {
      font-size: 20px;
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
  }
</style>
