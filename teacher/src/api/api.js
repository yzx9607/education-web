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

//获取权限信息列表
export const getPermisson = params => { return axios.post(`${base}/api/super/permissionManager/getAllpermission`, params).then(res => res.data); };
//获取当前角色未授权过的信息列表
export const getPermissonByRole = params => { return axios.post(`${base}/api/super/permissionManager/getPermissonByRole`, params).then(res => res.data); };
//查询已经授权的信息列表
export const getPermissonByRoles = params => { return axios.post(`${base}/api/super/permissionManager/getPermissonByRoles`, params).then(res => res.data); };

//添加权限
export const addPermisson = params => { return axios.post(`${base}/api/super/permissionManager/addPermission`, params).then(res => res.data); };
//修改权限
export const updatePermisson = params => { return axios.post(`${base}/api/super/permissionManager/updatePermisson`, params).then(res => res.data); };
//删除权限
export const deltetePermisson = params => { return axios.get(`${base}/api/super/permissionManager/deltetePermisson`, { params: params }).then(res => res.data); };


//给角色添加权限

export const addRolePermissonById = params => { return axios.get(`${base}/api/super/permissionManager/addRolePermissonById`, { params: params }).then(res => res.data); };

//删除某个角色权限
export const deletePermission = params => { return axios.get(`${base}/api/super/permissionManager/deletePermission`, { params: params }).then(res => res.data); };



//用户登录
export const requestLogin = params => { return axios.post(`${base}/teacherlogin`, params).then(res => res.data); };
//用户退出
export const requestLogout = params => { return axios.post(`${base}/teacherlogout`, { params: params }).then(res => res.data); };

//获取角色列表
export const getRoleList = params => { return axios.post(`${base}/api/super/roleManager/getAllRole`, params).then(res => res.data); };


//添加角色
export const addNewRole = params => { return axios.post(`${base}/api/super/roleManager/addNewRole`, params).then(res => res.data); };

//修改角色
export const updateRoleById = params => { return axios.post(`${base}/api/super/roleManager/updateRoleById`, params).then(res => res.data); };


//删除权限
export const delteteRoleById = params => { return axios.get(`${base}/api/super/roleManager/delteteRoleById`, { params: params }).then(res => res.data); };



//查找教师所教所有课程
export const getSections = params => { return axios.post(`${base}/api/teacher/sectionManager/getSections`, { params: params }).then(res => res.data); }
//查找tree列表(章节管理)
export const getTreeList = params => { return axios.post(`${base}/api/teacher/sectionManager/getTree`, { params: params }).then(res => res.data); }
// 添加课程的操作
export const addNewClass = params => { return axios.post(`${base}/api/teacher/sectionManager/addNewClass`, params).then(res => res.data); }
//修改课程信息
export const modifyOneClass = params => { return axios.post(`${base}/api/teacher/sectionManager/modifyOneClass`, params).then(res => res.data); }
// 删除课程信息
export const deleteOneSection = params => { return axios.post(`${base}/api/teacher/sectionManager/deleteOneSection`, params).then(res => res.data); }
//上传章节的视频
export const videoUpLoad = params => { return axios.post(`${base}/api/teacher/sectionManager/videoUpLoad`, params).then(res => res.data); }
// 获取没有视频的章节列表
export const getTreeListOfNoVideo = params => { return axios.post(`${base}/api/teacher/sectionManager/getTreeListOfNoVideo`, params).then(res => res.data); }




//赵睿慷


//专业管理
export const majorManager = params => { return axios.get(`${base}/api/major/manager`, { params: params }).then(res => res.data); };
//获取专业管理分页
export const getPage = params => { return axios.get(`${base}/api/major/likeMajors`, { params: params }).then(res => res.data); };
//专业管理修改
export const editMajor = params => { return axios.post(`${base}/api/major/editMajor`, params); };
//专业新增
export const addMajor = params => { return axios.post(`${base}/api/major/add`, params).then(res => res.data); };
//专业删除管理
export const removeMajor = params => { return axios.get(`${base}/api/major/remove`, { params: params }); };

//课程管理
export const courseManager = params => { return axios.get(`${base}/api/course/manager`, { params: params }).then(res => res.data); };
//课程通知修改
export const editCourse = params => { return axios.post(`${base}/api/course/editCourse`, params); };
//课程通知新增
export const addCourse = params => { return axios.post(`${base}/api/course/add`, params).then(res => res.data); };
//删除课程通知
export const removeCourse = params => { return axios.get(`${base}/api/course/remove`, { params: params }); };
//获取课程通知分页
export const getCoursePage = params => { return axios.get(`${base}/api/course/likeCourse`, { params: params }).then(res => res.data); };


