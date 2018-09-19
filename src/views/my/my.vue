<template>
  <div class="my">
    <div class="personinfo-box">
      <span style="position:absolute;font-size:10px;top:1px;left:2px">版本号: 2.0.0</span>
      <div class="personinfo-box-up">
        <i @click='$router.push("/listMessage")'></i>
      </div>
      <div class="personinfo-box-down">
        <img :src="avatar || 'static/img/1.png'" @click='detailAuthor'>
        <div class="personinfo-wrapper">
          <p class="name">{{nickname}}</p>
          <p class="signature ellipsis">{{signature}}</p>
        </div>
      </div>
    </div>
    <bg-divider></bg-divider>
    <div class="menu-box">
      <group>
        <cell :title="$t('message.myDate.personal')" is-link link='/personal'></cell>
        <cell :title="$t('message.myDate.MyProductiong')" is-link link='/MyProductiong'></cell>
        <cell v-if="applyBtnStatus" :title="$t('message.myDate.HistoryPro')" is-link @click.native="uploadPro(1)"></cell>
        <cell v-if="uploadBtnStatus" :title="$t('message.myDate.PlayPro')" is-link @click.native="uploadPro('')"></cell>
        <cell :title="mobileText()" is-link link='/MobileBind' class='vux-1px-b-s'></cell>
        <a :href="PDF_url" class="uploadPDF vux-1px-b-s">{{$t('message.ProMaterial.material')}}</a>
        <!-- <cell title="实名认证" is-link link='/IDcardAuthentication'></cell> -->
      </group>
    </div>
  </div>
</template>
<script>
import { Cell, Group } from 'vux'
import getTime from '../../API/home'
import userInfoApi from '../../API/my'
import bgDivider from '@/components/bgDivider.vue'

export default {
  data() {
    return {
      PDF_url: localStorage.language === 'en' ? 'static/UNArt_en.pdf' : 'static/UNArt_cn.pdf',
      applyBtnStatus: false,
      uploadBtnStatus: false,
      id: 0,
      profile_status: 0,
      avatar: null,
      nickname: null,
      signature: this.$t('message.myDate.signature')
    }
  },
  components: {
    Cell,
    Group,
    bgDivider
  },
  created() {
    this.showOrHide()
    this.getUserInfo()
  },
  methods: {
    mobileText() {
      let userMobile = JSON.parse(sessionStorage.userInfo).mobile
      let text = ''
      userMobile
        ? (text = this.$t('message.myDate.MobileBindChange'))
        : (text = this.$t('message.myDate.MobileBind'))
      return text
    },
    //获取参赛时间
    showOrHide() {
      //判断按钮显示
      let nowTime = Date.parse(new Date())
      let applyStart = Date.parse(new Date(sessionStorage.apply_start))
      let applyEnd = Date.parse(new Date(sessionStorage.apply_end))
      let uploadStart = Date.parse(new Date(sessionStorage.upload_start))
      let uploadEnd = Date.parse(new Date(sessionStorage.upload_end))
      if (applyStart <= nowTime && nowTime <= applyEnd) {
        this.applyBtnStatus = true
      } else {
        this.applyBtnStatus = false
      }
      if (uploadStart <= nowTime && nowTime <= uploadEnd) {
        this.uploadBtnStatus = true
      } else {
        this.uploadBtnStatus = false
      }
      this.$vux.loading.hide()
    },
    //状态返还
    sta(val) {
      switch (val) {
        case 1:
          return this.$t('message.headerDate.StatusText[0]')
        case 3:
          return this.$t('message.headerDate.StatusText[1]')
        default:
          return '未知错误'
      }
    },
    //上传作品路由
    uploadPro(val) {
      let _this = this
      //判断是否是历史作品接口
      let obj = { path: '/uploadPro' }
      if (val) {
        obj.query = { history: val }
      }
      //判断用户状态
      if (this.profile_status !== 1 && this.profile_status !== 3) {
        this.$router.push(obj)
      } else {
        let text = this.sta(this.profile_status)
        this.$vux.alert.show({
          title: _this.$t('message.defaule.AlertTitle'),
          content: text
        })
      }
    },
    //用户详情
    detailAuthor() {
      this.$router.push({ path: '/detailAuthor', query: { id: this.id } })
    },
    getUserInfo() {
      //获取用户基础信息
      if (sessionStorage.userInfo) {
        let userInfo = JSON.parse(sessionStorage.userInfo)
        this.id = userInfo.id
        this.profile_status = userInfo.profile_status
        this.avatar = userInfo.avatar
        this.nickname = userInfo.nickname
          ? userInfo.nickname
          : userInfo.mobile ? userInfo.mobile : userInfo.email
        this.signature = userInfo.sign
        this.$vux.loading.hide()
      } else {
        let _this = this
        userInfoApi.userInfo({
          success(res) {
            _this.id = res.data.id
            _this.profile_status = res.data.profile_status
            _this.avatar = res.data.avatar
            if (res.data.avatar) {
              _this.avatar =
                res.data.avatar + '?x-oss-process=image/resize,w_100'
            } else {
              _this.avatar = res.data.avatar
            }
            _this.nickname = res.data.nickname
              ? res.data.nickname
              : res.data.mobile ? res.data.mobile : res.data.email
            _this.signature =
              res.data.sign === '' ? res.data.sign : '这个人很懒，还未设置个人签名~'
            _this.$vux.loading.hide()
            sessionStorage.setItem('userInfo', JSON.stringify(res.data))
          },
          error(res) {
            _this.$vux.loading.hide()
            _this.$vux.alert.show({
              title: _this.$t('message.defaule.AlertTitle'),
              content: res.msg
            })
          }
        })
      }
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../theme.less';
.uploadPDF {
  display: block;
  padding: 14px 15px;
  font-size: 14px;
  color: #2c3e50;
}
.personinfo-box {
  width: 100%;
  height: 190px;
  padding: 20px 15px;
  background-color: #fff;
  background: url('../../assets/img/heisebeijing.png');
  position: relative;
  background-size: cover;
}

.personinfo-box-up {
  display: flex;
  justify-content: flex-end;
  i {
    background: url('../../assets/img/xiaoxi@3x.png') no-repeat;
    background-size: cover;
    width: 1.3rem;
    height: 1.1rem;
    text-align: center;
    line-height: 45px;
  }
}

.personinfo-box-down {
  display: flex;
  margin-top: 50px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    border: 1px solid #ccc;
    margin-right: 13px;
  }
  .personinfo-wrapper {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .name {
      font-size: 14px;
      font-weight: bold;
      color: white;
    }
    .signature {
      font-size: 14px;
      color: @font_grey;
    }
  }
}
.pdf {
  width: 100%;
  height: 100%;
  .cpdf {
    position: fixed;
    top: 2.5rem;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    z-index: 99999;
    justify-content: center;
    align-items: center;
    .center {
      width: 100%;
      text-align: center;
      height: 100%;
      overflow: auto;
      padding-top: 20px;
      .contor {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
<style lang='less'>
.my {
  background-color: #f2f2f2;
  .vux-label {
    font-size: 14px;
  }
  .weui-cell {
    padding: 13.5px 15px;
  }
  .weui-cells {
    margin-top: 11px;
  }
}
</style>
