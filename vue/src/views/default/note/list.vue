<template>
  <div class="nf-main mt35 mb35">
    <div class="nf-title">{{$route.meta.title}}</div>
    <a-table class="mt20 oa"
             :loading="loading"
             :columns="tableColumns"
             :dataSource="tableList"
             :pagination="pagination"
             :rowKey="record => record.noteId">
      <span slot="createTime"
            slot-scope="text, record">{{record.createTime | timeTransfer}}</span>
      <span slot="updateTime"
            slot-scope="text, record">{{record.updateTime | timeTransfer}}</span>
      <span slot="action"
            slot-scope="text, record">
        <a href="javascript:;"
           @click="$router.push({name: 'webNotePreview', query: {noteId: record.noteId}})"
           class="mr10">Preview</a>
      </span>
    </a-table>
  </div>
</template>

<script>
import { getNoteList } from '../../../api/note'

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
      getNoteList()
        .h_then(({ data }) => {
          this.tableList = data
          this.pagination.total = data.length
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
  created() {
    // 获取任务列表
    this.getList()
  },
}
</script>

<style lang="css" scoped>
</style>
