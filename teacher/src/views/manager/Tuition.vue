<template>
  <el-row>
    <!--查询组件-->
    <el-col style="margin: 15px 0;">
      <!--学生编号-->
      <el-col style="width: 247px; height: 45px">
        <el-input v-model="form.id" placeholder="请输入学生编号" style="width: 217px;"></el-input>
      </el-col>
      <!--学生姓名-->
      <el-col style="width: 247px; height: 45px">
        <el-input v-model="form.name" placeholder="请输入学生姓名" style="width: 217px;"></el-input>
      </el-col>
      <!--学生性别-->
      <el-col style="width: 247px; height: 45px">
        <el-select v-model="form.sex" placeholder="请选择学生性别" style="width: 217px;">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-col>
      <!--学生学历-->
      <el-col style="width: 247px; height: 45px">
        <el-select v-model="form.xl" placeholder="请选择学生学历" style="width: 217px;">
          <el-option label="高中" value="高中"></el-option>
          <el-option label="大学" value="大学"></el-option>
          <el-option label="大专" value="大专"></el-option>
        </el-select>
      </el-col>
      <!--入学日期范围-->
      <el-col style="width: 247px; height: 45px">
        <el-date-picker type="date" placeholder="请选择入学日期范围" v-model="form.date1" style="width: 217px;"></el-date-picker>
      </el-col>
      <el-col style="width: 247px; height: 45px">
        <el-date-picker type="date" placeholder="请选择入学日期范围" v-model="form.date2" style="width: 217px;"></el-date-picker>
      </el-col>
      <el-col style="width: 70px; height: 45px">
        <el-button type="primary" @click="getDataByPage">查询</el-button>
      </el-col>
      <el-col style="width: 70px; height: 45px">
        <el-button type="primary" @click="handleClick">清空</el-button>
      </el-col>
      <el-col style="width: 70px; height: 45px">
        <el-button type="primary" @click="getDataUnpaid">查看未交学费学生</el-button>
      </el-col>
    </el-col>
  
    <!--当前学费缴纳信息-->
    <el-col>
      <!-- 表格 -->
      <el-table v-loading.body="listLoading" :data="tableData" border style="width: 100%;">
  
        <el-table-column fixed prop="studentId" label="学生编号" sortable width="200">
        </el-table-column>
        <el-table-column prop="studentName" label="姓名" width="150">
        </el-table-column>
        <el-table-column prop="studentSex" label="性别" width="90">
        </el-table-column>
        <el-table-column prop="stuEducation" label="学历" width="90">
        </el-table-column>
        <el-table-column prop="studentDateStr" label="入学日期" width="200">
        </el-table-column>
        <el-table-column prop="firstMoney" label="第一次缴费" width="150">
        </el-table-column>
        <el-table-column prop="firstMoneyTimeStr" label="缴费时间" width="200">
        </el-table-column>
        <el-table-column prop="secondMoney" label="第二次缴费" width="150">
        </el-table-column>
        <el-table-column prop="seMoneyTimeStr" label="缴费时间" width="200">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template scope="scope">
            <el-button type="text" @click="getDataById(scope.$index, scope.row)" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!--分页-->
      <el-pagination style="float: right; margin: 12px 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 40, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-col>
  
    <!--未交学费学生-->
    <el-col>
      <el-dialog title="未交学费学生" v-loading.body="listLoading1" :visible.sync="dialogTableVisible1">
        <el-col>
          <!-- 表格 -->
          <el-table v-loading.body="listLoading" :data="tableData1" border style="width: 100%;">
            <el-table-column fixed prop="studentId" label="学生编号" sortable width="200">
            </el-table-column>
            <el-table-column prop="studentName" label="姓名" width="150">
            </el-table-column>
            <el-table-column prop="studentSex" label="性别" width="90">
            </el-table-column>
            <el-table-column prop="stuEducation" label="学历" width="90">
            </el-table-column>
            <el-table-column prop="studentDateStr" label="入学日期" width="200">
            </el-table-column>
            <el-table-column prop="firstMoney" label="第一次缴费" width="150">
            </el-table-column>
            <el-table-column prop="firstMoneyTimeStr" label="缴费时间" width="200">
            </el-table-column>
          </el-table>
  
          <!--分页-->
          <el-pagination style="float: right; margin: 12px 10px;" @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="currentPage1" :page-sizes="[5, 10, 20, 40, 100]" :page-size="pageSize1" layout="total, sizes, prev, pager, next, jumper" :total="total1">
          </el-pagination>
        </el-col>
      </el-dialog>
    </el-col>
  
    <!--编辑界面-->
    <el-col>
      <el-dialog title="修改学费信息" v-loading.body="editLoading" :visible.sync="dialogFormVisible">
        <el-col style="width: 50%; margin-right: 50px;">
          <el-form v-model="editData" style="width: 100%;" ref="editForm">
            <!--学生编号-->
            <el-form-item label="学生编号" prop="studentId" :label-width="formLabelWidth">
              <el-input v-model="editData.studentId" :disabled="true" style="width: 100%;"></el-input>
            </el-form-item>
            <!--学生姓名-->
            <el-form-item label="学生名称" prop="studentName" :label-width="formLabelWidth">
              <el-input v-model="editData.studentName" :disabled="true" style="width: 100%;"></el-input>
            </el-form-item>
            <!--第一次缴费-->
            <el-form-item label="第一次缴费" prop="firstMoney" :label-width="formLabelWidth">
              <el-input v-model="editData.firstMoney" placeholder="请输入缴费金额" :disabled="true" style="width: 100%;"></el-input>
            </el-form-item>
            <!--第一次缴费时间-->
            <el-form-item label="第一次缴费时间" prop="firstMoneyTime" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="请选择缴费时间" v-model="editData.firstMoneyTimeStr" :disabled="true" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <!--第二次缴费-->
            <el-form-item label="第二次缴费" prop="secondMoney" :label-width="formLabelWidth">
              <el-input v-model="editData.secondMoney" placeholder="请输入缴费金额" :disabled="true" style="width: 100%;"></el-input>
            </el-form-item>
            <!--第二次缴费时间-->
            <el-form-item label="第二次缴费时间" prop="secondMoneyTime" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="请选择缴费时间" v-model="editData.seMoneyTimeStr" :disabled="true" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
  
        <el-col style="width: 38%;">
          <el-form :model="editForm" ref="editForm" style="width: 100%;">
            <!--学生编号-->
            <el-form-item label="" prop="studentId">
              <el-input v-model="editForm.studentId" :disabled="true" style="width: 100%;"></el-input>
            </el-form-item>
            <!--学生姓名-->
            <el-form-item label="" prop="studentName">
              <el-input v-model="editForm.studentName" :disabled="true" style="width: 100%;"></el-input>
            </el-form-item>
            <!--第一次缴费-->
            <el-form-item label="" prop="firstMoney">
              <el-input v-model="editForm.firstMoney" placeholder="请输入缴费金额" style="width: 100%;"></el-input>
            </el-form-item>
            <!--第一次缴费时间-->
            <el-form-item label="" prop="firstMoneyTime">
              <el-date-picker type="date" placeholder="请选择缴费时间" v-model="editForm.firstMoneyTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <!--第二次缴费-->
            <el-form-item label="" prop="secondMoney">
              <el-input v-model="editForm.secondMoney" placeholder="请输入缴费金额" style="width: 100%;"></el-input>
            </el-form-item>
            <!--第二次缴费时间-->
            <el-form-item label="" prop="secondMoneyTime">
              <el-date-picker type="date" placeholder="请选择缴费时间" v-model="editForm.secondMoneyTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
  
        <el-col slot="footer" style="float: right; margin:0px 60px 20px 0px;" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </el-col>
      </el-dialog>
    </el-col>
  
  </el-row>
