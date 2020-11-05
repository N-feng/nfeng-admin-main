<template>
  <div>
    <nf-table
      remoteUrl="/api/access/findAll"
      :remoteField="remoteField"
      :tableColumns="tableColumns"
      @row-update="rowUpdate"
      @row-del="rowDel"
    ></nf-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      remoteField: {
        pageNo: 1,
        pageSize: 10,
      },
      typeName: {
        1: '模块',
        2: '菜单',
        3: '操作',
      },
      // 表格配置
      tableColumns: [
        {
          title: '模块名称',
          dataIndex: 'moduleName',
        },
        {
          title: '节点类型',
          dataIndex: 'type',
          customRender: (text) => this.typeName[text],
        },
        {
          title: '操作名称',
          dataIndex: 'actionName',
        },
        {
          title: '操作地址',
          dataIndex: 'url',
        },
        {
          title: '排序',
          dataIndex: 'sort',
        },
        {
          title: '描述',
          dataIndex: 'description',
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
        path: '/admin/access/create',
        query: {
          id: form._id,
        },
      })
    },
    rowDel(form, updateTable) {
      this.$post('/api/access/delete', { id: form._id }).then(() => {
        this.$message.success('删除成功~')
        updateTable()
      })
    },
  },
}
</script>
