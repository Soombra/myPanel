<template>
  <div class="index">
    <div class="panel-head">个人空间管理后台</div>
    <div class="side-bar">
      <router-link class="link" v-for="(item, index) in links" :to="item.url" :key="index">{{item.name}}</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        links: [
          {
            name: '前端',
            url: '/front-end-list'
          },{
            name: '游记',
            url: '/travel-list'
          },{
            name: '随笔',
            url: '/essay-list'
          }
        ]
      }
    }
  }
</script>
<style lang="scss" scoped>
  .index{
    padding-top: 50px;
    .panel-head{
      height: 50px;
      position: fixed;
      top: 0;
      left: 0;
      line-height: 50px;
      font-size: 24px;
      font-weight: bold;
      padding-left: 20px;
      background-color: #eee;
      width: 100%;
    }
    .side-bar{
      width: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: fixed;
      top: 70px;
      left: 0;
      background-color: #fff;
      border: 1px solid #eee;
      padding-bottom: 30px;
      .link{
        margin-top: 30px;
      }
    }
    .content{
      margin-left: 150px;
      max-width: 980px;
    }
  }
</style>
