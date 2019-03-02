<template>
  <div id="articleDetails">
    <div class="title">这里输入标题</div>
    <div ref="editor" class="editor"></div>
    <div v-html="editorContent"></div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import * as Qiniu from 'qiniu-js'
  import axios from 'axios'
  import {qiniu_baseUrl} from '../../config'

  export default {
    name: 'articleDetails',
    data () {
      return {
        editorContent: ''
      }
    },
    mounted () {
      let editor = new E (this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.customConfig.customUploadImg = async function (files, insert) {
        // 上传代t(imgUrl)
        console.log ('触发', files[0])
        try {
          const {data} = await axios.get ('/get_token')
          if (data.token) {
            console.log ('成功', data)

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
<style lang="scss" scoped>
  #articleDetails {
    .editor {
      width: 980px;
    }
  }
</style>
