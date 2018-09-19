<template>
  <div class="homeDiv">
    <!-- <bg-picture :height='210'></bg-picture> -->
    <div class="banner" @click="signUp">
      <img src="static/img/swiperimg1.jpg" width="100%">
      <!-- <img class="slogan" src="static/img/slogan.png"> -->
    </div>
    <div class="info-box">
      <h3 class="title" style="width:100%;background:none;padding:0">{{$t('message.homeDate.titleHomeData.title')}}</h3>
      <h4 class="sub-title">{{$t('message.homeDate.titleHomeData.subTitle')}}</h4>
      <p class="paragraph" v-for="(item, index) in $t('message.homeDate.titleHomeData.paragraph')" :key="index">{{item}}</p>
    </div>
    <div class="info-box">
      <h3 class="title" style="margin:0 auto;width:80%;background-size: 270px;margin-bottom:20px">{{$t('message.homeDate.playData.Expert')}}</h3>
    </div>
    <swiper auto class="judge">
      <swiper-item v-for="(item, index) in expertsList" :key="index">
        <section class="swiper-info">
          <div>
            <img class="swiper-img" :src="item.avatar">
          </div>
          <div>
            <p class="swiper-name">{{item.name_en}}</p>
            <p class="swiper-role" >{{item.name}},{{item.title|textFormatEllipsis}}</p>
            <!-- <p class="swiper-details">{{item.info}}</p> -->
            <p class="swiper-checkmore" @click='checkMore(item)'>{{$t('message.homeDate.DetailButton')}}</p>
          </div>
        </section>
      </swiper-item>
    </swiper>
    <div class="info-box">
      <h3 class="title">{{$t('message.homeDate.playData.title')}}</h3>
      <p class="paragraph" v-for="(item, index) in $t('message.homeDate.playData.paragraph')" :key="index">{{item}}</p>
    </div>
    <swiper auto class="materials">
      <swiper-item v-for="(item, index) in $t('message.homeDate.materialsList')" :key="index">
        <section class="swiper-info">
          <div>
            <img class="swiper-img" :src="item.url">
          </div>
          <div>
            <p class="swiper-details">{{item.info}}</p>
          </div>
        </section>
      </swiper-item>
    </swiper>
    <div class="info-box">
      <h3 class="title" style="width:40%;background-size: 140px;">{{$t('message.homeDate.CollectRequirements.title')}}</h3>
      <p class="paragraph" v-for="(item, index) in $t('message.homeDate.CollectRequirements.paragraph')" :key="index">{{item}}</p>
    </div>
    <div class="info-box">
      <h3 class="title">{{$t('message.homeDate.CollectProcess.title')}}</h3>
      <img :src="src" id="flowImg" style="width:100%" alt="">
      <p class="paragraph" v-for="(item, index) in $t('message.homeDate.CollectProcess.paragraph')" :key="index">{{item}}</p>
    </div>
    <div class="info-box">
      <h3 class="title">{{$t('message.homeDate.CollectReward.title')}}</h3>
      <p class="paragraph" v-for="(item, index) in $t('message.homeDate.CollectReward.paragraph')" :key="index">{{item}}</p>
    </div>
    <!-- <div class="info-box">
      <h3 class="title" style="width:55%;background-size: 190px;">{{$t('message.homeDate.sponsors.title')}}</h3>
      <p class="paragraph" v-for="(item, index) in $t('message.homeDate.sponsors.paragraph')" :key="index">{{item}}</p>
    </div>
    <div class="info-box">
      <h3 class="title" style="width:55%;background-size: 190px;">{{$t('message.homeDate.sponsors.poepleTitle')}}</h3>
      <p class="paragraph" v-for="(item, index) in $t('message.homeDate.sponsors.poepleParagraph')" :key="index">{{item}}</p>
    </div> -->
    <div class="info-box">
      <h3 class="title" style="text-align:left;margin:0;width:100%;background-size: 150px;margin-top:60px;background-repeat:repeat-x">{{$t('message.homeDate.PartnersInfo.title')}}</h3>
      <div class="PartnersInfo" v-for="(item, index) in $t('message.homeDate.PartnersInfo.InfoItem')" :key="index">
        <p style="width:30%;padding-right:10%">{{item.title}}</p>
        <p style="width:69%">{{item.content}}</p>
      </div>
      <!-- <h3 class="title" style="width:130px">{{homeData.companyData.title}}</h3> -->
      <!-- <p class="paragraph textAlign-left" v-for="(item, index) in homeData.companyData.paragraph" :key="index">{{item}}</p> -->
      <!-- <p class="paragraph font-paragraph">{{$t('message.homeDate.companyData.slogon')}}</p> -->
      <!-- <p class="paragraph">
        作品征集时间：{{homeData.companyData.date}}
        <br> 公布入选名单：{{homeData.companyData.address}}
        <br> 入场布展： {{homeData.companyData.AdmissionTime}}
       <p style="margin-bottom: 10px">一部份作品奖品在2018.3开幕活动正式亮相</p>
      </p> -->
      </div>
      <div class="info-box">
        <a href="https://mp.weixin.qq.com/s/mfjq2CJFV23E7UP8fqEW1A" style="margin-top:30px;display:block">《征集系统使用说明书》</a>
        <div id="QRcode" style="padding-top:40px" :style="Qrcode">
        <p>关注UNArt官方微信，获得更多最新信息</p>
        <img src="static/img/QRcode.png" width="80%" alt="">
      </div>
        <div class="PartnersInfo">
          <p style="width:30%;padding-right:3px">{{$t('message.homeDate.Technical.title')}}</p>
          <p style="width:69%">{{$t('message.homeDate.Technical.content')}}</p>
        </div>
       </div>
      <div style="padding:30px 35px;">
        <x-button type='primary' class="marginB-25" :show-loading='showLoading' @click.native="signUp">{{$t('message.homeDate.homeButtonText')}}</x-button>
      </div>
  </div>
