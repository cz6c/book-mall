<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
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
.tab-bar {
  display: flex;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #f6f6f6;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  justify-content: space-around;
}
</style>
