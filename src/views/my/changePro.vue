<template>
  <div class="changePro">
    <div class="Proinfo">
      <group>
        <x-input :title="$t('message.uploadPro.pname')" v-model="pname" required :placeholder="$t('message.uploadPro.pnamePlaceholder')" placeholder-align="right" text-align="right"></x-input>
        <cell :title="$t('message.uploadPro.type')" :value='type' is-link @click.native="show = true"></cell>
        <datetime :title="$t('message.uploadPro.time')" v-model="time" :min-year="1900" :max-year="maxYear" :cancel-text="$t('message.defaule.cancel_text')" :confirm-text="$t('message.defaule.confirm_text')"></datetime>
        <cell :title="$t('message.uploadPro.proTextarea')" class="proTextarea"></cell>
        <x-textarea v-model='proinfo' class='area' :rows="6" :cols="3" :placeholder="$t('message.uploadPro.areaPlaceholder')"></x-textarea>
      </group>
      <actionsheet v-model="show" :menus="menus5" show-cancel @on-click-menu="click5"></actionsheet>
    </div>
    <upload-pic :uploadType="uploadType" :imgArr.sync="imgArr" :delID.sync="delStr" :alreadyPic="alreadyPic"/>
    <div class="button-wrapper">
      <x-button type='primary' @click.native='upBtn'>{{$t('message.defaule.changeText')}}</x-button>
    </div>
    <div class="preview">

    </div>
  </div>
</template>

<script>
import editProApi from '../../API/my/editPro'
import detailApi from '../../API/production/detail'
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
  data() {
    return {
      upNum: 0,
      lock: true,
      maxYear: new Date().getFullYear(),
      pname: '',
      type: this.$t('message.uploadPro.ProTypeList[4]'),
      typeVal: 4,
      time: '2017-01-01',
      proinfo: '',
      imgArr: [],
      OssArr: [],
      Vname: '',
      alreadyPic: [],
      delStr: null,
      show: false,
      uploadType: 'img',
      menus5: [
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
  computed: {},
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
    if (this.$route.query.id) {
      this.detail(this.$route.query.id)
    }
    if (this.$route.query.type) {
      this.ApplyPro(this.$route.query.value)
    }
  },
  methods: {
    ApplyPro(val) {
      let _this = this
      let index = parseInt(val)
      let ApplyPro = ApplyFromData().works[index]
      this.$vux.loading.hide()
      this.type = this.typeSwitch(ApplyPro.type)
      this.typeVal = ApplyPro.type
      this.time = ApplyPro.complete
      this.proinfo = ApplyPro.desc
      this.pname = ApplyPro.title
      this.Vname = ApplyPro.video_name
      if (this.typeVal === 5) {
        this.$nextTick(() => {
          let OssHost =
            'http://unart-output.oss-cn-shanghai.aliyuncs.com/snapshot/'
          let data = [{
            video: ApplyPro.video,
            pic_url: OssHost + ApplyPro.video_name + '/0001.jpg'
          }]
          this.alreadyPic = data
        })
      } else {
        this.$nextTick(() => {
          this.alreadyPic = ApplyPro.pic
        })
      }
    },
    upBtn() {
      //上传按钮
      if (!this.pname) {
        this.alertFun('画作名字不能为空')
        return false
      } else if (!this.proinfo) {
        this.alertFun('画作介绍不能为空')
        return false
      } else if (this.imgArr.length < 1) {
        this.alertFun('亲，作品得传的！')
        return false
      }
      this.$vux.loading.show({ text: '上传中...' })
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
          this.OssArr[0] = this.imgArr[0]
        }
      }
      setTimeout(this.uploadTime, 1000)
    },
    detail(id) {
      let _this = this
      detailApi.detail(
        {
          success(res) {
            _this.$vux.loading.hide()
            _this.type = _this.typeSwitch(res.data.type)
            _this.typeVal = res.data.type
            _this.id = res.data.id
            _this.pname = res.data.title
            if (_this.typeVal === 5) {
              let data = [{
                video: res.data.video[0].video_url,
                pic_url: res.data.picture[0].pic_url
              }]
              _this.alreadyPic = data
            } else {
              _this.alreadyPic = res.data.picture
            }
            _this.time = res.data.complete
            _this.proinfo = res.data.desc
          }
        },
        id
      )
    },
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
          this.uploadPro()
        }
      } else {
        setTimeout(this.uploadTime, 1000)
      }
    },
    uploadPro() {
      let _this = this
      let data = {
        id: this.$route.query.id,
        title: this.pname,
        type: this.typeVal,
        complete: this.time,
        desc: this.proinfo
      }
      if (this.delStr) {
        data.del_id = this.delStr.substr(0, this.delStr.length - 1)
      }
      if (this.uploadType === 'img') {
        data.pic = this.OssArr
      } else {
        data.video = this.OssArr[0]
        if (this.Vname) data.video_name = this.Vname
        // data.video_name = this.alreadyPic[0].pic_url
      }
      if (!this.$route.query.type) {
        localStorage.setItem('dataPro', JSON.stringify(data))
        this.$vux.loading.hide()
        this.$router.push({ path: '/previewLast' })
      } else {
        setTimeout(function() {
          delete data.id
          _this.$vux.loading.hide()
          ApplyFromData('Set', 'works', _this.$route.query.value, data)
          _this.$router.go(-1)
        }, 1500)
      }
    },
    //弹出组件
    alertFun(content, title = '提示') {
      this.$vux.alert.show({
        title: title,
        content: content
      })
    },
    //类型转化
    typeSwitch(type) {
      switch (type) {
        case 1:
          return this.$t('message.uploadPro.ProTypeList[1]')
        case 2:
          return this.$t('message.uploadPro.ProTypeList[2]')
        case 3:
          return this.$t('message.uploadPro.ProTypeList[3]')
        case 4:
          return this.$t('message.uploadPro.ProTypeList[4]')
        case 5:
          return this.$t('message.uploadPro.ProTypeList[5]')
        default:
          return this.$t('message.uploadPro.ProTypeList[6]')
      }
    },
    switchTo(type) {
      let payload = null
      switch (type) {
        case '6':
          payload = this.pname
          break
      }
      this.$router.push({
        path: 'personalModify',
        query: {
          type,
          payload
        }
      })
    },
    click5(key, item) {
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
.proImg {
  padding: 5px 0;
  img {
    width: 100%;
  }
}

.Proinfo {
  border-top: 10px solid #eee;
}
</style>
<style lang='less'>
@fontSize: 14px;
.changePro {
  .weui-cells {
    font-size: @fontSize !important;
  }
  .vux-label {
    white-space: nowrap !important;
    width: 60px;
  }
}
.weui-textarea{
  padding:5px
}
.area {
  textarea {
    border: 1px solid #ccc;
    
  }
  &:before {
    border: none !important;
  }
  padding-top: 0 !important;
  height: 130px;
  font-size: 14px;
}

// .weui-cell:before{
//   border:none !important;
// }
.button-wrapper {
  padding: 0 20px;
  margin: 40px 0;
}
</style>
