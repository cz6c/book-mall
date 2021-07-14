<template>
  <tab-bar>
    <tab-bar-item path="/home" :isColor="isColor">
      <template v-slot:item-icon>
        <span class="iconfont icon-home"></span>
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category" :isColor="isColor">
      <template v-slot:item-icon>
        <span class="iconfont icon-all"></span>
      </template>
      <template v-slot:item-text>
        <div>品类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/cart" :isColor="isColor">
      <template v-slot:item-icon>
        <span class="iconfont icon-cart-Empty"></span>
      </template>
      <template v-slot:item-text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile" :isColor="isColor">
      <template v-slot:item-icon>
        <span class="iconfont icon-xinxibar_zhanghu"></span>
      </template>
      <template v-slot:item-text>
        <div>我的</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
//book-mall\src\components\common\tabbar\TabBar.vue
import TabBar from "../common/tabbar/TabBar";
//book-mall\src\components\common\tabbar\TabBarItem.vue
import TabBarItem from "../common/tabbar/TabBarItem";
export default {
  name: "",
  data() {
    return {
      isColor: "#ff6a00", //这个变量由客户决定颜色
    };
  },
  computed: {},
  watch: {},
  methods: {},
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped>
.iconfont {
  font-size: 26px;
}
</style>
