<!-- 通话数据列表 -->
<template>
  <div class="cen-male">
    <table-filter @search="getFilterList" :config="filterConfig" :searchobj.sync="filterList"></table-filter>
    <el-table :data="tableData" :header-cell-style="tabHeader" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="created" label="创建时间"></el-table-column>
      <el-table-column prop="customerName" label="客户姓名" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="customerPhone" label="客户手机"></el-table-column>
      <el-table-column prop="beginCall" label="开始呼出时间" show-overflow-tooltip></el-table-column>
      <el-table-column prop="endCall" label="结束呼出时间"></el-table-column>
    </el-table>
    <div class="flex-between">
      <el-button type="success" icon="el-icon-circle-plus-outline" plain size="small" @click="dialogAdd=true">新增通话数据</el-button>
      <Vpage :total="totalElements" :currPage="currPage" @currentChange="changePages"></Vpage>
    </div>
    <el-dialog title="新增通话数据" :visible.sync="dialogAdd" width="700px" center>
      <el-form :model="formData" :rules="callRules" label-width="150px" class="cen-form cen-editor" ref="formDom">
        <el-form-item label="呼出员工姓名：" prop="userName">
          <el-input v-model.trim="formData.userName" autocomplete="off" @focus="handleFocus" placeholder="所属员工姓名" maxlength="16" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户姓名：" prop="customerName">
          <el-input v-model.trim="formData.customerName" autocomplete="off" placeholder="客户姓名" maxlength="16" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户手机：" prop="customerPhone">
          <el-input v-model.trim="formData.customerPhone" autocomplete="off" placeholder="客户手机" maxlength="11" clearable></el-input>
        </el-form-item>
        <el-form-item label="开始呼出时间：" prop="beginCall">
          <el-date-picker v-model="formData.beginCall" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始呼出时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束呼出时间：" prop="endCall">
          <el-date-picker v-model="formData.endCall" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束呼出时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button size="medium" v-button @click="dialogAdd=false">取 消</el-button>
          <el-button size="medium" type="primary" v-button @click="submitForm('formDom')">提交</el-button>
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
import { queryCallrecordOfPage, addCallrecord } from '@/api/api'
import { callRules } from '@/utils/valid'
import EmployeeList from '../../customerManage/distribution/components/EmployeeList'
export default {
  data() {
    return {
      tabHeader,
      totalElements: 20,
      currPage: 1,
      callRules,
      dialogAdd: false,
      formData: {
        userName: '',
        customerName: '',
        customerPhone: '',
        endCall: ''
      },
      tableData: [],
      filterList: {
        beginCall: '',
        endCall: '',
        name: '',
      },
      filterConfig: [
        {
          code: "beginCall",
          title: "开始呼出时间",
          type: 'date'
        },
        {
          code: "endCall",
          title: "结束呼出时间",
          type: 'date'
        },
        {
          code: "name",
          title: "客户姓名",
        },
      ]
    };
  },
  components: { TableFilter, Vpage, EmployeeList },
  created() {
    this.dataInit()
  },
  methods: {
    // 数据初始化
    dataInit() {
      let parmas = {
        page: this.currPage,
        size: 10,
        ...this.filterList
      }
      queryCallrecordOfPage(parmas).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.content
          this.totalElements = res.data.totalElements
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 点击搜索
    getFilterList() {
      this.currPage = 0
      this.dataInit()
    },
    // 点击分页
    changePages(e) {
      this.currPage = e
      this.dataInit()
    },
    // 获取焦点
    handleFocus() {
      this.$refs.employeeDom.dialogUser = true
    },
    // 获取弹窗中的参数locaeName
    getData(data) {
      this.$set(this.formData, 'userName', data.name)
      this.$set(this.formData, 'userId', data.id)
      console.log(data, 666)
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addCallrecord(this.formData).then(res => {
            if (res.code === 0) {
              this.dialogAdd = false
              this.dataInit()
              this.$message.success('新增成功')
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
    }
  }
}

</script>
<style lang='less' scoped>
</style>