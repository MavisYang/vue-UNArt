<template>
  <div id="app-header" v-if="$route.meta.notHeader!=='notHeader'">
    <x-header slot="header" :left-options="leftOptions" :title="title" :transition="headerTransition">
      <a slot="right" :class="aClass" @click="linkTo"></a>
      <a v-if="$route.path === '/'" @click="changeLanguage" slot="overwrite-left">{{$t('message.headerDate.headerLeft')}}</a>
      <a v-if="$route.path === '/'" @click="goApply" slot="right">{{$t('message.headerDate.headerRight')}}</a>
    </x-header>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { XHeader } from 'vux'
import delProApi from '../API/my/editPro'
import getTime from '../API/home'
import wechatConfig from '../API/wechat/wechat.config'

export default {
  data() {
    return {}
  },
  components: {
    XHeader
  },
  computed: {
    ...mapState(['direction']),
    leftOptions() {
      return {
        backText: this.$t('message.defaule.backText'),
        showBack: this.$route.path !== '/' && this.$route.path !== '/production'
      }
    },
    title() {
      return this.$route.name
    },
    headerTransition() {
      return this.direction === 'forward'
        ? 'vux-header-fade-in-right'
        : 'vux-header-fade-in-left'
    },
    aClass() {
      return {
        fa: true,
        icon: true,
        'fa-trash': this.$route.path === '/previewPro' && true,
        'fa-search': this.$route.path === '/production' && true,
        // 'fa-share-square-o': this.$route.path === '/details' && true,
        'fa-plus-square-o':
          this.$route.path === '/MyProductiong' && this.showOrHide() && true
      }
    }
  },
  created() {
    this.getTimeData()
    this.getWechatConfig()
  },
  methods: {
    //语言切换
    changeLanguage() {
      localStorage.language === 'en'
        ? (localStorage.language = 'cn')
        : (localStorage.language = 'en')
      this.$i18n.locale = localStorage.language
      let flowImg = document.getElementById('flowImg')
      let QRcode = document.getElementById('QRcode')
      let src = ''
      if (localStorage.language === 'en') {
        src = 'static/img/flowEn.png'
        QRcode.style.display = 'none'
      } else {
        src = 'static/img/flowZn.png'
        QRcode.style.display = 'block'
      }
      flowImg.src = src
      location.reload()
    },
    //微信分享
    getWechatConfig() {
      let _this = this
      wechatConfig.wxConfig({
        type: 'GET',
        params: {
          url: encodeURIComponent(location.href.split('#')[0])
        },
        success(res) {
          res.data.jsApiList[0] = 'onMenuShareTimeline'
          res.data.jsApiList[1] = 'onMenuShareAppMessage'
          // console.log(res.data, '1111111')
          let wx = Vue.wechat
          wx.config(res.data)
          wx.error(err => {
            console.log(err)
          })
          _this.wechatOnShare(wx)
        },
        error(res) {
          console.log(res)
        }
      })
    },
    wechatOnShare(wx) {
      let _this = this
      wx.ready(() => {
        // alert('wechat ready')
        wx.onMenuShareAppMessage({
          title: 'UNArt', // 分享标题
          desc: _this.$t('message.headerDate.ShareAppMessageText'),
          link: 'http://m.unart.art-geeks.com.cn/',
          imgUrl: 'http://unart.oss-cn-shanghai.aliyuncs.com/photos/UNArt.ico'
        })
        wx.onMenuShareTimeline({
          title: 'UNArt', // 分享标题
          link: 'http://m.unart.art-geeks.com.cn/',
          imgUrl: 'http://unart.oss-cn-shanghai.aliyuncs.com/photos/UNArt.ico'
        })
      })
    },
    goApply() {
      if (localStorage.HeadToken) {
        let userInfo = JSON.parse(sessionStorage.userInfo)
        if (userInfo.profile_status !== 1 && userInfo.profile_status !== 3) {
          this.$vux.alert.show({
            buttonText: this.$t('message.defaule.confirm_text'),
            title: this.$t('message.defaule.AlertTitle'),
            content: this.$t('message.homeDate.homeButtonAlert')
          })
          return false
        }
      }
      this.$vux.loading.show({
        text: this.$t('message.defaule.loginText')
      })

      this.$router.push({ path: '/EntryInformation' })
    },
    //获取参赛时间
    getTimeData() {
      let _this = this
      if (!sessionStorage.apply_start) {
        getTime.getUNArtTime({
          success(res) {
            let data = res.data
            _this.data = data
            sessionStorage.apply_start = data.apply_start
            sessionStorage.apply_end = data.apply_end
            sessionStorage.upload_start = data.upload_start
            sessionStorage.upload_end = data.upload_end
            sessionStorage.audit_start = data.audit_start
            sessionStorage.audit_end = data.audit_end
            _this.$vux.loading.hide()
          },
          error(res) {
            _this.$vux.loading.hide()
            _this.$vux.alert.show({
              buttonText: this.$t('message.defaule.confirm_text'),
              title: this.$t('message.defaule.AlertTitle'),
              content: res.msg
            })
          }
        })
      }
    },
    //对非比赛期间添加作品按钮的影藏
    showOrHide() {
      if (this.$route.path === '/MyProductiong') {
        let nowTime = Date.parse(new Date())
        let auditStart = Date.parse(new Date(sessionStorage.audit_start))
        let uploadStart = Date.parse(new Date(sessionStorage.upload_start))
        let applyStart = Date.parse(new Date(sessionStorage.apply_start))
        let uploadEnd = Date.parse(new Date(sessionStorage.upload_end))
        //当前时间在用户审核时间内影藏添加作品功能
        if (nowTime >= auditStart && nowTime < uploadStart) {
          return false
        }
        //当前时间在报名开始前与上传作品最后时间外
        if (nowTime < applyStart || nowTime > uploadEnd) {
          return false
        }
        return true
      }
      // console.log(this.$route.path)
    },
    //判断icon跳转路由函数
    linkTo() {
      let _this = this
      let path = this.$route.path
      if (path === '/production') {
        path = '/search'
        this.$router.push({ path: path })
      }
      //作品详情删除作品
      if (path === '/previewPro') {
        this.$vux.confirm.show({
          title: 'UNArt',
          content: _this.$t('message.headerDate.DelBtnText'),
          onConfirm() {
            _this.$vux.loading.show()
            delProApi.delPro(
              {
                type: 'DELETE',
                success(res) {
                  _this.$router.go(-1)
                },
                error(res) {
                  _this.$vux.loading.hide()
                  _this.$vux.alert.show({
                    buttonText: this.$t('message.defaule.confirm_text'),
                    title: this.$t('message.defaule.AlertTitle'),
                    content: res.msg
                  })
                }
              },
              _this.$route.query.id
            )
          }
        })
      }
      //我的作品添加作品
      if (path === '/MyProductiong') {
        // this.$vux.loading.show()
        let profileStatus = JSON.parse(sessionStorage.userInfo).profile_status
        if (profileStatus === 4 || profileStatus === 2) {
          let obj = { path: '/uploadPro' }
          let nowTime = Date.parse(new Date())
          let applyStart = Date.parse(new Date(sessionStorage.apply_start))
          let applyEnd = Date.parse(new Date(sessionStorage.apply_end))
          let uploadStart = Date.parse(new Date(sessionStorage.upload_start))
          let uploadEnd = Date.parse(new Date(sessionStorage.upload_end))
          if (applyStart <= nowTime && nowTime <= applyEnd) {
            obj.query = { history: 1 }
          }
          if (uploadStart <= nowTime && nowTime <= uploadEnd) {
          }
          this.$router.push(obj)
        } else {
          let text = this.sta(profileStatus)
          this.$vux.alert.show({
            title: '系统提示',
            content: text
          })
        }
      }
    },
    //用户状态返还函数
    sta(val) {
      switch (val) {
        case 1:
          return this.$t('message.headerDate.StatusText[0]')
        case 2:
          return this.$t('message.headerDate.StatusText[1]')
        case 3:
          return this.$t('message.headerDate.StatusText[2]')
      }
    }
  }
}
</script>
<style scoped>
#app-header {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
}
</style>
<style lang='less'>
.vux-header {
  background-color: rgba(0, 0, 0, 1) !important;
  padding: 2px !important;
  .vux-header-title {
    font-size: 16px !important;
    font-weight: bold !important;
    color: white !important;
  }
}

.icon {
  display: block;
  width: 1.2rem;
  height: 1.2rem;
  font-size: 20px;
  margin-top: -1px;
}
</style>
