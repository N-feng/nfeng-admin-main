<template>
  <div>
    <router-link to="/admin/goodsCate/create">
      <a-button type="primary" class="mb20">创建商品分类</a-button>
    </router-link>
    <nf-table
      remoteUrl="/api/goods-cate/findAll"
      :tableColumns="tableColumns"
      @row-update="rowUpdate"
      @row-del="rowDel"
    >
    </nf-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表格配置
      tableColumns: [
        {
          title: '分类名称',
          dataIndex: 'title',
        },
        {
          title: '分类图片',
          dataIndex: 'cateImg',
          scopedSlots: { customRender: 'img' },
        },
        {
          title: '排序',
          dataIndex: 'sort',
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
        path: '/admin/goodsCate/create',
        query: {
          id: form._id,
        },
      })
    },
    rowDel(form, updateTable) {
      this.$post('/api/goods-cate/delete', { id: form._id }).then(() => {
        this.$message.success('删除成功~')
        updateTable()
      })
    },
  },
}
</script>
