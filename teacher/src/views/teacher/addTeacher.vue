<template>
<!--教师添加管理 冯云威-->
    <section >
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
                <el-button @click.native="editFormVisible">取消</el-button>
                <el-button type="primary" @click.native="editSubmit">保存</el-button>
            </div>
    </section>
</template>
<style>
.el-input {
    width: 80%;
}

.el-row {
    margin-bottom: 20px;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
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
</style>
<script>
import { insertTeacher,getRole} from '../../api/api';
export default {
    data() {
        return {
            roleDesc:[],
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
                teacherPhoto:'',
                roleDesc:''
            },
        }
    },
    methods: {
        editFormVisible:function (){
            this.$router.push('/teachers_manager');
         },
         editSubmit: function () {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
                let para = {};
                para.teacherRealName=this.editForm.teacherRealName;
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
                para.teacherNative=this.editForm.teacherNative;
                para.teacherCategory=this.editForm.teacherCategory;
                para.teacherTranning=this.editForm.teacherTranning;
                para.teacherReward=this.editForm.teacherReward;
                para.teacherPunish=this.editForm.teacherPunish;
                para.teacherDetail=this.editForm.teacherDetail;
                para.teacherPwd=this.editForm.teacherPwd;
                para.courseName=this.editForm.courseName;
                para.roleDesc=this.editForm.roleDesc;
                para.teacherPhoto='暂无';
                para.teacherCreateDate=new Date();
                para.teacherLastLoginDate=new Date();
                para.teacherSuntime=2131654;
                para.teacherModifyDate=new Date();
                para.teacherModifyPerson=0;
                para.teacherDelete=1;
                insertTeacher(para).then((res) => {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.$router.push('/teachers_manager');
                });
            });
        },
        handleAvatarSuccess(res, file) {
            this.addTeacherForm.imageUrl = URL.createObjectURL(file.raw);
            console.log(this.addTeacherForm.imageUrl);
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
        getRole().then((res) => {
                this.roleDesc = res.resData;
            });
    }
}
</script>