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
          title: {
            ui: {
              label: '分类名称',
              widget: 'nf-input',
            },
            rules: {
              required: {
                value: true,
                errMsg: '请填写名称',
              },
            },
          },
          pid: {
            type: 'string',
            // value: '0',
            ui: {
              label: '上级分类',
              widget: 'nf-select',
              widgetConfig: {
                enumSourceRemote: {
                  // 远程数据源
                  remoteUrl: '/api/enum/findGoodsCate', // 如果是远程访问，则填写该url
                  paramName: 'keyword', // 请求参数名，默认是keyword
                  otherParams: { pid: '0' }, // 其它请求的参数，支持字符串表达式
                  resField: 'list', // 响应结果的字段
                  selectFirstItem: false, // 默认选中第一项
                },
              },
            },
            rules: {
              required: {
                value: true,
                errMsg: '请选择分类',
              },
            },
          },
          cateImg: {
            value: [],
            ui: {
              label: '分类图片',
              widget: 'nf-upload',
              widgetConfig: {
                uploadUrl: '/api/focus/upload',
                data: { targetType: 'recharge_voucher_img' },
                resField: 'data',
              },
            },
          },
          link: {
            ui: {
              label: '跳转地址',
              widget: 'nf-input',
            },
          },
          template: {
            ui: {
              label: '分类模板',
              widget: 'nf-input',
              description: '空表示默认模板',
            },
          },
          subTitle: {
            ui: {
              label: 'Seo标题',
              widget: 'nf-input',
            },
          },
          keywords: {
            ui: {
              label: 'Seo关键词',
              widget: 'nf-input',
            },
          },
          description: {
            ui: {
              label: 'Seo描述',
              widget: 'nf-textarea',
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
            rules: {
              required: {
                value: true,
                errMsg: '请选择状态',
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
          const cateImg = this.$data.formSchema.value.cateImg[0] ? this.$data.formSchema.value.cateImg[0].url : ''
          if (this.$route.query.id) {
            this.$post('/api/goods-cate/update', {
              ...this.$data.formSchema.value,
              id: this.$route.query.id,
              cateImg,
            }).then(() => {
              this.$message.success('更新成功!')
            })
          } else {
            this.$post('/api/goods-cate/create', {
              ...this.$data.formSchema.value,
              cateImg,
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
      this.$post('/api/goods-cate/findOne', { id: this.$route.query.id }).then((res) => {
        if (!res) {
          return
        }
        const { data } = res
        const cateImg = data.cateImg ? [{
          uid: uuidv4(),
          name: data.cateImg.replace('/upload/', ''),
          url: data.cateImg,
          status: 'success',
        }] : []
        this.formSchema.value = {
          ...data,
          cateImg,
        }
      })
    }
  },
}
</script>
