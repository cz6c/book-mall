<template>
  <div class="cart-list">
    <ul>
      <li v-for="item in $store.state.cartList" :key="item" class="item">
        <span class="icon" @click="selClick"></span>
        <img :src="item.img" alt="" />
        <span class="title">{{ item.title }}</span>
        <span class="price">￥{{ item.price }}</span>
        <el-input-number
          v-model="item.count"
          controls-position="right"
          @change="handleChange"
          :min="1"
          size="mini"
          class="count"
        ></el-input-number>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    handleChange() {
      console.log(123);
    },
    selClick() {},
  },
};
</script>

<style scoped>
.item {
  height: 120px;
  position: relative;
  /* padding: 10px; */
  margin: 10px 0;
  border-bottom: solid 10px #e6e6e6;
}
.item .icon {
  position: absolute;
  top: 50%;
  transform: translateY(-80%);
  left: 20px;
  background: url(~assets/img/Unselected.png);
  background-size: 30px;
  width: 30px;
  height: 30px;
}
.item img {
  margin-left: 50px;
  height: 80%;
}
.item .title {
  position: absolute;
  left: 150px;
  top: 20px;
}
.item .count {
  position: absolute;
  right: 10px;
  top: 60px;
}
.item .price {
  position: absolute;
  right: 180px;
  top: 66px;
  color: red;
}
</style>