</template>


<script>
// 引入相应的方法
import util from '../../common/js/util';
import constant from '../../common/js/constant';
import { listStucostBy, listStucostUnpaid, updateStucostById } from '../../api/api';

export default {
  data() {
    return {
      activeName: 'first',
      tableData: [], tableData1: [],
      total: 0, total1: 0,    //列表总条数
      pageSize: 10, pageSize1: 10,    //每页条数
      currentPage: 1, currentPage1: 1,    //当前页码
      listLoading: false, listLoading1: false,
      editLoading: false,
      dialogFormVisible: false, dialogTableVisible1: false,
      sels: [],    //列表选中咧
      formLabelWidth: '150px',
      form: {
        id: '', name: '', sex: '', xl: '', date1: '', date2: ''
      },
      editData: {
        studentId: '',
        studentName: '',
        firstMoney: '',
        firstMoneyTimeStr: '',
        secondMoney: '',
        seMoneyTimeStr: ''
      },
      editForm: {
        studentId: '',
        studentName: '',
        firstMoney: '',
        firstMoneyTime: util.formatDate.format(new Date(), 'yyyy-MM-dd'),
        secondMoney: '',
        secondMoneyTime: util.formatDate.format(new Date(), 'yyyy-MM-dd')
      }
    }
  },
  methods: {

    // 多条件查询
    getDataByPage() {
      let para = {
        pageNo: this.currentPage,    //当前页
        pageSize: this.pageSize    //每页记录数
      };

      para = Object.assign(para, this.filters);

      // 1.判断入学日期范围是否可用
      if ((this.form.date1 != '' && this.form.date2 == '') || (this.form.date1 == '' && this.form.date2 != '')) {
        // 若date1或date2其中只有一个不为空
        this.$message("请选择日期范围");
      }
      if (this.form.date1 != '' && this.form.date2 != '') {
        // 若date1，date2不为空且date1大于date2
        if (this.form.date1 >= this.form.date2) {
          this.$message.error('请选择正确的日期范围');
          // 清空表单
          this.handleClick();
        } else {
          para.startDate = util.formatDate.format(new Date(this.form.date1), 'yyyy-MM-dd');    //开始日期
          para.endDate = util.formatDate.format(new Date(this.form.date2), 'yyyy-MM-dd');    //结束日期
        }
      }
      // 2.判断学生编号是否可用
      if (this.form.id != '') {
        para.studentId = this.form.id;    //学生编号
        console.log(this.form.id);
      }
      // 3.判断学生姓名是否可用
      if (this.form.name != '') {
        para.studentName = this.form.name;  //学生姓名
        console.log(this.form.name);
      }
      // 4.判断学生性别是否可用
      if (this.form.sex != '') {
        para.studentSex = this.form.sex;    //学生性别
        console.log(this.form.sex);
      }
      // 5.判断学生学历是否可用
      if (this.form.xl != '') {
        para.stuEducation = this.form.xl;    //学生学历
        console.log(this.form.xl);
      }

      listStucostBy(para).then((res) => {

        // 后台数据
        if (res.resCode == 0) {
          this.total = res.resData.total;
          this.pageSize = res.resData.pageSize;
          this.tableData = res.resData.list;
          this.$message(res.resMsg);
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },

    // 从当前页面获取学费信息
    getDataById(index, row) {
      this.dialogFormVisible = true;
      this.editData = row;
      this.editForm.studentId = row.studentId;
      this.editForm.studentName = row.studentName;
    },

    // 提交编辑页面
    onSubmit() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true;
            let para = Object.assign({}, this.editForm);

            updateStucostById(para).then((res) => {
              this.editLoading = false;
              if (res.resCode == 0) {
                this.$message(res.resMsg);
                this.$refs.editForm.resetFields();
                this.dialogFormVisible = false;
                //调用多条件查询
                this.getDataByPage();
              } else {
                this.$message.error(res.resMsg);
              }
            });
          });
        }
      });
    },

    // 未交学费【以现在时间减去入校时间算出应该交的学费】（人）
    getDataUnpaid() {
      this.dialogTableVisible1 = true;
      this.listLoading1 = true;

      let para = {
        pageNo: this.currentPage1,    //当前页
        pageSize: this.pageSize1    //每页记录数
      };

      listStucostUnpaid(para).then((res) => {
        this.listLoading1 = false;

        // 后台数据
        this.total1 = res.resData.total;
        this.pageSize1 = res.resData.pageSize;
        this.tableData1 = res.resData.list;
        if (res.resCode == 0) {
          this.$message(res.resMsg);
        } else {
          this.$message.error(res.resMsg);
        }
      });
    },

    // editForm规则
    editFormRules() {
      secondMoney: [{ required: true, message: '域名不能为空', trigger: 'blur' }]
    },

    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
      //调用多条件查询
      this.getDataByPage();
    },
    handleSizeChange1(val) {
      this.pageSize1 = val;
      console.log(`每页 ${val} 条`);
      //查询未交学费的人
      this.getDataUnpaid();
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
      //调用多条件查询
      this.getDataByPage();
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      console.log(`当前页: ${val}`);
      //查询未交学费的人
      this.getDataUnpaid();
    },

    // Tab标签
    handleClick(tab, event) {
      this.form = { id: '', name: '', sex: '', xl: '', date1: '', date2: '' };
      this.currentPage = 1;
      this.getDataByPage();
    }
  },
  mounted() {
    this.getDataByPage();
  }
}
</script>