<!-- 员工管理 -->
<template>
  <div class="cen-male">
    <table-filter @search="getFilterList" :config="filterConfig" :searchobj.sync="filterList"></table-filter>
    <el-table :data="tableData" :header-cell-style="tabHeader" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="员工姓名" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="phone" label="员工手机" width="120"></el-table-column>
      <el-table-column prop="sex" label="性别">
         <template slot-scope="scoped">
          {{scoped.row.sex|sexStatus}}
        </template>
      </el-table-column>
      <el-table-column prop="idCard" label="身份证号" width="170" show-overflow-tooltip>
        <template slot-scope="scoped">
          {{scoped.row.idCard|emptyString}}
        </template>
      </el-table-column>
      <el-table-column prop="department" label="员工部门" show-overflow-tooltip></el-table-column>
      <el-table-column prop="position" label="员工岗位"></el-table-column>
      <el-table-column prop="groups" label="所属组别">
        <template slot-scope="scoped">
          {{scoped.row.groups|contractStatus}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120px" show-overflow-tooltip>
         <template slot-scope="scoped">
          <el-tag v-if="scoped.row.status===1">启用</el-tag>
          <el-tag type="danger" v-else>冻结</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="success" v-button @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" v-button @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex-between">
      <el-button type="success" icon="el-icon-circle-plus-outline" plain size="small" @click="handleAdd">新增员工</el-button>
      <Vpage :total="totalElements" :currPage="currPage" @currentChange="changePages"></Vpage>
    </div>
   
    <el-dialog title="员工信息" :visible.sync="dialogAdd" width="700px" @before-close="closeDialog" center>
      <el-form :model="formAdd" label-width="150px" :rules="employeeRules" class="cen-form cen-editor" ref="formAdd">
        <el-form-item label="员工姓名：" prop="name">
          <el-input v-model.trim="formAdd.name" autocomplete="off" placeholder="员工姓名" maxlength="16" clearable></el-input>
        </el-form-item>	
        <el-form-item label="员工手机：" prop="phone">
          <el-input v-model.trim="formAdd.phone" autocomplete="off" placeholder="员工手机" maxlength="11" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
         <el-select v-model="formAdd.sex" placeholder="请选择">
            <el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>  
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号：" prop="idCard">
          <el-input v-model.trim="formAdd.idCard" autocomplete="off" placeholder="身份证号" clearable></el-input>
        </el-form-item> 
        <el-form-item label="员工部门：" prop="department">
          <el-input v-model.trim="formAdd.department" autocomplete="off" placeholder="员工部门" maxlength="20" clearable></el-input>
        </el-form-item>
        <el-form-item label="员工岗位：" prop="position">
          <el-input v-model.trim="formAdd.position" autocomplete="off" placeholder="员工岗位" maxlength="20" clearable></el-input>
        </el-form-item>
         <el-form-item label="员工状态：" prop="status">
          <el-select v-model="formAdd.status" placeholder="请选择">
            <el-option v-for="item in userStatus" :key="item.value" :label="item.label" :value="item.value">
            </el-option>  
          </el-select>
        </el-form-item>
         <el-form-item label="所属组别：" prop="groups">
         <el-select v-model="formAdd.groups" placeholder="请选择">
            <el-option v-for="item in authorityList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>  
          </el-select>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model.trim="formAdd.password" autocomplete="off" placeholder="密码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" v-button @click="closeDialog">取 消</el-button>
          <el-button size="medium" type="primary" v-button @click="submitForm('formAdd')">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { tabHeader } from "@/utils/tool";
import TableFilter from '@/components/TableFilter';
import Vpage from '@/components/Vpage';
import {queryUserListOfPage,operateUser,deleteUser} from '@/api/api'
import {sexList,authorityList,userStatus} from '@/utils/data'
import {employeeRules} from "@/utils/valid"
export default {
  data() {
    return {
      sexList,
      tabHeader,
      userStatus,
      authorityList,
      employeeRules,
      totalElements: 0,
      currPage: 0,
      dialogAdd: false,
      formAdd: {},
      tableData: [],
      filterList: {
        department: '',
        phone:'',
        name: ''
      },
      filterConfig: [
        {
          code: "name",
          title: "员工姓名",
        },
        {
          code: "phone",
          title: "员工手机号",
        },
        {
          code: "department",
          title: "部门名称",
        },
      ]
    };
  },
  components: { TableFilter, Vpage },
  created() { 
    this.dataInit()
  },
  methods: {
    // 数据初始化
    dataInit(){
      let params = {
        page:this.currPage,
        size:10,
        ...this.filterList
      }
      queryUserListOfPage(params).then(res=>{
        if(res.code ===0){
          this.tableData = res.data.content
          this.totalElements = res.data.totalElements
        }else{
          this.$message.error(res.message)
        }
      })
    },
    // 点击搜索
    getFilterList() { 
      this.currPage = 1
      this.dataInit()
    },
    // 編輯用戶信息
    handleEdit(data) {
      this.dialogAdd = true
      this.formAdd = JSON.parse(JSON.stringify(data))
      this.formAdd.password = data.passwordBack
    },
    // 新增员工
    handleAdd(){
      this.dialogAdd = true
    },
    // 关闭弹窗
    closeDialog(){
       this.formAdd = {}
       this.$refs.formAdd.resetFields()
       this.dialogAdd =false
    },
    // 刪除用戶
    handleDelete(data) {
       this.$confirm("您确定要删除该用户吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res=>{
        deleteUser({id:data.id}).then(res=>{
         if(res.code === 0){
           this.dataInit()
           this.$message.success('员工删除成功')
          }else{
           this.$message.error(res.message)
          }
        })
      })
    },
    // 点击分页
    changePages(e) { 
      this.currPage = e 
      this.dataInit()
    },
    // 提交新增员工
    submitForm(formName) {
      this.$refs[formName].validate(valid=>{
        if(valid){
        operateUser(this.formAdd).then(res=>{
            if(res.code === 0){
              this.dialogAdd = false
              this.dataInit()
              this.$message.success('操作成功')
            }else{
              this.$message.error(res.message)
            }
          })
        }
      })
    },
  }
}

</script>
<style lang='less' scoped>
.cen-form {
  .user-img {
    width: 80px;
    height: 80px;
  }
}
</style>