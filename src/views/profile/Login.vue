<template>
  <div>
    <nav-bar>
      <template v-slot:center>
        <div>登录</div>
      </template>
    </nav-bar>
    <div class="log">
      <img src="~assets/img/log.png" alt="" />
      <span>企鹅bookmall</span>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div class="jump" @click="$router.push('/register')">
        无账号，立即注册
      </div>
      <div style="margin: 16px" class="submit">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { login } from "network/user";
import { Toast } from "vant";

export default {
  name: "",
  components: { NavBar },
  data() {
    return {
      password: "",
      email: "",
    };
  },
  methods: {
    onSubmit(values) {
      login(values).then((res) => {
        //将token保存在本地window.localStorage.setItem()
        window.localStorage.setItem("token", res.access_token);
        //更改vuex 中istoken的状态为true
        this.$store.commit("getIsToken", true);
        Toast.success("登录成功");
        //随后跳转到上一页
        setTimeout(() => {
          this.$router.push("/profile");
        }, 500);
      });
    },
  },
};
</script>

<style scoped>
.log {
  position: relative;
  padding: 86px;
}
.log img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
.log span {
  position: absolute;
  top: 36px;
  left: 130px;
  color: #5fa4e8;
  font-size: 20px;
}
.jump {
  height: 20px;
  line-height: 20px;
  margin: 10px;
  font-size: 14px;
  color: #5fa4e8;
}
</style>
