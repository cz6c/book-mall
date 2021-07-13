<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:left>
        <div>返回</div>
      </template>
      <template v-slot:center>
        <div>书城</div>
      </template>
      <template v-slot:right>
        <div>登录</div>
      </template>
    </nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="scroll"
      :pull-upLoad="true"
      @pullUpLoad="pullUpLoad"
    >
      <el-carousel height="300px">
        <el-carousel-item v-for="item in banners.slice(0, 3)" :key="item">
          <img :src="item.img_url" alt="" />
        </el-carousel-item>
      </el-carousel>
      <home-recommend :recommends="recommends"></home-recommend>
      <option-bar
        :titles="['促销', '精选', '上新']"
        @obClick="obClick"
      ></option-bar>
      <goods-list :goodslist="goods[isType].list"></goods-list>
    </scroll>
    <back-to-top
      class="up"
      @click.native="upClick"
      v-show="isShowBackToTop"
    ></back-to-top>
    <!-- .native事件修饰符，可以在组件中侦听原生事件 -->
  </div>
</template>

<script>
//公共组件
import NavBar from "components/common/navbar/NavBar";
import OptionBar from "components/content/OptionBar.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackToTop from "components/content/BackToTop.vue";
//子组件
import HomeRecommend from "./childcomponents/HomeRecommend.vue";
//方法
import { getHomeMultidata, getHomeGoodsdata } from "network/home";

export default {
  components: {
    NavBar,
    HomeRecommend,
    OptionBar,
    GoodsList,
    Scroll,
    BackToTop,
  },
  name: "",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        //数据模型
        sales: { page: 0, list: [] },
        recommend: { page: 0, list: [] },
        new: { page: 0, list: [] },
      },
      goodsType: ["sales", "recommend", "new"],
      isType: "sales", //动态获取页面type
      isShowBackToTop: false, //控制显示隐藏
      // saveY: 0,
    };
  },
  // keep alive 的钩子函数
  // activated() {
  //   this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0);
  // },
  // deactivated() {
  //   this.saveY = this.$refs.scroll.scroll.y;
  // },
  methods: {
    //主要数据请求封装
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.slides;
        this.recommends = res.goods.data;
      });
    },

    //商品分页数据封装
    getHomeGoodsdata(type) {
      const page = this.goods[type].page + 1; //请求数据前定义一个变量拿到当前page后加1，就去请求下一页数据
      getHomeGoodsdata(type, page).then((res) => {
        this.goods[type].list.push(...res.goods.data);
        this.goods[type].page += 1; //请求完数据后把page自加1，下次请求就是从page+1页

        // 完成上拉加载更多
        this.$refs.scroll.scroll && this.$refs.scroll.scroll.finishPullUp();
      });
    },

    //事件函数
    obClick(index) {
      this.isType = this.goodsType[index];
      console.log(this.goodsType[index]);
    },
    //接受scroll组件发生的自定义事件
    upClick() {
      //通过ref拿到scroll组件，再拿到组件的scroll对象，调用它的scrollTo方法回到顶部
      this.$refs.scroll.scroll.scrollTo(0, 0);
    },
    scroll(position) {
      if (position.y < -800) {
        this.isShowBackToTop = true;
      } else {
        this.isShowBackToTop = false;
      }
    },
    pullUpLoad() {
      //接收下拉事件获取下一页数据
      this.getHomeGoodsdata(this.isType);
    },
  },
  created() {
    //请求主要数据
    this.getHomeMultidata(); //把具体请求函数封装到methods里去，这样结构更清晰
    //请求商品分页数据
    this.getHomeGoodsdata("sales");
    this.getHomeGoodsdata("recommend");
    this.getHomeGoodsdata("new");
  },
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
#home {
  position: relative;
  height: 100vh; /* vh视口宽度 */
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.up {
  position: absolute;
  bottom: 66px;
  right: 16px;
  z-index: 6;
}
</style>
