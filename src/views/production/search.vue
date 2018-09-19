<template>
  <div>
    <search @result-click="resultClick" v-model="value" position="absolute" auto-scroll-to-top top="44px" @on-focus="onFocus" @on-cancel="onCancel" @on-submit="onSubmit" ref="search" :placeholder="$t('message.search.placeholder')" :cancel-text="$t('message.defaule.cancel_text')"></search>
    <div class="noImg" v-if="noImg">
      <img src="../../assets/img/nullSearch.png" alt="">
      <p>{{$t('message.search.NoSearch')}}</p>
    </div>
    <Pro-picture v-model="proList" :data="item" v-for="(item,index) in proList" :key="index" container="#vux_view_box_body"> </Pro-picture>
  </div>
</template>
<script>
import { Search, Group, Cell, XButton } from 'vux'
import searchApi from '../../API/production'
import ProPicture from '@/components/ProPicture'
export default {
  components: {
    Search,
    Group,
    Cell,
    XButton,
    ProPicture
  },
  created() {
    this.$vux.loading.hide()
    this.ifSearch()
  },
  methods: {
    // setFocus() {
    //   this.$refs.search.setFocus()
    // },
    ifSearch() {
      if (sessionStorage.searchVal) {
        this.value = sessionStorage.searchVal
        this.proList = JSON.parse(sessionStorage.proList)
      }
    },
    resultClick(item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    searchApi() {
      this.noImg = false
      this.$vux.loading.show({
        text: this.$t('message.search.LoadingSearchText')
      })
      let _this = this
      searchApi.list(
        {
          data: {
            key: this.value
          },
          success(res) {
            setTimeout(function() {
              _this.$vux.loading.hide()
            }, 200)
            if (!res.data.list.length) _this.noImg = true
            _this.proList = res.data.list
            sessionStorage.searchVal = _this.value
            sessionStorage.proList = JSON.stringify(_this.proList)
          }
        },
        'search'
      )
    },
    onSubmit() {
      this.searchApi()
    },
    onFocus() {},
    onCancel() {
      history.go(-1)
    }
  },
  data() {
    return {
      noImg: false,
      proList: [],
      value: ''
    }
  }
}
</script>
<style lang="less" scoped>
.noImg {
  width: 100%;
  height: 400px;
  img {
    display: block;
    margin: 0 auto;
    margin-top: 30%;
  }
  p {
    padding-top: 10px;
    color: #ccc;
    text-align: center;
  }
}
</style>
