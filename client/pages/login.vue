<template>
  <div class="login">
    <div class="title">请登录后操作</div>
    <p>用户名：<input type="text" v-model="username"></p>
    <p>密码：<input type="password" v-model="password"></p>
    <div class="submit" @click="handleSubmit">登录</div>
  </div>
</template>
<script>
  import request from '../request'

  export default {
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      handleSubmit () {
        const {username, password} = this
        request.post('/login', {username, password}).then(() => {
          // location.href = '/'
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .login{
    width: 380px;
    margin: 200px auto 0;
    .title{
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 50px;
    }
    p{
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      input{
        width: 150px;
      }
    }
    .submit{
      width: 60px;
      height: 30px;
      margin: 50px auto;
      background-color: coral;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      color: #fff;
      font-weight: bold;
      cursor: pointer;
    }
  }
</style>
