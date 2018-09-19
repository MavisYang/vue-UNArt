<template>
  <div class="picture" style="min-height:200px" @click="detail(variety)">
    <img class="typeIcon" style="width:50px" v-if="data.status === 0 || data.status === 1 || data.status === 2" :src="typeIcon(data.status)">
    <x-img v-if="data.picture.pic_url" default-src="static/img/loading.gif" :src="data.picture.pic_url + '?x-oss-process=image/resize,w_'+ getWidth()" :offset="100" :container="container" :delay="200"/>
    <bg-picture v-else></bg-picture>
    <div class="text">
      <p>
        <span style="font-weight:600;color:#000">《{{data.title}}》</span>
        <!-- <span style="float:right;font-size:15px" v-if="heart">
                    <i :class="['fa',like]" @click="is_like()" style="margin-right:5px;font-size:17px;color:red;"></i>666次赞
                    </span> -->
        <span style="position:absolute;right:10px">{{typeVal(data.type) }} </span>
      </p>
      <!-- <p>
                  <span>作者 </span>{{data.author}}</p> -->
    </div>
  </div>
</template>
<script>
import bgPicture from '@/components/bgPicture'
import { XImg } from 'vux'
export default {
  name: 'ProPicture',
  props: ['data', 'heart', 'variety', 'container'],
  components: {
    bgPicture,
    XImg
  },
  data() {
    return {
      // like: this.heart === 'like' ? 'fa-heart' : 'fa-heart-o'
    }
  },
  computed: {
    
  },
  created() {},
  methods: {
    typeIcon(type) {
      return type === 1
        ? 'static/img/approve.png'
        : 'static/img/unapprove.png'
    },
    getWidth() {
      return window.screen.availWidth
    },
    detail(variety) {
      this.$vux.loading.show({
        text: this.$t('message.defaule.loginText')
      })
      if (variety === 'myPro') {
        this.$router.push({ path: '/previewPro', query: { id: this.data.id } })
      } else {
        this.$router.push({ path: '/details', query: { id: this.data.id } })
      }
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
      }
    },
    is_like() {
      this.like = this.like === 'fa-heart' ? 'fa-heart-o' : 'fa-heart'
    }
  }
}
</script>
<style lang="less" scoped>
.picture {
  position: relative;
  line-height: 0;
  img {
    width: 100%;
  }
  .typeIcon {
    right: 0;
    position: absolute;
  }
  .text {
    padding: 10px 0;
    font-size: 14px;
    p {
      color: #666;
      max-height: 32px;
      line-height: 16px;
      border-left: 3px solid #000;
      padding: 0px 7px;
      margin: 0px 10px;
    }
  }
}
</style>
