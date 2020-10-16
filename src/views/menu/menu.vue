<template>
  <div class="app-container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>资源管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-input placeholder="请输入资源名称">
          <el-button slot="append" icon="el-icon-search" @click="getMenuList" />
        </el-input>
      </el-col>
    </el-row>
    <!-- 资源列表 -->
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="menuId"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="menuName" label="菜单名称" sortable width="180" />
      <el-table-column prop="menuType" label="资源类型" />
      <el-table-column prop="perms" label="权限字符串" />
      <el-table-column prop="url" label="资源链接" />
      <el-table-column prop="remark" label="资源介绍" />
      <el-table-column width="230" align="center" label="操作">
        <template slot-scope="scope">
          <el-tooltip
            :enterable="false"
            class="item"
            effect="dark"
            content="添加资源"
            placement="top"
          >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="addMenu(scope.row)"
              >添加</el-button
            >
          </el-tooltip>
          <el-tooltip
            :enterable="false"
            class="item"
            effect="dark"
            content="修改资源"
            placement="top"
          >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="upMenu(scope.row)"
              >修改</el-button
            >
          </el-tooltip>
          <el-tooltip
            :enterable="false"
            class="item"
            effect="dark"
            content="删除资源"
            placement="top"
          >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="delMenu(scope.row)"
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
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加或修改菜单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单">
              <template>
                <el-select v-model="form.parentId" placeholder="请选择">
                  <el-option
                    v-for="item in menuData"
                    :key="item.menuId"
                    :label="item.menuName"
                    :value="item.menuId">
                  </el-option>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="menuType">
              <el-radio-group v-model="form.menuType">
                <el-radio label="M">目录</el-radio>
                <el-radio label="C">菜单</el-radio>
                <el-radio label="F">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.icon != 'M'" label="图标">
              <el-input
                v-model="form.icon"
                placeholder="请输入图标"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="form.menuName" placeholder="请输入菜单名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number
                v-model="form.orderNum"
                controls-position="right"
                :min="0"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="form.menuType != 'F'"
              label="路由地址"
              prop="path"
            >
              <el-input v-model="form.url" placeholder="请输入路由地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'M'" label="权限标识">
              <el-input
                v-model="form.perms"
                placeholder="请权限标识"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'F'" label="显示状态">
              <el-radio v-model="radio" label="0">显示</el-radio>
              <el-radio v-model="radio" label="1">隐藏</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 模态框标题
      title: '',
      // 单选框
      radio: '0',
      // 添加修改模态框
      open: false,
      // 添加修改表单
      form: {},
      // 资源数据
      tableData: [],
      // 普通资源链表
      menuData: []
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    getMenuList() {
      this.$http.get('menu/getMenuList').then((res) => {
        console.log(res)
        if (res.data.status === 0) {
          console.log(res.data.data)
          this.tableData = res.data.data
        } else {
          this.$message.error(res.data.info)
        }
      })
    },
    addMenu(row) {
      this.open = true
      this.title = '添加资源'
      this.form = {}
      this.$http.get('menu/getList').then((res) => {
        this.menuData = res.data.data
      })
    },
    upMenu(row) {
      this.open = true
      this.title = '修改资源'
      this.form = row
      this.$http.get('menu/getList').then((res) => {
        this.menuData = res.data.data
      })
    },
    submitForm() {
      if (this.title === '添加资源') {
        this.$http.post('menu/addMenu', this.form).then((res) => {
          if (res.data.status === 0) {
            this.$message({
              message: '添加成功',
              type: 'success',
            })
            this.cancel()
            this.getMenuList()
          }
        })
      } else {
        this.$http.post('menu/upMenuById', this.form).then((res) => {
          if (res.data.status === 0) {
            this.$message({
              message: '修改成功',
              type: 'success',
            })
            this.cancel()
            this.getMenuList()
          }
        })
      }
    },
    cancel() {
      this.open = false
    },
    delMenu(row) {

    }
  },
}
</script>

<style>
</style>>