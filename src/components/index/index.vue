<template>
  <el-container class="index-container">
    <el-aside :width="isclose ? '64px' : '200px'">
      <!-- 侧边栏菜单 -->
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#1890ff"
        unique-opened
        :collapse="isclose"
        :collapse-transition="false"
      >
        <!-- 一级菜单 -->
        <el-submenu v-for="item in menuList" :key="item.menuId" :index="item.menuId + ''">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.menuName}}</span>
          </template>
          <!-- 子菜单 -->
          <el-menu-item v-for="itemChildren in item.children" :key="itemChildren.menuId" :index="itemChildren.menuId + ''">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{itemChildren.menuName}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
          <el-button type="info" @click="isclosed" icon="el-icon-s-unfold" />
      </el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      isclose: false
    }
  },
  created() {
    this.getMenus()
  },
  methods: {
    getMenus() {
      this.$http
        .get('index', {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.code === 0) {
            const {data} = res.data.data
            this.menuList = data
            console.log('数据是'+data)
          } else {
            this.$message.error(res.data.info)
          }
        })
    },
    //展开/合闭 菜单
    isclosed() {
      this.isclose = !this.isclose
    }
  },
  beforeCreate() {
    const id = sessionStorage.getItem('Authorization')
    if (!id) {
      this.$router.push({ name: 'login' })
    }
  },
}
</script>

<style>
.index-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #545c64;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  line-height: 200px;
}
/* 取消边框 */
.el-aside .el-menu {
  border: none;
}

.el-main {
  background-color: beige;
  color: #333;
  text-align: center;
  line-height: 160px;
}


.el-icon-location {
  margin-right: 10px;
}
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
</style>