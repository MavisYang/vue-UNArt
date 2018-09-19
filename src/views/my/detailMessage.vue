<template>
  <div>
    <div class="divider-box"></div>
    <section class="cell-info">
      <img class="cell-img" :src="src">
      <div class="cell-wrapper">
        <p class="cell-message ellipsis">{{data.title}}</p>
        <div class="cell-host">
          <p class="cell-host-left">{{data.created_at}}</p>
        </div>
        <div v-html="data.content" class="cell-info"></div>
      </div>
    </section>
  </div>
</template>
<script>
import msgApi from '../../API/my/message'
export default {
  data() {
    return {
      src: 'static/img/UNArt.png',
      data: {}
    }
  },
  created() {
    this.getDetailMsg(this.$route.query.id)
  },
  methods: {
    getDetailMsg(id) {
      let _this = this
      msgApi.detailmsg({
        type: 'GET',
        success(res) {
          _this.$vux.loading.hide()
          _this.data = res.data
        }
      }, id)
    }
  }
}

</script>
<style lang='less' scoped>
@import '../../theme.less';
.divider-box {
  background-color: #f2f2f2;
  height: 10px;
}

.cell-info {
  display: flex;
  padding: 15px;
  .cell-img {
    width: 45px;
    height: 45px;
    margin-right: 10px;
    border-radius: 100%;
  }
  .cell-wrapper {
    display: flex;
    flex-direction: column;
    .cell-host {
      display: flex;
      .cell-host-left {
        font-size: 14px;
        margin-right: 10px;
      }
      .cell-host-right {
        font-size: 14px;
        color: @font_grey;
      }
    }
    .cell-message {
      font-size: 16px;
    }
    .cell-info {
      font-size: 14px;
      text-align: justify;
      padding: 10px 0;
    }
  }
}
</style>
<style type="text/css">

</style>
