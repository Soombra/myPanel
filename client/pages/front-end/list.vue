<template>
  <div class="front-end">
    <div class="list-page-head">
      <h3>前端文档列表</h3>
      <router-link class="option-btn" to="/front-end/article/new">创建新文章</router-link>
    </div>
    <el-table
        :data="list"
        :header-row-style="{color: '#000', fontWeight: 'bold'}"
        style="width: 100%">
      <el-table-column
          prop="title"
          label="文章标题">
      </el-table-column>
      <el-table-column
          label="创建日期">
        <template slot-scope="scope">
          {{scope.row.date_created && moment(scope.row.date_created).format('YYYY-MM-DD HH:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column
          label="发布日期">
        <template slot-scope="scope">
          {{scope.row.date_published && moment(scope.row.date_published).format('YYYY-MM-DD HH:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column
          label="操作">
        <template slot-scope="scope">
          <router-link target='_blank' :to="`/front-end/article/${scope.row._id}`" class="option-btn">编辑</router-link>
          <div class="option-btn" @click="publish(scope.row._id)" v-if="scope.row.is_published">取消发布</div>
          <div class="option-btn" @click="unpublish(scope.row._id)" v-else>发布</div>
          <div class="option-btn" @click="handleDelete(scope.row._id)">删除</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
          background
          layout="prev, pager, next"
          @current-change = 'pageChange'
          :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {frontEnd} from '../../apis'
  import moment from 'moment'

  export default {
    data () {
      return {
        list: [],
        moment,
        page: 1,
        totalCount: 0
      }
    },
    methods: {
      pageChange (page) {
        this.page = page
      },
      publish (id) {

      },
      unpublish (id) {

      },
      handleDelete (id) {

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
