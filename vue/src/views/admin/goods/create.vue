<template>
  <div>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="通用信息">
        <part1></part1>
      </a-tab-pane>
      <a-tab-pane key="2" tab="详细描述">
        <part2></part2>
      </a-tab-pane>
      <a-tab-pane key="3" tab="商品属性">
        <part3></part3>
      </a-tab-pane>
      <a-tab-pane key="4" tab="规格与包装">
        <part4></part4>
      </a-tab-pane>
      <a-tab-pane key="5" tab="商品相册"></a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import part1 from './component/part1.vue'
import part2 from './component/part2.vue'
import part3 from './component/part3.vue'
import part4 from './component/part4.vue'

export default {
  components: {
    part1,
    part2,
    part3,
    part4,
  },
}
</script>
