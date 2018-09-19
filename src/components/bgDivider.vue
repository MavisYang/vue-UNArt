<template>
  <div>
    <div class="bg-divider" :height='height' :style="{ height: height + 'px'  }">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    height: {
      type: Number,
      default: 10
    }
  }
}
</script>
<style lang='less' scoped>
@import '../theme.less';
.bg-divider {
  background-color: @dividerBg;
  width: 100%;
}
</style>

