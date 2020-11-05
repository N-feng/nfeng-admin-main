<template>
  <div>
    <vue-quill-editor
      ref="QuillEditor"
      v-model="messageForm.goodsDesc"
      :options="options"
    />
    <input
      id="fileInput"
      type="file"
      style="display: none;"
      accept="image"
      @change="getImage"
    />
    <div style="text-align: center">
      <a-button @click="submit()">提交</a-button>
    </div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  components: {
    'vue-quill-editor': quillEditor,
  },
  data() {
    return {
      messageForm: {
        goodsDesc: '',
      },
      options: {
        placeholder: '请输入内容',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
              ['blockquote', 'code-block'], // 引用，代码块

              [{ header: 1 }, { header: 2 }], // 几级标题
              [{ list: 'ordered' }, { list: 'bullet' }], // 有序列表，无序列表
              [{ script: 'sub' }, { script: 'super' }], // 下角标，上角标
              [{ indent: '-1' }, { indent: '+1' }], // 缩进
              [{ direction: 'rtl' }], // 文字输入方向

              [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
              [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题

              [{ color: [] }, { background: [] }], // 颜色选择
              [{ font: [] }], // 字体
              [{ align: [] }], // 居中
              ['link', 'image'],
              ['clean'], // 清除样式
            ],
            handlers: {
              image(value) {
                if (value) {
                  // console.log(value)
                  document.getElementById('fileInput').click()
                } else {
                  this.quill.format('image', false)
                }
              },
            },
          },
        },
      },
    }
  },
  methods: {
    getImage(e) {
      const { files } = e.target
      const file = files[0]
      const form = new FormData()
      form.append('fileName', file.name)
      form.append('file', file)

      this.$post('/api/focus/upload', form).then((res) => {
        if (!res) {
          return
        }
        const { data } = res
        // console.log(data)
        // 插入链接
        const { quill } = this.$refs.QuillEditor
        const length = quill.getSelection().index
        const { url } = data

        quill.insertEmbed(
          length,
          'image',
          url,
        )
        quill.setSelection(length + 1)
      })
    },
    submit() {
      if (this.$route.query.id) {
        this.$post('/api/goods/update', {
          ...this.$data.messageForm,
          id: this.$route.query.id,
        }).then(() => {
          this.$message.success('更新成功!')
        })
      } else {
        this.$post('/api/goods/create', {
          ...this.$data.messageForm,
        }).then(() => {
          this.$message.success('创建成功!')
        })
      }
    },
  },
  created() {
    if (this.$route.query.id) {
      this.$post('/api/goods/findOne', { id: this.$route.query.id }).then(({ data }) => {
        // console.log(data)
        this.messageForm = {
          ...data,
          goodsDesc: data.goodsDesc || '',
        }
      })
    }
  },
}
</script>

<style>
.quill-editor {
  margin-bottom: 22px;
}
.ql-editor {
  min-height: 300px;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
	content: "请输入链接地址:" !important;
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
	border-right: 0px;
	content: "保存" !important;
	padding-right: 0px;
}
.ql-snow .ql-tooltip[data-mode="video"]::before {
	content: "请输入视频地址:" !important;
}
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
	content: "14px" !important;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
	content: "10px" !important;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
	content: "18px" !important;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
	content: "32px" !important;
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
	content: "文本" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
	content: "标题1" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
	content: "标题2" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
	content: "标题3" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
	content: "标题4" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
	content: "标题5" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
	content: "标题6" !important;
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
	content: "标准字体" !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
	content: "衬线字体" !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
	content: "等宽字体" !important;
}
</style>
