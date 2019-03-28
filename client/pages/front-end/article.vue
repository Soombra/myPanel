<template>
  <div id="articleDetails">
    <div class="article-head">{{isNew ? '创建文章' : '修改文章' }}</div>
    <div class="title">标题: <input type="text" v-model="article.title"></div>
    <div class="image">封面图:
      <input type="file" @change="handleSelectImage"/>
      <image v-if="article.image" :src="article.image"></image>
    </div>
    <div class="content">
      正文:
      <div ref="editor" class="editor"></div>x
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
  import {frontEnd} from '../../apis'
  import {qiniu_baseUrl} from '../../../config'

  export default {
    name: 'articleDetails',
    data () {
      return {
        isNew: true,
        article: {
          title: '',
          content: '',
          image: ''
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
        frontEnd.createArticle (this.article).then (() => {
          this.$router.push ('/front-end-list')
        }).catch (err => {
          console.log (err)
        })
      },
      modifyArticle () {
        frontEnd.modifyArticle (this.id, this.article).then (() => {
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
          frontEnd.getArticle (id).then (({data}) => {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #articleDetails {
    .title {
      margin-bottom: 20px;

      input {
        min-width: 300px;
        border: 1px solid #ddd;
        border-radius: 4px;
        line-height: 24px;
        padding-left: 8px;
        outline: none;
      }
    }

    .editor {
      width: 980px;

      .w-e-text-container {
        min-height: 500px;
        height: auto;
      }
    }
  }
</style>
