<template>
  <div>
  	<div class="divider-box"></div>
    <div class="detailJury">
      <section class="swiper-info">
        <div style="width:110px">
        <img class="swiper-img" :src="avatar">
        </div>
        <div class="swiper-wrapper">
          <p class="swiper-name">{{name_en}},{{name}}</p>
         
        </div>
      </section>
      <section>
         <p class="swiper-role" style="padding-top:10px">{{title}}</p>
        <h5 class="marginTB-10">评委介绍</h5>
        <p class="paragraph">{{info}}</p>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      avatar: this.$route.query.avatar,
      name: this.$route.query.name,
      name_en: this.$route.query.name_en,
      title: this.$route.query.title,
      info: this.$route.query.info
    }
  },
  created() {
    this.$vux.loading.hide()
    this.scrollFun()
  },
  methods: {
    scrollFun() {
      let homeDiv = document.getElementById('vux_view_box_body')
      homeDiv.scrollTop = 0
    }
  }
}
</script>
<style lang='less' scoped>
.divider-box {
  background-color: #f2f2f2;
  height: 10px;
}
.detailJury {
  padding: 11px 22px;
  margin-top: 10px;
  background-color: #fff;
}

.swiper-info {
  padding-bottom: 10px;
  border-bottom: 2px solid #ccc;
  display: flex;
  .swiper-img {
    width: 110px;
    min-height: 110px;
    height: 140px;
  }
  .swiper-wrapper {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .swiper-name {
      font-size: 18px;
      padding-top: 90px;
    }

    .swiper-role {
      font-size: 14px;
    }
  }
}

.marginTB-10 {
  font-size: 16px;
}

.paragraph {
  font-size: 15px;
  margin: 5px 0;
  text-align: justify;
}
</style>
<style type="text/css">

</style>
