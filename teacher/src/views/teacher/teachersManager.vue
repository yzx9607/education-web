<template>
<!--教师管理 冯云威-->
    <section>
        <!--分页显示教师数据-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="teacherForm">
                <el-form-item>
                    <el-input v-model="teacherForm.teacherId" placeholder="请输入教师编号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="teacherForm.teacherRealName" placeholder="请输入教师姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getTeachers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addTeacherView">添加教师</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--遍历全部的教师信息-->
        <el-table :data="teachers" border v-loading="listLoading" style="width: 100%">
            <el-table-column fixed type="index" width="100">
            </el-table-column>
            <el-table-column prop="teacherId" label="教师编号" width="120">
            </el-table-column>
            <el-table-column prop="teacherRealName" label="教师姓名" width="120">
            </el-table-column>
            <el-table-column prop="teacherSex" label="性别" width="120">
            </el-table-column>
            <el-table-column prop="courseName" label="所属课程" width="120">
            </el-table-column>
            <el-table-column prop="teacherSchool" label="毕业学校" width="120">
            </el-table-column>
            <el-table-column prop="teacherRecord" label="学历" width="120">
            </el-table-column>
            <el-table-column prop="teacherBirthStr" label="出生年月" width="200">
            </el-table-column>
            <el-table-column prop="teacherAdderss" label="家庭地址" width="250">
            </el-table-column>
            <el-table-column prop="teacherEmail" label="邮编" width="200">
            </el-table-column>
            <el-table-column prop="teacherPhone" label="手机号码" width="200">
            </el-table-column>
            <el-table-column label="操作" width="250" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="TeacherDeail(scope.$index, scope.row)">详情</el-button>
                    <el-button :plain="true" type="success" size="small" @click="teacherEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-col :span="24" class="toolbar">
            <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <!--编辑界面-->
        <el-dialog title="修改教师信息" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form ref="editForm" :model="editForm" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="姓名">
                                <el-input v-model="editForm.teacherRealName" placeholder="请输入姓名"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <el-form-item label="课程名称">
                                <el-input v-model="editForm.courseName" placeholder="请输入课程名称"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="出生日期">
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.teacherBirthStr" style="width: 170%;"></el-date-picker>
                                </el-col>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <el-form-item label="性别">
                                <el-radio-group v-model="editForm. teacherSex">
                                    <el-radio label="男"></el-radio>
                                    <el-radio label="女"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
    
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="政治面貌" style="width: 170%;">
                                <el-select v-model="editForm.teacherPolitical" placeholder="请选择">
                                    <el-option label="党员" value="dangyuan"></el-option>
                                    <el-option label="团员" value="tuanyuan"></el-option>
                                    <el-option label="群众" value="qunzhong"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <el-form-item label="民族">
                                <el-input v-model="editForm.teacherNational" placeholder="请输入民族"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="最高学历">
                                <el-input v-model="editForm.teacherRecord" placeholder="请输入最高学历"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <el-form-item label="籍贯">
                                <el-input v-model="editForm.teacherNative" placeholder="请输入籍贯"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="毕业学校">
                                <el-input v-model="editForm.teacherSchool" placeholder="请输入毕业学校"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <el-form-item prop="email" label="邮箱" :rules="[
                                            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                                            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                                            ]">
                                <el-input v-model="editForm.teacherEmail" placeholder="请输入正确的邮箱地址"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="联系方式" prop="tel" :rules="[
                                        { required: true, message: '不能为空'},
                                        { type: 'number', message: '必须为数字值'}
                                        ]">
                                <el-input type="tel" v-model.number="editForm.teacherPhone" auto-complete="off" placeholder="请输入正确联系方式"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
    
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="最高学位">
                                <el-input v-model="editForm.teacherDegree" placeholder="请输入最高学位"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="地址">
                                <el-input v-model="editForm.teacherAdderss" placeholder="请输入地址"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <el-form-item label="角色">
                                <el-select v-model="editForm.roleDesc" placeholder="请选择角色">
                                    <el-option v-for="item in roleDesc" :label="item" :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
    
                <el-row>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="教师类别">
                                <el-select v-model="editForm.teacherCategory" placeholder="请选择教师类别">
                                    <el-option label="初级教师" value="初级教师"></el-option>
                                    <el-option label="中级教师" value="中极教师"></el-option>
                                    <el-option label="高级教师" value="高级教师"></el-option>
                                    <el-option label="副教授" value="副教授"></el-option>
                                    <el-option label="教授" value="教授"></el-option>
                                    <el-option label="副院士" value="副院士"></el-option>
                                    <el-option label="院士" value="院士"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple-light">
                            <el-form-item label="密码">
                                <el-input type="password" v-model="editForm.teacherPwd" auto-complete="off" placeholder="请输入密码"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-form-item label="进修情况">
                    <el-input type="textarea" v-model="editForm.teacherTranning"></el-input>
                </el-form-item>
                <el-form-item label="曾获奖励">
                    <el-input type="textarea" v-model="editForm.teacherReward"></el-input>
                </el-form-item>
                <el-form-item label="曾获处分">
                    <el-input type="textarea" v-model="editForm.teacherPunish"></el-input>
                </el-form-item>
                <el-form-item label="个人简介">
                    <el-input type="textarea" v-model="editForm.teacherDetail"></el-input>
                </el-form-item>
              
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit">保存</el-button>
            </div>
        </el-dialog>
    
        <!--教师详情页面-->
        <el-dialog title="教师详情" v-model="teacherDeailVisible" :close-on-click-modal="false">
            <el-form label-width="100px" :model="teacherDeail" ref="teacherDeail">
                <div style="overflow: auto; width: 100%;">
                    <table class="border-table">
                        <tr>
                            <td class="spec alt">教师相片：</td>
                            <td>
                                <img :src="teacherDeail.teacherPhoto" class="avatar">
                            </td>
                        </tr>
                        <tr>
                            <td class="spec alt">教师编号：</td>
                            <td>{{teacherDeail.teacherId}}</td>
                            <td class="alt">教师姓名:</td>
                            <td>{{teacherDeail.teacherRealName}}</td>
                            <td class="alt">出生年月:</td>
                            <td>{{teacherDeail.teacherBirthStr}}</td>
                        </tr>
                        <tr>
                            <td class="spec alt">教师性别：</td>
                            <td>{{teacherDeail.teacherSex}}</td>
                            <td class="alt">政治面貌：</td>
                            <td>{{teacherDeail.teacherPolitical}}</td>
                            <td class="alt">民族：</td>
                            <td>{{teacherDeail.teacherNational}}</td>
                        </tr>
                        <tr>
                            <td class="spec alt">学历：</td>
                            <td>{{teacherDeail.teacherRecord}}</td>
                            <td class="alt">籍贯：</td>
                            <td>{{teacherDeail.teacherNative}}</td>
                            <td class="alt">毕业院校：</td>
                            <td>{{teacherDeail.teacherSchool}}</td>
                        </tr>
                        <tr>
                            <td class="spec alt">学位：</td>
                            <td>{{teacherDeail.teacherDegree}}</td>
                            <td class="alt">邮编：</td>
                            <td>{{teacherDeail.teacherEmail}}</td>
                            <td class="alt">手机号码：</td>
                            <td>{{teacherDeail.teacherPhone}}</td>
                        </tr>
                        <tr>
                            <td class="spec alt">地址：</td>
                            <td>{{teacherDeail.teacherAdderss}}</td>
                            <td class="alt">教师级别：</td>
                            <td>{{teacherDeail.teacherCategory}}</td>
                            <td class="alt">进修情况：</td>
                            <td>{{teacherDeail.teacherTranning}}</td>
                        </tr>
                        <tr>
                            <td class="spec alt">曾获奖励：</td>
                            <td>{{teacherDeail.teacherReward}}</td>
                            <td class="alt">曾获处分：</td>
                            <td>{{teacherDeail.teacherPunish}}</td>
                            <td class="alt">个人简介：</td>
                            <td>{{teacherDeail.teacherDetail}}</td>
                        </tr>
                    </table>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="teacherDeailVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<style>
