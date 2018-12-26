<template>
<!--成绩管理 冯云威-->
    <section>
        <!--模糊查询-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
            <el-form-item>
                <el-input v-model="filters.studentId" placeholder="请输入学生编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="filters.studentName" placeholder="请输入学生姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-on:click="getScores">查询</el-button>
            </el-form-item>
            <el-form-item>
				<el-button type="primary"  @click="scoreInfoAdd" >录入成绩</el-button>
			</el-form-item>
            </el-form>
        
        </el-col>
        <!--成绩管理-->
        <el-table :data="tableData" border style="width: 100%" element-loading-text="拼命加载中" v-loading="listLoading">
            <el-table-column fixed type="index" width="100">
            </el-table-column>
            <el-table-column prop="studentId" label="学生编号" width="150">
            </el-table-column>
            <el-table-column prop="studentName" label="姓名" width="200">
            </el-table-column>
            <el-table-column prop="courseName" label="所属课程" width="200">
            </el-table-column>
            <el-table-column prop="scorePlay" label="课件点播分数" width="200">
            </el-table-column>
            <el-table-column prop="scoreOntime" label="在线时间分数" width="200">
            </el-table-column>
            <el-table-column prop="scoreTest" label="章节测试分数" width="200">
            </el-table-column>
            <el-table-column prop="scoreExam" label="课程结业考试分数" width="200">
            </el-table-column>
            <el-table-column prop="score" label="总成绩" width="200">
            </el-table-column>
            <el-table-column fixed="right" label="详情" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleMore(scope.$index, scope.row)" type="text">查看</el-button>
                    <el-button :plain="true" type="text" size="small" @click="scoreInfoEdit(scope.$index, scope.row) ">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    
        <!--分页组件 -->
        <el-col :span="24" class="toolbar">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <!--详情页面-->
		<el-dialog title="学生成绩详情页面" v-model="scoreDetailVisible" :close-on-click-modal="false">
			<el-form label-width="100px" :model="scoreDetail" ref="scoreDetail">
			<div style="overflow: auto; width: 100%;">
				<table class="border-table">  
						<tr>  
							<td class="spec alt">学生编号：</td> 
							<td>{{scoreDetail.studentId}}</td> 
							<td class="alt">学生姓名:</td> 
							<td>{{scoreDetail.studentName}}</td> 
							<td class="alt">课件点播分数:</td> 
							<td>{{scoreDetail.scorePlay}}</td> 
						</tr>
						<tr>  
							<td class="spec alt">在线时间分数：</td> 
							<td>{{scoreDetail.scoreOntime}}</td> 
							<td class="alt">章节测试分数：</td> 
							<td>{{scoreDetail.scoreTest}}</td> 
							<td class="alt">课程结业考试分数：</td> 
							<td>{{scoreDetail.scoreExam}}</td> 
						</tr>					
						<tr>  
							<td class="spec alt">总成绩：</td> 
							<td>{{scoreDetail.score}}</td> 
						</tr>	
					</table> 
			</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="scoreDetailVisible = false">取消</el-button>
			</div>
		</el-dialog>
        <!--成绩修改页面-->
        <el-dialog title="学生成绩修改" v-model="stuUpdateVisible" :close-on-click-modal="false">
            <el-form ref="stuUpdate" :rules="stuUpdate" :model="stuUpdate" label-width="100px">
            <el-form-item label="">
			<el-alert style="height:10%;opacity:0.8;color:#009966"
					:title="stuUpdate.stuScoreTip"
					type="info"
					:closable="false"
					show-icon>
				</el-alert>
			</el-form-item>
            <el-form-item label="课件点播分数">
                <el-input v-model="stuUpdate.scorePlay"></el-input>
            </el-form-item>
            <el-form-item label="在线时间分数">
                <el-input v-model="stuUpdate.scoreOntime"></el-input>
            </el-form-item>
            <el-form-item label="章节测试分数">
                <el-input v-model="stuUpdate.scoreTest"></el-input>
            </el-form-item>
            <el-form-item label="课程结业考试分数">
                <el-input v-model="stuUpdate.scoreExam"></el-input>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="stuUpdateVisible=false">取消</el-button>
                <el-button type="primary" @click.native="stuUpdateFromSubmit" :loading="editLoading">保存</el-button>
            </div>
        </el-dialog>
        <!--成绩录入页面-->
        <el-dialog title="学生成绩添加" v-model="stuAddVisible" :close-on-click-modal="false">
            <el-form ref="stuAdd" :model="stuAdd" label-width="80px">
            <el-form-item label="学生姓名">
                <el-input v-model="stuAdd.studentName"></el-input>
            </el-form-item>
            <el-form-item label="所属课程">
                <el-input v-model="stuAdd.courseName"></el-input>
            </el-form-item>
            <el-form-item label="课件点播分数">
                <el-input v-model="stuAdd.scorePlay"></el-input>
            </el-form-item>
            <el-form-item label="在线时间分数">
                <el-input v-model="stuAdd.scoreOntime"></el-input>
            </el-form-item>
            <el-form-item label="章节测试分数">
                <el-input v-model="stuAdd.scoreTest"></el-input>
            </el-form-item>
            <el-form-item label="课程结业考试分数">
                <el-input v-model="stuAdd.scoreExam"></el-input>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="stuAddVisible= false">取消</el-button>
                <el-button type="primary" @click.native="stuAddFromSubmit" :loading="editLoading">保存</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { getScore,getScoreInfo,updateScore,addScore} from '../../api/api';
