<template>
		<!--审核部分的历史记录详情(根据id)(my_344.vue里的详情的弹出层)-->
		<el-dialog title="卡详情信息" v-model="cardDetailVisible" :close-on-click-modal="false">
			<el-form label-width="100px" :model="cardDetail" ref="cardDetail">
			<div style="overflow: auto; width: 100%;">
				<table class="border-table">  
						<tr>  
							<td class="spec alt">报名编号</td> 
							<td>{{cardDetail.enterId}}</td> 
							<td class="alt">姓名</td> 
							<td>{{cardDetail.enterName}}</td> 
							<td class="alt">性别</td> 
							<td>{{cardDetail.enterSex}}</td> 
						</tr>
						<tr>  
							<td class="spec alt">出生日期</td> 
							<td>{{cardDetail.strEnterBirth}}</td> 
							<td class="alt">民族</td> 
							<td>{{cardDetail.enterNation}}</td> 
							<td class="alt">身份证</td> 
							<td>{{cardDetail.enterIdCard}}</td> 
						</tr>					
						<tr>  
							<td class="spec alt">手机号</td> 
							<td>{{cardDetail.enterPhone}}</td> 
							<td class="alt">毕业院校</td> 
							<td>{{cardDetail.enterGraduate}}</td> 
							<td class="spec alt">学历</td> 
							<td>{{cardDetail.enterEducation}}</td> 
							
						</tr>	
						<tr>  
							<td class="alt">地址</td> 
							<td>{{cardDetail.enterAddress}}</td> 
							<td class="alt">照片</td> 
							<td>{{cardDetail.enterPhoto}}</td> 
							<td class="alt">email</td> 
							<td>{{cardDetail.enterEmail}}</td> 
						</tr>	
						
						<tr>  
							<td class="spec alt">报名日期 </td> 
							<td>{{cardDetail.strEnterDate}}</td> 
							<td class="alt">所选形式</td> 
							<td>{{cardDetail.enterStringType}}</td> 
							<td class="spec alt">报名专业</td> 
							<td>{{cardDetail.majorName}}</td>
						</tr>
						<tr>  
							<td class="spec alt">审核状态</td> 
							<td>{{cardDetail.enterCheckStringState}}</td> 
							<td class="alt">审核时间</td> 
							<td>{{cardDetail.strEnterCheckDate}}</td> 
							<td class="alt">初考成绩</td> 
							<td>{{cardDetail.enterFirstScore}}</td> 
						</tr>	
						<tr> 
							<td class="alt">应交学费</td> 
							<td>{{cardDetail.enrollTuition}}</td> 
							<td class="alt">缴费方式</td> 
							<td>{{cardDetail.enterPayStringWay}}</td> 
							<td class="alt">缴费状态</td> 
							<td>{{cardDetail.enterPayStringState}}</td> 
						</tr>
								
						<tr>  
							<td class="spec alt">缴费金额</td> 
							<td>{{cardDetail.enterPayMoney}}</td> 
							<td class="alt">缴费日期</td> 
							<td>{{cardDetail.strEnterPayDate}}</td> 
						</tr>	
						<tr>  
							 <td class="alt">毕业证件照</td> 
							<td>{{cardDetail.enterCertificate}}</td> 
						</tr>				
					</table>  
			</div>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="cardDetailVisible = false">取消</el-button>
			</div>
		</el-dialog>
</template>

<script>
	import { getCheckQueryHistoricalMessage } from '../api/api';
	export default {
		data() {
			return {
						cardDetailVisible:false,
						queryLoading:false,
						cccccc:11,
						cardDetail: {
								enterId: '',
								enterName: '',
								enterSex: '',
								enterBirth: '',
								enterNation: '',
								enterIdCard: '',
								enterPhone: '',
								enterGraduate: '',
								enterEducation: '',
								enterAddress: '',
								enterPhoto: '',
								enterEmail: '',
								enterDate: '',
								enterStringType: '',
								majorName: '',
								enterCheckStringState: '',
								enterCheckDate: '',
								enterFirstScore: '',
								enrollTuition: '',
								enterPayStringWay: '',
								enterPayStringState: '',
								enterPayMoney: '',
								enterPayDate: '',
								enterCertificate:'',
								strEnterBirth: '',
								strEnterCheckDate: '',
								strEnterDate: '',
								strEnterPayDate: ''
						}
			}
		},
		methods: {
			//格式化计算GPRS流量值
			formatGprsVal(arg,unit){
				var gprs = parseFloat(arg);    
				if (isNaN(gprs)) {   
					return;    
				}     
				if(unit=='m' || unit=='M'){
					gprs = gprs * 1024;
				}
				var tmpRs = gprs /1024;
				if(tmpRs<1){
					gprs = Math.round(gprs*100)/100;  
					return gprs + "KB";
				}
				gprs = tmpRs;
				tmpRs = gprs /1024;
				if(tmpRs<1){
					gprs = Math.round(gprs*100)/100;  
					return gprs + "MB";
				}
				gprs = tmpRs;
				tmpRs = tmpRs /1024;
				if(tmpRs<1){
					gprs = Math.round(gprs*100)/100;  
					return gprs + "GB";
				}
			},
			showCardDetail(row) {
				//AJAX异步去数据库查询卡号详细信息
				let para = {enterId:row.enterId};
				getCheckQueryHistoricalMessage(para).then((res) => {
					this.queryLoading = false;
								let { msg, code } = res;
								if (code !== 0) {
									this.queryLoading = false;
									this.$message({
										message: msg,
										type: 'error'
									});
								} else {
										this.cardDetail=res.resData;
								}
										this.cardDetail=res.resData;
				});
				this.cardDetailVisible=true;
			}		
		}
	}

</script>
<style scoped>
  .bg-purple {
    background: #FFF;
  }
  .bg-purple-light {
    color: #009966;
		min-height: 36px;
		line-height:36px;
  }
  .grid-content {
    border-radius: 0px;
		border:0px;
    min-height: 36px;
		line-height:36px;
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
		font-size:14px; 
		padding: 6px 6px 6px 12px; 
		color: #009966; 	
		line-height:28px;				
	}   
	td.alt { 
		background: #EFF2F7; 
		color:#8492A6;
	} 
</style>