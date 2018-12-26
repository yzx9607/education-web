<template>
	<section>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="num"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="sectionName"
        label="章节名称"
        width="500">
      </el-table-column>
      <el-table-column
        prop="testState"
        label="测验状态">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template scope="scope">
            <el-button size="small" @click.native="gotoTestSection(scope.$index,scope.row)">开始测试</el-button>
        </template>
      </el-table-column>

      <el-table-column
        prop="score"
        label="得分">
      </el-table-column>
    </el-table>
    	</section>
  </template>

  <script>
    import{getSectionTest} from '../../api/api' ;
    export default {
      
      data() {
        return {
          preparing:false,
          tableData: [],
          courseId:'',
        }
      },
      mounted(){
        this.getCourseId();
        this.getSectionByCourseId();
      },
      methods : {
        //获取该编号的课程的所有章节信息
        getSectionByCourseId(){
          var course={course_id:this.courseId};
         
          getSectionTest(course).then(res=>{
            this.tableData=res.resData;
          })
        },
        //获取传递过来的课程的编号
        getCourseId:function(){
          this.courseId=this.$route.params.courseId;
         
        },
        //向另外一个页面传递章节的id并跳转到测试页面
        gotoTestSection:function(index,row){
          
            this.$router.push({name:"试卷",path:'/sectionTestPaper',params:{sectionId:row.sectionId}});
        },
        beginExam:function(index,row){
       
         //this.$router.push({ path: '/test' });
         
        }
      }
    }
  </script>