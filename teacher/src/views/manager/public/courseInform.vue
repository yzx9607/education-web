<template>
<section>

<el-form :inline="true" :model="filters">
	 <el-form-item>
		 	<el-input v-model="filters.informId" placeholder="输入课程通知ID" style="width:200px;float:right;margin-right:1%"></el-input>
	 </el-form-item>
	 <el-form-item>
		 	<el-input v-model="filters.courseName" placeholder="输入课程名称" style="width:200px;float:right;margin-right:1%"></el-input>
	 </el-form-item>
	 <el-form-item>
		 	<el-button type="primary" style="float:right;margin-right:1%" v-on:click="getCourse">查询</el-button>
	 </el-form-item>
	 <el-button type="primary"  @click="handleAdd">发布通知</el-button>
	 
 </el-form>
 </el-col>
<!--新增界面-->
		<el-dialog title="新增通知" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item label="教师编号：" prop="teacherId">
					<el-input v-model="addForm.teacherId" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="课程名称：" prop="courseName">
					<el-input v-model="addForm.courseName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="通知标题：" prop="informInformTitle">
					<el-input v-model="addForm.informInformTitle" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="课程时间："  prop="informDateStr">
					<!-- <el-input v-model="addForm.informDateStr"  auto-complete="off"></el-input> -->
					 <el-date-picker
      align="right"
      type="date"
      placeholder="课程时间"
      :picker-options="pickerOptions1"
			v-model="addForm.informDateStr"  auto-complete="off">
    </el-date-picker>
				</el-form-item>
   	
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">保存</el-button>
			</div>
		</el-dialog>

   <!--编辑界面-->
		<el-dialog title="通知编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" ref="editForm" :rules="editFormRules">
				<el-form-item label="教师编号：" prop="teacherId">
					{{editForm.teacherId}}
					
				</el-form-item>
				<el-form-item label="课程名称：" prop="courseName">
					{{editForm.courseName}}
				
				</el-form-item>
				<el-form-item label="通知标题：" prop="informInformTitle">
					<el-input v-model="editForm.informInformTitle" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="课程时间："  prop="informDateStr">
					<el-date-picker
     				 align="right"
     				 type="date"
     				 placeholder="课程时间"
     				 :picker-options="pickerOptions1"
							v-model="editForm.informDateStr"  auto-complete="off">
    			</el-date-picker>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="addLoading">保存</el-button>
			</div>
		</el-dialog>

    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      label="通知编号"
      style="width: 12%">
      <template scope="scope">
        
        <span style="margin-left: 10px">{{ scope.row.informId }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="课程时间"
      style="width: 16%">
      <template scope="scope">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ scope.row.informDateStr }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="课程名称"
      style="width: 16%">
      <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.courseName }}</span>
      </template>
    </el-table-column>

      <el-table-column
      label="通知标题"
      style="width: 24%">
      <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.informInformTitle }}</span>
      </template>
    </el-table-column>

   <el-table-column
      label="教师姓名"
      style="width: 16%">
      <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.teacherRealName }}</span>
      </template>
    </el-table-column>
 

    <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDel(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

	<el-col :span="24" class="toolbar" >

			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="[15, 30, 45, 60]"
			:page-size="pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
			style="float:right">
			</el-pagination>
		</el-col>
</section>
</template>

<script>
import util from '../../../common/js/util';
import constant from '../../../common/js/constant';
import { courseManager, removeCourse, editCourse, addCourse ,getCoursePage} from '../../../api/api';
  export default {
    data() {

				var validMobile = (rule, value, callback) => {
				var reg = /^[0-9]{0,4}$/; 
				if (!reg.test(value)) {
				  callback(new Error('请输入正确的教师编号'));
				} else {
				  callback();
				} 
		    };
				
      return {
				filters: {
					informId: '',
					courseName:''
				},
				pickerOptions1: {
					disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date()); 
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
			
				tableData: [],

				total: 0,//列表总条数
				pageSize:15,//每页条数
				currentPage:1,//当前页码

        //编辑页面
        editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					teacherId: [
						{ required: true, validator: validMobile, trigger: 'blur' }
					],
					informInformTitle: [
						{ required: true, message: '请输入通知标题', trigger: 'blur' }
					],
          courseName: [
						{ required: true,  message: '请输入课程名称', trigger: 'blur' }
					],
				},
        editForm: {
					informId:'',
					teacherId: '',
					courseName: '',
					informInformTitle: '',
					informDateStr: '',
				},
        addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					teacherId: [
						{  required: true, validator: validMobile, trigger: 'blur'  }
					],
					courseName: [
						{ required: true,  message: '请输入课程名称', trigger: 'blur' }
					],
					informInformTitle: [
						{ required: true,  message: '请输入通知标题', trigger: 'blur' }
					],


				},
				//新增界面数据
				addForm: {
					teacherId: '',
					courseName: '',
					informInformTitle: '',
					informDateStr: '',
				},
      }
    },
    addLoading: false,
    mounted() {
    this.getCourse();
		},
    methods: {

			handleIconClick(ev) {
      	console.log(ev);
    	},
			handleSizeChange(val) {
				this.pageSize = val;
				this.getCourse();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getCourse();
			},

      handleEdit(index, row) {
				this.filters.informId = row.informId;
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      getCourse() {
				let para = {
					informId : this.filters.informId,
					courseName : this.filters.courseName,
					pageSize:this.pageSize,
					pageNum:this.currentPage			
				};
				para = Object.assign(para, this.filters);
        getCoursePage(para).then((res) => {
					this.total = res.resData.total;
					this.tableData = res.resData.list;
        });
      },

      //显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
      
      //编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							//let para = Object.assign({}, this.editForm);
							let para = {
								informId:this.editForm.informId,
								informDateStr:this.editForm.informDateStr,
								informInformTitle:this.editForm.informInformTitle
							}
							editCourse(para).then((res) => {
								
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getCourse();
							});
						});
					}
				});
			},

      //显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					teacherId: '',
					courseName: '',
					informDateStr: '',
					informInformTitle: '',
				};
			},

      //新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							addCourse(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();

								let { msg, code } = res;
								if (code == 0) {
									this.$message({
										message: msg,
										type: 'error'
									});
								} else {
									this.$message({
										message: '提交成功',
										type: 'success'
									});
									this.$refs['addForm'].resetFields();
									this.addFormVisible = false;
									this.getCourse();
								}			
							});
						});
					}
				});
			},
      //删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { informId: row.informId };
					removeCourse(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getCourse();
					});
				}).catch(() => {

				});
			},
    }
  }
</script>