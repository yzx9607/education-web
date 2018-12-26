<template>
  <section>
    <el-table :data="tableData" border style="width:100%">
      <el-table-column align='center' label="考试信息列表" class="head">
        <el-table-column fixed prop="examid" label="考试编号" width="100">
        </el-table-column>
        <el-table-column prop="examplace" label="考试地点" width="200">
        </el-table-column>
        <el-table-column prop="coursename" label="课程名称" width="250">
        </el-table-column>
        <el-table-column prop="examform" label="考试形式" width="200">
        </el-table-column>
        <el-table-column prop="examappointtimestr" label="预约时间" width="250">
        </el-table-column>
        <el-table-column prop="examtimestr" label="考试时间" width="200">
        </el-table-column>
        <el-table-column prop="teachername" label="教师姓名" width="200">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="232">
          <template scope="scope">
            &nbsp;&nbsp; &nbsp;&nbsp;
            <el-button @click="dialogFormVisible = true" type="success">
              添加
            </el-button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button @click="del(scope.$index, scope.row)" type="info">删除</el-button>
  
            <el-dialog title="添加考试" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="考试地点" :label-width="formLabelWidth">
                  <el-input v-model="form.examplace" placeholder="请输入内容" style="width:500px"></el-input>
                </el-form-item>
                <el-form-item label="预约时间" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.examappointtime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="发布时间" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.examaddtime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                  <el-form-item label="修改时间" :label-width="formLabelWidth"> 
                    <el-date-picker v-model="form.exammotifydate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                  <el-form-item label="考试时间" :label-width="formLabelWidth">  
                    <el-date-picker v-model="form.examtime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="请选择课程" :label-width="formLabelWidth">
                  <el-select v-model="form.courseid" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="考试形式" :label-width="formLabelWidth" style="width:200px">
                  <el-select v-model="form.examform" placeholder="请选择">
                    <el-option label="网上考试" value="网上考试"></el-option>
                    <el-option label="现场考试" value="现场考试"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addexam1">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
  
      </el-table-column>
  
    </el-table>
    <br>
  
    <div class="block" style="margin-right:45%;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5,10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </section>
</template>


<script>
import {exammanger,addexam,deleteexam} from '../../api/api';
export default {
  data() {

    return {
      total: 0,//列表总条数
      pageSize: 5,//每页条数cnpm run build
      currentPage:1,//当前页码
      name: "",
      tableData: [],
      form: {
        examplace: '',
        examappointtime: '',
        examaddtime: '',
        courseid:'',
        examform: '',
        teacherid:1,
        exammotifydate:'',
        examtime:'',
        examdelete:1,
        exammotifyperson:0

      },

      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value3: '',
      value2: '',
      options: [{
        value: 1,
        label: 'JAVA'
      }, {
        value: 2,
        label: 'HTML5'
      }, {
        value: 3,
        label: 'UI'
      }, {
        value: 4,
        label: 'PHP'
      }, {
        value: 5,
        label: 'U3D'
      }],
      value: ''
    }
  },
  mounted() {
    this.exammangero();
  },

  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.exammangero();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.exammangero();
    },
    exammangero() {
      let para = {
        pageSize: this.pageSize,
        pageNo: this.currentPage,
      };
      para = Object.assign(para, this.filters);
      // this.listLoading = true;
      //this.loading = true;
      exammanger(para).then((res) => {
        this.total = res.resData.total;
        this.tableData = res.resData.list;  
        this.loading = false;
      });
      
    },
    addexam1() {
      let para = Object.assign({}, this.form);
      addexam(para);
      this.dialogFormVisible = false
       this.exammangero();
         this.$message({
          type: 'success',
          message: '添加成功!'
        });
        this.exammangero(this.currentPage);
    },

    del: function (index, row) {
       
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { 
        let delone={
          examid:row.examid
        }
        console.log(row.examid)
        deleteexam(delone);
        this.exammangero();
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

  }

}

</script>