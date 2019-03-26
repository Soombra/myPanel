<template>
  <div class="front-end">
    <div class="list-head">
      <h3>前端文档列表</h3>
      <a class="option-btn" href="/front-end/article/new">创建新文章</a>
    </div>
    <div class="list">
      <div class="list-item" v-for="(item, index) in list" :key="index">
        <router-link class="router-link" :to="`/front-end/article/${item._id}`">
          {{item.title}}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import {frontEnd} from '../../apis'

  export default {
    data () {
      return {
        list: []
      }
    },
    mounted () {
      frontEnd.queryArticles().then (({data}) => {
        this.list = data
      })
    }
  }
</script>
<style lang="scss" scoped>

</style>
