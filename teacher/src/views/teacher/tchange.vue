<template>
    <div>
        <!--工具条 -->
        <el-col :span="24" class="toolbar" style="padding-bottom: 20px;">
            <el-row type="flex" class="row-bg" justify="space-around" :model="filters">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-input v-model="filters.studentId" placeholder="请输入学号" style="width:200px; margin-lift:200px;"></el-input>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-light">
                        <el-input v-model="filters.studentName" placeholder="请输入姓名" style="width:200px; margin-right:200px;">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" icon="serch" v-on:click="getData">搜索</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <!--列表 -->
        <el-table :data="tableData" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column prop="studentId" label="学生编号">
            </el-table-column>
    
            <el-table-column prop="studentName" label="学生姓名">
            </el-table-column>
    
            <el-table-column prop="studentSex" label="学生性别">
            </el-table-column>
    
            <el-table-column prop="transactionText" label="申请理由">
            </el-table-column>
    
            </el-table-column>
            <el-table-column prop="transactionStartStr" label="开始时间" sortable>
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span>{{ scope.row.transactionStartStr }}</span>
                </template>
            </el-table-column>
    
            <el-table-column prop="transactionCurrState" label="现状">
            </el-table-column>
    
            <el-table-column prop="transactionResState" label="审核状态">
            </el-table-column>
    
            <el-table-column fixed="right" label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button @click.native.prevent="handleDel(scope.$index, scope.row)" type="danger" size="small">移除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-col :span="24" class="toolbar">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    
        <!--编辑界面-->
        <el-dialog title="异动修改" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="学生姓名：" prop="studentName">
                    <el-input v-model="editForm.studentName" auto-complete="off" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="学生性别：" prop="studentSex">
                    <el-input v-model="editForm.studentSex" auto-complete="off" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="申请理由：" prop="transactionText">
                    <el-input v-model="editForm.transactionText" auto-complete="off" disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="学生现状：" prop="transactionCurrState">
                    <el-input v-model="editForm.transactionCurrState" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="审核状态：" prop="transactionResState">
                    <el-input v-model="editForm.transactionResState" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { findMove, editMove, remChange } from '../../api/api';
export default {
    data() {

        return {
            pickerOptions0: {
                disabledDate(time) {
                    return false;
                }
            },
            filters: {
                studentId: '',
                studentName: ''
            },
            tableData: [],
            id: '',
            name: '',
            total: 0,//列表总条数
            pageSize: 10,//每页条数
            currentPage: 1,//当前页码
            listLoading: false,
            sels: [],//列表选中列

            editFormVisible: false,//编辑界面是否显示
            editLoading: false,
            editFormRules: {
                studentName: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                studentSex: [
                    { required: true, message: '请输入性别', trigger: 'blur' }
                ],
                transactionText: [
                    { required: true, message: '请输入申请理由', trigger: 'blur' }
                ],
                transactionCurrState: [
                    { required: true, message: '请输入学生现状', trigger: 'blur' }
                ],
                transactionResState: [
                    { required: true, message: '请输入审核状态', trigger: 'blur' }
                ],
            },
            //编辑界面数据
            editForm: {
                studentName: '',
                studentSex: '',
                transactionText: '',
                transactionCurrState: '',
                transactionResState: ''
            },
        }
    },
    methods: {
        //获取用户列表
        getData() {
            let para = {
                pageSize: this.pageSize,
                pageNo: this.currentPage
            };

            // 判断studentId是否为空
            if (this.filters.studentId != '') {
                para.studentId = this.filters.studentId;
            }
            // 判断studentName是否为空
            if (this.filters.studentName != '') {
                para.studentName = this.filters.studentName;
            }

            // para = Object.assign(para, this.filters);
            para.transactionStartStr = (!para.transactionStartStr || para.transactionStartStr == '') ? '' : util.formatDate.format(new Date(para.transactionStartStr), 'yyyy-MM-dd');

            this.loading = true;
            findMove(para).then((res) => {
                this.loading = false;
                if (res.resCode != 0) {
                    this.$message.error(res.resMsg);
                } else {
                    this.$message(res.resMsg);
                    this.tableData = res.resData.list;
                    this.total = res.resData.total;
                    this.pageSize = res.resData.pageSize;
                }
            });
        },

        //删除
        handleDel: function (index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                //this.listLoading = true;
                //NProgress.start();
                let para = { transactionId: row.transactionId };
                remChange(para).then((res) => {
                    this.listLoading = false;
                    //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    // this.getChange();
                    this.getData(1, pageSize);
                });
            }).catch(() => {

            });
        },
        //显示编辑界面
        handleEdit: function (index, row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
        },

        //编辑
        editSubmit: function () {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        //NProgress.start();
                        let para = Object.assign({}, this.editForm);
                        editMove(para).then((res) => {
                            this.editLoading = false;
                            //NProgress.done();
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.getData();
                        });
                    });
                }
            });
        },

        // 列选择
        selsChange: function (sels) {
            this.sels = sels;
        },

        // 分页组件
        handleSizeChange(val) {
            console.log('每页 ${val} 条');
            this.pageSize = val;
            this.getData();
        },
        handleCurrentChange(val) {
            console.log('当前页：${val}');
            this.currentPage = val;
            this.getData();
        },
    },
    mounted() {
        this.getData();
    }
};
</script>