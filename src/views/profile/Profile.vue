<template>
  <div>
    <nav-bar>
      <template v-slot:center>
        <div>个人中心</div>
      </template>
    </nav-bar>
    <div class="me">
      <img src="~assets/img/log.png" alt="" />
      <div class="name">昵称：{{ user.name }}</div>
      <div class="loginname">用户名：{{ user.email }}</div>
    </div>
    <div class="list">
      <ul>
        <li @click="$router.push('/collection')">
          我的收藏<van-icon name="arrow" />
        </li>
        <li @click="$router.push('/order')">
          我的订单<van-icon name="arrow" />
        </li>
        <li @click="$router.push('/account')">
          账号管理<van-icon name="arrow" />
        </li>
        <li @click="$router.push('/address')">
          地址管理<van-icon name="arrow" />
        </li>
        <li @click="$router.push('/about')">
          关于我们<van-icon name="arrow" />
        </li>
      </ul>
    </div>
    <van-button type="primary" round block @click="logoutClick"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { logout, getuser } from "network/user";
import NavBar from "components/common/navbar/NavBar";
import { Toast } from "vant";

export default {
  name: "",
  components: { NavBar },
  data() {
    return {
      user: {},
    };
  },
  computed: {},
  watch: {},
  methods: {
    logoutClick() {
      logout().then((res) => {
        Toast.success("退出成功");
        //清除token
        // window.localStorage.setItem("token", "");
        window.localStorage.removeItem("token");
        //并更改vuex中istoken的状态为false
        this.$store.commit("getIsToken", false);
        //随后跳转到登录页面
        setTimeout(() => {
          this.$router.push("/login");
        }, 500);
      });
    },
  },
  created() {
    getuser().then((res) => {
      this.user = res;
    });
  },
};
</script>

<style scoped>
.me {
  position: relative;
  height: 120px;
  width: 96%;
  background-color: #1989fa;
  margin: 8px auto 26px;
  border-radius: 10px;
  color: #fff;
}
.me img {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 25px;
  width: 80px;
  height: 80px;
  background-color: #fff;
  border-radius: 50%;
  overflow: hidden;
}
.me .name {
  position: absolute;
  left: 119px;
  top: 32%;
}
.me .loginname {
  position: absolute;
  left: 119px;
  top: 52%;
}
.list li {
  height: 60px;
  line-height: 60px;
  margin: 0 10px;
}
.van-icon {
  float: right;
  top: 20px;
  font-size: 18px;
}
.van-button {
  margin: 20px 0;
}
</style>
