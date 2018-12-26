<template>
	<section>
		<el-form :inline="true" :model="filters">
			<el-form-item>
				<el-input v-model="filters.majorId" placeholder="输入专业ID" style="width:200px;float:right;margin-right:1%"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="filters.majorName" placeholder="输入专业名称" style="width:200px;float:right;margin-right:1%"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" style="float:right;margin-right:1%" v-on:click="getMajor">查询</el-button>
			</el-form-item>
			<el-button type="primary" @click="handleAdd">新建</el-button>
		</el-form>
		<!-- <el-button type="primary" style="float:right;margin-right:1%" v-on:click="getMajor">查询</el-button>
		<el-input v-model="filters.majorId" placeholder="输ID或者专业名称" style="width:200px;float:right;margin-right:1%"></el-input> -->
		<!--编辑界面-->
		<el-dialog title="专业信息编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" ref="editForm">
				<el-form-item label="专业名称：" prop="majorName">
					<el-input v-model="editForm.majorName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="专业简介：" prop="majorProfile">
					<el-input v-model="editForm.majorProfile" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="总学分：" prop="majorCredit">
					<el-input v-model="editForm.majorCredit" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="总学期：" prop="majorAcademic">
					<el-input v-model="editForm.majorAcademic" auto-complete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="修改人：" prop="majorPerson">
					<el-input v-model="editForm.majorPerson" auto-complete="off"></el-input> -->
				<!-- </el-form-item>
				  <el-form-item label="修改时间：" prop="modifyDateStr">
		
					<div class="block">
						<el-date-picker align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1" v-model="editForm.modifyDateStr" auto-complete="off">
						</el-date-picker>
					</div>
	
				</el-form-item>   -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="addLoading">保存</el-button>
			</div>
		</el-dialog>
		<!--新增界面-->
		<el-dialog title="新增专业信息" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item label="专业名称：" prop="majorName">
					<el-input v-model="addForm.majorName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="专业简介：" prop="majorProfile">
					<el-input v-model="addForm.majorProfile" auto-complete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="创建时间：" prop="majorDateStr">
					<div class="block">
						<el-date-picker align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1" v-model="editForm.modifyDateStr" auto-complete="off">
						</el-date-picker>
					</div>
				</el-form-item> -->
				<el-form-item label="总学分：" prop="majorCredit">
					<el-input v-model="addForm.majorCredit" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="总学期：" prop="majorAcademic">
					<el-input v-model="addForm.majorAcademic" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">保存</el-button>
			</div>
		</el-dialog>
		<el-table :data="tableData" border style="width: 100%">
			<!--<el-table-column    
	      label="编号"
	      width="160">
	      <template scope="scope">
	        
	        <span style="margin-left: 10px">{{ scope.row.id }}</span>
	      </template>
	    </el-table-column>-->
			<el-table-column label="编号" style="width: 7%">
				<template scope="scope">
	
					<span style="margin-left: 10px">{{ scope.row.majorId }}</span>
				</template>
			</el-table-column>
			<el-table-column label="专业名称" style="width: 7%">
				<template scope="scope">
	
					<span style="margin-left: 10px">{{ scope.row.majorName }}</span>
				</template>
			</el-table-column>
			<el-table-column label="专业简介" style="width: 7%">
				<template scope="scope">
	
					<span style="margin-left: 10px">{{ scope.row.majorProfile }}</span>
				</template>
			</el-table-column>
			<!-- <el-table-column
	      label="姓名"
	      width="160">
	      <template scope="scope">
	        <el-popover trigger="hover" placement="top">
	          <p>姓名: {{ scope.row.name }}</p>
	          <div slot="reference" class="name-wrapper">
	            <el-tag>{{ scope.row.name }}</el-tag>
	          </div>
	        </el-popover>
	      </template>
	    </el-table-column> -->
	
			<!-- <el-table-column label="创建时间" style="width: 25%">
				<template scope="scope">
					<el-icon name="time"></el-icon>
					<span style="margin-left: 10px">{{ scope.row.majorDateStr }}</span>
				</template>
			</el-table-column> -->
			<el-table-column label="总学分" style="width: 7%">
				<template scope="scope">
					<span style="margin-left: 10px">{{ scope.row.majorCredit }}</span>
				</template>
			</el-table-column>
			<el-table-column label="学期" style="width: 7%">
				<template scope="scope">
					<span style="margin-left: 10px">{{ scope.row.majorAcademic }}</span>
				</template>
			</el-table-column>
			<!-- <el-table-column label="修改人" style="width: 7%">
				<template scope="scope">
					<el-popover trigger="hover" placement="top">
						<p>姓名: {{ scope.row.majorPerson }}</p>
						<div slot="reference" class="name-wrapper">
							<el-tag>{{ scope.row.majorPerson }}</el-tag>
						</div>
					</el-popover>
				</template>
			</el-table-column> -->
			<!-- <el-table-column label="修改时间" style="width: 25%">
				<template scope="scope">
					<el-icon name="time"></el-icon>
					<span style="margin-left: 10px">{{ scope.row.modifyDateStr }}</span>
				</template>
			</el-table-column> -->
			<el-table-column label="操作">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
	
				</template>
			</el-table-column>
		</el-table>
	
		<el-col :span="24" class="toolbar">
			<!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 30, 45, 60]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>
