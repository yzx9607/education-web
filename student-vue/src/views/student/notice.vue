<template>

<section>
<el-table
    :data="tableData5"
    style="width: 100%">
    <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="公告标题">
            <span>{{ props.row.noticeName }}</span>
          </el-form-item>
          <el-form-item label="公告时间">
            <span>{{ props.row.noticeDateStr }}</span>
          </el-form-item>
          <el-form-item label="创建时间">
            <span>{{ props.row.notCreateDateStr }}</span>
          </el-form-item>
          <el-form-item label="教师姓名">
            <span>{{ props.row.teacherRealName }}</span>
          </el-form-item>
          <el-form-item label="针对人群">
            <span>{{ props.row.noticeTarget }}</span>
          </el-form-item>
          <el-form-item label="公告详情">
            <span>{{ props.row.noticeInfo }}</span>
          </el-form-item>
          <el-form-item label="修改时间">
            <span>{{ props.row.notModifyDateStr }}</span>
          </el-form-item>
          <el-form-item label="修改人">
            <span>{{ props.row.noticeModifyName }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="公告编号"
      prop="noticeId">
    </el-table-column>
    <el-table-column
      label="公告标题"
      prop="noticeName">
    </el-table-column>
    <el-table-column
      label="教师名称"
      prop="teacherRealName">
    </el-table-column>
  </el-table>  

  <!--分页组件-->
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
  import { getNotices } from '../../api/api';
  export default {
    data() {
      return {
        tableData5: [],
        total: 0,//列表总条数
				pageSize:15,//每页条数
				currentPage:1,//当前页码
      }
    },
    mounted() {
      this.getSelectNotices();
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
				this.getSelectNotices();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getSelectNotices();
			},
      getSelectNotices() {
        let para = {
        pageSize:this.pageSize,
        pageNum:this.currentPage			
        };
      para = Object.assign(para, this.filters);
      getNotices(para).then((res) => {
        this.total = res.resData.total;
        this.tableData5 = res.resData.noticeList;
      });
        },
    },
    
  }
</script>