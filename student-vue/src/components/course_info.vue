<template>
		<!--章节课程详情界面-->
		<el-dialog style="width:60%;margin:0 auto;" title="章节课程" v-model="cardDetailVisible" :close-on-click-modal="false">
			<el-form  label-width="100px" :model="cardDetail" ref="cardDetail" >

			<div style=" width: 60%; margin:0 auto;">
				<table class="border-table" v-for="o in cardDetail" :key="o">  
					
						<tr>  
							
							<td>
							
								<el-button type="text" @click.native="courseInfo(row)">	{{o.partName}}</el-button>
									
							</td> 
						
							
						</tr>
					
					</table> 

						<!--工具条(分页)-->
						<div style="margin-top:10px;">
							<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							
							:current-page="currentPage"
							:page-sizes="[10, 20, 50, 100]"
							:page-size="pageSize"
							layout="prev, pager, next, jumper"
							:total="total"
							style="float:right;">
							</el-pagination>
						</div>
			</div>
			 
			 					
							
			</el-form>
			 

			<div slot="footer" class="dialog-footer">
				<el-button @click.native="cardDetailVisible = false">取消</el-button>
				
			</div>


		</el-dialog>
</template>

<script>
	import { getCourseDetail,synCardDetail } from '../api/api';
	export default {
		data() {
			return {
					row:'',
					cardDetailVisible:false,
					queryLoading:false,
					cardDetail: [],
					total: 0,//列表总条数
		    	pageSize:10,//每页条数
		    	currentPage:1,//当前页码
						
			}
		},
		methods: {
			
			//课程详细信息
        courseInfo(row) {
				
           this.$router.push({name: '课程详细信息',path:'/courseInfo',params:{id:row,courseId:this.row}}); //跳转到另一个vue页面
        },
				 //分页
        handleSizeChange(val) {
            this.pageSize = val;
            this.showCardDetail(val);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.showCardDetail(val);
        },
				showCardDetail(val) {
					//AJAX异步去数据库查询课程下所有讲点
					this.row = val;
					//this.cardDetail.partId=val;
					console.log(val);
					let para = {
						courseId:val,
						pageSize:this.pageSize,
						currentPage:this.currentPage,
				};
				getCourseDetail(para).then((res) => {
					this.queryLoading = false;

								let { resMsg, resCode } = res;
								if (resCode !== 0) {
									this.queryLoading = false;
									this.$message({
										message: resMsg,
										type: 'error'
									});
								} else {
									console.log(res.resData.list);
									this.cardDetail = res.resData.list;
								}

				});
				this.cardDetailVisible=true;
			}			
		}
	}

</script>
<style scoped>
 .el-row {
    margin-bottom: 0px;
   
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