<template>
  <div>
    <a-form :form="form" class="nf-form" @submit="handleSubmit">
      <a-form-item
        label="商品类型"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-select
          v-decorator="[
            'goodsTypeId',
            { rules: [{ required: true, message: '请选择商品类型' }] },
          ]"
          placeholder="请选择商品类型"
          @change="handleSelectChange"
        >
          <a-select-option
            v-for="(item, key) in options"
            :key="key"
            :value="item.value"
          >{{item.label}}</a-select-option>
        </a-select>
      </a-form-item>
      <div v-for="(item, key) in formList" :key="key">
        <a-form-item
          :style="{ width: 0, height: 0, margin: 0 }"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input type="hidden" v-decorator="[`attrIdList[${key}]`, { initialValue: item._id }]"></a-input>
        </a-form-item>
        <a-form-item
          :label="item.title"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[`attrValueList[${key}]`, { rules: [{ required: true, message: `请输入${item.title}` }] }]"
            v-if="item.attrType === '1'"
          />
        </a-form-item>
      </div>
      <a-form-item>
        <div style="text-align: center;">
          <a-button html-type="submit">提交</a-button>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
      formValue: {},
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
      options: [],
      formList: [],
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          if (this.$route.query.id) {
            this.$post('/api/goods/update', {
              ...this.$data.formValue,
              ...values,
              id: this.$route.query.id,
            }).then(() => {
              this.$message.success('更新成功!')
            })
          } else {
            this.$post('/api/goods/create', {
              ...this.$data.formValue,
              ...values,
            }).then(() => {
              this.$message.success('创建成功!')
            })
          }
        }
      })
    },
    handleSelectChange(value) {
      return this.$post('/api/goods-type-attribute/findAll', {
        id: value,
        pageSize: 10,
      }).then(({ data }) => {
        this.formList = data.list
        this.form.resetFields()
        this.form.setFieldsValue({ goodsTypeId: value })
      })
    },
  },
  created() {
    if (this.$route.query.id) {
      this.$post('/api/goods/findOne', { id: this.$route.query.id }).then(({ data }) => {
        this.formValue = data
        const { goodsTypeId } = data
        // 有商品类型的时候
        if (goodsTypeId) {
          this.handleSelectChange(goodsTypeId).then(() => {
            this.$post('/api/goods-attr/findAll', {
              id: this.$route.query.id,
            }).then((res) => {
              const obj = {}

              res.data.list.forEach((item, key) => {
                obj[`attrValueList[${key}]`] = item.attributeValue
              })
              this.form.setFieldsValue(obj)
            })
          })
        }
      })
    }
    this.$get('/api/enum/findGoodsType').then(({ data }) => {
      this.options = data.list
    })
  },
}
</script>
