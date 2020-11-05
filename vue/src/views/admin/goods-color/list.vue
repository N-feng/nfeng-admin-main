<template>
  <div>
    <router-link to="/admin/goodsColor/create">
      <a-button type="primary" class="mb20">创建商品颜色</a-button>
    </router-link>
    <nf-table
      remoteUrl="/api/goods-color/findAll"
      :tableColumns="tableColumns"
      @row-update="rowUpdate"
      @row-del="rowDel"
    ></nf-table>
  </div>
</template>

<script>
import { format } from 'silly-datetime'

export default {
  data() {
    return {
      // 表格配置
      tableColumns: [
        {
          title: '颜色',
          dataIndex: 'colorName',
        },
        {
          title: '创建时间',
          dataIndex: 'createAt',
          customRender: (text) => format(text),
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
        path: '/admin/goodsColor/create',
        query: {
          id: form._id,
        },
      })
    },
    rowDel(form, updateTable) {
      this.$post('/api/goods-color/delete', { id: form._id }).then(() => {
        this.$message.success('删除成功~')
        updateTable()
      })
    },
  },
}
</script>
