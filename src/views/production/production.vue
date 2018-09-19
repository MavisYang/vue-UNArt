<template>
  <div class="production" id="production">
    <sticky scrollBox="production" :check-sticky-support="false" :offset="46">
    <tab :line-width="3" :custom-bar-width="getBarWidth" active-color='#000' v-model="index" class=" vux-1px-t">
      <tab-item class="vux-center tabL" v-for="(item, index) in tabHead" :key="index">
        <p>{{item}}</p>
      </tab-item>
    </tab>
    </sticky>
    <swiper v-model="index" height="100%" :show-dots="false" :threshold="150">
      <!-- <swiper-item key="0">
        <div key="0" class="tabContent" id="recommend">
          <div  class="content" v-infinite-scroll="RloadMore" infinite-scroll-disabled="RLine" infinite-scroll-distance="100">
            <Pro-picture :data="item" v-for="(item,index) in RList" :key="'R' + index" container="#recommend"> </Pro-picture>
            <divider style="font-size:12px" v-show="RLine">{{$t('message.defaule.dividerText')}}</divider>
          </div>
        </div>
      </swiper-item>
      <swiper-item key="1">
        <div key="1" class="tabContent" id="shortlisted">
          <div class="content" v-infinite-scroll="SloadMore" infinite-scroll-disabled="SLine" infinite-scroll-distance="100">
            <Pro-picture :data="item" v-for="(item,index) in SList" :key="'S' + index" container="#shortlisted"> </Pro-picture>
            <divider style="font-size:12px" v-show="SLine">{{$t('message.defaule.dividerText')}}</divider>
          </div>
        </div>
      </swiper-item> -->
      <swiper-item key="2">
        <div key="2" class="tabContent" id="history">
          <div class="content" v-infinite-scroll="HloadMore" infinite-scroll-disabled="HLine" infinite-scroll-distance="100">
            <Pro-picture :data="item" v-for="(item,index) in HList" :key="'H' + index" container="#history"> </Pro-picture>
            <divider style="font-size:12px" v-show="HLine">{{$t('message.defaule.dividerText')}}</divider>
          </div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { Tab, TabItem, Divider, XButton, Swiper, Sticky, SwiperItem } from 'vux'
import infiniteScroll from 'vue-infinite-scroll'
import ProPicture from '@/components/ProPicture'
import proApi from '../../API/production'
export default {
  components: {
    Tab,
    Sticky,
    Swiper,
    Divider,
    TabItem,
    XButton,
    ProPicture,
    SwiperItem
  },
  data() {
    return {
      tabHeadStatus: false,
      //推荐作品参数
      RList: [],
      Rpage: 1,
      RLine: false,
      Rlock: true,
      //入围作品参数
      SList: [],
      Spage: 1,
      SLine: false,
      Slock: true,
      //历史作品参数
      HList: [],
      Hpage: 1,
      HLine: false,
      Hlock: true,
      //头部信息
      tabHead: [this.$t('message.production.tabHead[2]')],
      index: 0,
      //tabItem底线宽度调整
      getBarWidth: function(index) {
        return (index + 3) * 22 + 'px'
      }
      //点赞函数
      // choose: function() {
      //   return this.like === 0 ? 'fa-heart-o' : 'fa-heart'
      // }
    }
  },
  methods: {
    initstop() {
      document.body.addEventListener('touchmove', function(e) {
        e.stopPropagation
        e.preventDefault
      })
    },
    List(type) {
      let _this = this
      let data = {
        page:
          type === 'recommend'
            ? this.Rpage
            : type === 'shortlisted' ? this.Spage : this.Hpage
      }
      proApi.list(
        {
          params: data,
          type: 'GET',
          success(res) {
            _this.$vux.loading.hide()
            let meta = res.data.meta.pagination
            let list = res.data.list
            if (type === 'recommend') {
              _this.Rlock = true
              _this.RList.push(...list)
              _this.Rpage++
              if (meta.current_page === meta.total_pages) {
                _this.RLine = !_this.RLine
              }
            } else if (type === 'shortlisted') {
              _this.Slock = true
              _this.SList.push(...list)
              _this.Spage++
              if (meta.current_page === meta.total_pages) {
                _this.SLine = !_this.SLine
              }
            } else if (type === 'history') {
              _this.Hlock = true
              _this.HList.push(...list)
              _this.Hpage++
              if (meta.current_page === meta.total_pages) {
                _this.HLine = !_this.HLine
              }
            }
          },
          error(res) {
            _this.$vux.loading.hide()
          }
        },
        type
      )
    },
    RloadMore() {
      if (!this.Rlock) {
        return false
      }
      this.Rlock = false
      if (!this.RLine) {
        this.List('recommend')
      }
    },
    SloadMore() {
      if (!this.Slock) {
        return false
      }
      this.Slock = false
      if (!this.SLine) this.List('shortlisted')
    },
    HloadMore() {
      if (!this.Hlock) {
        return false
      }
      this.Hlock = false
      if (!this.HLine) this.List('history')
    }
  }
}
</script>
<style lang='less' scoped>
.production{
  height: 100%;
}
.vux-tab {
  height: 40px !important;
}
  .vux-slider {
    height: 92.5%;
  }
.vux-tab .vux-tab-item {
  p {
    margin-top: 5px;
    height: 30px;
    line-height: 32px;
  }
  line-height: 35px !important;
}
.tabContent {
  height: 100%;
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
// .picture {
//   .text {
//     padding: 10px 0;
//     font-size: 9px;
//     p {
//       border-left: 2px solid #F29D39;
//       padding: 0px 10px;
//       margin: 0px 10px;
//     }
//   }
// }
</style>
<style  lang="less">

</style>
<style lang="less">

</style>