.el-select .el-input {
    width: 150px;
}
</style>
<script>
import { getPageTeachers,getRole,updateTeacherInfo,delTeacher} from '../../api/api';
export default {


    data() {
        return {
            teacherForm: {
                teacherId: '',
                teacherRealName: ''
            },
            roleDesc:[],
            //编辑页面是否显示
            editFormVisible: false,
            //编辑页面数据
            editForm: {
                courseName:'',
                teacherPwd: '',
                teacherId: '',
                teacherRealName: '',
                teacherBirthStr: '',
                teacherSex: '',
                teacherPolitical: '',
                teacherNational: '',
                teacherRecord: '',
                teacherNative: '',
                teacherSchool: '',
                teacherDegree: '',
                teacherEmail: '',
                teacherPhone: '',
                teacherAdderss: '',
                teacherCategory: '',
                teacherTranning: '',
                teacherReward: '',
                teacherPunish: '',
                teacherDetail: '',
                roleDesc:''
            },
            //教师详情页面是否显示
            teacherDeailVisible: false,
            //教师详情
            teacherDeail: {
                teacherPhoto: '',
                teacherId: '',
                teacherRealName: '',
                teacherBirthStr: '',
                teacherSex: '',
                teacherPolitical: '',
                teacherNational: '',
                teacherRecord: '',
                teacherNative: '',
                teacherSchool: '',
                teacherDegree: '',
                teacherEmail: '',
                teacherPhone: '',
                teacherAdderss: '',
                teacherCategory: '',
                teacherTranning: '',
                teacherReward: '',
                teacherPunish: '',
                teacherDetail: ''
            },
            //分页信息
            teachers: [],
            total: 0,//列表总条数
            pageSize: 10,//每页条数
            currentPage: 1,//当前页码
            listLoading: false,
        }
    },
    methods: {
        addTeacherView: function () {
            this.$router.push('/add_teachers');
             
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getTeachers();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getTeachers();
        },
        //分页显示教师信息+模糊查询
        getTeachers() {
            let para = {
                teacherId: this.teacherForm.teacherId,
                teacherRealName: this.teacherForm.teacherRealName,
                pageSize: this.pageSize,
                pageNum: this.currentPage
            };
            this.listLoading = true;
            //NProgress.start();
            getPageTeachers(para).then((res) => {
                this.total = res.resData.total;
                this.teachers = res.resData.list;
                this.listLoading = false;
                //NProgress.done();
            });
        },
        //显示编辑界面
        teacherEdit: function (index, row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
            getRole().then((res) => {
                this.roleDesc = res.resData;
            });
        },
        //显示教师详情
        TeacherDeail: function (index, row) {
            this.teacherDeailVisible = true;
            this.teacherDeail = Object.assign({}, row);
        },
        editSubmit: function () {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
                let para = {};
                para.teacherRealName=this.editForm.teacherRealName;
                para.teacherId=this.editForm.teacherId;
                para.teacherSex=this.editForm.teacherSex;
                para.teacherSchool=this.editForm.teacherSchool;
                para.teacherRecord=this.editForm.teacherRecord;
                para.teacherBirth=this.editForm.teacherBirthStr;
                para.teacherAdderss=this.editForm.teacherAdderss;
                para.teacherEmail=this.editForm.teacherEmail;
                para.teacherPhone=this.editForm.teacherPhone;
                para.teacherPolitical=this.editForm.teacherPolitical;
                para.teacherNational=this.editForm.teacherNational;
                para.teacherDegree=this.editForm.teacherDegree;
                para.teacherCategory=this.editForm.teacherCategory;
                para.teacherTranning=this.editForm.teacherTranning;
                para.teacherReward=this.editForm.teacherReward;
                para.teacherPunish=this.editForm.teacherPunish;
                para.teacherDetail=this.editForm.teacherDetail;
                para.teacherPwd=this.editForm.teacherPwd;
                para.courseName=this.editForm.courseName;
                para.roleDesc=this.editForm.roleDesc;
                updateTeacherInfo(para).then((res) => {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getTeachers();
                });
            });
        },
        //删除
        handleDelete: function (index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {

                let para = {teacherId: row.teacherId };
                delTeacher(para).then((res) => {

                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getTeachers();
                });
            }).catch(() => {

            });
        },
        handleAvatarSuccess(res, file) {
            this.editForm.teacherPhoto = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    mounted() {
        this.getTeachers();
    }
}
</script>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
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
 