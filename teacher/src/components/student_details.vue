<template>
    <!--卡详情界面-->
    <el-dialog title="学生详情信息" v-model="studentDetailVisible" :close-on-click-modal="false">
        <el-form label-width="100px" :model="studentDetail" ref="studentDetail">
            <div style="overflow: auto; width: 100%;">
                <table class="border-table">
                    <tr>
                        <td class="spec alt">学号：</td>
                        <td>{{studentDetail.studentId}}</td>
                        <td class="alt">姓名</td>
                        <td>{{studentDetail.studentName}}</td>
                        <td class="alt">性别</td>
                        <td>{{studentDetail.studentSex}}</td>
                    </tr>
                    <tr>
                        <td class="spec alt">出生年月日：</td>
                        <td>{{studentDetail.stuBirth}}</td>
                        <td class="alt">民族：</td>
                        <td>{{studentDetail.studentNation}}</td>
                        <td class="spec alt">身份证：</td>
                        <td>{{studentDetail.studentIdcard}}</td>
                    </tr>
    
                    <td class="alt">毕业院校</td>
                    <td>{{studentDetail.studentGraduate}}</td>
                    <td class="alt">升学类型</td>
                    <td>{{studentDetail.studentType}}</td>
                    <td class="alt">所报专业</td>
                    <td>{{studentDetail.majorName}}</td>
                    </tr>
    
                    <tr>
                        <td class="spec alt">第一次缴费</td>
                        <td>{{studentDetail.firstMoney}}</td>
                        <td class="alt">第二次缴费</td>
                        <td>{{studentDetail.secondMoney}}</td>
                        <td class="alt">入学日期</td>
                        <td>{{studentDetail.studentDate}}</td>
                    </tr>
                    <tr>
                        <td class="spec alt">家庭住址</td>
                        <td>{{studentDetail.stuAddress}}</td>
                        <td class="alt">联系电话</td>
                        <td>{{studentDetail.studentPhone}}</td>
                        <td class="alt">是否毕业</td>
                        <td>{{studentDetail.studentGraduation}}</td>
                    </tr>
                </table>
            </div>
    
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click.native="studentDetailVisible = false">返回</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { getStudentDetail } from '../api/api';
export default {
    data() {
        return {
            studentDetailVisible: false,
            queryLoading: false,
            studentDetail: {
                studentId: '',     			//学号
                studentName: '',    		//名字
                studentSex: '',     		//性别
                studentNation: '', 			//民族
                stuBirth: '',    			//出生年月日
                studentIdcard: '',   		//身份证
                studentGraduate: '',		//毕业院校
                studentType: '',     		//多选类型
                majorName: '',      		//所选专业
                studentPhone: '',    		//联系电话
                stuAddress: '',   			//家庭住址
                firstMoney: '',             //第一次交学费
                secondMoney: '',            //第二次交学费
                studentDate: '',            //入学日期
                studentGraduation: ''       //是否毕业
            }
        }
    },
    methods: {




        showStudentDetail(val) {
            //AJAX异步去数据库查询卡号详细信息
            this.studentDetail.studentId = val;
            let para = { studentId: this.studentDetail.studentId };
            getStudentDetail(para).then((res) => {
                this.queryLoading = false;
                let { resMsg, resCode } = res;
                if (resCode !== 0) {
                    this.queryLoading = false;
                    this.$message({
                        message: resMsg,
                        type: 'error'
                    });
                } else {
                    this.studentDetail = res.resData;
                }
            });
            this.studentDetailVisible = true;
        }
    }
}

</script>
<style scoped>
.el-row {
    margin-bottom: 0px;
    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 0px;
    border: 1px solid #d3dce6;
}

.bg-purple-dark {
    background: red;
}

.bg-purple {
    background: #FFF;
}

.bg-purple-light {
    color: #009966;
    min-height: 36px;
    line-height: 36px;
}

.grid-content {
    border-radius: 0px;
    border: 0px;
    min-height: 36px;
    line-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: red;
}

.border-table {
    border-collapse: collapse;
    border: none;
    width: 100%;
}

.border-table td {
    border: solid #dfe8ec 1px;
    background: #fff;
    font-size: 14px;
    padding: 6px 6px 6px 12px;
    color: #009966;
    line-height: 28px;
}

td.alt {
    background: #EFF2F7;
    color: #8492A6;
}
</style>