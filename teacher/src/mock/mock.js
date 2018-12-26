import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user';
import { Cards } from './data/card';
import { majors } from './data/major';
import { course } from './data/course';
import { Permession } from './data/permission';
import { Roles } from './data/role';
//赵京华-章节管理 start
import { Tree } from './data/tree';
import { sections } from './data/section'
//导入教师模拟数据--冯云威
import { Teachers } from './data/teacher';
//成绩管理--冯云威
import { Score } from './data/score';
//辛亚会--异动审核


let _Tree = Tree;
let _sections = sections;

let _Teachers = Teachers;

//李梦鸽-学生管理
import { Students } from './data/student';
//end


let _Users = Users;
let _Cards = Cards;
let _majors = majors;
let _course = course;
let _Permession = Permession;
let _Roles = Roles;
let _Students = Students;
export default {
    /**
     * mock bootstrap
     */
    bootstrap() {
        let mock = new MockAdapter(axios);

        //获取权限列表 杨振欣
        mock.onPost('/api/super/permissionManager/getAllpermission').reply(config => {

            let params = JSON.parse(config.data);
            console.log(params);
            let pageNo = params.pageNo;
            let size = params.pageSize;
            return new Promise((resolve, reject) => {

                let a = { list: [], total: 0 };
                let j = 0;
                for (let i = (pageNo - 1) * size; i < (size * pageNo) - 1; i++) {
                    a.list[j] = _Permession[i];
                    j++;
                }
                a.total = _Permession.length;
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '编辑成功',
                        resData: a,
                    }]);
                }, 0);


            });
        });
        //根据角色编号获取该角色已经授权和未授权的信息列表
        mock.onPost('/api/super/permissionManager/getPermissonByRole').reply(config => {

            let params = JSON.parse(config.data);
            console.log(params);
            let pageNo = params.pageNo;
            let size = params.pageSize;
            return new Promise((resolve, reject) => {

                let a = { list: [], total: 0, list2: [] };
                let j = 0;
                for (let i = (pageNo - 1) * size; i < (size * pageNo) - 1; i++) {
                    a.list[j] = _Permession[i];
                    a.list2[j] = _Permession[i + 10];
                    j++;
                }
                a.total = _Permession.length;
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '编辑成功',
                        resData: a,
                    }]);
                }, 0);


            });
        });
        //根据角色编号获取该角色已经授权和未授权的信息列表
        mock.onPost('/api/super/permissionManager/getPermissonByRoles').reply(config => {

            let params = JSON.parse(config.data);
            console.log(params);
            let pageNo = params.pageNo;
            let size = params.pageSize;
            return new Promise((resolve, reject) => {

                let a = { list: [], total: 0 };
                let j = 0;
                for (let i = (pageNo - 1) * size; i < (size * pageNo) - 1; i++) {
                    a.list[j] = _Permession[i];
                    j++;
                }
                a.total = _Permession.length;
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '编辑成功',
                        resData: a,
                    }]);
                }, 0);


            });
        });


        //修改权限
        mock.onPost('/api/super/permissionManager/updatePermisson').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '修改权限成功',
                        resData: _course
                    }]);
                }, 500);
            });
        });

        //添加权限
        mock.onPost('/api/super/permissionManager/addPermission').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '添加权限成功',
                    }]);
                }, 500);
            });
        });
        //删除权限
        mock.onGet('/api/super/permissionManager/deltetePermisson').reply(config => {
            console.log(config);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '删除权限成功 ',
                    }]);
                }, 500);
            });
        });

        //获取角色列表
        mock.onPost('/api/super/roleManager/getAllRole').reply(config => {
            let a = { list: _Roles };
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '获取角色成功',
                        resData: a
                    }]);
                }, 10);
            });
        });
        //添加角色
        mock.onPost('/api/super/roleManager/addNewRole').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '添加角色成功',
                    }]);
                }, 500);
            });
        });
        //修改角色
        mock.onPost('/api/super/roleManager/updateRoleById').reply(config => {
            alert("修改角色")
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '修改角色成功',
                    }]);
                }, 500);
            });
        });

        //删除角色
        mock.onGet('/api/super/roleManager/delteteRoleById').reply(config => {
            console.log(config);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '删除角色成功 ',
                    }]);
                }, 500);
            });
        });


        //给用户授权
        mock.onGet('/api/super/permissionManager/addRolePermissonById').reply(config => {
            console.log(config);
            console.log("------给用户授权");
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '授权成功 ',
                    }]);
                }, 500);
            });
        });

        //给某个用户授权
        mock.onGet('/api/super/permissionManager/deletePermission').reply(config => {
            console.log(config);
            console.log("------删除某个权限");
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '删除权限成功 ',
                    }]);
                }, 500);
            });
        });


        //获取课程列表 赵睿慷
        mock.onGet('/api/course/manager').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功',
                        data: _course
                    }]);
                }, 500);
            });
        });

        //编辑课程管理
        mock.onPost('/api/course/editCourse').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功'
                    }]);
                }, 500);
            });
        });

        //新增课程管理
        mock.onPost('/api/course/add').reply(config => {
            /*
            let { name, addr, age, birth, sex } = config.params;
            _Users.push({
              name: name,
              addr: addr,
              age: age,
              birth: birth,
              sex: sex
            });
            */
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '新增成功'
                    }]);
                }, 500);
            });
        });

        //删除课程管理
        mock.onGet('/api/course/remove').reply(config => {
            let { id } = config.params;
            _course = _course.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //获取课程管理（分页）
        mock.onGet('/api/course/likeCourse').reply(config => {
            let { pageNum, pageSize } = config.params;
            let total = _course.length;
            let mockCourse = _course;
            // .filter(user => {
            //     if (pageNum && user.pageNum.indexOf(pageNum) == -1) return false;
            //     return true;
            // });

            mockCourse = mockCourse.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            mock: mockCourse,
                            total: total,
                        },
                    }]);
                }, 1000);
            });
        });

        //编辑专业用户
        mock.onPost('/api/major/editMajor').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功'
                    }]);
                }, 500);
            });
        });


        //获取专业用户列表
        mock.onGet('/api/major/manager').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功',
                        data: _majors
                    }]);
                }, 500);
            });
        });

        // mock success request
        mock.onGet('/success').reply(200, {
            msg: 'success'
        });

        // mock error request
        mock.onGet('/error').reply(500, {
            msg: 'failure'
        });


        //获取用户列表（分页）
        mock.onGet('/api/major/likeMajors').reply(config => {
            let { pageNum, pageSize } = config.params;
            let total = _majors.length;
            let mockMajor = _majors;
            // .filter(user => {
            //     if (pageNum && user.pageNum.indexOf(pageNum) == -1) return false;
            //     return true;
            // });

            mockMajor = mockMajor.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            mock: mockMajor,
                            total: total,
                        },
                    }]);
                }, 1000);
            });
        });
        //删除专业用户
        mock.onGet('/api/major/remove').reply(config => {
            let { id } = config.params;
            _majors = _majors.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //新增专业用户
        mock.onPost('/api/major/add').reply(config => {
            /*
            let { name, addr, age, birth, sex } = config.params;
            _Users.push({
              name: name,
              addr: addr,
              age: age,
              birth: birth,
              sex: sex
            });
            */
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '新增成功'
                    }]);
                }, 500);
            });
        });
        //赵睿慷结束






























        //登录
        mock.onPost('/teacherlogin').reply(config => {
            let { username, password, rememberMe } = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                let resData = null;
                setTimeout(() => {
                    let hasUser = LoginUsers.some(u => {
                        if (u.username === username && u.password === password) {
                            resData = JSON.parse(JSON.stringify(u));
                            resData.password = undefined;
                            resData.rememberMe = rememberMe;
                            return true;
                        }
                    });
                    //data={"userid":1,"userlevel":"0"};
                    if (hasUser) {
                        resolve([200, { resCode: 0, resMsg: '请求成功', resData }]);
                    } else {
                        resolve([200, { resCode: 4001, resMsg: '账号或密码错误' }]);
                    }
                }, 1000);
            });
        });

        //退出登录
        mock.onPost('/teacherlogout').reply(200, { resCode: 0, resMsg: '' });
        //查找当前教师的所课程
        mock.onPost("/api/teacher/sectionManager/getSections").reply(config => {
            return new Promise((resolve, reject) => {
                console.log(_sections)
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: { "sections": _sections }
                    }]);
                }, 10);
            })
        });

        //遍历左侧树菜单(章节管理模块-杨振欣)
        mock.onPost("/api/teacher/sectionManager/getTree").reply(config => {
            let { params } = JSON.parse(config.data);
            console.log(params.cid);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        kecheng: "java基础",
                        resCode: 0,
                        resMsg: '请求成功',
                        resData: _Tree
                    }]);
                }, 10);
            })
        });


        // 向数据库中添加新的章节
        mock.onPost('/api/teacher/sectionManager/addNewClass').reply(config => {
            let { section, knot } = JSON.parse(config.data);
            alert(knot);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 1,
                        resMsg: '请求成功',
                    }]);
                }, 500);
            });
        });

        // 修改课程的信息

        mock.onPost('/api/teacher/sectionManager/modifyOneClass').reply(config => {
            let { section, newclassname } = JSON.parse(config.data);
            alert("后台获取的新的课程名称为：" + newclassname);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 1,
                        resMsg: '请求成功',
                    }]);
                }, 500);
            });
        });
        // 删除章节信息

        mock.onPost('/api/teacher/sectionManager/deleteOneSection').reply(config => {
            let { section } = JSON.parse(config.data);
            alert("后台获取的新的课程名称为：" + section);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 1,
                        resMsg: '删除成功',
                    }]);
                }, 500);
            });
        });

        mock.onPost('/api/teacher/sectionManager/videoUpLoad').reply(config => {
            alert("视频已经传递过来了");
            let { sectionId } = JSON.parse(config.data);
            alert(sectionId);
            return null;
        });


        //分页获取教师信息 --冯云威
        mock.onGet('/api/admin/TeachermangerFy').reply(config => {
            let { pageSize, pageNum } = config.params;

            let total = _Teachers.length;
            let mockTeachers = _Teachers;
            mockTeachers = mockTeachers.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        resData: {
                            total: total,
                            list: mockTeachers
                        }
                    }]);
                }, 1000);
            });
        });
        //模糊查询匹配的成绩管理列表 --冯云威
        mock.onGet('/api/master/queryScore').reply(config => {
            let { pageNum, pageSize } = config.params;
            let mockScore = Score;
            let total = mockScore.length;
            mockScore = mockScore.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        resData: {
                            total: total,
                            list: mockScore
                        }
                    }]);
                }, 1000);
            });
        });
        //单个学生的成绩详细信息 --冯云威
        mock.onGet('/api/master/queryScoreInfo').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            studentId: '1',
                            studentName: '张三',
                            courseName: 'java',
                            score: '60',
                            scorePlay: '10',
                            scoreOntime: '10',
                            scoreTest: '10',
                            scoreExam: '30'
                        }
                    }]);
                }, 1000);
            });
        });
        //修改学生成绩信息--冯云威
        mock.onGet('/api/master/updateScoreInfo').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            studentName: '张三',
                            courseName: 'java',
                            score: '60',
                            scorePlay: '10',
                            scoreOntime: '10',
                            scoreTest: '10',
                            scoreExam: '30'
                        }
                    }]);
                }, 1000);
            });
        });
        //提交成功--冯云威
        mock.onGet('/api/master/updateScore').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '提交成功'
                    }]);
                }, 500);
            });
        });
        //添加学生成绩信息--冯云威
        mock.onGet('/api/master/addScoreInfo').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            studentName: '',
                            courseName: '',
                            score: '',
                            scorePlay: '',
                            scoreOntime: '',
                            scoreTest: '',
                            scoreExam: ''
                        }
                    }]);
                }, 1000);
            });
        });
        //添加提交成功--冯云威
        mock.onGet('/api/master/addScore').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '提交成功'
                    }]);
                }, 500);
            });
        });

        //模糊查询+获取用户列表（分页）(学生管理-李梦鸽)
        mock.onGet('/api/admin/StudentManager/getPageStudents').reply(config => {
            let { pageSize, pageNum, studentName } = config.params;
            let Students = []; //对象
            let mockStudents = _Students;
            console.log(studentName)
            for (var i = 0; i < _Students.length; i++) {
                if (mockStudents[i].studentName == studentName) {
                    Students.push(mockStudents[i])
                } else if (studentName == '') {
                    Students = mockStudents
                }
            }
            let total = Students.length;
            console.log(total)
            mockStudents = Students.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
            // mockStudents = mockStudents.filter((u, index) => index < 20 * pageSize && index >= 20 * (pageSize - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '请求成功',
                        resData: {
                            total: total,
                            list: mockStudents,
                        }
                    }]);
                }, 100);
            });
        });
        //编辑用户(修改)
        mock.onPost('/api/student/edit').reply(config => {

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 200,
                        resMsg: '编辑成功'
                    }]);
                }, 500);
            });
        });

        //新增用户
        mock.onPost('/api/student/addstudent').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 200,
                        resMsg: '新增成功'
                    }]);
                }, 500);
            });
        });

        //删除用户
        mock.onGet('/api/student/remove').reply(config => {
            let { studentId } = config.params;
            let Students = [];
            let deleteStudents = _Students
            if (deleteStudents.studentId != null) {
                Students.push(deleteStudents.studentId)
            }
            _Students = _Students.filter(u => u.studentId !== studentId);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 200,
                        resMsg: '删除成功'
                    }]);
                }, 500);
            });
        });
        //李梦鸽结束


        // 遍历学费信息（分页查询 + 模糊查询）- 周长磊
        mock.onGet('/api/teacher/admin/Studentcostmanage').reply(config => {
            let { pageNo, studentId } = config.params;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resMsg: '请求成功',
                        resCode: 0,
                        resData: {
                            total: 10,
                            pageSize: 10,
                            pageNo: 1,
                            list: [
                                {
                                    studentId: 1,
                                    studentName: 'java第1章',
                                    studentSex: '男',
                                    stuEducation: '高中',
                                    studentDateStr: '2015-8-9',
                                    firstMoney: '3300',
                                    firstMoneyTimeStr: '2017-7-5',
                                    secondMoney: '3000',
                                    seMoneyTimeStr: '2017-7-5'
                                },
                                {
                                    studentId: 2,
                                    studentName: 'java第1章',
                                    studentSex: '男',
                                    stuEducation: '高中',
                                    studentDateStr: '2015-8-9',
                                    firstMoney: '3300',
                                    firstMoneyTimeStr: '2017-7-5',
                                    secondMoney: '3000',
                                    seMoneyTimeStr: '2017-7-5'
                                },
                                {
                                    studentId: 3,
                                    studentName: 'java第1章',
                                    studentSex: '男',
                                    stuEducation: '高中',
                                    studentDateStr: '2015-8-9',
                                    firstMoney: '3300',
                                    firstMoneyTimeStr: '2017-7-5',
                                    secondMoney: '3000',
                                    seMoneyTimeStr: '2017-7-5'
                                },
                                {
                                    studentId: 4,
                                    studentName: 'java第1章',
                                    studentSex: '男',
                                    stuEducation: '高中',
                                    studentDateStr: '2015-8-9',
                                    firstMoney: '3300',
                                    firstMoneyTimeStr: '2017-7-5',
                                    secondMoney: '3000',
                                    seMoneyTimeStr: '2017-7-5'
                                }
                            ]
                        }
                    }]);
                }, 1000);
            });
        });

        // 更新学费记录（按学生编号）
        mock.onPost('/api/teacher/admin/Studentcostmanageup').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '修改成功'
                    }]);
                }, 500);
            });
        });

        // 未交学费【以现在时间减去入校时间算出应该交的学费】（人）
        mock.onGet('/api/teacher/admin/Studentcostmanagewj').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resMsg: '请求成功',
                        resCode: 0,
                        resData: {
                            total: 10,
                            pageSize: 10,
                            pageNo: 1,
                            list: [
                                {
                                    studentId: 1,
                                    studentName: 'java第1章',
                                    studentSex: '男',
                                    firstMoney: '3300',
                                    firstMoneyTimeStr: '2017-7-5',
                                    secondMoney: '3000',
                                    seMoneyTimeStr: '2017-7-5'
                                },
                                {
                                    studentId: 2,
                                    studentName: 'java第1章',
                                    studentSex: '男',
                                    firstMoney: '3300',
                                    firstMoneyTimeStr: '2017-7-5',
                                    secondMoney: '3000',
                                    seMoneyTimeStr: '2017-7-5'
                                },
                                {
                                    studentId: 3,
                                    studentName: 'java第1章',
                                    studentSex: '男',
                                    firstMoney: '3300',
                                    firstMoneyTimeStr: '2017-7-5',
                                    secondMoney: '3000',
                                    seMoneyTimeStr: '2017-7-5'
                                },
                                {
                                    studentId: 4,
                                    studentName: 'java第1章',
                                    studentSex: '男',
                                    firstMoney: '3300',
                                    firstMoneyTimeStr: '2017-7-5',
                                    secondMoney: '3000',
                                    seMoneyTimeStr: '2017-7-5'
                                }
                            ]
                        }
                    }]);
                }, 1000);
            });
        });
        //教师异动查询
        mock.onGet('/api/teacher/change/query').reply(config => {

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功',
                        data: aaa
                    }]);
                }, 500);
            });
        });
        //教师删除异动
        mock.onGet('/api/teacher/change/remove').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });
        //教师编辑异动
        mock.onPost('/api/teacher/change/edit').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功'
                    }]);
                }, 500);
            });
        });

        //查询公告信息 - 张建磊
        mock.onGet('/api/admin/querylikenotice').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resMsg: '请求成功',
                        resCode: 0,
                        resData: {
                            total: 10,
                            pageSize: 10,
                            list: [
                                {
                                    noticeId: '1',
                                    noticeName: '公告提示',
                                    notice_inf: '关于做好节假日安全通知',
                                    noticeDateStr: '2016-05-02',
                                    noticeTarget: '2',
                                    notCreateDateStr: '2016-05-02',
                                    notModifyDateStr: '2016-05-02',
                                    noticeModifyName: '张老师',
                                    noticeDel: '1'
                                },
                                {
                                    noticeId: '1',
                                    noticeName: '公告提示',
                                    notice_inf: '关于做好节假日安全通知',
                                    noticeDateStr: '2016-05-02',
                                    noticeTarget: '2',
                                    notCreateDateStr: '2016-05-02',
                                    notModifyDateStr: '2016-05-02',
                                    noticeModifyName: '张老师',
                                    noticeDel: '1'
                                }, {
                                    noticeId: '1',
                                    noticeName: '公告提示',
                                    notice_inf: '关于做好节假日安全通知',
                                    noticeDateStr: '2016-05-02',
                                    noticeTarget: '2',
                                    notCreateDateStr: '2016-05-02',
                                    notModifyDateStr: '2016-05-02',
                                    noticeModifyName: '张老师',
                                    noticeDel: '1'
                                }, {
                                    noticeId: '1',
                                    noticeName: '公告提示',
                                    notice_inf: '关于做好节假日安全通知',
                                    noticeDateStr: '2016-05-02',
                                    noticeTarget: '2',
                                    notCreateDateStr: '2016-05-02',
                                    notModifyDateStr: '2016-05-02',
                                    noticeModifyName: '张老师',
                                    noticeDel: '1'
                                }, {
                                    noticeId: '1',
                                    noticeName: '公告提示',
                                    notice_inf: '关于做好节假日安全通知',
                                    noticeDateStr: '2016-05-02',
                                    noticeTarget: '2',
                                    notCreateDateStr: '2016-05-02',
                                    notModifyDateStr: '2016-05-02',
                                    noticeModifyName: '张老师',
                                    noticeDel: '1'
                                }
                            ]
                        }
                    }]);
                }, 500);
            });
        });
        // 张建磊结束



    }
};