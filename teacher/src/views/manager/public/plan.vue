<template>
	<div>
		<!--工具条 -->
		<el-form :inline="true" :model="filters">
	 <el-form-item>
		 	<el-input v-model="filters.educationPlanId" placeholder="请输入计划编号：" style="width:200px;float:right;margin-right:1%"></el-input>
	 </el-form-item>
	 <el-form-item>
		 	<el-input v-model="filters.majorName" placeholder="请输入专业名称：" style="width:200px;float:right;margin-right:1%"></el-input>
	 </el-form-item>
	 <el-form-item>
		 	<el-button type="primary" style="float:right;margin-right:1%" v-on:click="getdata">查询</el-button>
	 </el-form-item>
	 <el-form-item>
		 <el-col :span="6">
					<div class="grid-content bg-purple">
						<el-button  icon="serch" v-on:click="resourceAdd" type="success">增加</el-button>
					</div>
				</el-col>
	 </el-form-item>
		</el-form>
				
		<!--列表 -->
		<el-table :data="tableData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="educationPlanId" label="计划号">
			</el-table-column>
	
			<el-table-column prop="majorName" label="专业">
			</el-table-column>
	
			<el-table-column prop="courseName" label="课程号">
			</el-table-column>
	
			<el-table-column prop="courseClass" label="课程类别">
			</el-table-column>
	
			<el-table-column prop="majorCredit" label="学分">
			</el-table-column>
	
			<el-table-column prop="majorAcademic" label="学期">
			</el-table-column>
	
			<el-table-column fixed="right" label="操作" width="150">
				<template scope="scope">
					<el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button @click.native.prevent="handleDel(scope.$index, scope.row)" size="small" type="success">移除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--分页组件-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	  <!--编辑界面-->
		<el-dialog title="教学计划修改" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="计划号：" prop="educationPlanId">
					<el-input v-model="editForm.educationPlanId" auto-complete="off" disabled="true" type="hidden"></el-input>
					<el-input v-model="editForm.educationPlanId" auto-complete="off" disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="专业编号：" prop="majorId">
					<el-input v-model="editForm.majorId" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="课程号：" prop="courseName">
					<el-input v-model="editForm.courseName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="课程类别：" prop="courseClass">
					<el-select v-model="editForm.courseClass" placeholder="请选择">
						<!-- 前台写死取值 -->
						<el-option label="必修" value="必修" ></el-option>
						<el-option label="选修" value="选修" ></el-option>
						<!-- 后台数据库取值 -->
						<!--<el-option v-for="item in options1" :key="item.educationPlanId" :label="item.courseClass" :value="item.educationPlanId">-->
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="学分：" prop="majorCredit">
					<el-input v-model="editForm.majorCredit" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="学期：" prop="majorAcademic">
					<el-input v-model="editForm.majorAcademic" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit">提交</el-button>
			</div>
		</el-dialog>
        <!--新增界面-->
		<el-dialog title="教学计划添加" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item label="班级：" prop="educationGrade">
					<el-input v-model="addForm.educationGrade" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="专业：" prop="majorName">
					<el-select v-model="addForm.majorName" placeholder="请选择">
						<el-option v-for="item in options" :key="item.majorId" :label="item.majorName" :value="item.majorId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="课程名称：" prop="courseName">
					<el-input v-model="addForm.courseName" auto-complete="off"></el-input>

				</el-form-item>
				<el-form-item label="课程类别：" prop="courseClass">
					<el-select v-model="addForm.courseClass" placeholder="请选择">
						<!-- 前台写死取值 -->
						<el-option label="必修" value="必修" ></el-option>
						<el-option label="选修" value="选修" ></el-option>
						<!-- 后台数据库取值 -->
						<!--<el-option v-for="item in options1" :key="item.educationPlanId" :label="item.courseClass" :value="item.educationPlanId">-->
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="学分：" prop="majorCredit">
					<el-input v-model="addForm.majorCredit" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="学期：" prop="majorAcademic">
					<el-input v-model="addForm.majorAcademic" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit">提交</el-button>
			</div>
		</el-dialog>
		
	</div>
