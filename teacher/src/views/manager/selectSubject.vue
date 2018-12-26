    <template>
        <div>
		<!--三种类型的题库添加-->
        <el-button type="primary" icon="edit" style="margin-left:150px" @click="addSectionJudge()">添加章节测试题</el-button>
        <el-button type="primary" icon="edit" style="margin-left:300px" @click="addExam()">添加期末测试题</el-button>
		 <el-button type="primary" icon="edit" style="margin-left:300px" @click="addEntry()">添加入学测试题</el-button>
		 <br/>
		 <el-input v-model="searchMessage" placeholder="请输入内容" style="width:400px;margin-left:400px;margin-top:50px"></el-input>
		 <el-button type="primary" icon="search" @click="search()">搜索</el-button>
	<!--分页列表-->
	   <el-table
      :data="tableData4"
      style="width: 80% ; margin-top:50px; margin-left:100px;">
      <el-table-column
        prop="selectAddtimeStr"
        label="时间"
        >
      </el-table-column>     

        <el-table-column
        prop="selectName"
        label="题目名称">
      </el-table-column>

        <el-table-column
        prop="scoreTypeName"
        label="题库类型">
      </el-table-column>

      <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.row)"
          type="text"
          size="small">
          移除
        </el-button>
         <el-button
          @click.native.prevent="updateRow(scope.row)"
          type="text"
          size="small">
          修改
        </el-button>
      </template>
    </el-table-column>
    </el-table>





    <el-dialog title="章节选择题" v-model="judgeFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="judgeFormRules" ref="editForm">   
				<el-form-item label="题目名称"  prop="selectName">
					<el-input v-model="editForm.selectName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item  prop="selectA" label="判断一">
					<el-input v-model="editForm.selectA" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="selectB" label="判断二">
					<el-input v-model="editForm.selectB" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item  prop="selectC" label="判断三">
					<el-input v-model="editForm.selectC" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="selectD" label="判断四">
					<el-input v-model="editForm.selectD" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="selectAnswer" label="答案">
					<!--<el-input v-model="editForm.selectAnswer" type="text" auto-complete="off"></el-input>-->
					 <el-select v-model="editForm.selectAnswer" placeholder="请选择">
    					<el-option
								v-for="item in optionsAnswer"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						</el-option>
					 </el-select>
				</el-form-item>
                <el-form-item prop="selectPoint" label="分值">
					<el-input v-model="editForm.selectPoint" type="text" auto-complete="off"></el-input>
					</el-form-item>
			    <el-form-item prop="selectValues" label="章节测试类型">       
				  <div class="block">
					  
                            <el-cascader
                            :options="options"
                            v-model="editForm.selectValues"
                            @change="handleChange">
                        </el-cascader>
                  </div> 
				</el-form-item>   
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="judgeFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
			</div>
	</el-dialog>

	
	 <el-dialog title="期末测试选择题" v-model="judgeFormVisible2" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="judgeFormRules" ref="editForm">   
				<el-form-item label="题目名称"  prop="selectName">
					<el-input v-model="editForm.selectName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item  prop="selectA" label="判断一">
					<el-input v-model="editForm.selectA" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="selectB" label="判断二">
					<el-input v-model="editForm.selectB" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item  prop="selectC" label="判断三">
					<el-input v-model="editForm.selectC" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="selectD" label="判断四">
					<el-input v-model="editForm.selectD" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="selectAnswer" label="答案">
					<!--<el-input v-model="editForm.selectAnswer" type="text" auto-complete="off"></el-input>-->
					 <el-select v-model="editForm.selectAnswer" placeholder="请选择">
    					<el-option
								v-for="item in optionsAnswer"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						</el-option>
					 </el-select>
				</el-form-item>
                <el-form-item prop="selectPoint" label="分值">
					<el-input v-model="editForm.selectPoint" type="text" auto-complete="off"></el-input>
					</el-form-item>
			    <el-form-item prop="selectValues" label="期末测试类型">       
				    <el-select v-model="editForm.courseId" placeholder="请选择">
    					<el-option
								v-for="item in optionsCourse"
								:key="item.value"
								:label="item.courseName"
								:value="item.courseId">
								</el-option>
						</el-select>
				</el-form-item>   
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="judgeFormVisible2 = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit2" :loading="editLoading">保存</el-button>
			</div>
	</el-dialog>




	 <!--添加入学测试-->
	 <el-dialog title="入学测试选择题" v-model="judgeFormVisible3" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="judgeFormRules" ref="editForm">   
				<el-form-item label="题目名称"  prop="selectName">
					<el-input v-model="editForm.selectName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item  prop="selectA" label="判断一">
					<el-input v-model="editForm.selectA" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="selectB" label="判断二">
					<el-input v-model="editForm.selectB" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item  prop="selectC" label="判断三">
					<el-input v-model="editForm.selectC" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="selectD" label="判断四">
					<el-input v-model="editForm.selectD" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="selectAnswer" label="答案">
					<!--<el-input v-model="editForm.selectAnswer" type="text" auto-complete="off"></el-input>-->
					 <el-select v-model="editForm.selectAnswer" placeholder="请选择">
    					<el-option
								v-for="item in optionsAnswer"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						</el-option>
					 </el-select>
				</el-form-item>
                <el-form-item prop="selectPoint" label="分值">
					<el-input v-model="editForm.selectPoint" type="text" auto-complete="off"></el-input>
				</el-form-item>
			    <el-form-item prop="selectValues" label="入学测试类型">       
				    <el-select v-model="editForm.enterType" placeholder="请选择">
    					<el-option
								v-for="item in optionsEntry"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
						</el-select>
				</el-form-item>   
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="judgeFormVisible3 = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit3" :loading="editLoading">保存</el-button>
			</div>
	</el-dialog>
	<!--修改内容-->
	<el-dialog title="修改内容" v-model="judgeFormVisible4" :close-on-click-modal="false">
			<el-form :model="updateeditForm" label-width="100px" :rules="judgeFormRules" ref="editForm">   
				<el-form-item label="题目名称"  prop="judgeName">
					<el-input v-model="updateeditForm.selectName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item  prop="selectA" label="判断一">
					<el-input v-model="updateeditForm.selectA" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="selectB" label="判断二">
					<el-input v-model="updateeditForm.selectB" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item  prop="selectC" label="判断三">
					<el-input v-model="updateeditForm.selectC" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="selectD	" label="判断四">
					<el-input v-model="updateeditForm.selectD" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="selectAnswer" label="答案">
					<el-input v-model="updateeditForm.selectAnswer" type="text" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item prop="selectPoint" label="分值">
					<el-input v-model="updateeditForm.selectPoint" type="text" auto-complete="off"></el-input>
					</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="judgeFormVisible4 = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit4" :loading="editLoading">保存</el-button>
			</div>
	</el-dialog>







	<br/>
	<div style="margin-left:500px">
     <el-pagination
			@current-change="handleCurrentChange"
        layout="total, prev, pager, next"
        :pageSize="10"
        :total="total"
         >
     </el-pagination>
    </div>

        </div>      
    </template>
