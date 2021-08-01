<template>
  <div class="collection">
    <nav-bar>
      <template v-slot:left
        ><span @click="backClick" class="el-icon-arrow-left"></span
      ></template>
      <template v-slot:center>
        <div>我的收藏</div>
      </template>
    </nav-bar>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="list" v-for="item in list" :key="item">
          <van-swipe-cell>
            <van-card
              :price="item.goods.price"
              :desc="item.goods.description"
              :title="item.goods.title"
              class="goods-card"
              :thumb="item.goods.cover_url"
              @click="getDetail(item.goods_id)"
            />
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="del(item.goods_id)"
              />
            </template>
          </van-swipe-cell>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { collection, collects } from "network/collection";
import { Toast } from "vant";

export default {
  name: "collection",
  components: { NavBar },
  data() {
    return {
      list: [], //列表数据
      page: 1, //页数
      total_pages: 0, //总页数
      loading: false, //
      finished: false,
      refreshing: false,
    };
  },
  methods: {
    backClick() {
      this.$router.go(-1);
    },
    getDetail(id) {
      this.$router.push("/detail/" + id);
    },
    del(id) {
      collection(id).then((res) => {
        Toast("取消收藏");
        //重新获取收藏数据
        collects().then((res) => {
          this.list = res.data;
        });
      });
    },
    //下拉刷新方法
    onRefresh() {
      // 加载完毕关闭
      this.finished = false;
      // 切换加载中，不会触发上拉加载事件
      this.loading = true;
      //把页面初始化到1
      this.page = 1;
      //手动调用上拉加载方法加载第一页数据
      this.init();
    },

    //上拉加载方法
    onLoad() {
      //页数加1
      this.page++;
      this.init();
    },

    //获取列表数据
    init() {
      //定义query请求参数，类型，页码等
      const params = { type: this.type, page: this.page };
      //请求数据
      collects(params).then((res) => {
        //如果下拉刷新开启，把列表数据负空，然后关闭下拉刷新
        if (this.refreshing) {
          this.list = [];
          this.refreshing = false;
        }
        //把上次请求的和本次请求的两数组合并到一个数组
        this.list = this.list.concat(res.data);
        //列表重新赋值后切换为非加载中，开启触发上拉加载事件
        this.loading = false;
        //如果加载到的页数已经超过总页数时说明全部加载完毕
        this.total_pages = res.meta.pagination.total_pages;
        if (this.page >= this.total_pages) {
          this.finished = true;
        }
      });
    },
  },
  created() {
    //初始化收藏列表数据
    this.init();
  },
};
</script>

<style scoped>
.goods-card {
  margin: 10px 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
.collection {
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #fff;
}
</style>
