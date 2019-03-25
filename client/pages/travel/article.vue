<template>
  <div id="articleDetails">
    <div class="article-head">{{isNew ? '创建文章' : '修改文章' }}</div>
    <div class="title">标题: <input type="text" v-model="title"></div>
    <div class="content">
      正文:
      <div ref="editor" class="editor"></div>
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
  import {createArticle} from '../../apis'
  import {qiniu_baseUrl} from '../../../config'

  export default {
    name: 'articleDetails',
    data () {
      return {
        title: '',
        editorContent: '',
        isNew: true
      }
    },
    methods: {
      handleSubmit () {
        createArticle ({
          title: this.title,
          content: this.editorContent
        }).then (() => {
          location.href = '/'
        })
      },
      getArticle (editor) {
        const id = this.$route.params.id
        if(id !== 'new'){
          this.isNew = false
          request.get(`/article/${id}`).then(({data}) => {
            if (data) {
              this.title = data.title
              this.content = data.content
              editor.txt.html(data.content)
            }
          })
        }
      }
    },
    mounted () {
      let editor = new E (this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
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

      this.getArticle(editor)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #articleDetails {
    .title {
      margin-bottom: 20px;
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
