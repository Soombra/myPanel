<template>
  <div class="footprint">
    <div class="list-page-head">
      <h3>足迹列表</h3>
      <span class="option-btn" @click="addFootPrint">添加足迹</span>
    </div>
    <el-table
        :data="list"
        :header-row-style="{color: '#000', fontWeight: 'bold'}"
        style="width: 100%">
      <el-table-column
          prop="name"
          label="文章标题">
      </el-table-column>
      <el-table-column
          label="时间">
        <template slot-scope="scope">
          {{scope.row.date && moment(scope.row.date).format('YYYY.MM.DD')}}
        </template>
      </el-table-column>
      <el-table-column
          label="操作">
        <template slot-scope="scope">
          <div class="option-btn" @click="deleteFootprint(scope.row._id)">删除</div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="10"
          @current-change='pageChange'
          :total="totalCount">
      </el-pagination>
    </div>
    <el-dialog title="添加足迹" :visible.sync="showDialog" width="500px">
      <el-form label-width="80px">
        <el-form-item label="地点">
          <el-input v-model="footprint.name" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="城市限制">
          <el-input v-model="footprint.city" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
              style="width: 300px"
              v-model="footprint.date"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {home} from '../../apis'
  import moment from 'moment'

  export default {
    data () {
      return {
        showDialog: false,
        footprint: {},
        totalCount: 0,
        moment,
        list: [],
        page: 1
      }
    },
    methods: {
      addFootPrint (footPrint) {
        if (footPrint.title) {
          this.footprint = footPrint
        }
        this.showDialog = true
      },
      handleSubmit () {
        const {name, city, date} = this.footprint
        if (!name || !city || !date) {
          this.$message({
            message: '请完善信息',
            type: 'error'
          })
        } else {
          home.createFootprint({
            name,
            city,
            date
          }).then(() => {
            location.reload()
          }).catch(err => {
            console.log(err)
          })
        }
      },
      queryFootprints () {
        home.queryFootprints({page: this.page}).then (({data, headers}) => {
          this.list = data
          this.totalCount = +headers['x-total-count']
        })
      },
      deleteFootprint (id) {
        this.$confirm('删除不可恢复，确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          home.deleteFootprint(id).then(() => {
            location.reload()
          }).catch(err => {
            console.log(err)
          })
        }).catch(err => {})
      },
      pageChange (page) {
        this.page = page
        this.queryFootprints()
      }
    },
    mounted () {
      this.queryFootprints()
    }
  }
</script>
<style lang="scss">

</style>
