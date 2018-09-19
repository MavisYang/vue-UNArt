<template>
  <div class="footer" v-show="$route.meta.notFooter!=='notFooter'">
    <tabbar>
      <tabbar-item :selected="$route.path === '/'" @click.native="linkToPath('/')">
        <i slot="icon" class="fa fa-home" :class="[{color: $route.path === '/'}]"></i>
        <span slot="label">UNArt</span>
      </tabbar-item>
      <tabbar-item :selected="$route.path === '/production'" @click.native="linkToPath('/production')">
        <i slot="icon" class="fa fa-paint-brush" :class="[{color: $route.path === '/production'}]"></i>
        <span slot="label">{{this.$t('message.footerData.production')}}</span>
      </tabbar-item>
      <tabbar-item :selected="$route.path === '/my'" @click.native="linkToPath('/my')">
        <i slot="icon" class="fa fa-user" :class="[{color: $route.path === '/my'}]"></i>
        <span slot="label">{{this.$t('message.footerData.my')}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  data() {
    return {
    }
  },
  components: {
    Tabbar,
    TabbarItem
  },
  methods: {
    linkToPath(link) {
      this.$router.push({ path: link })
    }
  },
  beforeCreate() {}
}
</script>
<style>
.color {
  color: #000 !important;
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 53px;
}
</style>
