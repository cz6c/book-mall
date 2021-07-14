<template>
  <div>
    <nav-bar>
      <template v-slot:center>
        <div>购物车（{{ $store.state.cartList.length }}）</div>
      </template>
    </nav-bar>
    <!-- 购物车商品列表 -->
    <cart-list></cart-list>
    <cart-bar></cart-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import CartList from "./childcomps/CartList.vue";
import CartBar from "./childcomps/CartBar.vue";
export default {
  components: { NavBar, CartList, CartBar },
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
</style>
