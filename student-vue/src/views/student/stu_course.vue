<template>
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
      label="序号"
      sortable
      width="180"
      >
    
    </el-table-column>
    <el-table-column
      prop="sectionId"
      label="章节编号"
      sortable
      width="180"
      >
    
    </el-table-column>
    <el-table-column
      prop="sectionName"
      label="章节名称"
      sortable
      width="180"
       @click="add()"
      >
    </el-table-column>
    <el-table-column
      prop="teacherName"
      label="授课教师"
      >
    </el-table-column>
    <el-table-column
      prop="secAddtimeStr"
      label="添加日期"
      >
    </el-table-column>
    <el-table-column
      
      label="操作"
      >
      <template scope="scope">
        <el-button @click="handleMore(scope.$index, scope.row)" type="text">详细信息</el-button>
        
      </template>
    </el-table-column>
     
  </el-table>
  <!--工具条(分页)-->
		<el-col :span="24" class="toolbar">
			<el-button :plain="true" type="info" @click="forback">返回</el-button>
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

    <!--章节课程弹出界面-->
		<cardinfo ref="sectioninfo"></cardinfo>

    
    </section>
</template>

<script>

import { getCourse,getSectionListPage } from '../../api/api';
import Cardinfo from '../../components/course_info.vue';

  export default {
    		components: {
			cardinfo: Cardinfo
  		},
    data() {
      return {
       
        tableData: [],
      
        total: 0,//列表总条数
		    pageSize:10,//每页条数
		    currentPage:1,//当前页码
        listLoading: false,
      }
    },
    methods: {
      
	    //返回前一页
			forback() {
				this.$router.push({name: '课程界面',path:'/class_index',query:{courseId:this.$route.query.courseId}});
			},
        //显示课程详细界面
			handleMore: function (index, row) {
        
          console.log(row.sectionId);
				 this.$refs.sectioninfo.showCardDetail(row.sectionId);
			},

        //分页
        handleSizeChange(val) {
            this.pageSize = val;
            this.getSections();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getSections();
        },
        //获取章节列表
        getSections() {
          console.log("课程编号"+this.$route.query.courseId)
           let para = {
              pageSize:this.pageSize,
              currentPage:this.currentPage,
              courseId:this.$route.query.courseId
              	
            };
            this.listLoading = true;
            //NProgress.start();
            getSectionListPage(para).then((res) => {
              
              this.total = res.resData.total;
              this.tableData = res.resData.list;
              this.listLoading = false;
            });
		    },
       
     
    },
    mounted() {
      
      this.getSections();
      //this.getCourses();
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
