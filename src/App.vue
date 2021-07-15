<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<style lang="scss">
</style>

<script>
import MainTabBar from "./components/content/MainTabBar.vue";
export default {
  components: { MainTabBar },
};
</script>
 