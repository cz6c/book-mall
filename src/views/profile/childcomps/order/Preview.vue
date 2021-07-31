<template>
  <div>
    <nav-bar>
      <template v-slot:left
        ><span @click="backClick" class="el-icon-arrow-left"></span
      ></template>
      <template v-slot:center>
        <div>订单预览</div>
      </template>
    </nav-bar>
    <div class="address">
      <div class="name">
        <span>{{ address.name }}</span>
        {{ address.phone }}
      </div>
      <p class="detail">{{ addressDetail }}</p>
    </div>
    <van-card
      v-for="item in carts"
      :key="item"
      :num="item.num"
      :price="item.goods.price"
      :title="item.goods.title"
      :thumb="item.goods.cover_url"
    />
    <van-submit-bar
      :price="AllPrice * 100"
      button-text="提交订单"
      @submit="onSubmit"
    />

    <van-popup
      v-model:show="show"
      round
      position="bottom"
      :style="{ height: '30%' }"
    >
      <h4>支付功能待完善</h4>
    </van-popup>
  </div>
</template>

<script>
import { previewOrder, submitOrder } from "network/order";
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "preview",
  components: { NavBar },
  data() {
    return {
      address: {
        name: "",
        phone: "",
      },
      carts: [],
      show: false,
    };
  },
  computed: {
    //计算地址
    addressDetail() {
      return (
        this.address.city +
        this.address.province +
        this.address.county +
        this.address.address
      );
    },
    //计算总价格
    AllPrice() {
      return this.carts.reduce((pre, item) => {
        return (pre += item.num * item.goods.price);
      }, 0);
    },
  },
  watch: {},
  methods: {
    backClick() {
      this.$router.push("/cart");
    },
    //提交订单
    onSubmit() {
      submitOrder({ address_id: this.address.id }).then((res) => {
        console.log(res);
        this.show = true;
      });
    },
  },
  created() {
    //获取订单预览数据
    previewOrder().then((res) => {
      this.address = res.address.filter((item) => item.is_default == 1)[0];
      this.carts = res.carts;
    });
  },
};
</script>

<style scoped>
.address {
  /* margin-top: 50px; */
  height: 80px;
  padding: 16px;
  border-bottom: solid 2px #333;
}
.name span {
  font-size: 1.5em;
}
h4 {
  margin: 100px 0;
  text-align: center;
}
</style>
