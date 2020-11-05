<template>
  <div>
    <ncform
      :form-schema="formSchema"
      form-name="your-form-name"
      v-model="formSchema.value"
      @submit="submit()"
    ></ncform>
    <div style="text-align: center">
      <a-button @click="submit()">提交</a-button>
    </div>
  </div>
</template>
<script>
import { formSchema } from '@/pageConfig/userCreate'

export default {
  data() {
    return {
      formSchema,
    }
  },
  methods: {
    submit() {
      this.$ncformValidate('your-form-name').then((data) => {
        if (data.result) {
          if (this.$route.query.id) {
            this.$post('/api/user/update', { id: this.$route.query.id, ...this.$data.formSchema.value }).then(() => {
              this.$message.success('更新成功!')
            })
          } else {
            this.$post('/api/user/create', { ...this.$data.formSchema.value }).then(() => {
              this.$message.success('创建成功!')
            })
          }
        }
      })
    },
  },
  created() {
    if (this.$route.query.id) {
      this.$get('/api/user/findOne', { id: this.$route.query.id }).then(({ data }) => {
        this.formSchema.value = data
      })
    }
  },
}
</script>
