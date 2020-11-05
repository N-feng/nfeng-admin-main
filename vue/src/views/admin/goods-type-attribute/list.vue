<template>
  <div>
    <router-link :to="{ path: '/admin/goodsTypeAttribute/create', query: { cateId: $route.query.id } }">
      <a-button type="primary" class="mb20">创建商品类型属性</a-button>
    </router-link>
    <nf-table
      remoteUrl="/api/goods-type-attribute/findAll"
      :otherParams="{id: $route.query.id}"
      :tableColumns="tableColumns"
      @row-update="rowUpdate"
      @row-del="rowDel"
    >
    </nf-table>
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
          title: '属性名称',
          dataIndex: 'title',
        },
        {
          title: '商品类型',
          dataIndex: 'cateName',
        },
        {
          title: '属性值的录入方式',
          dataIndex: 'attrType',
        },
        {
          title: '可选值列表',
          dataIndex: 'attrValue',
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
        path: '/admin/goods-type/create',
        query: {
          id: form._id,
        },
      })
    },
    rowDel(form, updateTable) {
      this.$post('/api/goods-type/delete', { id: form._id }).then(() => {
        this.$message.success('删除成功~')
        updateTable()
      })
    },
  },
}
</script>
