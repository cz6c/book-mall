<template>
  <div class="cart-bar">
    <span class="icon"></span>
    <span class="all">全选</span>
    <span class="total">合计:￥1234</span>
    <el-button type="danger" round class="fr">结算</el-button>
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
  methods: {},
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
  background: url(~assets/img/Unselected.png);
  background-size: 30px;
  width: 30px;
  height: 30px;
}
.fr {
  position: absolute;
  top: 4px;
  right: 12px;
}
</style>
