<template>
  <div class="nf-main">

    <div class="nf-title">ImgManager</div>

    <nf-masonry :imgList="tableList"
                @handleDelete="handleDelete"></nf-masonry>

    <!-- <a-upload accept="image/*"
              listType="picture-card"
              :fileList="fileList"
              :customRequest="customRequest"
              :remove="handleRemove"
              @preview="handlePreview">
      <div>
        <a-icon type="plus" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload> -->

    <a-modal :visible="previewVisible"
             :footer="null"
             @cancel="previewVisible = false">
      <img alt="example"
           style="width: 100%"
           :src="previewImage" />
    </a-modal>

    <!-- <a-list class="mt20"
            :dataSource="fileList">
      <a-list-item slot="renderItem"
                   slot-scope="item">
        <input class="hide-input"
               :value="item.url"
               :id="item.url">
        <a slot="actions"
           @click="copyText(item.url)">Copy</a>
        <a slot="actions"
           @click="$refs.viewImg.previewImage(item.url)">Preview</a>
        <a slot="actions"
           :href="`/api/img/get?fileName=${item.name}`"
           target="_blank">Download</a>
        <a-popconfirm slot="actions"
                      title="Are you sure delete this item?"
                      @confirm="handleDelete(item.name)"
                      class="mr10"><a href="javascript:;">Delete</a>
        </a-popconfirm>
        <a-list-item-meta>
          <a slot="title"
             :href="item.url"
             target="_blank">{{item.name}}</a>
          <a-avatar slot="avatar"
                    :src="item.url" />
        </a-list-item-meta>
      </a-list-item>
    </a-list> -->

    <!-- <NfImgView ref="viewImg"></NfImgView> -->

  </div>
</template>

<script>
import {
  addImg, deleteImg, getImgList,
} from '../../../api/img'

export default {
  name: 'NfImgList',
  computed: {
    fileList: {
      get() {
        return this.tableList.map((item) => {
          item.uid = item.name
          return item
        })
      },
    },
  },
  data() {
    return {
      tableList: [],
      previewVisible: false,
      previewImage: '',
    }
  },
  methods: {
    getList() {
      getImgList().h_then(({ data }) => {
        this.tableList = data
      })
    },
    customRequest(e) {
      addImg(e).h_then(({ msg }) => {
        this.$message.success(msg)
        this.getList()
      })
    },
    handleDelete(el) {
      const { imgId } = el
      deleteImg({ imgId }).h_then(({ msg }) => {
        this.$message.success(msg)
        this.getList()
      })
    },
    copyText(url) {
      const input = document.getElementById(url)
      input.select()
      try {
        document.execCommand('copy') // 执行浏览器复制命令
        this.$message.success('copy success')
      } catch (e) {
        this.$message.error('copy fail')
      }
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
      console.log(this.previewImage)
    },
    handleRemove(file) {
      console.log(file)
      const self = this
      this.$confirm({
        title: `Do you want to delete these items:${file.name}?`,
        // content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk() {
          self.handleDelete(file.name)
        },
        onCancel() {},
      })
    },
  },
  created() {
    this.getList()
  },
}
</script>

<style lang="scss" scoped>
.hide-input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: -10;
}
</style>
