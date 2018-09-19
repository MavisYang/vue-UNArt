
<template>
  <div class="personalModify">
    <group class='marginTB-10'>
      <x-input v-model="payload" v-if='$route.query.type==="1"'></x-input>
      <x-textarea v-model='payload' v-if='$route.query.type==="3"' :max='20' :rows="2" :cols="10"></x-textarea>
      <x-textarea v-model='payload' v-if='$route.query.type==="4"||$route.query.type==="5"' class='area' :rows="30" :cols="10"></x-textarea>
      <checklist v-model="payload" v-if='$route.query.type==="2"' label-position="left" :options="sexList" :max='1' @on-change="change"></checklist>
    </group>
    <div class="button-wrapper">
      <x-button type='primary'>确定</x-button>
    </div>
  </div>
</template>
<script>
import { Group, XInput, XButton, Checklist, XTextarea } from 'vux'
export default {
  data() {
    return {
      payload: this.$route.query.payload,
      sexList: ['男', '女']
    }
  },
  components: { Group, XInput, XButton, Checklist, XTextarea },
  beforeRouteEnter(to, form, next) {
    next(vm => {
      vm.modifyHeadTitle()
    })
  },
  methods: {
    modifyHeadTitle() {
      switch (this.$route.query.type) {
        case ('1'):
          document.querySelector('.vux-header-title span').innerHTML = '设置昵称'
          break
        case ('2'):
          document.querySelector('.vux-header-title span').innerHTML = '设置性别'
          break
        case ('3'):
          document.querySelector('.vux-header-title span').innerHTML = '设置签名'
          break
      }
    },
    change() {

    }
  }
}

</script>
<style lang='less' scoped>
.personalModify {
  background-color: #f2f2f2;
  height: 100%;
  overflow: hidden;
}

.button-wrapper {
  margin-top: 40px;
  padding: 15px 25px;
}

.area {
  @media (max-width: 415px) {
    height: 540px;
  }
  @media (max-width: 376px) {
    height: 440px;
  }
  @media (max-width: 321px) {
    height: 380px;
  }
  font-size:14px;
}

</style>
<style lang='less'>
.personalModify {
  .weui-input {
    font-size: 14px;
  }
}

</style>
