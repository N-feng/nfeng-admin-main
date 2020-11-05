<template>
  <div>
    <div class="nf-main mt35">
      <!-- <div class="nf-title">{{createForm.title}}</div> -->
      <nf-md-preview :data="createForm.content"></nf-md-preview>
    </div>
    <div class="nf-bottom-fixed">
      <a-button class="ml10"
                @click="$router.push({name: 'webNote'})">cancel</a-button>
    </div>
  </div>
</template>

<script>
import { getNote } from '../../../api/note'

export default {
  data() {
    return {
      createForm: {
        noteId: '',
        title: '',
        content: '',
      },
    }
  },
  methods: {
    getDetail() {
      getNote(this.createForm.noteId).h_then(({ data }) => {
        Object.assign(this.createForm, data)
      })
    },
  },
  created() {
    this.createForm.noteId = this.$route.query.noteId
    if (this.createForm.noteId) {
      this.getDetail()
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
