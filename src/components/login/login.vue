<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formdata"
    >
      <h2>管理员登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.loginName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button class="login-btn" @click="handleLogin" type="info">login</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        loginName: '',
        password: '',
      },
    }
  },
  methods: {
    handleLogin() {
      this.$http.post('auth',this.formdata).then(res => {
        if(res.data.code === 0){
          this.$message({
            message: '登录成功',
            type: 'success'
          })
        }else{
          this.$message.error(res.data.info);
        }
      })
    }
  }
};
</script>

<style>
.login-wrap {
  height: 100%;
  background-color: #324152;
  /* 弹性盒布局 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}
.login-wrap .login-btn {
  width: 100%;
}
</style>