<template>
  <div>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <!--添加资料-->
        <el-popover ref="popover1" placement="right-end" title="提示" width="200" trigger="hover" content="课件详情里有所有的小节">
        </el-popover>
        <el-button v-popover:popover1 type="success" @click="resourceAdd()">添加资料</el-button>
  
      </div>
    </el-col>
  
    <el-table :data="tableData" border style="width: 100%;margin-top:10px;">
      <el-table-column label="资料名称" width="150">
        <template scope="scope">
          <!--<el-icon name="time"></el-icon> 时间小图标 -->
          <i class="el-icon-document"></i>
          <span style="margin-left: 10px">{{ scope.row.resourceName }}</span>
        </template>
      </el-table-column>
  
      <el-table-column label="资料标题" width="180">
        <template scope="scope">
          <!--<el-popover trigger="hover" placement="top"> 鼠标划过去 会有提示信息-->
          <!--<p>姓名: {{ scope.row.name }}</p>-->
          <!--<p>住址: {{ scope.row.address }}</p>-->
          <!--<div slot="reference" class="name-wrapper">
                    <el-tag>{{ scope.row.name }}</el-tag>
                  </div>   div是一个 突出显示 -->
          <span style="margin-left: 5px">{{ scope.row.resourceTitle }}</span>
          <!--</el-popover>-->
        </template>
      </el-table-column>
  
      <el-table-column label="资料描述" width="300">
        <template scope="scope">
          <i class="el-icon-document"></i>
          <span style="margin-left: 10px">{{ scope.row.resourceDescribe }}</span>
        </template>
      </el-table-column>
      <el-table-column label="访问次数" width="180">
        <template scope="scope">
          <i class="el-icon-star-on"></i>
          <span style="margin-left: 10px">{{ scope.row.resourceFrequence }}</span>次
        </template>
      </el-table-column>
  
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" @click="look(scope.row.resourceId)">查看课件详情</el-button>
          <el-button size="small" v-popover:popover1 type="success" @click="handleEdit(scope.$index, scope.row)">更新</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--新增界面-->
    <el-dialog title="添 加 课 件" v-model="addFormVisible" :close-on-click-modal="false">
  
      <el-form :model="addForm" label-width="200px" ref="addForm">
        <el-form-item label="课程名称：">
          <el-input v-model="addForm.course_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资料名称：">
          <el-input v-model="addForm.resourceName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资料标题：">
          <el-input v-model="addForm.resourceTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资料描述：">
          <el-input v-model="addForm.resourceDescribe" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
  
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">确认提交</el-button>
      </div>
    </el-dialog>
    <!--新增界面-->
    <!--编辑界面-->
    <el-dialog title="专业信息编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" ref="editForm">
        <!--<el-form-item label="资料id：">
          <el-input v-model="editForm.resourceId" auto-complete="off" type="hidden" ></el-input>
        </el-form-item>-->
        <el-form-item label="资料名称：">
          <el-input v-model="editForm.resourceName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资料标题：">
          <el-input v-model="editForm.resourceTitle" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资料描述：">
          <el-input v-model="editForm.resourceDescribe" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="addLoading">保存</el-button>
      </div>
    </el-dialog>
    <!--编辑-->
  
    <div style="width:100%;height:10px;"></div>
  
    <!--分页-->
    <div class="block" style="margin-left:15%">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[3, 10, 20, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  
  </div>
</template>

<script>
//获取所有资源信息                                               -根据id查资源的详情
import { selectStudyResource, addresoutce, delresource, editMajor2, queryResById } from '../../api/api';
export default {
  data() {
    return {
      tableData: [],

      //添加
      addFormVisible: false,//新增界面是否显示
      addLoading: false,

      //新增界面数据
      addForm: {
        // course_id:'',
        //资料名称，资料标题，资料描述
        resourceName: '',
        resourceTitle: '',
        resourceDescribe: ''
      },
      //分页
      total: 0,//列表总条数
      pageSize: 3,//每页条数
      currentPage: 1,//当前页码
      listLoading: false,
      sels: [], //列表选中咧
      //教师id 课程id
      teacherid: 1,
      courseid: 1,

      editFormVisible: false,//编辑界面是否显示
      //编辑 -------------------------------------------------------------------》》》》
      editForm: {
        resourceId:'',
        resourceName: '',
        resourceTitle: '',
        resourceDescribe: ''
      },

    }
  },
  mounted() {
    this.getdata();
  },
  methods: {
    selsChange: function (sels) {
      this.sels = sels;
    },
    //添加导学资源 点击方法
    resourceAdd() {
      //alert("添加资料！");
      this.addFormVisible = true;
      this.addForm = {
        course_id: '1',
        //资料名称，资料标题，资料描述   默认值
        resourceName: '',
        resourceTitle: '',
        resourceDescribe: ''

      };
    },
    //新增方法
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true;

            let para = Object.assign({}, this.addForm);
            addresoutce(para).then((res) => {
              this.addLoading = false;

              let { msg, resCode } = res;

              if (resCode !== 0) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
                
              } else {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });

                this.$refs['addForm'].resetFields(); //重置 字段
                this.addFormVisible = false;
                this.getdata();  //获取页面数据
              }

            });
          });
        }
      });
    },

    //跳转到详情页面方法
    look(id) {
      //('id = ' + id);
      this.$router.push({ path: '/teacher_courseware/' + id });
    },

    // 删除操作 index下标 从0开始，    row 元素  方法
    handleDelete(index, row) {
      //('你的操作会把该资源下所有的文件删除！');
      let para = {
        resourceId: row.resourceId
      };
      this.listLoading = true;
      delresource(para).then((res) => {
        this.listLoading = false;
        // alert("msg = " +res.resMsg);
        this.getdata();
      })
    },


    // 自定义方法，从数据库取值方法
    getdata() {
      let para = {
        pageSize: this.pageSize,
        pageNum: this.currentPage
      };
      para = Object.assign(para, this.filters);
      this.listLoading = true;
      selectStudyResource(para).then((res) => {
        this.tableData = res.resData.list;
        this.total = res.resData.total;
        // alert(" total = "+this.total);
        this.listLoading = false;
      });

    },

    //分页件 ---------------------------------------------------------------------------------------------
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getdata();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getdata();
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true;
      console.log(row);
      let para = { resourceId: row.resourceId };
      queryResById(para).then((res) => {
        // alert(res.resData.resourceName);
        //把对象赋值给 弹出来的层
        this.editForm = Object.assign({}, res.resData);
      }) 
      //this.editForm = Object.assign({}, row);
      //this.queryResourceById(row);
    },

    //--------------------------------------------------------------》》》 未完成！  1.增加操作 需要课程id 教师 id


    //编辑 --------------------------------------------------------------------》》》  todo 1.传一个资源id查询 该信息显示到页面   2.  然后传一个资源id 进行  更新操作！

    //先查询
    // queryResourceById:function(row){
    //   alert("query!");
    //     let para ={ resourceId:row.resourceId };
    //     queryResById(para).then((res) =>{
    //       //打印资源name
    //       alert(res.resData.resourceName);

    //   })
    // },

    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true;

            let para = Object.assign({}, this.editForm);
            editMajor2(para).then((res) => {
              this.editLoading = false;

              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['editForm'].resetFields();
              this.editFormVisible = false;
              this.getdata();
            });
          });
        }
      });
    },





  }
}
</script>