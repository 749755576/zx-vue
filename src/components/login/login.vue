<template>
  <div class="login-wrap">
    <el-form
      style="border-radius: 10px;"
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formdata"
    >
      <h2 class="login-title">管理员登录</h2>
      <el-form-item label="用户名">    
        <el-input prefix-icon="el-icon-user" v-model="formdata.loginName">
        </el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input prefix-icon="el-icon-star-on" type="password" v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button style="margin-top: 20px" class="login-btn" @click="handleLogin" type="info">login</el-button>
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
        this.$router.push({name: 'index'})
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
  background-image: url('../../assets/imges/zx-login.jpg');
  /* 弹性盒布局 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin-right: 180px auto;
    padding: 35px 35px 85px 35px;
    box-shadow: 0 0 55px #909399;
}
.login-wrap .login-btn {
  width: 100%;
  margin-top: 50px;
}
.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>