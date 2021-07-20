<template>
  <div>
    <nav-bar>
      <template v-slot:left
        ><span @click="backClick" class="el-icon-arrow-left"></span
      ></template>
      <template v-slot:center>
        <div>地址管理</div>
      </template>
    </nav-bar>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { Toast } from "vant";
import { addressList } from "network/address";
import router from "@/router/index";

export default {
  name: "address",
  components: { NavBar },
  data() {
    return {
      chosenAddressId: "",
      list: [],
    };
  },
  computed: {},
  watch: {},
  methods: {
    onAdd() {
      Toast("新增地址");
      router.push("/addressadd");
    },
    onEdit(item) {
      Toast("编辑地址");
      router.push("/addressedit/" + item.id);
    },
    backClick() {
      router.go(-1);
    },
  },
  created() {
    addressList().then((res) => {
      //把服务器返回的res.data数组中的每个对象处理返回后映射到this.list这个数组中展示
      this.list = res.data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          tel: item.phone,
          address: item.address,
          isDefault: !!item.is_default,
        };
      });
      //默认勾选默认地址
      this.chosenAddressId = this.list.filter((item) => {
        return item.isDefault == true;
      })[0].id;
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
</style>
