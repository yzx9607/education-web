<template>
	<section>

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.studentName" placeholder="请输入论题"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getThesis">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="layout">论文标准</el-button>
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
      prop="studentId"
      label="学号">
    </el-table-column>
    <el-table-column
      prop="studentName"
      label="学生姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="thesisTitle"
      label="论题">
    </el-table-column>
    
  	<el-table-column
      prop="thesisDateStr"
      label="提交时间">
    </el-table-column>

		<el-table-column
      prop="thesisStateStr"
      label="审核状态">
    </el-table-column>

      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template scope="scope">
        <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">评分</el-button>
        
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

    <!--评分界面-->
		<el-dialog title="论文详情" v-model="editFormVisible" :close-on-click-modal="false" style="width:80%;margin:0 auto;height:80%;">
			<el-col :offset="6">
				<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item  >
					<el-alert style="width:50%;height:10%;opacity:0.8;"
							:title='editForm.student'
							type="info"
							:closable="false"
							show-icon>
						</el-alert>
				</el-form-item>
			
        <el-form-item label="论文成绩" prop="score" >
					<el-input v-model="editForm.score"  placeholder="请输入分数" auto-complete="off" style="width:50%;"></el-input>
				</el-form-item>

				<el-form-item label="论文下载">
					<el-button type="text" @click.native="downLoad()">单击这里下载该论文</el-button>
				</el-form-item>
			</el-form>
			</el-col>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>

  import {getThesisList,submitScore} from '../../../api/api';
	export default {
		data() {

			var validScore = (rule, value, callback) => {
				var reg = /^(\d{1,2}(\.\d{1,3})?|100)$/; 
				if (!reg.test(value)) {
				  callback(new Error('请输入正确的成绩'));
				} else {
				  callback();
				} 
		    };

			return {
				filters: {
					studentName: ''
				},
        tableData: [],
        total: 0,//列表总条数
        pageSize:10,//每页条数
        currentPage:1,//当前页码
        listLoading: false,
				thesisId:'',//论文编号
				thesisUrl:'',//论文地址
        editFormVisible: false,//论文管理界面是否显示
				editLoading: false,
       editFormRules: {
					score: [
						{ required: true, message: '请输入成绩', trigger: 'blur' },
						{validator: validScore}
					]
				},
				//论文管理界面数据
				editForm: {
					student:'',
					score: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},
			}
		},
		methods: {
            
        //获取论文列表
        getThesis() {
          let para = {
            pageSize:this.pageSize,
            currentPage:this.currentPage,
						//studentName:this.filters.studentName  //论文题目			
          };
					console.log(this.pageSize);
					console.log(this.currentPage);
          this.listLoading = true;
          getThesisList(para).then((res) => {
            this.total = res.resData.total;
						
            this.tableData = res.resData.list;
            console.log(res.resData);
            this.listLoading = false;
            //NProgress.done();
          });
        },
        handleSizeChange(val) {
          this.pageSize = val;
          this.getThesis();
        },
        handleCurrentChange(val) {
          this.currentPage = val;
          this.getThesis();
        },
				//下载文件
				downLoad() {
					 window.location.href=this.thesisUrl;
				},

        //显示论文管理界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
        this.editForm.student = "学号:"+row.studentId+" 姓名:"+row.studentName
				this.editForm.score = row.thesisScore
				this.thesisUrl = row.thesisUrl
				this.thesisId = row.thesisId
			},
			//跳转到论文标准
			layout: function (index, row) {
				this.$router.push({name: '论文标准',path:'/layout'});
			},
      //论文管理
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							console.log("论文编号:"+this.thesisId);
							console.log("论文成绩:"+this.editForm.score);
							let para = {
								thesisId:this.thesisId,
								thesisScore:this.editForm.score
							};
							
							submitScore(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getThesis();
								
							});
						});
					}
				});
			},
		},
		mounted() {
			this.getThesis();
		}
	}

</script>

<style scoped>

</style>