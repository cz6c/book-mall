<template>
  <div>
    <h4>热门推荐书籍</h4>
    <div class="recommend">
      <div
        class="recommend-item"
        v-for="item in recommends.slice(0, 4)"
        :key="item"
        @click="itemClick(item)"
      >
        <img v-lazy="item.cover_url" alt="" />
        <h5>{{ item.title }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    recommends: {},
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    itemClick(item) {
      this.$router.push("/detail/" + item.id);
    },
  },
};
</script>

<style scoped>
.recommend {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 0 0 30px 0;
  border-bottom: solid 16px #e6e6e6;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 88px;
  height: 88px;
  margin-bottom: 10px;
}
h4 {
  text-align: center;
  margin: 20px 0;
}
</style>
