<template>
  <div class="login">
    <i class="iClose" @click='$router.go(-1)'></i>
    <div class="input-box">
      <div class="input-wrapper">
        <x-input :title="$t('message.login.account')" v-model="account" class="vux-1px-b marginT" :placeholder="$t('message.login.accountPlaceholder')"></x-input>
        <x-input :title="$t('message.login.password')" v-model="password" type='password' class="vux-1px-b marginT" :placeholder="$t('message.login.passwordPlaceholder')"></x-input>
      </div>
    </div>
    <div class="button-wrapper">
      <x-button type='primary' @click.native="login">{{$t('message.login.loginText')}}</x-button>
    </div>
    <div class="tip">
      <p @click="register">{{$t('message.login.registerText')}}
        <span class="red">{{$t('message.login.register')}}</span>
      </p>
      <p @click="passwordForget">{{$t('message.login.passwordForget')}}</p>
    </div>
    <!-- <div class="divider-wrapper">
                    <divider>第三方账号登录</divider>
                  </div>
                  <div class="third-party">
                    <i class="fa fa-lg fa-qq"></i>
                    <i class="fa fa-lg fa-weixin"></i>
                  </div> -->
  </div>
</template>
<script>
import md5 from 'js-md5'
import loginApi from '../../API/login'
import { regular } from '../../utils/regular'
import bgPicture from '@/components/bgPicture'
import userInfoApi from '../../API/my'
import {
  XInput,
  XButton,
  Divider,
  Alert,
  TransferDomDirective as TransferDom
} from 'vux'
export default {
  data() {
    return {
      lock: true,
      account: null,
      password: null
    }
  },
  directives: { TransferDom },
  components: { bgPicture, XInput, XButton, Divider, Alert },
  created() {
    this.$vux.loading.hide()
  },
  methods: {
    login() {
      let _this = this
      //判断账号格式
      if (!this.account) {
        this.$vux.alert.show({
          buttonText: _this.$t('message.defaule.confirm_text'),
          title: _this.$t('message.defaule.AlertTitle'),
          content: _this.$t('message.login.accountAlert')
        })
        return false
      }
      if (regular(this.account, 'account')) {
        //判断密码空否
        if (!this.password) {
          this.$vux.alert.show({
            buttonText: _this.$t('message.defaule.confirm_text'),
            title: _this.$t('message.defaule.AlertTitle'),
            content: _this.$t('message.login.passwordAlert')
          })
          return false
        }
        //登录请求
        if (this.lock) {
          this.$vux.loading.show({
            text: _this.$t('message.defaule.loginText')
          })
          this.lock = false
          loginApi.authorizations({
            data: {
              account: _this.account,
              password: md5(md5(_this.password))
            },
            success(res) {
              localStorage.setItem('HeadToken', JSON.stringify(res.data))
              localStorage.setItem(
                'Token',
                JSON.parse(localStorage.HeadToken).token
              )
              _this.getUserInfo()
            },
            error(res) {
              _this.$vux.loading.hide()
              _this.lock = true
              _this.$vux.alert.show({
                title: _this.$t('message.defaule.AlertTitle'),
                content: res.msg
              })
            }
          })
        }
      } else {
        this.alertVal = this.$t('message.login.accountAlert2')
        this.show = true
      }
    },
    getUserInfo() {
      let _this = this
      userInfoApi.userInfo({
        success(res) {
          sessionStorage.setItem('userInfo', JSON.stringify(res.data))
          _this.$router.push({ path: '/' })
        },
        error(res) {
          _this.$vux.loading.hide()
          _this.lock = true
          _this.$vux.alert.show({
            title: _this.$t('message.defaule.AlertTitle'),
            content: res.msg
          })
        }
      })
    },
    register() {
      this.$router.push({ path: '/register' })
    },
    passwordForget() {
      this.$router.push({ path: '/passwordForget' })
    }
  }
}
</script>
<style lang='less' scoped>
.red {
  color: #c30000;
}

.input-box {
  padding: 0 15px;
  margin-top: 150px;
}

.marginT {
  margin-top: 10px;
  font-size: 14px;
}

.button-wrapper {
  padding: 71px 15px 10px 15px;
}

.tip {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  p {
    font-size: 14px;
  }
}

.divider-wrapper {
  margin-top: 40px;
  padding: 70px 15px 24px 15px;
}

.third-party {
  text-align: center;
  i:first-child {
    margin-right: 25px;
  }
  i:last-child {
    margin-left: 25px;
  }
}
.iClose{
  display: inline-block;
  background: url('../../assets/img/close.png') no-repeat;
  background-size: cover;
  position: absolute;
  top: 20px;
  left: 15px;
  width: 15px;
  height: 15px;
  line-height: 15px;
  text-align: center;
}
</style>
<style lang='less'>
.login {
  .weui-cell:before {
    border-top: none !important;
  }
}
</style>
