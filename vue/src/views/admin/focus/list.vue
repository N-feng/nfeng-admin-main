<template>
  <nf-table remoteUrl="/api/focus/findAll" :tableColumns="tableColumns"
      @row-update="rowUpdate" @row-del="rowDel"></nf-table>
</template>

<script>

export default {
  data() {
    return {
      tableColumns: [
        {
          title: '名称',
          dataIndex: 'title',
        },
        {
          title: '分类',
          dataIndex: 'type',
        },
        {
          title: '图片',
          dataIndex: 'focusImg',
          scopedSlots: { customRender: 'img' },
        },
        {
          title: '跳转地址',
          dataIndex: 'link',
        },
        {
          title: '状态',
          dataIndex: 'status',
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
        path: '/admin/focus/create',
        query: {
          id: form._id,
        },
      })
    },
    rowDel(form, updateTable) {
      this.$get('/api/focus/remove', { id: form._id }).then(() => {
        this.$message.success('删除成功~')
        updateTable()
      })
    },
  },
}
</script>
