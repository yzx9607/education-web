<template>
	<section>
		<!--工具条(查询条件)-->
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
				<template v-if="sysUserName=='管理员'">
				<el-form-item>
					<el-button type="primary" @click="handleAdd">批量入库</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="showBatchDel">批量删除</el-button>
				</el-form-item>
				</template>
				<el-form-item>
					<el-button type="primary" @click="exportExcel">导出EXCEL</el-button>
				</el-form-item>				
			</el-form>
		</el-col>

		<!--列表(查询结果-当前页)-->
		<el-table :data="cards" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<!--
			<el-table-column type="selection" width="55">
			</el-table-column>
			-->
			<el-table-column prop="msisdn" label="日期" width="150" sortable>
			</el-table-column>
			<el-table-column prop="iccid" label="姓名" width="210" sortable>
			</el-table-column>
			<el-table-column prop="imsi" label="学费" width="180" sortable>
			</el-table-column>
			<el-table-column prop="querycode" label="缴费状态" width="120" sortable>
			</el-table-column>
				<el-table-column label="操作" width="200" fixed="right">
					<template scope="scope">
						<el-button size="small" @click="handleMore(scope.$index, scope.row)">详细</el-button>
						<el-button :plain="true" type="success" size="small" @click="handleOneOutSku(scope.$index, scope.row)">出库</el-button>					
						<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</el-table-column>
			</template>
			<template v-if="sysUserName=='一级服务商'">
				<el-table-column label="操作" width="140" fixed="right">
					<template scope="scope">
						<el-button size="small" @click="handleMore(scope.$index, scope.row)">详细</el-button>
						<el-button :plain="true" type="success" size="small" @click="handleOneOutSku(scope.$index, scope.row)">出库</el-button>					
					</template>
				</el-table-column>
			</template>

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

		<!--批量入库界面-->
		<el-dialog title="批量入库" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="0px" :rules="addFormRules" ref="addForm">
				<el-form-item label="">
					<input type="file" @change="onFileChange" v-show="false" ref="excelFileHook" accept=".xls,.xlsx">
					<el-button size="small" type="primary" icon="upload" @click.native="choiseFile">上传模板文件</el-button>
					<div class="el-upload__tip">
						<el-col :span="12">
					  		支持扩展名.xsl,.xslx,且不超过50M(<span style="color:red">*EXCEL中的MSISDN列单元格为空,视为空行</span>)
						</el-col>
						<el-col :span="12" style="text-align:right">
							{{addForm.choiceFilename}}
						</el-col>					
					</div>
				</el-form-item>
				<el-form-item label="" v-show="addForm.stepsIsShow">
					<el-steps  :active="addForm.stepNo" :center="true">
					  <el-step title="检测模板文件" icon="circle-check"></el-step>
					  <el-step title="检测数据一致性" icon="circle-check"></el-step>
					  <el-step title="正在导入" icon="circle-check"></el-step>
					  <el-step title="导入完成" icon="circle-check"></el-step>
					</el-steps>
				</el-form-item>
				<el-form-item label="" v-show="addForm.progressIsShow">
					<el-progress :text-inside="true" :stroke-width="12" :percentage="addForm.progressNo"></el-progress>
				</el-form-item>
				<el-form-item label=""  v-show="addForm.errtextIsShow">
					<el-input
					  type="textarea"
					  :rows="4"
					  :readonly="true"
					  resize="none"
					  placeholder=""
					  v-model="addForm.errtextarea">
					</el-input>
				</el-form-item>
				<el-form-item label="">
					<el-col :span="12">
						<el-checkbox v-model="addForm.imp_syn_checked">导入时同步API</el-checkbox>
					</el-col>
					<el-col class="line" :span="2" style="text-align:center;"></el-col>
					<el-col :span="12" style="text-align:right;">
						<el-form-item label="">入库日期：<el-date-picker type="date" placeholder="选择日期" v-model="addForm.inSkuTime" :picker-options="pickerOptions0"></el-date-picker></el-form-item>
					</el-col>
				</el-form-item>
			
			</el-form>
			<div slot="footer" class="dialog-footer" >
				<el-col :span="12" style="text-align:left;margin-bottom:15px;">
					<el-button icon="arrow-down" @click.native="downImpExcel">下载模板</el-button>
				</el-col>
				<el-col :span="12">
					<el-button @click.native="addFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="addSubmit" :loading="addLoading">导入</el-button>
				</el-col>						
			</div>
		</el-dialog>
		
		<!--批量删除界面-->
		<el-dialog title="批量删除" v-model="delFormVisible" :close-on-click-modal="false">
			<el-form :model="delForm" ref="delForm" :rules="delFormRules" :inline="true" >
				<el-form-item label="卡号段：" prop="cardFromNo">
					<el-input v-model="delForm.cardFromNo" placeholder="请输入MSISDN"></el-input>
				</el-form-item>
				<el-form-item label="至"  prop="cardToNo">
					<el-input v-model="delForm.cardToNo" placeholder="请输入MSISDN"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="delFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="batchRemove" :loading="delLoading">删除</el-button>
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
	import { getInCardListPage, removeCard, batchRemoveCard, impExcel, getPackList, getChildUsers, outCard } from '../../../api/api';
	import Cardinfo from '../../../components/course_info.vue';

	export default {
		components: {
			cardinfo: Cardinfo
  		},
		data() {
			return {
				sysUserName: '',
				pickerOptions0: {
					disabledDate(time) {
						return false;
					}
				},
				options_servicerman:constant.opt_servicerman,
				options_cardstate: constant.opt_cardstate,
				options_cardtype: constant.opt_cardtype,
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

				addFormVisible: false,//批量入库界面是否显示
				addLoading: false,
				addFormRules: {
					inSkuTime: [
						{ required: true, message: '请选择入库时间', trigger: 'blur' }
					]
				},
				//批量入库界面数据
				addForm: {
					fileList:[],
					stepsIsShow:true,
					stepNo:0,
					progressIsShow:false,
					progressNo:0,
					errtextIsShow:false,
					errtextarea:'',
					imp_syn_checked:true,
					inSkuTime: new Date(),
					cardXls:'',
					choiceFilename:''
				},

				delFormVisible: false,//批量删除界面是否显示
				delLoading: false,
				delFormRules: {
					cardFromNo: [
						{ required: true, message: '请输入MSISDN开始号段', trigger: 'blur' }
					],
					cardToNo: [
						{ required: true, message: '请输入MSISDN截至号段', trigger: 'blur' }
					]					
				},
				delForm: {
					cardFromNo: '',
					cardToNo: ''
				},
				oneOutSkuFormVisible: false,//单卡出库界面是否显示
				editLoading: false,
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
			//点击按钮触发选择EXCEL文件
			choiseFile(){
				this.$refs.excelFileHook.click();
			},
			//真正的选择EXCEL事件
			onFileChange(e) {
				var files = e.target.files || e.dataTransfer.files;
				if (!files.length)
					return;
				this.addForm.cardXls=files[0];
				this.addForm.choiceFilename="已选择文件【"+this.addForm.cardXls.name+"】";
			},
			beforeUploadValid(file) {
				this.addForm.stepsIsShow=true;
				this.addForm.stepNo=1;
				this.addForm.progressIsShow=true;
				this.addForm.progressNo=20;

				var fileType=file.name.substring(file.name.lastIndexOf("."),file.name.length)  
    			fileType=fileType.toLowerCase();
				//文件格式
				const isExcel = (fileType === '.xls') || (fileType === '.xlsx');
				//文件大小
				const isLt2M = file.size / 1024 / 1024 < 50;
				if (!isExcel) {
					this.addForm.errtextIsShow=true;
					this.addForm.errtextarea='上传文件扩展名只能是 xls/xlsx 格式!';
					return isExcel && isLt2M;
				}
				if (!isLt2M) {
					this.addForm.errtextIsShow=true;
					this.addForm.errtextarea='上传文件大小不能超过 50MB!';
					return isExcel && isLt2M;
				}
				this.addForm.stepNo=2;
				this.addForm.progressNo=40;
				return isExcel && isLt2M;
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
				
				location.href="/api/cards/exportInskuXls?"+para;
			},
			downImpExcel(){
				location.href="/导入模板.xlsx";
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
				getInCardListPage(para).then((res) => {
					this.total = res.data.total;
					this.cards = res.data.list;
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
					let para = { cardId: row.msisdn };
					removeCard(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getCards();
					});
				}).catch(() => {

				});
			},
			//显示卡号详细界面
			handleMore: function (index, row) {
				 this.$refs.cardinfo.showCardDetail(row.msisdn);
			},
			//显示批量入库界面
			handleAdd: function () {
				this.addForm = {
					fileList:[],
					stepsIsShow:true,
					stepNo:0,
					progressIsShow:false,
					progressNo:0,
					errtextIsShow:false,
					errtextarea:'',
					imp_syn_checked:true,
					inSkuTime: new Date(),
					cardXls:'',
					choiceFilename:''
				};
				this.addFormVisible = true;
			},
			//显示批量删除界面
			showBatchDel: function () {
				this.delFormVisible = true;
				this.delForm = {
					cardFromNo: '',
					cardToNo: ''
				};
			},
			//新增
			addSubmit: function () {

				if(''==this.addForm.cardXls){
					this.$message({
						message: '请选择要求的EXCEL模板数据文件！',
						type: 'error'
					});
					return;
				}
				this.addForm.stepsIsShow=true;
				this.addForm.progressIsShow=true;
				this.addForm.errtextIsShow=true;
				//先校验选择的文件格式和文件大小是否合格
				if(!this.beforeUploadValid(this.addForm.cardXls)){
					return;
				}
			    
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						//this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();

							var excelForm = new FormData();
							excelForm.append("imp_syn_checked",this.addForm.imp_syn_checked);
							let inSkuTime = (!this.addForm.inSkuTime || this.addForm.inSkuTime == '') ? '' : util.formatDate.format(new Date(this.addForm.inSkuTime), 'yyyy-MM-dd');
							excelForm.append("inSkuTime",inSkuTime); 
							excelForm.append("cardXls", this.addForm.cardXls);

							impExcel(excelForm).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								let { msg, code } = res;
								if (code !== 0) {
									this.addForm.stepNo=2;
									this.addForm.progressNo=50;
									this.addForm.errtextarea=msg;
								} else {
									this.$message({
										message: '入库成功',
										type: 'success'
									});
									this.$refs['addForm'].resetFields();
									this.addFormVisible = false;
									this.getCards();
								}			
								
							});
						//});
					}
				});
				

			},
			selsChange: function (sels) {
				this.sels = sels;
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
			//批量删除
			batchRemove: function () {
				this.$refs.delForm.validate((valid) => {
					if (valid) {
						var diffNum = this.delForm.cardToNo - this.delForm.cardFromNo;
						if(diffNum<0){
							this.$message({
							message: "选择的卡号段无效,请重新选择！",
							type: 'error'
							});
							return;
						}
						//var ids = this.sels.map(item => item.id).toString();
						this.$confirm('确认删除选中记录吗？', '提示', {
							type: 'warning'
						}).then(() => {
							this.listLoading = true;
							//NProgress.start();
							let para = { fromCardId: this.delForm.cardFromNo,toCardId: this.delForm.cardToNo };
							batchRemoveCard(para).then((res) => {
								this.listLoading = false;
								//NProgress.done();
              					let { msg, code } = res;
								if (code !== 0) {
									this.$message({
									message: msg,
									type: 'error'
									});
								} else {

									this.$message({
										message: '删除成功'+res.data+'张卡',
										type: 'success'
									});
									this.$refs['delForm'].resetFields();
									this.delFormVisible = false;
									this.getCards();
								}								
								
							});
						}).catch(() => {

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
				}else if(user.userlevel==1){
					this.sysUserName = '一级服务商';
				}else if(user.userlevel==2){
					this.sysUserName = '二级服务商';
				}
			}


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