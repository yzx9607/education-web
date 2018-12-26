<template>
  <section>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="examTime" label="考试时间" width="150">
      </el-table-column>
      <el-table-column prop="examname" label="科目" width="150">
      </el-table-column>
  
      <el-table-column prop="examPlace" label="考试地点" width="150">
      </el-table-column>
      <el-table-column prop="examForm" label="考试形式" width="150">
      </el-table-column>
  
      <el-table-column prop="orderState" label=" 预约" width="180">
        <template scope="scope">
          <el-button type="primary" class="appointExam" size="small" @click.native="getexamstate(scope.$index,scope.row)">{{order_state}}</el-button>
        </template>
      </el-table-column>
  
      <el-table-column prop="address" label="操作">
        <template scope="scope">
          <el-button size="small" @click.native="beginExam(scope.$index,scope.row)">开始考试</el-button>
          <!--<router-link to="/test">
              <el-button type="text">开始考试</el-button>
            </router-link> |-->
          <router-link to="/print">
            <el-button type="text">打印准考证</el-button>
          </router-link>
        </template>
      </el-table-column>
  
    </el-table>
  </section>
</template>

<script>
import { getexamMsg2, getexamstate2 } from '../../api/api';
export default {
  data() {
    return {
      preparing: false,
      tableData: [],
      order_state: "预约考试"
    }
  },
  methods: {
    beginExam: function (index, row) {
    //  alert(row.courseId);
      let cid = row.courseId;
    //  alert("cid = " + cid);
      this.$router.push({ name: '考试', path: '/Paper', params: { id: cid } });
      ///api/student/StudentExamController/topics
    },
    // appointExam(index,row){
    //   alert("预约 = " + row.orderState);     
    //   alert(row.studentId);
    //   this.getexamstate(row.examId);

    // },
    //实现从考试信息那，取出该生需要的考试科目和信息
    getexamMsg: function () {
      let para = {};
      getexamMsg2(para).then((res) => {
        //返回
        this.tableData = res.resData;
      });
    },

    getexamstate: function (index, row) {
      let para = {
        //  studentId:this.studentId,  从sessio9n自己取
        examId: row.examId
      };
      getexamstate2(para).then((res) => {
        alert("等待预约结果 ... ");
        //返回
     //   alert("resdata" + res.resData);
        if (res.resData === 1) {
          alert("预约成功");
        } else {
       //   alert("你已经预约了");
        }

      });
    },



  },
  mounted() {
    //自调用
    this.getexamMsg();
  },

}
</script>
