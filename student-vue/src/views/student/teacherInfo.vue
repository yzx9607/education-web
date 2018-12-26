<template>
  <section>
    <!--教师信息-->
    <el-table v-loading="loading" element-loading-text="拼命加载中" :data="tableData" border style="width: 95%">
      <el-table-column fixed type="index" width="100">
      </el-table-column>
      <el-table-column prop="teacherRealName" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="courseModel.courseName" label="课程" width="180">
      </el-table-column>
      <el-table-column prop="teacherSchool" label="毕业院校" width="230">
      </el-table-column>
      <el-table-column prop="teacherDegree" label="最高学历" width="200">
      </el-table-column>
      <el-table-column prop="teacherPhone" label="联系电话" width="300">
      </el-table-column>
      <el-table-column prop="teacherAdderss" label="教师地址" width="400">
      </el-table-column>
      <el-table-column fixed="right" label="评价" width="140">
        <template scope="scope">
          <el-button size="small" @click="handleMore(scope.$index, scope.row)" type="text">查看</el-button>
          <el-button :plain="true" type="text" size="small" @click="handleOneOutSku(scope.$index, scope.row) ">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <!--分页组件 -->
  
    <el-col :span="24" class="toolbar">
      <el-button :plain="true" type="info" @click="forback">返回</el-button>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
  
   <!-- 添加教师评价-->
    <el-dialog title="请你对教师进行评价" v-model="oneOutSkuFormVisible" :close-on-click-modal="false">
      <el-form :model="oneOutSkuForm" :rules="oneOutSkuFormRules" ref="oneOutSkuForm" label-width="100px">
        <el-form-item label="">
          <el-alert style="height:10%;opacity:0.8;" :title="oneOutSkuForm.oneSkuNumTip" type="info" :closable="false" show-icon>
          </el-alert>
        </el-form-item>
        <el-form-item label="评价日期：">
          <el-date-picker type="date" placeholder="" v-model="oneOutSkuForm.teaEvaDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="评 价 ：" prop="">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="oneOutSkuForm.teaEvaContent">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="oneOutSkuFormVisible= false">取消</el-button>
        <el-button type="primary" @click.native="oneOutSkuFormSubmit" :loading="editLoading">保存</el-button>
      </div>
    </el-dialog>

    <!--教师评价页面-->
    <teacherinfo ref="teacherinfo"></teacherinfo>
  </section>
</template>

<script>


import { getTeacherInfo,outTeaEva} from '../../api/api';
import TeacherInfo from '../../components/teacher_info.vue';

export default {
  components: {
    teacherinfo: TeacherInfo
  },
  data() {
    return {
      oneOutSkuFormVisible: false,//提交教师评价页面是否显示
      tableData: [],
      total: 0,//列表总条数
      pageSize: 10,//每页条数
      currentPage: 1,//当前页码
      loading: false,

      oneOutSkuForm: {
					teacherId: '',
					studentId: '',
					teaEvaDate: new Date(),
					oneSkuNumTip:'',
          teaEvaDel:'',
          teaEvaContent:''
				}
    }

  },
  mounted() {
    this.getTeaInfo();
  },
  methods: {
    //返回前一页
			forback() {
				this.$router.push({name: '课程界面',path:'/class_index',query:{courseId:this.$route.query.courseId}});
			},
   //跳转到详情页面
    handleMore: function (index, row) {
      console.log(row);
      console.log(index);
      console.log(row.studentId);
      this.$refs.teacherinfo.showCardDetail(row.teacherId,row.studentId);
    },
    //跳转添加页面
    handleOneOutSku: function (index, row) {
				this.oneOutSkuForm.oneSkuNumTip = "姓名："+row.teacherRealName+" ,  课程: " +row.courseModel.courseName;
        this.oneOutSkuForm.teacherId = row.teacherId;
        this.oneOutSkuForm.studentId=row.studentId;
				this.oneOutSkuFormVisible = true;			
			},
    //执行添加操作
    oneOutSkuFormSubmit: function () {
				this.$refs.oneOutSkuForm.validate((valid) => {
					if (valid) {					
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = {};
							para.teacherId = this.oneOutSkuForm.teacherId;
              para.studentId =  this.oneOutSkuForm.studentId
							para.teaEvaContent = this.oneOutSkuForm.teaEvaContent;
							para.teaEvaDate = this.oneOutSkuForm.teaEvaDate;
						  //para.skuOutDate = (!para.skuOutDate || para.skuOutDate == '') ? '' : util.formatDate.format(new Date(para.skuOutDate), 'yyyy-MM-dd');
              para.teaEvaDel = 1;
							outTeaEva(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['oneOutSkuForm'].resetFields();
								this.oneOutSkuFormVisible = false;
								this.getTeaInfo();
							});
						});
					}
				});
			},  
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTeaInfo();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTeaInfo();
    },
    //得到商品信息
    getTeaInfo() {
      let para = {
        stuId:1,
        pageSize: this.pageSize,
        pageNum: this.currentPage
      };    
      this.loading = true;
      getTeacherInfo(para).then((res) => {
        console.log(res);
        this.total =res.resData.total;
        this.tableData =res.resData.list;
        this.loading = false;
      });
    }
  },
}

</script>