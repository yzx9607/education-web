<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-select v-model="filters.cardState" placeholder="卡状态" clearable>
						<el-option
						  v-for="item in options_cardstate"
						  :label="item.label"
						  :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select v-model="filters.cardType" placeholder="套餐" clearable>
						<el-option
						  v-for="item in options_cardtype"
						  :label="item.packname"
						  :value="item.packname">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-date-picker
					  v-model="filters.inSkuBt"
					  type="date"
					  placeholder="入库开始日期">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-date-picker
					  v-model="filters.inSkuEt"
					  type="date"
					  placeholder="入库截止日期"
					  :picker-options="pickerOptions0">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.cardSegBt" placeholder="卡号段开始"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.cardSegEt" placeholder="卡号段截止"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.likeCardKey" placeholder="输卡号/ICCID/IMSI/查询码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getCards">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleBatchOutSku">批量出库</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="exportExcel">导出EXCEL</el-button>
				</el-form-item>				
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="cards" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<!--
			<el-table-column type="selection" width="55">
			</el-table-column>
			-->
			<el-table-column prop="msisdn" label="卡号" width="150" sortable>
			</el-table-column>
			<el-table-column prop="iccid" label="ICCID" width="210" sortable>
			</el-table-column>
			<el-table-column prop="imsi" label="IMSI" width="180" sortable>
			</el-table-column>
			<el-table-column prop="querycode" label="查询代码" width="120" sortable>
			</el-table-column>
			<el-table-column prop="packagename" label="套餐名称" min-width="180" sortable>
			</el-table-column>
			<el-table-column prop="cardstate" label="卡状态" min-width="100" sortable>
			</el-table-column>
			<el-table-column prop="servicername" label="服务商名" min-width="180" sortable>
			</el-table-column>			
			<el-table-column prop="outSkuDate" label="出库日期" min-width="100" sortable>
			</el-table-column>
			<el-table-column prop="addtime" label="入库日期" min-width="100" sortable>
			</el-table-column>
			<el-table-column label="操作" width="80" fixed="right">
				<template scope="scope">
					<el-button size="small" @click="handleMore(scope.$index, scope.row)">详细</el-button>
					<!--<el-button type="danger" size="small" @click="handleOneOutSku(scope.$index, scope.row)">出库</el-button>-->
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!--
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			-->
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

		<!--批量出库界面-->
		<el-dialog title="卡号批量出库" v-model="batchOutSkuFormVisible" :close-on-click-modal="false" >
			<el-form :model="batchOutSkuForm"  :rules="batchOutSkuFormRules" ref="batchOutSkuForm" label-width="100px">
				<el-form-item label=" 卡 号 段：">
					<el-col :span="11">
					<el-form-item prop="cardnoBt">
						<el-input v-model="batchOutSkuForm.cardnoBt"  placeholder="请输入MSISDN" style="width: 100%;" v-on:change="HandleBlurCardnoBt"></el-input>
					</el-form-item>
					</el-col>
					<el-col class="line" :span="2" style="text-align:center;">至</el-col>
					<el-col :span="11">
					<el-form-item prop="cardnoEt">
						<el-input v-model="batchOutSkuForm.cardnoEt"  placeholder="请输入MSISDN" style="width: 100%;" v-on:change="HandleBlurCardnoEt"></el-input>
					</el-form-item>
					</el-col>
				</el-form-item>									
				<el-form-item label="" v-show="batchOutSkuForm.outSkuNumTipShow">
						<el-alert style="height:10%;opacity:0.8;"
							:title="batchOutSkuForm.outSkuNumTip"
							type="info"
							:closable="false"
							show-icon>
						</el-alert>
				</el-form-item>
				<el-form-item label=" 服 务 商：" prop="serviceman">
					<el-select v-model="batchOutSkuForm.serviceman" placeholder="请选择" style="width: 100%;" filterable clearable>
						<el-option
						  v-for="item in options_servicerman"
						  :label="item.servicerName"
						  :value="item.userid+''">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="出库日期：">
					<el-date-picker type="date" placeholder="" v-model="batchOutSkuForm.skuOutDate" style="width: 100%;"></el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="batchOutSkuFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="batchOutSkuFormSubmit" :loading="editLoading">保存</el-button>
			</div>
		</el-dialog>

		<!--单张出库界面-->
		<el-dialog title="单张卡出库" v-model="oneOutSkuFormVisible" :close-on-click-modal="false">
			<el-form :model="oneOutSkuForm"  :rules="oneOutSkuFormRules" ref="oneOutSkuForm" label-width="100px">	
				<el-form-item label="">
						<el-alert style="height:10%;opacity:0.8;"
							:title="oneOutSkuForm.oneSkuNumTip"
							type="info"
							:closable="false"
							show-icon>
						</el-alert>
				</el-form-item>
				<el-form-item label=" 服 务 商：" prop="serviceman">
					<el-select v-model="oneOutSkuForm.serviceman" placeholder="请选择" style="width: 100%;">
						<el-option
						  v-for="item in options_servicerman"
						  :label="item.servicerName"
						  :value="item.userid+''">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="出库日期：">
					<el-date-picker type="date" placeholder="" v-model="oneOutSkuForm.skuOutDate" style="width: 100%;"></el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="oneOutSkuFormVisible= false">取消</el-button>
				<el-button type="primary" @click.native="oneOutSkuFormSubmit" :loading="editLoading">保存</el-button>
			</div>
		</el-dialog>
		
		<!--卡号信息详情界面-->
		<cardinfo ref="cardinfo"></cardinfo>

	</section>
