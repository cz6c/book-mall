<template>
  <div>
    <nav-bar>
      <template v-slot:center>
        <div>购物车</div>
      </template>
    </nav-bar>
    <!-- 购物车商品列表 -->
    <div class="cart-list">
      <van-checkbox-group
        v-model="result"
        ref="checkboxGroup"
        @change="changeCheck"
      >
        <van-swipe-cell v-for="item in cartList" :key="item" class="item">
          <van-checkbox :name="item.id" class="checked"></van-checkbox>
          <van-card
            :price="item.goods.price"
            :title="item.goods.title"
            class="goods-card"
            :thumb="item.goods.cover_url"
          >
            <template #num>
              <van-stepper
                v-model="item.num"
                theme="round"
                button-size="20"
                disable-input
                @change="changeNum(item)"
                min="1"
              />
            </template>
          </van-card>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="deleteClick(item.id)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <van-submit-bar
      :price="AllPrice * 100"
      button-text="结算"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkedAll" @click="All">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { getCart, editCartGoodsCount, checked, outCart } from "network/cart";
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "cart",
  components: { NavBar },
  data() {
    return {
      cartList: [],
      result: [], //选中的id数组
      checkedAll: "",
    };
  },
  computed: {
    //购物车总价 数组includes方法，判断该数组是否有该值，返回布尔值
    AllPrice() {
      return this.cartList
        .filter((item) => this.result.includes(item.id))
        .reduce((pre, item) => {
          return (pre += item.num * item.goods.price);
        }, 0);
    },
  },
  methods: {
    //是否选中
    changeCheck(result) {
      //子复选框每次改变发送改变发请求同步
      checked({ cart_ids: result });
      //子复选框每次改变判断全选数组的长度是否等于购物车列表的长度，相等
      if (this.result.length == 0) {
        this.checkedAll = false;
      } else if (this.cartList.length == this.result.length) {
        this.checkedAll = true;
      } else {
        this.checkedAll = false;
      }
    },
    //是否全选
    All() {
      if (this.checkedAll) {
        //如果为真，拿到所有的id的数组赋值到选中数组中
        this.result = this.cartList.map((item) => item.id);
      } else {
        //如果为假，直接给选中数组赋空
        this.result = [];
      }
    },
    //修改商品数量
    changeNum(e) {
      const id = e.id;
      editCartGoodsCount(id, { num: e.num });
    },
    //移除购物车
    deleteClick(id) {
      outCart(id).then((res) => {
        this.getCartList();
      });
    },
    //结算跳转到订单预览
    onSubmit() {
      if (this.result.length != 0) this.$router.push("/preview");
    },
    //获取购物车列表
    getCartList() {
      getCart().then((res) => {
        this.cartList = res.data; //拿购物车列表数据
        this.result = res.data
          .filter((item) => item.is_checked == 1)
          .map((item) => item.id); //拿所有选中的id
      });
    },
  },
  mounted() {
    this.getCartList();
  },
};
</script>

<style scoped>
.item {
  position: relative;
}
.checked {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 4px;
  width: 31px;
  height: 31px;
  z-index: 10;
}
.van-submit-bar {
  bottom: 52px;
}
.delete-button {
  height: 100%;
}
</style>
