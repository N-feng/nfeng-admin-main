<template>
  <div>
    <ncform
      :form-schema="formSchema"
      form-name="part2"
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
          goodsColor: {
            type: 'array',
            // value: [],
            ui: {
              label: '商品颜色',
              widget: 'nf-checkbox',
              widgetConfig: {
                enumSourceRemote: {
                  // 远程数据源
                  remoteUrl: '/api/enum/findGoodsColor', // 如果是远程访问，则填写该url
                  paramName: 'keyword', // 请求参数名，默认是keyword
                  otherParams: {}, // 其它请求的参数，支持字符串表达式
                  resField: 'list', // 响应结果的字段
                  selectFirstItem: false, // 默认选中第一项
                },
              },
            },
            rules: {
              required: {
                value: true,
                errMsg: '请选择商品颜色',
              },
            },
          },
          relationGoods: {
            ui: {
              label: '关联商品',
              widget: 'nf-input',
              description: '填写关联商品的id 多个以逗号隔开 格式:23,24,39',
            },
          },
          goodsGift: {
            ui: {
              label: '关联赠品',
              widget: 'nf-input',
              description: '可为空 格式:23-2,39-5 说明: 例如23-2 中的23表示商品id,2表示商品数量',
            },
          },
          goodsFitting: {
            ui: {
              label: '关联配件',
              widget: 'nf-input',
              description: '可为空 格式:23-2,39-5 说明: 例如23-2 中的23表示商品id,2表示商品数量',
            },
          },
          goodsAttrs: {
            ui: {
              label: '更多属性',
              widget: 'nf-input',
              description: '格式 颜色:红色,白色,黄色|尺寸:41,42,43',
            },
            rules: {
              required: {
                value: true,
                errMsg: '请填写更多属性',
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
      form: '',
    }
  },
  methods: {
    submit() {
      this.$ncformValidate('part2').then((data) => {
        if (data.result) {
          if (this.$route.query.id) {
            this.$post('/api/goods/update', {
              ...this.$data.form,
              ...this.$data.formSchema.value,
              id: this.$route.query.id,
            }).then(() => {
              this.$message.success('更新成功!')
            })
          } else {
            this.$post('/api/goods/create', {
              ...this.$data.form,
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
      this.$post('/api/goods/findOne', { id: this.$route.query.id }).then(({ data }) => {
        this.formSchema.value = data
        this.form = data
      })
    }
  },
}
</script>
