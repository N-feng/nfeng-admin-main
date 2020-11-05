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
export default {
  data() {
    return {
      formSchema: {
        type: 'object',
        properties: {
          title: {
            ui: {
              label: '属性名称',
              widget: 'nf-input',
            },
            rules: {
              required: {
                value: true,
                errMsg: '请填写属性名称',
              },
            },
          },
          // cateId: {
          //   ui: {
          //     label: '所属类型',
          //     widget: 'nf-select',
          //   },
          //   rules: {
          //     required: {
          //       value: true,
          //       errMsg: '请选择所属属性',
          //     },
          //   },
          // },
          attrType: {
            ui: {
              label: '录入方式',
              widget: 'nf-radio',
              widgetConfig: {
                enumSource: [
                  { value: 1, label: '单行文本框' },
                  { value: 2, label: '多行文本框' },
                  { value: 3, label: '从下面的列表中选择(一行代表一个可选值)' },
                ],
              },
            },
            rules: {
              required: {
                value: true,
                errMsg: '请选择录入方式',
              },
            },
          },
          attrValue: {
            ui: {
              label: '可选值列表',
              widget: 'nf-textarea',
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
            this.$post('/api/goods-type-attribute/update', {
              ...this.$data.formSchema.value,
              id: this.$route.query.id,
              cateId: this.$route.query.cateId,
            }).then(() => {
              this.$message.success('更新成功!')
            })
          } else {
            this.$post('/api/goods-type-attribute/create', {
              ...this.$data.formSchema.value,
              cateId: this.$route.query.cateId,
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
      this.$post('/api/goods-type-attribute/findOne', { id: this.$route.query.id }).then(({ data }) => {
        this.formSchema.value = data
      })
    }
  },
}
</script>
