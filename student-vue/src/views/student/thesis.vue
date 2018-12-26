<template>
    <el-row>
        <el-col>
            <!--论文规范-->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="论文规范" name="first">
                    <el-col>
                        <el-table :data="tableData" v-loading.body="listLoading" border style="width: 100%">
                            <el-table-column fixed prop="layoutId" label="论文规范编号" width="350">
                            </el-table-column>
                            <el-table-column prop="layoutName" label="标题" width="350">
                            </el-table-column>
                            <el-table-column prop="layoutUpdateStr" label="上传日期" width="350">
                            </el-table-column>
                            <el-table-column fixed="right" prop="layoutContent" label="操作" width="350">
                                <template scope="scope">
                                    <el-button @click="download(scope.$index, scope.row)" type="text" size="small">下载</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
    
                    <!--分页-->
                    <el-col>
                        <el-pagination style="float: right; margin: 12px 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 40, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                    </el-col>
                </el-tab-pane>
    
                <el-tab-pane label="学生论文" name="second">
                    <el-col style="margin-bottom: 15px;">
                        <el-button @click="dialogVisible = true" type="primary">上传论文</el-button>
                    </el-col>
    
                    <!--学生论文-->
                    <el-col>
                        <el-col>
                            <el-table :data="tableData1" v-loading.body="listLoading1" border style="width: 100%">
                                <el-table-column fixed prop="thesisId" label="论文编号" width="200">
                                </el-table-column>
                                <el-table-column prop="thesisTitle" label="论文题目" width="250">
                                </el-table-column>
                                <el-table-column prop="thesisScore" label="论文成绩" width="200">
                                </el-table-column>
                                <el-table-column prop="thesisStateStr" label="审核状态" width="200">
                                </el-table-column>
                                <el-table-column prop="thesisDateStr" label="提交日期" width="200">
                                </el-table-column>
                                <el-table-column fixed="right" prop="thesisAddress" label="操作" width="200">
                                    <template scope="scope">
                                        <el-button @click="download(scope.$index, scope.row)" type="text" size="small">下载</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
    
                        <!--分页-->
                        <el-col>
                            <el-pagination style="float: right; margin: 12px 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1" :page-sizes="[10, 20, 40, 100]" :page-size="pageSize1" layout="total, sizes, prev, pager, next, jumper" :total="total1">
                            </el-pagination>
                        </el-col>
                    </el-col>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    
        <el-col>
            <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
                <el-upload class="upload-demo" ref="upload" action="api/student/saveThesis" :file-list="fileList" :on-preview="handlePreview" :on-remove="handleRemove" :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                    <el-col style="margin:20px 0px;" slot="tip" class="el-upload__tip">一次只能上传一个文件</el-col>
                </el-upload>
            </el-dialog>
        </el-col>
    </el-row>
</template>

<script>

import { listThesisLayout, listThesis, saveThesis, download, down2 } from '../../api/api'

export default {
    data() {
        return {
            activeName: 'first',    //Tab当前页
            fileList: [],
            dialogImageUrl: '',
            dialogVisible: false, dialogVisible1: false,    //弹出层
            total: 0, total1: 0,    //总数据条数
            pageSize: 10, pageSize1: 10,    //每页数据条数
            currentPage: 1, currentPage1: 1,    //当前页
            listLoading: false, listLoading1: false,    //加载器
            tableData: [], tableData1: []    //表格
        }
    },
    methods: {
        // 获取论文规范
        getLayout() {
            this.listLoading = true;
            let para = {
                pageNo: this.currentPage,    //当前页
                pageSize: this.pageSize    //每页记录数
            };

            listThesisLayout(para).then((res) => {
                this.listLoading = false;

                //后台数据
                this.total = res.resData.total;
                this.pageSize = res.resData.pageSize;
                this.tableData = res.resData.list;
                if (res.resCode == 0) {
                    this.$message(res.resMsg);
                } else {
                    this.$message.error(res.resMsg);
                }
            });
        },

        // 获取论文
        getThesis() {
            this.listLoading1 = true;
            let para = {
                pageNo: this.currentPage1,    //当前页
                pageSize: this.pageSize1    //每页记录数
            };

            listThesis(para).then((res) => {
                this.listLoading1 = false;

                //后台数据
                this.total1 = res.resData.total;
                this.pageSize1 = res.resData.pageSize;
                this.tableData1 = res.resData.list;
                if (res.resCode == 0) {
                    this.$message(res.resMsg);
                } else {
                    this.$message.error(res.resMsg);
                }
            });
        },

        // 文件上传组件
        submitUpload() {
            this.$refs.upload.submit();
            // this.saveThesis();
            this.getThesis();
        },
        // 提交论文
        saveThesis() {
            this.dialogVisible = true;
            let para = {};

            saveThesis(para).then((res) => {
                this.dialogVisible = false;
                if (res.resCode != 0) {
                    this.$message.error(res.resMsg);
                } else {
                    this.$message(res.resMsg);
                }
            });
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                    this.getThesis();
                })
                .catch(_ => { });
        },
        // 下载
        download(index, row) {
            if (this.activeName == 'first') {
                location.href = "/api/student/download?fileName=" + row.layoutContent;
            }
            if (this.activeName == 'second') {
                location.href = "/api/student/download?fileName=" + row.thesisAddress;
            }
        },

        // 分页
        handleSizeChange(val) {
            if (this.activeName == 'first') {
                this.pageSize = val;
                console.log(`每页 ${val} 条`);
                // 调用获取论文规范
                this.getLayout();
            }
            if (this.activeName == 'second') {
                this.pageSize1 = val;
                console.log(`每页 ${val} 条`);
                // 调用获取论文
                this.getThesis();
            }
        },
        handleCurrentChange(val) {
            if (this.activeName == 'first') {
                this.currentPage = val;
                console.log(`当前页: ${val}`);
                // 调用获取论文规范
                this.getLayout();
            }
            if (this.activeName == 'second') {
                this.currentPage1 = val;
                console.log(`每页 ${val} 条`);
                // 调用获取论文
                this.getThesis();
            }
        },
        
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },

        // Tabs 标签页组件
        handleClick(tab, event) {
            console.log(event);
            if (this.activeName == 'first') {
                this.getLayout();
            }
            if (this.activeName == 'second') {
                this.getThesis();
            }
        }
    },
    mounted() {
        this.getLayout();
    }

}
</script>