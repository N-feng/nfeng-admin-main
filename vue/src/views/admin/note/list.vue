<template>
  <div class="nf-main">

    <div class="nf-title">NoteManager</div>

    <div>
      <a-button type="primary"
                @click="$router.push({ name: 'NoteManagerCreate' })">new note</a-button>
    </div>

    <a-table class="mt20 oa"
             :loading="loading"
             :columns="tableColumns"
             :dataSource="tableList"
             :pagination="pagination"
             :rowKey="record => record.noteId"
             @change="handleTableChange">
      <span slot="createTime"
            slot-scope="text, record">{{record.createTime | timeTransfer}}</span>
      <span slot="updateTime"
            slot-scope="text, record">{{record.updateTime | timeTransfer}}</span>
      <span slot="action"
            slot-scope="text, record">
        <a href="javascript:;"
           @click="$router.push({name: 'NoteManagerCreate', query: {noteId: record.noteId}})"
           class="mr10">Edit</a>
        <a-popconfirm title="Are you sure delete this item?"
                      @confirm="handleDelete(record.noteId)"
                      class="mr10"><a href="javascript:;">Delete</a>
        </a-popconfirm>
        <a href="javascript:;"
           @click="$router.push({name: 'NoteManagerPreview', query: {noteId: record.noteId}})"
           class="mr10">Preview</a>
      </span>
    </a-table>

  </div>
</template>

<script>
import { getNoteList, deleteNote } from '../../../api/note'

export default {
  data() {
    return {
      loading: true,
      pagination: {
        size: 'small',
        showQuickJumper: true,
        showSizeChanger: true,
        total: 500,
        showTotal: (total) => `Total ${total} items`,
      },
      tableList: [],
      tableColumns: [
        {
          title: 'title',
          dataIndex: 'title',
        },
        // {
        //   title: '笔记内容',
        //   dataIndex: 'content',
        // },
        {
          title: 'createTime',
          dataIndex: 'createTime',
          scopedSlots: { customRender: 'createTime' },
        },
        {
          title: 'updateTime',
          dataIndex: 'updateTime',
          scopedSlots: { customRender: 'updateTime' },
        },
        {
          title: 'action',
          dataIndex: 'action',
          // width: 150,
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  methods: {
    // 分页查询
    getList() {
      this.loading = true
      // console.log(this.fields)
      getNoteList().h_then(({ data }) => {
        this.tableList = data
        this.pagination.total = data.length
      }).finally(() => {
        this.loading = false
      })
    },
    // 分页
    handleTableChange(pagination) {
      console.log(pagination)
      // this.fields.page = pagination.current
      // this.fields.pageSize = pagination.pageSize
      // this.getCustomerList()
    },
    // 删除按钮
    handleDelete(taskId) {
      deleteNote(taskId).h_then(({ msg }) => {
        this.$message.success(msg)
        this.getList()
      })
    },
  },
  created() {
    // 获取列表
    this.getList()
  },
}
</script>
