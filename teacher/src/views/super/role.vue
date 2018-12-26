<template>
    <div>
      <!-- Form -->
<el-button type="primary" @click="open()">添加新角色</el-button>

<el-dialog :title="title" :visible.sync="dialogFormVisible">
  <el-form  :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
    <el-form-item label="角色编号" style="display:none;">
        <el-input v-model="form.roleId"></el-input>
    </el-form-item>
    <el-form-item label="角色名称"  prop="roleName">
        <el-input v-model="form.roleName"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="form.roleDesc"></el-input>
    </el-form-item>
  </el-form>

  </el-form>
  <div slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="submitForm('form')">提 交</el-button>
        <!--@click="dialogFormVisible = false" 关闭窗口-->
    <el-button @click="dialogFormVisible = false">取 消</el-button>
  
  </div>
  </el-dialog>

<!--//授权信息列表-->
<el-dialog :title="roles" :visible.sync="showForm">


    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="未授权的" name="first">
    <el-table
    :data="tableDataRole"
    border
    style="width: 100%;margin-top:5px;">
    <el-table-column
      label="权限编号"
      width="100">
      <template scope="scopes">
        <span style="margin-left: 10px">{{ scopes.row.permissionId }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="权限名称"
      width="140">
      <template scope="scopes">
      <span style="margin-left: 10px">{{ scopes.row.permissionName }}</span>
        
      </template>
    </el-table-column>
      <el-table-column
      label="类型"
      width="140">
      <template scope="scopes">
      <span style="margin-left: 10px">{{ scopes.row.permissionType }}</span>
      </template>
    </el-table-column>
          <el-table-column
      label="所需权限"
      width="180">
      <template scope="scopes">
      <span style="margin-left: 10px">{{ scopes.row.permissionCode }}</span>
      </template>
    </el-table-column>
    
    <el-table-column
      label="请求的URL"
      width="240">
      <template scope="scopes">
        <el-popover trigger="hover" placement="top">
          <p>权限编号: {{ scopes.row.permissionId }}</p>
          <p>权限名称: {{ scopes.row.permissionName }}</p>

          <p>类型: {{ scopes.row.permissionType }}</p>
          <p>所需权限: {{ scopes.row.permissionCode }}</p>
          <p>请求的URL: {{ scopes.row.permissionUrl }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scopes.row.permissionUrl }}</el-tag>
          </div>
          </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scopes">
        <el-button
          size="small"
          type="primary"
          @click="ShouQuan(scopes.$index, scopes.row)">确认授权</el-button>
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
    </el-tab-pane>
    <el-tab-pane label="已授权的" name="second"> <el-table
    :data="tableDataRole2"
    border
    style="width: 100%;margin-top:5px;">
    <el-table-column
      label="权限编号"
      width="100">
      <template scope="scope2">
        <span style="margin-left: 10px">{{ scope2.row.permissionId }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="权限名称"
      width="140">
      <template scope="scope2">
      <span style="margin-left: 10px">{{ scope2.row.permissionName }}</span>
        
      </template>
    </el-table-column>
      <el-table-column
      label="类型"
      width="140">
      <template scope="scope2">
      <span style="margin-left: 10px">{{ scope2.row.permissionType }}</span>
      </template>
    </el-table-column>
          <el-table-column
      label="所需权限"
      width="180">
      <template scope="scope2">
      <span style="margin-left: 10px">{{ scope2.row.permissionCode }}</span>
      </template>
    </el-table-column>
    
    <el-table-column
      label="请求的URL"
      width="240">
      <template scope="scope2">
        <el-popover trigger="hover" placement="top">
          <p>权限编号: {{ scope2.row.permissionId }}</p>
          <p>权限名称: {{ scope2.row.permissionName }}</p>

          <p>类型: {{ scope2.row.permissionType }}</p>
          <p>所需权限: {{ scope2.row.permissionCode }}</p>
          <p>请求的URL: {{ scope2.row.permissionUrl }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope2.row.permissionUrl }}</el-tag>
          </div>
          </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope2">
        <el-button
          size="small"
          type="danger"
          @click="romovePermission(scope2.$index, scope2.row)">取消授权</el-button>
      </template>
    </el-table-column>
  </el-table>
     <div class="block">
    <el-pagination
      @size-change="handleSizeChange2"
      @current-change="handleCurrentChange2"
      :current-page.sync="currentPage2"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="total2">
    </el-pagination>
  </div>
  </el-tab-pane>
  </el-tabs>

  
   


  </el-dialog>


    <el-table
    :data="tableData"
    border
    style="width: 100%;margin-top:5px;">
    <el-table-column
      label="角色编号"
      width="180">
      <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.roleId }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="角色名称"
      width="180">
      <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.roleName }}</span>
        
      </template>
    </el-table-column>
      <el-table-column
      label="角色描述"
      width="180">
      <template scope="scope">
      <span style="margin-left: 10px">{{ scope.row.roleDesc}}</span>
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
            <el-button
          size="small"
          type="primary"
          @click="openshow(scope.$index, scope.row)">授权</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
