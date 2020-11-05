<template>
  <a-modal width="558px"
           :visible="visible"
           :title="title"
           @cancel="() => { $emit('cancel') }"
           @ok="() => { $emit('create') }">
    <a-form :form="form">
      <a-form-item v-bind="formItemLayout"
                   label="title">
        <a-input v-decorator="['title', formConfig.title]"
                 placeholder="Please input title"></a-input>
      </a-form-item>
      <a-form-item v-bind="formItemLayout"
                   label="description">
        <a-textarea v-decorator="['description', formConfig.description]"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    placeholder="Please input description" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout"
                   label="date">
        <a-date-picker v-decorator="['date', formConfig.date]"
                       show-time
                       format="YYYY-MM-DD HH:mm:ss" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout"
                   label="priority">
        <a-select v-decorator="['priority', formConfig.priority]"
                  placeholder="Please select priority">
          <a-select-option v-for="item in priorityList"
                           :key="item.value"
                           :value="item.value">{{item.value}}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import moment from 'moment'
import router from '../../../router'

export default {
  props: {
    visible: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    dialogForm: {
      type: Object,
    },
  },
  computed: {
    menuList() {
      const arr = []
      router.options.routes.forEach((item) => {
        arr.push(item.meta.title)
        if (item.children) {
          item.children.forEach((item2) => {
            arr.push(item2.meta.title)
          })
        }
      })
      return arr
    },
    globalList() {
      return this.$store.getters.globalList
    },
    formConfig() {
      return {
        title: {
          rules: [{ required: true, message: 'Please input title' }],
          initialValue: this.dialogForm.title,
        },
        description: {
          rules: [{ required: true, message: 'Please input description' }],
          initialValue: this.dialogForm.description,
        },
        date: {
          rules: [{ type: 'object', required: true, message: 'Please select date' }],
          initialValue: this.dialogForm.date ? this.moment(this.dialogForm.date, this.timeFormat) : null,
        },
        priority: {
          rules: [{ required: true, message: 'Please select priority' }],
          initialValue: this.dialogForm.priority,
        },
      }
    },
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 },
      },
      priorityList: [
        { name: '低', value: 'Low' },
        { name: '中', value: 'Normal' },
        { name: '高', value: 'High' },
      ],
      timeFormat: 'YYYY-MM-DD HH:mm:ss',
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  methods: {
    moment,
  },
}
</script>
