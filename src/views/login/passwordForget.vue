<template>
  <div class="login">
    <i class="iClose" @click='$router.go(-1)'></i>
    <div class="input-box">
      <div class="input-wrapper">
        <x-input :title="$t('message.login.account')" v-model="account" class="vux-1px-b marginT" :placeholder="$t('message.login.accountPlaceholder')"></x-input>
        <x-input :title="$t('message.register.VCode')" :placeholder="$t('message.register.VCodePlaceholder')" class="weui-vcode vux-1px-b" v-model="code" style="font-size:14px">
          <x-button slot="right" style="width:125px" mini plain @click.native="codeFun">{{buttonVal}}</x-button>
        </x-input>
        <x-input :title="$t('message.passwordForget')" v-model="password" type='password' class="vux-1px-b marginT" :placeholder="$t('message.login.passwordPlaceholder')"></x-input>
      </div>
    </div>
    <div class="button-wrapper">
      <x-button type='primary' @click.native="forget">{{$t('message.login.loginText')}}</x-button>
    </div>
  </div>
</template>
<script>
import md5 from 'js-md5'
import { regular } from '../../utils/regular'
import bgPicture from '@/components/bgPicture'
import forgetApi from '../../API/login/forget'
import vCodeApi from '../../API/login/verificationCode'
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
      account: null,
      password: null,
      buttonVal: this.$t('message.register.buttonVal'),
      code: null,
      lock: true
    }
  },
  directives: { TransferDom },
  components: { Alert, bgPicture, XInput, XButton, Divider, regular },
  created() {
    this.$vux.loading.hide()
  },
  methods: {
    //忘记密码
    forget() {
      let _this = this
      //判断账号格式
      if (!this.account) {
        this.alert(this.$t('message.login.accountAlert'))
        return false
      }
      if (regular(this.account, 'account')) {
        //判断密码格式
        if (!this.password) {
          this.alert(this.$t('message.login.passwordAlert'))
          return false
        }
        if (regular(this.password, 'password')) {
          //修改密码请求
          if (!this.lock) return false
          forgetApi.forget({
            data: {
              account: _this.account,
              password: md5(md5(_this.password)),
              code: _this.code
            },
            success(res) {
              _this.$router.push({ path: '/login' })
            },
            error(res) {
              _this.lock = true
              _this.alert(res.msg)
            }
          })
        } else {
          this.alert(this.$t('message.login.passwordPlaceholder'))
        }
      } else {
        this.alert(this.$t('message.login.accountAlert2'))
      }
    },
    codeFun() {
      let _this = this
      if (!this.account) {
        this.alert(this.$t('message.login.accountAlert'))
        return false
      }
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
              _this.alert(res.msg)
            }
          },
          'forget'
        )
      } else {
        this.alert(this.buttonVal + this.$t('message.register.VCodeTimeText'))
      }
    },
    time() {
      if (this.buttonVal > 0) {
        this.buttonVal--
        let t = setTimeout(this.time, 1000)
      } else {
        this.buttonVal = this.$t('message.register.buttonVal')
      }
    },
    alert(content, title = this.$t('message.defaule.AlertTitle')) {
      this.$vux.alert.show({
        buttonText: this.$t('message.defaule.confirm_text'),
        title: title,
        content: content
      })
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
    font-size: 12px;
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
  .weui-cell:before {
    border-top: none !important;
  }
  .weui-label {
    font-size: 15px;
  }
  .weui-cell__bd {
    input {
      font-size: 14px;
    }
  }
  .weui-cell {
    padding-right: 0 !important;
    &:before {
      border-top: none !important;
    }
  }
}
</style>
