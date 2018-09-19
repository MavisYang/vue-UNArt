<template>
  <div class="detailAuthor">
    <div class="author">
      <div class="Himg">
        <i :class="data.gender === 2 ? 'woman' : 'man' "></i>
        <img :src="data.avatar || 'static/img/1.png'">
      </div>
      <p style="font-weight:500;font-size:17px">{{data.nickname}}</p>
      <p style="font-size:13px">{{picNum}}{{$t('message.details.PnumText')}}</p>
      <p>{{data.info}}</p>
    </div>

<!-- <sticky scrollBox="vux_view_box_body" :check-sticky-support="false" :offset="46"> -->
    <tab :line-width="3" :custom-bar-width="getBarWidth" active-color='#000' v-model="index" class="">
      <tab-item class="vux-center tabL" v-for="(item, index) in HeadTab" :key="index">
        <p class=" vux-1px-r">{{item}}</p>
      </tab-item>
    </tab>
    <!-- </sticky> -->
    <swiper v-model="index" height="540px" :show-dots="false" :threshold="150">
     <swiper-item key="0">
        <div key="0" class="tabContent">
          <div class="experience">
            <p style="color:#000">{{data.resume}}</p>
          </div>
        </div>
      </swiper-item> 
      <!-- <swiper-item key="1">
        <div key="1" class="tabContent" style="height: 540px;overflow-y: scroll;" id="paints">
          <div class="content">
            <Pro-picture :data="item" v-for="(item,index) in data.paints" :key="index" container="#paints"> </Pro-picture>
            <divider style="font-size:12px" v-show="DividerSta">我是有底线的</divider>
          </div>
        </div>
      </swiper-item>  -->
      <swiper-item key="2">
        <div key="2" class="tabContent" style="height: 540px;overflow-y: scroll;" id="history">
          <div class="content" v-infinite-scroll="HloadMore" infinite-scroll-disabled="HLine" infinite-scroll-distance="100">
            <Pro-picture :data="item" v-for="(item,index) in HList" :key="'H' + index" container="#history"> </Pro-picture>
            <divider style="font-size:12px" v-show="HLine">我是有底线的</divider>
          </div>
        </div>
      </swiper-item>
    </swiper>
    <!-- <tab :line-width="1" active-color='#F29D39' v-model="index">
      <tab-item class="vux-center tabL" selected @click="index = 0">
        <p class=" vux-1px-r">参赛经历</p>
      </tab-item>
      <tab-item class="vux-center" @click="index = 1">
        <p>参赛作品</p>
      </tab-item>
    </tab>
    <div class="tabContent">
      <div v-if="index == 0">
       
      </div>
      <div v-if="index == 1">
        
      </div>
    </div> -->
  </div>
</template>
<script>
import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
import detailApi from '../../API/production/detail'
import ProPicture from '@/components/ProPicture'
import historyData from '../../API/production'

export default {
  components: {
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem,
    ProPicture
  },
  data() {
    return {
      HeadTab: [this.$t('message.detailAuthor.HeadTab[0]'), this.$t('message.detailAuthor.HeadTab[2]')], 
      //历史作品参数
      HList: [],
      Hpage: 1,
      HLine: false,
      Hlock: true,
      index: 0,
      data: {
        id: 0,
        avatar: '',
        gender: 3,
        info: '',
        nickname: '',
        paints: [],
        resume: ''
      },
      author: '',
      DividerSta: false,
      picNum: 0,
      info: '',
      getBarWidth: function(index) {
        return (index + 3) * 22 + 'px'
      }
    }
  },
  created() {
    this.detailAuthor(this.$route.query.id)
    // this.historyData()
  },
  methods: {
    historyData() {
      let _this = this
      historyData.list(
        {
          data: {
            page: this.Hpage
          },
          type: 'GET',
          success(res) {
            let meta = res.data.meta.pagination
            let list = res.data.list
            _this.Hlock = true
            _this.HList.push(...list)
            _this.Hpage++
            if (meta.current_page === meta.total_pages) {
              _this.HLine = !_this.HLine
            }
            _this.$vux.loading.hide()
          }
        },
        'history',
        this.$route.query.id
      )
    },
    detail() {
      this.$router.push({ path: '/details', query: { id: this.data.id } })
    },
    HloadMore() {
      if (!this.Hlock) {
        return false
      }
      this.Hlock = false
      if (!this.HLine) this.historyData()
    },
    detailAuthor(id) {
      let _this = this
      detailApi.detailAuthor(
        {
          type: 'GET',
          success(res) {
            _this.$vux.loading.hide()
            _this.data = res.data
            if (_this.data.avatar) {
              _this.data.avatar += '?x-oss-process=image/resize,w_100'
            } else {
              _this.avatar = _this.data.avatar
            }
            _this.picNum = res.data.paints.length
            _this.DividerSta = true
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
      }
    }
  }
}
</script>
<style lang="less" scoped>
.detailAuthor{
.author {
  color: #000;
  padding-top: 30px;
  font-size: 14px;
  text-align: center;
  .Himg {
    display: inline-block;
    position: relative;
    margin-bottom: 1rem;
    img {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
    }
    i {
      position: absolute;
      display: inline-block;
      width: 1rem;
      height: 1rem; // background-color: blue;
      bottom: 10px;
      right: 2px;
      border-radius: 50%;
      z-index: 80;
      &.man {
        background: url('../../assets/img/man.png');
        background-size: cover;
      }
      &.woman {
        background: url('../../assets/img/woman.png');
        background-size: cover;
      }
    }
  }
  p:last-child {
    padding: 30px 10px;
    text-align: left;
  }
}

.experience {
  padding: 0 0.5rem;
  font-size: 13px;
  p {
  }
}

.picture {
  .text {
    padding: 10px 0;
    font-size: 9px;
    p {
      border-left: 2px solid #f29d39;
      padding: 0px 10px;
      margin: 0px 10px;
    }
  }
}

.tabL {
  // border-right: 1px solid #ccc !important;
}
}
</style>
<style  lang="less">
.detailAuthor{
.author {
.vux-tab {
  height: 40px !important;
}

.vux-tab .vux-tab-item {
  p {
    margin-top: 5px;
    height: 30px;
    line-height: 32px;
  }
  line-height: 35px !important;
}

.picture {
  img {
    width: 100%;
  }
  .text {
    padding: 10px 0;
    font-size: 9px;
    p {
      border-left: 2px solid #f29d39;
      padding: 0px 7px;
      margin: 0px 10px;
    }
  }
}
.vux-swiper-item .tabContent {
  padding-bottom: 20px;
  padding-top: 10px;
  height: 540px;
  overflow-y: scroll;
}
.vux-tab-ink-bar {
  height: 3px !important;
}

.vux-tab-selected {
  p {
    font-weight: 600;
  }
}
}
}
</style>
