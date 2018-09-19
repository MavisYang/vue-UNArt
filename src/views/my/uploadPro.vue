<template>
  <div class="uploadPro">

    <div class="Proinfo">
      <group>
        <x-input :title="$t('message.uploadPro.pname')" v-model="pname" required :placeholder="$t('message.uploadPro.pnamePlaceholder')" placeholder-align="right" text-align="right"></x-input>
        <cell :title="$t('message.uploadPro.type')" :value='type' is-link @click.native="show = true"></cell>
        <datetime :title="$t('message.uploadPro.time')" v-model="time" :min-year="1900" :max-year="maxYear" :cancel-text="$t('message.defaule.cancel_text')" :confirm-text="$t('message.defaule.confirm_text')"></datetime>
        <cell :title="$t('message.uploadPro.proTextarea')" class="proTextarea"></cell>
        <x-textarea v-model='proinfo' :show-counter="true" :max="150" class='area' :rows="6" :cols="3" :placeholder="$t('message.uploadPro.areaPlaceholder')"></x-textarea>
      </group>
      <actionsheet v-model="show" :menus="ProTypeList" show-cancel @on-click-menu="ProType"></actionsheet>
    </div>
    <upload-pic :uploadType="uploadType" :imgArr.sync="imgArr" />
    <div class="button-wrapper">
      <x-button type='primary' @click.native='intellectual'>{{$t('message.defaule.confirm_text')}}</x-button>
    </div>
  </div>
</template>

<script>
import uploadProApi from '../../API/my/uploadPro'
import { uploadSingleImg } from '@/utils/index'
import uploadPic from '../../components/uploadPic'
import { ApplyFromData } from '../../utils/ApplyFromData'
import {
  Cell,
  Group,
  Datetime,
  Actionsheet,
  XTextarea,
  XInput,
  XButton
} from 'vux'

