<template>
  <div class="uploadPro">
    <div class="Proinfo">
      <swiper height="180px" dots-position="center" v-if="typeInd !== 5">
        <swiper-item class="swiperItem" v-for="(item, index) in picArr" :key="index">
          <div class="swiper-info">
            <img style="min-width:375px" class="swiper-img" :src="item.src + '?x-oss-process=image/resize,m_pad,' + getSize() + ',color_000000'" @click="imgZoom(index)">
          </div>
        </swiper-item>
      </swiper>
      <div class="video" v-else :style="videoPic" style="">
      <video id="videoDiv" :src="video" controls style="width:100%"></video>
      </div>
      <div v-transfer-dom>
        <previewer :list="picArrB" v-if="true" ref="previewer" :options="options"></previewer>
      </div>
      <group>
        <cell :title="$t('message.uploadPro.pname')" v-model="name" text-align="right" ></cell>
        <cell :title="$t('message.uploadPro.type')" v-model='type'></cell>
        <cell :title="$t('message.uploadPro.time')" v-model="time" text-align="right" ></cell>
        <cell :title="$t('message.uploadPro.proTextarea')" class="proTextarea"></cell>
        <x-textarea v-model='proinfo' class='area' :rows="6" :cols="3" :readonly="true"></x-textarea>
      </group>
    </div>
    <div class="button-wrapper">
      <x-button type='primary' @click.native='changeFun'>{{$t('message.defaule.changeText')}}</x-button>
    </div>
  </div>
</template>

<script>
import editProApi from '../../API/my/editPro'
import detailApi from '../../API/production/detail'
import uploadProApi from '../../API/my/uploadPro'
import { uploadSingleImg } from '@/utils/index'
import uploadPic from '../../components/uploadPic'
import {
  Cell,
  Group,
  Datetime,
  Actionsheet,
  XTextarea,
  XInput,
  XButton,
  Swiper,
  SwiperItem,
  Previewer,
  TransferDom
} from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    uploadPic,
    Cell,
    Group,
    Datetime,
    Actionsheet,
    XTextarea,
    XInput,
    XButton,
    uploadSingleImg,
    Swiper,
    SwiperItem,
    Previewer
  },
  data() {
    return {
      name: '',
      type: this.$t('message.uploadPro.ProTypeList[4]'),
      time: '2017-01-01',
      proinfo: '',
      typeInd: 0,
      uploadType: 'img',
      picArr: [
        { pic_url: 'static/img/swiperimg1.jpg' },
        { pic_url: 'static/img/swiperimg1.jpg' }
      ],
      picArrB: [],
      videoPic: {
        'background': '',
        'background-size': 'cover'
      },
      options: {
        getThumbBoundsFn(index) {
          let thumbnail = document.querySelectorAll('.swiper-img')[index]
          let pageYScroll =
            window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
        }
      }
    }
  },
  created() {
    // this.$vux.loading.hide()
    this.detail(this.$route.query.id)
  },
  methods: {
    getSize() {
      let windowsW = window.screen.availWidth
      let imgW = 'w_' + windowsW
      let imgH = 'h_' + parseInt(windowsW / 16 * 9)
      return imgW + ',' + imgH
    },
    getWidth() {
      return window.screen.availWidth
    },
    imgZoom(index) {
      this.$refs.previewer.show(index)
    },
    changeFun() {
      this.$router.push({
        path: '/changePro',
        query: { id: this.$route.query.id }
      })
    },
    detail(id) {
      let _this = this
      detailApi.detail(
        {
          success(res) {
            let picArr = []
            let picArrB = []
            _this.$vux.loading.hide()
            _this.proinfo = res.data.desc
            _this.name = res.data.title
            _this.typeInd = res.data.type
            _this.date = res.data.complete
            if (res.data.type !== 5) {
              res.data.picture.map(item => {
                picArr.push({ src: item.pic_url })
              })
              res.data.picture.map(item => {
                picArrB.push({ src: item.pic_url + '?x-oss-process=image/resize,w_' + _this.getWidth() })
              })
              _this.picArr = picArr
              _this.picArrB = picArrB
            } else {
              if (res.data.picture.length) {
                _this.videoPic['background'] = 'url(' + res.data.picture[0].pic_url + ')'
              }
            }
            _this.authorId = res.data.user_id
            _this.avatar = res.data.users.avatar
            _this.author = res.data.users.nickname
            _this.pnum = res.data.users.paint_count
            _this.type = _this.typeVal(res.data.type)
            if (_this.typeInd === 5) _this.video = res.data.video[0].video_url
          }
        },
        id
      )
    },
    typeVal(type) {
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
        case 6:
          return this.$t('message.uploadPro.ProTypeList[6]')
        default:
          return this.$t('message.uploadPro.ProTypeList[6]')
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
.video {
  line-height: 0;
  position: relative;
  width: 100%;
  background-size: cover;
  img {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
<style lang='less'>
@fontSize: 14px;
.uploadPro {
  .weui-cells {
    font-size: @fontSize !important;
  }
  .vux-label {
    white-space: nowrap !important;
    width: 60px;
  }
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

.button-wrapper {
  padding: 0 20px;
  margin: 40px 0;
}
</style>
