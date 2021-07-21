<template>
  <div class="bar">
    <div @click="getCollection">
      <van-icon name="star" :class="{ active: isActive }" />
      <span>收藏</span>
    </div>
    <span>立即购买</span>
    <span @click="cartClick">加入购物车</span>
  </div>
</template>

<script>
import { Toast } from "vant";
import { collection, collects } from "network/collection";

export default {
  name: "",
  props: {
    id: {},
  },
  data() {
    return {
      isActive: false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    cartClick() {
      this.$emit("cartClick");
    },
    getCollection() {
      collection(this.id).then((res) => {
        if (res.status == 201) {
          this.isActive = true;
          Toast("已添加到我的收藏");
        } else if (res.status == 204) {
          this.isActive = false;
          Toast("取消收藏");
        }
      });
    },
  },
  created() {
    // 初始化收藏按钮
    collects().then((res) => {
      this.isActive = res.data.some((item) => {
        return item.goods_id == this.id;
      });
    });
  },
};
</script>

<style scoped>
.bar {
  height: 50px;
  background-color: #409eff;
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
.bar div {
  width: 80px;
  background-color: #fff;
  text-align: center;
}
.bar div span {
  color: #666;
  margin-left: 8px;
}
.van-icon {
  font-size: 22px;
  color: #e6e6e6;
}
.active {
  color: red;
}
</style>
