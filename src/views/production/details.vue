<template>
  <div>
    <div class="picInfo">
      <swiper height="210px" dots-position="center" v-if="typeInd !== 5">
        <swiper-item class="swiperItem" v-for="(item, index) in picArr" :key="index">
          <div class="swiper-info">
            <img class="swiper-img" :src="item.src" @click="imgZoom(index)">
          </div>
        </swiper-item>
      </swiper>
      <div class="video" v-else :style="videoPic" style="">
      <video id="videoDiv" :src="video" controls style="width:100%"></video>
      </div>
      <p style="font-size:15px;margin-top:10px">《{{name}}》</p>
      <p>{{author}}/{{date}}</p>
      <p>{{type}}</p>
      <p style="color:#999;font-size:13px">{{info}}</p>
      <div v-transfer-dom>
        <previewer :list="picArrB" v-if="true" ref="previewer" :options="options"></previewer>
      </div>
    </div>
    <div class="personinfo-box-down vux-1px-t vux-1px-b" @click="detailAuthor">
      <img :src="avatar">
      <div class="personinfo-wrapper">
        <p class="name">{{author}}</p>
        <p class="signature ellipsis">{{pnum}}{{$t('message.details.PnumText')}}</p>
      </div>
    </div>
    <div class="comment">
      <p class="title">{{$t('message.details.commentTItle')}}</p>
      <div class="commentList" style="min-height:100px" v-if="listBool">
        <div class="item vux-1px-b" v-for="(item,index) in commentListArr" :key="index">
          <div class="Himg">
            <img :src="item.avatar">
          </div>
          <div class="itemCont">
            <p>
              <span>{{item.name}}</span>
            </p>
            <p>{{item.content}}</p>
            <timeago class="timeSpan" :since="timeChange(item.created_at)"></timeago>
            <!-- <span class="timeSpan">{{timeagoFun(item.created_at)}}</span> -->
          </div>
        </div>
      </div>
      <div v-if="!listBool" class="noneComment">
        <divider style="font-size:12px">{{$t('message.details.NullCommentText')}}</divider>
      </div>
    </div>
  </div>
  </div>
</template>  

