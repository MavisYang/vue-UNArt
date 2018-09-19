<template>
  <div class="personalModify">
    <group class='marginTB-10'>
      <x-input v-model="payload" v-if='$route.query.type==="nickname"'></x-input>
      <x-textarea v-model='payload' v-if='$route.query.type==="signatrue"' :max='20' class='areaSign' :rows="2" :cols="10"></x-textarea>
      <x-textarea v-model='payload' :max="1000" v-if='$route.query.type==="info"||$route.query.type==="resume"' class='area' :rows="15" :cols="10" :placeholder="placeholder"></x-textarea>
      <checklist v-model="payload" :max="1000" v-if='$route.query.type==="sex"' label-position="left" :options="sexList" @on-change="change"></checklist>
    </group>
    <div class="button-wrapper">
      <x-button type='primary' @click.native="confirm">{{$t('message.defaule.confirm_text')}}</x-button>
    </div>
  </div>
</template>
<script>
import { Group, XInput, XButton, Checklist, XTextarea } from 'vux'
import userInfoApi from '../../API/my'

export default {
  data() {
    return {
      placeholder: this.$route.query.type === 'info' ? this.$t('message.personalModify.infoPlaceholder') : this.$t('message.personalModify.resumePlaceholder'),
      payload: this.$route.query.payload,
      sexList: this.$t('message.defaule.genderList'),
      lock: true
    }
  },
  components: { Group, XInput, XButton, Checklist, XTextarea },
  beforeRouteEnter(to, form, next) {
    next(vm => {
      vm.modifyHeadTitle()
    })
  },
  created() {
    this.$vux.loading.hide()
  },
  methods: {
    confirm() {
      let dataName = String
      let _this = this
      switch (this.$route.query.type) {
        case ('nickname'):
          dataName = 'nickname'
          break
        case ('sex'):
          dataName = 'gender'
          break
        case ('signatrue'):
          dataName = 'sign'
          break
        case ('info'):
          dataName = 'info'
          break
        case ('resume'):
          dataName = 'resume'
          break
      }
      let data = {}
      if (dataName !== 'gender') {
        data[dataName] = this.payload
      } else {
        let gender = this.payload[0] === '男' ? 1 : 2
        data[dataName] = gender
      }
      if (this.lock) {
        this.lock = false
        userInfoApi.updateUse({
          data: data,
          success(res) {
            let userInfo = res.data
            userInfo.avatar += '?x-oss-process=image/resize,w_100'
            sessionStorage.setItem('userInfo', JSON.stringify(res.data))
            _this.$router.go(-1)
          },
          error(res) {
            _this.lock = true
            _this.$vux.alert.show({
              title: _this.$t('message.defaule.AlertTitle'),
              content: res.msg
            })
          }
        })
      }
    },
    modifyHeadTitle() {
      let headerName = String
      switch (this.$route.query.type) {
        case ('nickname'):
          headerName = this.$t('message.personalModify.nickname')
          break
        case ('sex'):
          headerName = this.$t('message.personalModify.gender')
          break
        case ('signatrue'):
          headerName = this.$t('message.personalModify.signatrue')
          break
        case ('info'):
          headerName = this.$t('message.personalModify.info')
          break
        case ('resume'):
          headerName = this.$t('message.personalModify.resume')
          break
      }
      document.querySelector('.vux-header-title span').innerHTML = headerName
    },
    change() {

    }
  }
}

</script>
<style lang='less' scoped>

.personalModify {
  color:#000;
  background-color: white;
  // height: 100%;
  overflow: hidden;
}

.button-wrapper {
  margin-top: 20px;
  padding: 15px 25px;
}

.area {
  @media (max-width: 415px) {
    height: 340px;
  }
  @media (max-width: 376px) {
    height: 340px;
  }
  @media (max-width: 321px) {
    height: 380px;
  }
  font-size:14px;
}
.areaSign{
   font-size:14px;
}
</style>
<style lang='less'>
.personalModify {
  .weui-input {
    font-size: 14px;
  }
}
.weui-textarea{
  font-size: 14px;
  padding: 5px
}
</style>
