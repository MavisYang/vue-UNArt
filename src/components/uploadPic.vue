<template>
  <div class="uploadPic">
    <div id="uploadPro" v-if="uploadType === 'img'" key='img'>
      <div class="uploadFile" id="uploadFile">
        <input id="file-input" class="uploaderInput" type="file" accept="image/png,image/jpeg,image/jpg" multiple @change="uploadImg" @click="clear">
      </div>
    </div>
    <div id="uploadvid" v-else key='video'>
      <div class="uploadVideo" id="uploadVideo">
        <input id="video-input" class="uploaderInput" type="file" accept="video/*" @change="uploadVideo" @click="clear">
      </div>
    </div>
    <x-dialog v-model="show" class="dialog-demo" :hide-on-blur="true">
       <div class="shado" @click="show=false">
        <img class="img" :src="url"/>
      </div>
      </x-dialog>
  </div>
</template>

<script>
import { XDialog, md5 } from 'vux'
import { uploadSingleImg } from '../utils/index'
export default {
  props: ['uploadType', 'alreadyPic'],
  components: {
    XDialog
  },
  data() {
    return {
      picNum: 0,
      videoNum: 0,
      imgArr: [],
      delID: '',
      show: false,
      url: ''
    }
  },
  created() {},
  watch: {
    alreadyPic(v) {
      this.$nextTick(() => {
        v.length && this.alreadyPicFun()
      })
    },
    uploadType() {
      this.picNum = 0
      this.videoNum = 0
    }
  },
  methods: {
    clear(e) {
      e.target.value = ''
    },
    alreadyPicFun() {
      let _this = this
      if (this.uploadType === 'img') {
        let uploadFile = document.getElementById('uploadFile')
        this.alreadyPic.forEach((item, index) => {
          let url = item.pic_url ? item.pic_url : item
          this.updateImgArr(url)
          let img = document.createElement('img')
          img.src = url
          let div = document.createElement('div')
          div.className = 'chooseImg'
          let i = document.createElement('i')
          i.className = 'fa fa-close'
          i.id = item.id
          i.addEventListener('click', e => {
            this.delPic(e, 'img')
          })
          img.addEventListener('click', e => {
            this.imgZoom(e)
          })
          div.appendChild(i)
          div.appendChild(img)
          uploadFile.parentNode.insertBefore(div, uploadFile)
          this.picNum++
          this.disFun('img')
        })
      } else {
        let uploadVideo = document.getElementById('uploadVideo')
        let img = document.createElement('img')
        img.src = this.alreadyPic[0].pic_url
        this.updateImgArr(this.alreadyPic[0].video)
        let div = document.createElement('div')
        div.className = 'chooseVideo'
        let i = document.createElement('i')
        i.className = 'fa fa-close'
        i.addEventListener('click', e => {
          _this.delPic(e, 'video')
        })
        div.appendChild(i)
        div.appendChild(img)
        uploadVideo.parentNode.insertBefore(div, uploadVideo)
        _this.videoNum++
        _this.disFun('video')
      }
    },
    uploadImg(item) {
      let _this = this
      let uploadFile = document.getElementById('uploadFile')
      let file = item.target.files
      if (window.FileReader) {
        for (let key in file) {
          if (key <= file.length - 1) {
            if (key >= 5) {
              this.$vux.alert.show({
                title: _this.$t('message.defaule.AlertTitle'),
                content: this.$t('message.uploadPic.alertImgText')
              })
              return false
            }
            let fileItem = file[key]
            this.updateImgArr(fileItem)
            this.picNum++
            let reader = new FileReader()
            reader.readAsDataURL(fileItem)
            reader.onload = function(e) {
              let img = document.createElement('img')
              img.src = e.target.result
              // alert(JSON.stringify(e.target.result))
              let div = document.createElement('div')
              div.className = 'chooseImg'
              let i = document.createElement('i')
              i.className = 'fa fa-close'
              i.addEventListener('click', e => {
                _this.delPic(e, 'img')
              })
              img.addEventListener('click', e => {
                _this.imgZoom(e)
              })
              div.appendChild(i)
              div.appendChild(img)
              uploadFile.parentNode.insertBefore(div, uploadFile)
              _this.disFun('img')
            }
          }
        }
      }
    },
    uploadVideo(item) {
      let _this = this
      let uploadVideo = document.getElementById('uploadVideo')
      let file = item.target.files[0]
      
      if (file.size >= 104857600) {
        this.$vux.alert.show({
          title: _this.$t('message.defaule.AlertTitle'),
          content: _this.$t('message.uploadPic.alertVideoText')
        })
        return false
      }
      if (window.FileReader) {
        let reader = new FileReader()
        _this.updateImgArr(file)
        reader.readAsDataURL(file)
        reader.onload = function(e) {
          let video = document.createElement('video')
          video.src = e.target.result
          let div = document.createElement('div')
          div.className = 'chooseVideo'
          let i = document.createElement('i')
          i.className = 'fa fa-close'
          i.addEventListener('click', e => {
            _this.delPic(e, 'video')
          })
          div.appendChild(i)
          div.appendChild(video)
          uploadVideo.parentNode.insertBefore(div, uploadVideo)
          _this.videoNum++
          _this.disFun('video')
        }
      }
    },
    updateImgArr(fileItem) {
      this.imgArr.push(fileItem)
      this.$emit('update:imgArr', this.imgArr)
    },
    delPic(e, type) {
      let uploadPro = document.getElementById('uploadPro')
      if (type === 'img') {
        let child = uploadPro.querySelectorAll('.chooseImg')
        let index = [].indexOf.call(child, e.target.parentNode)
        this.delID += e.target.id + ','
        this.$emit('update:delID', this.delID)
        e.target.parentNode.remove()
        this.imgArr.splice(index, 1)
        this.picNum--
      } else {
        e.target.parentNode.remove()
        this.imgArr.splice(0, 1)
        this.videoNum--
      }
      this.disFun(type)
    },
    disFun(type) {
      if (type === 'img') {
        let uploadFile = document.getElementById('uploadFile')
        this.picNum >= 5
          ? (uploadFile.style.display = 'none')
          : (uploadFile.style.display = 'inline-block')
      } else {
        let uploadVideo = document.getElementById('uploadVideo')
        this.videoNum >= 1
          ? (uploadVideo.style.display = 'none')
          : (uploadVideo.style.display = 'inline-block')
      }
    },
    imgZoom(e) {
      this.url = e.target.src
      this.show = !this.show
    }
  }
}
</script>

