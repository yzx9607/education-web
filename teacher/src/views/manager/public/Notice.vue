<template>
    <el-col>
        <el-col style="margin: 15px 0px;">
            <el-input placeholder="请输入告标题" v-model="input" style="width: 217px; margin-right: 20px;">
            </el-input>
            <el-date-picker v-model="date1" type="date" placeholder="请输入公告开始日期" style="width: 217px; margin-right: 20px;">
            </el-date-picker>
            <el-date-picker v-model="date2" type="date" placeholder="请输入公告结束日期" style="width: 217px; margin-right: 20px;">
            </el-date-picker>
            <el-button type="primary" @click="handleIconClick" style="margin-right: 20px;">查询 </el-button>
            <el-button type="primary" @click="handleAdd" style="float: right;">增加公告 </el-button>
        </el-col>
        <el-col>
            <el-col class="block">
                <el-table :data="tableData" border style="width: 100%">
    
                    <el-table-column label="公告编号" prop="noticeId" width="180">
                    </el-table-column>
    
                    <el-table-column label="公告标题" prop="noticeName" width="180">
                    </el-table-column>
    
                    <el-table-column label="公告时间" prop="noticeDateStr" width="180">
                    </el-table-column>
    
                    <el-table-column label="针对人群" prop="noticeTarget" width="180">
                    </el-table-column>
    
                    <el-table-column label="创建时间" prop="notCreateDateStr" width="180">
                    </el-table-column>
    
                    <el-table-column label="修改时间" prop="notModifyDateStr" width="180">
                    </el-table-column>
    
                    <el-table-column label="修改人" prop="noticeModifyName" width="180">
                    </el-table-column>
    
                    <el-table-column label="删除状态" prop="noticeDel" width="180">
                    </el-table-column>
    
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
    
                <span class="demonstration"></span>
                <el-pagination style="float:right" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </el-col>
        </el-col>
    
        <!--新增界面-->
        <el-dialog title="增加公告信息" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="100px" ref="addForm">
                <el-form-item label="公告标题:" prop="noticeName">
                    <el-input v-model="addForm.noticeName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公告详情:" prop="noticeInfo">
                    <el-input v-model="addForm.noticeInfo" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公告时间:" prop="noticeDate">
                    <el-input placeholder="请输入时间格式：yyyy-mm-dd" v-model="addForm.noticeDate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="针对人群:" prop="noticeTarget">
                    <el-input v-model="addForm.noticeTarget" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="创建时间:" prop="noticeCreateDate">
                    <el-input placeholder="请输入时间格式：yyyy-mm-dd" v-model="addForm.noticeCreateDate" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-col slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">保存</el-button>
            </el-col>
        </el-dialog>
    
        <!--查看界面-->
        <el-dialog title="公告信息查看" v-model="updateFormVisible" :close-on-click-modal="false">
            <el-form :model="aaaaa" label-width="100px" ref="aaaaa">
                <el-form-item label="公告编号:" prop="noticeId">
                    <el-input v-model="aaaaa.noticeId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公告标题:" prop="noticeName">
                    <el-input v-model="aaaaa.noticeName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公告详情:" prop="noticeInfo">
                    <el-input v-model="aaaaa.noticeInfo" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公告时间:" prop="noticeDateStr">
                    <el-input v-model="aaaaa.noticeDateStr" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="针对人群:" prop="noticeTarget">
                    <el-input v-model="aaaaa.noticeTarget" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="创建时间:" prop="notCreateDateStr">
                    <el-input v-model="aaaaa.notCreateDateStr" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="修改时间:" prop="notModifyDateStr">
                    <el-input v-model="aaaaa.notModifyDateStr" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="修改人:" prop="noticeModifyName">
                    <el-input v-model="aaaaa.noticeModifyName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="删除状态:" prop="noticeDel">
                    <el-input v-model="aaaaa.noticeDel" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-col slot="footer" class="dialog-footer">
                <el-button @click.native="updateFormVisible = false">取消</el-button>
            </el-col>
        </el-dialog>
    </el-col>
</template>

<script>
import util from '../../../common/js/util'
import { getdata2, querynotice, addnotice, getlikedata } from '../../../api/api';
export default {
    data() {
        return {
            total: 0,
            currentPage: 1,
            pageSize: 10,
            input: '',
            date1: '',
            date2: '',
            tableData: [],
            addFormVisible: false,//新增界面是否显示
            updateFormVisible: false,//新增界面是否显示
            addLoading: false,
            aaaaa: [],
            //新增界面数据
            addForm: {
                noticeName: '',
                noticeInfo: '',
                noticeTarget: '',
                noticeDate: '',
                noticeCreateDate: ''
            },
            selectForm: {
                noticeId: '',
                noticeName: '',
                noticeInfo: '',
                noticeDateStr: '',
                noticeTarget: '',
                noticeCreateDateStr: '',
                noticeModifyDateStr: '',
                noticeModifyName: '',
                noticeDel: '',
            },
        }
    },
    mounted() {
        this.handleIconClick();
    },
    methods: {
        // 分页组件
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.handleIconClick();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.handleIconClick();
        },

        //根据ID查询
        handleEdit(index, row) {
            let para = { noticeId: row.noticeId }
            this.updateFormVisible = true;
            querynotice(para).then((res) => {
                //alert("ID" + para.noticeId)
                this.aaaaa = res.resData;
                //alert(aaaaa.noticeName);

            })
        },

        //模糊查询
        handleIconClick() {
            let para = {
                pageNo: this.currentPage,
                pageSize: this.pageSize
            };

            if (this.input != '') {
                para.noticeName = this.input;
            }
            if (this.date1 != '' && this.date2 != '') {
                para.startDate = util.formatDate.format(new Date(this.date1), 'yyyy-MM-dd');     // 开始日期
                para.endDate = util.formatDate.format(new Date(this.date2), 'yyyy-MM-dd');     // 结束日期
            }

            getlikedata(para).then((res) => {
               // alert("状态 " + res.resCode);
                if (res.resCode != 0) {
                    this.$message({
                        message: res.resMsg,
                        type: 'error'
                    });
                } else {
                    this.$message({
                        message: res.resMsg,
                        type: 'success'
                    });
                    this.tableData = res.resData.list;
                    this.total = res.resData.total;
                }
            });
        },

        //添加公告
        handleAdd() {
            this.addFormVisible = true;
            this.addForm = {
                noticeName: '',
                noticeInfo: '',
                noticeTarget: '',
                noticeDate: '',
                noticeCreateDate: ''
            };
        },
        addSubmit: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        let para = Object.assign({}, this.addForm);
                        addnotice(para).then((res) => {
                            this.addLoading = false;
                            if (res.resCode != 0) {
                                this.$message({
                                    message: res.resMsg,
                                    type: 'error'
                                });
                            } else {
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getdata();
                            }
                        });
                    });
                }
            });
        },

    }
}
</script>