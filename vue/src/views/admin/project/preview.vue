<template>
  <div>
    <div class="nf-main mt35">
      <!-- <div class="nf-title">{{createForm.title}}</div> -->
      <nf-md-preview :data="createForm.content"></nf-md-preview>
    </div>
    <div class="nf-bottom-fixed">
      <a-button class="ml10"
                @click="$router.push({name: 'ProjectManager'})">cancel</a-button>
    </div>
  </div>
</template>

<script>
import { getProject } from '../../../api/project'

export default {
  data() {
    return {
      createForm: {
        projectId: '',
        title: '',
        content: '',
      },
    }
  },
  methods: {
    getDetail() {
      getProject(this.createForm.projectId).h_then(({ data }) => {
        Object.assign(this.createForm, data)
      })
    },
  },
  created() {
    this.createForm.projectId = this.$route.query.projectId
    if (this.createForm.projectId) {
      this.getDetail()
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
