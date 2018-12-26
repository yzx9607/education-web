<template>
<section>
  <div class="block">
  <el-table
    :data="tableData"
    border
    fit
    stripe
    highlight-current-row
    current-change
    style="width: 985px">
    <el-table-column
      type="selection"
      width="50">
    </el-table-column>
    <el-table-column
      prop="enterIdCard"
      label="身份证"
      width="170">
    </el-table-column>
    <el-table-column
      prop="enterName"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="majorName"
      label="所报专业"
      show-overflow-tooltip
      >
    </el-table-column>
   
    <el-table-column
      prop="enterFirstScore"
      label="测试成绩"
      width="120">
    </el-table-column>
    <el-table-column label="操作"
     width="70">
      <template scope="scope">
        <el-button
          size="small"
          type="text"
          @click="handleMore(scope.$index, scope.row)">详情</el-button>
      </template>
    </el-table-column>
      </el-table>
        <!--工具条(分页)-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
          <!--卡号信息详情界面-->
        <cardinfo ref="cardinfo"></cardinfo>
    </section>
  </template>

<script>
  
  import util from '../../../common/js/util'
	import constant from '../../../common/js/constant'
  import { getCheckQueryGrade } from '../../../api/api'
  import Cardinfo from '../../../components/queryGradeMessage.vue'
	import BatchActive from '../../../components/batch_active.vue'

  export default {
      components: {
			cardinfo: Cardinfo		
  		}, 
    data() {
      return {
      
        filters: {
					name: ''
				},
        tableData: [],
				total: 100,//列表总条数
				pageSize:10,//每页条数
				currentPage:1,//当前页码
				listLoading: false,
        params:[]
      }
    },
       methods: {
         handleSizeChange(val) {
            this.pageSize = val;
            this.getaaaaa();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getaaaaa();
        },
         selsChange: function (sels) {
				this.sels = sels;
			},
         getaaaaa: function(){ 
           let para = {
            currentPage:this.currentPage,
            pageSize:this.pageSize,			
          };    
				getCheckQueryGrade(para).then((res) => {
          this.total = res.resData.total;
					this.tableData = res.resData.list;
          this.listLoading = false;
					//NProgress.done();
				});
        },
        //显示卡号详细界面
			handleMore: function (index, row) {
				 this.$refs.cardinfo.showCardDetail(row);
			},
    },
    mounted(){
        this.getaaaaa();
     }
  }
</script>