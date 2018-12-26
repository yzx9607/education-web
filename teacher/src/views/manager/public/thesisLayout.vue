<template>
	<section>

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.major" placeholder="请输入专业"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getThesisLay">查询</el-button>
				</el-form-item>
                <el-form-item>
					<el-button type="primary" @click="showBatchActive">制定标准</el-button>
				</el-form-item>
			</el-form>
		</el-col>

        <el-table
    :data="tableData"
    v-loading="listLoading"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      label="编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="majorName"
      label="专业"
      width="180">
    </el-table-column>
    <el-table-column
      prop="layoutName"
      label="标准要求">
    </el-table-column>

      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template scope="scope">
        <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">查看标准</el-button>
        
      </template>
    </el-table-column>
  </el-table>

  <!--工具条(分页)-->
		<el-col :span="24" class="toolbar">
			<el-button type="primary" @click="forback">返回</el-button>
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

    <!--论文标准查看界面-->
		<el-dialog title="论文标准" v-model="editFormVisible" :close-on-click-modal="false" style="width:80%;margin:0 auto;height:80%;">
			<el-col :offset="6">
				<el-form :model="editForm" label-width="100px"  >
				
				<el-form-item label="论文标准下载">
					<el-button type="text" @click.native="downLoad()">单击这里下载该论文</el-button>
				</el-form-item>
			</el-form>
			</el-col>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">确定</el-button>
				
			</div>
		</el-dialog>

        <!--制定标准界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px"  ref="addForm">
				
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--上传-->
		<batchactive ref="batchactive"></batchactive>	 
	</section>
</template>

<script>

  import {getThesisLayList,submitScore} from '../../../api/api';
	import BatchActive from '../../../components/batch_active.vue';
	export default {
			components: {
			
				batchactive: BatchActive		//上传组件	
  		},
		data() {

			return {
				filters: {
					major: ''
				},
        tableData: [],
        total: 0,//列表总条数
        pageSize:10,//每页条数
        currentPage:1,//当前页码
        listLoading: false,
				thesisUrl:'',//论文地址
        editFormVisible: false,//论文管理界面是否显示
				editLoading: false,
      
				//论文管理界面数据
				editForm: {
					student:'',
					score: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},

        addFormVisible: false,//新增界面是否显示
				addLoading: false,
			
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}
			}
		},
		methods: {
			//返回前一页
			forback() {
				this.$router.push({name: '论文管理',path:'/jiao_21'});
			},
            
        //获取论文标准列表
        getThesisLay() {
          let para = {
            pageSize:this.pageSize,
            currentPage:this.currentPage,
						//major:this.filters.major  //论文题目			
          };

          this.listLoading = true;
          getThesisLayList(para).then((res) => {
            this.total = res.resData.total;
            this.tableData = res.resData.list;
            console.log(res.resData);
            this.listLoading = false;
            //NProgress.done();
          });
        },
        handleSizeChange(val) {
          this.pageSize = val;
          this.getThesisLay();
        },
        handleCurrentChange(val) {
          this.currentPage = val;
          this.getThesisLay();
        },
        //下载文件
        downLoad() {
                window.location.href=this.thesisUrl;
        },
				//显示上传界面
			showBatchActive: function (index, row) {
				
				
				 this.$refs.batchactive.showBatchActive();
			},
        //显示论文管理界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
		
				this.thesisUrl = row.layoutContent
			},

            //制定论文标准
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
        //论文管理
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							
							submitScore(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getThesisLay();
							});
						});
					}
				});
			},
            //新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
		},
		mounted() {
			this.getThesisLay();
		}
	}

</script>

<style scoped>

</style>