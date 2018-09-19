<template>
  <div class="Authentication">
    <p>{{$t('message.IDcardAuthentication.title')}}
      <span style="float:right" @click="showFun">{{$t('message.IDcardAuthentication.Sample')}}</span>
    </p>
    <div class="IDcade">
      <img :src="img || '/static/img/add.png'" alt="" id="IDcardImg">
      <input type="file" id="upIDcade" :disabled="upBtnStatus" accept="image/*" @change="upIDcade">
    </div>
    <p style="text-align:center;padding: 5px 0">{{pText}}</p>
    <x-dialog v-model="show" :hide-on-blur="true">
      <div class="shado">
        <img class="img" :src="src" alt="" />
      </div>
    </x-dialog>
  </div>
</template>

<script>
import { XDialog } from 'vux'
import userInfoApi from '../../API/my'
import { uploadSingleImg } from '@/utils/index.js'
import { ApplyFromData } from '../../utils/ApplyFromData'

export default {
  components: {
    XDialog,
    uploadSingleImg
  },
  data() {
    return {
      show: false,
      img: '',
      src: localStorage.language === 'en' ? 'static/img/sampleEn.png' : 'static/img/sample.png',
      status: null,
      upBtnStatus: false,
      pText: this.$t('message.IDcardAuthentication.pText')
    }
  },
  created() {
    this.getUserInfo()
  },
  watch: {
    status(val) {
      // if (this.status === 1) {
      // } else if (this.status === 3) {
      //   this.pText = '请重新上传手持身份证照片'
      // } else {
      //   if (this.status === 2) this.pText = '审核中...'
      //   if (this.status === 4) this.pText = '审核已通过'
      //   this.upBtnStatus = true
      // }
    },
    img(val, oldval) {
      if (val !== '' && val !== JSON.parse(sessionStorage.userInfo).profile.id_pic_url) {
        this.$vux.loading.hide()
        this.uploadIDcade(val)
      }
    }
  },
  methods: {
    uploadIDcade(val) {
      ApplyFromData('Set', 'user', 'pic', this.img)
      
      // let _this = this
      // userInfoApi.profile({
      //   data: {
      //     pic: val
      //   },
      //   success(res) {
      //     _this.pText = res.msg
      //     _this.status = 2

      //     // sessionStorage.setItem('userInfo', JSON.stringify(res.data))
      //   },
      //   error(res) {
      //     _this.$vux.alert.show({
      //       title: '系统提示',
      //       content: res.msg
      //     })
      //   }
      // })
    },
    getUserInfo() {
      this.$vux.loading.hide()
      let ApplyFrom = ApplyFromData()
      if (ApplyFrom.user.pic) {
        this.img = ApplyFrom.user.pic
      }
      // let _this = this
      // userInfoApi.userInfo({
      //   success(res) {
      //     _this.$vux.loading.hide()
      //     _this.img = res.data.profile.id_pic_url
      //       ? res.data.profile.id_pic_url
      //       : 'static/img/add.png'
      //     _this.status = res.data.profile_status
      //     sessionStorage.setItem('userInfo', JSON.stringify(res.data))
      //   }
      // })
    },
    showFun() {
      this.show = !this.show
    },
    upIDcade(e) {
      if (window.FileReader) {
        this.$vux.loading.show()
        let file = e.target.files[0]
        uploadSingleImg(file, this, 'img')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.Authentication {
  font-size: 14px;
  p {
    padding: 1rem 1rem;
    span {
      color: red;
    }
  }
  .IDcade {
    position: relative;
    width: 90%;
    height: 190px;
    margin: 0 auto;
    border: 2px solid #ccc;
    border-radius: 4px;
    img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
    }
    #upIDcade {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
}

.shado {
  .img {
    width: 100%;
  }
}
</style>


