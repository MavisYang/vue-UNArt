<template>
  <div class="ApplyPro">
    <div class="ProList">
    <swipeout class="vux-1px-tb">
      <swipeout-item transition-mode="follow" v-for="(item, index) in works" :key="index">
        <div slot="right-menu">
          <swipeout-button :width="50" type="primary" background-color="black" @click.native="ChangeBtn(index)">{{$t('message.defaule.changeText')}}</swipeout-button>
          <swipeout-button :width="50" type="warn"  @click.native="DelBtn(index)">{{$t('message.defaule.delText')}}</swipeout-button>
        </div>
        <div class="picContent" slot="content" :class="{'vux-1px-b': index !== works.length, 'vux-1px-t': index === 0}" style="padding:12px;">
          <div class="picImg">
            <img style="width:100%;height:100%" :src="getPicVal(item)">
          </div>
          <div class="picInfo">
            <p style="max-width:300px;display:inline-block;max-height:44px;overflow:hidden">《{{item.title}}》</p>
            <p>{{typeVal(item.type)}}</p>
          </div>
        </div>
      </swipeout-item>
    </swipeout>
    <p style="text-align:center;font-size:12px;padding:10px 0;color:#181818">{{$t('message.ApplyPro.pText')}}</p>
    </div>
    <div class="button_warper">
    <flexbox>
        <flexbox-item>
          <x-button type="primary" @click.native="AddNewPro">{{$t('message.defaule.ContinueText')}}</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary" @click.native="nextBtn">{{$t('message.defaule.nextText')}}</x-button>
        </flexbox-item>
      </flexbox>
      </div>
  </div>
</template>

<script>
import { ApplyFromData } from '../../utils/ApplyFromData'
import {
  GroupTitle,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  XButton,
  Flexbox,
  FlexboxItem
} from 'vux'

export default {
  components: {
    GroupTitle,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    XButton,
    Flexbox,
    FlexboxItem
  },
  computed: {},
  created() {
    this.worskListUpdate()
  },
  data() {
    return {
      works: []
    }
  },
  watch: {
    works: {
      handler: function(val, oldVal) {
        if (val.length === 0) {
          this.worskListUpdate()
        }
      },
      deep: true
    }
  },
  methods: {
    getPicVal(item) {
      if (item.type !== 5) {
        return item.pic[0]
      } else {
        let OssHost =
          'http://unart-output.oss-cn-shanghai.aliyuncs.com/snapshot/'
        let url = item.video_name
        let suffix = '/0001.jpg'
        return OssHost + url + suffix
      }
      // return 123
    },
    //修改操作
    ChangeBtn(index) {
      this.$router.push({
        path: 'changePro',
        query: {
          type: 'ApplyPro',
          value: index
        }
      })
    },
    //删除操作
    DelBtn(index) {
      this.works.splice(index, 1)
      let applyFrom = JSON.parse(localStorage.ApplyFrom)
      applyFrom.works = this.works
      localStorage.ApplyFrom = JSON.stringify(applyFrom)
      this.works = []
    },
    //列表加载函数
    worskListUpdate() {
      this.works = ApplyFromData().works
      this.$vux.loading.hide()
    },
    //添加新的历史作品
    AddNewPro() {
      //判断是否超过个数
      if (ApplyFromData().works.length < 5) {
        this.$router.push({
          path: 'uploadPro',
          query: {
            type: 'ApplyPro',
            value: ApplyFromData().works.length
          }
        })
      } else {
        //超过提示
        this.$vux.alert.show({
          title: '系统提示',
          content: '最多上传5个历史作品'
        })
      }
    },
    //下一步按钮
    nextBtn() {
      if (ApplyFromData().works.length > 0) {
        this.$router.push({ path: 'ProMaterial' })
      } else {
        this.$vux.alert.show({
          title: '系统提示',
          content: '最少上传一个作品哦！！'
        })
      }
    },
    //作品类别转化
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
        default:
          return this.$t('message.uploadPro.ProTypeList[6]')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ApplyPro{
  height: 100%;
.picContent {
  font-size: 14px;
  display: flex;
  .picImg {
    width: 50px;
    height: 50px;
  }
  .picInfo {
    p:last-child {
      padding: 0 10px;
    }
  }
}
.button_warper {
  padding: 0 10px;
  padding-top:10%;
}
.ProList {
  overflow: hidden;
  overflow-y: scroll;
  height: 70%;
}
.vux-swipeout-button-box{
  button{
        border-radius: 0;
  }
}
}
</style>