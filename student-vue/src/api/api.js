import axios from 'axios';

let base = '';

//http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    //返回401,清除token信息并跳转到登录页面
                    sessionStorage.removeItem('user');
                    //提示您已经超时，请重新登录
                    location.href = "/#/login";
            }
        }
        return Promise.reject(error.response.data) //返回接口返回的错误信息
    });

export const getUser = params => { return axios.get(`${base}/api/student/planManager/getplanlist`,{ params:  params}).then(res => res.data); };


//获取论文规范 - 周长磊
export const listThesisLayout = params => { return axios.get(`${base}/api/student/listThesisLayout`, { params: params }).then(res => res.data); };
//获取论文
export const listThesis = params => { return axios.get(`${base}/api/student/listThesis`, { params: params }).then(res => res.data); };
//提交论文
export const saveThesis = params => { return axios.post(`${base}/api/student/saveThesis`, params).then(res => res.data); };
//下载
export const download = params => { return axios.post(`${base}/api/student/download`, params ).then(res => res.data); };
//下载
export const down2 = params => { return axios.get(`${base}/api/student/down2`, { params: params }).then(res => res.data); };


//缴费信息列表
export const getMoney = params => { return axios.get(`${base}api/student/StuMoneyController/getMoney`, { params: params }).then(res => res.data); };
//缴费详情信息 updateMoney
export const payMoney = params => { return axios.get(`${base}api/student/StuMoneyController/payMoney`, { params: params }).then(res => res.data); };
//更新缴费信息
export const updateMoney = params => { return axios.post(`${base}api/student/StuMoneyController/updateMoney`, params).then(res => res.data); };
//李梦鸽结束


//获取分数列表
export const getScores = params => { return axios.post(`${base}/api/stu/score`, params).then(res => res.data); };

//获得学生课程各章节成绩列表
export const getScoreDetail = params => { return axios.post(`${base}/api/stu/scoreDetail`, params).then(res => res.data); };
//提交成绩异议
export const addCheck = params => { return axios.post(`${base}/api/stu/addcheck`, params).then(res => res.data); }

//获取试卷详细
export const getTopics = params => { return axios.post(`${base}/api/stu/topics`, params).then(res => res.data); }

//用户登录
export const requestLogin = params => { return axios.post(`${base}/api/student/login`, params).then(res => res.data); };
//用户退出
export const requestLogout = params => { return axios.get(`${base}/api/student/logout`, { params: params }).then(res => res.data); };
//获取某用户的详细信息
export const getUserInfo = params => { return axios.get(`${base}/api/user/detail`, { params: params }).then(res => res.data); };
//修改用户密码
export const editUserPwd = params => { return axios.get(`${base}/api/user/editpwd`, { params: params }).then(res => res.data); };
//修改用户手机号
export const editUserMobile = params => { return axios.get(`${base}/api/user/editmobile`, { params: params }).then(res => res.data); };
//获取用户卡的统计信息
export const getCardStat = params => { return axios.get(`${base}/api/report/cardstat`, { params: params }).then(res => res.data); };
//获取教学计划信息
export const getUserPlan = params => { return axios.get(`${base}/api/report/plans`, { params: params }).then(res => res.data); };

//获取模糊查询的服务商分页列表
// export const getServicerListPage = params => { return axios.get(`${base}/api/user/likeusers`, { params: params }).then(res => res.data); };
//删除指定用户
export const removeUser = params => { return axios.get(`${base}/api/user/remove`, { params: params }); };
//修改指定用户
export const editUser = params => { return axios.post(`${base}/api/user/edit`, params); };



//获取模糊查询的入库分页列表
export const getInCardListPage = params => { return axios.get(`${base}/api/cards/likeinsku`, { params: params }).then(res => res.data); };
//删除卡号
export const removeCard = params => { return axios.get(`${base}/api/cards/remove`, { params: params }); };
//批量删除卡号
export const batchRemoveCard = params => { return axios.get(`${base}/api/cards/range/remove`, { params: params }).then(getUserres => res.data); };


//获取模糊查询的出库分页列表
export const getOutCardListPage = params => { return axios.get(`${base}/api/cards/likeoutsku`, { params: params }).then(res => res.data); };
//出库卡号
export const outCard = params => { return axios.get(`${base}/api/cards/outsku`, { params: params }); };
//批量出库卡号
export const batchOutCard = params => { return axios.get(`${base}/api/cards/range/outsku`, { params: params }).then(res => res.data); };

//获取用户拥有某个号段卡内的实际数量
//export const getUserOwnerCardnum = params => { return axios.get(`${base}/api/cards/range/skunum`, { params: params }).then(res => res.data); };

export const getUserOwnerCardnum = params => { return axios.get(`${base}/api/cards/range/skunum`, { params: params }).then(res => res.data); };


//获取用户的直接下级服务商列表
export const getChildUsers = params => { return axios.get(`${base}/api/user/childusers`, { params: params }).then(res => res.data); };




