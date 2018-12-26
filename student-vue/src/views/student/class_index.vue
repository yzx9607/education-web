<template>
  <section >
    <div class="middles">
			<!--第一行-->
      <el-row>
        <el-col  :span="4" v-for="(coursedatas, index) in coursedatas" :key="coursedatas" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }" >
          <img  class="image" src="/static/img/study.png">
            <div style="padding: 14px;">
									<el-row>
										
										<el-col :span="6" :offset="5">
											<div class="bottom clearfix">
												<template v-if="coursedatas.course === '学习课程'">
													
													<el-button type="text" class="button" @click.native="stu_course(row)">{{ coursedatas.course}}</el-button>
												</template>
												<template v-if="coursedatas.course === '课程论坛'">
													
													<el-button type="text" class="button" @click.native="stu_chat(row)">{{ coursedatas.course}}</el-button>
												</template>
												<template v-if="coursedatas.course === '资源下载'">
														<el-button type="text" class="button" @click.native="studyResource(row)">{{ coursedatas.course}}</el-button>
												</template>
												
											</div>
										</el-col>
									
									</el-row>
            </div>
            </el-card>
        </el-col>
				
      </el-row>
			<!--第二行-->
      <el-row>
        <el-col :span="4" v-for="(teacherInfo, index) in teacherInfos" :key="teacherInfo" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
          <img  class="image" src="/static/img/study.png">
            <div style="padding: 14px;">

									<el-row>
										<div class="bottom clearfix">
											<el-col :span="6" :offset="5">
												<template v-if="teacherInfo === '教师信息'">
													
													<el-button type="text" class="button" @click.native="teach_info(row)">{{ teacherInfo}}</el-button>
												</template>
												<template v-if="teacherInfo === '章节测验'">
													
													<el-button type="text" class="button" @click.native="section_test(row)">{{ teacherInfo}}</el-button>
												</template>
												<template v-if="teacherInfo === '教学公告'">
													
													<el-button type="text" class="button" @click.native="notice(row)">{{ teacherInfo}}</el-button>
												</template>
													
												
											</el-col>
										</div>
									</el-row>  
            </div>
            </el-card>
        </el-col>
      
      </el-row>
			<!--第三行-->
      <el-row>
        <el-col :span="4" v-for="(course_eva, index) in course_evas" :key="course_eva" :offset="6">
            <el-card :body-style="{ padding: '0px' }">
          		<img  class="image" src="/static/img/study.png">
							<div style="padding: 14px;">

								<el-row>
											
									<el-col :span="6" :offset="5">
											<div class="bottom clearfix">
						
												<el-button type="text" class="button" @click="handleAdd">{{course_eva}}</el-button>
											</div>
									</el-col>
								
								</el-row>
							</div>
            </el-card>
        </el-col>
      </el-row>

    </div>

    <!--课程评价界面-->
		<el-dialog title="课程评价" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" :rules="addFormRules" ref="addForm">
				<el-form-item label="请输入课程名称" prop="courseId">
					<el-input v-model="addForm.courseId" auto-complete="off"></el-input>
				</el-form-item>
				
				<el-form-item label="个人评价" prop="contents">
					<el-input type="textarea" v-model="addForm.contents" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

		<el-button  :plain="true" type="info" @click="forback"><i class="el-icon-arrow-left"></i>返回</el-button>
  </section>
</template>
<style >
  .middles{
    margin-left: 300px;
  }

  .bottom {
    
    line-height: 12px;
  }

  .button {
    padding: 0;
    font-size: 20px;
    margin: 0 30%;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>

<script>
import { getUserListPage, removeUser, batchRemoveUser, editUser, addEvaluate } from '../../api/api';

export default {
  data() {
    return {
     
			courseId:'',
      coursedatas:[{course:'学习课程'},{course:'课程论坛'},{course:'资源下载'}],
      teacherInfos:['教师信息','章节测验','教学公告'],
      course_evas:['课程评价'],

      addFormVisible: false,//课程评价界面是否显示
				addLoading: false,
				addFormRules: {
					courseId: [
						{ required: true, message: '请输入课程名称', trigger: 'blur' }
					],
					contents:[
						{required: true, message: '请输入评价内容', trigger: 'blur'}
					]
				},
				//课程评价界面数据
				addForm: {
					contents:'',
					courseId: ''
				}

    };
  },
  methods:{
			//返回前一页
			forback() {
				this.$router.push({name: '学生主页',path:'/stu_index',query:{courseId:this.$route.query.courseId}});
			},
    //获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
					
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},

      //显示课程评价界面
			handleAdd: function () {
				console.log(this.$route.query.courseId)
				this.addFormVisible = true;
				this.addForm = {
					contents:'',
					courseId: ''
					
				};
			},
     	//课程评价
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							//let para = Object.assign({}, this.addForm);
							//para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							let para = {
								courseId:this.$route.query.courseId,
								contents:this.addForm.contents
							}
              
							addEvaluate(para).then((res) => {
								
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

     //学习课程
			stu_course(row) {
				console.log(this.$route.query.courseId)
					this.$router.push({ name: '学习课程',path:'/stu_course',query:{courseId:this.$route.query.courseId}}); //跳转到另一个vue页面
			},
			//教师信息
			teach_info(row) {
				console.log(this.$route.query.courseId)
					this.$router.push({ name: '教师信息',path:'/teach_info',query:{courseId:this.$route.query.courseId}}); //跳转到另一个vue页面
			},
			//章节测试
			section_test(row) {
				console.log(this.$route.query.courseId)
					this.$router.push({ name: '章节测试',path:'/sectionTest',query:{courseId:this.$route.query.courseId}}); //跳转到另一个vue页面
			},
			//教学公告
			notice(row) {
			
					this.$router.push({ name: '教学公告',path:'/notice',query:{courseId:this.$route.query.courseId}}); //跳转到另一个vue页面
			},
			//资源下载
			studyResource(row) {

				this.$router.push({ name: '资源下载',path:'/studyResource',query:{courseId:this.$route.query.courseId}}); //跳转到另一个vue页面
			},
			//课程论坛
			stu_chat(row) {
				this.$alert('该功能暂未开放', '课程论坛', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
				});
			}

  }
}
</script>