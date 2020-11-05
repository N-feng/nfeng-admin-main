<template>
  <div>
    <a-checkbox-group v-model="checkedList" class="nf-form">
      <div v-for="(item, key) in plainOptions" :key="key" class="mb30">
        <div class="mb10 pb10" :style="{ borderBottom: '1px solid #E9E9E9' }">
          <a-checkbox :value="item._id">{{item.actionName}}</a-checkbox>
        </div>
        <a-checkbox v-for="(el, i) in item.children" :key="i" :value="el._id" style="margin: 0 16px 16px 0;">{{el.actionName}}</a-checkbox>
      </div>
    </a-checkbox-group>
    <div style="text-align: center">
      <a-button @click="submit()">提交</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkedList: [],
      plainOptions: [],
    }
  },
  methods: {
    submit() {
      const { id } = this.$route.query
      this.$post('/api/role-access/update', { roleId: id, accessNode: this.checkedList }).then(() => {
        this.$message.success('授权成功~')
      })
    },
  },
  created() {
    this.$post('/api/access/findAll').then(({ data }) => {
      const { list } = data
      this.plainOptions = list
    })
    if (this.$route.query.id) {
      this.$post('/api/role-access/findOne', { id: this.$route.query.id }).then(({ data }) => {
        const { list } = data
        this.checkedList = list.map((item) => item.accessId)
      })
    }
  },
}
</script>
