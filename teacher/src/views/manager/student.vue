<!--查询的布局样式-->
<style>
.row-bg {
  padding: 20px 50px;
  background-color: #f9fafc;
}
</style>

<template>
  <section>
    <!--查询工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="forminfos">
				<el-form-item>
					<el-input v-model="forminfos.studentName" placeholder="姓名"></el-input>
				</el-form-item>
         <el-form-item>
          <el-input v-model="forminfos.studentId" placeholder="学号"></el-input>
        </el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers" @click="handleNameChange">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">添加</el-button>
				</el-form-item>		
			</el-form>
		</el-col>


    <!--新增界面-->
    <el-dialog title="新增学生信息" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
        <el-form-item label="姓名：" prop="studentName">
          <el-input v-model="addForm.studentName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio class="radio" v-model="radio" label="1">男</el-radio>
          <el-radio class="radio" v-model="radio" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="民族：" prop="studentNation">
          <el-input v-model="addForm.studentNation" type="text" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出生日期：" prop="stuBirthStr">
          <!--<el-input v-model="addForm.student_birth" auto-complete="text"></el-input>-->
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="身份证：" prop="studentIdcard">
          <el-input v-model="addForm.studentIdcard" type="text" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="学历：" prop="stuEducation">
          <el-input v-model="addForm.stuEducation" type="text" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="毕业院校：" prop="studentGraduate">
          <el-input v-model="addForm.studentGraduate" type="text" auto-complete="off"></el-input>
        </el-form-item>
        <!--所选类型-->
        <el-form-item label="所选类型：" prop="studentType">
          <el-select v-model="value" placeholder="请选择升学类型">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <!--所选专业：-->
        <el-form-item label="所选专业：" prop="majorName">
          <el-select v-model="value2" placeholder="请选择专业">
            <el-option v-for="item in options2" :key="item.value2" :label="item.label2" :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号：" prop="studentPhone">
          <el-input v-model="addForm.studentPhone" type="text" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址：" prop="stuAddress">
          <el-input v-model="addForm.stuAddress" type="text" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="第一次缴费:" prop="firstMoney">
          <el-input v-model="addForm.firstMoney" type="text" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="第二次缴费：" prop="secondMoney">
          <el-input v-model="addForm.secondMoney" type="text" auto-complete="off"></el-input>
        </el-form-item>
        </el-form-item>
        <el-form-item label="学号：" prop="studentId">
          <el-input v-model="addForm.studentId" type="text" auto-complete="off"></el-input>
        </el-form-item>
        </el-form-item>
        <el-form-item label="入学日期：" prop="studentDatestr">
          <!--<el-input v-model="addForm.student_date" type="text" auto-complete="off"></el-input>-->
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit" :loading="addLoading">保存</el-button>
      </div>
    </el-dialog>
    <!--学生管理表-->
    <el-table :data="tableData"  border  highlight-current-row  v-loading="listLoading" @selection-change="selsChange"  style="width: 100%" >
      <!--学号-->
      <el-table-column  label="学号" width="120">
        <template scope="scope">
            <div slot="reference">
              <el-tag>{{ scope.row.studentId }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <!--姓名-->
      <el-table-column label="姓名" width="120">
        <template scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.studentName }}</el-tag>
          </div>
          </el-popover>
        </template>
      </el-table-column>
      <!--性别-->
      <el-table-column label="性别" width="120">
        <template scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.studentSex }}</el-tag>
          </div>
          </el-popover>
        </template>
      </el-table-column>
      <!--身份证-->
      <el-table-column label="身份证" width="190">
        <template scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.studentIdcard }}</el-tag>
          </div>
          </el-popover>
        </template>
      </el-table-column>
      <!--所选类型-->
      <el-table-column label="所选类型" width="190">
        <template scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.studentType }}</el-tag>
          </div>
          </el-popover>
        </template>
      </el-table-column>
      <!--所在专业-->
      <el-table-column label="所选专业" width="180">
        <template scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.majorName }}</el-tag>
          </div>
          </el-popover>
        </template>
      </el-table-column>
      <!--学历-->
      <el-table-column label="学历" width="120">
        <template scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.stuEducation }}</el-tag>
          </div>
          </el-popover>
        </template>
      </el-table-column>
      <!--学历-->
      <el-table-column label="手机号" width="180">
        <template scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.studentPhone }}</el-tag>
          </div>
          </el-popover>
        </template>
      </el-table-column> 
      <!--入学日期-->
      <el-table-column label="入学日期" width="190">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.studentDateStr}}</span>
        </template>
      </el-table-column>
      <!--操作-->
      <el-table-column label="操作"  width="200" >
        <template scope="scope">
        <el-button size="small" @click="handleMore(scope.$index, scope.row)">详细</el-button>      
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        	<el-button type="danger" size="small"   @click="handleDel(scope.$index, scope.row.studentId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    	<!--编辑界面-->
		<el-dialog title="编辑学生信息" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="addFormRules" ref="editForm">
					<el-input v-model="editForm.studentId" type="hidden"  auto-complete="off"></el-input>
				<el-form-item label="姓名：" prop="studentName" >
					<el-input v-model="editForm.studentName" type="text"  auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别：" prop="studentSex" >
					<el-input v-model="editForm.studentSex" type="text"  auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="身份证：" prop="studentIdcard">
					<el-input v-model="editForm.studentIdcard" type="text"  auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="手机号:" prop="studentPhone">
					<el-input v-model="editForm.studentPhone" type="text"  auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="addLoading">保存</el-button>
			</div>
		</el-dialog>
    		<!--分页工具条-->
		<el-col :span="24" class="toolbar">
			<!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="pageNum"  
			:page-size="10"
			:total="total"
			style="float:right;">
			</el-pagination>
		</el-col>	


    	<!--学生信息详情界面-->
		<!--<cardinfo ref="cardinfo"></cardinfo>-->
    <studentdetails  ref="studentdetails" ></studentdetails>
    
  </section>
