<template>
  <div class="account">
    <nav-bar>
      <template v-slot:left
        ><span @click="backClick" class="el-icon-arrow-left"></span
      ></template>
      <template v-slot:center>
        <div>账户管理</div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "",
  components: { NavBar },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    backClick() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.el-icon-arrow-left {
  font-size: 20px;
  padding-left: 8px;
  line-height: 43px;
}
.account {
  position: relative;
  height: 100vh;
  z-index: 9;
  background-color: #fff;
}
</style>
