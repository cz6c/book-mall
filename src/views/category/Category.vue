<template>
  <div>
    <nav-bar>
      <template v-slot:center>
        <div>分类</div>
      </template>
    </nav-bar>
    <van-sidebar v-model="activeKey" ref="wrapper">
      <van-sidebar-item v-for="item in list" :key="item" :title="item" />
    </van-sidebar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import { getcategory } from "network/category";

export default {
  name: "",
  components: { NavBar },
  data() {
    return {
      activeKey: 0,
      categoryList: [],
    };
  },
  computed: {
    list() {
      const arr = [];
      this.categoryList.forEach((item) => {
        item.children.forEach((item) => {
          arr.push(item.name);
        });
      });
      return arr;
    },
  },
  methods: {
    init() {
      getcategory().then((res) => {
        console.log(res);
        this.categoryList = res.categories;
      });
    },
  },
  created() {
    this.init();
  },
};
</script>

<style scoped>
</style>
