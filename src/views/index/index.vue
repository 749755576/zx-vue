<template>
  <el-container class="index-container">
    <el-aside :width="isclose ? '64px' : '200px'">
      <!-- 侧边栏菜单 -->
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#1890ff"
        :collapse="isclose"
        :collapse-transition="false"
        router
        unique-opened
        :default-active="actvieUrl"
      >
        <!-- 一级菜单 -->
        <el-submenu
          v-for="item in menuList"
          :key="item.menuId"
          :index="item.url + ''"
        >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.menuName }}</span>
          </template>
          <!-- 子菜单 -->
          <el-menu-item
            v-for="itemChildren in item.children"
            @click="saveNavState('/' + itemChildren.url)"
            :key="itemChildren.menuId"
            :index="'/' + itemChildren.url"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ itemChildren.menuName }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu class="head" index="2">
            <template slot="title">个人中心</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main>
        <!-- 路由占位符 -->
        <router-view />
      </el-main>
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
      // 是否折叠
      isclose: false,
      // 被激活的链接地址
      actvieUrl: '',
    }
  },
  created() {
    this.getMenus()
    this.actvieUrl = sessionStorage.getItem('actvieUrl')
  },
  methods: {
    getMenus() {
      this.$http.get('index').then((res) => {
        if (res.data.code === 0) {
          const { data } = res.data.data
          this.menuList = data
          console.log('数据是' + data)
        } else {
          this.$message.error(res.data.info)
        }
      })
    },
    //展开/合闭 菜单
    isclosed() {
      this.isclose = !this.isclose
    },
    // 链接激活状态
    saveNavState(actvieUrl) {
      sessionStorage.setItem('actvieUrl', actvieUrl)
      this.actvieUrl = actvieUrl
    },
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
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.head {
  width: 250px;
  border: none;
  position: absolute;
  left: 1450px;
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