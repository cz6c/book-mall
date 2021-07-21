<template>
  <div class="about">
    <nav-bar>
      <template v-slot:left
        ><span @click="backClick" class="el-icon-arrow-left"></span
      ></template>
      <template v-slot:center>
        <div>关于我们</div>
      </template>
    </nav-bar>
    <div class="version">
      <img src="~assets/img/log.png" alt="" />
      <h4>book-mall v1.1.1</h4>
    </div>
    <div class="copyright">
      <span>版权所有</span>
      <p>Copyright © 2020-2021 book-mall .All Rights Reserved</p>
    </div>
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
.about {
  background-color: #fff;
  height: 100vh;
  width: 100%;
  position: relative;
  z-index: 9;
}
.version {
  position: absolute;
  top: 26%;
  left: 50%;
  transform: translateX(-50%);
}
h4 {
  font-size: 20px;
  margin-top: 20px;
  text-align: center;
}
img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
.copyright {
  position: absolute;
  bottom: 30px;
  width: 100%;
  font-size: 14px;
  text-align: center;
}
.copyright p {
  margin-top: 8px;
}
</style>
