<template>
  <div class="cen-employee">
    <el-dialog title="用户列表" :visible.sync="dialogUser" width="900px" center>
      <el-table :data="tableData" :header-cell-style="tabHeader" style="width: 100%">
        <!-- <el-table-column type="index" label="序号" width="50"></el-table-column> -->
        <el-table-column type="index" label="单选" align="center" width="80">
          <template slot-scope="scope">
            <el-radio v-model="currentRowId" :label="scope.row.id" @change="changeRedio(scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="员工姓名" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="员工手机" width="120"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scoped">{{scoped.row.sex|sexStatus}}</template>
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号" width="170" show-overflow-tooltip>
          <template slot-scope="scoped">{{scoped.row.idCard|emptyString}}</template>
        </el-table-column>
        <el-table-column prop="department" label="员工部门" show-overflow-tooltip></el-table-column>
        <el-table-column prop="position" label="员工岗位"></el-table-column>
        <el-table-column prop="groups" label="所属组别">
          <template slot-scope="scoped">{{scoped.row.groups|contractStatus}}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="120px" show-overflow-tooltip>
          <template slot-scope="scoped">
            <el-tag v-if="scoped.row.status===1">启用</el-tag>
            <el-tag type="danger" v-else>冻结</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <Vpage :total="totalElements" :currPage="currPage" @currentChange="changePages"></Vpage>
     <div class="flex-center">
        <el-button size="medium" v-button @click="dialogUser = false">取 消</el-button>
        <el-button size="medium" type="primary" v-button @click="handleSure()">确定</el-button>
     </div>
    </el-dialog>
  </div>
</template>
<script>
import { tabHeader } from "@/utils/tool";
import { queryUserListOfPage } from "@/api/api"
import Vpage from '@/components/Vpage';
export default {
  data() {
    return {
      tabHeader,
      tableData: [],
      dialogUser: false,
      totalElements: 0,
      currentRowId:'',
      currPage: 0,
      filterList: {
        department: '',
        phone: '',
        name: ''
      },
      userData:{},
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
  created() {
    this.dataInit()
  },
  components:{Vpage},
  methods: {
    //   数据初始化
    dataInit() {
      let params = {
        page: this.currPage,
        size: 10,
        ...this.filterList,
        status:1,
      }
      queryUserListOfPage(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.content
          this.totalElements = res.data.totalElements
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 点击分页
    changePages(e){
      this.currPage = e
      this.dataInit()
    },
    // 点击单选按钮
    changeRedio(data) {
      this.userData = data
    },
    // 确定
    handleSure() {
      this.$emit('getMessage',this.userData)
      this.dialogUser = false
    },
  },
}
</script>
<style lang="less" scoped>
</style>