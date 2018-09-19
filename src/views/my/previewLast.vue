<template>
  <div>
    <div class="picInfo">
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
      <p style="font-size:15px">《{{name}}》</p>
      <p>{{author}}/{{complete}}</p>
      <p>{{type}}</p>
      <p>{{info}}</p>
      <div v-transfer-dom>
        <previewer :list="picArrB" v-if="true" ref="previewer" :options="options"></previewer>
      </div>
    </div>
    <div class="button-wrapper">
      <x-button type='primary' @click.native='upBtn'>{{$t('message.defaule.upload')}}</x-button>
    </div>
  </div>
</template>  

<script>
import userInfoApi from '../../API/my'
import editProApi from '../../API/my/editPro'
import bgPicture from '@/components/bgPicture'
import productionData from '@/views/production'
import detailApi from '../../API/production/detail'
import uploadPic from '../../components/uploadPic'
import {
  Divider,
  Swiper,
  SwiperItem,
  Previewer,
  TransferDom,
  XButton
} from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Swiper,
    Divider,
    bgPicture,
    Previewer,
    SwiperItem,
    XButton
  },
  data() {
    return {
      pnum: 2,
      author: '',
      video: '',
      typeInd: 0,
      type: '',
      name: '',
      complete: '2017.6.21',
      commentListArr: [],
      avatar: 'static/img/1.png',
      info: '',
      picArr: [],
      picArrB: [],
      Vname: '',
      videoPic: {
        background: '',
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
    this.getUserInfo()
    this.$vux.loading.hide()
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
    getUserInfo() {
      let _this = this
      if (sessionStorage.userInfo) {
        this.fileImg_url = JSON.parse(sessionStorage.userInfo).avatar
        this.$vux.loading.hide()
        this.detial()
      } else {
        userInfoApi.userInfo({
          success(res) {
            _this.fileImg_url = res.data.avatar
            sessionStorage.setItem('userInfo', JSON.stringify(res.data))
            _this.detial()
          }
        })
      }
    },
    upBtn() {
      let _this = this
      let data = JSON.parse(localStorage.dataPro)
      delete data.videoImg
      // console.log(data)
      editProApi.editPro({
        data: data,
        success(res) {
          _this.$vux.loading.hide()
          _this.$router.go(-3)
        },
        error(res) {
          _this.lock = true
          _this.alertFun(res.msg)
        }
      })
    },
    detial() {
      let _this = this
      let proInfo = JSON.parse(localStorage.dataPro)
      let userInfo = JSON.parse(sessionStorage.userInfo)
      if (proInfo.type !== 5) {
        proInfo.pic.map(item => {
          _this.picArr.push({ src: item })
        })
        let picArrB = []
        proInfo.pic.map(item => {
          _this.picArrB.push({ src: item + '?x-oss-process=image/resize,w_' + _this.getWidth() })
        })
      } else {
        this.video = proInfo.video
        this.Vname = proInfo.video_name
        this.videoPic['background'] = 'url(' + proInfo.videoImg + ')'
      }
      this.typeInd = proInfo.type
      this.type = this.typeVal(proInfo.type)
      this.name = proInfo.title
      this.info = proInfo.desc
      this.complete = proInfo.complete
      this.author = userInfo.nickname
        ? userInfo.nickname
        : userInfo.mobile ? userInfo.mobile : userInfo.email
    },
    uploadPro() {
      let _this = this
      let data = {
        id: this.$route.query.id,
        title: this.pname,
        type: this.typeInd,
        complete: this.time,
        desc: this.proinfo
      }
      if (this.typeInd !== 5) {
        data.pic = this.OssArr
      } else {
        data.video = this.OssArr[0]
      }

      console.log(data)
      // editProApi.editPro({
      //   data: data,
      //   success(res) {
      //     _this.$vux.loading.hide()
      //     _this.$router.go(-1)
      //   },
      //   error(res) {
      //     _this.lock = true
      //     _this.alertFun(res.msg)
      //   }
      // })
    },
    imgZoom(index) {
      this.$refs.previewer.show(index)
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
<style lang="less" scoped>
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
.picInfo {
  img {
    width: 100%;
  }
  font-size: 14px;
  text-align: center;
  p:last-child {
    padding: 10px;
    text-align: left;
  }
}

.comment {
  padding-top: 1rem;
  font-size: 13px;
  .title {
    background-color: #ececec;
    padding-left: 1rem;
    letter-spacing: 4px;
    height: 1.5rem;
    line-height: 1.5rem;
  }
  .commentList {
    padding: 0 10px;
    .item {
      padding: 0.5rem 0; // display: flex;
      p {
        // width: 100%;
        color: black;
      }
      .Himg {
        display: inline-block;
        margin: 0 0.5rem 0 0;
        img {
          width: 2rem;
          height: 2rem;
          border-radius: 100%;
        }
      }
      .itemCont {
        display: inline-block;
      }
    }
  }
}

.personinfo-box-down {
  display: flex;
  margin-top: 4rem;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    margin: 0.5rem;
    margin-top: 0.7rem;
  }
  .personinfo-wrapper {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .name {
      font-size: 18px;
      font-weight: bold;
    }
    .signature {
      font-size: 13px;
      color: @font_grey;
    }
  }
}

.button-wrapper {
  padding: 0 20px;
  margin-top: 80px;
}
</style>
<style lang="less">
// .vux-swiper {
//   .swiperItem {
//     width: 100%;
//   }
// }
</style>
