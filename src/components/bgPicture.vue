<template>
  <div>
    <div class="bg-pictrue" :height='height' :style="{ height: height + 'px'  }">
      <i class="fa fa-lg fa-photo"></i>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  props: {
    height: {
      type: Number,
      default: 160
    }
  },
  created() {},
  methods: {

  }
}

</script>
<style lang='less' scoped>
@import '../theme.less';
.bg-pictrue {
  background-color: @bg_grey;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fa {
  color: @grey;
}
</style>

