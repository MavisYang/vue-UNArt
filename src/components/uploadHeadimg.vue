<template>
  <div>
    <div class="uploadHeadimg">
      <input type="file" class="fileInput" ref='fileInput' accept="image/jpg,image/JPG,image/gif,image/png" @change='handleChange' />
      <img class="fileImg" :src="fileImg_url || 'static/img/1.png'" />
    </div>
  </div>
</template>
<script>
import { uploadSingleImg } from '@/utils/index.js'
import userInfoApi from '../API/my'
export default {
  props: ['avatar'],
  data() {
    return {
      fileImg_url: this.avatar
    }
  },
  watch: {
    fileImg_url(val, oldval) {
      if (val === 'static/img/1.png' || val === JSON.parse(sessionStorage.userInfo).avatar) return false
      if (val !== oldval) {
        let _this = this
        userInfoApi.updateUse({
          data: {
            avatar: _this.fileImg_url
          },
          success(res) {
            _this.$vux.loading.hide()
            sessionStorage.setItem('userInfo', JSON.stringify(res.data))
          },
          error(res) {
            _this.$vux.loading.hide()
            console.log(res.msg)
          }
        })
      }
    }
  },
  created() {
  },
  methods: {
    handleChange(e) {
      this.$vux.loading.show()
      let fileObj = e.target.files[0]
      uploadSingleImg(fileObj, this, 'fileImg_url')
    }
  }
}
</script>
<style lang='less' scoped>
@color: #ccc;
.uploadHeadimg {
  background: url('/static/img/1.png') no-repeat;
  background-size: cover;
  position: relative;
  width: 50px;
  height: 50px;
  align-items: center;
  border-radius: 100%;
  border: 1px solid @color;
}

.fa {
  color: @color;
}

.fileInput {
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 10;
}

.fileImg {
  top:0;
  left:0;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  z-index: 9;
}
</style>
<style type="text/css">

</style>