</template>

<script>
	import util from '../../../common/js/util'
	import constant from '../../../common/js/constant'
	//import NProgress from 'nprogress'
	import { getOutCardListPage, outCard, batchOutCard, getChildUsers, getPackList, getUserOwnerCardnum } from '../../../api/api';
	import Cardinfo from '../../../components/course_info.vue';

	export default {
		components: {
			cardinfo: Cardinfo
  		},
		data() {
			return {
				pickerOptions0: {
					disabledDate(time) {
						return false;
					}
				},
				options:[],
				options_cardstate: constant.opt_cardstate,
				options_cardtype: constant.opt_cardtype,
				options_servicerman:constant.opt_servicerman,
				filters: {
					//卡状态
					cardState: '',
					//卡套餐名称类型
					cardType: '',
					//入库开始时间
					inSkuBt: '',
					//入库截止时间
					inSkuEt: '',
					//卡号段开始
					cardSegBt: '',
				    //卡号段截止				
					cardSegEt: '',
					//模糊查询卡关键字
					likeCardKey: ''
				},
				cards: [],
				total: 0,//列表总条数
				pageSize:10,//每页条数
				currentPage:1,//当前页码
				listLoading: false,
				sels: [],//列表选中列

				batchOutSkuFormVisible: false,//批量出库界面是否显示
				editLoading: false,
				batchOutSkuFormRules: {
					cardnoBt: [
						{ required: true, message: '请输入MSISDN开始号段', trigger: 'blur' }
					],
					cardnoEt: [
						{ required: true, message: '请输入MSISDN截至号段', trigger: 'blur' }
					],				
					serviceman: [
						{ required: true, message: '请选择服务商', trigger: 'change' }
					],			
					skuOutDate: [
						{ required: true, message: '请输入出库日期', trigger: 'blur' }
					]
				},
				//批量出库界面数据
				batchOutSkuForm: {
					outSkuNumTip:'',
					outSkuNumTipShow:false,
					cardnoBt: '',
					cardnoEt: '',
					serviceman: '',
					skuOutDate: new Date()
				},
				oneOutSkuFormVisible: false,//单卡出库界面是否显示
				addLoading: false,
				oneOutSkuFormRules: {
					cardno: [
						{ required: true, message: '请输入出库卡号', trigger: 'blur' }
					],				
					serviceman: [
						{ required: true, message: '请选择服务商', trigger: 'change' }
					],			
					skuOutDate: [
						{ required: true, message: '请输入出库日期', trigger: 'blur' }
					]
				},
				//单卡出库界面数据
				oneOutSkuForm: {
					cardno: '',
					serviceman: '',
					skuOutDate: new Date(),
					oneSkuNumTip:''
				}

			}
		},
		methods: {
			HandleBlurCardnoBt(){
				var diffNum = this.batchOutSkuForm.cardnoEt - this.batchOutSkuForm.cardnoBt;
				if(diffNum>=0){
					//实际可出库数量
					let para = Object.assign({}, this.batchOutSkuForm);
					getUserOwnerCardnum(para).then((res) => {
						this.batchOutSkuForm.outSkuNumTip="本次预计出库卡数量为"+(diffNum+1)+"张,实际您可出库"+res.data+"张";
						this.batchOutSkuForm.outSkuNumTipShow=true;
					});
				}else{
					this.batchOutSkuForm.outSkuNumTipShow=false;
				}
			},
			HandleBlurCardnoEt(){
				var diffNum = this.batchOutSkuForm.cardnoEt - this.batchOutSkuForm.cardnoBt;
				if(diffNum>=0){				
					//实际可出库数量
					let para = Object.assign({}, this.batchOutSkuForm);
					getUserOwnerCardnum(para).then((res) => {
						this.batchOutSkuForm.outSkuNumTip="本次预计出库卡数量为"+(diffNum+1)+"张,实际您可出库"+res.data+"张";
						this.batchOutSkuForm.outSkuNumTipShow=true;
					});
				}else{
					this.batchOutSkuForm.outSkuNumTipShow=false;
				}
			},
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			exportExcel(){
				this.filters.inSkuBt = (!this.filters.inSkuBt || this.filters.inSkuBt == '') ? '' : util.formatDate.format(new Date(this.filters.inSkuBt), 'yyyy-MM-dd');
				this.filters.inSkuEt = (!this.filters.inSkuEt || this.filters.inSkuEt == '') ? '' : util.formatDate.format(new Date(this.filters.inSkuEt), 'yyyy-MM-dd');

				let para = "";
				para += "cardState=" + ((!this.filters.cardState || this.filters.cardState == '') ? '' : this.filters.cardState);
				para += "&cardType=" + ((!this.filters.cardType || this.filters.cardType == '') ? '' :this.filters.cardType);
				para += "&inSkuBt=" + this.filters.inSkuBt;
				para += "&inSkuEt=" + this.filters.inSkuEt;
				para += "&cardSegBt=" + ((!this.filters.cardSegBt || this.filters.cardSegBt == '') ? '' :this.filters.cardSegBt);
				para += "&cardSegEt=" + ((!this.filters.cardSegEt || this.filters.cardSegEt == '') ? '' :this.filters.cardSegEt);
				para += "&likeCardKey=" + ((!this.filters.likeCardKey || this.filters.likeCardKey == '') ? '' :this.filters.likeCardKey);
				
				location.href="/api/cards/exportOutskuXls?"+para;
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.getCards();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getCards();
			},
			//获取用户列表
			getCards() {
				let para = {
					pageSize:this.pageSize,
					pageNum:this.currentPage			
				};
				para = Object.assign(para, this.filters);
				para.inSkuBt = (!para.inSkuBt || para.inSkuBt == '') ? '' : util.formatDate.format(new Date(para.inSkuBt), 'yyyy-MM-dd');
				para.inSkuEt = (!para.inSkuEt || para.inSkuEt == '') ? '' : util.formatDate.format(new Date(para.inSkuEt), 'yyyy-MM-dd');

				this.listLoading = true;
				//NProgress.start();
				getOutCardListPage(para).then((res) => {
					this.total = res.data.total;
					this.cards = res.data.list;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//显示单卡出库界面
			handleOneOutSku: function (index, row) {
				this.oneOutSkuForm.oneSkuNumTip = "卡号："+row.msisdn+" ,  ICCID:"+row.iccid;
				this.oneOutSkuForm.cardno = row.msisdn;
				this.oneOutSkuForm.skuOutDate = new Date();

				let para = {};
				getChildUsers(para).then((res) => {
					this.editLoading = false;
					this.options_servicerman=res.data;
				});

				this.oneOutSkuFormVisible = true;			
			},
			//显示批量出库界面
			handleBatchOutSku: function (index, row) {

				let para = {};
				getChildUsers(para).then((res) => {
					this.editLoading = false;
					this.options_servicerman=res.data;
				});

				this.batchOutSkuForm.skuOutDate=new Date();
				this.batchOutSkuFormVisible = true;			
			},
			//显示卡号详细界面
			handleMore: function (index, row) {
				 this.$refs.cardinfo.showCardDetail(row.msisdn);
			},
			//单卡出库ACTION处理
			oneOutSkuFormSubmit: function () {
				this.$refs.oneOutSkuForm.validate((valid) => {
					if (valid) {					
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = {};
							para.cardno = this.oneOutSkuForm.cardno;
							para.serviceman = this.oneOutSkuForm.serviceman;
							para.skuOutDate = this.oneOutSkuForm.skuOutDate;
							para.skuOutDate = (!para.skuOutDate || para.skuOutDate == '') ? '' : util.formatDate.format(new Date(para.skuOutDate), 'yyyy-MM-dd');
							outCard(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['oneOutSkuForm'].resetFields();
								this.oneOutSkuFormVisible = false;
								this.getCards();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量出库ACTION处理
			batchOutSkuFormSubmit:function(){
				this.$refs.batchOutSkuForm.validate((valid) => {
					if (valid) {
						if(this.batchOutSkuForm.outSkuNumTipShow===false){
							this.$message({
							message: "选择的卡号段无效,请重新选择！",
							type: 'error'
							});
							return;
						}
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.batchOutSkuForm);
							para.skuOutDate = (!para.skuOutDate || para.skuOutDate == '') ? '' : util.formatDate.format(new Date(para.skuOutDate), 'yyyy-MM-dd');
							batchOutCard(para).then((res) => {
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
										message: '出库成功',
										type: 'success'
									});
									this.$refs['batchOutSkuForm'].resetFields();
									this.batchOutSkuFormVisible = false;
									this.getCards();
								}			
							});
						});
					}
				});
			}

		},
		mounted() {
			let para = {};
			getPackList(para).then((res) => {
				this.editLoading = false;
				this.options_cardtype=res.data;
			});
			this.getCards();
		}
	}

</script>

<style scoped>

</style>