export default {
  components: {
    uploadPic,
    Cell,
    Group,
    Datetime,
    Actionsheet,
    XTextarea,
    XInput,
    XButton,
    uploadSingleImg
  },
  beforeCreate() {
    let userInfo = JSON.parse(sessionStorage.userInfo)
    if (userInfo) {
    }
  },
  data() {
    return {
      upNum: 0,
      maxYear: new Date().getFullYear(),
      Progress: 0,
      lock: true,
      pname: '',
      type: this.$t('message.uploadPro.ProTypeList[4]'),
      typeVal: 4,
      time: '2017-01-01',
      proinfo: '',
      imgArr: [],
      OssArr: [],
      Vname: '',
      show: false,
      uploadType: 'img',
      ProTypeList: [
        {
          label: this.$t('message.uploadPro.ProTypeList[0]'),
          type: 'info'
        },
        {
          label: this.$t('message.uploadPro.ProTypeList[1]'),
          value: 1,
          otherProp: 'hey'
        },
        {
          label: this.$t('message.uploadPro.ProTypeList[2]'),
          value: 2,
          otherProp: 'hey'
        },
        {
          label: this.$t('message.uploadPro.ProTypeList[3]'),
          value: 3,
          otherProp: 'hey'
        },
        {
          label: this.$t('message.uploadPro.ProTypeList[4]'),
          // type: 'primary',
          value: 4,
          otherProp: 'hey'
        },
        {
          label: this.$t('message.uploadPro.ProTypeList[5]'),
          value: 5,
          otherProp: 'hey'
        },
        {
          label: this.$t('message.uploadPro.ProTypeList[6]'),
          value: 6,
          otherProp: 'hey'
        }
      ]
    }
  },
  watch: {
    upNum(val) {
      if (val <= this.imgArr.length - 1) {
        if (typeof this.imgArr[val] === 'object') {
          uploadSingleImg(this.imgArr[val], this.OssArr, val, this)
        } else {
          this.OssArr[val] = this.imgArr[val]
          this.upNum++
        }
      }
    },
    typeVal(newValue) {
      if (newValue === 5) this.uploadType = 'video'
      else this.uploadType = 'img'
    }
  },
  created() {
    this.$vux.loading.hide()
  },
  methods: {
    intellectual() {
      //上传按钮
      if (!this.pname) {
        this.alertFun(this.$t('message.uploadPro.AlertInfo[0]'))
        return false
      } else if (!this.proinfo) {
        this.alertFun(this.$t('message.uploadPro.AlertInfo[1]'))
        return false
      } else if (this.imgArr.length < 1) {
        this.alertFun(this.$t('message.uploadPro.AlertInfo[2]'))
        return false
      }
      //知识产权弹层信息
      let _this = this
      this.$vux.confirm.show({
        title: _this.$t('message.intellectual.title'),
        confirmText: this.$t('message.defaule.confirm_text'),
        cancelText: this.$t('message.defaule.cancel_text'),
        content:
          '<div class="intellectualInfo">' +
          _this.$t('message.intellectual.Info[0]') +
          _this.$t('message.intellectual.Info[1]') +
          _this.$t('message.intellectual.Info[2]') +
          _this.$t('message.intellectual.Info[3]') +
          '</div>',
        onConfirm() {
          _this.upBtn()
        }
      })
    },
    //上传信息
    upBtn() {
      this.$vux.loading.show({
        text: '上传中(0%)'
      })
      let _this = this
      if (!this.lock) return false
      if (this.uploadType === 'img') {
        //判断上传类型
        this.lock = false
        let upNum = this.upNum
        if (typeof this.imgArr[upNum] === 'object') {
          uploadSingleImg(this.imgArr[upNum], this.OssArr, upNum, _this)
        } else {
          let num = this.upNum
          this.OssArr[num] = this.imgArr[num]
          this.upNum++
        }
      } else {
        this.lock = false
        if (typeof this.imgArr[0] === 'object') {
          uploadSingleImg(
            _this.imgArr[0],
            _this.OssArr,
            0,
            _this,
            'Vname',
            'video'
          )
        } else {
          this.OssArr[0] = imgArr[0]
        }
      }
      setTimeout(this.uploadTime, 1000)
    },
    //上传进度检测
    uploadTime() {
      //上传等待
      let nullItem = false
      if (this.OssArr.length === this.imgArr.length) {
        for (let val of this.OssArr) {
          if (!val) nullItem = true
        }
        if (nullItem) {
          setTimeout(this.uploadTime, 1000)
        } else {
          // console.log('success')
          this.uploadPro()
        }
      } else {
        setTimeout(this.uploadTime, 1000)
      }
    },
    //提交接口
    uploadPro() {
      let _this = this
      let data = {
        title: this.pname,
        type: this.typeVal,
        complete: this.time,
        desc: this.proinfo
      }
      if (this.$route.query.history) {
        data.history = 1
      }
      if (this.uploadType === 'img') {
        data.pic = this.OssArr
      } else {
        data.video = this.OssArr[0]
        data.video_name = this.Vname
      }
      if (!this.$route.query.type) {
        uploadProApi.addPro({
          data: data,
          success(res) {
            setTimeout(function() {
              _this.$vux.loading.hide()
              _this.$router.go(-1)
            }, 1000)
          },
          error(res) {
            _this.lock = true
            _this.alertFun(res.msg)
          }
        })
      } else {
        setTimeout(function() {
          ApplyFromData('Set', 'works', _this.$route.query.value, data)
          _this.$router.push({ path: 'ApplyPro' })
        }, 1000)
      }
    },
    //提示函数
    alertFun(content, title = this.$t('message.defaule.AlertTitle')) {
      this.$vux.alert.show({
        title: title,
        content: content,
        buttonText: this.$t('message.defaule.confirm_text')
      })
    },
    change() {},
    // switchTo(type) {
    //   let payload = null
    //   switch (type) {
    //     case '6':
    //       payload = this.pname
    //       break
    //   }
    //   this.$router.push({
    //     path: 'personalModify',
    //     query: {
    //       type,
    //       payload
    //     }
    //   })
    // },
    //作品类型
    ProType(key, item) {
      if (!item) {
      } else {
        this.type = item.label
        this.typeVal = item.value
      }
    }
  }
}
</script>

<style lang='less' scoped>
@fontSize: 14px;
.uploadPro {
  .Proinfo {
    border-bottom: 10px solid #eee;
  }
  .consent {
    padding: 5px 0;
    font-size: 12px;
    vertical-align: top;
    span {
      vertical-align: top;
    }
    input {
      margin-top: 2px;
      display: inline-block;
      vertical-align: top;
      width: 14px;
      height: 14px;
    }
  }
}
</style>
<style lang='less'>
@fontSize: 14px;
.uploadPro {
  .intellectualInfo {
    font-size: 13px;
    text-align: left;
  }
  .uploadPro {
    .weui-cells {
      font-size: @fontSize !important;
    }
    .vux-label {
      white-space: nowrap !important;
      width: 60px;
    }
  }
  .weui-textarea {
    padding: 5px;
  }
  .area {
    textarea {
      border: 1px solid #ccc;
    }
    &:before {
      border: none !important;
    }
    padding-top: 0 !important;
    height: 150px;
    font-size: 14px;
  }

  .weui-dialog {
    background-color: initial !important;
  }

  .button-wrapper {
    padding: 0 20px;
    margin: 40px 0;
  }
}
</style>
