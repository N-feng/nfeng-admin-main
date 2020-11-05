<template>
  <div>
    <ncform
      :form-schema="formSchema"
      form-name="part1"
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
              label: '商品标题',
              widget: 'nf-input',
            },
            rules: {
              required: {
                value: true,
                errMsg: '请填写商品标题',
              },
            },
          },
          subTitle: {
            ui: {
              label: '附属标题',
              widget: 'nf-input',
            },
            rules: {
              required: {
                value: true,
                errMsg: '请填写附属标题',
              },
            },
          },
          goodsVersion: {
            ui: {
              label: '商品版本',
              widget: 'nf-input',
            },
            rules: {
              required: {
                value: true,
                errMsg: '请填写商品版本',
              },
            },
          },
          goodsCateId: {
            type: 'string',
            // value: '0',
            ui: {
              label: '所属分类',
              widget: 'nf-select',
              widgetConfig: {
                enumSourceRemote: {
                  // 远程数据源
                  remoteUrl: '/api/enum/findGoodsCate', // 如果是远程访问，则填写该url
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
                errMsg: '请选择所属分类',
              },
            },
          },
          goodsImg: {
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
          marketPrice: {
            ui: {
              label: '商品价格',
              widget: 'nf-input',
            },
            rules: {
              required: {
                value: true,
                errMsg: '请填写商品价格',
              },
            },
          },
          shopPrice: {
            ui: {
              label: '商品原价',
              widget: 'nf-input',
            },
            rules: {
              required: {
                value: true,
                errMsg: '请填写商品原价',
              },
            },
          },
          status: {
            ui: {
              label: '商品状态',
              widget: 'nf-radio',
              widgetConfig: {
                enumSource: [{ value: 1, label: '是' }, { value: 0, label: '否' }],
              },
            },
            rules: {
              required: {
                value: true,
                errMsg: '请选择商品状态',
              },
            },
          },
          recommended: {
            type: 'array',
            ui: {
              label: '加入推荐',
              widget: 'nf-checkbox',
              widgetConfig: {
                enumSource: [
                  { value: 'isBest', label: '精品' },
                  { value: 'isHot', label: '热销' },
                  { value: 'isLatest', label: '新品' },
                ],
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
      this.$ncformValidate('part1').then((data) => {
        const goodsImg = this.$data.formSchema.value.goodsImg[0] ? this.$data.formSchema.value.goodsImg[0].url : ''
        if (data.result) {
          if (this.$route.query.id) {
            this.$post('/api/goods/update', {
              ...this.$data.formSchema.value,
              id: this.$route.query.id,
              goodsImg,
            }).then(() => {
              this.$message.success('更新成功!')
            })
          } else {
            this.$post('/api/goods/create', {
              ...this.$data.formSchema.value,
              goodsImg,
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
        let goodsImg
        if (data.goodsImg) {
          goodsImg = [{
            uid: uuidv4(),
            name: data.goodsImg.replace('/upload/', ''),
            url: data.goodsImg,
            status: 'success',
          }]
        } else {
          goodsImg = []
        }
        const recommended = []
        this.formSchema.value = {
          ...data,
          goodsImg,
          recommended,
        }
      })
    }
  },
}
</script>
