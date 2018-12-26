<template>
		<!--卡详情界面-->
		<el-dialog title="卡详情信息" v-model="cardDetailVisible" :close-on-click-modal="false">
			<el-form label-width="100px" :model="cardDetail" ref="cardDetail">
			<!--
			<el-row :gutter="1">
			  <el-col :span="4"><div class="grid-content bg-purple">卡号：</div></el-col>
			  <el-col :span="4"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.msisdn}}</div></el-col>
			  <el-col :span="3"><div class="grid-content bg-purple">ICCID:</div></el-col>
			  <el-col :span="5"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.iccid}}</div></el-col>
			  <el-col :span="3"><div class="grid-content bg-purple">IMSI:</div></el-col>
			  <el-col :span="5"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.imsi}}</div></el-col>
			</el-row>
			<el-row :gutter="1">
			  <el-col :span="4"><div class="grid-content bg-purple">用户状态：</div></el-col>
			  <el-col :span="4"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.cardstate}}</div></el-col>
			  <el-col :span="3"><div class="grid-content bg-purple">套餐名称：</div></el-col>
			  <el-col :span="5"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.packname}}</div></el-col>
			  <el-col :span="3"><div class="grid-content bg-purple">查询代码：</div></el-col>
			  <el-col :span="5"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.querycode}}</div></el-col>
			</el-row>
			<el-row :gutter="1">
			  <el-col :span="4"><div class="grid-content bg-purple">工作状态：</div></el-col>
			  <el-col :span="4"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.workstate}}</div></el-col>
			  <el-col :span="3"><div class="grid-content bg-purple">开机状态：</div></el-col>
			  <el-col :span="5"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.openstate}}</div></el-col>
			  <el-col :span="3"><div class="grid-content bg-purple">API代码：</div></el-col>
			  <el-col :span="5"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.apicode}}</div></el-col>
			</el-row>
			<el-row :gutter="1">
			  <el-col :span="4"><div class="grid-content bg-purple">是否签约短信服务：</div></el-col>
			  <el-col :span="4"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.smssign}}</div></el-col>
			  <el-col :span="3"><div class="grid-content bg-purple">是否签约GPRS:</div></el-col>
			  <el-col :span="5"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.gprssign}}</div></el-col>
			  <el-col :span="3"><div class="grid-content bg-purple">用户余额：</div></el-col>
			  <el-col :span="5"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.balance}}元</div></el-col>
			</el-row>
			<el-row :gutter="1">
			  <el-col :span="4"><div class="grid-content bg-purple">套餐总流量：</div></el-col>
			  <el-col :span="4"><div class="grid-content bg-purple bg-purple-light">{{formatGprsVal(cardDetail.gprstotal,'m')}}</div></el-col>
			  <el-col :span="3"><div class="grid-content bg-purple">已用流量：</div></el-col>
			  <el-col :span="5"><div class="grid-content bg-purple bg-purple-light">{{formatGprsVal(cardDetail.gprsused)}}</div></el-col>
			  <el-col :span="3"><div class="grid-content bg-purple">剩余流量：</div></el-col>
			  <el-col :span="5"><div class="grid-content bg-purple bg-purple-light">{{formatGprsVal(cardDetail.gprsnow)}}</div></el-col>
			</el-row>
			<el-row :gutter="1">
			  <el-col :span="4"><div class="grid-content bg-purple">当月短信使用条数：</div></el-col>
			  <el-col :span="4"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.smsmonthused}}条</div></el-col>
			  <el-col :span="3"><div class="grid-content bg-purple">服务商名称：</div></el-col>
			  <el-col :span="5"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.servicername}}</div></el-col>
			  <el-col :span="3"><div class="grid-content bg-purple">激活时间：</div></el-col>
			  <el-col :span="5"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.activetime}}</div></el-col>
			</el-row>
			<el-row :gutter="1">
			  <el-col :span="4"><div class="grid-content bg-purple">APN：</div></el-col>
			  <el-col :span="4"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.apn}}</div></el-col>
			  <el-col :span="3"><div class="grid-content bg-purple">IP：</div></el-col>
			  <el-col :span="5"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.ip}}</div></el-col>
			  <el-col :span="3"><div class="grid-content bg-purple">接入类型：</div></el-col>
			  <el-col :span="5"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.innettype}}</div></el-col>
			</el-row>
			<el-row :gutter="1">
			  <el-col :span="4"><div class="grid-content bg-purple">入库日期：</div></el-col>
			  <el-col :span="4"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.inskutime}}</div></el-col>
			  <el-col :span="3"><div class="grid-content bg-purple">出库日期：</div></el-col>
			  <el-col :span="5"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.outskutime}}</div></el-col>
			  <el-col :span="3"><div class="grid-content bg-purple">最后更新时间：</div></el-col>
			  <el-col :span="5"><div class="grid-content bg-purple bg-purple-light">{{cardDetail.lastsyntime}}</div></el-col>
			</el-row>
			-->
			<div style="overflow: auto; width: 100%;">
				<table class="border-table">  
						<tr>  
							<td class="spec alt">卡号：</td> 
							<td>{{cardDetail.msisdn}}</td> 
							<td class="alt">ICCID:</td> 
							<td>{{cardDetail.iccid}}</td> 
							<td class="alt">IMSI:</td> 
							<td>{{cardDetail.imsi}}</td> 
						</tr>
						<tr>  
							<td class="spec alt">用户状态：</td> 
							<td>{{cardDetail.cardstate}}</td> 
							<td class="alt">套餐名称：</td> 
							<td>{{cardDetail.packname}}</td> 
							<td class="alt">查询代码：</td> 
							<td>{{cardDetail.querycode}}</td> 
						</tr>					
						<tr>  
							<td class="spec alt">工作状态：</td> 
							<td>{{cardDetail.workstate}}</td> 
							<td class="alt">开机状态：</td> 
							<td>{{cardDetail.openstate}}</td> 
							<td class="alt">API代码：</td> 
							<td>{{cardDetail.apicode}}</td> 
						</tr>	
						<tr>  
							<td class="spec alt">是否签约短信服务：</td> 
							<td>{{cardDetail.smssign}}</td> 
							<td class="alt">是否签约GPRS:</td> 
							<td>{{cardDetail.gprssign}}</td> 
							<td class="alt">用户余额：</td> 
							<td>{{cardDetail.balance}}元</td> 
						</tr>	
						<tr>  
							<td class="spec alt">套餐总流量：</td> 
							<td>{{formatGprsVal(cardDetail.gprstotal,'m')}}</td> 
							<td class="alt">已用流量：</td> 
							<td>{{formatGprsVal(cardDetail.gprsused)}}</td> 
							<td class="alt">剩余流量：</td> 
							<td>{{formatGprsVal(cardDetail.gprsnow)}}</td> 
						</tr>	
						<tr>  
							<td class="spec alt">当月短信使用条数：</td> 
							<td>{{cardDetail.smsmonthused}}条</td> 
							<td class="alt">服务商名称：</td> 
							<td>{{cardDetail.servicername}}</td> 
							<td class="alt">激活时间：</td> 
							<td>{{cardDetail.activetime}}</td> 
						</tr>		
						<tr>  
							<td class="spec alt">APN：</td> 
							<td>{{cardDetail.apn}}</td> 
							<td class="alt">IP：</td> 
							<td>{{cardDetail.ip}}</td> 
							<td class="alt">接入类型：</td> 
							<td>{{cardDetail.innettype}}</td> 
						</tr>	
						<tr>  
							<td class="spec alt">入库日期：</td> 
							<td>{{cardDetail.inskutime}}</td> 
							<td class="alt">出库日期：</td> 
							<td>{{cardDetail.outskutime}}</td> 
							<td class="alt">最后更新时间：</td> 
							<td>{{cardDetail.lastsyntime}}</td> 
						</tr>				
					</table> 
			</div>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="cardDetailVisible = false">取消</el-button>
				<el-button type="primary" @click.native="updateCard" :loading="queryLoading">手动更新</el-button>
			</div>

			<!--响应式布局-->
			<!--
			<el-row :gutter="0" v-show="false">
				<el-col :xs="24" :sm="12" :md="12" :lg="6"><div class="grid-content bg-purple">是否签约短信服务：</div></el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="6"><div class="grid-content bg-purple-light">{{cardDetail.msisdn}}</div></el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="6"><div class="grid-content bg-purple">当月短信使用条数：</div></el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="6"><div class="grid-content bg-purple-light">{{cardDetail.imsi}}</div></el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="6"><div class="grid-content">最后更新时间：</div></el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="6"><div class="grid-content bg-purple-light">{{cardDetail.imsi}}</div></el-col>
			</el-row>
			-->

		</el-dialog>
