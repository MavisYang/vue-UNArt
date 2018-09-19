<template>
  <div class="ApplyFrom">
    <bg-divider></bg-divider>
    <group class='vux-1px-b-s'>
      <x-input :title="$t('message.ApplyForm.user.name')" v-model="user.name" required :placeholder="$t('message.ApplyForm.user.name')" @on-blur="OnBlur('name')" placeholder-align="right" text-align="right"></x-input>
      <!-- <cell title='性别' :value='genderText' is-link @click.native='switchTo("gender")'></cell> -->
      <popup-picker :title="$t('message.ApplyForm.user.gender')" :data="genderList" v-model="genderVal" :placeholder="$t('message.ApplyForm.user.genderPlaceholder')" @on-change="genderChange" :cancel-text="$t('message.defaule.cancel_text')" :confirm-text="$t('message.defaule.confirm_text')"></popup-picker>
      <datetime :title="$t('message.ApplyForm.user.birthday')" v-model="user.birthday" :min-year="1900" :max-year="new Date().getFullYear()" @on-change="dateChange" :cancel-text="$t('message.defaule.cancel_text')" :confirm-text="$t('message.defaule.confirm_text')"></datetime>
      <popup-picker :title="$t('message.ApplyForm.user.userType')" :data="typeList" v-model="typeVal" :placeholder="$t('message.ApplyForm.user.userTypePlaceholder')" @on-change="identityChange" :cancel-text="$t('message.defaule.cancel_text')" :confirm-text="$t('message.defaule.confirm_text')"></popup-picker>
      <cell :title="$t('message.ApplyForm.user.IDcadeText')" :value='IDcadeText' is-link link='/IDcardAuthentication'></cell>
      <x-input :title="$t('message.ApplyForm.user.mobile')" v-model="user.mobile" is-type="china-mobile" required :placeholder="$t('message.ApplyForm.user.mobilePlaceholder')" @on-blur="OnBlur('mobile')" placeholder-align="right" text-align="right"></x-input>
      <x-input :title="$t('message.ApplyForm.user.email')" v-model="user.email" is-type="email" required :placeholder="$t('message.ApplyForm.user.emailPlaceholder')" @on-blur="OnBlur('email')" placeholder-align="right" text-align="right"></x-input>
    </group>
    <div class="button-wrapper">
      <x-button type='primary' @click.native='nextBtn'>{{$t('message.defaule.confirm_text')}}</x-button>
    </div>
  </div>
</template>
<script>
import { Cell, Group, Datetime, XButton, PopupPicker, XInput } from 'vux'
import bgDivider from '@/components/bgDivider'
import { ApplyFromData } from '../../utils/ApplyFromData'

