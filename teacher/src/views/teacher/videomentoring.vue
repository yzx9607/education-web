<style>
.el-select .el-input {
  width: 110px;
}
</style>
<template>
  <section>
    <div style="width:100%;">
      <el-input placeholder="请输入内容" v-model="input5" style="width:500px; margin-left:800px;">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="编号" value="1"></el-option>
          <el-option label="姓名" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="search" @click="one"></el-button>
      </el-input>
    </div>
    <br>
    <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="100">
      </el-table-column>
      <el-table-column prop="quizId" label="视频Id" width="120">
      </el-table-column>
      <el-table-column prop="quizDateStr" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="quizDateStr" label="疑问" width="300">
      </el-table-column>
      <el-table-column prop="quizContent" label="回答" width="300">
      </el-table-column>
      <el-table-column prop="tl.replyContent" label="回复" width="300">
      </el-table-column>
      <el-table-column prop="replyid" label="回复编号" width="200">
      </el-table-column>
      <el-table-column label="操作" width="214">
        <template scope="scope">
          <el-button type="primary" icon="edit" @click="open1(scope.$index, scope.row)"></el-button>
          <el-button type="primary" icon="delete" @click="open2(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  
    <el-dialog title="回复留言" :visible.sync="dialogFormVisible" :modal="true" :modal-append-to-body="true">
      <el-form :model="form">
        <el-form-item>
          <br> &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 10}" placeholder="请输入内容" v-model="textarea3" style='width:700px;'>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="open3" >确 定</el-button>
      </div>
    </el-dialog>
    <br>
    <div class="block" style="margin-right:45%;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5,10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </section>
</template>
<script>

import {videomentoring,seleVideoQuiz,updateVideoQuiz,delvideo} from '../../api/api';
export default {

  data() {
    return {
      quizId:0,
      total: 0,//列表总条数
      pageSize: 5,//每页条数cnpm run build
      currentPage: 1,//当前页码
      textarea3: '',
      visible2: false,
      dialogFormVisible: false,
      tableData3: [],
      input5: '',
      select: '',
      teid:0,
      quid:0,
      reid:0,
      multipleSelection: [],
    }
  },
  mounted() {
    this.videomentoring0();
    this.one()
  },

  methods: {
    one() {
      console.log(this.select)
      console.log(this.input5)

      let mh = {
        name: this.input5,
        lx: this.select
      }
      this.loading = true;
      seleVideoQuiz(mh).then((res) => {
        this.total = res.resData.total;
        this.tableData3 = res.resData.list;
        this.loading = false;
      });

    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.videomentoring0();
    },
    handleCurrentChange(val) {
      this.currentPage = val;

      this.videomentoring0(this.currentPage);
    },
    videomentoring0(num) {
      if (num == null) {
        num = 1;
      }
      let para = {
        pageSize: this.pageSize,
        pageNum: num,
      };
      this.loading = true;
      videomentoring(para).then((res) => {
        this.total = res.resData.total;
        this.tableData3 = res.resData.list;
        this.loading = false;
      });
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {

      this.multipleSelection = val;
    },
    open1: function (index, row) {
         this.teid=row.replyid,
         this.quid=row.replyid,
         this.reid=row.replyid
         this.dialogFormVisible=true
       if(row.tl.replyContent.length>0){
         this.dialogFormVisible=false
          this.$message({
          message: '警告哦，留言已经回复',
          type: 'warning'
        }); 
      } 
      },
     open3(){
        console.log(this.textarea3),
        console.log(this.teid)
        let up = {
        teid:this.teid,
        quid:this.quid,
        reid:this.reid,
        reco:this.textarea3
      };
      updateVideoQuiz(up);
      this.dialogFormVisible=false
    console.log(this.currentPage),
    this.videomentoring0(this.currentPage);
     },
    open2: function (index, row) {
     
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
         console.log("" + row.quizId)
         let deltwo = {
          quizId:row.quizId,
         }
         delvideo(deltwo);
         console.log(this.currentPage)
         this.videomentoring0(this.currentPage);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script> 