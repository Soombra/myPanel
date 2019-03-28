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
          <div class="option-btn" @click="handleUnpublish(scope.row)" v-if="scope.row.status === 'published'">取消发布</div>
          <div class="option-btn" @click="handlePublish(scope.row)" v-else>发布</div>
          <div class="option-btn" @click="handleDelete(scope.row)">删除</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="10"
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
        this.queryArticles()
      },
      handlePublish (article) {
        this.$confirm('确定要发布文章吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.publishArticle(article)
        }).catch(err => {})
      },
      handleUnpublish (article) {
        this.$confirm('确定要将文章下线吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.unPublishArticle(article)
        }).catch(err => {})
      },
      handleDelete (article) {
        this.$confirm('删除文章不可恢复，确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteArticle(article)
        }).catch(err => {})
      },
      publishArticle (article) {
        frontEnd.publishArticle(article._id).then(() => {
          article.status = 'published'
          this.$message.success('发布成功')
        }).catch(err => {
          console.log(err)
          this.$message.error('操作失败')
        })
      },
      unPublishArticle (article) {
        frontEnd.unPublishArticle(article._id).then(() => {
          article.status = 'offline'
          this.$message.success('取消发布成功')
        }).catch(err => {
          console.log(err)
          this.$message.error('操作失败')
        })
      },
      deleteArticle (article) {
        frontEnd.deleteArticle(article._id).then(() => {
          this.$message.success('删除成功')
          location.reload()
        }).catch(err => {
          console.log(err)
          this.$message.error('操作失败')
        })
      },
      queryArticles () {
        frontEnd.queryArticles({page: this.page}).then (({data, headers}) => {
          this.list = data
          this.totalCount = +headers['x-total-count']
        })
      }
    },
    mounted () {
      this.queryArticles()
    }
  }
</script>
<style lang="scss" scoped>

</style>