</template>
<script>
import {getRoleList,addNewRole,updateRoleById,delteteRoleById,getPermissonByRole,getPermissonByRoles,addRolePermissonById,deletePermission} from '../../api/api'; 
export default {
  data() {
      var validateName=(rule, value, callback) => {
            if (value==="") {
                 return callback(new Error('角色名称不能为空'));
             }else{
                 callback();
             }
         };
      var validateDesc=(rule, value, callback) => {
            if (value==="") {
                 return callback(new Error('角色描述不能为空'));
             }else{
                 callback();
             }
         };
      return {
        //授权信息分页
        currentPage: 1,
        currentPage2:1,
        pageSize:10,
        total:0,
        total2:0,
        show_roleId:0,
        //定义返回数据
        tableData:[],
        //授权信息返回（未授权）
        tableDataRole:[],
        //已经授权过的
        tableDataRole2:[],
        dialogFormVisible: false,//默认关闭状态
        title:'',
        activeName: 'first',
        //表单信息
        form: {
          roleId:-1,
          roleName:'',
          roleDesc:'',
        },
        rules:{
            roleName:[{ validator: validateName, trigger: 'blur' },],
            roleDesc:[{ validator: validateDesc, trigger: 'blur' },],
        },
        showForm:false,
        roles:'',
      }
  },
  mounted(){
    //默认查询数据
    this.getList();
    },
    methods: {
      //打开添加窗口方法
       open(){
        this.dialogFormVisible = true;
        //修改弹窗窗体提示信息
        this.title="添加新的角色";
        //清空输入框
        this.clear();
    },
    getList(){
      //查询数据方法
       var params={};
        	getRoleList(params).then(res => {
                        this.tableData=res.resData.list;
						}).catch(() => {
							this.$message({
								message: '系统繁忙,请稍候',
								type: 'error'
							});
						});
    },
    clear(){
      //清空输入框
      this.form.roleId=-1;
      this.form.roleName="";
      this.form.roleDesc="";
    },submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           //判断是否验证通过
            let params=this.form;
             	if(this.form.roleId==0){
                 //添加角色
                    addNewRole(params).then(res => {
                    if(res.resCode==0){
                      this.$message({
                      message: res.resMsg,
                      type: 'success'
                    });
                    //清空输入框
                    this.clear();
                    this.getList(); 
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
                 //修改角色信息 
                  updateRoleById(params).then(res => {
                    if(res.resCode==0){
                      this.$message({
                      message: res.resMsg,
                      type: 'success'
                    });
                  this.dialogFormVisible = false;
                  this.getList(); 
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
               }
               this.getList();
          } else {
            return false;
          }
        });
        //添加或者修改后刷新学生信息
         this.getList(); 
      },//打开编辑窗口方法
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        //将数据放入输入框
        this.form.roleId=row.roleId;
        this.form.roleName=row.roleName;
        this.form.roleDesc=row.roleDesc;
        //修改窗体头信息
        this.title="修改角色信息";
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('确认删除该角色吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            //删除角色
            let params={roleId:row.roleId};
            delteteRoleById(params).then(res => {
                if(res.resCode===0){
                   this.$message({
                    message: res.resMsg,
                    type: 'success'
                  });
                  this.getList(); 
                }else{
                  this.$message({
                    message: res.resMsg,
                    type: 'error'
                  });
                }
            })
        })
         
      },openshow(index, row){
        //打开授权信息
        this.showForm=true;
        this.roles="给"+row.roleDesc+"授权";
        this.show_roleId=row.roleId;
        this.getPermissonList(this.currentPage,this.pageSize,this.show_roleId);
         this.getPermissonList2(this.currentPage,this.pageSize,this.show_roleId);
        // this.tableDataRole=[];
      },
      getPermissonList(current,Size,roleId){
           var params={pageNo:current,pageSize:Size,roleId:roleId};
        	getPermissonByRole(params).then(res => {
                        this.tableDataRole=res.resData.list;
                        this.total=res.resData.total;
						}).catch(() => {
							this.$message({
								message: '系统繁忙,请稍候',
								type: 'error'
							});
						});
      },
      getPermissonList2(current,Size,roleId){
           var params={pageNo:current,pageSize:Size,roleId:roleId};
        	getPermissonByRoles(params).then(res => {
                        this.tableDataRole2=res.resData.list;
                        this.total2=res.resData.total;
						}).catch(() => {
							this.$message({
								message: '系统繁忙,请稍候',
								type: 'error'
							});
						});
      },handleSizeChange(){
        
      },
      handleSizeChange2(){
        
      }
      

      ,
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleCurrentChange(val) {
       this.getPermissonList(val,this.pageSize,this.show_roleId); 
      },
      handleCurrentChange2(val) {
       this.getPermissonList2(val,this.pageSize,this.show_roleId); 
      },
      ShouQuan(index, row){
        //给某个角色授权
        console.log(index, row);
        this.$confirm('确认给该角色授权吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            //删除角色
            let params={roleId:this.show_roleId,permissionId:row.permissionId};
            console.log(params);
            addRolePermissonById(params).then(res => {
                if(res.resCode===0){
                   this.$message({
                    message: res.resMsg,
                    type: 'success'
                  });
        //刷新内容
         this.getPermissonList(this.currentPage,this.pageSize,this.show_roleId);
         this.getPermissonList2(this.currentPage,this.pageSize,this.show_roleId);
                }else{
                  this.$message({
                    message: res.resMsg,
                    type: 'error'
                  });
                }
            })
        })
      },romovePermission(index, row){
        //取消角色某个权限
        console.log(index, row);
        this.$confirm('确认取消该授权吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            //删除角色的某个权限
            let params={roleId:this.show_roleId,permissionId:row.permissionId};
            console.log(params);
            deletePermission(params).then(res => {
                if(res.resCode===0){
                   this.$message({
                    message: res.resMsg,
                    type: 'success'
                  });
         //刷新内容
         this.getPermissonList(this.currentPage,this.pageSize,this.show_roleId);
         this.getPermissonList2(this.currentPage,this.pageSize,this.show_roleId);
                }else{
                  this.$message({
                    message: res.resMsg,
                    type: 'error'
                  });
                }
            })
        })
      }
    }
}
</script>
