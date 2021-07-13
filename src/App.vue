<template>
  <div>
    <!-- <keep-alive>
      <router-view></router-view>
    </keep-alive> -->

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <main-tab-bar></main-tab-bar>
  </div>
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
 