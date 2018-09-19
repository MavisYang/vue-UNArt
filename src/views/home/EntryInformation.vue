<template>
  <div class="EntryInformation">
    <div class="info">
      <h3>{{$t('message.EntryInformation.title')}}</h3>
      <p>{{$t('message.EntryInformation.content')}}</p>
      <p>{{$t('message.EntryInformation.applyTime')}} {{data.apply_start}}~{{data.apply_end}}</p>
      <p>{{$t('message.EntryInformation.auditTitle')}}</p>
      <p>{{$t('message.EntryInformation.auditTime')}} {{data.audit_start}}~{{data.audit_end}}</p>
    </div>
    <div class="button-wrapper">
      <x-button type='primary' @click.native='nextBtn'>{{$t('message.defaule.confirm_text')}} </x-button>
      <div class="protocol-box">
        <input type="checkbox" v-model='checkedProtocol' />
        <span>我已阅读：</span>
        <a href="../../static/protocol.pdf" target="_blank" style="text-decoration:underline">《征集计划流程》</a>
      </div>
    </div>
  </div>
</template>
<script>
import getTime from '../../API/home'
import {
  // Cell,
  // Group,
  // Datetime,
  // Actionsheet,
  // XTextarea,
  // XInput,
  XButton
} from 'vux'
export default {
  components: {
    // Cell,
    // Group,
    // Datetime,
    // Actionsheet,
    // XTextarea,
    // XInput,
    XButton
  },
  data() {
    return {
      checkedProtocol: false,
      data: {}
    }
  },
  created() {
    this.getTimeData()
  },
  methods: {
    //获取参赛时间
    getTimeData() {
      let _this = this
      if (!sessionStorage.apply_start) {
        getTime.getUNArtTime({
          success(res) {
            let data = res.data
            _this.data = data
            sessionStorage.apply_start = data.apply_start
            sessionStorage.apply_end = data.apply_start
            sessionStorage.upload_start = data.upload_start
            sessionStorage.upload_end = data.upload_end
            sessionStorage.audit_start = data.audit_start
            sessionStorage.audit_end = data.audit_end
            _this.$vux.loading.hide()
          },
          error(res) {
            _this.$vux.loading.hide()
            _this.$vux.alert.show({
              title: _this.$t('message.defaule.AlertTitle'),
              content: _this.$t('message.EntryInformation.TimeAlertText')
            })
          }
        })
      } else {
        this.data = {
          apply_start: sessionStorage.apply_start,
          apply_end: sessionStorage.apply_end,
          upload_start: sessionStorage.upload_start,
          upload_end: sessionStorage.upload_end,
          audit_start: sessionStorage.audit_start,
          audit_end: sessionStorage.audit_end
        }
        this.$vux.loading.hide()
      }
    },
    nextBtn() {
      if (!this.checkedProtocol) {
        this.$vux.toast.text('请先阅读征集计划流程')
        return
      }
      let _this = this
      let nowTime = Date.parse(new Date())
      let applyStart = Date.parse(new Date(sessionStorage.apply_start))
      let applyEnd = Date.parse(new Date(sessionStorage.apply_end))
      if (applyStart < nowTime && nowTime < applyEnd) {
        this.$router.push({ path: '/ApplyForm' })
      } else {
        let title = ''
        if (applyStart > nowTime) title = this.$t('message.EntryInformation.notStarted')
        else title = this.$t('message.EntryInformation.activityOver')
        this.$vux.alert.show({
          title: _this.$t('message.defaule.AlertTitle'),
          content: title
        })
      }
    }
  }
}

</script>
<style lang="less" scoped>
.EntryInformation {
  width: 100%;
  height: 100%;
  font-size: 14px;
  text-align: center;
  .info {
    padding-top: 50px;
    height: 400px;
  }
  h3 {
    width: 30%;
    border-bottom: 3px double #35495e;
    margin: 0 auto;
    margin-bottom: 15px;
  }
  p {
    padding: 1px;
  }
}

.button-wrapper {
  padding: 0 20px; // margin-top: 40px;
}

.protocol-box {
  text-align: left;
  margin-top: 25px;
  font-size: 12px;
  input {
    vertical-align: middle;
    margin-bottom: 3px;
  }
}

</style>
