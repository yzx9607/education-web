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
					  v-model="filters.activeBt"
					  type="date"
					  placeholder="激活开始日期"
					  :picker-options="pickerOptions0">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-date-picker
					  v-model="filters.activeEt"
					  type="date"
					  placeholder="激活截止日期"
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
					<el-date-picker
					  v-model="filters.inSkuBt"
					  type="date"
					  placeholder="入库开始日期"
					  :picker-options="pickerOptions0">
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
					<el-date-picker
					  v-model="filters.outSkuBt"
					  type="date"
					  placeholder="出库开始日期"
					  :picker-options="pickerOptions0">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-date-picker
					  v-model="filters.outSkuEt"
					  type="date"
					  placeholder="出库截止日期"
					  :picker-options="pickerOptions0">
					</el-date-picker>
				</el-form-item>

				<template v-if="sysUserName!='二级服务商'">
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
					<el-select v-model="filters.servicerName" placeholder="服务商名称" clearable>
								<el-option
								  v-for="item in options_servicerman"
								  :label="item.servicerName"
								  :value="item.userid+''">
								</el-option>
					</el-select>
				</el-form-item>
				</template>

				<el-form-item>
					<el-input v-model="filters.likeCardKey" placeholder="输卡号/ICCID/IMSI/查询码"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" v-on:click="getCards">查询</el-button>
				</el-form-item>
				
				<template v-if="sysUserName=='管理员'">
					<el-form-item>
						<el-button type="primary" @click="handleEdit">批量编辑</el-button>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="showBatchActive">批量激活</el-button>
					</el-form-item>					
				</template>
				
				<el-form-item>
					<el-button type="primary" @click="exportExcel">导出EXCEL</el-button>
				</el-form-item>				
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="cards" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column prop="msisdn" label="卡号" width="150" sortable>
			</el-table-column>
			<el-table-column prop="iccid" label="ICCID" width="210" sortable>
			</el-table-column>
			<el-table-column prop="imsi" label="IMSI" width="180" sortable>
			</el-table-column>
			<el-table-column prop="querycode" label="查询代码" width="120" sortable>
			</el-table-column>
			<el-table-column prop="packagename" label="套餐名称" min-width="200" sortable>
			</el-table-column>
			<el-table-column prop="cardstate" label="卡状态" min-width="100" sortable>
			</el-table-column>
			<el-table-column prop="activeDate" label="激活日期" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="addtime" label="入库日期" min-width="120" sortable>
			</el-table-column>
			<el-table-column prop="outSkuDate" label="出库日期" min-width="120" sortable>
			</el-table-column>			
			<el-table-column prop="servicername" label="服务商名称" min-width="180" sortable>
			</el-table-column>			
			<el-table-column prop="contactmobile" label="联系人" min-width="180" sortable>
			</el-table-column>	
			<el-table-column prop="currentmoney" label="用户余额" min-width="120" sortable>
			</el-table-column>	
			<el-table-column prop="totalgprs" label="总流量" min-width="150" sortable>
			</el-table-column>	
			<el-table-column prop="currentgprs" label="剩余流量" min-width="120" sortable>
			</el-table-column>	
			<el-table-column prop="usedsmsnum" label="短信使用条数" min-width="150" sortable>
			</el-table-column>				
			<el-table-column label="操作" width="80" fixed="right">
				<template scope="scope">
					<el-button size="small" @click="handleMore(scope.$index, scope.row)">详细</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条(分页)-->
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

		<!--批量编辑界面-->
		<el-dialog title="卡号批量编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label=" 卡 号 段：">
					<el-col :span="11">
					<el-form-item prop="cardnoBt">
						<el-input v-model="editForm.cardnoBt"  placeholder="请输入最小MSISDN" style="width: 100%;"></el-input>
					</el-form-item>
					</el-col>
					<el-col class="line" :span="2" style="text-align:center;">至</el-col>
					<el-col :span="11">
					<el-form-item prop="cardnoEt">
					  	<el-input v-model="editForm.cardnoEt"  placeholder="请输入最大MSISDN" style="width: 100%;" ></el-input>
					</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item label="套餐名称：">
					<el-col :span="1">
						<el-checkbox v-model="editForm.packagenameChecked" @change="changePackagenameChecked"></el-checkbox>
					</el-col>
					<el-col :span="23">
							<el-input v-model="editForm.packagename" :disabled="editForm.packagenameUse" placeholder="请输入套餐名称" style="width: 100%;" ></el-input>
							<!--
							<el-select v-model="editForm.packagename" placeholder="请选择" :disabled="editForm.packagenameUse" style="width: 100%;">
								<el-option
								  v-for="item in options_cardtype"
								  :label="item.packname"
								  :value="item.packname">
								</el-option>
							</el-select>
							-->			
					</el-col>
				</el-form-item>
				<el-form-item label="API代码：">
					<el-col :span="1">
						<el-checkbox v-model="editForm.apiChecked" @change="changeApiChecked"></el-checkbox>
					</el-col>
					<el-col :span="23">
							<el-select v-model="editForm.servicerapi" placeholder="请选择" :disabled="editForm.servicerapiUse" style="width: 100%;">
								<el-option
								  v-for="item in options_cardapicode"
								  :label="item.apiname"
								  :value="item.apicode">
								</el-option>
							</el-select>			
					</el-col>
				</el-form-item>
				<el-form-item label="服务商名：">
					<el-col :span="1">
						<el-checkbox v-model="editForm.servicemanChecked" @change="changeServicemanChecked"></el-checkbox>
					</el-col>
					<el-col :span="23">
							<el-select v-model="editForm.serviceman" placeholder="请选择" :disabled="editForm.servicemanUse" style="width: 100%;">
								<el-option
								  v-for="item in options_servicerman"
								  :label="item.servicerName"
								  :value="item.userid+''">
								</el-option>
							</el-select>			
					</el-col>
				</el-form-item>				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
			</div>
		</el-dialog>

		<!--卡号信息详情界面-->
		<cardinfo ref="cardinfo"></cardinfo>
		<batchactive ref="batchactive"></batchactive>	
		
	</section>