<script>
import util from '../../../common/js/util';
import constant from '../../../common/js/constant';
import { getMajor, removeMajor, editMajor, addMajor, majorManager, getPage } from '../../../api/api';
export default {
	data() {
		//自定义手机
		var validMobile = (rule, value, callback) => {
			var reg = /^[0-9]{2,3}$/;
			if (!reg.test(value)) {
				callback(new Error('请输入正确的总学分'));
			} else {
				callback();
			}
		};
		return {
			filters: {
				majorId: '',
				majorName: ''
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
			input2: '',
			tableData: [],
			total: 0,//列表总条数
			pageSize: 15,//每页条数
			currentPage: 1,//当前页码

			editFormVisible: false,//编辑界面是否显示
			editLoading: false,
			editFormRules: {
				majorName: [
					{ required: true, message: '请输入专业姓名', trigger: 'blur' }
				],
				majorCredit: [
					{ required: true, validator: validMobile, trigger: 'blur' }
				],
				majorProfile: [
					{ required: true, message: '请输入专业简介', trigger: 'blur' }
				],
				majorAcademic: [
					{ required: true, message: '请输入学期', trigger: 'blur' }
				]
			},
			editForm: {
				majorName: '',
				majorAcademic: '',
				majorCredit: '',
				majorProfile: '',
			},
			addFormVisible: false,//新增界面是否显示
			addLoading: false,
			addFormRules: {
				majorName: [
					{ required: true, message: '请输入专业姓名', trigger: 'blur' }
				],
				majorCredit: [
					{ required: true, validator: validMobile, trigger: 'blur' }
				],
				majorAcademic: [
					{ required: true, message: '请输入总学期', trigger: 'blur' }
				],
				majorProfile: [
					{ required: true, message: '请输入专业简介', trigger: 'blur' }
				]
			},
			//新增界面数据
			addForm: {
				majorName: '',
				majorAcademic: '',
				majorCredit: '',
				majorProfile: '',
			},
			addLoading: false,
		}

	},

	mounted() {
		this.getMajor();
	},

	methods: {
		handleIconClick(ev) {
			console.log(ev);
		},
		handleSizeChange(val) {
			this.pageSize = val;
			this.getMajor();
		},
		handleCurrentChange(val) {
			this.currentPage = val;
			this.getMajor();
		},
		getMajor() {
			let para = {
				majorId: this.filters.majorId,
				majorName: this.filters.majorName,
				pageSize: this.pageSize,
				pageNum: this.currentPage
			};
			this.listLoading = true;
			para = Object.assign(para, this.filters);
			getPage(para).then((res) => {
				this.total = res.resData.total;
				this.tableData = res.resData.list;
				this.listLoading = false;
			});
		},
		//显示新增界面
		handleAdd: function () {
			this.addFormVisible = true;
			this.addForm = {
				majorName: '',
				majorAcademic: '',
				majorCredit: '',
				majorProfile: '',
				majorDateStr: ''
			};
		},
		//新增
		addSubmit: function () {
			this.$refs.addForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.addLoading = true;
						//NProgress.start();
						let para = Object.assign({}, this.addForm);
						addMajor(para).then((res) => {
							this.addLoading = false;
							//NProgress.done();
							let { msg, code } = res;
							if (code == 0) {
								this.$message({
									message: msg,
									type: 'error'
								});
							} else {
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getMajor();
							}
						});
					});
				}
			});
		},

		//显示编辑界面
		handleEdit: function (index, row) {
			this.editFormVisible = true;
			this.editForm = Object.assign({}, row);
		},

		//编辑
		editSubmit: function () {
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true;
						//NProgress.start();
						let para = Object.assign({}, this.editForm);
						editMajor(para).then((res) => {
							this.editLoading = false;
							//NProgress.done();
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.getMajor();
						});
					});
				}
			});
		},

		//删除
		handleDel: function (index, row) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.listLoading = true;
				//NProgress.start();
				let para = { majorId: row.majorId };
				removeMajor(para).then((res) => {
					this.listLoading = false;
					//NProgress.done();
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.getMajor();
				});
			}).catch(() => {
			});
		},
	}
}
</script>