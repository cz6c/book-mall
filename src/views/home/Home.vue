<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>企鹅书城</div>
      </template>
    </nav-bar>
    <option-bar
      :titles="['促销', '精选', '上新']"
      @obClick="obClick"
      v-show="isShowOption"
      :class="{ 'o-bar': isShowOption }"
      ref="option1"
    ></option-bar>
    <!-- 轮播图 -->
    <el-carousel height="300px">
      <el-carousel-item v-for="item in banners.slice(0, 3)" :key="item">
        <img v-lazy="item.img_url" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐 -->
    <home-recommend :recommends="recommends"></home-recommend>
    <!-- 选项卡 -->
    <option-bar
      :titles="['促销', '精选', '上新']"
      @obClick="obClick"
      ref="option2"
    ></option-bar>
    <!-- 商品列表 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <goods-list :goodslist="list"></goods-list>
      </van-list>
    </van-pull-refresh>
    <!-- 回到顶部 -->
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
    BackToTop,
  },
  name: "",
  data() {
    return {
      banners: [],
      recommends: [],

      goodsType: ["sales", "recommend", "new"],
      isType: "sales", //动态获取页面type
      isShowBackToTop: false, //控制显示隐藏
      isShowOption: false, //控制显示隐藏

      list: [], //列表数据
      page: 1, //页数
      total_pages: 0, //总页数
      loading: false, //控制是否触发上拉加载
      finished: false, //控制开启关闭上拉加载模式
      refreshing: false, //控制下拉刷新
    };
  },
  methods: {
    //主要数据请求封装
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.slides;
        this.recommends = res.goods.data;
      });
    },
    //事件函数
    obClick(index) {
      this.isType = this.goodsType[index];
      console.log(this.goodsType[index]);
      this.$refs.option1.isActive = index; //解决同步问题
      this.$refs.option2.isActive = index;
      //改变状态
      //刷新数据
      this.refreshing = true;
      this.onRefresh();
    },
    upClick() {
      window.scroll(0, 0);
    },

    //下拉刷新初始化
    onRefresh() {
      // 开启加载模式
      this.finished = false;
      // 关闭上拉加载的触发
      this.loading = true;
      //把页面初始化到1
      this.page = 1;
      //获取列表数据
      this.init();
    },

    //上拉加载
    onLoad() {
      //页数加1
      if (this.page < this.total_pages) {
        this.page++;
        this.init();
      }
    },

    //获取列表数据
    init() {
      //请求数据
      getHomeGoodsdata(this.isType, this.page).then((res) => {
        //下拉刷新开启时，把列表数据赋值空，关闭下拉刷新
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        //把上次请求和本次请求的两数组合并到一个数组
        this.list = this.list.concat(res.goods.data);
        //列表重新赋值后开启上拉加载的触发
        this.loading = false;
        //如果加载的页数已经超过总页数时关闭加载模式
        this.total_pages = res.goods.to;
        if (this.page >= this.total_pages) {
          this.finished = true;
        }
      });
    },

    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= 480) {
        this.isShowOption = true;
        this.isShowBackToTop = true;
      }
      if (scrollTop < 480) {
        this.isShowOption = false;
        this.isShowBackToTop = false;
      }
    },
  },
  created() {
    //请求主要数据
    this.getHomeMultidata(); //把具体请求函数封装到methods里去，这样结构更清晰
    //请求商品分页数据
    this.onRefresh();
  },
  //
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh; /* vh视口宽度 */
}
.up {
  position: fixed;
  bottom: 66px;
  right: 16px;
  z-index: 6;
}
.o-bar {
  position: fixed;
  top: 44px;
  z-index: 9;
}
.nav-bar {
  position: fixed;
  top: 0;
  z-index: 100;
}
</style>
