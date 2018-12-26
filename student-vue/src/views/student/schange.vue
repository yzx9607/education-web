<template>
	<div>
		<!--工具条 -->
		<el-col :span="24" class="toolbar" style="padding-bottom: 20px;">
			<el-row type="flex" class="row-bg" justify="space-around">
				<el-col :span="6">
					<div class="grid-content bg-purple">
						<el-button type="primary" icon="serch" @click="handleEdit" style="float:right;">异动申请</el-button>
					</div>
				</el-col>
			</el-row>
		</el-col>
		<!--列表 -->
		<el-table :data="tableData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="index" width="50">
			</el-table-column>
	
			<el-table-column prop="transactionRequest" label="申请类型">
			</el-table-column>
	
			<el-table-column prop="studentName" label="学生姓名">
			</el-table-column>
	
			<el-table-column prop="transactionApplyDateStr" label="申请日期" sortable>
				<template scope="scope">
					<el-icon name="time"></el-icon>
					<span>{{ scope.row.transactionApplyDateStr }}</span>
				</template>
			</el-table-column>
	
			<el-table-column prop="transactionCurrState" label="申请状态">
			</el-table-column>
			<el-table-column prop="transactionStartStr" label="批准日期" sortable>
				<template scope="scope">
					<el-icon name="time"></el-icon>
					<span>{{ scope.row.transactionStartStr }}</span>
				</template>
			</el-table-column>
	
		</el-table>
		<!--分页组件-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	
		<!--增加界面-->
		<el-dialog title="异动申请" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="申请类型：" prop="transactionRequest">
					<el-input v-model="editForm.transactionRequest" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="申请日期：" >
						<el-date-picker type="date" placeholder="" v-model="editForm.transactionApplyDateStr" style="width: 100%;" :picker-options="pickerOptions0"></el-date-picker>
					</el-form-item>
				<el-form-item label="申请原因：" prop="transactionText">
					<el-input v-model="editForm.transactionText" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="申请时长：" prop="transactionLong">
					<el-input v-model="editForm.transactionLong" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>



<script>
import { cha, addChange } from '../../api/api';
export default {
	data() {
		return {
			pickerOptions0: {
				disabledDate(time) {
					return time.getTime() < Date.now() - 8.64e7;
				}
			},
			tableData: [],
			id: '',
			name: '',
			total: 0,//列表总条数
			pageSize: 10,//每页条数
			currentPage: 1,//当前页码
			listLoading: false,
			sels: [],//列表选中列

			editFormVisible: false,//增加申请界面是否显示
			editLoading: false,
			editFormRules: {
				transactionRequest: [
					{ required: true, message: '请输入申请类型', trigger: 'blur' }
				],
				transactionApplyDateStr: [
					{ required: true, message: '请输入申请日期', trigger: 'blur' }
				],

				transactionText: [
					{ required: true, message: '请输入申请原因', trigger: 'blur' }
				],
				transactionLong: [
					{ required: true, message: '请输入申请时长', trigger: 'blur' }
				],
			},
			//增加申请界面数据
			editForm: {
				transactionRequest: '',
				transactionApplyDateStr:'',
				transactionText: '',
				transactionLong:''
			},
		}
	},


	methods: {

		//获取用户列表
		getData() {
			let para = {
				studentId: this.studentId,
				pageSize: this.pageSize,
				pageNo: this.currentPage
			};
			this.loading = true;
			//NProgress.start();
			//(para.studentId + "11");
			cha(para).then((res) => {
				//alert(para.studentId + "22");
				this.loading = false;
				this.tableData = res.resData.list;
				this.total = res.resData.total;
				 this.pageSize = res.resData.pageSize;
			});
		},
		//显示增加申请界面
		handleEdit: function (index, row) {
			this.editForm.transactionApplyDateStr = new Date();
			this.editFormVisible = true;
		},

		//申请提交
		editSubmit: function () {
			this.$refs.editForm.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true;
						//NProgress.start();
						let para = Object.assign({}, this.editForm);
						addChange(para).then((res) => {
							this.editLoading = false;
							//NProgress.done();
							this.$message({
								message: '提交成功',
								type: 'success'
							});
							this.$refs['editForm'].resetFields();
							this.editFormVisible = false;
							this.getData();
						});
					});
				}
			});
		},
		selsChange: function (sels) {
			this.sels = sels;
		},

		// 分页组件
		handleSizeChange(val) {
			console.log('每页 ${val} 条');
			this.pageSize = val;
			this.getData();
		},
		handleCurrentChange(val) {
			console.log('当前页：${val}');
			this.currentPage = val;
			this.getData();
		},
	},
	mounted() {
		this.getData();
	}
};
</script>