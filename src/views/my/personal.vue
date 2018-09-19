<template>
  <div class="personal">
    <bg-divider></bg-divider>
    <div class="headimg-wrapper">
      <p>{{$t('message.personal.HeadImg')}}</p>
      <upload-headimg :avatar="avatar"></upload-headimg>
    </div>
    <bg-divider></bg-divider>
    <group>
      <cell :title="$t('message.personal.nickname')" :value='nickname' is-link @click.native='switchTo("nickname")'></cell>
      <cell :title="$t('message.personal.gender')" :value='sex' is-link @click.native='switchTo("sex")'></cell>
      <datetime style="color:#2c3e50" :title="$t('message.personal.birth')" v-model="birth" @on-change="change" :min-year="1900" :max-year="new Date().getFullYear()" :cancel-text="$t('message.defaule.cancel_text')" :confirm-text="$t('message.defaule.confirm_text')"></datetime>
      <cell :title="$t('message.personal.signatrue')" :value='signatrue' is-link @click.native='switchTo("signatrue")'></cell>
      <cell :title="$t('message.ApplyForm.user.mobile')" :value='mobile'></cell>
      <cell :title="$t('message.ApplyForm.user.email')" :value='email' ></cell>
    </group>
    <bg-divider></bg-divider>
    <group class='vux-1px-b-s'>
      <cell :title="$t('message.personal.personalIntroduce')" :value='personalIntroduce' is-link @click.native='switchTo("info")'></cell>
      <cell :title="$t('message.personal.experience')" :value='experience' is-link @click.native='switchTo("resume")'></cell>
    </group>
    <div class="button-wrapper">
      <x-button type='primary' @click.native='quit'>{{$t('message.personal.primaryText')}}</x-button>
    </div>
  </div>
</template>
<script>
import { Cell, Group, Datetime, XButton } from 'vux'
import bgDivider from '@/components/bgDivider'
import uploadHeadimg from '@/components/uploadHeadimg'
import userInfoApi from '../../API/my'
export default {
  components: { Cell, Group, bgDivider, Datetime, uploadHeadimg, XButton },
  data() {
    return {
      avatar: null,
      nickname: '',
      sex: '',
      birth: '',
      signatrue: '',
      personalIntroduce: '',
      experience: '',
      email: '',
      mobile: ''
    }
  },
  watch: {
    birth(val, oldval) {
      if (oldval !== '' && val !== oldval) {
        userInfoApi.updateUse({
          data: { birthday: val },
          success(res) {
            sessionStorage.setItem('userInfo', JSON.stringify(res.data))
          }
        })
      }
    }
  },
  beforeCreate() {
    document.querySelector('.vux-header-title span').innerHTML = this.$t(
      'message.personal.headerTitle'
    )
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      let _this = this
      if (sessionStorage.userInfo) {
        let userInfo = JSON.parse(sessionStorage.userInfo)
        this.avatar = userInfo.avatar
        this.sex =
          parseInt(userInfo.gender) === 2
            ? this.$t('message.defaule.genderList[1]')
            : _this.$t('message.defaule.genderList[0]')
        this.birth = userInfo.birthday
        this.nickname = userInfo.nickname
          ? userInfo.nickname
          : userInfo.mobile ? userInfo.mobile : userInfo.email
        this.signatrue = userInfo.sign ? userInfo.sign : '创意源于内心的灵感，源于生活又高于生活'
        this.personalIntroduce = userInfo.info ? userInfo.info : ''
        this.experience = userInfo.resume ? userInfo.resume : ''
        this.email = userInfo.email
        this.mobile = userInfo.mobile
        this.$vux.loading.hide()
      } else {
        userInfoApi.userInfo({
          success(res) {
            _this.avatar = res.data.avatar
            _this.sex =
              res.data.gender === 2
                ? _this.$t('message.defaule.genderList[1]')
                : _this.$t('message.defaule.genderList[0]')
            _this.birth = res.data.birthday
            _this.nickname = res.data.nickname
              ? res.data.nickname
              : res.data.mobile ? res.data.mobile : res.data.email
            _this.signatrue = res.data.sign
              ? res.data.sign
              : '创意源于内心的灵感，源于生活又高于生活'
            _this.personalIntroduce = res.data.info ? res.data.info : ''
            _this.experience = res.data.resume ? res.data.resume : ''
            this.email = res.data.email ? res.data.email : ''
            this.mobile = res.data.mobile ? res.data.mobile : ''
            _this.$vux.loading.hide()
            sessionStorage.setItem('userInfo', JSON.stringify(res.data))
          }
        })
      }
    },
    change() {},
    quit() {
      let _this = this
      this.$vux.confirm.show({
        title: 'UNArt',
        content: _this.$t('message.personal.LogoutText'),
        confirmText: _this.$t('message.defaule.confirm_text'),
        cancelText: _this.$t('message.defaule.cancel_text'),
        // onShow() {},
        // onHide() {},
        onCancel() {},
        onConfirm() {
          localStorage.removeItem('HeadToken')
          sessionStorage.removeItem('userInfo')
          localStorage.removeItem('Token')
          _this.$router.push('/')
        }
      })
    },
    switchTo(type) {
      let payload = null
      switch (type) {
        case 'nickname':
          payload = this.nickname
          break
        case 'sex':
          payload = [this.sex]
          break
        case 'signatrue':
          payload = this.signatrue
          break
        case 'info':
          payload = this.personalIntroduce
          break
        case 'resume':
          payload = this.experience
          break
      }
      this.$router.push({
        path: 'personalModify',
        query: {
          type,
          payload
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@fontSize: 14px;
.headimg-wrapper {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: @fontSize;
  }
}

.button-wrapper {
  padding: 0 20px;
  padding-bottom: 40px;
  margin-top: 15%;
}
</style>
<style lang='less'>
@fontSize: 14px;
.personal {
  .weui-cells {
    font-size: @fontSize !important;
  }
  .vux-label {
    white-space: nowrap !important;
    width: 60px;
  }
}
.personal .weui-cell__ft {
  width: 200px !important;
  height: 19px !important;
  overflow: hidden;
}
</style>
