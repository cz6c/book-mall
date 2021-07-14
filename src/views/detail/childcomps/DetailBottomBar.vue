<template>
  <div class="bar">
    <span>立即购买</span>
    <span @click="cartClick">加入购物车</span>
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
    cartClick() {
      this.$emit("cartClick");
    },
  },
};
</script>

<style scoped>
.bar {
  height: 49px;
  background-color: #333;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  line-height: 49px;
  text-align: center;
  color: #fff;
}
.bar span {
  flex: 1;
}
</style>
