<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail,address,collection,cart,preview,order">
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
  //拿取存在本地缓存中vuex的sate
  mounted() {
    window.addEventListener("unload", this.saveState);
  },
  methods: {
    saveState() {
      sessionStorage.setItem("state", JSON.stringify(this.$store.state));
    },
  },
};
</script>
  