</template>

<script>
import util from '../../common/js/util'
import constant from '../../common/js/constant'
import { getStudentListPage, deleteStudent,queryStuById, updateStudent, getStudentDetail,addStudent } from '../../api/api';
import Cardinfo from '../../components/card_info.vue';
import Studentdetails from '../../components/student_details.vue';
//import { queryStudent } from '../../api/api';
//import { getStudentListPage} from '../../api/api';
export default {
	components: {
			studentdetails: Studentdetails
  		},

  data() {
    //自定义手机
    var studentPhone = (rule, value, callback) => {
      var reg = /^1[0-9]{10}$/;
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号码'));
      } else {
        callback();
      }
    };

    //身份证号
    var studentIdcard = (rule, value, callback) => {
      var reg = /^4\d{17}$/
      if (!reg.test(value)) {
        callback(new Error('请输入合法的身份证'));
      } else {
        callback();
      }
    };
    //姓名验证
    var studentName = (rule, value, callback) => {
      var reg = /^([\u4e00-\u9fa5]){2,7}$/
      if (!reg.test(value)) {
        callback(new Error('请输入正确的姓名'));
      } else {
        callback();
      }
    };
    //姓名验证
    var studentNation = (rule, value, callback) => {
      var reg = /^([\u4e00-\u9fa5]){1,20}$/
      if (!reg.test(value)) {
        callback(new Error('请输入民族'));
      } else {
        callback();
      }
    };
    //毕业院校
    var studentGraduate = (rule, value, callback) => {
      var reg = /^([\u4e00-\u9fa5]){4,20}$/
      if (!reg.test(value)) {
        callback(new Error('请输入毕业院校的全称'));
      } else {
        callback();
      }
    }

    return {
      tableData: [],//分页数据
      input: '',
      radio: '1',
      value1: '',
      //日期控件
      pickerOptions0: {
        disabledDate(time) {
          return false;
        }
      },
      value1: '',

      //所选类型
      options: [{
        value: '选项1',
        label: '高升本'
      }, {
        value1: '选项2',
        label: '专升本'
      }],
      value: '',

      //所选专业
      options2: [{
        value2: '选项1',
        label2: '计算机管理'
      }, {
        value2: '选项2',
        label2: '旅游管理'
      }],
      value2: '',

      options_servicerLevel: constant.opt_servicerLevel,
     
      forminfos: {
         studentName: '',
         studentId: ''
      },
     
      total:100,//列表总条数
		  pageSize:10,//每页条数
			pageNum:1,//当前页码
			listLoading: false,
			sels: [],//列表选中列

      editFormVisible: false,//编辑界面是否显示
      editLoading: false,
      editFormRules: {
        studentName: [
          { required: true, message: '请输入服务商名称', trigger: 'blur' }
        ],
        studentSex: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        studentIdcard: [
          { required: true, min: 6, message: '请输入平台账户(必须为6个字符或以上)', trigger: 'blur' }
        ],
         studentPhone: [
          { required: true, validator: studentPhone, trigger: 'blur' }
        ],
      },
      
      //编辑界面数据
      editForm: {
        studentId:'', //学号
        studentName: '', //姓名
        studentSex: '', //性别
        studentIdcard: '', //身份证 
        studentPhone:'',//手机号
      },

      addFormVisible: false,//新增界面是否显示
      addLoading: false,
      addFormRules: {
        studentName: [
          { required: true, validator: studentName, trigger: 'blur' }
        ],
        studentSex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        studentNation: [
          { required: true, validator: studentNation, trigger: 'blur' }
        ],
        studentIdcard: [
          { required: true, validator: studentIdcard, trigger: 'blur' }
        ],
        stuEducation: [
          { required: true, message: '请填写学历', trigger: 'blur' }
        ],
        studentGraduate: [
          { required: true, validator: studentGraduate, trigger: 'blur' }
        ],

        studentPhone: [
          { required: true, validator: studentPhone, trigger: 'blur' }
        ],
        firstMoney: [
          { required: true, min: 4, message: '第一学期学费', trigger: 'blur' }
        ],
  
        stuAddress: [
          { required: true, min: 6, message: '请输入家庭住址与户口本保持一致', trigger: 'blur' }
        ]
      },
      //新增界面数据
      addForm: {
        studentName: '',         //学生姓名
        studentSex: '',          //学生性别
        studentNation: '',       //民族
        stuBirthStr: '',         //出生日期
        studentIdcard: '',       //身份证
        stuEducation: '',        //学历
        studentGraduate: '',     //毕业院校
        studentType: '',         //毕所选类型
        majorName: '',           //专业
        studentPhone: '',        //电话
        stuAddress: '',          //家庭住址
        firstMoney: '',          //第一次交学费
        secondMoney: '',         //第二次交学费
        studentId: '',           //学号
        studentDateStr: '',      //入学日期
      },
    }
  },
  	
  // 加载页面 自动调用里面的方法
  mounted() {
    this.getUsers();
  },
  methods: {
    //分页
     handleSizeChange(val) {
				this.pageSize = val;
				this.getUsers();
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.getUsers();
			},
        handleNameChange(val) {
        this.forminfos.studentName
			  this.forminfos.studentId
				this.getUsers();
			},
    
    	//获取用户列表
			getUsers() {
				let para = {
					pageSize:this.pageSize,
					pageNum:this.pageNum,
          studentName:this.forminfos.studentName,
          studentId:this.forminfos.studentId
				};
				this.listLoading = true;
				getStudentListPage(para).then((res) => {
					this.total = res.resData.total;
					this.tableData = res.resData.list;
					this.listLoading = false;
				})
			},


     
    //下拉框
    handleCommand(command) {
      this.$message('click on item ' + command);
    },

    //删除学生信息
			handleDel(index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = {studentId: row};
					deleteStudent(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {
				});
			},
    //编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							let para = Object.assign({}, this.editForm);
							updateStudent(para).then((res) => {
								this.editLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
    //显示新增界面
    handleAdd: function () {
      this.addFormVisible = true;
      this.addForm = {
        studentName: '',         //学生姓名
        studentSex: '',          //学生性别
        studentNation: '',       //民族
        stuBirthStr: '',         //出生日期
        studentIdcard: '',       //身份证
        stuEducate: '',          //学历
        studentGraduate: '',     //毕业院校
        studentType: '',         //毕所选类型
        majorName: '',           //专业
        studentPhone: '',        //电话
        stuAddress: '',          //家庭住址
        firstMoney: '',          //第一次交学费
        secondMoney: '',         //第二次交学费
        studentId: '',           //学号
        studentDateStr: '',      //入学日期
      };
    },

    	selsChange: function (sels) {
				this.sels = sels;
			},
    //增加学生信息
	addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							let para = Object.assign({}, this.addForm);
							addStudent(para).then((res) => {
								this.addLoading = false;
								let { msg, code } = res;
								if (code !==200) {
									this.$message({
										message: resMsg,
										type: 'error'
									});
								} else {
									this.$message({
										message: '提交成功',
										type: 'success'
									});
									this.$refs['addForm'].resetFields();
									this.addFormVisible = false;
									this.getUsers();
								}			
							});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
						});
					}
				});
			},
      //显示编辑界面
      handleEdit:function(index,row) {
        this.editFormVisible=true;
        let para ={studentId:row.studentId};
        queryStuById(para).then((res)=>{
        this.editForm = Object.assign({},res.resData);
        });
    },

      //显示学生信息详情页面
			handleMore: function (index, row) {
				 this.$refs.studentdetails.showStudentDetail(row.studentId);
			},
  
  }}
</script>

