<template>
  <div class="login">
    <i class="iClose" @click='$router.go(-1)'></i>
    <div class="input-box">
      <div class="input-wrapper">
        <x-input :title="$t('message.login.account')" v-model="account" class="vux-1px-b marginT" :placeholder="$t('message.login.accountPlaceholder')"></x-input>
        <x-input :title="$t('message.register.VCode')" :placeholder="$t('message.register.VCodePlaceholder')" class="vux-1px-b" v-model="code" style="font-size:14px;padding-right:0">
          <x-button slot="right" style="width:125px" mini plain @click.native="codeFun">{{buttonVal}}</x-button>
        </x-input>
        <x-input :title="$t('message.login.password')" v-model="password" type='password' class="vux-1px-b marginT" :placeholder="$t('message.login.passwordPlaceholder')"></x-input>
      </div>
    </div>
    <div class="button-wrapper">
      <x-button type='primary' @click.native="register">{{$t('message.login.register')}}</x-button>
    </div>
    <div class="tip">
      <p>{{$t('message.register.RegistrationInfo')}}
        <a href="#">《{{$t('message.register.Agreement')}}》</a>
      </p>
    </div>
  </div>
</template>
<script>
import {
  Alert,
  XInput,
  XButton,
  Divider,
  TransferDomDirective as TransferDom
} from 'vux'
import vCodeApi from '../../API/login/verificationCode'
import registerApi from '../../API/login/register'
import bgPicture from '@/components/bgPicture'
import { regular } from '../../utils/regular'
import loginApi from '../../API/login'
import md5 from 'js-md5'
export default {
  data() {
    return {
      account: null,
      password: null,
      buttonVal: this.$t('message.register.buttonVal'),
      code: ''
    }
  },
  directives: { TransferDom },
  components: { Alert, bgPicture, XInput, XButton, Divider },
  created() {
    this.$vux.loading.hide()
  },
  methods: {
    //注册
    register() {
      let _this = this
      //判断账号格式
      if (!this.account) {
        _this.$vux.alert.show({
          title: _this.$t('message.defaule.AlertTitle'),
          content: _this.$t('message.login.accountAlert')
        })
        return false
      }
      if (regular(this.account, 'account')) {
        //判断密码格式
        if (!this.password) {
          this.$vux.alert.show({
            title: _this.$t('message.defaule.AlertTitle'),
            content: _this.$t('message.login.passwordAlert')
          })
          return false
        }
        //验证密码格式
        if (regular(this.password, 'password')) {
          //注册请求
          registerApi.register({
            data: {
              account: _this.account,
              password: md5(md5(_this.password)),
              code: _this.code
            },
            success(res) {
              loginApi.authorizations({
                data: {
                  account: _this.account,
                  password: md5(md5(_this.password))
                },
                success(res) {
                  localStorage.setItem('HeadToken', JSON.stringify(res.data))
                  _this.$router.go(-1)
                },
                error(res) {
                  _this.lock = true
                  _this.$vux.alert.show({
                    buttonText: _this.$t('message.defaule.confirm_text'),
                    title: _this.$t('message.defaule.AlertTitle'),
                    content: res.msg
                  })
                }
              })
            },
            error(res) {
              _this.lock = true
              _this.$vux.alert.show({
                buttonText: _this.$t('message.defaule.confirm_text'),
                title: _this.$t('message.defaule.AlertTitle'),
                content: res.msg
              })
            }
          })
        } else {
          this.$vux.alert.show({
            buttonText: _this.$t('message.defaule.confirm_text'),
            title: _this.$t('message.defaule.AlertTitle'),
            content: _this.$t('message.login.passwordPlaceholder')
          })
        }
      } else {
        this.$vux.alert.show({
          buttonText: _this.$t('message.defaule.confirm_text'),
          title: _this.$t('message.defaule.AlertTitle'),
          content: _this.$t('message.defaule.accountAlert2')
        })
      }
    },
    //验证码
    codeFun() {
      let _this = this
      if (!this.account) {
        this.$vux.alert.show({
          buttonText: _this.$t('message.defaule.confirm_text'),
          title: _this.$t('message.defaule.AlertTitle'),
          content: _this.$t('message.login.accountAlert')
        })
        return false
      }
      if (regular(this.account, 'account')) {
        if (this.buttonVal === this.$t('message.register.buttonVal')) {
          this.buttonVal = 60
          let t = setTimeout(this.time, 1000)
          vCodeApi.verificationCode(
            {
              data: {
                account: _this.account
              },
              success(res) {
                // _this.code = res.data.code
              },
              error(res) {
                _this.$vux.alert.show({
                  buttonText: _this.$t('message.defaule.confirm_text'),
                  title: _this.$t('message.defaule.AlertTitle'),
                  content: res.msg
                })
              }
            },
            'register'
          )
        } else {
          this.$vux.alert.show({
            buttonText: _this.$t('message.defaule.confirm_text'),
            title: _this.$t('message.defaule.AlertTitle'),
            content: _this.buttonVal + _this.$t('message.register.VCodeTimeText')
          })
        }
      } else {
        this.$vux.alert.show({
          buttonText: _this.$t('message.defaule.confirm_text'),
          title: _this.$t('message.defaule.AlertTitle'),
          content: _this.$t('message.login.accountAlert2')
        })
      }
    },
    //重发计时器
    time() {
      if (this.buttonVal > 0) {
        this.buttonVal--
        let t = setTimeout(this.time, 1000)
      } else {
        this.buttonVal = this.$t('message.register.buttonVal')
      }
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
  padding-bottom: 20px !important;
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
.iClose {
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
  .weui-cell {
    padding-right: 0 !important;
    &:before {
      border-top: none !important;
    }
  }
}
</style>
