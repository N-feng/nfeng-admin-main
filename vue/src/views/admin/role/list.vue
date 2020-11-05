<template>
  <div>
    <nf-table
      :form-schema="formSchema"
      remoteUrl="/api/role/findAll"
      :tableColumns="tableColumns"
      @row-update="rowUpdate"
    >
      <template slot="tableAction" slot-scope="form">
        <a
          href="javascript:;"
          @click="$router.push({path: '/admin/role-access/create', query: {id: form._id}})"
        >授权</a>
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
      // 表单配置
      formSchema: {
        type: 'object',
        properties: {
          title: {
            ui: {
              label: '角色名称',
              widget: 'nf-input',
            },
          },
          description: {
            ui: {
              label: '角色描述',
              widget: 'nf-input',
            },
          },
        },
        globalConfig: {
          style: {
            formCls: 'nf-search-form',
          },
        },
      },
      // 表格配置
      tableColumns: [
        {
          title: '角色名称',
          dataIndex: 'title',
        },
        {
          title: '角色描述',
          dataIndex: 'description',
        },
        {
          title: '增加时间',
          dataIndex: 'add_time',
          customRender: (text) => format(text),
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
        path: '/admin/role/create',
        query: {
          id: form._id,
        },
      })
    },
  },
}
</script>
