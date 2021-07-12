<template>
  <div class="tab-bar-item" @click="itemClick" :style="itemStyle">
    <slot name="item-icon"></slot>
    <slot name="item-text"></slot>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    path: {},
    isColor: {},
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      //判断当前路由是否处于活跃
      return this.$route.path === this.path;
    },
    itemStyle() {
      //给活跃的路由改变样式状态
      return this.isActive ? { color: this.isColor } : {};
    },
  },
  watch: {},
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch(() => {});
      // this.$router.replace(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}
</style>