</template>

<script>
	import { getCardDetail,synCardDetail } from '../api/api';
	export default {
		data() {
			return {
						cardDetailVisible:false,
						queryLoading:false,
						cardDetail: {
								querycode: '',
								smssign: '',
								gprsused: '',
								gprssign: '',
								packname: '',
								openstate: '',
								smsmonthused: '',
								imsi: '',
								outskutime: '',
								gprsnow: '',
								activetime: '',
								iccid: '',
								balance: '',
								apicode: '',
								servicername: '',
								inskutime: '',
								msisdn: '',
								gprstotal: '',
								cardstate: '',
								lastsyntime: ''
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
			updateCard() {
				console.log('准备访问接口更新卡的数据信息!');
				let para = {cardId:this.cardDetail.msisdn};
				this.queryLoading = true;
				synCardDetail(para).then((res) => {

								let { msg, code } = res;
								if (code !== 0) {
									this.queryLoading = false;
									this.$message({
										message: msg,
										type: 'error'
									});
								} else {
									getCardDetail(para).then((res) => {
											this.queryLoading = false;
											this.cardDetail=res.data;
											this.$message({
												message: "同步成功",
												type: 'success'
											});
									});
								}

				});
			},
			showCardDetail(val) {
				//AJAX异步去数据库查询卡号详细信息
				this.cardDetail.msisdn=val;
				let para = {cardId:this.cardDetail.msisdn};
				getCardDetail(para).then((res) => {
					this.queryLoading = false;
								let { msg, code } = res;
								if (code !== 0) {
									this.queryLoading = false;
									this.$message({
										message: msg,
										type: 'error'
									});
								} else {
										this.cardDetail=res.data;
								}
				});
				this.cardDetailVisible=true;
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
		border:1px solid #d3dce6;
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