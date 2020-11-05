module.exports = {
  formSchema: {
    type: 'object',
    properties: {
      username: {
        label: '用户名称',
        widget: 'input',
        rules: [{
          required: true,
          message: '请填写用户名称',
        }],
      },
      password: {
        label: '用户密码',
        widget: 'input',
        rules: [{
          required: true,
          message: '请填写用户密码',
        }],
      },
      mobile: {
        label: '用户电话',
        widget: 'input',
      },
      email: {
        label: '用户邮箱',
        widget: 'input',
      },
      roleId: {
        label: '用户角色',
        widget: 'select',
        remoteUrl: '/api/enum/findRoles', // 如果是远程访问，则填写该url
        resField: 'list', // 响应结果的字段
        rules: [{
          required: true,
          message: '请选择用户角色',
        }],
      },
    },
    globalConfig: {
      formCls: 'form',
    },
  },
}
