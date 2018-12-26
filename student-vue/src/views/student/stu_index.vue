<template scope="scope">
    <section>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    v-loading="listLoading"
    :default-sort = "{prop: 'date', order: 'descending'}"
    
    >
   
    <el-table-column
      type="index"
      prop="courseId"
      label="课程编号"
      sortable
      width="180"
      align="center"
      >
    
    </el-table-column>
    <el-table-column
      prop="courseName"
      label="课程名称"
      sortable
      width="180"
      
      >
      
     <template scope="scope">
       
         <el-popover trigger="hover" placement="left">
          <p>点击进入该课程界面</p>
          
          <div slot="reference" class="name-wrapper">
            <el-button type="text" @click.native="classInfo(scope.row.courseId)">{{scope.row.courseName}}</el-button>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      prop="teacherName"
      label="授课教师"
      >
    </el-table-column>
    <el-table-column
      prop="scoreCredit"
      label="学分"
      >
    </el-table-column>
     
  </el-table>

   <!--工具条(分页)-->
		<el-col :span="24" class="toolbar">
			
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="[10, 20, 50, 100]"
			:page-size="pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
			style="float:right;">
			</el-pagination>
		</el-col>
    
   
    <el-col :span="6" :offset="10"><div class="grid-content bg-purple"><el-button :plain="true" type="info"  v-on:click="history">历史课程<i class="el-icon-arrow-right el-icon--right"></i></el-button></el-button></div></el-col>
 
    </section>
</template>

<script>
import { getCourse } from '../../api/api';

  export default {
    data() {
      return {
        row:'',
        tableData: [],
        total: 0,//列表总条数
		    pageSize:10,//每页条数
		    currentPage:1,//当前页码
        listLoading: false,
        courseId: 0,
      }
    },
    methods: {
        	//返回前一页
			forback() {
				this.$router.push({path:'/stu_index'});
			},
              //分页
        handleSizeChange(val) {
            this.pageSize = val;
            this.getCourses();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getCourses();
        },
        //课程详情
        classInfo(row) {
          console.log(row)
          //通过路由传参数，必须有name，用params可以传参数，也可以用query
           this.$router.push({name: '课程界面',path:'/class_index',query:{courseId:row}}); //跳转到另一个vue页面
        },
        getCourses() {
           let para = {
              pageSize:this.pageSize,
              currentPage:this.currentPage,
              
            };
          this.listLoading = true;
            getCourse(para).then((res) => {
              console.log(res.resData.list.courseName)
                this.tableData = res.resData.list;
               
                this.total = res.resData.total;
                this.listLoading = false;
            });
        },

         //历史课程
        history(){
          
          this.$router.push({path:'/history_class'});
        },
        
    },
    mounted() {
        this.getCourses();
    }
    
  }
  
</script>
<<style lang="scss">
     .el-row {
    margin-top: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>

    