export default {
  components: {
    Cell,
    Group,
    bgDivider,
    Datetime,
    XButton,
    PopupPicker,
    XInput
  },
  data() {
    return {
      user: {
        gender: 1,
        name: '',
        birthday: '2017-01-01',
        type: '',
        pic: '',
        mobile: '',
        email: ''
      },
      genderList: [this.$t('message.defaule.genderList')],
      genderVal: [],
      typeList: [this.$t('message.ApplyForm.typeList')],
      typeVal: []
    }
  },
  computed: {
    genderText() {
      return this.user.gender === 1
        ? this.$t('message.defaule.genderList[0]')
        : this.user.gender === 2 ? this.$t('message.defaule.genderList[1]') : ''
    },
    IDcadeText() {
      return this.user.pic !== ''
        ? this.$t('message.ApplyForm.user.IDcadeStatusText[0]')
        : this.$t('message.ApplyForm.user.IDcadeStatusText[1]')
    }
  },
  watch: {},
  beforeCreate() {
    // document.querySelector('.vux-header-title span').innerHTML = '个人信息'
  },
  created() {
    this.getUserInfo()
    // this.getApplyModify()
  },
  methods: {
    OnBlur(type) {
      ApplyFromData('Set', 'user', type, this.user[type])
    },
    //修改日期
    dateChange() {
      ApplyFromData('Set', 'user', 'birthday', this.user.birthday)
    },
    //更新性别信息
    genderChange() {
      this.user.gender =
        this.genderVal[0] === this.$t('message.defaule.genderList[0]') ? 1 : 2
      ApplyFromData('Set', 'user', 'gender', this.user.gender)
    },
    //更新身份信息
    identityChange() {
      this.user.type = this.typeVal[0]
      ApplyFromData('Set', 'user', 'type', this.user.type)
    },
    // //获取修改信息
    // getApplyModify() {
    //   let type = this.$route.query.type
    //   if (type) {
    //     this.user[type] = this.$route.query.payload
    //   }
    // },
    //获取报名用户信息
    getUserInfo() {
      if (localStorage.ApplyFrom) {
        let ApplyFrom = ApplyFromData()
        this.user = ApplyFrom.user
        this.genderVal[0] =
          ApplyFrom.user.gender === 1
            ? this.$t('message.defaule.genderList[0]')
            : this.$t('message.defaule.genderList[1]')
        if (!ApplyFrom.user.type) {
          this.typeVal = []
        } else {
          this.typeVal[0] = ApplyFrom.user.type
        }
      }
      this.$vux.loading.hide()
    },
    //下一步
    nextBtn() {
      let user = this.user
      if (
        user.name === '' ||
        user.type === '' ||
        user.pic === '' ||
        user.mobile === '' ||
        user.email === ''
      ) {
        this.alertFun(this.$t('message.ApplyForm.requireAlertText'))
        return false
      }
      if (!/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.user.mobile)) {
        this.alertFun(this.$t('message.defaule.phoneAlert'))
        return false
      }
      let email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
      if (email.test(this.email)) {
        this.alertFun(this.$t('message.defaule.emailAlert'))
        return true
      }
      let _this = this
      this.$vux.confirm.show({
        title: this.$t('message.defaule.AlertTitle'),
        confirmText: this.$t('message.defaule.confirm_text'),
        cancelText: this.$t('message.defaule.cancel_text'),
        content:
          '<div class="intellectualInfo">' +
          this.$t('message.ApplyForm.alertText') +
          '</div>',
        onCancel() {
          return false
        },
        onConfirm() {
          _this.upLocal()
        }
      })
    },
    upLocal() {
      let ApplyFrom = ApplyFromData()
      ApplyFrom.user = this.user
      localStorage.ApplyFrom = JSON.stringify(ApplyFrom)
      let path = 'uploadPro'
      if (ApplyFrom.works.length) {
        path = 'ApplyPro'
      }
      this.$router.push({
        path: path,
        query: {
          type: 'ApplyPro',
          value: ApplyFromData().works.length
        }
      })
    },
    alertFun(content) {
      this.$vux.alert.show({
        buttonText: this.$t('message.defaule.confirm_text'),
        title: this.$t('message.defaule.AlertTitle'),
        content: content
      })
    }
    //修改页面跳转
    // switchTo(type) {
    //   let payload = null
    //   switch (type) {
    //     case 'name':
    //       payload = this.user.name
    //       break
    //     case 'gender':
    //       payload = [this.genderText]
    //       break
    //     case 'mobile':
    //       payload = this.user.mobile
    //       break
    //     case 'email':
    //       payload = this.user.email
    //       break
    //   }
    //   this.$router.push({
    //     path: 'ApplyModify',
    //     query: {
    //       type,
    //       payload
    //     }
    //   })
    // }
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
  margin-top: 15%;
}
</style>
<style lang='less'>
@fontSize: 14px;
.ApplyFrom {
  .weui-cells {
    font-size: @fontSize !important;
  }
  .vux-label {
    white-space: nowrap !important;
    width: 60px;
  }
  .weui-cell__ft {
    // width: 200px !important;
    height: 19px !important;
    overflow: hidden;
  }
}
</style>
