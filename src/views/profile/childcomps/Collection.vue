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
      list: [],
    };
  },
  computed: {},
  watch: {},
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
  },
  created() {
    //初始化收藏列表数据
    collects().then((res) => {
      this.list = res.data;
    });
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
