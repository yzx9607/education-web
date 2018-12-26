<template>

<section>
<el-table
    :data="tableData"
    border
    style="width: 100%;margin:0 auto;text-align:center">


    <el-table-column
      label="资料ID"
      width="160">
      <template scope="scope">
         <span style="margin-left: 10px">{{ scope.row.resourceId }}</span>
      </template>
    </el-table-column>

    <el-table-column    
      label="资料名称"
      style="width: 7%">
	<template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.resourceName }}</span>
      </template>
    </el-table-column>

    <el-table-column
    label="专业名称"
      style="width: 7%">
      <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.courseName }}</span>
      </template>
    </el-table-column>

    <el-table-column
    label="教师姓名"
      style="width: 7%">
      <template scope="scope">
         <el-popover trigger="hover" placement="top">
          <p>教师姓名: {{ scope.row.teacherRealName }}</p>
          <p>资料名称: {{ scope.row.resourceName }}</p>
          <div slot="reference" class="name-wrapper">
        <el-tag>{{ scope.row.teacherRealName }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>



    <el-table-column
      label="资料标题"
      style="width: 25%">
      <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.resourceTitle }}</span>
      </template>
    </el-table-column>


    <el-table-column
    label="资料描述"
      style="width: 7%">
      <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.resourceDescribe }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="访问次数"
      style="width: 7%">
      <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.resourceFrequence }}</span>
      </template>
    </el-table-column>



   <el-table-column label="操作">
      <template scope="scope">
        <el-button type="primary" @click="forback">下载</el-button>
      </template>
    </el-table-column>
  </el-table>



  <el-col :span="24" class="toolbar" >
    <el-button :plain="true" type="info" @click="forback">返回</el-button>
			<!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="[15, 30, 45, 60]"
			:page-size="pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
			style="float:right">
			</el-pagination>
		</el-col>
</section>  
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  import { getStudy } from '../../api/api';
  export default {
    data() {
      return {
        tableData: [],
        total: 0,//列表总条数
		pageSize:15,//每页条数
		currentPage:1,//当前页码
      }
    },
    mounted() {
      this.getStudys();
	},
    methods: { 

      //返回前一页
			forback() {
				this.$router.push({name: '课程界面',path:'/class_index',query:{courseId:this.$route.query.courseId}});
			},
      handleIconClick(ev) {
      	console.log(ev);
    	},
	  handleSizeChange(val) {
		this.pageSize = val;
		this.getStudys();
	  },
	  handleCurrentChange(val) {
		this.currentPage = val;
		this.getStudys();
	  },
      getStudys() {
        let para = {
        pageSize:this.pageSize,
        pageNum:this.currentPage			
      };
      
        para = Object.assign(para, this.filters);
        getStudy(para).then((res) => {
          console.log(res.resData.list);
            this.total = res.resData.total;
            this.tableData = res.resData.list;
        });
      },
    },
    
  }
</script>