  <template>
  <div>  
    <!--输入内容-->
				  <el-select v-model="vulename" placeholder="请选择" style="margin-left:100px">
              <el-option
                v-for="item in options"
                :key="item.majorId"
                :label="item.majorName"
                :value="item.majorId">
              </el-option>
           </el-select>
    <!--搜索按钮-->
   <el-button type="primary" icon="search"  @click="search()">搜索</el-button>
    <!--添加按钮-->
    <el-button type="primary" icon="edit" style="margin-left:300px" @click="addtable()">添加计划</el-button>
   
      <!--分页页面-->
    <el-table
      :data="tableData4"
      style="width: 100% ; margin-top:50px;">
      <el-table-column
        prop="strEnrollCreateDate"
        label="时间"
        >
      </el-table-column>

      <el-table-column
        prop="majorName"
        label="专业"
        >
      </el-table-column>

      <el-table-column
        prop="enrollStudentNum"
        label="招生人数">
      </el-table-column>

      <el-table-column
        prop="enrollTuition"
        label="学费信息">
      </el-table-column>

      <el-table-column
        prop="enrollEduSystem"
        label="学制">
      </el-table-column>

        <el-table-column
        prop="enrollArea"
        label="招生区域">
      </el-table-column>

        <el-table-column
        prop="enrollModel"
        label="招生分类">
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
    <!--分页组件-->
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
    <!--编辑界面-->
		<el-dialog title="招生计划添加" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
       <el-form-item label="专业选择">
				  <el-select v-model="editForm.majorId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.majorId"
                :label="item.majorName"
                :value="item.majorId">
              </el-option>
           </el-select>
        	</el-form-item>   
				<el-form-item label="招生人数"  prop="enrollStudentNum">
					<el-input v-model="editForm.enrollStudentNum" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item  prop="enrollTuition" label="学费信息">
					<el-input v-model="editForm.enrollTuition" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="enrollEduSystem" label="学制">
					<el-input v-model="editForm.enrollEduSystem" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="enrollArea" label="招生区域">
					<el-input v-model="editForm.enrollArea" type="text" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item prop="enrollModel" label="招生形式">
					<el-input v-model="editForm.enrollModel" type="text" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>

			</div>
		</el-dialog>







    <!--修改-->
		<el-dialog title="招生计划添加" v-model="updateFormVisible" :close-on-click-modal="false">
			<el-form :model="updateForm" label-width="100px" :rules="updateFormRules" ref="updateForm">
       <el-form-item label="专业选择">
				  <el-select v-model="updateForm.majorId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.majorId"
                :label="item.majorName"
                :value="item.majorId">
              </el-option>
           </el-select>
        	</el-form-item>   
				<el-form-item label="招生人数"  prop="enrollStudentNum">
					<el-input v-model="updateForm.enrollStudentNum" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item  prop="enrollTuition" label="学费信息">
					<el-input v-model="updateForm.enrollTuition" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="enrollEduSystem" label="学制">
					<el-input v-model="updateForm.enrollEduSystem" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item prop="enrollArea" label="招生区域">
					<el-input v-model="updateForm.enrollArea" type="text" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item prop="enrollModel" label="招生形式">
					<el-input v-model="updateForm.enrollModel" type="text" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="updateFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="updateSubmit" :loading="updateLoading">保存</el-button>

			</div>
		</el-dialog>


  </div>  
  </template>

<script>
  import { enrollpage } from '../../api/api'
	 import  { addenroll } from '../../api/api'
   import { getEnroll } from '../../api/api'
   import { updateEnroll } from '../../api/api'
   import { deleteEnroll} from '../../api/api'


  export default {
    //方法
    methods: {

      

      //添加计划
       addtable(){
      
        this.editFormVisible=true;
      },
     editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							addenroll(para).then((res) => {
								 this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
							this.$refs.editForm.resetFields();
              this.editForm.majorId='';
								this.editFormVisible = false;
								this.listAll();
							});
						});
					}
				});
			},

     // 删除触发方法
      deleteRow(row) {
       	this.$confirm('确认提交吗？', '提示', {}).then(() => {
          let para ={enroll_id:row.enroll_id};
          deleteEnroll(para)
          	this.listAll();
          
         });
      },
      //修改触发方法
      updateRow(row){
        // alert(row.enroll_id);
          this.updateFormVisible=true;
         let para={enroll_id:row.enroll_id};
        
          getEnroll(para).then((res) => {
         	 this.updateForm=res.resData;
          });
      },
      //修改确认
      updateSubmit:function(){
        	this.$refs.updateForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
						this.updateLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.updateForm);

							updateEnroll(para).then((res) => {
								 this.updateLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								 	this.$refs.updateForm.resetFields();
                  this.updateForm.majorId='';
								  this.updateFormVisible= false ;
								this.listAll();
							});
						});
					}
				});
      },
       handleCurrentChange(val){
        	this.currentPage = val;
          // alert(val)
          this.listAll();
        },

        
      search(){
        this.currentPage = 1;
			 this.listAll();
      },

      //分页默认数据
       listAll(){
          let para={currentPage:this.currentPage,searchMessage:this.vulename};
          enrollpage(para).then((res) => { 
            this.tableData4=res.resData.listEnro.list;
            this.options=res.resData.listMajor;
             this.total=res.resData.listEnro.total;
           //	 this.tableData4=res.data;
          //  this.total=res.data;

				});
      }
    },

    //初始化内容
    mounted(){ 
      this.listAll();
    },
    //页面数据
    data() {
      return {
     
        options:[
          
        ],
        tableData4:[],
        input:'',


        editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
        
					enrollModel: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					enrollStudentNum: [
						{ required: true,  message: '不能为空', trigger: 'blur' }
					],
					enrollTuition: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					enrollArea: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					]
				},
        //增加界面界面
        editForm: {
             majorId: '',
          //招生人数
					enrollStudentNum: '',
          //学费
					enrollTuition: '',
          //学制
					enrollEduSystem:'',
          //招生区域
					enrollArea: '',
          //招生形式
          enrollModel:'',
				},






        updateFormVisible: false,//修改界面是否显示
				updateLoading: false,
				updateFormRules: {
					// 		enrollModel: [
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
				//修改界面数据
				updateForm: {
				   majorId: '',
          //招生人数
					enrollStudentNum: '',
          //学费
					enrollTuition: '',
          //学制
					enrollEduSystem: '',
          //招生区域
					enrollArea: '',
          //招生形式
          enrollModel:'',
				},

				 total:10,//列表总条数
				// pageSize:10,//每页条数
				currentPage:1,//当前页码
        vulename:"",
      }

    }
  }
</script>