</template>

<script>
	import util from '../../../common/js/util'
	import constant from '../../../common/js/constant'
	//import NProgress from 'nprogress'
	import { getCardListPage, batchEditCard, getChildUsers, getPackList, getAppsynList } from '../../../api/api';
	import Cardinfo from '../../../components/course_info.vue';
	import BatchActive from '../../../components/batch_active.vue';

	export default {
		components: {
			cardinfo: Cardinfo,
			batchactive: BatchActive			
  		},
		data() {
			return {
			    sysUserName: '',
				pickerOptions0: {
					disabledDate(time) {
						return false;
					}
				},
				options_cardstate: constant.opt_cardstate,
				options_cardtype: constant.opt_cardtype,
				options_cardapicode:constant.opt_cardapicode,
				options_servicerman:constant.opt_servicerman,
				options_servicerLevel:[],
				filters: {
					//卡状态
					cardState:'',
					//卡套餐名称类型
					cardType: '',
					//激活开始日期
					activeBt:'',
					//激活截至日期
					activeEt:'',
					//入库开始时间
					inSkuBt: '',
					//入库截止时间
					inSkuEt: '',
					//出库开始时间
					outSkuBt: '',
					//出库截止时间
					outSkuEt: '',					
					//卡号段开始
					cardSegBt: '',
				    //卡号段截止				
					cardSegEt: '',
				    //服务商等级				
					servicerLevel: '',
				    //服务商名称			
					servicerName: '',					
					//模糊查询卡关键字
					likeCardKey: ''
				},
				cards: [],
				total: 0,//列表总条数
				pageSize:10,//每页条数
				currentPage:1,//当前页码
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//批量编辑界面是否显示
				editLoading: false,
				editFormRules: {
					cardnoBt: [
						{ required: true, message: '请输入最小MSISDN', trigger: 'blur' }
					],
					cardnoEt: [
						{ required: true, message: '请输入最大MSISDN', trigger: 'blur' }
					]					
				},
				//批量编辑界面数据
				editForm: {
					cardnoBt: '',
					cardnoEt: '',
					packagenameChecked:false,
					packagename:'',
					apiChecked:false,
					servicerapi:'',
					servicemanChecked:false,
					serviceman:'',
					packagenameUse:true,
					servicerapiUse:true,
					servicemanUse:true
				}
		
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			exportExcel(){
				this.filters.inSkuBt = (!this.filters.inSkuBt || this.filters.inSkuBt == '') ? '' : util.formatDate.format(new Date(this.filters.inSkuBt), 'yyyy-MM-dd');
				this.filters.inSkuEt = (!this.filters.inSkuEt || this.filters.inSkuEt == '') ? '' : util.formatDate.format(new Date(this.filters.inSkuEt), 'yyyy-MM-dd');
				this.filters.outSkuBt = (!this.filters.outSkuBt || this.filters.outSkuBt == '') ? '' : util.formatDate.format(new Date(this.filters.outSkuBt), 'yyyy-MM-dd');
				this.filters.outSkuEt = (!this.filters.outSkuEt || this.filters.outSkuEt == '') ? '' : util.formatDate.format(new Date(this.filters.outSkuEt), 'yyyy-MM-dd');
				this.filters.activeBt = (!this.filters.activeBt || this.filters.activeBt == '') ? '' : util.formatDate.format(new Date(this.filters.activeBt), 'yyyy-MM-dd');
				this.filters.activeEt = (!this.filters.activeEt || this.filters.activeEt == '') ? '' : util.formatDate.format(new Date(this.filters.activeEt), 'yyyy-MM-dd');

				let para = "";
				para += "cardState=" + ((!this.filters.cardState || this.filters.cardState == '') ? '' : this.filters.cardState);
				para += "&cardType=" + ((!this.filters.cardType || this.filters.cardType == '') ? '' :this.filters.cardType);
				para += "&inSkuBt=" + this.filters.inSkuBt;
				para += "&inSkuEt=" + this.filters.inSkuEt;
				para += "&outSkuBt=" + this.filters.outSkuBt;
				para += "&outSkuEt=" + this.filters.outSkuEt;
				para += "&activeBt=" + this.filters.activeBt;
				para += "&activeEt=" + this.filters.activeEt;				
				para += "&cardSegBt=" + ((!this.filters.cardSegBt || this.filters.cardSegBt == '') ? '' :this.filters.cardSegBt);
				para += "&cardSegEt=" + ((!this.filters.cardSegEt || this.filters.cardSegEt == '') ? '' :this.filters.cardSegEt);
				para += "&likeCardKey=" + ((!this.filters.likeCardKey || this.filters.likeCardKey == '') ? '' :this.filters.likeCardKey);
				para += "&servicerLevel=" + ((!this.filters.servicerLevel || this.filters.servicerLevel == '') ? '' :this.filters.servicerLevel);
				para += "&servicerName=" + ((!this.filters.servicerName || this.filters.servicerName == '') ? '' :this.filters.servicerName);
				//alert(para);
				location.href="/api/cards/exportXls?"+para;
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.getCards();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getCards();
			},
			//获取卡号列表
			getCards() {
				let para = {
					pageSize:this.pageSize,
					pageNum:this.currentPage			
				};
				para = Object.assign(para, this.filters);
				para.activeBt = (!para.activeBt || para.activeBt == '') ? '' : util.formatDate.format(new Date(para.activeBt), 'yyyy-MM-dd');
				para.activeEt = (!para.activeEt || para.activeEt == '') ? '' : util.formatDate.format(new Date(para.activeEt), 'yyyy-MM-dd');
				para.inSkuBt = (!para.inSkuBt || para.inSkuBt == '') ? '' : util.formatDate.format(new Date(para.inSkuBt), 'yyyy-MM-dd');
				para.inSkuEt = (!para.inSkuEt || para.inSkuEt == '') ? '' : util.formatDate.format(new Date(para.inSkuEt), 'yyyy-MM-dd');
				para.outSkuBt = (!para.outSkuBt || para.outSkuBt == '') ? '' : util.formatDate.format(new Date(para.outSkuBt), 'yyyy-MM-dd');
				para.outSkuEt = (!para.outSkuEt || para.outSkuEt == '') ? '' : util.formatDate.format(new Date(para.outSkuEt), 'yyyy-MM-dd');

				this.listLoading = true;
				//NProgress.start();
				getCardListPage(para).then((res) => {
					this.total = res.data.total;
					this.cards = res.data.list;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//显示卡号详细界面
			handleMore: function (index, row) {
				 this.$refs.cardinfo.showCardDetail(row.msisdn);
			},
			//显示批量激活界面
			showBatchActive: function (index, row) {
				 this.$refs.batchactive.showBatchActive();
			},
			//显示批量编辑界面
			handleEdit: function (index, row) {

				let para = {};
				getAppsynList(para).then((res) => {
					this.editLoading = false;
					this.options_cardapicode=res.data;
				});

				this.editFormVisible = true;				
			},

			changePackagenameChecked: function(event){
				if(event.target.checked){
					this.editForm.packagenameUse=false;
					this.editForm.packagename="";
				}else{
					this.editForm.packagenameUse=true;
					this.editForm.packagename="";
				}
			},
			changeApiChecked: function(event){
				if(event.target.checked){
					this.editForm.servicerapiUse=false;
					this.editForm.servicerapi="";
				}else{
					this.editForm.servicerapiUse=true;
					this.editForm.servicerapi="";
				}
			},
			changeServicemanChecked: function(event){
				if(event.target.checked){
					this.editForm.servicemanUse=false;
					this.editForm.serviceman="";
				}else{
					this.editForm.servicemanUse=true;
					this.editForm.serviceman="";
				}
			},

			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
					
						var diffNum = this.editForm.cardnoEt - this.editForm.cardnoBt;
						if(diffNum<0){
							this.$message({
							message: "选择的卡号段无效,请重新选择！",
							type: 'error'
							});
							return;
						}
						if(this.editForm.packagenameChecked===false && this.editForm.apiChecked===false && this.editForm.servicemanChecked===false){
							this.$message({
								message: '至少选择套餐名称/API代码/服务商名中的一项进行编辑！',
								type: 'error'
							});
							return;
						} 
						//TODO:判断如果复选框选中，但是没有选择值得情况
						if(this.editForm.packagenameChecked===true && this.editForm.packagename==''){
							this.$message({
								message: '请选择套餐名称进行编辑！',
								type: 'error'
							});
							return;
						}
						if(this.editForm.apiChecked===true && this.editForm.servicerapi==''){
							this.$message({
								message: '请选择API代码进行编辑！',
								type: 'error'
							});
							return;
						}
						if(this.editForm.servicemanChecked===true && this.editForm.serviceman==''){
							this.$message({
								message: '请选择服务商进行编辑！',
								type: 'error'
							});
							return;
						}

						
						this.$confirm('确认提交将强制更新号段内的数据吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							//para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							batchEditCard(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();

								let { msg, code } = res;
								if (code !== 0) {
									this.$message({
									message: msg,
									type: 'error'
									});
								} else {
									this.$message({
										message: '编辑成功',
										type: 'success'
									});
									this.$refs['editForm'].resetFields();
									this.editFormVisible = false;
									this.getCards();
								}									

							});
						});
						
					}
				});
			}
			
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				if(user.userlevel==0){
					this.sysUserName = '管理员';
					this.options_servicerLevel=[
						{"label":"管理员","value":"0"},
						{"label":"一级服务商","value":"1"},
						{"label":"二级服务商","value":"2"}
					];
				}else if(user.userlevel==1){
					this.sysUserName = '一级服务商';
					this.options_servicerLevel=[
						{"label":"一级服务商","value":"1"},
						{"label":"二级服务商","value":"2"}
					];
				}else if(user.userlevel==2){
					this.sysUserName = '二级服务商';
					this.options_servicerLevel=[
						{"label":"二级服务商","value":"2"}
					];
				}
			}

			let para = {};
			getPackList(para).then((res) => {
				this.editLoading = false;
				this.options_cardtype=res.data;
			});
			getChildUsers(para).then((res) => {
				this.editLoading = false;
				this.options_servicerman=res.data;
			});

			this.getCards();
		}
	}

</script>