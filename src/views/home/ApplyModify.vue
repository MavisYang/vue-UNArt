<template>
  <div class="ApplicationModify">
    <group class='marginTB-10'>
      <!-- <x-input v-model="payload" v-if='type === "name"' placeholder="请输入姓名"></x-input>
      <x-input v-model="payload" v-if='type === "mobile"' placeholder="请输入手机号" is-type="china-mobile"></x-input>
      <x-input v-model="payload" v-if='type === "email"' placeholder="请输入邮箱" is-type="email"></x-input> -->
      <x-textarea :max="1500" v-model='payload' v-if='type==="device"||type==="gardens"||type==="tag"||type==="project"' class='tag' :rows="20" :cols="10" :placeholder="placeholder"></x-textarea>
      <!-- <checklist v-model="payload" v-if='type==="gender"' label-position="left" :options="genderList" :max='1'></checklist> -->
    </group>
    <div class="button-wrapper">
      <x-button type='primary' @click.native="confirm">{{$t('message.defaule.confirm_text')}}</x-button>
    </div>
  </div>
</template>
<script>
import { Group, XInput, XButton, Checklist, XTextarea } from 'vux'
import { ApplyFromData } from '../../utils/ApplyFromData'
import { regular } from '../../utils/regular'

export default {
  data() {
    return {
      placeholder: this.$t('message.ApplyModify.placeholder'),
      type: this.$route.query.type,
      payload: this.$route.query.payload,
      genderList: this.$t('message.defaule.genderList'),
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
      //获取修改信息
      let type, payload
      type = this.type
      payload = this.payload
      ApplyFromData('Set', 'profile', type, payload)
      this.$router.go(-1)
    },
    //改变头部title
    modifyHeadTitle() {
      let headerName = ''
      switch (this.$route.query.type) {
        default:
          headerName = this.$t('message.ApplyModify.HeadTitle')
          break
      }
      document.querySelector('.vux-header-title span').innerHTML = headerName
    }
  }
}
</script>
<style lang='less' scoped>
.ApplicationModify {
  color: #000;
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
    height: 240px;
  }
  @media (max-width: 376px) {
    height: 240px;
  }
  @media (max-width: 321px) {
    height: 280px;
  }
  font-size: 14px;
}
</style>
<style lang='less'>
.ApplicationModify {
  .weui-textarea{
    font-size:12px;
  }
  .weui-input {
    font-size: 14px;
  }
}
.weui-textarea {
  padding: 5px;
}
</style>
