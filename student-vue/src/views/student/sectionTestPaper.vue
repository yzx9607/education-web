<template>
  <section>
    <el-card class="box-card">
      <div slot="header" class="clearfix topic">
        <span class="bgcolor" style="line-height: 36px;">单元测试</span>
      </div>
      <!--<div v-for="o in 4" :key="o" class="text item">
                  {{'列表内容 ' + o }}  selectId  judgeId
                </div>-->
      <div class="item" v-for="(item,index) in selectTopicList">
        <p>{{index+1}}.{{item.selectName}}({{item.selectPoint}}分)</p>
        <p class="selectTopic">
  
          <!-- 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 -->
          <input type="checkbox" value="A">A.{{item.selectA}}
          <input type="checkbox" value="B">B.{{item.selectB}}
          <input type="checkbox" value="C">C.{{item.selectC}}
          <input type="checkbox" value="D">D.{{item.selectD}}
  
          <!--<el-radio-group v-model="radio">
                <el-radio :label="A">A.{{item.selectA}}</el-radio>
                <el-radio :label="B">B.{{item.selectB}}</el-radio>
                <el-radio :label="C">C.{{item.selectC}}</el-radio>
                <el-radio :label="D">D.{{item.selectD}}</el-radio>
              </el-radio-group>-->
  
          <span class="answer" style="display:none">{{item.selectAnswer}}</span>
          <span class="point" style="display:none">{{item.selectPoint}}</span>
        </p>
      </div>
    </el-card>
    <div class="lastTime">
      <el-button class="docommit" @click.native="mult(1)">交卷</el-button>
      <p></p>
    </div>
  </section>
</template>
 <script>
import { saveSectionScore, getTestPaperOfSection } from '../../api/api';
export default {
  data() {
    return {
      //单选按钮所用
      radio1: 6,
      visible2: false,
      time: 0,
      storeid: 1,
      preparing: false,
      selectTopicList: [],
      judgeTopicsList: [],
      total: 0,
      sectionId:0
    }
  },
  methods: {
    //获取章节的id
    getSectionId:function(){
      this.sectionId=this.$route.params.sectionId;
     
    },
    // 获取章节试题
    getData() {
      //参数
      let para = {
        section_id: this.sectionId
      };
      //获取题目列表
      getTestPaperOfSection(para).then((res) => {
        this.preparing = true;
        //console.log(res.resData);
        //真实数据map.list格式，模拟数据list
        // this.selectTopicList = res.resData.selectTopics;
        // this.judgeTopicsList = res.resData.judgeTopics;
        this.selectTopicList = res.resData;
        //console.log(this.topicList);
      });
    },


    //计算总分数
    mult(num) {
      // 题节点集合  
      var stopic = document.getElementsByClassName("selectTopic");
      //正确答案集合
      var answers = document.getElementsByClassName("answer");
      //分数集合
      var points = document.getElementsByClassName("point");

      //总题目数量
      var slen = stopic.length;
      //总分0
      var totalScore = 0;
      //每做一道题 +1
      var sum = 0;

      for (var i = 0; i < slen; i++) {   // ***************************************   20次
        //每一道题
        var nodes = stopic[i].childNodes;
      
        //每一个题的长度？？？
        var nsLen = nodes.length;
       console.log("每一个题的长度？？？" +nodes[1].checked  +" * "+ nodes[2].checked + " * "+nodes[3].checked +" * "+nodes[4].checked);
        //学生答案
        var stuans = "";
        
        //nsLen 》》4  即可
        for (var j = 0; j < nsLen; j++) {
          var m = 0;
          if (nodes[j].checked) {
            m++;
            //学生的答案就是   20道题的子节点  中被选中的  
            stuans += nodes[j].value;
          }
          if (m === 1 | m === 2 | m === 3 | m === 4) {
            sum++;
          }
        }
        //正确答案
        var rans = answers[i].innerHTML;
        var score = parseInt(points[i].innerHTML);

        console.log("学生答案 = "+stuans+" 答案 "+rans);
        //验证答案
        if (stuans === rans) {
          totalScore += score;
          console.log(totalScore + "分数000");
        }
      }  //      ***********************************************             20结束
      if (num == 1) {
      
        this.$confirm('您有' + (slen - sum) + '题未做，确认交卷吗?', {
          type: 'warning'
        }).then(() => {
      //    let stu = JSON.parse(sessionStorage.getItem("stu"));
          //提交分数
        //  let param = { stuId: stu.studentId, total: totalScore, storeId: this.storeid };

          let param = {total: totalScore, sec_Id: this.sectionId };
          
          saveSectionScore(param).then((res) => {
            let { resMsg, resCode } = res;
            //console.log(res.data);
            if (resCode === 0) {
              this.$message({
                type: 'success',
                message: '恭喜你获得' + totalScore + "分"
              });
            }
          });
        }).catch(() => { });
        this.$router.push({name:"选择课程",path:'/courseTest'});
      } else {
       
        let param = {total: totalScore, course_id: this.$route.params.id };
        saveSectionScore(param).then((res) => {
          let { resMsg, resCode } = res;
          //console.log(res.data);
          if (resCode === 0) {
            this.$message({
              type: 'success',
              message: '恭喜你获得' + totalScore + "分"
            });
          }
        });
      }
    }
  },
  mounted() {
    //先获取章节的ID号
    this.getSectionId();
    //试题
    this.getData();
    //转换当前对象在函数中调用
    let me = this;
    me.time = 60;
    let interval = window.setInterval(function () {
      let docommit = document.getElementsByClassName("docommit");
      if ((me.time--) <= 0) {
        me.time = 0;
      //  let stu = JSON.parse(sessionStorage.getItem("stu"));
        docommit[0].disabled = true;
        window.clearInterval(interval);
        //考试时间到自动提交分数
        me.mult(0);
      }
      if (me.time === 10) {
        document.getElementsByClassName("lastTime")[0].lastChild.innerHTML = "剩余时间不多了";
      }
    }, 1000 * 60);

  }
}
</script>
<style>
.text {
  font-size: 20px;
  margin-left: 10px;
}

.item {
  padding: 18px 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.topic {
  background-color: #F9FAFC;
  font-size: 20px;
}

.bgcolor {
  margin-left: 50%;
}

.box-card {
  width: 80%;
  margin-top: 30px;
  margin-left: 30px;
  /*//background: ;*/
}

.lastTime {
  position: fixed;
  top: 120px;
  right: 8%;
}
</style>