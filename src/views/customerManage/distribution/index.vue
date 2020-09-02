<!--已分配客户 -->
<template>
  <div class="cen-male">
    <table-filter @search="getFilterList" :config="filterConfig" :searchobj.sync="filterList"></table-filter>
    <el-table :data="tableData" :header-cell-style="tabHeader" style="width: 100%" @select="getSomeTable" @select-all="setAllTable">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="locatedName" label="所属员工姓名" width="120" show-overflow-tooltip>
        <template slot-scope="scoped">{{scoped.row.locatedName|emptyString}}</template>
      </el-table-column>
      <el-table-column prop="name" label="客户姓名" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="phone" label="客户手机号" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="客户状态">
        <template slot-scope="scoped">
          <el-tag size="mini" v-if="scoped.row.status===1">启用</el-tag>
          <el-tag size="mini" type="danger" v-else>冻结</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="origin" label="来源">
        <template slot-scope="scoped">{{scoped.row.origin|emptyString}}</template>
      </el-table-column>
      <el-table-column prop="isLocated" label="是否分配" show-overflow-tooltip>
        <template slot-scope="scoped">
          <el-tag size="mini" v-if="scoped.row.isLocated===1">已分配</el-tag>
          <el-tag size="mini" type="danger" v-else>未分配</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="city" label="城市">
        <template slot-scope="scoped">{{scoped.row.city|emptyString}}</template>
      </el-table-column>
      <el-table-column prop="score" label="评分">
        <template slot-scope="scoped">{{scoped.row.score|emptyString}}</template>
      </el-table-column>
      <el-table-column prop="avgPrice" label="均价">
        <template slot-scope="scoped">{{scoped.row.avgPrice|emptyString}}</template>
      </el-table-column>
      <el-table-column prop="score" label="地址" width="150" show-overflow-tooltip>
        <template slot-scope="scoped">{{scoped.row.address|emptyString}}</template>
      </el-table-column>
      <el-table-column prop="remark" label="备注">
        <template slot-scope="scoped">{{scoped.row.remark|emptyString}}</template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="success" v-button @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" v-button @click="handleDelete(scope.row)">删除</el-button>
          <!-- <el-button size="mini" type="warning" v-button v-if="scope.row.isLocated===1" @click="handleReset(scope.row)">回收</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="flex-between">
      <!-- <div>
        <el-button type="success" icon="el-icon-circle-plus-outline" size="small" plain @click="addCustomer">新增客户</el-button>
        <el-upload class="upload-demo" :action="importCustomer" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <el-button size="small" icon="el-icon-upload2" plain type="warning">导入客户信息</el-button>
        </el-upload>
      </div>-->
      <el-button size="small" type="warning" icon="el-icon-d-caret" v-button plain @click="handleReset">回收客户</el-button>
      <!-- <Vpage :total="totalElements" :currPage="currPage+1" :pageSize="50" @currentChange="changePages"></Vpage> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="changePages"
        :current-page="currPage+1"
        :page-sizes="[50, 200, 500, 1000]"
        :page-size="pageSize"
        layout="total,sizes, prev, pager, next"
        :total="totalElements"
      ></el-pagination>
    </div>
    <!-- 新增客户信息 -->
    <el-dialog title="客户信息" :visible.sync="dialogAdd" width="700px" :before-close="closeDialog" center>
      <el-form :model="formAdd" label-width="150px" :rules="customerRules" class="cen-form cen-editor" ref="formDom">
        <el-form-item label="所属员工姓名：" prop="locatedName">
          <el-input v-model.trim="formAdd.locatedName" autocomplete="off" @focus="handleFocus" placeholder="所属员工姓名" maxlength="16" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户姓名：" prop="name">
          <el-input v-model.trim="formAdd.name" autocomplete="off" placeholder="请输入客户姓名" maxlength="16" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户手机号：" prop="phone">
          <el-input v-model.trim="formAdd.phone" autocomplete="off" placeholder="请输入客户手机号" maxlength="11" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户状态：" prop="status">
          <el-select v-model="formAdd.status" placeholder="请选择客户状态">
            <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在城市：" prop="city">
          <el-input v-model.trim="formAdd.city" autocomplete="off" placeholder="请输入城市" maxlength="50" clearable></el-input>
        </el-form-item>
        <el-form-item label="均价：" prop="avgPrice">
          <el-input v-model.number="formAdd.avgPrice" autocomplete="off" placeholder="请输入均价" maxlength="11" clearable></el-input>
        </el-form-item>
        <el-form-item label="评分：" prop="score">
          <el-input v-model.number="formAdd.score" autocomplete="off" placeholder="请输入评分" maxlength="11" clearable></el-input>
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input v-model.trim="formAdd.address" autocomplete="off" placeholder="请输入地址" maxlength="50" clearable></el-input>
        </el-form-item>
        <!-- <el-form-item label="是否分配：" prop="isLocated">
          <el-select v-model="formAdd.isLocated" placeholder="请选择是否分配">
            <el-option v-for="item in judgeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="备注：" prop="remark">
          <el-input type="textarea" style="width:250px" v-model.trim="formAdd.remark" autocomplete="off" placeholder="请填写" maxlength="200" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" v-button @click="closeDialog">取 消</el-button>
          <el-button size="medium" type="primary" v-button @click="submitForm('formDom')">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 员工列表信息 -->
    <employee-list ref="employeeDom" @getMessage="getData"></employee-list>
  </div>
