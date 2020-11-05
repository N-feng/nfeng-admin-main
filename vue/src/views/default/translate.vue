<template>
  <div class="main">
    <div class="content">
      <a-textarea placeholder="转换前" :auto-size="{ minRows: 3, maxRows: 10 }" v-model="value" />
    </div>
  </div>
</template>

<script>
import { formSchema } from '@/pageConfig/userCreate'

export default {
  data() {
    return {
      value: '',
    }
  },
  methods: {
    translate(val) {
      let newObj
      if (val) {
        newObj = JSON.parse(val)
        Object.keys(newObj.properties).forEach((item) => {
          const properties = newObj.properties[item]
          const nObj = {
            ...properties,
            ...properties.ui,
          }
          delete nObj.ui
          nObj.widget = nObj.widget.replace('nf-', '')
          if (nObj.rules) nObj.rules = [nObj.rules]
          newObj.properties[item] = nObj
        })
        delete newObj.type
        delete newObj.ui
        newObj.globalConfig = {
          formCls: newObj.globalConfig.style.formCls,
        }
      }
      return JSON.stringify(newObj)
    },
  },
  created() {
    this.value = this.translate(JSON.stringify(formSchema))
  },
}
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  padding: 20px;
}
.content {
  background: white;
  padding: 20px;
}
</style>
