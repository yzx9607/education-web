<template>
		<!--批量激活界面-->
		<el-dialog title="批量激活" v-model="addFormVisible" :close-on-click-modal="false">
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
				
				<el-form-item label="" v-show="false">
					<el-col :span="24" style="text-align:right;">
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
</template>

<script>
	import util from '../common/js/util';
	import {  impExcelBatchActive } from '../api/api';
	export default {
		data() {
			return {
						pickerOptions0: {
							disabledDate(time) {
								return false;
							}
						},
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
						}
			}
		},
		methods: {
			//显示批量激活界面
			showBatchActive(val) {
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
				this.addFormVisible=true;
			},
			downImpExcel(){
				location.href="/批量激活模板.xlsx";
			},
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

							impExcelBatchActive(excelForm).then((res) => {
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
									this.$parent.getCards();
								}			
								
							});
						//});
					}
				});
				

			}		
		}
	}

</script>
<style scoped>

</style>