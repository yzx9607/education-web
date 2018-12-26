<template >
	<section>
		<!--列表(查询结果-当前页)-->
		<el-table :data="StuMoney" :model="forminfos" border style="width:90%;margin:30px auto">
			<el-table-column prop="studentId" v-model="forminfos.studentId" label="学号" width="130">
			</el-table-column>
			<el-table-column prop="studentName" label="姓名" width="130">
			</el-table-column>
			<el-table-column prop="studentIdcard" label="身份证" width="200">
			</el-table-column>
			<el-table-column prop="firstMoneyTimeStr" label="第一次缴费时间" width="180">
			</el-table-column>
			<el-table-column prop="firstMoney" label="第一次缴费" width="160">
			</el-table-column>
			<el-table-column prop="firstMoneyState" label="第一次缴费状态" width="165">
				<template scope="scope">
					<div slot="reference" class="name-wrapper">
						<el-button size="small" :disabled="disabled" @click="fMoneyState(scope.$index, scope.row)" type="danger">{{ scope.row.firstMoneyState }}</el-button>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="seMoneyTimeStr" label="第二次缴费时间" width="160">
			</el-table-column>
			<el-table-column prop="secondMoney" label="第二次缴费" width="160">
			</el-table-column>
			<el-table-column label="第二次缴费状态" width="180">
				<template scope="scope">
						<div slot="reference" class="name-wrapper">
							<el-button size="small" :disabled="disabled2" @click="sMoneyState(scope.$index, scope.row)" type="danger">{{ scope.row.secondMoneyState }}</el-button>
						</div>
				</template>
			</el-table-column>
		</el-table>
		<!--学生信息详情界面-->
		<moneydetails ref="moneydetails"></moneydetails>
	
	</section>
</template>
<script>
import { getMoney } from '../../api/api';
import Moneydetails from '../../components/money_details.vue';
export default {
	components: {
		moneydetails: Moneydetails
	},
	data() {

		return {
			StuMoney: [],
			radio: '1',
			editFormVisible: false,//缴费界面是否显示
			editLoading: false,
			forminfos: {
				studentId: '',
			},
			disabled: false,
			disabled2: false
		}
	},
	mounted() {
		this.listMoney();
	},
	methods: {
		listMoney() {
			//Id要从session取 
			let para = {};
			getMoney(para).then((res) => {
				var status = res.resData[0].firstMoneyState;
				var status2 = res.resData[0].secondMoneyState;
				if (status === "未交费") {
					this.disabled = false;
				}else{
					this.disabled = true;
				}
				if(status2 === "未交费"){
					this.disabled2 = false;
				}else{
					this.disabled2 = true;
				}
				this.StuMoney = res.resData;
			});
		},
		//第一次缴费状态
		fMoneyState: function (index, row) {
			this.$refs.moneydetails.showMoneyDetail(row.studentIdcard);
		},
		//第二次交费状态
		sMoneyState: function (index, row) {
			this.$refs.moneydetails.showMoneyDetail(row.studentIdcard);
			//this.listMoney();
		},
	}
}
</script>
<style scoped>

</style>