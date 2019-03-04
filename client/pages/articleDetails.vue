<template>
  <div id="articleDetails">
    <div class="title">标题: <input type="text" v-model="title"></div>
    <div class="content">
      正文:
      <div ref="editor" class="editor"></div>
    </div>
    <div class="options">
      <div class="submit" @click="handleSubmit">提交</div>
    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import * as Qiniu from 'qiniu-js'
  import axios from 'axios'
  import {createArticle} from '../apis'
  import {qiniu_baseUrl} from '../../config'

  export default {
    name: 'articleDetails',
    data () {
      return {
        title: '',
        editorContent: ''
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
      }
    },
    mounted () {
      let editor = new E (this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.customConfig.customUploadImg = async function (files, insert) {
        try {
          const {data} = await axios.get ('/get_qiniu_token')
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

    .options {
      font-size: 20px;
      margin-top: 20px;
      display: flex;
      justify-content: center;

      .submit {
        padding: 5px 10px;
        border-radius: 5px;
        background-color: aqua;
        cursor: pointer;
      }
    }
  }
</style>
