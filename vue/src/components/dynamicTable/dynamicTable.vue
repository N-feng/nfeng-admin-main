<template>
  <div>
    <nf-search-form
      v-if="showFormSearch"
      :fieldOptions="fieldOptions"
      :exportBtn="exportBtn"
      :disabled="tableList.length === 0"
      @submit="(values) => { $emit('searchSubmit', values), getList() }"
      @export="$emit('export')"
    ></nf-search-form>
    <div class="nf-dynamic-table">
      <a-tabs
        class="tabs-noborder"
        :defaultActiveKey="tabPanes.legnth ? tabPanes[0].key : ''"
        @change="(key) => { $emit('tabChange', key), getList() }"
      >
        <a-tab-pane
          v-for="pane in tabPanes"
          :tab="pane.title"
          :key="pane.key"
          :closable="pane.closable"
        ></a-tab-pane>
        <template slot="tabBarExtraContent">
          <slot name="tabBarExtraContent"></slot>
        </template>
      </a-tabs>
      <a-table
        :columns="tableColumns"
        :dataSource="tableList"
        :loading="loading"
        :pagination="pagination"
        :rowKey="record => record.rowKey"
        @change="tableChange"
      >
        <span slot="action" slot-scope="text, record">
          <router-link
            class="mr10"
            :to="item.url"
            v-for="item in actions"
            :key="item.url"
          >{{item.name}}</router-link>
          <a href="javascript:;" @click="updateRole(record)" class="mr10">修改</a>
          <a-popconfirm
            title="Are you sure delete this item?"
            @confirm="handleDelete(record)"
            class="mr10"
          >
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import NfSearchForm from '../searchForm'

export default {
  components: { NfSearchForm },
  props: {
    showFormSearch: {
      type: Boolean,
      default: false,
    },
    fieldOptions: {
      type: Array,
      default() {
        return []
      },
    },
    tabPanes: {
      type: Array,
      default() {
        return []
      },
    },
    queryFields: {
      type: Object,
    },
    queryUrl: {
      type: String,
    },
    tableColumns: {
      type: Array,
      default() {
        return []
      },
    },
    actions: {
      type: Array,
      default() {
        return []
      },
    },
    exportBtn: {
      type: Boolean,
    },
  },
  data() {
    return {
      // 表格分页的配置
      pagination: {
        size: 'small',
        showQuickJumper: true,
        showSizeChanger: true,
        pageSize: 10,
        total: 0,
        showTotal: (total) => `共 ${total} 条`,
      },
      // 表格数据
      tableList: [],
      loading: true,
    }
  },
  methods: {
    // 查询
    getList() {
      this.loading = true
      this.$get(this.queryUrl, this.queryFields).then(({ list, total }) => {
        this.tableList = list.map((item, key) => {
          item.rowKey = key
          return item
        })
        this.pagination.total = total || 0
        this.loading = false
      })
    },
    // 分页
    tableChange(pagination) {
      this.queryFields.page = pagination.current
      this.queryFields.pageSize = pagination.pageSize
      this.getList()
    },
  },
  mounted() {
    this.getList()
  },
}
</script>

<style lang="scss" scoped>
.nf-list {
  background-color: white;
  padding: 20px;
  position: relative;
  z-index: 1;
}
</style>
