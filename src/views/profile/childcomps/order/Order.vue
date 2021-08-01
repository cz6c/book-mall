<template>
  <div>
    <nav-bar>
      <template v-slot:left
        ><span @click="backClick" class="el-icon-arrow-left"></span
      ></template>
      <template v-slot:center>
        <div>我的订单</div>
      </template>
    </nav-bar>
    <van-tabs v-model="active" @click="onClick">
      <van-tab :title="item" v-for="(item, index) in titles" :key="index">
      </van-tab>
      <ul>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <li v-for="items in list" :key="items">
              <p>创建时间：{{ items.created_at }}</p>
              <p>订单号：{{ items.order_no }}</p>
              <van-card
                v-for="item in items.orderDetails.data"
                :key="item"
                :num="item.num"
                :price="item.price"
                :title="item.goods.title"
                :thumb="item.goods.cover_url"
              />
              <div class="bottom">
                <van-button round type="default">去支付</van-button>
              </div>
            </li>
          </van-list>
        </van-pull-refresh>
      </ul>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { orderList } from "network/order";

export default {
  name: "order",
  components: { NavBar },
  data() {
    return {
      active: 0,
      titles: ["待付款", "待发货", "待收货", "待评价", "已过期"],
      list: [], //列表数据
      page: 1, //页数
      total_pages: 0, //总页数
      loading: false, //
      finished: false,
      refreshing: false,
      type: 1, //请求数据类型，                          //多种类型列表来回切换时使用
    };
  },
  watch: {
    page: {
      handler(a) {
        console.log(a);
      },
    },
  },
  methods: {
    //返回
    backClick() {
      this.$router.go(-1);
    },
    //请求不同状态的订单
    onClick(index) {
      this.type = index + 1;
      this.refreshing = true;
      this.onRefresh();
    },
    //下拉刷新方法
    onRefresh() {
      // 加载完毕关闭
      this.finished = false;
      // 切换加载中，不会触发上拉加载事件
      this.loading = true;
      //把页面初始化到1
      this.page = 1;
      //手动获取列表数据
      this.init();
    },

    //上拉加载方法
    onLoad() {
      //页数加1
      if (this.page < this.total_pages) {
        this.page++;
        this.init();
      }
    },

    //获取列表数据
    init() {
      //定义query请求参数，类型，页码等
      const params = { status: this.type, page: this.page };
      //请求数据
      orderList(params).then((res) => {
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
    this.onRefresh();
  },
};
</script>

<style scoped>
.el-icon-arrow-left {
  font-size: 20px;
  padding-left: 8px;
  line-height: 43px;
}
li {
  border-radius: 8px;
  box-shadow: 0px 0px 2px 0px;
  background-color: #fafafa;
  margin: 12px 6px;
}
li p {
  padding: 6px 18px;
}
.bottom {
  height: 50px;
}
.van-button {
  float: right;
  right: 10px;
  border: solid 1px #529de6;
  width: 88px;
}
</style>
