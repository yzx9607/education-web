<template>
		<!--教师端主页公告详情内容(根据id)(shi_21.vue里的详情的弹出层)-->
		<el-dialog title="教师首页公告内容" v-model="cardDetailVisible" :close-on-click-modal="false">
			<el-form label-width="100px" :model="cardDetail" ref="cardDetail">
			<div style="overflow: auto; width: 100%;">
				<table class="border-table">  
						<tr>  
							<td class="spec alt">{{cardDetail.noticeName}}</td> 
						</tr>
						<tr>  
							<td>{{cardDetail.noticeInfo}}</td> 
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
	import { getMasterIndexAnnouncement } from '../api/api';
	export default {
		data() {
			return {
						cardDetailVisible:false,
						queryLoading:false,
						cccccc:11,
						cardDetail: {
								noticeId: '',
								noticeName: '',
								noticeInfo: ''
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
				let para = {noticeId:row.noticeId};
				getMasterIndexAnnouncement(para).then((res) => {
					this.queryLoading = false;;
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