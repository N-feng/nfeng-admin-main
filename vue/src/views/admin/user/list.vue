<template>
  <nf-table
    remoteUrl="/api/user/findAll"
    :tableColumns="tableColumns"
    @row-update="rowUpdate"
    @row-del="rowDel"
  ></nf-table>
</template>

<script>

export default {
  data() {
    return {
      tableColumns: [
        {
          title: '用户名称',
          dataIndex: 'username',
        },
        {
          title: '用户电话',
          dataIndex: 'mobile',
        },
        {
          title: '用户邮箱',
          dataIndex: 'email',
        },
        {
          title: '用户角色',
          // dataIndex: 'role',
          // customRender: (text) => text.map((item) => item.title),
          dataIndex: 'roleName',
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  methods: {
    rowUpdate(form) {
      this.$router.push({
        path: '/admin/user/create',
        query: {
          id: form._id,
        },
      })
    },
    rowDel(form, updateTable) {
      this.$get('/api/user/remove', { id: form._id }).then(() => {
        this.$message.success('删除成功~')
        updateTable()
      })
    },
  },
}
</script>
