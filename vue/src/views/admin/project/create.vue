<template>
  <div>
    <div class="nf-main">
      <div class="nf-title">new project</div>
      <a-form class="oa"
              :form="form">
        <a-form-item label="title"
                     v-bind="formItemLayout">
          <a-input v-decorator="['title', formConfig.title]"
                   placeholder="Please input title"></a-input>
        </a-form-item>
        <a-form-item label="link"
                     v-bind="formItemLayout">
          <a-input v-decorator="['link', formConfig.link]"
                   placeholder="Please input link"></a-input>
        </a-form-item>
        <a-form-item label="content"
                     :label-col="formItemLayout.labelCol"
                     :wrapper-col="{ span: 19 }"
                     :validate-status="validateStatus"
                     :help="help"
                     required>
          <nf-markdown v-model="createForm.content"
                       @change="changeHandle"></nf-markdown>
        </a-form-item>
        <a-form-item label="logo"
                     v-bind="formItemLayout">
          <a-upload accept="image/*"
                    listType="picture-card"
                    class="avatar-uploader"
                    :showUploadList="false"
                    :customRequest="customRequest">
            <img v-if="createForm.logo"
                 :src="createForm.logo"
                 alt="logo">
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload Logo</div>
            </div>
          </a-upload>
        </a-form-item>
      </a-form>
    </div>
    <div class="nf-bottom-fixed">
      <a-button type="primary"
                @click="save">save</a-button>
      <a-button class="ml10"
                @click="$router.push({name: 'ProjectManager'})">cancel</a-button>
    </div>
  </div>
</template>

<script>
import { addProject, getProject, updateProject } from '../../../api/project'
import { addImg } from '../../../api/img'

export default {
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      createForm: {
        projectId: '',
        title: '',
        link: '',
        content: '',
        logo: '',
      },
      validateStatus: '',
      help: '',
      loading: false,
    }
  },
  computed: {
    formConfig() {
      return {
        title: {
          rules: [{ required: true, message: 'Please input title' }],
          initialValue: this.createForm.title,
        },
        link: {
          rules: [{ required: true, message: 'Please input link' }],
          initialValue: this.createForm.link,
        },
        content: {
          rules: [{ required: true, message: 'Pleate input content' }],
          initialValue: this.createForm.content,
        },
      }
    },
  },
  methods: {
    save() {
      const { content } = this.createForm
      const value = content
      this.help = value ? '' : 'Pleate input content'
      this.validateStatus = value ? '' : 'error'
      this.form.validateFields((err, values) => {
        if (!err && !this.help) {
          console.log('Received values of form: ', values)
          const params = this.$jquery.extend({}, this.createForm, values)
          const fn = this.createForm.projectId ? updateProject : addProject
          fn(params).h_then(({ code, msg }) => {
            if (code === 200) {
              this.$message.success(msg)
              this.$router.push({ name: 'ProjectManager' })
            }
          })
        }
      })
    },
    customRequest(e) {
      this.loading = true
      addImg(e).h_then(({ data }) => {
        this.loading = false
        this.createForm.logo = data
      })
    },
    changeHandle(val) {
      const value = val
      this.help = value ? '' : 'Pleate input content'
      this.validateStatus = value ? '' : 'error'
    },
    getDetail() {
      getProject(this.createForm.projectId).h_then(({ data }) => {
        Object.assign(this.createForm, data)
      })
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {
    this.createForm.projectId = this.$route.query.projectId
    if (this.createForm.projectId) {
      this.getDetail()
    }
  },
}
</script>

<style lang="scss" scoped>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.ant-form:not(.ant-form-inline):not(.ant-form-vertical) {
  max-width: 600px;
  margin: 0 auto;
}
</style>
