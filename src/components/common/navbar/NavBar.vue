<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
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
.nav-bar {
  display: flex;
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.2);
  background-color: #1989fa;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
}
.left .right {
  width: 30px;
}
.center {
  flex: 1;
}
</style>