export default {
    data() {
        return {
            studentId:'',
            tableData: [],
            total: 0,//列表总条数
            pageSize: 10,//每页条数
            currentPage: 1,//当前页码	
            listLoading: false,
            editLoading: false,
            filters: {
					//学生编号
					studentId: '',
					//学生姓名
					studentName: ''
				},
            scoreDetailVisible:false,
            scoreDetail:{
                studentId:'',
                studentName:'',
                scorePlay:'',
                scoreOntime:'',
                scoreTest:'',
                scoreExam:'',
                score:''
            },
            stuUpdateVisible:false,
            stuUpdate:{
                stuScoreTip:'',
                studentName:'',
                courseName:'',
                scorePlay:'',
                scoreOntime:'',
                scoreTest:'',
                scoreExam:''
            },
            stuAddVisible:false,
            stuAdd:{
                studentName:'',
                courseName:'',
                scorePlay:'',
                scoreOntime:'',
                scoreTest:'',
                scoreExam:''
            }

        }
    },
    methods: {
        handleClick() {
            console.log(1);
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getScores();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getScores();
        },
        //所有学生的成绩
        getScores() {
            let para = {
                studentId:this.filters.studentId,
                studentName:this.filters.studentName,
                pageSize: this.pageSize,
                pageNum: this.currentPage
            };
            this.listLoading = true;
            //NProgress.start();
            getScore(para).then((res) => {
                this.total = res.resData.total;
                this.tableData = res.resData.list;
                this.listLoading = false;
                //NProgress.done();
            });
        },
        //成绩详情页面
        handleMore: function (index, row) {
            console.log(row.scoreId);
            this.scoreId=row.scoreId;
            let para = {
                scoreId:this.scoreId
            };
            getScoreInfo(para).then((res) => {
                this.scoreDetail=res.resData;
            });
            this.scoreDetailVisible = true;			
        },
        //修改成绩信息
        scoreInfoEdit: function (index,row){
            console.log(row.studentName);
            console.log(row.courseName);
            this.stuUpdate.stuScoreTip = "姓名："+row.studentName+" ,  课程: " +row.courseName;
            console.log(this.stuUpdate.stuScoreTip);
            this.scoreId=row.scoreId;
            let para = {
                scoreId:this.scoreId
            };
            getScoreInfo(para).then((res) => {
                this.stuUpdate=res.resData;
            });
            this.stuUpdateVisible = true;
        },
        //添加成绩信息
        scoreInfoAdd: function (index,row){
            this.stuAddVisible = true;
        },
        //修改提交页面
        stuUpdateFromSubmit: function () {
				this.$refs.stuUpdate.validate((valid) => {
					if (valid) {					
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
                            let para ={};
                            para.scorePlay=this.stuUpdate.scorePlay;
                            para.scoreExam=this.stuUpdate.scoreExam;
                            para.scoreOntime=this.stuUpdate.scoreOntime;
                            para.scoreTest=this.stuUpdate.scoreTest;
                            para.modifyDate=new Date();
                            para.modifyPerson='冯云威';
                            para.scoreId=this.stuUpdate.scoreId;
							updateScore(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['stuUpdate'].resetFields();
								this.stuUpdateVisible = false;
								this. getScores();
							});
						});
					}
				});
			},  

   
    //增加提交页面
    stuAddFromSubmit: function () {
				this.$refs.stuAdd.validate((valid) => {
					if (valid) {					
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
                            let para ={};
                                para.scorePlay=this.stuAdd.scorePlay;
                                para.scoreExam=this.stuAdd.scoreExam;
                                para.scoreOntime=this.stuAdd.scoreOntime;
                                para.scoreTest=this.stuAdd.scoreTest;
                                para.studentName=this.stuAdd.studentName;
                                para.courseName=this.stuAdd.courseName;
                                para.scoreCredit=100;
                                para.scoreCreateDate=new Date();
                                para.modifyPerson='fengyunwei';
                                para.modifyDate=new Date();
                                para.scoreDelete=1
							addScore(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['stuAdd'].resetFields();
								this.stuAddVisible = false;
								this. getScores();
							});
						});
					}
				});
			},  

    },
    mounted() {
        this.getScores();
    }
   
}
</script>
<style scoped>
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