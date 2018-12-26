<template>
	<section>

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.courseName" placeholder="请输入课程名称"></el-input>
						
				</el-form-item>
				<el-form-item>
				<el-input v-model="filters.courseId" placeholder="请输入课程号"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getAllCourses">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getAll">查询全部</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">增加课程</el-button>
				</el-form-item>
			</el-form>
		</el-col>

        <el-table
    :data="tableData"
    v-loading="listLoading"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="编号"
      >
    </el-table-column>
		<el-table-column
      prop="courseId"
      label="课程号">
    </el-table-column>
    <el-table-column
      prop="majorName"
      label="专业"
      >
    </el-table-column>
    <el-table-column
      prop="courseName"
      label="课程名称">
    </el-table-column>
    
  	<el-table-column
      prop="courseClass"
      label="课程类别">
    </el-table-column>

	<el-table-column
      prop="courseScore"
      label="课程学分">
    </el-table-column>

    <el-table-column
      prop="onlineTestScorce"
      label="在线测试分数">
    </el-table-column>

    <el-table-column
      prop="finalTestScorce"
      label="课程结业考试">
    </el-table-column>

    <el-table-column
      prop="teacherRealName"
      label="教师">
    </el-table-column>

      <el-table-column
      fixed="right"
      label="操作"
     >
      <template scope="scope">
        
				<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button @click="handleDel(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
        
      </template>
    </el-table-column>
  </el-table>

  <!--工具条(分页)-->
		<el-col :span="24" class="toolbar">
			<!--
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			-->
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="[10, 20, 50, 100]"
			:page-size="pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
			style="float:right;">
			</el-pagination>
		</el-col>

    <!--查看界面-->
		<el-dialog title="课程详情" v-model="editFormVisible" :close-on-click-modal="false" style="width:80%;margin:0 auto;height:80%;">
			<el-col >
				<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item  label="课程名称:">
					{{this.editForm.courseName}}
				</el-form-item>
			
                <el-form-item label="课程学分:" >
					{{this.editForm.courseScore}}
				</el-form-item>

				<el-form-item label="课程简介:">
                    
					{{this.editForm.courseInfo}}
				</el-form-item>
			</el-form>
			</el-col>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">确定</el-button>	
			</div>
		</el-dialog>

		<!--编辑界面-->
		<el-dialog title="编辑课程" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="课程名称：" prop="courseName">
					<el-input v-model="editForm.courseName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="课程专业：" prop="majorName">
					<el-input v-model="editForm.majorName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="课程简介：" prop="courseInfo">
					<el-input v-model="editForm.courseInfo" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="课程类别：" prop="courseClass">
					<el-input v-model="editForm.courseClass" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="课程学分：" >
					<el-input v-model="editForm.courseScore"  auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="addLoading">保存</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增课程" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item label="课程名称：" prop="courseName">
					<el-input v-model="addForm.courseName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="课程专业：" prop="majorName">
					<el-input v-model="addForm.majorName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="课程简介：" prop="courseInfo">
					<el-input v-model="addForm.courseInfo" type="textarea" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="课程类别：" prop="courseClass">
					<el-input v-model="addForm.courseClass" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="课程学分："  prop="courseScore">
					<el-input v-model="addForm.courseScore"  auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">保存</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>

  import {getAllCourse,submitScore,removeCourses,addUser,editUser} from '../../../api/api';
	export default {
		data() {

			var validScore = (rule, value, callback) => {
				var reg = /^(\d{1,2}(\.\d{1,3})?|100)$/; 
				if (!reg.test(value)) {
				  callback(new Error('请输入正确的成绩'));
				} else {
				  callback();
				} 
		    };

			return {
				filters: {
					courseName: '',
					courseId:''
				},
        tableData: [],
        total: 0,//列表总条数
        pageSize:10,//每页条数
        currentPage:1,//当前页码
        listLoading: false,
				thesisId:'',
				thesisUrl:'',
       editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					courseName: [
						{ required: true, message: '请输入课程名称', trigger: 'blur' }
					],
					majorName: [
						{ required: true,  message: '请输入专业', trigger: 'blur' }
					],
					courseInfo: [
						{ required: true,  message: '请输入课程简介', trigger: 'blur' }
					],
					score:[
						{ required: true,  message: '请输入课程学分', trigger: 'blur' }
					],
					courseClass: [
						{ required: true,  message: '请输入课程类别', trigger: 'blur' }
					],
					
				},
				//编辑界面数据
				editForm: {
					courseName: '',
					majorName: '',
					courseInfo: '',
					courseClass: '',
					courseScore: ''
				},
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					courseName: [
						{ required: true, message: '请输入课程名称', trigger: 'blur' }
					],
					majorName: [
						{ required: true,  message: '请输入专业', trigger: 'blur' }
					],
					courseInfo: [
						{ required: true,  message: '请输入课程简介', trigger: 'blur' }
					],
					courseScore: [
						{ required: true,  message: '请输入课程学分', trigger: 'blur' }
					],
					courseClass: [
						{ required: true,  message: '请输入课程类别', trigger: 'blur' }
					],
					
				},
				//新增界面数据
				addForm: {
					courseName: '',
					majorName: '',
					courseInfo: '',
					courseClass: '',
					courseScore: ''
				}

         
			}
		},
		methods: {
            //删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
                    console.log("课程编号"+row.courseId);
					let para = { courseId: row.courseId};
					removeCourses(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getCards();
					});
				}).catch(() => {

				});
			},
        //查询全部
        getAll() {
					this.filters.courseName='';
					this.filters.courseId='';
          let para = {
						courseName:'',
						courseId:'',
            pageSize:this.pageSize,
            currentPage:this.currentPage
						//studentName:this.filters.studentName  //论文题目			
          };
					console.log(this.pageSize);
					console.log(this.currentPage);
          this.listLoading = true;
          getAllCourse(para).then((res) => {
            this.total = res.resData.total;
						
            this.tableData = res.resData.list;
            console.log(res.resData);
            this.listLoading = false;
            //NProgress.done();
          });
        },
        //获取课程
        getAllCourses() {
          let para = {
						courseName:this.filters.courseName,
						courseId:this.filters.courseId,
            pageSize:this.pageSize,
            currentPage:this.currentPage
						//studentName:this.filters.studentName  //论文题目			
          };
					console.log(this.pageSize);
					console.log(this.currentPage);
          this.listLoading = true;
          getAllCourse(para).then((res) => {
            this.total = res.resData.total;
						
            this.tableData = res.resData.list;
            console.log(res.resData);
            this.listLoading = false;
            //NProgress.done();
          });
        },
        handleSizeChange(val) {
          this.pageSize = val;
          this.getAllCourses();
        },
        handleCurrentChange(val) {
          this.currentPage = val;
          this.getAllCourses();
        },
        //下载文件
        downLoad() {
                window.location.href=this.thesisUrl;
        },

      //显示查看界面
			look: function (index, row) {
				this.editFormVisible = true;
				this.editForm.courseIntro = row.courseIntro;
                this.editForm.courseName = row.courseName;
                this.editForm.courseScore = row.courseScore;
                console.log("课程简介"+this.editForm.courseIntro);
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					courseName: '',
					majorName: '',
					courseInfo: '',
					courseType: '',
					courseScore: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getAll();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();

								let { resMsg, resCode } = res;
								if (resCode !== 0) {
									this.$message({
										message: resMsg,
										type: 'error'
									});
								} else {
									this.$message({
										message: '提交成功',
										type: 'success'
									});
									this.$refs['addForm'].resetFields();
									this.addFormVisible = false;
									this.getAll();
								}			


							});
						});
					}
				});
			},

		},
		mounted() {
			this.getAllCourses();
		}
	}

</script>

<style scoped>

</style>