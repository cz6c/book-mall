<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav-bar"></detail-nav-bar>
    <img v-lazy="goods.cover_url" class="img" />
    <h4>{{ goods.title }}</h4>
    <p>{{ goods.description }}</p>
    <span class="price">￥{{ goods.price }}</span>
    <h3>书籍简介</h3>
    <p v-html="goods.details"></p>
    <div class="bottom"></div>
    <detail-bottom-bar @cartClick="addcart" :id="id"></detail-bottom-bar>
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
      this.$store.dispatch("addCart", product).then((res) => {
        this.$toast.success(res);
      });
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
  width: 100%;
  height: 100vh;
  z-index: 100;
  font-size: 14px;
}
.img {
  width: 100%;
  height: 360px;
  margin: 36px 0;
  border-bottom: solid 1px #e6e6e6;
}
h4 {
  margin-bottom: 10px;
  font-size: 20px;
}
p {
  margin-left: 8px;
}
h3 {
  margin: 60px 0;
  text-align: center;
  height: 40px;
  background-color: #e6e6e6;
  line-height: 40px;
}
.price {
  position: absolute;
  right: 36px;
  top: 460px;
  color: red;
  font-size: 20px;
}
.detail-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.bottom {
  width: 100%;
  height: 80px;
}
</style>
