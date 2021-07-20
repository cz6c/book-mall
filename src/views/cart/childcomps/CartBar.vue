<template>
  <div class="cart-bar">
    <span
      class="icon"
      :class="{ sel: $store.getters.checkAll, unsel: !$store.getters.checkAll }"
      @click="allClick"
    ></span>
    <span class="all">全选</span>
    <span class="total">合计:￥{{ $store.getters.tolta }}</span>
    <el-button type="danger" round class="fr" @click="Settlement"
      >结算 {{ $store.getters.checkCount }}</el-button
    >
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      // isAll: true,
    };
  },
  computed: {},
  watch: {},
  methods: {
    allClick() {
      //先判断是否有商品，无商品点击不会反应
      //有商品先判断商品是否全选，不是全选点击后全选
      //否则点击后取消全选
      if (this.$store.state.cartList.length === 0) {
      } else if (this.$store.getters.checkAll === false) {
        this.$store.state.cartList.forEach((item) => (item.check = true));
      } else {
        this.$store.state.cartList.forEach((item) => (item.check = false));
      }
    },
    Settlement() {
      let arr = this.$store.state.cartList.filter((item) => {
        return item.check == true;
      });
      if (arr.length == 0) {
        this.$toast.fail("结算书籍数量为空");
      } else {
        this.$router.push("/settlement");
      }
    },
  },
};
</script>

<style scoped>
.cart-bar {
  position: fixed;
  bottom: 50px;
  height: 49px;
  width: 100%;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.2);
  line-height: 49px;
}
.cart-bar .all {
  margin: 30px;
}
.cart-bar .icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0px;
  width: 30px;
  height: 30px;
}
.fr {
  position: absolute;
  top: 4px;
  right: 12px;
}
.unsel {
  background: url(~assets/img/unsel.png);
  background-size: 31px;
}
.sel {
  background: url(~assets/img/sel.png);
  background-size: 31px;
}
</style>
