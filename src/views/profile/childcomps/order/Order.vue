<template>
  <div>
    <nav-bar>
      <template v-slot:left
        ><span @click="backClick" class="el-icon-arrow-left"></span
      ></template>
      <template v-slot:center>
        <div>我的订单</div>
      </template>
    </nav-bar>
    <van-tabs v-model="active">
      <van-tab :title="item" v-for="(item, index) in titles" :key="index">
        <h2>{{ index }}</h2>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "",
  components: { NavBar },
  data() {
    return {
      titles: ["待付款", "待发货", "待收货", "待评价"],
    };
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
</style>
