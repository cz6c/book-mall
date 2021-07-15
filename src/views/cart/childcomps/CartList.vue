<template>
  <div class="cart-list">
    <ul>
      <li v-for="item in $store.state.cartList" :key="item" class="item">
        <span
          class="icon"
          @click="selClick(item)"
          :class="{ sel: item.check, unsel: !item.check }"
        ></span>
        <img v-lazy="item.img" alt="" />
        <span class="title">{{ item.title }}</span>
        <span class="price">￥{{ item.price }}</span>
        <el-input-number
          v-model="item.count"
          controls-position="right"
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
    selClick(item) {
      item.check = !item.check;
    },
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
  width: 31px;
  height: 31px;
}
.unsel {
  background: url(~assets/img/unsel.png);
  background-size: 31px;
}
.sel {
  background: url(~assets/img/sel.png);
  background-size: 31px;
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
