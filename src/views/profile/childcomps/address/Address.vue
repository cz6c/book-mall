<template>
  <div>
    <nav-bar>
      <template v-slot:center>
        <div>地址管理</div>
      </template>
    </nav-bar>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
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
      chosenAddressId: "1",
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
          isDefault: item.is_default,
        };
      });
    });
  },
};
</script>

<style scoped>
</style>
