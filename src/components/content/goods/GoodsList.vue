<template>
  <div class="good-list">
    <goods-list-item
      v-for="item in goodslist"
      :key="item"
      :goodslistitem="item"
    ></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  components: { GoodsListItem },
  props: {
    goodslist: {},
  },
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
.good-list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
