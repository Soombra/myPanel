<template>
  <div class="index">
    <div class="panel-head">个人空间管理后台</div>
    <div class="side-bar">
      <router-link @click.native="currentPath = item.url" :class="['link', currentPath === item.url && 'active']" v-for="(item, index) in links" :to="item.url" :key="index">{{item.name}}</router-link>
    </div>
    <div class="index-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        currentPath: '',
        links: [
          {
            name: '足迹列表',
            url: '/footprint-list'
          },
          {
            name: '前端列表',
            url: '/front-end-list'
          }, {
            name: '游记列表',
            url: '/travel-list'
          }, {
            name: '随笔列表',
            url: '/essay-list'
          }
        ]
      }
    },
    mounted () {
      if(this.$route.path === '/'){
        this.currentPath = '/front-end-list'
      } else {
        this.currentPath = this.$route.path
      }
    }
  }
</script>
<style lang="scss">
  .index {
    padding-top: 50px;

    .panel-head {
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

    .side-bar {
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

      .link {
        margin-top: 30px;
        &.active{
          color: coral;
        }

        &:hover {
          color: coral;
          text-decoration: none;
        }
      }
    }

    .index-content {
      margin-top: 20px;
      margin-left: 150px;
      max-width: 980px;

      .content-row {
        color: #333;

        display: flex;
        margin-bottom: 20px;

        input[type=text] {
          width: 600px;
          border: 1px solid #ddd;
          border-radius: 4px;
          line-height: 24px;
          padding-left: 8px;
          outline: none;
        }

        textarea {
          width: 600px;
          border: 1px solid #ddd;
          border-radius: 4px;
          line-height: 24px;
          padding-left: 8px;
          outline: none;
        }
        .left {
          width: 10%;
        }

        .right {
          width: 90%;
          img{
            display: block;
            width: 100%;
          }
        }
        .tag, .add-tag, .clear-tag{
          padding: 3px 7px;
          border-radius: 10px;
          color: #fff;
          background-color: coral;
          font-size: 14px;
          cursor: pointer;
          margin-right: 10px;
        }
        .add-tag{
          background-color: green;
        }
        .clear-tag{
          background-color: red;
        }
      }

      .editor {
        .w-e-text-container {
          min-height: 500px;
          height: auto;
        }
      }
    }
  }
</style>
