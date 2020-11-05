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
          colorName: {
            ui: {
              label: '商品颜色名称',
              widget: 'nf-input',
            },
            rules: {
              required: {
                value: true,
                errMsg: '请填写商品颜色名称',
              },
            },
          },
          colorValue: {
            ui: {
              label: '商品颜色值',
              widget: 'nf-textarea',
            },
            rules: {
              required: {
                value: true,
                errMsg: '请填写商品颜色值',
              },
            },
          },
          status: {
            ui: {
              label: '商品颜色状态',
              widget: 'nf-radio',
              widgetConfig: {
                enumSource: [{ value: 1, label: '是' }, { value: 0, label: '否' }],
              },
            },
            rules: {
              required: {
                value: true,
                errMsg: '请选择商品颜色状态',
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
            this.$post('/api/goods-color/update', {
              ...this.$data.formSchema.value,
              id: this.$route.query.id,
            }).then(() => {
              this.$message.success('更新成功!')
            })
          } else {
            this.$post('/api/goods-color/create', {
              ...this.$data.formSchema.value,
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
      this.$post('/api/goods-color/findOne', { id: this.$route.query.id }).then(({ data }) => {
        this.formSchema.value = data
      })
    }
  },
}
</script>
