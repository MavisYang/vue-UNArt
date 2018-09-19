<template>
<div>
  <bg-divider></bg-divider>
  <div class="ProMaterial">
     <div style="padding-bottom:100px">
       <p class="title">{{$t('message.ProMaterial.title')}}<a style="float:right;color:blue" :href="PDF_url">{{$t('message.ProMaterial.material')}}</a></p>
       <p>{{$t('message.ProMaterial.content')}}</p>
       <group>
      <cell :title="$t('message.ProMaterial.fileTitleType[0]')" :value='ValStatus(profile.device) ' is-link @click.native='switchTo("device")'></cell>
      <cell :title="$t('message.ProMaterial.fileTitleType[1]')" :value='ValStatus(profile.gardens)' is-link @click.native='switchTo("gardens")'></cell>
      <cell :title="$t('message.ProMaterial.fileTitleType[2]')" :value='ValStatus(profile.tag)' is-link @click.native='switchTo("tag")'></cell>
      <cell :title="$t('message.ProMaterial.fileTitleType[3]')" :value='ValStatus(profile.project)' is-link @click.native='switchTo("project")'></cell>
    </group>
     </div>
     <div class="button-wrapper">
      <x-button type='primary' @click.native="confirm">{{$t('message.ProMaterial.ConfirmBtn')}}</x-button>
    </div>
  </div>
  </div>
</template>

<script>
import { Cell, Group, XButton } from 'vux'
import bgDivider from '@/components/bgDivider.vue'
import { ApplyFromData } from '../../utils/ApplyFromData'
import homeApi from '../../API/home'

export default {
  components: {
    Cell,
    Group,
    bgDivider,
    XButton
  },
  data() {
    return {
      PDF_url:
        localStorage.language === 'en'
          ? 'static/UNArt_en.pdf'
          : 'static/UNArt_cn.pdf',
      profile: {
        device: '', //东昌电影院材料
        gardens: '', //电影院室外园林设计方案
        tag: '', //整体标识系统设计方案
        project: '' //跨学科或跨媒体
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    //确认参赛提交信息
    confirm() {
      this.$vux.loading.show()
      let val = this.profile
      //判断是否填写信息
      if (
        val.gardens !== '' ||
        val.device !== '' ||
        val.tag !== '' ||
        val.project !== ''
      ) {
        this.$vux.loading.hide()
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
            homeApi.applyNow({
              data: ApplyFromData(),
              success(res) {
                _this.$vux.loading.hide()
                sessionStorage.setItem('userInfo', JSON.stringify(res.data))
                _this.$vux.alert.show({
                  buttonText: _this.$t('message.defaule.confirm_text'),
                  title: _this.$t('message.defaule.AlertTitle'),
                  content: _this.$t('message.ProMaterial.successText')
                })
                localStorage.removeItem('ApplyFrom')
                _this.$router.push({ path: '/' })
              },
              error(res) {
                _this.$vux.loading.hide()
                _this.$vux.alert.show({
                  buttonText: _this.$t('message.defaule.confirm_text'),
                  title: _this.$t('message.defaule.AlertTitle'),
                  content: res.msg
                })
                _this.$router.push({ path: '/' })
                document.querySelector('.vux-header-title span').innerHTML =
                  'UNArt'
              }
            })
          }
        })
      } else {
        this.$vux.loading.hide()
        //超过提示
        this.$vux.alert.show({
          buttonText: this.$t('message.defaule.confirm_text'),
          title: this.$t('message.defaule.AlertTitle'),
          content: this.$t('message.ProMaterial.exceedBtn')
        })
      }
    },
    //获取报名用户信息
    getUserInfo() {
      if (localStorage.ApplyFrom) {
        let ApplyFrom = ApplyFromData()
        this.profile = ApplyFrom.profile
      }
      this.$vux.loading.hide()
    },
    ValStatus(val) {
      return val
        ? this.$t('message.ProMaterial.ValStatus[0]')
        : this.$t('message.ProMaterial.ValStatus[1]')
    },
    switchTo(type) {
      let payload = null
      switch (type) {
        case 'device':
          payload = this.profile.device
          break
        case 'gardens':
          payload = this.profile.gardens
          break
        case 'tag':
          payload = this.profile.tag
          break
        case 'project':
          payload = this.profile.project
          break
      }
      this.$router.push({
        path: 'ApplyModify',
        query: {
          type,
          payload
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ProMaterial {
  font-size: 13px;
  padding: 0 1rem;
  .title {
    padding: 10px 0 5px 0;
  }
  p {
    padding: 0 10px;
  }
}
.pdf {
  width: 100%;
  height: 100%;
  .cpdf {
    position: fixed;
    top: 2.5rem;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    z-index: 99999;
    justify-content: center;
    align-items: center;
    .center {
      width: 100%;
      text-align: center;
      height: 100%;
      overflow: auto;
      padding-top: 20px;
      .contor {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
<style lang="less">
.ProMaterial {
  .vux-cell-bd .vux-cell-primary {
  }
  .weui-cell:before {
    border: none;
  }
  .weui-cell_access {
    border: 1px solid #ccc;
    border-radius: 6px;
    margin: 10px 0;
  }
  .vux-label {
    width: 80%;
    font-size: 13px !important;
  }
  .weui-cell__ft {
    font-size: 13px !important;
  }
}
</style>
