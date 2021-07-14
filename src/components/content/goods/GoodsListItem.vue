<template>
  <div class="goods-list-item" @click="itemClick">
    <img :src="goodslistitem.cover_url" alt="" />
    <div class="info">
      <p>{{ goodslistitem.description }}</p>
      <span class="price">￥{{ goodslistitem.price }}</span>
      <span>收藏{{ goodslistitem.collects_count }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    goodslistitem: {},
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    itemClick() {
      this.$router.push("/detail/" + this.goodslistitem.id);
      //点击跳转时隐藏tabbar
      this.$store.commit("getIsDetall");
    },
  },
};
</script>

<style scoped>
.goods-list-item {
  /* flex: 1; 加了换行这里就不能给1均分了，要设置具体的宽度*/
  width: 46%;
  padding: 6px;
}
.goods-list-item img {
  width: 100%;
}
.goods-list-item .info {
  font-size: 12px;
  text-align: center;
}
.goods-list-item .info p {
  overflow: hidden;
  text-overflow: ellipsis; /* 溢出文字...*/
  white-space: nowrap;
  margin-bottom: 6px;
}
.goods-list-item .info .price {
  color: red;
  margin-right: 20px;
}
</style>
