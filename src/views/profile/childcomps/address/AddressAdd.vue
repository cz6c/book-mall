<template>
  <div class="add">
    <nav-bar>
      <template v-slot:left
        ><span @click="backClick" class="el-icon-arrow-left"></span
      ></template>
      <template v-slot:center>
        <div>新增地址</div>
      </template>
    </nav-bar>
    <van-address-edit
      :area-list="areaList"
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
import { address } from "network/address";
import { areaList } from "@vant/area-data";

export default {
  components: { NavBar },
  name: "",
  data() {
    return {
      areaList,
      searchResult: [],
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
      //调用封装好的添加请求，把数据发给服务器
      address(data).then((res) => {
        Toast("保存成功");
        this.$router.push("/address");
      });
    },
    backClick() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.add {
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
