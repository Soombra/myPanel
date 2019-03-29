<template>
  <div class="articleDetails">
    <div class="article-head">{{isNew ? '创建文章' : '修改文章' }}</div>
    <div class="article-content">
      <div class="content-row">
        <div class="left">标题:</div>
        <div class="right">
          <input type="text" v-model="article.title"></div>
      </div>
      <div class="content-row">
        <div class="left">摘要:</div>
        <div class="right">
          <textarea rows="3" type="text" v-model="article.abstract"/>
        </div>
      </div>
      <div class="content-row">
        <div class="left">封面图:</div>
        <div class="right">
          <input type="file" @change="handleSelectImage"/>
          <image v-if="article.image" :src="article.image"></image>
        </div>
      </div>
    </div>
    <div class="content-row">
      <div class="left">正文:</div>
      <div class="right">
        <div ref="editor" class="editor"></div>
      </div>
    </div>
    <div class="bottom-options">
      <div class="option-btn" @click="handleSubmit">提交</div>
    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import * as Qiniu from 'qiniu-js'
  import request from '../../request'
  import {travel} from '../../apis'
  import {qiniu_baseUrl} from '../../../config'

  export default {
    name: 'articleDetails',
    data () {
      return {
        isNew: true,
        article: {
          title: '',
          content: '',
          image: '',
          abstract: ''
        },
        id: ''
      }
    },
    methods: {
      handleSubmit () {
        if (this.isNew) {
          this.createArticle ()
        } else {
          this.modifyArticle ()
        }
      },
      async handleSelectImage (e) {
        const {files} = e.target
        if (files.length) {
          const {data} = await request.get ('/get_qiniu_token')
          if (data.token) {
            let observable = Qiniu.upload (files[0], files[0].name, data.token, {}, {})
            observable.subscribe ({
              next: (res) => {
                console.log ('上传中', res)
              },
              error: (err) => {
                console.log ('出错了', err)
              },
              complete: (res) => {
                console.log ('上传结束', res)
                this.article = {...this.article, image: qiniu_baseUrl + res.key}
              }
            })
          }
        }
      },
      createArticle () {
        travel.createArticle (this.article).then (() => {
          console.log('成功回调')
          this.$router.push ('/front-end-list')
        }).catch (err => {
          console.log (err)
        })
      },
      modifyArticle () {
        travel.modifyArticle (this.id, this.article).then (() => {
          this.$message ({
            message: '修改成功',
            type: 'success'
          });
        }).catch (err => {
          this.$message ({
            message: '修改失败',
            type: 'error'
          });
        })
      },
      getArticle (editor) {
        const id = this.$route.params.id
        if (id !== 'new') {
          this.id = id
          this.isNew = false
          travel.getArticle (id).then (({data}) => {
            if (data) {
              this.article = data
              editor.txt.html (data.content)
            }
          })
        }
      }
    },
    mounted () {
      let editor = new E (this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.article.content = html
      }
      editor.customConfig.customUploadImg = async function (files, insert) {
        try {
          const {data} = await request.get ('/get_qiniu_token')
          if (data.token) {
            let observable = Qiniu.upload (files[0], files[0].name, data.token, {}, {})
            let subscription = observable.subscribe ({
              next (res) {
                console.log ('上传中', res)
              },
              error (err) {
                console.log ('出错了', err)
              },
              complete (res) {
                console.log ('上传结束', res)
                insert (qiniu_baseUrl + res.key)
              }
            })
          }
        } catch (err) {
          console.log ('失败', err)
        }
      }
      editor.create ()

      this.getArticle (editor)
    }
  }
</script>
