<template>
  <div class="mobileBind">
    <group>
      <x-input :title="$t('message.MobileBind.mobile')" :placeholder="$t('message.MobileBind.mobilePlaceholder')" mask="99999999999" v-model="mobile" :max="13" is-type="china-mobile"></x-input>
      <x-input :title="$t('message.register.VCode')" :placeholder="$t('message.register.VCodePlaceholder')" class="weui-vcode" v-model="code">
        <x-button slot="right" style="width:125px" mini plain @click.native="codeFun">{{buttonVal}}</x-button>
      </x-input>
    </group>
    <div class="button-wrapper">
      <x-button type='primary' @click.native='upBtn'>{{$t('message.defaule.changeText')}}</x-button>
    </div>
  </div>
</template>

<script>
import { Cell, Group, XInput, XButton } from 'vux'
import vCodeApi from '@/API/login/verificationCode'
import mobileBindApi from '../../API/my/mobileBind'
import { regular } from '../../utils/regular'

export default {
  components: {
    Group,
    Cell,
    XInput,
    XButton,
    vCodeApi
  },
  data() {
    return {
      mobile: null,
      code: '',
      buttonVal: this.$t('message.register.buttonVal')
    }
  },
  created() {
    this.$vux.loading.hide()
  },
  methods: {
    upBtn() {
      let _this = this
      mobileBindApi.Mbind({
        data: {
          mobile: _this.mobile,
          code: _this.code
        },
        success(res) {
          _this.$router.push({ path: '/' })
        },
        error(res) {
          _this.alert(res.msg)
        }
      })
    },
    codeFun() {
      let _this = this
      if (!this.mobile) {
        this.alert(this.$t('message.login.accountAlert2'))
        return false
      }
      if (this.buttonVal === this.$t('message.register.buttonVal')) {
        vCodeApi.verificationCode({
          data: {
            account: _this.mobile
          },
          success(res) {
            // _this.code = res.data.code
            _this.buttonVal = 60
            let t = setTimeout(_this.time, 1000)
          },
          error(res) {
            _this.alert(res.msg)
          }
        }, 'bind')
      } else {
        _this.alert(this.buttonVal + this.$t('message.register.VCodeTimeText'))
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
        title: title,
        content: content
      })
    }
  }
}
</script>

<style lang="less" scoped>
.button-wrapper {
  padding: 0 20px;
  margin-top: 80px;
}
</style>
<style lang="less">
.mobileBind {
  .weui-label {
    font-size: 15px;
  }
  .weui-cell__bd {
    input {
      font-size: 15px;
    }
  }
  .weui-cell {
    padding: 13.5px 15px;
  }
  .weui-cells {
    margin-top: 11px;
  }
}
</style>
