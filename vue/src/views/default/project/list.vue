<template>
  <div class="nf-main mt35 mb35">

    <div class="nf-title">ProjectManager</div>

    <div>
      <a-button type="primary"
                @click="$router.push({ name: 'ProjectManagerCreate' })">new project</a-button>
    </div>

    <a-list class="mt20 oa"
            itemLayout="vertical"
            size="large"
            :pagination="pagination"
            :dataSource="tableList">
      <!-- <div slot="footer"><b>ant design vue</b> footer part</div> -->
      <a-list-item slot="renderItem"
                   slot-scope="item"
                   key="item.title">
        <!-- <template slot="actions">
          <a href="javascript:;"
             @click="$router.push({name: 'ProjectManagerCreate', query: {projectId: item.projectId}})"
             class="mr10">Edit</a>
          <a-popconfirm title="Are you sure delete this item?"
                        @confirm="handleDelete(item.projectId)"
                        class="mr10"><a href="javascript:;">Delete</a>
          </a-popconfirm>
        </template> -->
        <!-- <template slot="actions"
                  v-for="{type, text} in actions">
          <span :key="type">
            <a-icon :type="type"
                    style="margin-right: 8px" />
            {{text}}
          </span>
        </template> -->
        <!-- <img slot="extra"
             width="272"
             alt="logo"
             :src="item.logo || 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'" /> -->
        <a-list-item-meta :description="`createTime:${timeTransfer(item.createTime)}`">
          <a slot="title"
             :href="item.link"
             target="_blank">{{item.title}}</a>
          <a-avatar slot="avatar"
                    :src="item.logo || 'https://cdn.nfeng.net.cn/upload/github.png'" />
        </a-list-item-meta>
        <!-- <nf-md-preview :data="item.content"></nf-md-preview> -->
        <!-- {{item.content}} -->
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { getProjectList, deleteProject } from '../../../api/project'
// import { timeTransfer } from '../../../nfeng-utils/filter'

export default {
  data() {
    return {
      loading: true,
      pagination: {
        onChange: (page) => {
          console.log(page)
        },
        pageSize: 10,
        size: 'small',
        showQuickJumper: true,
        // showSizeChanger: true,
        total: 500,
        showTotal: (total) => `Total ${total} items`,
      },
      tableList: [],
      // actions: [
      //   { type: 'star-o', text: '156' },
      //   { type: 'like-o', text: '156' },
      //   { type: 'message', text: '2' },
      // ],
    }
  },
  methods: {
    // timeTransfer,
    // 分页查询
    getList() {
      this.loading = true
      // console.log(this.fields)
      getProjectList().h_then(({ data }) => {
        this.tableList = data
        this.pagination.total = data.length
      }).finally(() => {
        this.loading = false
      })
    },
    // 删除按钮
    handleDelete(taskId) {
      deleteProject(taskId).h_then(({ msg }) => {
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

<style lang="scss" scoped>
// .ant-avatar > img {
//   height: auto;
// }
</style>
