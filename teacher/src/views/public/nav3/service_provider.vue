<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.cardSizeMin" placeholder="卡数量最小"></el-input>
				</el-form-item>
				<el-form-item>
				至
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.cardSizeMax" placeholder="卡数量最大"></el-input>
				</el-form-item>
				<el-form-item>
					<el-select v-model="filters.servicerLevel" placeholder="服务商等级" clearable>
						<el-option
						  v-for="item in options_servicerLevel"
						  :label="item.label"
						  :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-date-picker
					  v-model="filters.regBtDate"
					  type="date"
					  placeholder="注册开始日期"
					  :picker-options="pickerOptions0">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-date-picker
					  v-model="filters.regEtDate"
					  type="date"
					  placeholder="注册截止日期"
					  :picker-options="pickerOptions0">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.servicerKeys" placeholder="输服务商名称/联系人/手机"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增服务商</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="exportExcel">导出EXCEL</el-button>
				</el-form-item>				
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<!--
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			-->
			<el-table-column prop="servicerName" label="名称" width="180" sortable>
			</el-table-column>
			<el-table-column
			prop="userlevel"
			label="等级"
			width="120"
			sortable
			>
			<template scope="scope">
				<el-tag
				:type="scope.row.userlevel === '1' ? 'primary' : scope.row.userlevel === '2' ? 'success' : 'warning'"
				close-transition>{{scope.row.userlevel == 1 ? '一级服务商' : scope.row.userlevel == 2 ? '二级服务商' : '管理员' }}</el-tag>
			</template>
			</el-table-column>
			<el-table-column prop="contactMan" label="联系人" width="100" sortable>
			</el-table-column>
			<el-table-column prop="contactMobile" label="手机号" width="150" sortable>
			</el-table-column>
			<el-table-column prop="username" label="平台账号" min-width="150" sortable>
			</el-table-column>
			<el-table-column prop="password" label="平台密码" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="f_contactMan" label="上级服务商" min-width="180" sortable>
				<template scope="scope">
					<span>{{ scope.row.f_contactMan }}/{{ scope.row.f_contactMobile }}</span>
				</template>
			</el-table-column>	
			<el-table-column prop="regTime" label="注册日期" min-width="180" sortable>
				<template scope="scope">
					<el-icon name="time"></el-icon>
					<span>{{ scope.row.regTime }}</span>
				</template>
			</el-table-column>		
			<el-table-column prop="cardnum" label="卡数量" min-width="100" sortable>
			</el-table-column>				
			<el-table-column label="操作" width="150" fixed="right">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
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

		<!--编辑界面-->
		<el-dialog title="编辑服务商" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="addFormRules" ref="editForm">
				<el-form-item label="服务商名：" prop="servicerName">
					<el-input v-model="editForm.servicerName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系人员：" >
					<el-input v-model="editForm.contactMan" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号码：" prop="contactMobile">
					<el-input v-model="editForm.contactMobile" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="平台账号：" prop="username">
					<el-input v-model="editForm.username" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="登录密码："  prop="password">
					<el-input v-model="editForm.password" type="password" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="addLoading">保存</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增服务商" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item label="服务商名：" prop="servicerName">
					<el-input v-model="addForm.servicerName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="联系人员：" >
					<el-input v-model="addForm.contactMan" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号码：" prop="contactMobile">
					<el-input v-model="addForm.contactMobile" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="平台账号：" prop="username">
					<el-input v-model="addForm.username" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="登录密码："  prop="password">
					<el-input v-model="addForm.password" type="password" auto-complete="off"></el-input>
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
	import util from '../../../common/js/util'
	import constant from '../../../common/js/constant'
	//import NProgress from 'nprogress'
	import { getServicerListPage, removeUser, editUser, addUser } from '../../../api/api';

	export default {
		data() {

			//自定义手机
			var validMobile = (rule, value, callback) => {
				var reg = /^1[0-9]{10}$/; 
				if (!reg.test(value)) {
				  callback(new Error('请输入正确的手机号码'));
				} else {
				  callback();
				}
		    };

			return {
				pickerOptions0: {
					disabledDate(time) {
						return false;
					}
				},
				options_servicerLevel:constant.opt_servicerLevel,
				filters: {
					//卡数量开始
					cardSizeMin: '',
					//卡数量截至
					cardSizeMax: '',
					//服务商级别
					servicerLevel: '',
					//注册日期开始
					regBtDate: '',
					//注册日期截至
					regEtDate: '',
					//服务商关键字
					servicerKeys:''
				},
				users: [],
				total: 0,//列表总条数
				pageSize:10,//每页条数
				currentPage:1,//当前页码
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					servicerName: [
						{ required: true, message: '请输入服务商名称', trigger: 'blur' }
					],
					contactMobile: [
						{ required: true, validator: validMobile, trigger: 'blur' }
					],
					username: [
						{ required: true, min:6, message: '请输入平台账户(必须为6个字符或以上)', trigger: 'blur' }
					],
					password: [
						{ required: true, min:6, message: '请输入登陆密码(必须为6个字符或以上)', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					servicerName: '',
					contactMan: '',
					contactMobile: '',
					username: '',
					password: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					servicerName: [
						{ required: true, message: '请输入服务商名称', trigger: 'blur' }
					],
					contactMobile: [
						{ required: true, validator: validMobile, trigger: 'blur' }
					],
					username: [
						{ required: true, min:6, message: '请输入平台账户(必须为6个字符或以上)', trigger: 'blur' }
					],
					password: [
						{ required: true, min:6, message: '请输入登陆密码(必须为6个字符或以上)', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					servicerName: '',
					contactMan: '',
					contactMobile: '',
					username: '',
					password: ''
				}

			}
		},
		methods: {
			//性别显示转换
			formatUserLevel: function (row, column) {
				return row.userlevel == 1 ? '男' : row.userlevel == 2 ? '女' : '未知';
			},
			exportExcel(){
				this.filters.regBtDate = (!this.filters.regBtDate || this.filters.regBtDate == '') ? '' : util.formatDate.format(new Date(this.filters.regBtDate), 'yyyy-MM-dd');
				this.filters.regEtDate = (!this.filters.regEtDate || this.filters.regEtDate == '') ? '' : util.formatDate.format(new Date(this.filters.regEtDate), 'yyyy-MM-dd');

				let para = "";
				para += "cardSizeMin=" + ((!this.filters.cardSizeMin || this.filters.cardSizeMin == '') ? '' : this.filters.cardSizeMin);
				para += "&cardSizeMax=" + ((!this.filters.cardSizeMax || this.filters.cardSizeMax == '') ? '' :this.filters.cardSizeMax);
				para += "&servicerLevel=" + ((!this.filters.servicerLevel || this.filters.servicerLevel == '') ? '' :this.filters.servicerLevel);
				para += "&regBtDate=" + this.filters.regBtDate;
				para += "&regEtDate=" + this.filters.regEtDate;				
				para += "&servicerKeys=" + ((!this.filters.servicerKeys || this.filters.servicerKeys == '') ? '' :this.filters.servicerKeys);
				
				location.href="/api/user/exportXls?"+para;
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.getUsers();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					pageSize:this.pageSize,
					pageNum:this.currentPage			
				};
				para = Object.assign(para, this.filters);
				para.regBtDate = (!para.regBtDate || para.regBtDate == '') ? '' : util.formatDate.format(new Date(para.regBtDate), 'yyyy-MM-dd');
				para.regEtDate = (!para.regEtDate || para.regEtDate == '') ? '' : util.formatDate.format(new Date(para.regEtDate), 'yyyy-MM-dd');

				this.listLoading = true;
				//NProgress.start();
				getServicerListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.list;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.userid };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
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
					servicerName: '',
					contactMan: '',
					contactMobile: '',
					username: '',
					password: ''
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
								this.getUsers();
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

								let { msg, code } = res;
								if (code !== 0) {
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
									this.getUsers();
								}			


							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {

			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				if(user.userlevel==0){
					this.options_servicerLevel=[
						{"label":"管理员","value":"0"},
						{"label":"一级服务商","value":"1"},
						{"label":"二级服务商","value":"2"}
					];
				}else if(user.userlevel==1){
					this.options_servicerLevel=[
						{"label":"一级服务商","value":"1"},
						{"label":"二级服务商","value":"2"}
					];
				}else if(user.userlevel==2){
					this.options_servicerLevel=[
						{"label":"二级服务商","value":"2"}
					];
				}
			}


			this.getUsers();
		}
	}

</script>

<style scoped>

</style>