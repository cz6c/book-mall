<template>
  <div class="option-bar">
    <div
      class="option-bar-item"
      v-for="(item, index) in titles"
      :key="(item, index)"
      :class="{ active: isActive == index }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    titles: {},
  },
  data() {
    return {
      isActive: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {
    itemClick(index) {
      this.isActive = index;
    },
  },
};
</script>

<style scoped>
.option-bar {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  justify-content: space-around;
  text-align: center;
  background-color: #f6f6f6;
}
.option-bar-item {
  flex: 1;
}
.option-bar-item span {
  padding: 10px;
}
.active {
  color: red;
}
.active span {
  border-bottom: solid 2px red;
}
</style>
