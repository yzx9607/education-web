<template>
  <section>
    <div class="block">
      <el-table 
        :data="tableData" 
        border
        fit
        stripe
        highlight-current-row
        v-loading="listLoading" 
        @selection-change="selsChange" 
        current-change
        style="width:60%">
        <el-table-column 
          prop="noticeId" 
          label="序号" 
          width="170">
        </el-table-column>
         <el-table-column 
          label="公告名称" 
          show-overflow-tooltip
          >
          <template scope="scope">
            <el-button size="small" type="text" @click="handleMore(scope.$index, scope.row)">{{scope.row.noticeName}}</el-button>
          </template>
        </el-table-column>
        </el-table-column>
        <el-table-column 
          prop="noticeDateStr" 
          label="发布日期" 
          width="120"
          >
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
  import { getMasterIndex } from '../../../api/api'
  import Cardinfo from '../../../components/queryMasterIndex.vue'
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
        params:[],
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
				getMasterIndex(para).then((res) => {
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