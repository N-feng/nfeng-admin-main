<template>
  <div>
    <router-link to="/admin/goods/create">
      <a-button type="primary" class="mb20">创建商品</a-button>
    </router-link>
    <nf-table
      remoteUrl="/api/goods/findAll"
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
          title: '商品名称',
          dataIndex: 'title',
        },
        {
          title: '价格',
          dataIndex: 'marketPrice',
        },
        {
          title: '点击量',
          dataIndex: 'clickCount',
        },
        {
          title: '上架',
          dataIndex: 'state',
        },
        {
          title: '精品',
          dataIndex: 'isBest',
        },
        {
          title: '新品',
          dataIndex: 'isLatest',
        },
        {
          title: '热销',
          dataIndex: 'isHot',
        },
        {
          title: '推荐排序',
          dataIndex: 'sort',
        },
        {
          title: '库存',
          dataIndex: 'goodsNumber',
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
        path: '/admin/goods/create',
        query: {
          id: form._id,
        },
      })
    },
    rowDel(form, updateTable) {
      this.$post('/api/goods/delete', { id: form._id }).then(() => {
        this.$message.success('删除成功~')
        updateTable()
      })
    },
  },
}
</script>
