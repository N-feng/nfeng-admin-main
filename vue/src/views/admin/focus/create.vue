<template>
  <div>
    <ncform
      :form-schema="formSchema"
      form-name="your-form-name"
      v-model="formSchema.value"
      @submit="submit()"
    ></ncform>
    <div style="text-align: center">
      <a-button @click="submit()">提交</a-button>
    </div>
  </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  data() {
    return {
      formSchema: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            ui: {
              label: '分类',
              widget: 'nf-select',
              widgetConfig: {
                enumSource: [
                  { label: '网站', value: 1 },
                  { label: 'APP', value: 2 },
                  { label: '小程序', value: 3 },
                ],
              },
            },
            rules: {
              required: {
                value: true,
                errMsg: '请选择分类',
              },
            },
          },
          title: {
            ui: {
              label: '名称',
              widget: 'nf-input',
            },
            rules: {
              required: {
                value: true,
                errMsg: '请填写名称',
              },
            },
          },
          link: {
            ui: {
              label: '跳转地址',
              widget: 'nf-input',
            },
          },
          focusImg: {
            value: [],
            ui: {
              label: '轮播图',
              widget: 'nf-upload',
              widgetConfig: {
                uploadUrl: '/api/focus/upload',
                data: { targetType: 'recharge_voucher_img' },
                resField: 'data',
              },
            },
            rules: {
              required: {
                value: true,
                errMsg: '请上传轮播图',
              },
            },
          },
          sort: {
            default: 100,
            ui: {
              label: '排序',
              widget: 'nf-input',
            },
            rules: {
              required: {
                value: true,
                errMsg: '请填写排序',
              },
            },
          },
          status: {
            ui: {
              label: '状态',
              widget: 'nf-radio',
              widgetConfig: {
                enumSource: [{ value: 1, label: '是' }, { value: 0, label: '否' }],
              },
            },
          },
        },
        ui: {
          widgetConfig: {
            layout: 'h',
          },
        },
        globalConfig: {
          style: {
            formCls: 'nf-form',
            invalidFeedbackCls: [
              'el-form-item__error',
            ],
          },
        },
      },
    }
  },
  methods: {
    submit() {
      this.$ncformValidate('your-form-name').then((data) => {
        if (data.result) {
          if (this.$route.query.id) {
            this.$post('/api/focus/update', {
              ...this.$data.formSchema.value,
              id: this.$route.query.id,
              focusImg: this.$data.formSchema.value.focusImg[0].url,
            }).then(() => {
              this.$message.success('更新成功!')
            })
          } else {
            this.$post('/api/focus/create', {
              ...this.$data.formSchema.value,
              focusImg: this.$data.formSchema.value.focusImg[0].url,
            }).then(() => {
              this.$message.success('创建成功!')
            })
          }
        }
      })
    },
  },
  created() {
    if (this.$route.query.id) {
      this.$post('/api/focus/findOne', { id: this.$route.query.id }).then(({ data }) => {
        this.formSchema.value = {
          ...data,
          focusImg: [{
            uid: uuidv4(),
            name: data.focusImg.replace('/upload/', ''),
            url: data.focusImg,
            status: 'success',
          }],
        }
      })
    }
  },
}
</script>
