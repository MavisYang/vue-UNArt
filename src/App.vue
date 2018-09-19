<template>
  <div id="app">
    <app-header></app-header>
    <view-box ref="viewBox" 
    :body-padding-top="$route.meta.notHeader=='notHeader'?'0px':'44px'" 
    :body-padding-bottom="$route.meta.notFooter=='notFooter'?'0px':'53px'">
      <!-- <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')"> -->
        <router-view class="router-view"></router-view>
      <!-- </transition> -->
    </view-box>
    <app-footer></app-footer>
  </div>
</template>
<script>
import appFooter from './components/footer'
import appHeader from './components/header'
import { ViewBox } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    ViewBox,
    appHeader,
    appFooter
  },
  computed: {
    ...mapState(['direction'])
  }
}

</script>
<style lang='less'>
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/tap.less';

html,
body {
  height: 100%;
  width: 100%;
}

#vux_view_box_body {
  overflow-x: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

.router-view {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  backface-visibility: hidden;
}

.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  height: 100%;
  position: absolute;
  left: 0;
}

.vux-pop-out-enter-active {
  width:100%;
  animation-name: popInLeft;
}

.vux-pop-out-leave-active {
  width:100%;
  animation-name: popOutRight;
}

.vux-pop-in-enter-active {
  width:100%;
  perspective: 1000;
  animation-name: popInRight;
}

.vux-pop-in-leave-active {
  width:100%;
  animation-name: popOutLeft;
}

@keyframes popInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes popOutLeft {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes popInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes popOutRight {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}

</style>
