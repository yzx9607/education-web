<template>
<section>
		<!--卡详情界面-->
		<el-dialog title="课程章节成绩信息" v-model="sectionScoresVisible" :close-on-click-modal="false">
			<el-form label-width="100px" ref="sectionScores">
			<div style="overflow: auto; width: 100%;">
				<table class="border-table"> 
              <td class="spec alt">章节序号：</td> 
							<td>章节名</td> 
							<td>分数</td> 
							<td>考试时间</td> 
							<td>状态</td> 
							<td>操作</td> 
						<tr  v-for="item in sectionScores">  
							<td class="spec alt">第{{item.sectionNum}}章：</td> 
							<td>{{item.sectionName}}</td> 
							<td>{{item.score}}</td> 
							<td>{{item.time}}</td> 
							<td>{{item.status}}</td> 
              <td>
                 <el-button @click.native="show()">审查</el-button>
              </td>
						</tr>
					</table> 
			</div>
			</el-form>
		</el-dialog>
    <el-dialog title="审查说明" v-model="addFormVisible" :close-on-click-modal="false">
			
			<el-form :model="addForm" label-width="100px" ref="addForm">
               <el-input type="textarea" v-model="addForm.infor"></el-input>
			</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click.native="addCheck">提交</el-button>
			</div>
		</el-dialog>
</section>
</template>

<script>
	import { getScoreDetail, addCheck } from '../api/api';
	export default {
		data() {
			return {
				sectionScoresVisible:false,
				queryLoading:false,
				sectionScores: [],    
				addFormVisible: false,//章节分数界面是否显示
				addLoading: false,
          addForm: {
					infor: '说明',
					section:''
				}
			}
		},
		methods: {
			show(index){
				this.addFormVisible=true;
				this.addForm.section=index;
			},
			addCheck({}){
				let param={inf:this.addForm.infor}
				alert(this.addForm.section);
			}	,
			showScoreDetail(courId,userId,scoreExam) {
				//AJAX异步去数据库查询分数详细信息
				let para = {courId:courId,userId:userId};
				getScoreDetail(para).then((res) => {
					this.queryLoading = false;
								let { resMsg, resCode } = res;
								if (resCode !== 0) {
									this.queryLoading = false;
									this.$message({
										message: resMsg,
										type: 'error'
									});
								} else {
										this.sectionScores=res.data;
								}
				});
				this.sectionScoresVisible=true;
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