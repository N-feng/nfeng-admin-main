<template>
  <div>
    <router-link to="/admin/goodsType/create">
      <a-button type="primary" class="mb20">创建商品类型</a-button>
    </router-link>
    <nf-table
      remoteUrl="/api/goods-type/findAll"
      :tableColumns="tableColumns"
      @row-update="rowUpdate"
      @row-del="rowDel"
    >
      <template slot="tableAction" slot-scope="form">
        <a
          href="javascript:;"
          @click="$router.push({path: '/admin/goodsTypeAttribute/list', query: {id: form._id}})"
        >属性列表</a>
        <a-divider type="vertical"/>
      </template>
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
          title: '商品类型名称',
          dataIndex: 'title',
        },
        {
          title: '描述',
          dataIndex: 'description',
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
