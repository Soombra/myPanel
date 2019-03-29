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
  body{
    margin: 0px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    .list-page-head{
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
      display: inline-block;
      background-color: coral;
      color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
    }
    .article-head{
      font-size: 24px;
      margin-bottom: 30px;
      font-weight: bold;
    }
    .bottom-options {
      font-size: 20px;
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
    .list-item{
      display: flex;
      justify-content: space-between;
      &.head{
        background-color: #eee;
        color: #000;
        font-weight: bold;
        text-align: center;
      }
      .title{
        width: 30%;
      }
      .options{
        width: 20%;
        .option-btn{
          margin-left: 10px;
        }
      }
    }
    .flex{
      display: flex;
      align-items: center;
    }
    .pagination-wrapper{
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }
  }
  a{
    color: #333;
    text-decoration: none;
  }
</style>
