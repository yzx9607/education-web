<template>
<div>

<!-- Form -->
<el-button type="primary" @click="open()">添加新的权限</el-button>

<el-dialog :title="title" :visible.sync="dialogFormVisible">
  <el-form  :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
    <el-form-item label="权限编号"  style="display:none">
        <el-input v-model="form.permissionId"></el-input>
    </el-form-item>
    <el-form-item label="权限名称"  prop="permissionName">
        <el-input v-model="form.permissionName"></el-input>
    </el-form-item>
    <el-form-item label="权限类型" prop="permissionType">
        <el-select v-model="form.permissionType" placeholder="权限类型">
            <el-option label="请选择" value="choose"></el-option>
            <el-option label="展示菜单" value="menu"></el-option>
            <el-option label="业务链接" value="url"></el-option>
         </el-select>
    </el-form-item>
        <el-form-item label="请求的URL"  prop="permissionUrl">
        <el-input v-model="form.permissionUrl"></el-input>
    </el-form-item>
            <el-form-item label="所需权限" prop="permissionCode">
        <el-input v-model="form.permissionCode"></el-input>
    </el-form-item>
  </el-form>

  </el-form>
  <div slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="submitForm('form')">提 交</el-button>
        <!--@click="dialogFormVisible = false" 关闭窗口-->
    <el-button @click="dialogFormVisible = false">取 消</el-button>
  
  </div>
</el-dialog>	
  <el-table
    :data="tableData"
    border
    style="width: 100%;margin-top:5px;">
    <el-table-column
      label="权限编号"
      width="180">
      <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.permissionId }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="权限名称"
      width="180">
      <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.permissionName }}</span>
        
      </template>
    </el-table-column>
      <el-table-column
      label="类型"
      width="180">
      <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.permissionType }}</span>
      </template>
    </el-table-column>
          <el-table-column
      label="所需权限"
      width="180">
      <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.permissionCode }}</span>
      </template>
    </el-table-column>
    
    <el-table-column
      label="请求的URL"
      width="180">
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>权限编号: {{ scope.row.permissionId }}</p>
          <p>权限名称: {{ scope.row.permissionName }}</p>

          <p>类型: {{ scope.row.permissionType }}</p>
          <p>所需权限: {{ scope.row.permissionCode }}</p>
          <p>请求的URL: {{ scope.row.permissionUrl }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.permissionUrl }}</el-tag>
          </div>
          </el-popover>
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
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>

</template>

<script>
 import { getPermisson,addPermisson,updatePermisson,deltetePermisson} from '../../api/api'; 
  export default {
    data() {
         var validateName = (rule, value, callback) => {
            if (value==="") {
                 return callback(new Error('权限名称不能为空'));
             }else{
                 callback();
             }
         };
         var validateType= (rule, value, callback) => {
             if (value==="choose") {
                 return callback(new Error('请选择权限类别'));
             }else{
                 callback();
             }
         };
        var validateUrl = (rule, value, callback) => {
            if (value==="") {
                 return callback(new Error('权限url不能为空'));
             }else{
                 callback();
             }
         };
        var validateCode = (rule, value, callback) => {
            var reg=/^[a-z]{3,10}:[a-z]{3,10}$/;
            if (value==="") {
                 return callback(new Error('所需权限不能为空'));
             }
             if(!reg.test(value)){
                    return callback(new Error('格式不正确，使用类似admin:add,:前后3-10个字符'));
             }else{
                 callback();
             }
         };
      return {
        currentPage: 1,
        tableData: [],
        pageSize:10,
        total:0,
        dialogFormVisible: false,
        title:'',
        form: {
          permissionName: '',
          permissionType:'choose',
          permissionUrl:'',
          permissionCode:'',
          permissionId:0,
        },
        formLabelWidth: '120px',
        rules:{
            permissionName:[{ validator: validateName, trigger: 'blur' },],
            permissionType:[{ validator: validateType, trigger: 'blur' },],
            permissionUrl:[{ validator: validateUrl, trigger: 'blur' },],
            permissionCode:[{ validator: validateCode, trigger: 'blur' },]
        }
      }
      
    },
    mounted(){
        this.getList(this.currentPage,this.pageSize); 
    },
    methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           //判断是否验证通过
            let params=this.form;
             	if(this.form.permissionId==0){
                 //添加权限
                    addPermisson(params).then(res => {
                    if(res.resCode==0){
                      this.$message({
                      message: res.resMsg,
                      type: 'success'
                    });
                    //清空输入框
                    this.clear();
                  this.dialogFormVisible = false;
                  }else{
                    this.$message({
                    message: res.resMsg,
                    type: 'error'
                  });
                  this.clear();
                  }
                }).catch(() => {
                  this.$message({
                    message: '系统繁忙,请稍候',
                    type: 'error'
                  });
                });
               }else{
                 //修改权限信息
                  updatePermisson(params).then(res => {
                    if(res.resCode==0){
                      this.$message({
                      message: res.resMsg,
                      type: 'success'
                    });
                     this.getList(this.currentPage,this.pageSize); 
                     //修改后更新内容-------------------
                    //清空输入框
                    this.clear();
                  this.dialogFormVisible = false;
                  }else{
                    this.$message({
                    message: res.resMsg,
                    type: 'error'
                  });
                  this.clear();
                  }
                }).catch(() => {
                  this.$message({
                    message: '您没有权限',
                    type: 'error'
                  });
                });
               }
          } else {
            return false;
          }
        });
        //添加或者修改后刷新学生信息
         this.getList(this.currentPage,this.pageSize); 
      },
      //打开编辑窗口方法
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        //将数据放入输入框
        this.form.permissionId=row.permissionId;
        this.form.permissionName=row.permissionName;
        this.form.permissionType=row.permissionType;
        this.form.permissionUrl=row.permissionUrl;
        this.form.permissionCode=row.permissionCode;
        //修改窗体头信息
        this.title="修改权限";
      },
      //删除
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('确认删除该权限吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let params={permissionId:row.permissionId};
            deltetePermisson(params).then(res => {
                if(res.resCode===0){
                   this.$message({
                    message: res.resMsg,
                    type: 'success'
                  });
                }else{
                  this.$message({
                    message: res.resMsg,
                    type: 'error'
                  });
                }
            })
          this.getList(this.currentPage,this.pageSize); 
        })
         
      },
       handleSizeChange(val) {
       
      },
      //获取当前页数据
      handleCurrentChange(val) {
         this.getList(val,this.pageSize); 
      },
      //获取数据的方法
      getList(current,size){
        var params={pageNo:current,pageSize:size};
        	getPermisson(params).then(res => {
                        this.tableData=res.resData.list;
                        this.total=res.resData.total;
						}).catch(() => {
							this.$message({
								message: '您没有权限',
								type: 'error'
							});
						});
    },
    open(){
        this.dialogFormVisible = true;
        this.clear();
        this.title="添加新的权限";
    },
    clear(){
      //清空输入框
          this.form.permissionName='';
          this.form.permissionType='choose';
          this.form.permissionUrl='';
          this.form.permissionCode='';
          this.form.permissionId=0;
    }
    }
    
  }
</script>
<<style>
.block{
   margin-top:5px;
   text-align:right;
}
</style>
