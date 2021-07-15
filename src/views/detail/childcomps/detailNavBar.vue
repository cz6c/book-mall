<template>
  <div>
    <nav-bar class="nav-bar">
      <template v-slot:left
        ><span @click="backClick" class="el-icon-arrow-left"></span
      ></template>
      <template v-slot:center>
        <span
          v-for="(item, index) in title"
          :key="(item, index)"
          class="item"
          @click="itemClick(index)"
          :class="{ active: isActive === index }"
          >{{ item }}</span
        >
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  components: { NavBar },
  name: "",
  data() {
    return {
      title: ["详情", "评论", "推荐"],
      isActive: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {
    backClick() {
      this.$router.push("/home");
    },
    itemClick(index) {
      this.isActive = index;
    },
  },
};
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  background-color: #409eff;
  font-size: 16px;
  font-weight: 400;
  z-index: 200;
}
.item {
  margin: 0 10px;
}
.active {
  color: red;
}
.el-icon-arrow-left {
  font-size: 26px;
  padding-left: 10px;
  line-height: 43px;
}
</style>
