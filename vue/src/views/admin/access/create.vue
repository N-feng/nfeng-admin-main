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
          moduleName: {
            ui: {
              label: '模块名称',
              widget: 'nf-input',
            },
            rules: {
              required: {
                value: true,
                errMsg: '请填写模块名称',
              },
            },
          },
          type: {
            type: 'string',
            ui: {
              label: '节点类型',
              widget: 'nf-select',
              widgetConfig: {
                enumSource: [
                  { label: '模块', value: 1 },
                  { label: '菜单', value: 2 },
                  { label: '操作', value: 3 },
                ],
              },
            },
            rules: {
              required: {
                value: true,
                errMsg: '请选择节点类型',
              },
            },
          },
          actionName: {
            ui: {
              label: '操作名称',
              widget: 'nf-input',
            },
          },
          url: {
            ui: {
              label: '操作地址',
              widget: 'nf-input',
            },
          },
          moduleId: {
            type: 'string',
            ui: {
              label: '所属模块',
              widget: 'nf-select',
              widgetConfig: {
                enumSourceRemote: {
                  // 远程数据源
                  remoteUrl: '/api/enum/findModules', // 如果是远程访问，则填写该url
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
                errMsg: '请选择所属模块',
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
          description: {
            ui: {
              label: '描述',
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
            this.$post('/api/access/update', { id: this.$route.query.id, ...this.$data.formSchema.value }).then(() => {
              this.$message.success('更新成功!')
            })
          } else {
            this.$post('/api/access/create', { ...this.$data.formSchema.value }).then(() => {
              this.$message.success('创建成功!')
            })
          }
        }
      })
    },
  },
  created() {
    if (this.$route.query.id) {
      this.$post('/api/access/findOne', { id: this.$route.query.id }).then(({ data }) => {
        this.formSchema.value = data
      })
    }
  },
}
</script>