<script>
import Vue from 'vue'
import bgPicture from '@/components/bgPicture'
import productionData from '@/views/production'
import detailApi from '../../API/production/detail'
import commentApi from '../../API/production/commentList'
import wechatConfig from '../../API/wechat/wechat.config'
import { Divider, Swiper, SwiperItem, Previewer, TransferDom } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Swiper,
    Divider,
    bgPicture,
    Previewer,
    SwiperItem
  },
  data() {
    return {
      pnum: 2,
      video: '',
      typeInd: 0,
      authorId: 0,
      type: this.$t('message.uploadPro.ProTypeList[4]'),
      name: '',
      author: '',
      listBool: true,
      date: '',
      commentListArr: [],
      avatar: '',
      info: '',
      picArr: [
        { pic_url: 'static/img/swiperimg1.jpg' }
      ],
      picArrB: [],
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
  computed: {
    shareURL() {
      return (
        'http://m.unart.art-geeks.com.cn/#/details?id=' + this.$route.query.id
      )
    }
  },
  created() {
    this.detail(this.$route.query.id)
    this.commentList(this.$route.query.id)
    this.$nextTick(() => {
      this.getWechatConfig()
    })
  },
  methods: {
    timeChange(time) {
      let timeVal = time.replace(/-/g, '/')
      return timeVal
    },
    //微信分享
    getWechatConfig() {
      let _this = this
      wechatConfig.wxConfig({
        type: 'GET',
        params: {
          url: encodeURIComponent(location.href.split('#')[0])
        },
        success(res) {
          res.data.jsApiList[0] = 'onMenuShareTimeline'
          res.data.jsApiList[1] = 'onMenuShareAppMessage'
          let wx = Vue.wechat
          wx.config(res.data)
          wx.error(err => {
            console.log(err)
          })
          _this.wechatOnShare(wx)
        },
        error(res) {
          console.log(res)
        }
      })
    },
    wechatOnShare(wx) {
      wx.ready(() => {
        // alert('wechat ready')
        wx.onMenuShareAppMessage({
          title: 'UNArt', // 分享标题
          desc: '其实每个人看到的自己都是不完整的，只能看到自己的影子。一切都从这里开始。',
          link: this.shareURL,
          imgUrl: 'http://unart.oss-cn-shanghai.aliyuncs.com/photos/UNArt.ico'
        })
        wx.onMenuShareTimeline({
          title: 'UNArt', // 分享标题
          link: this.shareURL,
          imgUrl: 'http://unart.oss-cn-shanghai.aliyuncs.com/photos/UNArt.ico'
        })
      })
    },
    getSize() {
      let windowsW = window.screen.availWidth
      let imgW = 'w_' + windowsW
      let imgH = 'h_' + parseInt(windowsW / 16 * 9)
      return imgW + ',' + imgH
    },
    getWidth() {
      return window.screen.availWidth
    },
    detailAuthor() {
      this.$router.push({ path: '/detailAuthor', query: { id: this.authorId } })
    },
    imgZoom(index) {
      this.$refs.previewer.show(index)
    },
    detail(id) {
      let _this = this
      detailApi.detail(
        {
          success(res) {
            let picArr = []
            let picArrB = []
            _this.$vux.loading.hide()
            _this.info = res.data.desc
            _this.name = res.data.title
            _this.typeInd = res.data.type
            _this.date = res.data.complete
            res.data.picture.map(item => {
              picArr.push({ src: item.pic_url + '?x-oss-process=image/resize,m_pad,' + _this.getSize() + ',color_000000' })
            })
            res.data.picture.map(item => {
              picArrB.push({ src: item.pic_url + '?x-oss-process=image/resize,w_' + _this.getWidth() })
            })
            _this.picArr = picArr
            _this.picArrB = picArrB
            _this.authorId = res.data.user_id
            if (res.data.users.avatar) {
              _this.avatar = res.data.users.avatar + '?x-oss-process=image/resize,w_100'
            } else {
              _this.avatar = res.data.users.avatar ? res.data.users.avatar : 'static/img/1.png'
            }
            _this.author = res.data.users.nickname
            _this.pnum = res.data.users.paint_count
            _this.type = _this.typeVal(res.data.type)
            if (_this.typeInd === 5) {
              _this.video = res.data.video[0].video_url
              if (res.data.picture.length) {
                _this.videoPic['background'] =
                  'url(' + res.data.picture[0].pic_url + ')'
              }
            }
          }
        },
        id
      )
    },
    commentList(id) {
      let _this = this
      commentApi.commentList(
        {
          type: 'GET',
          success(res) {
            _this.commentListArr = res.data.list
            if (_this.commentListArr.length === 0) _this.listBool = false
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
        default:
          return this.$t('message.uploadPro.ProTypeList[6]')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.picInfo {
  img {
    width: 100%;
  }
  font-size: 14px;
  color: #000;
  text-align: center;
  p:last-child {
    padding: 10px;
    padding-top: 20px;
    text-align: left;
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
.comment {
  padding-top: 1rem;
  font-size: 14px;
  .title {
    color: #000;
    background-color: #ececec;
    padding-left: 1rem;
    height: 2.5rem;
    line-height: 2.5rem;
  }
  .commentList {
    padding: 0 10px;
    .item {
      position: relative;
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
      .timeSpan{
        position:absolute;
        right:0;
        top:20px
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
      color: #000;
      font-size: 18px;
      font-weight: bold;
    }
    .signature {
      font-size: 13px;
      color: @font_grey;
    }
  }
}
</style>
<style lang="less">
.vux-swiper {
  .swiperItem {
    width: 100%;
    background-color: #000;
  }
}
</style>
