<template>
  <div class="nf-main">
    <div class="nf-title">TaskManager</div>
    <a-button type="primary"
              @click="handleAdd">new task</a-button>
    <a-table class="mt20 oa"
             :loading="loading"
             :columns="tableColumns"
             :dataSource="tableList"
             :pagination="pagination"
             :rowKey="record => record.taskId">
      <span slot="roleMenu"
            slot-scope="text, record">
        <a-tag v-for="tag in record.roleMenu"
               color="blue"
               :key="tag">{{tag}}</a-tag>
      </span>
      <span slot="permissions"
            slot-scope="text, record">
        <a-tag v-for="tag in record.permissions"
               color="blue"
               :key="tag">{{tag}}</a-tag>
      </span>
      <span slot="action"
            slot-scope="text, record">
        <a href="javascript:;"
           @click="update(record.taskId)"
           class="mr10">Edit</a>
        <a-popconfirm title="Are you sure delete this item?"
                      @confirm="handleDelete(record.taskId)"
                      class="mr10"><a href="javascript:;">Delete</a>
        </a-popconfirm>
      </span>
    </a-table>
    <create ref="dialogForm"
            :visible="visible"
            :dialogForm="dialogForm"
            :title="title"
            @cancel="visible = false"
            @create="handleCreate"></create>
  </div>
</template>

<script>
import {
  addTask, deleteTask, updateTask, getTask, getTaskList,
} from '../../../api/task'
import create from './create.vue'

export default {
  data() {
    return {
      loading: true,
      pagination: {
        size: 'small',
        showQuickJumper: true,
        showSizeChanger: true,
        total: 500,
        showTotal: (total) => `共${total}条`,
      },
      tableList: [],
      tableColumns: [
        {
          title: 'title',
          dataIndex: 'title',
        },
        {
          title: 'description',
          dataIndex: 'description',
        },
        {
          title: 'date',
          dataIndex: 'date',
          // scopedSlots: { customRender: 'roleMenu' },
        },
        {
          title: 'priority',
          dataIndex: 'priority',
          // scopedSlots: { customRender: 'permissions' },
        },
        {
          title: 'action',
          dataIndex: 'action',
          // width: 150,
          scopedSlots: { customRender: 'action' },
        },
      ],
      dialogForm: {},
      visible: false,
      title: '',
    }
  },
  components: {
    create,
  },
  methods: {
    // 分页查询
    getList() {
      this.loading = true
      // console.log(this.fields)
      getTaskList().h_then(({ data }) => {
        this.tableList = data
        this.pagination.total = data.length
      }).finally(() => {
        this.loading = false
      })
    },
    // 提交按钮
    handleCreate() {
      const { form } = this.$refs.dialogForm
      form.validateFields((err, fieldsValues) => {
        if (err) {
          return
        }
        const values = {
          ...fieldsValues,
          date: fieldsValues.date.format('YYYY-MM-DD HH:mm:ss'),
        }
        if (this.title === 'edit task') {
          values.taskId = this.dialogForm.taskId
        }
        console.log('Received values of form: ', values)
        form.resetFields()
        const submit = this.title === 'new task' ? addTask : updateTask
        submit(values).h_then(({ msg }) => {
          this.$message.success(msg)
          this.getList()
          this.visible = false
        })
      })
    },
    // 新增按钮
    handleAdd() {
      this.visible = true
      this.title = 'new task'
      this.dialogForm = {
        title: '',
        description: '',
        date: null,
        priority: undefined,
      }
      const { form } = this.$refs.dialogForm
      form.resetFields()
    },
    // 删除按钮
    handleDelete(taskId) {
      deleteTask(taskId).h_then(({ msg }) => {
        this.$message.success(msg)
        this.getList()
      })
    },
    // 修改按钮
    async update(taskId) {
      await getTask(taskId).h_then(({ data }) => {
        this.dialogForm = data
        this.visible = true
        this.title = 'edit task'
      })
    },
  },
  created() {
    // 获取任务列表
    this.getList()
  },
}
</script>
