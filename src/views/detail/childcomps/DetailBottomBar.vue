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
import { addCart } from "network/cart";

export default {
  name: "",
  props: {
    id: 0,
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
      addCart({ goods_id: this.id }).then((res) => {
        Toast("加入购物车成功");
      });
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
  /* background-color: #fff; */
  text-align: center;
}
.bar div span {
  color: #fff;
  margin-left: 8px;
}
.van-icon {
  font-size: 22px;
  color: #fff;
}
.active {
  color: red;
}
</style>