</template>
<script>
import expertsApi from '../../API'
import getTime from '../../API/home'
import userInfoApi from '../../API/my'
import bgPicture from '@/components/bgPicture'
import { textFormatEllipsis } from '@/filters'
import { Swiper, SwiperItem, XButton } from 'vux'

export default {
  data() {
    return {
      Qrcode: {
        display: localStorage.language !== 'en' ? 'show' : 'none'
      },
      src:
        localStorage.language === 'en'
          ? 'static/img/flowEn.png'
          : 'static/img/flowZn.png',
      expertsList: [],
      showLoading: false
    }
  },
  watch: {},
  created() {
    //获取评委列表
    this.scrollFun()
    this.$vux.loading.hide()
    this.getUserInfo()
    this.getExperts()
  },
  components: { bgPicture, Swiper, SwiperItem, XButton },
  methods: {
    scrollFun() {
      if (sessionStorage.HomeScroll) {
        let homeDiv = document.getElementById('vux_view_box_body')
        this.$nextTick(function() {
          homeDiv.scrollTop = sessionStorage.HomeScroll
        })
      }
    },
    getUserInfo() {
      //获取用户基础信息
      if (localStorage.HeadToken) {
        if (!sessionStorage.userInfo) {
          let _this = this
          userInfoApi.userInfo({
            success(res) {
              let userInfo = res.data
              if (userInfo.avatar) {
                userInfo.avatar += '?x-oss-process=image/resize,w_100'
              }
              sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
            },
            error(res) {
              _this.$vux.loading.hide()
              _this.$vux.alert.show({
                buttonText: _this.$t('message.defaule.confirm_text'),
                title: _this.$t('message.defaule.AlertTitle'),
                content: res.msg
              })
            }
          })
        }
      }
    },
    //获取评委列表
    getExperts() {
      if (sessionStorage.Experts) {
        this.expertsList = JSON.parse(sessionStorage.Experts)
        this.$vux.loading.hide()
      } else {
        let _this = this
        expertsApi.expertsList({
          type: 'GET',
          success(res) {
            sessionStorage.Experts = JSON.stringify(res.data.list)
            _this.$vux.loading.hide()
            _this.expertsList = res.data.list
          },
          error(res) {
            _this.$vux.loading.hide()
            _this.$vux.alert.show({
              buttonText: _this.$t('message.defaule.confirm_text'),
              title: _this.$t('message.defaule.AlertTitle'),
              content: res.msg
            })
          }
        })
      }
    },
    //我要参赛路由
    signUp() {
      //判断是否有历史登录记录
      if (sessionStorage.userInfo) {
        let userInfo = JSON.parse(sessionStorage.userInfo)
        if (userInfo.profile_status !== 1 && userInfo.profile_status !== 3) {
          this.$vux.alert.show({
            buttonText: this.$t('message.defaule.confirm_text'),
            title: this.$t('message.defaule.AlertTitle'),
            content: this.$t('message.homeDate.homeButtonAlert')
          })
          return false
        }
        this.showLoading = true
        this.$router.push({ path: '/EntryInformation' })
      } else {
        this.$router.push({ path: '/login' })
      }
    },
    //评委详情
    checkMore(item) {
      let homeDiv = document.getElementById('vux_view_box_body')
      sessionStorage.HomeScroll = homeDiv.scrollTop || homeDiv.pageYOffset
      this.$router.push({
        path: '/detailJury',
        query: {
          avatar: item.avatar,
          name: item.name,
          name_en: item.name_en,
          title: item.title,
          info: item.info
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.homeDiv {
  @import '../../theme.less';
  .PartnersInfo {
    font-size: 14px;
    padding-top: 10px;
    display: flex;
    p {
      font-size: 14px;
      text-align: left;
    }
  }
  .banner {
    height: 270px;
    overflow: hidden;
    position: relative;
    .slogan {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 65%;
    }
  }
  .info-box {
    font-size: 14px;
    text-align: center;
    padding: 0 25px;
    .title {
      width: 40%;
      margin: 0 auto;
      margin-top: 15px;
      padding-bottom: 15px;
      // border-bottom: 3px double #35495e;
      background: url('../../assets/img/underline.png') no-repeat;
      background-size: 130px;
      background-position-y: 30px;
    }
    .sub-title {
      margin-bottom: 15px;
      margin-top: 15px;
    }
    .paragraph {
      text-align:left;
      font-size: 14px;
      margin: 10px 0;
    }
    .font-paragraph {
      font-weight: bold;
      font-size: 20px;
    }
  }
  .judge {
    .swiper-info {
      padding: 20px 27px;
      display: flex;
      background-color: @bg_grey;
      .swiper-img {
        width: 100px;
        height: 140px;
        margin-right: 12px;
      }
      .swiper-name {
        font-size: 18px;
      }
      .swiper-role {
        font-size: 14px;
      }
      .swiper-details {
        font-size: 14px;
        color: @font_grey;
      }
      .swiper-checkmore {
        font-size: 14px;
        font-weight: bold;
        color: #aaa;
      }
    }
  }
  .materials {
    background-color: @bg_grey;
    .swiper-info {
      display: flex;
      .swiper-img {
        width: 200px;
        height: 120px;
        margin-left: 15px;
        margin-top: 30px;
      }
      .swiper-details {
        font-size: 13px;
        display: inline-block;
        margin-top: 30px;
        margin-left: 5px;
        width: 140px;
        height: 120px;
        overflow: hidden;
      }
    }
  }
  .textAlign-left {
    text-align: left;
  }
  .weui-btn {
    padding: 1px;
  }
}
</style>
