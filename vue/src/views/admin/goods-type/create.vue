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
              label: '商品类型名称',
              widget: 'nf-input',
            },
            rules: {
              required: {
                value: true,
                errMsg: '请填写名称',
              },
            },
          },
          description: {
            ui: {
              label: '商品类型描述',
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
            this.$post('/api/goods-type/update', {
              ...this.$data.formSchema.value,
              id: this.$route.query.id,
            }).then(() => {
              this.$message.success('更新成功!')
            })
          } else {
            this.$post('/api/goods-type/create', {
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
      this.$post('/api/goods-type/findOne', { id: this.$route.query.id }).then(({ data }) => {
        this.formSchema.value = data
      })
    }
  },
}
</script>
