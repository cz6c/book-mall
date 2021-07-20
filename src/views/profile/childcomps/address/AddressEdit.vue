<template>
  <div class="edit">
    <nav-bar>
      <template v-slot:left
        ><span @click="backClick" class="el-icon-arrow-left"></span
      ></template>
      <template v-slot:center>
        <div>编辑地址</div>
      </template>
    </nav-bar>
    <van-address-edit
      :area-list="areaList"
      :address-info="info"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { Toast } from "vant";
import { addressUpdate, addressDetail, addressRemove } from "network/address";
import { areaList } from "@vant/area-data";

export default {
  components: { NavBar },
  name: "",
  data() {
    return {
      areaList,
      searchResult: [],
      info: {},
    };
  },
  methods: {
    onSave(content) {
      //定义一个对象把服务器需要的数据放进去
      const data = {
        name: content.name,
        address: content.addressDetail,
        phone: content.tel,
        province: content.province,
        city: content.city,
        county: content.county,
        is_default: content.isDefault ? 1 : 0,
      };
      //调用封装好的更新请求，把修改后的数据发给服务器
      addressUpdate(this.$route.params.id, data).then((res) => {
        Toast("保存成功");
        this.$router.push("/address");
      });
    },
    onDelete() {
      addressRemove(this.$route.params.id).then((res) => {
        Toast("删除成功");
        this.$router.push("/address");
      });
    },
    backClick() {
      this.$router.go(-1);
    },
  },
  created() {
    //从服务器拿到地址数据
    addressDetail(this.$route.params.id).then((res) => {
      //把数据初始化到界面
      this.info = {
        name: res.name,
        tel: res.phone,
        addressDetail: res.address,
        isDefault: !!res.is_default,
      };
    });
  },
};
</script>

<style scoped>
.edit {
  height: 100vh;
  width: 100%;
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.el-icon-arrow-left {
  font-size: 26px;
  padding-left: 10px;
  line-height: 43px;
}
</style>
