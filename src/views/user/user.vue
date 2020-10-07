<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="5">
          <el-input
            placeholder="请输入用户名"
            v-model="queryInfo.loginName"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            />
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="addUser">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="userList" style="width: 100%" stripe>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          width="100"
          align="center"
          label="用户编号"
          prop="userId"
        />
        <el-table-column
          width="200"
          align="center"
          label="用户名"
          prop="loginName"
        />
        <el-table-column width="100" align="center" label="性别" prop="sex">
          <template slot-scope="scope">
            <span v-if="scope.row.sex === 0">男</span>
            <span v-else>女</span>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          align="center"
          label="email"
          prop="email"
        />
        <el-table-column
          width="180"
          align="center"
          label="创建人"
          prop="createBy"
        />
        <el-table-column
          width="150"
          align="center"
          label="真实姓名"
          prop="userName"
        />
        <el-table-column width="200" align="center" label="状态" prop="status">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="0"
              inactive-value="1"
              @change="handleStatusChange(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          align="center"
          label="介绍"
          prop="remark"
        />
        <!-- 按钮区域 -->
        <el-table-column width="230" align="center" label="操作">
          <template slot-scope="scope">
            <el-tooltip
              :enterable="false"
              class="item"
              effect="dark"
              content="修改用户"
              placement="top"
            >
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="upUser(scope.row)"
                >修改</el-button
              >
            </el-tooltip>
            <el-tooltip
              :enterable="false"
              class="item"
              effect="dark"
              content="删除用户"
              placement="top"
            >
              <el-button
                v-if="scope.row.userId !== 1"
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="delUser(scope.row)"
                >删除</el-button
              >
            </el-tooltip>
            <el-tooltip
              :enterable="false"
              class="item"
              effect="dark"
              content="重置密码"
              placement="top"
            >
              <el-button
                v-if="scope.row.userId !== 1"
                size="mini"
                type="text"
                icon="el-icon-s-check"
                @click="upUserPassword(scope.row)"
                >重置密码</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加/修改用户的对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="addUserDialog"
      width="800px"
      append-to-body
    >
      <el-form
        ref="dataForm"
        :model="dataForm"
        :rules="rules"
        label-width="80px"
      >
        <el-row>
          <el-col :span="10">
            <el-form-item
              v-if="dataForm.userId == undefined"
              label="用户名"
              prop="loginName"
            >
              <el-input
                v-model="dataForm.loginName"
                placeholder="请输入用户名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="性别" prop="sex">
              <el-select v-model="dataForm.sex" placeholder="请选择性别">
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="email" prop="email">
              <el-input
                v-model="dataForm.email"
                placeholder="请输入邮箱"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="真实姓名" prop="userName">
              <el-input
                v-model="dataForm.userName"
                placeholder="请输入真实姓名"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="用户类型" prop="userType">
              <el-select
                v-model="dataForm.userType"
                placeholder="请选择用户类型"
              >
                <el-option label="系统管理员" value="0"></el-option>
                <el-option label="普通用户" value="1"></el-option>
                <el-option label="供货商" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="角色">
              <el-select v-model="dataForm.roleId" placeholder="请选择">
                <el-option
                  v-for="item in roleList"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="20">
            <el-form-item label="介绍" prop="remark">
              <el-input
                v-model="dataForm.remark"
                type="textarea"
                placeholder="请输入个人介绍"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="addUserDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 性别
      sex: '1',
      // 分页参数
      queryInfo: {
        loginName: '',
        // 当前页
        page: 1,
        // 页容量
        pageSize: 10,
      },
      // 用户数据
      userList: [],
      // 角色数据
      roleList: [],
      // 总记录数
      total: 0,
      // 添加用户对话框
      addUserDialog: false,
      // 表单数据
      dataForm: {},
      // 对话框标题
      title: '',
      rules: {
        loginName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      this.$http
        .get('user/getUserList', { params: this.queryInfo })
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            res.data.rows.forEach((element) => {
              element.status = element.status + ''
            })
            this.userList = res.data.rows
            this.total = res.data.total
          } else {
            this.$message.error(res.data.info)
          }
        })
    },
    getRoleList() {
      this.$http.get('role/getRole').then((res) => {
        if (res.data.status === 0) {
          this.roleList = res.data.data
        }
      })
    },
    // 监听pagesize改变的事件
    handleSizeChange(val) {
      this.queryInfo.pageSize = val
      this.getUserList()
    },
    // 监听page页码值
    handleCurrentChange(val) {
      this.queryInfo.page = val
      this.getUserList()
    },
    // 修改用户状态
    handleStatusChange(row) {
      this.$http
        .post('user/upUserStatusById', {
          userId: parseInt(row.userId),
          status: parseInt(row.status),
        })
        .then((res) => {
          this.$message({
            message: '成功',
            type: 'success',
          })
        })
    },
    // 添加用户按钮
    addUser() {
      this.addUserDialog = true
      this.dataForm = {}
      this.title = '添加用户'
      this.getRoleList()
    },
    // 修改用户按钮
    upUser(row) {
      this.addUserDialog = true
      this.getRoleList()
      this.title = '修改用户'
      this.dataForm = row
    },
    //  删除用户
    delUser(row) {
      this.$confirm('您确定要删除Id为'+ row.userId +'的数据项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('user/delUserById',{userId: row.userId}).then(res =>{
          this.$message({
            message: '删除成功',
            type: 'success',
          })
          this.getUserList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 重置密码
    upUserPassword(row) {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.$http.post('user/upUserPasswordById',{userId: row.userId,password: value}).then(res =>{
          this.$message({
            message: '修改成功',
            type: 'success',
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      });
    },
    // 提交表单
    submitForm(row) {
      if (this.title === '添加用户') {
        this.$http.post('user/addUser', this.dataForm).then((res) => {
          if (res.data.status === 0) {
            this.$message({
              message: '添加成功',
              type: 'success',
            })
            this.addUserDialog = false
            this.getUserList()
          }
        })
      } else {
        this.$http.post('user/upUserById', this.dataForm).then((res) => {
          if (res.data.status === 0) {
            this.$message({
              message: '修改成功',
              type: 'success',
            })
            this.addUserDialog = false
            this.getUserList()
          }
        })
      }
    },
  },
}
</script>

<style>
.el-row {
  position: relative;
  top: -50px;
  left: 50px;
}
.el-table {
  position: relative;
  top: -100px;
  font-size: 15px;
}
.el-pagination {
  margin-top: 25px;
}
.el-form-item {
  position: relative;
  top: 30px;
  right: 30px;
}
</style>>