</template>

<script>

 import { chaxun, ediChange, educationPlanId, delPlan, addPlan,querymajorList,queryeducationList } from '../../../api/api';
 export default {
	data() {
		return {
			filters:{
				educationPlanId:'',
				majorName:''
			},
			
			
			options: [],
			options1: [],
			
			pickerOptions0: {
				disabledDate(time) {
					return false;
				}
			},
			
			tableData: [],
			studentId: '',
			studentName: '',
			total: 8,//列表总条数
			pageSize: 5,//每页条数
			currentPage: 1,//当前页码
			listLoading: false,
			sels: [],//列表选中列
			editLoading: false,
			editFormVisible: false,//编辑界面是否显示
			//编辑界面数据
			editForm: {
				educationPlanId: '',
				majorId: '',
				courseName: '',
				courseClass: '',
				majorCredit: '',
				majorAcademic: ''
			},
			
			//添加
			addFormVisible: false,//新增界面是否显示
			addLoading: false,

			//新增界面数据
			addForm: {
				educationPlanId: '',
				educationGrade: '',
				majorId: '',
				majorName: '',
				courseName: '',
				courseClass: '',
				majorCredit: '',
				majorAcademic: '',
				eduPlanDelete: '1'
			},
		}
	},

	methods: {
		//获取用户列表
		getdata() {
			let para = {
				educationPlanId:this.filters.educationPlanId,
				majorName:this.filters.majorName,
				pageSize: this.pageSize,
				pageNo: this.currentPage
			};
			para = Object.assign(para, this.filters);

			this.listLoading = true;
			//NProgress.start();
			chaxun(para).then((res) => {
				this.total = res.resData.total;
				this.pageSize = res.resData.pageSize;
				this.tableData = res.resData.list;
				this.listLoading = false;
				//NProgress.done();
			});
		},
		//分页件 -------------
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			this.pageSize = val;
			this.getdata();
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
			this.currentPage = val;
			this.getdata();
		},



		//删除
		handleDel: function (index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				let para = { educationPlanId: row.educationPlanId };
				delPlan(para).then((res) => {
					this.listLoading = false;
					this.$message({
						message: '删除成功',
						type: 'success'
					});

					this.getdata();
				});
			}).catch(() => {

			});
		},
		//添加导学资源 点击方法
		resourceAdd() {
			this.addFormVisible = true;
			querymajorList().then((res) => {
				this.options=res.resData;
			});
			queryeducationList().then((res) => {
				this.options1=res.resData;
			});
			this.addForm = {
				educationPlanId: '',
				educationGrade: '',
				majorId: '',
				majorName: '',
				courseName: '',
				courseClass: '',
				majorCredit: '',
				majorAcademic: '',

			};
		},
		//添加方法
		addSubmit: function () {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.addLoading = true;
						let para = Object.assign({}, this.addForm);
						addPlan(para).then((res) => {
							this.addLoading = false;

							if (res.resCode != 0) {
								this.$message({
									message: msg,
									type: 'error'
								});
							} else {
								this.$message({
									message: '提交成功',
									type: 'success'
								});
							}
							this.$refs['addForm'].resetFields(); //重置 字段
							this.addFormVisible = false;
							this.getdata();  //获取页面数据
						});
					});
				}
			});
		},

		//显示编辑界面
		handleEdit: function (index, row) {
			this.editFormVisible = true;
			console.log(row);
			let para = { educationPlanId: row.educationPlanId };
			educationPlanId(para).then((res) => {
				//把对象赋值给 弹出来的层
				this.editForm = Object.assign({}, res.resData);
			})
		},

		//编辑
		editSubmit: function () {
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true;
						//NProgress.start();
						let para = Object.assign({}, this.editForm);
						ediChange(para).then((res) => {
							this.editLoading = false;
							//NProgress.done();
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.getdata();
						});
					});
				}
			});
		},
		selsChange: function (sels) {
			this.sels = sels;
		},
	},
	mounted() {
		this.getdata();
	}
 };
 </script>