//徐鹏超

//教学计划查询分页(模糊查询)
export const chaxun = params => { return axios.get(`${base}/api/teacher/planManager/getplanlist`, { params: params }).then(res => res.data); };
//教学计划修改
export const ediChange = params => { return axios.post(`${base}/api/teacher/planManager/update`, params).then(res => res.data); };
//教学计划根据id查数据
export const educationPlanId = params => { return axios.get(`${base}/api/teacher/planManager/queryId`, { params: params }).then(res => res.data); };
//教学计划根据id删除数据
export const delPlan = params => { return axios.get(`${base}/api/teacher/planManager/delPlan`, { params: params }).then(res => res.data); };
//教学计划增加
export const addPlan = params => { return axios.post(`${base}/api/teacher/planManager/add`, params).then(res => res.data); };

//专业(下拉框)
export const querymajorList = params => { return axios.get(`${base}/api/teacher/planManager/queryAdd`, { params: params }).then(res => res.data); };
//类别(下拉框)
export const queryeducationList = params => { return axios.get(`${base}/api/teacher/planManager/queryAdd1`, { params: params }).then(res => res.data); };

//分页显示教师信息 --冯云威
export const getPageTeachers = params => { return axios.get(`${base}/api/admin/TeachermangerFy`, { params: params }).then(res => res.data); };
//添加新的教师 --冯云威
export const insertTeacher = params => { return axios.post(`${base}/api/admin/TeachermangerFi`, params).then(res => res.data); };

//更改指定教师信息 --冯云威
export const updateTeacherInfo = params => { return axios.post(`${base}/api/admin/TeachermangerFyqx`, params).then(res => res.data); };

//删除指定教师 --冯云威
export const delTeacher = params => { return axios.get(`${base}/api/admin/TeachermangerFyxy`, { params: params }).then(res => res.data); };

//获取角色名称 --冯云威
export const getRole = params => { return axios.get(`${base}/api/admin/roleDesc`, { params: params }).then(res => res.data); };




//学习成绩--冯云威
export const getScore = params => { return axios.get(`${base}/api/master/queryScore`, { params: params }).then(res => res.data); };
//单个学习成绩详情--冯云威
export const getScoreInfo = params => { return axios.get(`${base}/api/master/queryScoreInfo`, { params: params }).then(res => res.data); };
//修改成绩信息--冯云威
//export const updateScoreInfo = params => { return axios.get(`${base}/api/master/updateScoreInfo`, { params: params }).then(res => res.data); };
//提交操作--冯云威
export const updateScore = params => { return axios.post(`${base}/api/master/updateScore`, params); };
//提交操作--冯云威
export const addScore = params => { return axios.post(`${base}/api/master/addScore`, params); };

// 周长磊

// 遍历学费信息（分页查询 + 模糊查询）
export const listStucostBy = params => { return axios.get(`${base}/api/teacher/admin/Studentcostmanage`, { params: params }).then(res => res.data); };
// 未交学费【以现在时间减去入校时间算出应该交的学费】（人）
export const listStucostUnpaid = params => { return axios.get(`${base}/api/teacher/admin/Studentcostmanagewj`, { params: params }).then(res => res.data); };
// 更新学费记录（按学生编号）
export const updateStucostById = params => { return axios.post(`${base}/api/teacher/admin/Studentcostmanageup`, params).then(res => res.data); };


//李梦鸽

//获取模糊查询的学生管理分页列表
export const getStudentListPage = params => { return axios.get(`${base}/api/admin/StudentManager/getPageStudents`, { params: params }).then(res => res.data); };
//删除指定学生
export const deleteStudent = params => { return axios.get(`${base}/api/admin/StudentManager/deleteStudents`, { params: params }).then(res => res.data); };
//根据Id查询用户详情
export const queryStuById = params => { return axios.get(`${base}/api/admin/StudentManager/queryStuById`, { params: params }).then(res => res.data); };
//修改指定用户 
export const updateStudent = params => { return axios.post(`${base}/api/admin/StudentManager/updateStudents`, params).then(res => res.data); };
//增加新用户
export const addStudent = params => { return axios.post(`${base}/api/student/addstudent`, params).then(res => res.data); };
//查询学生详细信息
export const getStudentDetail = params => { return axios.get(`${base}/api/admin/StudentManager/getStudentDetail`, { params: params }).then(res => res.data); };


