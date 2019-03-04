<template>
  <div class="list">
    <div class="list-item" v-for="(item, index) in list" :key="index">
      <router-link class="router-link" :to="`/article/${item._id}`">
        {{item.title}}
      </router-link>
    </div>
  </div>
</template>
<script>
  import request from '../request'

  export default {
    data () {
      return {
        list: []
      }
    },
    mounted () {
      request.get ('/articles').then (({data}) => {
        this.list = data
      })
    }
  }
</script>
<style lang="scss" scoped>

</style>
