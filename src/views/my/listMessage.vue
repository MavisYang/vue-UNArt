<template>
<div class="msgList">
  <div v-infinite-scroll="HloadMore" infinite-scroll-disabled="MLine" infinite-scroll-distance="100">
    <!-- <div class="divider-box"></div> -->
    <section class="cell-info vux-1px-b" v-for='(item,index) in MList' :key='index' @click='checkMore(index)'>
      <img class="cell-img" src="static/img/UNArt.png">
      <div class="cell-wrapper">
        <div class="cell-host">
          <p class="cell-host-left">{{item.title}}</p>
          <timeago class="cell-host-right" :since="timeChange(item.created_at)"></timeago>
          <!-- <p>{{timeagoFun(item.created_at)}}</p> -->
        </div>
        <p class="cell-message ellipsis" v-html="item.content"></p>
      </div>
    </section>
     <divider style="font-size:12px" v-show="MLine">{{$t('message.defaule.dividerText')}}</divider>
  </div>
  </div>
</template>
<script>
import msgApi from '../../API/my/message'
import { Divider } from 'vux'

export default {
  components: {
    Divider
  },
  data() {
    return {
      MList: [],
      Mpage: 1,
      MLine: false,
      Mlock: true
    }
  },
  created() {
    // this.getMsg()
  },
  methods: {
    timeChange(time) {
      let timeVal = time.replace(/-/g, '/')
      return timeVal
    },
    getMsg() {
      let _this = this
      let data = {
        page: this.Mpage
      }
      msgApi.msgList({
        params: data,
        type: 'GET',
        success(res) {
          let meta = res.data.meta.pagination
          let list = res.data.list
          _this.Mlock = true
          _this.MList.push(...list)
          _this.Mpage++
          if (meta.current_page === meta.total_pages) {
            _this.MLine = !_this.MLine
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
      if (!this.Mlock) {
        return false
      }
      this.Mlock = false
      if (!this.MLine) this.getMsg()
    },
    checkMore(index) {
      this.$router.push({
        path: '/detailMessage',
        query: {
          id: this.MList[index].id
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../theme.less';
.msgList {
  height: 100%;
  overflow-y: scroll;
  .divider-box {
    background-color: #f2f2f2;
    height: 10px;
  }

  .cell-info {
    position: relative;
    display: flex;
    align-items: center;
    padding: 15px;
    .cell-img {
      width: 45px;
      height: 45px;
      margin-right: 10px;
      // border-radius: 100%;
    }
    .cell-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      .cell-host {
        display: flex;
        justify-content: space-between;
        .cell-host-left {
          font-size: 16px;
        }
        .cell-host-right {
          position: absolute;
          right: 10px;
          top: 25px;
          font-size: 16px;
          color: @font_grey;
        }
      }
      .cell-message {
        width: 150px;
        height: 30px;
        font-size: 16px;
      }
    }
  }
}
</style>
<style type="text/css">

</style>
