<template>

  <div class="proItem" id="proItem">
    <sticky scrollBox="proItem" :check-sticky-support="false" :offset="44">
    <tab :line-width="3" :custom-bar-width="getBarWidth" active-color='#000' v-model="index" class=" vux-1px-t">
      <tab-item class="vux-center tabL" v-for="(item, index) in tabHead" :key="index">
        <p>{{item}}</p>
      </tab-item>
    </tab>
    </sticky>
    <swiper v-model="index" height="100%" :show-dots="false" :threshold="150">
      <!-- <swiper-item key="0">
        <div key="0" class="tabContent" id="contest">
          <Pro-picture :data="item" v-for="(item,index) in ProList" :key="'S' + index" variety="myPro" container="#contest"> </Pro-picture>
          <divider style="font-size:12px">{{$t('message.defaule.dividerText')}}</divider>
        </div>
      </swiper-item> -->
      <swiper-item key="1">
        <div key="1" class="tabContent" id="history">
          <div class="content" v-infinite-scroll="HloadMore" infinite-scroll-disabled="HLine" infinite-scroll-distance="100">
            <Pro-picture :data="item" v-for="(item,index) in HList" :key="'H' + index" variety="myPro" container="#history"> </Pro-picture>
            <divider style="font-size:12px" v-show="HLine">{{$t('message.defaule.dividerText')}}</divider>
          </div>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import ProPicture from '@/components/ProPicture'
import UseProApi from '../../API/my/UsePro'
import { Tab, TabItem, Divider, Swiper, Sticky, SwiperItem } from 'vux'
export default {
  components: {
    Tab,
    TabItem,
    Divider,
    Swiper,
    Sticky,
    SwiperItem,
    ProPicture
  },
  data() {
    return {
      //头部信息
      tabHead: [this.$t('message.MyProductiong.tabHead[1]')], //'推荐作品', '入围作品',
      index: 0,
      //历史作品参数
      HList: [],
      Hpage: 1,
      HLine: false,
      Hlock: true,
      //tabItem底线宽度调整
      getBarWidth: function(index) {
        return (index + 3) * 22 + 'px'
      },
      ProList: []
    }
  },
  created() {
    this.getUsePro()
    this.showOrHide()
  },
  methods: {
    showOrHide() {
      //判断按钮显示
      let nowTime = Date.parse(new Date())
      let applyStart = Date.parse(new Date(sessionStorage.apply_start))
      let applyEnd = Date.parse(new Date(sessionStorage.apply_end))
      let uploadStart = Date.parse(new Date(sessionStorage.upload_start))
      let uploadEnd = Date.parse(new Date(sessionStorage.upload_end))
      // console.log(uploadEnd)
      //报名时间内
      if (applyStart <= nowTime && nowTime <= applyEnd) {
        this.applyBtnStatus = true
      } else {
        this.applyBtnStatus = false
      }
      //上传参赛作品时间内
      if (uploadStart <= nowTime && nowTime <= uploadEnd) {
        this.uploadBtnStatus = true
      } else {
        this.uploadBtnStatus = false
      }
      this.$vux.loading.hide()
    },
    //获取用户参赛作品
    getUsePro() {
      let _this = this
      UseProApi.UsePro({
        success(res) {
          _this.$vux.loading.hide()
          _this.ProList = res.data
        }
      })
    },
    //获取用户历史作品
    getHistoryPro() {
      let _this = this
      let data = {
        page: this.Hpage
      }
      UseProApi.historyPro({
        params: data,
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
        },
        error(res) {
          console.log(res)
          _this.$vux.loading.hide()
        }
      })
    },
    //无限加载
    HloadMore() {
      if (!this.Hlock) {
        return false
      }
      this.Hlock = false
      if (!this.HLine) this.getHistoryPro()
    }
  }
}
</script>

<style lang="less" scoped>
.proItem {
  height: 100%;
  font-size: 14px;
  padding: 0 10px;
  .proList {
    p {
      height: 15px;
      line-height: 15px;
      border-left: 3px solid black;
      margin: 5px 0px;
      padding-left: 5px;
    }
  }

  .vux-slider {
    height: 92.5%;
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
}
</style>