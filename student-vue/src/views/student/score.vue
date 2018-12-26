<template>
<section>
<el-table
    :data="tableData2"
    style="width: 100%"
>
    <el-table-column
      prop="courseId"
      label="编号"
      width="180">
      <template scope="scope">
      <span>{{ scope.$index+1 }}</span>
        </template>
    </el-table-column>
    <el-table-column
      prop="courseName"
      label="课程"
      width="180">
    </el-table-column>
    <el-table-column
      prop="scoreExam"
      label="成绩">
    </el-table-column>
     <el-table-column
      prop="examAddtime"
      label="考试时间">
    </el-table-column>
    <el-table-column
      prop="examDelete"
      label="状态">
    </el-table-column>
    <el-table-column
      label="操作">
<template scope="scope">
          <el-button v-if="scope.row.status!='published'" size="small" type="success" 
@click="handleMore(scope.$index, scope.row)">查看</el-button>
<el-button class="butt" size="small" @click.native="show(scope.$index,scope.row)">审查</el-button>
        </template>
    </el-table-column>
    <el-table-column>
    </el-table-column>
     <el-table-column>
    </el-table-column>
  </el-table>
  		<!--卡详情界面-->
		<el-dialog title="课程章节成绩信息" v-model="sectionScoresVisible" :close-on-click-modal="false">
			<el-form label-width="100px" ref="sectionScores">
			<div style="overflow: auto; width: 100%;">
				<table class="border-table"> 
              <td class="spec alt">课件点播分数</td> 
							<td>在线时间分数</td> 
							<td>在线测试分数</td> 
							<td>课程考试分数</td> 
						<tr>  
							<!--<td class="spec alt">第{{scoreDetail.sectionNum}}章：</td> -->
							<td>{{scoreDetail.scorePlay}}</td>
							<td>{{scoreDetail.scoreOntime}}</td> 
							<td>{{scoreDetail.scoreTest}}</td> 
							<td>{{scoreDetail.scoreExam}}</td> 
						</tr>
					</table> 
			</div>
			</el-form>
		</el-dialog>
     <el-dialog title="审查原因" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" ref="addForm">
               <el-input type="textarea" v-model="addForm.infor"></el-input>
			</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="handleCheck">提交</el-button>
			</div>
		</el-dialog>
</section>
</template>

<script>
import { getScores , getScoreDetail ,addCheck } from '../../api/api';
  export default {
   
    data() {
      return {
        tableData2: [],
        sectionScoresVisible:false,
				queryLoading:false,
				sectionScores: [],    
				addFormVisible: false,
				addLoading: false,
        addForm: {
					infor: '原因',
					section:''
				},
        ind:'',
        scoreDetail:{
          scorePlay:'',
          scoreOntime:'',
          scoreTest:'',
          scoreExam:''
        }
      }
    },
    methods:{
      handleMore: function (index, row) {
        let stu=JSON.parse(sessionStorage.getItem("stu"));
				this.showScoreDetail(row.courseId,stu.studentId);
			},
      show(index,row){
				this.addFormVisible=true;
        this.ind=index;
				this.addForm.section=row.courseId;
			},
      handleCheck(){
        let stu=JSON.parse(sessionStorage.getItem("stu"));
				let param={inf:this.addForm.infor,courseId:this.addForm.section,stuId:stu.studentId}
        addCheck(param).then((res)=>{
          let { resMsg, resCode } = res;
          if(resCode === 0){
              alert(resMsg);
              this.addFormVisible=false;
              let btn = document.getElementsByClassName("butt")[this.ind];
              btn.disabled = true;
          }
        })	
			}	,
      showScoreDetail(courId,stuId) {
       // alert(courId);
				//AJAX异步去数据库查询分数详细信息
				let param = {courseId:courId,stuId:stuId};
			getScoreDetail(param).then((res) => {
        //alert(param.courseId);
					this.queryLoading = false;
								let { resMsg, resCode } = res;
								if (resCode !== 0) {
									this.queryLoading = false;
									this.$message({
										message: resMsg,
										type: 'error'
									});
								} else {
										this.scoreDetail=res.resData;
								}
				});
				this.sectionScoresVisible=true;
			}	
    },
    	mounted() {
        let stu=JSON.parse(sessionStorage.getItem("stu"));
        let param={ stuId:stu.studentId };
        getScores(param).then((res)=>{
          this.tableData2=res.resData;
        })
     
      }
  }
</script>
<style scoped>
  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }
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