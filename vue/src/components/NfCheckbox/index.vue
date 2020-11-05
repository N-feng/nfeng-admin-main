<template>
  <a-form-item v-bind="formItemLayout"
               :label="label">
    <a-checkbox :indeterminate="indeterminate"
                @change="onCheckAllChange"
                :checked="checkAll">Check all</a-checkbox>
    <a-checkbox-group v-decorator="[field, formConfig]"
                      :options="plainOptions"
                      @change="onChange">
    </a-checkbox-group>
  </a-form-item>
</template>

<script>
export default {
  name: 'NfCheckbox',
  data() {
    return {
      indeterminate: false,
      checkAll: false,
    }
  },
  watch: {
    formConfig(val) {
      this.onChange(val.initialValue)
    },
  },
  props: {
    form: {
      type: Object,
    },
    formItemLayout: {
      type: Object,
    },
    label: {
      type: String,
    },
    field: {
      type: String,
    },
    plainOptions: {
      type: Array,
    },
    formConfig: {
      type: Object,
    },
  },
  methods: {
    onChange(checkedList) {
      this.indeterminate = !!checkedList.length && (checkedList.length < this.plainOptions.length)
      this.checkAll = checkedList.length === this.plainOptions.length
      this.$forceUpdate()
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        // checkedList: e.target.checked ? this.plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked,
      })
      const obj = {}
      obj[this.field] = e.target.checked ? this.plainOptions : []
      this.form.setFieldsValue(obj)
    },
  },
  created() {
    this.onChange(this.formConfig.initialValue)
  },
}
</script>
