<template>
  <!-- 预览图片 -->
  <div class="img-preview"
       :class="{active:imgPreviewModal}"
       @click="imgPreviewModal = false">
    <span class="close"
          @click="imgPreviewModal = false">关闭</span>
    <img :class="[imgPreviewMode]"
         :src="imgPreviewSrc"
         @click="hide">
  </div>
</template>

<script>
export default {
  name: 'nfImgPreview',
  data() {
    return {
      imgPreviewModal: false,
      imgPreviewSrc: '',
      imgPreviewMode: '',
    }
  },
  methods: {
    show(src) { // 预览图片
      const img = new Image()
      img.src = src
      img.onload = () => {
        const width = img.naturalWidth
        const height = img.naturalHeight
        if ((height / width) > 1.4) {
          this.imgPreviewMode = 'horizontal'
        } else {
          this.imgPreviewMode = 'vertical'
        }
        this.imgPreviewSrc = src
        this.imgPreviewModal = true
      }
    },
    hide(event) {
      event.stopPropagation()
    },
  },
}
</script>

<style lang="scss" scoped>
.img-preview {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  opacity: 0;
  transition: opacity 0.3s 0.1s;
  justify-content: center;
  align-items: center;
  &.active {
    display: flex;
    opacity: 1;
  }

  .close {
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
    padding: 10px;
    font-size: 12px;
    cursor: pointer;
  }

  img {
    display: block;
    &.vertical {
      height: 80%;
      width: auto;
    }
    &.horizontal {
      width: 80%;
      height: auto;
    }
  }
}
</style>
