module.exports = {
  formSchema: {
    type: 'object',
    properties: {
      username: {
        ui: {
          label: '用户名称',
          widget: 'nf-input',
        },
        rules: {
          required: {
            value: true,
            errMsg: '请填写用户名称',
          },
        },
      },
      password: {
        type: 'string',
        ui: {
          label: '用户密码',
          widget: 'nf-input',
        },
        rules: {
          required: {
            value: true,
            errMsg: '请填写用户密码',
          },
        },
      },
      mobile: {
        ui: {
          label: '用户电话',
          widget: 'nf-input',
        },
      },
      email: {
        ui: {
          label: '用户邮箱',
          widget: 'nf-input',
        },
      },
      roleId: {
        type: 'string',
        ui: {
          label: '用户角色',
          widget: 'nf-select',
          widgetConfig: {
            enumSourceRemote: {
              // 远程数据源
              remoteUrl: '/api/enum/findRoles', // 如果是远程访问，则填写该url
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
            errMsg: '请选择用户角色',
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
