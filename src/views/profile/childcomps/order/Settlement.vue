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
      <div>
        <span class="name">{{ defaultAddress[0].name }}</span
        ><span class="tel">{{ defaultAddress[0].tel }}</span>
      </div>
      <div class="address-item">{{ defaultAddress[0].address }}</div>
      <van-icon name="arrow" @click="onEdit" />
    </div>
    <div class="line"></div>
    <div class="cart-list">
      <ul>
        <li v-for="item in list" :key="item" class="item">
          <img v-lazy="item.img" alt="" />
          <span class="title">{{ item.title }}</span>
          <span class="price">￥{{ item.price }}</span>
          <span class="count">x{{ item.count }}</span>
        </li>
      </ul>
    </div>
    <van-submit-bar
      :price="AllPrice * 100"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import NavBar from "components/common/navbar/NavBar";
import { addressList } from "network/address";
import { setOrder } from "network/order";

export default {
  components: { NavBar },
  data() {
    return {
      defaultAddress: [],
      list: [],
    };
  },
  computed: {
    //计算订单总价格
    AllPrice() {
      return this.list.reduce((prevalue, item) => {
        return (prevalue += item.price * item.count);
      }, 0);
    },
  },
  methods: {
    onEdit() {
      Toast("修改默认地址");
      this.$router.push("/address");
    },
    backClick() {
      this.$router.go(-1);
    },
    onSubmit() {
      console.log(this.defaultAddress[0].id);
      Toast("抱歉，支付功能待完善");
      setOrder(this.defaultAddress[0].id).then((res) => {
        console.log(res);
      });
    },
  },
  created() {
    //请求默认收货地址
    addressList().then((res) => {
      const info = res.data.filter((item) => {
        return item.is_default == 1;
      });
      this.defaultAddress = info.map((item) => {
        return {
          name: item.name,
          tel: item.phone,
          address: item.city + item.province + item.county + item.address,
          id: item.id,
        };
      });
    });
  },
  mounted() {
    //从vuex中获取勾选商品数据
    this.list = this.$store.state.cartList.filter((item) => {
      return item.check == true;
    });
  },
};
</script>

<style scoped>
.el-icon-arrow-left {
  font-size: 26px;
  padding-left: 10px;
  line-height: 43px;
}
.line {
  position: relative;
  height: 10px;
  margin-bottom: 20px;
}
.line::before {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: repeating-linear-gradient(
    -45deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    var(--van-primary-color) 0,
    var(--van-primary-color) 45%,
    transparent 0,
    transparent 50%
  );
  background-size: 80px;
  content: "";
}
.address {
  position: relative;
  height: 80px;
  padding: 20px 40px;
}
.address .name {
  font-size: 18px;
  margin-right: 10px;
}
.address .tel {
  font-size: 14px;
}
.address .address-item {
  font-size: 14px;
  margin-top: 6px;
}
.address .van-icon {
  position: absolute;
  right: 20px;
  top: 36px;
  font-size: 22px;
}

.item {
  height: 120px;
  position: relative;
  /* padding: 10px; */
  margin: 10px 0;
  border-bottom: solid 10px #e6e6e6;
}
.item img {
  margin-left: 50px;
  height: 80%;
}
.item .title {
  position: absolute;
  left: 150px;
  top: 20px;
}
.item .count {
  position: absolute;
  right: 26px;
  top: 69px;
}
.item .price {
  position: absolute;
  right: 180px;
  top: 66px;
  color: red;
}
</style>