<style lang="less" scoped>
#uploadPro,
#uploadvid {
  width: 97%;
  padding: 5px 14px;
  margin: 0 auto;
}

.uploadFile,
.uploadVideo {
  padding: 0.2rem 0.3rem;
  overflow: hidden;
  display: inline-block;
  width: 5rem;
  height: 5rem;
  background: url(../assets/uploadImg.png);
  background-size: cover;
  .uploaderInput {
    opacity: 0;
    width: 100%;
    height: 100%;
  }
}

.uploadVideo {
  background: url(../assets/uploadVideo.png);
  background-size: cover;
}

.uploadFile,
.uploadVideo {
  margin-top: 3px;
}
.shado {
  line-height: 0 !important;
  .img {
    width: 100%;
    height: 100%;
  }
}

.button-wrapper {
  padding: 0 20px;
  margin-top: 80px;
}
</style>
<style lang="less">
.uploadPic {
  #uploadPro,
  #uploadvid {
    display: inline-block;
    vertical-align: top;
    .chooseImg,
    .chooseVideo {
      vertical-align: top;
      position: relative;
      width: 5rem;
      height: 5rem;
      display: inline-block;
      margin: 0.2rem 1.95px;
      img,
      video {
        width: 100%;
        height: 100%;
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
      }
      i {
        position: absolute;
        right: -5px;
        top: -5px;
        background-color: #ccc;
        padding: 0 0 0 1.5px;
        display: inline-block;
        background-size: contain;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
      }
    }
  }

  .weui-dialog {
    background: rgba(255, 255, 255, 1) !important;
  }
}
</style>
