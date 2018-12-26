<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <!--点击返回上一章-->
          <el-button :plain="true" type="danger" @click="resource()">返回上一级</el-button>
          <el-button type="success" @click="coursewareAdd()">添加课件</el-button>
        </div>
      </el-col>
  
      <el-col :span="24">
        <div class="grid-content bg-purple-light">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="coursewareName" label="课件名称" width="150"> </el-table-column>
            <el-table-column prop="coursewareSize" label="课件大小(KB)" width="150"></el-table-column>
            <el-table-column prop="coursewareAddtime" label="发布时间" width="240"> </el-table-column>
  
            <el-table-column label="操作">
              <template scope="scope">
                <el-button size="small" @click="look(scope.row.coursewareId)">下载</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
              </template>
            </el-table-column>
  
          </el-table>
        </div>
      </el-col>
    </el-row>
  
    <div>
      <!--<h1>{{this.$route.params.id}}</h1>-->
    </div>
    <div style="width:100%;height:10px;"></div>
  
    <!--新增界面-->
    <el-dialog title="添 加 课 件" v-model="addFormVisible" :close-on-click-modal="false">
  
      <el-form :model="addForm" label-width="200px" ref="addForm">
  
        <el-form-item label="资源id">
          <el-input v-model="addForm.resourceId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="课件名称：">
          <el-input v-model="addForm.coursewareName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="课件上传：">
          <!--文件上传-->
          <!--
                          action 对应程序（@RequestMapping）中对外访问路劲
                          ref="upload"  指向
                           multiple="false"  是否支持多文件   【否】
                            accept="audio/mp4, video/mp4"  文件类型
                            :data="aa"    传到后台的数据
                            :file-list="fileList"         预览
                            :auto-upload="false"   立即上传？ 否          
                            
                             :变量    无:  代表 值 这是v-bind的缩写。
                             当你写过很多v-bind之后你会发现，每次都写这六个字符好烦啊，
                             于是，就可以用 : 来代替它了。你会感谢作者的这一贴心举动的。v-bind
                             :是v-bind的缩写，是为了动态绑定数据。
                                              
                              加上了冒号是为了动态绑定数据，等号后面可以写变量。
                              
                              如果不使用冒号，等号后面就可以写字符串等原始类型数据。这时就无法进行动态绑定数据了
                        -->
          <!--<el-upload class="upload-demo"  action="/api/teacher/StudyResController/coursewareAdd" 
                       ref="upload"
                       multiple="false" accept="audio/mp4, video/mp4" 
                      :data="addForm" :on-preview="handlePreview" :on-remove="handleRemove" 
                      :file-list="fileList" :auto-upload="false">
              
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip" style="margin-top: -10px;">文件不得超过1M</div>
                      </el-upload>-->
          <el-upload class="upload-demo" action="api/teacher/CoursewareController/coursewareAdd" :data="addForm" ref="upload" auto-upload="false">
  
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
            <div slot="tip" class="el-upload__tip" style="margin-top: -10px;">文件不得超过10M</div>
          </el-upload>
        </el-form-item>
  
      </el-form>
  
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit()" :loading="addLoading">确认</el-button>
      </div>
    </el-dialog>
    <!--新增界面-->
    <!--分页-->
    <div class="block" style="margin-left:15%">
      <span class="demonstration"></span>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[3, 10, 20, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  
  </div>
</template>

  <script>
// import { selectCourserware, coursewareAdd2, deleteCourseware } from '../../api/api';
import { selectCourserware, deleteCourseware } from '../../api/api';
export default {
  data() {
    return {


      tableData: [
        // {
        // courseware_id:1,
        // courseware_name: 'java第一章第一节',
        // courseware_size: '1000',
        // courseware_addtime: '2017-05-22'
        // }
      ],

      //添加页面
      addFormVisible: false,//新增界面是否显示
      addLoading: false,
      //新增界面数据
      addForm: {
        //资料id
        resourceId: this.$route.params.id,
        //课件id
        coursewareName: ''
      },

      //文件集合

      // fileList: [
      //   { name: 'v0.png', url: 'static/inm' },
      // ],

      //分页
      total: 0,//列表总条数
      pageSize: 3,//每页条数
      currentPage: 1,//当前页码
      listLoading: false,
      sels: [], //列表选中咧


      // addadd:{
      //    //资料id
      //   resourceId: this.$route.params.id,
      //   //课件name
      //   coursewareName: ''
      // }

      // aa: {
      //   resourceId: this.$route.params.id,
      //   //课件id
      //   coursewareName: addForm.coursewareName
      // }

    }
  },
  mounted() {
    this.coursewareInit();
  },


  methods: {
    selsChange: function (sels) {
      this.sels = sels;
    },
    //分页件 ---------------------------------------------------------------------------------------------
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.coursewareInit();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.coursewareInit();
    },
    //初始化页面数据
    coursewareInit() {
      //alert(" 初始化数据 " + this.$route.params.id);
      let para = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        resourceId: this.$route.params.id
      };
      para = Object.assign(para, this.filters);
      this.listLoading = true;
      selectCourserware(para).then((res) => {
        this.tableData = res.resData.list;
        this.total = res.resData.total;

        //alert(" total = "+this.total);
        this.listLoading = false;
      });


    },
    // uploadUrl:function(){
    //   alert(config.URL + '/upload');
    // },


    //提交上传
    // submitUpload() {
    //   alert('点点点！');
    //   this.$refs.upload.submit();
    // },
    // //处理删除
    // handleRemove(file, fileList) {
    //   alert('别删我！');
    //   console.log(file, fileList);
    // },
    // //处理预览
    // handlePreview(file) {
    //   alert(file.name);
    //   console.log(file);
    // },


    //添加课件资源 点击方法
    coursewareAdd() {
      //alert(this.$route.params.id + "??? id ");
      //alert("添加资料！");
      this.addFormVisible = true;

      this.addForm = {
        //资料id
        resourceId: this.$route.params.id,
        coursewareName: '',
        // coursewarePath: ''
      };
      //null    alert(addForm.resourceId + ' * ' + addForm.coursewareName);
    },

    //新增方法
    addSubmit: function () {
     // alert(this.addForm.resourceId + '   **    ' + this.addForm.coursewareName);
      // this.$refs.addForm.validate((valid) => {
      //   if (valid) {
      //   this.$confirm('确认提交吗？', '提示', {}).then(() => {
      // this.addLoading = true;
      // //NProgress.start();

      // let para = Object.assign({}, this.addForm);
      // coursewareAdd2(para).then((res) => {
      //   this.addLoading = false;
      //   //NProgress.done();
      //   let { resMsg, resCode } = res;

      //   if (resCode !== 0) {
      //     this.$message({
      //       message: resMsg,
      //       type: 'error'
      //     });
      //   } else {
      //     this.$message({
      //       message: '提交成功',
      //       type: 'success'
      //     });

      //     this.$refs['addForm'].resetFields(); //重置 字段
      //     this.addFormVisible = false;
      //     this.coursewareInit();  //获取页面数据
      //   }

      // });


      // this.addadd.resourceId = this.addForm.resourceId;
      // this.addadd.coursewareName = this.addForm.coursewareName;

     // alert('上传前');
      this.$refs.upload.submit();
      //alert('上传后');

      this.$refs['addForm'].resetFields(); //重置 字段
      this.addFormVisible = false;
      this.coursewareInit();  //获取页面数据

      //    }

      // );
      //   }
      // });
    },

    //  handleChange(){
    //   var coursewareName2=this.coursewareName;
    //   this.addadd.coursewareName=coursewareName2;
    //   console.log(" = = = =  " + addadd);
    // },
    // 返回上一级
    resource() {
     // alert('resource方法');
      this.$router.push({ path: '/teacher_resource' });
    },

    //下载                                        ---------------------------------- ---暂未完成！ ----------------------------------------------------------------
    look(coursewareId) {
      alert('下载  id = ' + coursewareId);
    },



    // index 下标  从0开始， row 元素     ---------------------------del
    handleDelete(index, row) {
      //alert('你的操作会把该课件删除！');
      let para = {
        coursewareId: row.coursewareId
      };
      this.listLoading = true;
      deleteCourseware(para).then((res) => {
        this.listLoading = false;
        //alert(res.resMsg);
        this.coursewareInit();
      })
    }



  },
}
</script>