<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";

export default {
  name: "",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    //创建BetterScroll对象赋值给scroll存起来
    this.scroll = new BetterScroll(this.$refs.wrapper, {
      //通过ref也能拿到原生document元素
      click: true, //使组件内原有的点击事件生效
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    //侦听滚动的位置,然后把位置发出去
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
      // //每次滚动获取位置时顺带更新可滚动的高度
      this.scroll.refresh();
    });
    //侦听上拉加载事件，把事件发出去
    this.scroll.on("pullingUp", () => {
      this.$emit("pullUpLoad");
    });
  },
};
</script>

<style scoped>
</style>
