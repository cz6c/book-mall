<template>
  <router-view></router-view>
  <main-tab-bar></main-tab-bar>
</template>

<style lang="scss">
// @import "assets/css/base.css";
// @import "assets/css/fonts/iconfont.css";
// @import "assets/css/normalize.css";
</style>

<script>
import MainTabBar from "./components/content/MainTabBar.vue";
export default {
  components: { MainTabBar },
};
</script>
 