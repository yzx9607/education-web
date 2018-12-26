<template>
	<section>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="courseNum"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名称">
      </el-table-column>
      <el-table-column
        prop="sectionNum"
        label="章节数量"
        width="500">
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template scope="scope">
            <el-button size="small" @click.native="gotoTestSection(scope.$index,scope.row)">查看章节</el-button>
        </template>
      </el-table-column>
    </el-table>
    	</section>
  </template>

  <script>
    import{testCourse} from '../../api/api' ;
    export default {
      
      data() {
        return {
          preparing:false,
          tableData: [],
        }
      },
      mounted(){
        testCourse().then(res=>{
          this.tableData=res.resData;
        })
      },
      methods : {
        gotoTestSection:function(index,row){
            // 向其他页面中传递章节的编号
            this.$router.push({name:"章节测试",path:'/sectionTest',params:{courseId:row.courseId}});
        }
      }
    }
  </script>