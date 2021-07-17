<template>
  <div>
    <nav-bar>
      <template v-slot:center>
        <div>新用户注册</div>
      </template>
    </nav-bar>
    <div class="log">
      <img src="~assets/img/log.png" alt="" />
      <span>企鹅bookmall</span>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="name"
        name="name"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
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
      <van-field
        v-model="password_confirmation"
        type="password"
        name="password_confirmation"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请保持输入密码一致' }]"
      />
      <div class="jump" @click="$router.push('/login')">已有账号，立即登录</div>
      <div style="margin: 16px" class="submit">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from "vant";
import NavBar from "components/common/navbar/NavBar";
import { register } from "network/user";

export default {
  name: "",
  components: { NavBar },
  data() {
    return {
      name: "",
      password: "",
      email: "",
      password_confirmation: "",
    };
  },
  methods: {
    onSubmit(values) {
      register(values).then((res) => {
        if (res.status == 201) {
          Toast.success("注册成功");
          setTimeout(() => {
            this.$router.push("/Login");
          }, 1000);
        }
      });
    },
  },
};
</script>

<style scoped>
.log {
  position: relative;
  padding: 55px;
}
.log img {
  width: 260px;
  height: 160px;
  border-radius: 50%;
}
.log span {
  position: absolute;
  top: 30px;
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
