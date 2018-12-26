<template>
	<!--卡详情界面-->
	<el-dialog title="学费缴纳" v-model="moneyDetailVisible"    :close-on-click-modal="false">
		<el-form label-width="100px" :model="moneyDetail" ref="moneyDetail">
			<el-form-item label="姓名：" prop="studentName">
				<div>{{moneyDetail.studentName}}</div>
			</el-form-item>
			<el-form-item label="手机号：" prop="studentPhone">
				<div>{{moneyDetail.studentPhone}}</div>
			</el-form-item>
			<el-form-item label="身份证：" prop="studentIdcard">
				<div>{{moneyDetail.studentIdcard}}</div>
			</el-form-item>
			<el-form-item label="专业:" prop="majorName">
				<div>{{moneyDetail.majorName}}</div>
			</el-form-item>
			<el-form-item label="缴费金额:" prop="enrollTuition">{{moneyDetail.enrollTuition}}</el-form-item>
			<el-form-item label="缴费方式:" prop="studentPayWay">
				<el-radio class="radio" v-model="radio" label="1">微信</el-radio>
				<el-radio class="radio" v-model="radio" label="2">支付宝</el-radio>
				<el-radio class="radio" v-model="radio" label="3">银行卡</el-radio>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click.native="moneyDetailVisible = false">取消</el-button>
			<el-button type="primary" @click.native="update" :loading="queryLoading">确认缴费</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { payMoney,updateMoney} from '../api/api';
export default {
	data() {
		return {
			radio: '',
			moneyDetailVisible: false,
			queryLoading: false,
			moneyDetail: {
				studentName: '', //姓名
				studentPhone: '', //电话
				studentIdcard: '', //身份证
				majorName: '', //专业
				enrollTuition: '', //缴费金额
				enterPayWay: '' //支付方式
			},

		}
	},
	methods: {
	//更新缴费
	update: function () {
				this.$refs.moneyDetail.validate((valid) => {
					if (valid) {
						// this.$confirm('确认缴费吗？', '提示', {}).then(() => {
							this.queryLoading = true;
							let para = Object.assign({}, this.moneyDetail);
							updateMoney(para).then((res) => {
								this.queryLoading = false;
								let { resMsg, resCode } = res;
								alert(res.resCode)
								if (resCode!==0) {
									this.$message({
										message: resMsg,
										type: 'error'
									});
								} else {
									this.$message({
										message: '缴费成功',
										type: 'success',	
									});
								this.moneyDetailVisible = false;
								this.$refs['moneyDetail'].resetFields();
								this.$parent.listMoney();
								}
							});
						// });
					}
				});
			},
		showMoneyDetail(val) {
			//AJAX异步去数据库查询学生缴费详细信息
			this.moneyDetail.studentIdcard = val;
			let para = { studentIdcard: this.moneyDetail.studentIdcard };
			payMoney(para).then((res) => {
				this.queryLoading = false;
				let { resMsg, resCode } = res;
				if (resCode !== 0) {
					this.queryLoading = false;
					this.$message({
						message: resMsg,
						type: 'error'
					});
				} else {
					this.moneyDetail = res.resData;
				}
			});
			this.moneyDetailVisible = true;
		}
	}
}
</script>
<style scoped>
.el-row {
	margin-bottom: 0px;
	&:last-child {
		margin-bottom: 0;
	}
}

.el-col {
	border-radius: 0px;
	border: 1px solid #d3dce6;
}

.bg-purple-dark {
	background: red;
}

.bg-purple {
	background: #FFF;
}

.bg-purple-light {
	color: #009966;
	min-height: 36px;
	line-height: 36px;
}

.grid-content {
	border-radius: 0px;
	border: 0px;
	min-height: 36px;
	line-height: 36px;
}

.row-bg {
	padding: 10px 0;
	background-color: red;
}

.border-table {
	border-collapse: collapse;
	border: none;
	width: 100%;
}

.border-table td {
	border: solid #dfe8ec 1px;
	background: #fff;
	font-size: 14px;
	padding: 6px 6px 6px 12px;
	color: #009966;
	line-height: 28px;
}

td.alt {
	background: #EFF2F7;
	color: #8492A6;
}
</style>