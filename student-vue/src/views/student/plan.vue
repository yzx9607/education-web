
<template>
	<div>
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
	
		</el-table>
		<!--分页组件-->
		<el-col :span="24" class="toolbar">
			<!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</div>
</template>


<script>
import { getUser } from '../../api/api';

export default {
	data() {
		return {
			tableData: [],
			studentId: '',
			studentName: '',
			total: 0,//列表总条数
			pageSize: 10,//每页条数
			currentPage: 1,//当前页码
			listLoading: false,
			sels: []//列表选中列
		};
	},
	mounted() {
		this.getdata();
	},
	methods: {
		selsChange: function (sels) {
			this.sels = sels;
		},
		//获取用户列表
		getdata() {
			let para = {
				pageSize: this.pageSize,
				pageNo: this.currentPage
			};
			para = Object.assign(para, this.filters);

			this.listLoading = true;

			getUser(para).then((res) => {
				this.listLoading = false;
				this.total = res.resData.total;
				this.pageSize = res.resData.pageSize;
				this.tableData = res.resData.list;
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

	}

};
</script>