</template>

<script>
import { tabHeader } from "@/utils/tool";
import TableFilter from '@/components/TableFilter';
import Vpage from '@/components/Vpage';
import { queryCustomerListOfPage, operateCustomer, importCustomer, queryUserListOfPage, deleteCustomer, recycleCustomerBatch } from '@/api/api';
import { judgeList, roleList, distributionList, userStatus } from '@/utils/data'
import { customerRules } from '@/utils/valid'
import EmployeeList from './components/EmployeeList'
export default {
  data() {
    return {
      tabHeader,
      judgeList,
      roleList,
      customerRules,
      importCustomer,
      totalElements: 0,
      currPage: 0,
      pageSize: 50,
      dialogAdd: false,//新增弹窗
      tableData: [],
      formAdd: {},
      userList: [],
      filterList: {
        locatedName: '',
        name: '',
        isLocated: 1,
        status: '',
        keywordSearch: '',
        phone: ''
      },
      filterConfig: [
        {
          code: "status",
          title: "客户状态",
          type: 'select',
          options: userStatus,
        },
        {
          code: "locatedName",
          title: "所属员工名称",
        },
        {
          code: "name",
          title: "客户姓名",
        },
        {
          code: "phone",
          title: "客户手机号",
        },
        {
          code: "keywordSearch",
          title: "关键字",
        },
      ]
    };
  },
  components: { TableFilter, Vpage, EmployeeList },
  created() {
    this.dataInit()
    // this.getUser()
  },
  computed: {
    getPages() {
      return this.currPage + 1
    }
  },
  methods: {
    // 数据初始化
    dataInit() {
      let params = {
        page: this.currPage,
        size: this.pageSize,
        ...this.filterList
      }
      queryCustomerListOfPage(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.content
          this.totalElements = res.data.totalElements
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 获取焦点
    handleFocus() {
      this.$refs.employeeDom.dialogUser = true
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size < 1024 * 1024 * 5;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isLt2M;
    },
    // 上传成功
    handleAvatarSuccess(res) {
      console.log(res)
      if (res.code === 0) {
        this.$message.success('上传成功')
      } else {
        this.$message.error(res.message)
      }
    },
    // 新增客户
    addCustomer() {
      this.dialogAdd = true
    },
    // 编辑客户
    handleEdit(data) {
      this.dialogAdd = true
      this.formAdd = JSON.parse(JSON.stringify(data))
    },
    // 删除客户
    handleDelete(data) {
      this.$confirm("您确定要删除该客户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        deleteCustomer({ id: data.id }).then(res => {
          if (res.code === 0) {
            this.dataInit()
            this.$message.success('客户删除成功')
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },
    // 点击某几个
    getSomeTable(row) {
      this.userList = row
    },
    // 点击全选
    setAllTable(row) {
      this.userList = row
    },
    // 回收此客户
    handleReset(data) {
      if (!this.userList.length) {
        this.$message.warning('请先勾选客户，再进行回收客户操作')
        return
      }
      this.$confirm(`您确定要回收客户吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        let ids = this.userList.map(item => {
          return item.id
        })
        let params = {
          ids: ids,
          // locatedId: data.locatedId
        }
        recycleCustomerBatch(params).then(res => {
          if (res.code === 0) {
            this.dataInit()
            this.$message.success("操作成功")
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },
    // 关闭弹窗
    closeDialog() {
      this.$refs.formDom.resetFields()
      this.dialogAdd = false
    },
    // 新增客户信息
    submitForm(formName) {
      console.log(this.formAdd, 99)
      this.$refs[formName].validate(valid => {
        if (valid) {
          operateCustomer(this.formAdd).then(res => {
            if (res.code === 0) {
              this.dialogAdd = false
              this.dataInit()
              this.$message.success('操作成功')
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    },
    // 获取弹窗中的参数locaeName
    getData(data) {
      this.$set(this.formAdd, 'locatedName', data.name)
      this.$set(this.formAdd, 'locatedId', data.id)
      console.log(data, 666)
    },
    // 点击搜索
    getFilterList() {
      this.currPage = 0
      this.dataInit()
    },
    // 点击分页
    changePages(e) {
      this.currPage = e - 1
      this.dataInit()
    },
    // 修改分页数
    handleSizeChange(e) {
      this.pageSize = e
      console.log('分页数', e)
    }
  }
}

</script>
<style lang='less' scoped>
.flex-between{
  margin-top:20px;
}
.upload-demo {
  float: left;
  margin-right: 20px;
}
</style>