//获取所有的套餐列表
export const getPackList = params => { return axios.get(`${base}/api/dict/packlist`, { params: params }).then(res => res.data); };

//获取所有的对接第三方同步接口的应用编码列表
export const getAppsynList = params => { return axios.get(`${base}/api/dict/appsynlist`, { params: params }).then(res => res.data); };

//添加评价
export const addEvaluate = params => { return axios.get(`${base}/api/student/addEvaluate`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };


//获取学生的所有课程
export const getCourse = params => { return axios.get(`${base}/api/student/query`, { params: params }).then(res => res.data); };

//获取查询的章节分页列表
export const getSectionListPage = params => { return axios.get(`${base}/api/student/sectionPage`, { params: params }).then(res => res.data); };

//获取模糊查询管理的分页列表
export const getCardListPage = params => { return axios.get(`${base}/api/cards/like`, { params: params }).then(res => res.data); };
//批量编辑卡号
export const batchEditCard = params => { return axios.get(`${base}/api/cards/range/edit`, { params: params }).then(res => res.data); };


//查询卡号详细信息
export const getCardDetail = params => { return axios.get(`${base}/api/cards/detail`, { params: params }).then(res => res.data); };


//上传导入EXCEL文件数据
// axios.post(url,form,{headers:headers})
export const impExcel = form => {
    return axios.post(`${base}/api/cards/excel/imp`, form, {
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
};

//上传批量激活EXCEL文件数据
export const impExcelBatchActive = form => {
    return axios.post(`${base}/api/cards/excel/impbatchactive`, form, {
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
};


//查询课程下所有讲点
export const getCourseDetail = params => { return axios.get(`${base}/api/student/stuCourse/detail`, { params: params }).then(res => res.data); };

//获取小节对应的课程详细信息
export const getCourseInfos = params => { return axios.get(`${base}/api/student/getCourseInfo`, { params: params }).then(res => res.data); };

//获取视频
export const getVideo = params => { return axios.get(`${base}/api/student/getVideo`, { params: params }).then(res => res.data); };

//教师信息
export const getTeacherInfo = params => { return axios.get(`${base}/api/student/listTeacher`, { params: params }).then(res => res.data); };
//教师评价
export const getTeaEvaInfo = params => { return axios.get(`${base}/api/student/teacherEvaluatelist`, { params: params }).then(res => res.data); };
//添加教师新评价
export const outTeaEva = params => { return axios.post(`${base}/api/student/addTeaEvaluationModel`, params); };


//教学公告
export const getNotices = params => { return axios.get(`${base}/api/student/notices/select`, { params: params }).then(res => res.data); };
//导学资源
export const getStudy = params => { return axios.get(`${base}/api/student/studys/study`, { params: params }).then(res => res.data); };

//获取卡号自动同步时间
export const getSynTime = params => { return axios.get(`${base}/api/dict/getautosyntime`, { params: params }).then(res => res.data); };
//设置卡号自动同步时间


export const setSynTime = params => { return axios.get(`${base}/api/user/setsyntime`, { params: params }).then(res => res.data); };

//该学生所有异动的分页列表
export const cha = params => { return axios.get(`${base}/api/teacher/change/query2`, { params: params }).then(res => res.data); };
//申请异动
export const addChange = params => { return axios.post(`${base}/api/teacher/change/addChange`, params ).then(res => res.data); };

export const ddd = params => { return axios.get(`${base}/sss`, { params: params }).then(res => res.data); };

//获取需要考试的课程信息testCourse
export const testCourse = params => { return axios.post(`${base}/api/student/sectionTest/testCourse`, { params: params }).then(res => res.data); };
//获取需要考试的章节的信息
export const getSectionTest = params => { return axios.post(`${base}/api/student/sectionTest/getSectionTest`, params).then(res => res.data); };
//根据章节的id获取一张试卷
export const getTestPaperOfSection = params => { return axios.post(`${base}/api/student/sectionTest/getTestPaperOfSection`, params).then(res => res.data); };
//保存章节测试的分数
export const saveSectionScore = params => { return axios.post(`${base}/api/student/sectionTest/saveScoreOfSection`, params).then(res => res.data); };

//申忠正
//获取学生考试信息！
export const getexamMsg2 = params => { return axios.get(`${base}/api/student/StudentExamController/getexamMsg`, { params: params }).then(res => res.data); };

//获取考生该 课程 考试状态
export const getexamstate2 = params => { return axios.get(`${base}/api/student/StudentExamController/getexamstate`, { params: params }).then(res => res.data); };

//试卷详情 申忠正
export const getTopics2 = params => { return axios.get(`${base}/api/student/StudentExamController/topics`, { params: params }).then(res => res.data); };

//提交学生分数
//export const saveScore = params => { return axios.post(`${base}/api/stu/commitScore`, params).then(res => res.data);}

//提交学生分数
export const saveScore = params => { return axios.post(`${base}/api/student/StudentExamController/commitScore`, params).then(res => res.data);}

