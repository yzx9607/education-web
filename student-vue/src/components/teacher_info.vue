<template>
		<!--卡详情界面-->
		<el-dialog title="教师评价信息" v-model="teaDetailVisible" :close-on-click-modal="false">
		<el-table
            :data="tableData5"
            style="width: 100%"
            >
            <el-table-column type="expand">
                <template scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="课程名称">
                    <span>{{ props.row.courseName}}</span>
                    </el-form-item>
                    <el-form-item label="老师名称">
                    <span>{{ props.row.teacherRealName}}</span>
                    </el-form-item>
                    <el-form-item label="教师评价">
                    <span>{{ props.row.teaEvaContent }}</span>
                    </el-form-item>
                </el-form>
                </template>
            </el-table-column>
            <el-table-column
                type="index"
                width="100"
                >
            </el-table-column>
            <el-table-column
                label="课程名称"
                prop="courseName">
            </el-table-column>
            <el-table-column
                label="老师名称"
                prop="teacherRealName">
            </el-table-column>
            <el-table-column
                label="日期"
                prop="teaEvaDateStr">
            </el-table-column>
        </el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="teaDetailVisible = false">取消</el-button>
			</div>

		</el-dialog>
</template>

<script>
import { getTeaEvaInfo } from '../api/api';
	export default {
		data() {
			return {
            tableData5: [
                
            ],
            teaDetailVisible:false,
			}
		},
		methods: {
            showCardDetail(val,val1) {
                let para = {
                stuId:val1,
                teaId:val
                //pageSize: this.pageSize,
               // pageNum: this.currentPage
            };
            getTeaEvaInfo(para).then((res) => {
				this.tableData5=res.resData;
				});
				this.teaDetailVisible=true;
                
			}			
		}
	}

</script>
<style scoped>
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