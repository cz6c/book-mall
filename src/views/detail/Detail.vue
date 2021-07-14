<template>
  <div class="detail">
    <detail-nav-bar></detail-nav-bar>
    <el-image :src="goods.cover_url"> </el-image>
    <p>{{ goods.title }}</p>
    <p>{{ goods.description }}</p>
    <p>￥{{ goods.price }}</p>
    <p v-html="goods.details"></p>
    <detail-bottom-bar @cartClick="addcart"></detail-bottom-bar>时
  </div>
</template>

<script>
import detailNavBar from "./childcomps/detailNavBar.vue";

import { getDetaildata } from "network/detail.js";
import DetailBottomBar from "./childcomps/DetailBottomBar.vue";

export default {
  components: { detailNavBar, DetailBottomBar },
  name: "Detail",
  data() {
    return {
      id: null,
      goods: {},
    };
  },
  computed: {},
  watch: {},
  methods: {
    addcart() {
      //获取要在购物车展示的商品信息
      const product = {};
      product.img = this.goods.cover_url;
      product.title = this.goods.title;
      product.price = this.goods.price;
      product.id = this.id;

      //把商品加入购物车
      this.$store.dispatch("addCart", product);
    },
  },
  created() {
    //动态获取路由绑定的id
    this.id = this.$route.params.id;
    //根据id请求数据
    getDetaildata(this.id).then((res) => {
      this.goods = res.goods;
    });
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  height: 100vh;
  z-index: 100;
  background-color: #ff6a00;
}
</style>
