<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:left>
        <div>返回</div>
      </template>
      <template v-slot:center>
        <div>书城</div>
      </template>
      <template v-slot:right>
        <div>登录</div>
      </template>
    </nav-bar>
    <el-carousel height="200px">
      <el-carousel-item v-for="item in banners.slice(0, 3)" :key="item">
        <img :src="item.img_url" alt="" />
      </el-carousel-item>
    </el-carousel>
    <home-recommend :recommends="recommends"></home-recommend>
    <option-bar :titles="['促销', '精选', '上新']"></option-bar>
  </div>
</template>

<script>
//公共组件
import NavBar from "components/common/navbar/NavBar";
import OptionBar from "components/content/OptionBar.vue";
//子组件
import HomeRecommend from "./childcomponents/HomeRecommend.vue";
//方法
import { getHomeMultidata } from "network/home";

export default {
  components: { NavBar, HomeRecommend, OptionBar },
  name: "",
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {
    //请求数据
    getHomeMultidata().then((res) => {
      console.log(res);
      this.banners = res.slides;
      this.recommends = res.goods.data;
    });
  },
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