<script>

import { SelectCourseSection } from '../../api/api'
 import { SelectaddCourseSection } from '../../api/api'
 import { Selectexam } from '../../api/api'
 import { SelectEnterAdd } from '../../api/api'
 import { Selectupdate } from '../../api/api'
 import { Selectdelete } from '../../api/api'

export default {
	 data(){
        return {
		tableData4:[],//分页数据	
		 total:100,//列表总条数
		// pageSize:10,//每页条数
		currentPage:1,//当前页码
		 options: [], //章节选择数据
		 optionsCourse:[],//课程选择数据
		 optionsEntry:[{
          value: '1',
          label: '专升本'
        }, {
          value: '2',
          label: '高升专'
        },],//入学测试选择类型


		//答案
		optionsAnswer:[{
          value: 'A',
          label: 'A'
        }, {
          value: 'B',
          label: 'B'
        },
		{
          value: 'C',
          label: 'C'
        },
		 {
          value: 'D',
          label: 'D'
        }],


			searchMessage:'',//模糊查询
			judgeFormVisible4:false,//修改界面
			judgeFormVisible3:false,//入学测试
			judgeFormVisible2:false,//期末测试
            judgeFormVisible: false,//章节测试
				editLoading: false,
				judgeFormRules: {
        
					// enrollModel: [
					// 	{ required: true, message: '不能为空', trigger: 'blur' }
					// ],
					// enrollStudentNum: [
					// 	{ required: true,  message: '不能为空', trigger: 'blur' }
					// ],
					// enrollTuition: [
					// 	{ required: true, message: '不能为空', trigger: 'blur' }
					// ],
					// enrollArea: [
					// 	{ required: true, message: '不能为空', trigger: 'blur' }
					// ]
				},
        //增加界面界面
        editForm: {
            //题库名称
            selectName: '',
          //选项一
			selectA: '',
          //选项二
			selectB: '',
            //选项三
			selectC: '',
          //选项四
			selectD: '',
          //答案
			selectAnswer:'',
          //分数
			selectPoint: '',
            //题库选择
            selectValues:[],
			//章节选择	
			sectionId:'',
			//课程选择
			courseId:'',
			//题库类型
			enterType:'',
			//判断题id在更新时候用
			selectId:'',
				},

		 updateeditForm: {
            //题库名称
            selectName: '',
          //选项一
			selectA: '',
          //选项二
			selectB: '',
            //选项三
			selectC: '',
          //选项四
			selectD: '',
          //答案
			selectAnswer:'',
          //分数
			selectPoint: '',
            //题库选择
            selectValues:[],
			//章节选择	
			sectionId:'',
			//课程选择
			courseId:'',
			//题库类型
			enterType:'',
			//判断题id在更新时候用
			selectId:'',
				},			


        }
    },
     methods:{
		 //章节测试下拉框选中时候触发事件
		 handleChange(as) {
		 this.editForm.courseId=as[0];	 
         this.editForm.sectionId=as[1];
      },
	    //添加章节测试
        addSectionJudge(){
             this.judgeFormVisible=true;
        },
		//添加章节测试后的保存
		editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							SelectaddCourseSection(para).then((res) => {
								 this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								// this.$refs.editForm.resetFields();
              					//  this.editForm.selectValues='';
								  this.editForm.selectName='',
								  this.editForm.selectA='',
								  this.editForm.selectB='',
								   this.editForm.selectC='',
								  this.editForm.selectD='',
								  this.editForm.selectAnswer='',
								  this.editForm.selectPoint='',
								  this.editForm.selectValues=[],
								  this.editForm.sectionId='',
								  this.editForm.courseId='',
								  this.editForm.enterType='',
								  this.editForm.selectId='',
								this.judgeFormVisible = false;
								this.listAll();
							});
						});
					}
				});
			},
		//添加期末测试	
		addExam(){
			this.judgeFormVisible2=true;
		},
		//添加期末测试后的保存
		editSubmit2: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							Selectexam(para).then((res) => {
								 this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								// this.$refs.editForm.resetFields();
								  this.editForm.selectName='',
								  this.editForm.selectA='',
								  this.editForm.selectB='',
								   this.editForm.selectC='',
								  this.editForm.selectD='',
								  this.editForm.selectAnswer='',
								  this.editForm.selectPoint='',
								  this.editForm.selectValues=[],
								  this.editForm.sectionId='',
								  this.editForm.courseId='',
								  this.editForm.enterType='',
								  this.editForm.selectId='',
								this.judgeFormVisible2 = false;
								this.listAll();
							});
						});
					}
				});
			},
			//添加入学测试
		addEntry(){
			this.judgeFormVisible3=true
		},
		//添加入学测试后的保存
        editSubmit3: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							SelectEnterAdd
							(para).then((res) => {
								 this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
							//	this.$refs.editForm.resetFields();
								this.editForm.selectName='',
								 this.editForm.selectA='',
								  this.editForm.selectB='',
								   this.editForm.selectC='',
								  this.editForm.selectD='',
								this.editForm.selectAnswer='',
								this.editForm.selectPoint='',
								this.editForm.selectValues=[],
								this.editForm.sectionId='',
								this.editForm.courseId='',
								this.editForm.enterType='',
								this.editForm.selectId='',  
								this.judgeFormVisible3 = false;
								this.listAll();
							});
						});
					}
				});
			},

			//页面数据内容
		listAll(){
			let para={currentPage:this.currentPage,searchMessage:this.searchMessage};
          SelectCourseSection(para).then((res) => { 
            this.options=res.resData.listJudge;
			this.optionsCourse=res.resData.listCourse;
			this.tableData4=res.resData.page.list;
			this.total=res.resData.page.total;				
						});
     			},
		//分页组件跳转
         handleCurrentChange(val){
        	this.currentPage = val;
            this.listAll();
        },
		//模糊查询
		search(){
			this.currentPage = 1;
			 this.listAll();
			 this.searchMessage="";
		},
		//修改功能
		updateRow(row){
			// alert(row.selectName);
			this.judgeFormVisible4=true;             
         	this.updateeditForm=row;
       },
	   editSubmit4: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.updateeditForm);
							Selectupdate(para).then((res) => {
								 this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								// this.$refs.editForm.resetFields();
								  this.updateeditForm.selectName='',
								   this.editForm.selectA='',
								  this.editForm.selectB='',
								   this.editForm.selectC='',
								  this.editForm.selectD='',
								  this.updateeditForm.selectAnswer='',
								  this.updateeditForm.selectPoint='',
								   this.updateeditForm.selectValues=[],
								  this.updateeditForm.sectionId='',
								  this.updateeditForm.courseId='',
								  this.updateeditForm.enterType='',
								  this.updateeditForm.selectId='',
								  this.judgeFormVisible4 = false;
								this.listAll();
							});
						});
					}
				});
			},


		deleteRow(row) {
       	this.$confirm('确认提交吗？', '提示', {}).then(() => {
			// alert(row.selectId)   
          let para ={selectId:row.selectId};
          Selectdelete(para)
        	this.listAll();  
         });
      },


	},
	mounted(){ 
		this.listAll();
    }
}
</script>