//查询所有论文
export const getThesisList = params => { return axios.get(`${base}/api/teacher/thesis/getThesis`, { params: params }).then(res => res.data); };

//提交论文分数
export const submitScore = params => { return axios.get(`${base}/api/teacher/thesis/submitScore`, { params: params }).then(res => res.data); };

//查询所有论文标准
export const getThesisLayList = params => { return axios.get(`${base}/api/teacher/thesis/getThesisLay`, { params: params }).then(res => res.data); };

//上传文件数据
export const impThesis = form => {
    return axios.post(`${base}/api/teacher/thesis/impThesis`, form, {
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
};

//查询所有课程
export const getAllCourse = params => { return axios.get(`${base}/api/teacher/course/likeCourse`, { params: params }).then(res => res.data); };

//删除课程
export const removeCourses = params => { return axios.get(`${base}/api/teacher/course/remove`, { params: params }).then(res => res.data); };

//增加课程
export const addUser = params => { return axios.post(`${base}/api/teacher/course/add`, params).then(res => res.data); };

//修改课程
export const editUser = params => { return axios.post(`${base}/api/teacher/course/editCourse`, params); };

//李志鹏

//招生计划功能
//页面初始化数据信息
export const enrollpage = params => { return axios.get(`${base}/api/manger/enroll/page`, { params: params }).then(res => res.data); };
//修改根据Id获得用户信息
export const getEnroll = params => { return axios.post(`${base}/api/manger/enroll/getenroll`, params).then(res => res.data); };
//修改信息
export const updateEnroll = params => { return axios.post(`${base}/api/manger/enroll/update`, params) };
//删除
export const deleteEnroll = params => { return axios.post(`${base}/api/manger/enroll/delete`, params) };
//添加指定用户
export const addenroll = params => { return axios.post(`${base}/api/manger/enroll/add`, params); };



//章节测试选择录入题库
export const SelectCourseSection = params => { return axios.get(`${base}/api/teacher/selectSection/page`, { params: params }).then(res => res.data); };
//添加章节试题
export const SelectaddCourseSection = params => { return axios.post(`${base}/api/teacher/selectSection/addCourse`, params); };
//章节期末测试题
export const Selectexam = params => { return axios.post(`${base}/api/teacher/selectSection/addExam`, params); };
//入学测试添加
export const SelectEnterAdd = params => { return axios.post(`${base}/api/teacher/selectSection/addEnter`, params); };
//根据判断id查出对应信息
export const Selectupdate = params => {
    return axios.post(`${base}/api/teacher/selectSection/update`
        , params);
};
//删除对应的题库
export const Selectdelete = params => { return axios.post(`${base}/api/teacher/selectSection/delete`, params); };


//章节测试判断录入题库
export const CourseSection = params => { return axios.get(`${base}/api/teacher/judgeSection/page`, { params: params }).then(res => res.data); };
//添加章节试题
export const addCourseSection = params => { return axios.post(`${base}/api/teacher/judgeSection/addjudge`, params); };
//章节期末测试题
export const exam = params => { return axios.post(`${base}/api/teacher/judgeSection/addExam`, params); };
//入学测试添加
export const EnterAdd = params => { return axios.post(`${base}/api/teacher/judgeSection/addEnter`, params); };
//根据判断id查出对应信息
export const update = params => { return axios.post(`${base}/api/teacher/judgeSection/update`, params); };
//删除对应的题库
export const deleteJudge = params => { return axios.post(`${base}/api/teacher/judgeSection/delete`, params); };


//考试信息页面
export const exammanger = params => { return axios.get(`${base}/api/master/queryExam`, { params: params }).then(res => res.data); };
//视频疑问页面
export const videomentoring = params => { return axios.get(`${base}/api/master/addVideoQuiz`, { params: params }).then(res => res.data); };
//增加考试时间
export const addexam = params => { return axios.post(`${base}/api/master/addExam`, params); };
//查询
export const seleVideoQuiz = params => { return axios.get(`${base}/api/master/seleVideoQuiz`, { params: params }).then(res => res.data); };
//增加考试时间
export const updateVideoQuiz = params => { return axios.post(`${base}/api/master/updateVideoQuiz`, params); };
//删除1
export const deleteexam = params => { return axios.post(`${base}/api/master/delExam`, params); };
//删除2
export const delvideo = params => { return axios.post(`${base}/api/master/delvideo`, params); };

//张露林审核人员的审核学生
export const getCheckQueryStudent = params => { return axios.get(`${base}/api/teacher/check/queryStudent`, { params: params }).then(res => res.data); };
//张露林审核人员的审核学生详情(根据id)弹出层同步刷新
export const getCheckQueryStudentMessage = params => { return axios.get(`${base}/api/teacher/check/queryStudentMessage`, { params: params }).then(res => res.data); };

//张露林审核部分的缴费
export const getCheckQueryMoney = params => { return axios.get(`${base}/api/teacher/check/queryMoney`, { params: params }).then(res => res.data); };
//张露林审核部分的缴费详情(根据id)
export const getCheckQueryMoneyMessage = params => { return axios.get(`${base}/api/teacher/check/queryMoneyMessage`, { params: params }).then(res => res.data); };

//张露林审核部分的入学成绩
export const getCheckQueryGrade = params => { return axios.get(`${base}/api/teacher/check/queryGrade`, { params: params }).then(res => res.data); };
//张露林审核部分的入学成绩详情(根据id)
export const getCheckQueryGradeMessage = params => { return axios.get(`${base}/api/teacher/check/queryGradeMessage`, { params: params }).then(res => res.data); };

//张露林审核部分的历史记录
export const getCheckQueryHistorical = params => { return axios.get(`${base}/api/teacher/check/queryHistorical`, { params: params }).then(res => res.data); };
//张露林审核部分的历史记录详情(根据id)
export const getCheckQueryHistoricalMessage = params => { return axios.get(`${base}/api/teacher/check/queryHistoricalMessage`, { params: params }).then(res => res.data); };

//张露林教师主页的显示
export const getMasterIndex = params => { return axios.get(`${base}/api/teacher/master/index`, { params: params }).then(res => res.data); };
//张露林教师主页的显示详情(根据id)
export const getMasterIndexAnnouncement = params => { return axios.get(`${base}/api/teacher/master/indexAnnouncement`, { params: params }).then(res => res.data); };
//申忠正
//导学资源 --查询所有记录 
export const selectStudyResource = params => { return axios.get(`${base}/api/teacher/StudyResController/queryResource`, { params: params }).then(res => res.data); };
//删除导学资源
export const delresource = params => { return axios.get(`${base}/api/teacher/StudyResController/deleteResource`, { params: params }).then(res => res.data); };
//添加导学资源
export const addresoutce = params => { return axios.post(`${base}/api/teacher/StudyResController/addResource`, params).then(res => res.data); };

//editresoutce
export const editMajor2 = params => { return axios.post(`${base}/api/teacher/StudyResController/updateResource`, params).then(res => res.data); };

//queryResById
export const queryResById = params => { return axios.get(`${base}/api/teacher/StudyResController/queryResById`, { params: params }).then(res => res.data); };

//deleteCourseware查询课件 （根据前面传过来的资源id）
export const selectCourserware = params => { return axios.get(`${base}/api/teacher/CoursewareController/queryCourseware`, { params: params }).then(res => res.data); };

//deleteCourseware删除课件
export const deleteCourseware = params => { return axios.get(`${base}/api/teacher/CoursewareController/deleteCourseware`, { params: params }).then(res => res.data); };

//coursewareAdd2 添加课件 
export const coursewareAdd2 = params => { return axios.post(`${base}/api/teacher/StudyResController/coursewareAdd`, params).then(res => res.data); };

//辛亚会
//查询异动列表
export const findMove = params => { return axios.get(`${base}/api/teacher/change/query`, { params: params }).then(res => res.data); };
//删除异动
export const remChange = params => { return axios.get(`${base}/api/teacher/change/remove`, { params: params }); };
//修改异动
export const editMove = params => { return axios.post(`${base}/api/teacher/change/edit`, params); };


// 张建磊
//公告根据id查一条
export const querynotice = params => { return axios.get(`${base}/api/admin/querynotice`, { params: params }).then(res => res.data); };
//query 公告查询
export const getdata2 = params => { return axios.get(`${base}/api/admin/querynoticeList`, { params: params }).then(res => res.data); };
//根据公告时间和公告标，查询公告
export const getlikedata = params => { return axios.get(`${base}/api/admin/querylikenotice`, { params: params }).then(res => res.data); };
//添加公告
export const addnotice = params => { return axios.post(`${base}/api/admin/addnotice`, params).then(res => res.data); };