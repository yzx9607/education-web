import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, Users } from './data/user';
import { Cards } from './data/card';

import { bbb } from './data/bbb';

import { Courses } from './data/course';
import { Sections } from './data/sections';
import { Sectionpart } from './data/sectionpart';
import { Videos } from './data/video';
import { Moneys } from './data/money';
import { notices } from './data/notice';
import { Sources } from './data/sources';
import { TeacherInfo } from './data/teacherInfo';
import { TeaEvaInfo } from './data/teaEvaInfo';
import { Scores, ScoreDetail, Topics } from './data/score';



let _Users = Users;
let _Cards = Cards;
let _Videos = Videos;
let _notices = notices;
let _Scores = Scores;
let _ScoreDetail = ScoreDetail;
let _Topics = Topics;
let _Moneys = Moneys;

export default {

    /**
     * mock bootstrap
     * 
     */
    bootstrap() {
        let mock = new MockAdapter(axios);
        //课程分数列表
        mock.onPost('/api/stu/score').reply(200, { resCode: 0, resMsg: '', resData: _Scores });
        //章节分数列表
        mock.onPost('/api/stu/scoreDetail').reply(200, { resCode: 0, resMsg: '', resData: _ScoreDetail });

        //返回异议提交结果
        mock.onPost('/api/stu/addcheck').reply(200, { resCode: 0, resMsg: '提交成功', resData: _Scores });

        //返回试卷详细
        mock.onPost('/api/stu/topics').reply(200, { resCode: 0, resMsg: '成功', resData: _Topics });
        // mock success request
        mock.onGet('/success').reply(200, {
            msg: 'success'
        });

        // mock error request
        mock.onGet('/error').reply(500, {
            msg: 'failure'
        });

        //学生查看学费信息
        mock.onGet('/api/money/getMoney').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '请求成功',
                        resData: _Moneys //返回对象
                    }]);
                }, 500);
            });
        });




        //登录
        mock.onPost('/api/student/login').reply(config => {
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
                }, 100);
            });
        });

        //退出登录

        mock.onGet('/api/student/logout').reply(200, { code: 0, msg: '' });
        //查询用户的详细信息
        mock.onGet('/api/user/detail').reply(200, { code: 0, msg: '', data: { "username": "admin", "userlevel": "0", "contactMan": "赵子龙", "contactMobile": "13803831221", "regTime": "2017-04-08 14:14:29.0", "f_contactMan": null, "f_contactMobile": null } });
        //修改用户密码
        mock.onGet('/api/user/editpwd').reply(config => {
            let { username, password } = JSON.parse(config.data);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, { code: 0, msg: '请求成功' }]);
                }, 1000);
            });
        });


        // 周长磊

        // 获取论文规范
        mock.onGet('/api/student/listThesisLayout').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '请求成功',
                        resData: {
                            total: 20,
                            pageSize: 10,
                            list: [{
                                    layoutId: '2016-05-03',
                                    layoutName: '王小虎',
                                    layoutUpdateStr: '上海',
                                    layoutContent: 'doc/王小虎'
                                },
                                {
                                    layoutId: '2016-05-03',
                                    layoutName: '王小虎',
                                    layoutUpdateStr: '上海',
                                    layoutContent: 'doc/王小虎'
                                },
                                {
                                    layoutId: '2016-05-03',
                                    layoutName: '王小虎',
                                    layoutUpdateStr: '上海',
                                    layoutContent: 'doc/王小虎'
                                },
                                {
                                    layoutId: '2016-05-03',
                                    layoutName: '王小虎',
                                    layoutUpdateStr: '上海',
                                    layoutContent: 'doc/王小虎'
                                }
                            ]
                        }
                    }]);
                }, 500);
            });
        });

        // 获取论文
        mock.onGet('/api/student/listThesis').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '请求成功',
                        resData: {
                            total: 20,
                            pageSize: 10,
                            list: [{
                                    thesisId: '2016-05-03',
                                    thesisTitle: '常见面试题整理--数据库篇.docx',
                                    thesisScore: '上海',
                                    thesisState: 1,
                                    thesisStateStr: '已审核',
                                    thesisDateStr: '上海',
                                    thesisAddress: 'doc/常见面试题整理--数据库篇.docx'
                                },
                                {
                                    thesisId: '2016-05-03',
                                    thesisTitle: '王小虎',
                                    thesisScore: '上海',
                                    thesisState: 0,
                                    thesisStateStr: '未审核',
                                    thesisDateStr: '上海',
                                    thesisAddress: 'doc/常见面试题整理--数据库篇.docx'
                                },
                                {
                                    thesisId: '2016-05-03',
                                    thesisTitle: '王小虎',
                                    thesisScore: '上海',
                                    thesisState: 1,
                                    thesisStateStr: '已审核',
                                    thesisDateStr: '上海',
                                    thesisAddress: 'doc/常见面试题整理--数据库篇.docx'
                                },
                                {
                                    thesisId: '2016-05-03',
                                    thesisTitle: '王小虎',
                                    thesisScore: '上海',
                                    thesisState: 1,
                                    thesisStateStr: '已审核',
                                    thesisDateStr: '上海',
                                    thesisAddress: 'doc/常见面试题整理--数据库篇.docx'
                                }
                            ]
                        }
                    }]);
                }, 500);
            });
        });

        // 提交论文
        mock.onPost('/api/student/saveThesis').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '请求成功',
                        resData: {}
                    }]);
                }, 500);
            });
        });
        // 周长磊结束


        //修改用户手机号
        mock.onGet('/api/user/editmobile').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, { code: 0, msg: '修改成功' }]);
                }, 1000);
            });
        });


        //查询用户的卡报表统计信息
        mock.onGet('/api/report/cardstat').reply(config => {

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: { "activeCardSum": 4120, "allCardSum": 5008, "stopCardSum": 108, "normalCardSum": 1256 }
                    }]);
                }, 500);
            });
        });




        //获取用户列表
        mock.onGet('/user/list').reply(config => {
            let { name } = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        users: mockUsers
                    }]);
                }, 1000);
            });
        });




        //获取用户列表（分页）
        mock.onGet('/user/listpage').reply(config => {
            let { page, name } = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockUsers.length;
            mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        users: mockUsers
                    }]);
                }, 1000);
            });
        });


        mock.onGet('/api/user/likeusers').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            "pageNum": 1,
                            "pageSize": 10,
                            "size": 10,
                            "orderBy": null,
                            "startRow": 1,
                            "endRow": 10,
                            "total": 100000,
                            "pages": 10000,
                            "list": [{
                                    "userid": 1,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "0",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538000"
                                },
                                {
                                    "userid": 2,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "0",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                },
                                {
                                    "userid": 3,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "0",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                },
                                {
                                    "userid": 4,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "1",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08 14:14:29.0",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                },
                                {
                                    "userid": 5,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "2",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08 14:14:29.0",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                },
                                {
                                    "userid": 6,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "0",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08 14:14:29.0",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                },
                                {
                                    "userid": 7,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "1",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08 14:14:29.0",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                },
                                {
                                    "userid": 8,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "0",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08 14:14:29.0",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                },
                                {
                                    "userid": 9,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "0",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08 14:14:29.0",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                },
                                {
                                    "userid": 10,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "0",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08 14:14:29.0",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                }
                            ],
                            "firstPage": 1,
                            "prePage": 0,
                            "nextPage": 2,
                            "lastPage": 8,
                            "isFirstPage": true,
                            "isLastPage": false,
                            "hasPreviousPage": false,
                            "hasNextPage": true,
                            "navigatePages": 8,
                            "navigatepageNums": [
                                1,
                                2,
                                3,
                                4,
                                5,
                                6,
                                7,
                                8
                            ]
                        }




                    }]);
                }, 500);
            });
        });





        //删除用户
        mock.onGet('/api/user/remove').reply(config => {
            let { id } = config.params;
            _Users = _Users.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //批量删除用户
        mock.onGet('/user/batchremove').reply(config => {
            let { ids } = config.params;
            ids = ids.split(',');
            _Users = _Users.filter(u => !ids.includes(u.id));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //编辑用户
        mock.onPost('/api/user/edit').reply(config => {
            /*
            let { id, name, addr, age, birth, sex } = config.params;
            _Users.some(u => {
              if (u.id === id) {
                u.name = name;
                u.addr = addr;
                u.age = age;
                u.birth = birth;
                u.sex = sex;
                return true;
              }
            });
            */
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功'
                    }]);
                }, 500);
            });
        });

        //新增用户
        mock.onPost('/api/user/add').reply(config => {
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


        //模糊查询匹配的查询管理列表
        mock.onGet('/api/cards/like').reply(config => {
            let { pageNum, pageSize, likeCardKey } = config.params;
            let mockCards = _Cards.filter(card => {
                if (likeCardKey && card.PACKAGENAME.indexOf(likeCardKey) == -1) return false;
                return true;
            });
            let total = mockCards.length;
            mockCards = mockCards.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            total: total,
                            list: mockCards
                        }
                    }]);
                }, 1000);
            });
        });


        //模糊查询匹配的入库管理列表
        mock.onGet('/api/cards/likeinsku').reply(config => {
            let { pageNum, pageSize, likeCardKey } = config.params;
            let mockCards = _Cards.filter(card => {
                if (likeCardKey && card.PACKAGENAME.indexOf(likeCardKey) == -1) return false;
                return true;
            });
            let total = mockCards.length;
            mockCards = mockCards.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            total: total,
                            list: mockCards
                        }
                    }]);
                }, 1000);
            });
        });


        //模糊查询匹配的出库管理列表
        mock.onGet('/api/cards/likeoutsku').reply(config => {
            let { pageNum, pageSize, likeCardKey } = config.params;
            let mockCards = _Cards.filter(card => {
                if (likeCardKey && card.PACKAGENAME.indexOf(likeCardKey) == -1) return false;
                return true;
            });
            let total = mockCards.length;
            mockCards = mockCards.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            total: total,
                            list: mockCards
                        }
                    }]);
                }, 1000);
            });
        });


        //删除卡号
        mock.onGet('/api/cards/remove').reply(config => {
            let { cardId } = config.params;
            _Cards = _Cards.filter(u => u.id !== cardId);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //批量删除卡号
        mock.onGet('/api/cards/range/remove').reply(config => {
            //let { id } = config.params;
            //_Cards = _Cards.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '删除成功',
                        data: 5
                    }]);
                }, 500);
            });
        });

        //出库卡号
        mock.onGet('/api/cards/outsku').reply(config => {
            // let { cardId } = config.params;
            // _Cards = _Cards.filter(u => u.id !== cardId);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '出库成功'
                    }]);
                }, 500);
            });
        });

        //批量出库卡号
        mock.onGet('/api/cards/range/outsku').reply(config => {
            //let { id } = config.params;
            //_Cards = _Cards.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '出库成功'
                    }]);
                }, 500);
            });
        });



        //获取用户拥有某个号段卡内的实际数量
        mock.onGet('/api/cards/range/skunum').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '查询成功',
                        data: 5
                    }]);
                }, 500);
            });
        });


        //获取用户的直接下级服务商列表
        mock.onGet('/api/user/childusers').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: [{
                            "userid": 1,
                            "servicerName": "郑州二七区服务商"
                        }, {
                            "userid": 2,
                            "servicerName": "郑州金水区服务商"
                        }, {
                            "userid": 3,
                            "servicerName": "郑州高新区服务商"
                        }]
                    }]);
                }, 500);
            });
        });


        //获取所有的套餐列表
        mock.onGet('/api/dict/packlist').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: [{
                            "packname": "GPRS 10元包月套餐"
                        }, {
                            "packname": "GPRS 20元包月套餐"
                        }, {
                            "packname": "GPRS 30元包月套餐"
                        }]
                    }]);
                }, 500);
            });
        });


        //获取所有的对接第三方同步接口的应用编码列表
        mock.onGet('/api/dict/appsynlist').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: [
                            { "apiname": "郑州地区", "apicode": "0371" },
                            { "apiname": "安阳地区", "apicode": "0372" }
                        ]
                    }]);
                }, 500);
            });
        });


        //批量编辑卡号
        mock.onGet('/api/cards/range/edit').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '修改成功'
                    }]);
                }, 500);
            });
        });


        //查询卡号详细信息
        mock.onGet('/api/cards/detail').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200,
                        {
                            "code": 0,
                            "msg": "",
                            "data": {
                                "querycode": "123456",
                                "smssign": "否",
                                "gprsused": "8000",
                                "gprssign": "是",
                                "packname": "GPRS10元套餐(2020)",
                                "openstate": "开机(2008)",
                                "smsmonthused": "2000(2012)",
                                "imsi": "460040260908676",
                                "outskutime": "2016-10-16",
                                "gprsnow": "2000",
                                "activetime": "2016-12-05 15:41:38",
                                "iccid": "898602B2221430000006",
                                "balance": "11.32(2011)",
                                "apicode": "0371",
                                "servicername": "郑州二七区服务商",
                                "inskutime": "2016-10-15",
                                "msisdn": 13803831221,
                                "gprstotal": "100",
                                "cardstate": "单向停机(2002)",
                                "lastsyntime": "2016-10-19 15:24:36",
                                "innettype": "4G(2001)",
                                "ip": "10.56.129.64(2001)",
                                "apn": "cmmtm(2001)"
                            }
                        }
                    ]);
                }, 500);
            });
        });


        //上传导入EXCEL文件数据
        mock.onPost('/api/cards/excel/imp').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '入库成功'
                    }]);
                }, 500);
            });
        });


        //上传批量激活EXCEL文件数据
        mock.onPost('/api/cards/excel/impbatchactive').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '入库成功'
                    }]);
                }, 500);
            });
        });


        // 修改缴费信息
        mock.onPost('/api/money/updateMoney').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resCode: 0,
                        resMsg: '编辑成功'
                    }]);
                }, 500);
            });
        });



        //获取用户列表（分页）
        mock.onGet('/user/listpage').reply(config => {
            let { page, name } = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockUsers.length;
            mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        users: mockUsers
                    }]);
                }, 1000);
            });
        });

        //获取卡号自动同步时间
        mock.onGet('/api/dict/getautosyntime').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '查询成功',
                        data: "02:00"
                    }]);
                }, 500);
            });
        });


        //设置卡号自动同步时间
        mock.onGet('/api/user/likeusers').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            "pageNum": 1,
                            "pageSize": 10,
                            "size": 10,
                            "orderBy": null,
                            "startRow": 1,
                            "endRow": 10,
                            "total": 100000,
                            "pages": 10000,
                            "list": [{
                                    "userid": 1,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "0",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538000"
                                },
                                {
                                    "userid": 2,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "0",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                },
                                {
                                    "userid": 3,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "0",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                },
                                {
                                    "userid": 4,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "1",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08 14:14:29.0",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                },
                                {
                                    "userid": 5,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "2",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08 14:14:29.0",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                },
                                {
                                    "userid": 6,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "0",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08 14:14:29.0",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                },
                                {
                                    "userid": 7,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "1",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08 14:14:29.0",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                },
                                {
                                    "userid": 8,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "0",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08 14:14:29.0",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                },
                                {
                                    "userid": 9,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "0",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08 14:14:29.0",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                },
                                {
                                    "userid": 10,
                                    "servicerName": "郑州二七区服务商",
                                    "username": "admin",
                                    "password": "123456",
                                    "userlevel": "0",
                                    "contactMan": "赵子龙",
                                    "contactMobile": "13803821224",
                                    "regTime": "2017-04-08 14:14:29.0",
                                    "f_contactMan": "王书麒",
                                    "f_contactMobile": "15824385514",
                                    "cardnum": "1538"
                                }
                            ],
                            "firstPage": 1,
                            "prePage": 0,
                            "nextPage": 2,
                            "lastPage": 8,
                            "isFirstPage": true,
                            "isLastPage": false,
                            "hasPreviousPage": false,
                            "hasNextPage": true,
                            "navigatePages": 8,
                            "navigatepageNums": [
                                1,
                                2,
                                3,
                                4,
                                5,
                                6,
                                7,
                                8
                            ]
                        }
                    }]);
                }, 500);
            });
        });





        //删除用户
        mock.onGet('/api/user/remove').reply(config => {
            let { id } = config.params;
            _Users = _Users.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //批量删除用户
        mock.onGet('/user/batchremove').reply(config => {
            let { ids } = config.params;
            ids = ids.split(',');
            _Users = _Users.filter(u => !ids.includes(u.id));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //编辑用户
        mock.onPost('/api/user/edit').reply(config => {
            /*
            let { id, name, addr, age, birth, sex } = config.params;
            _Users.some(u => {
              if (u.id === id) {
                u.name = name;
                u.addr = addr;
                u.age = age;
                u.birth = birth;
                u.sex = sex;
                return true;
              }
            });
            */
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功'
                    }]);
                }, 500);
            });
        });

        //新增用户
        mock.onPost('/api/user/add').reply(config => {
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


        //模糊查询匹配的查询管理列表
        mock.onGet('/api/cards/like').reply(config => {
            let { pageNum, pageSize, likeCardKey } = config.params;
            let mockCards = _Cards.filter(card => {
                if (likeCardKey && card.PACKAGENAME.indexOf(likeCardKey) == -1) return false;
                return true;
            });
            let total = mockCards.length;
            mockCards = mockCards.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            total: total,
                            list: mockCards
                        }
                    }]);
                }, 1000);
            });
        });


        //模糊查询匹配的入库管理列表
        mock.onGet('/api/cards/likeinsku').reply(config => {
            let { pageNum, pageSize, likeCardKey } = config.params;
            let mockCards = _Cards.filter(card => {
                if (likeCardKey && card.PACKAGENAME.indexOf(likeCardKey) == -1) return false;
                return true;
            });
            let total = mockCards.length;
            mockCards = mockCards.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            total: total,
                            list: mockCards
                        }
                    }]);
                }, 1000);
            });
        });


        //模糊查询匹配的出库管理列表
        mock.onGet('/api/cards/likeoutsku').reply(config => {
            let { pageNum, pageSize, likeCardKey } = config.params;
            let mockCards = _Cards.filter(card => {
                if (likeCardKey && card.PACKAGENAME.indexOf(likeCardKey) == -1) return false;
                return true;
            });
            let total = mockCards.length;
            mockCards = mockCards.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            total: total,
                            list: mockCards
                        }
                    }]);
                }, 1000);
            });
        });


        //删除卡号
        mock.onGet('/api/cards/remove').reply(config => {
            let { cardId } = config.params;
            _Cards = _Cards.filter(u => u.id !== cardId);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //批量删除卡号
        mock.onGet('/api/cards/range/remove').reply(config => {
            //let { id } = config.params;
            //_Cards = _Cards.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '删除成功',
                        data: 5
                    }]);
                }, 500);
            });
        });

        //出库卡号
        mock.onGet('/api/cards/outsku').reply(config => {
            // let { cardId } = config.params;
            // _Cards = _Cards.filter(u => u.id !== cardId);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '出库成功'
                    }]);
                }, 500);
            });
        });

        //批量出库卡号
        mock.onGet('/api/cards/range/outsku').reply(config => {
            //let { id } = config.params;
            //_Cards = _Cards.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '出库成功'
                    }]);
                }, 500);
            });
        });



        //获取用户拥有某个号段卡内的实际数量
        mock.onGet('/api/cards/range/skunum').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '查询成功',
                        data: 5
                    }]);
                }, 500);
            });
        });


        //获取用户的直接下级服务商列表
        mock.onGet('/api/user/childusers').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: [{
                            "userid": 1,
                            "servicerName": "郑州二七区服务商"
                        }, {
                            "userid": 2,
                            "servicerName": "郑州金水区服务商"
                        }, {
                            "userid": 3,
                            "servicerName": "郑州高新区服务商"
                        }]
                    }]);
                }, 500);
            });
        });


        //获取所有的套餐列表
        mock.onGet('/api/dict/packlist').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: [{
                            "packname": "GPRS 10元包月套餐"
                        }, {
                            "packname": "GPRS 20元包月套餐"
                        }, {
                            "packname": "GPRS 30元包月套餐"
                        }]
                    }]);
                }, 500);
            });
        });


        //获取所有的对接第三方同步接口的应用编码列表
        mock.onGet('/api/dict/appsynlist').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: [
                            { "apiname": "郑州地区", "apicode": "0371" },
                            { "apiname": "安阳地区", "apicode": "0372" }
                        ]
                    }]);
                }, 500);
            });
        });


        //批量编辑卡号
        mock.onGet('/api/cards/range/edit').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '修改成功'
                    }]);
                }, 500);
            });
        });


        //查询卡号详细信息
        mock.onGet('/api/cards/detail').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200,
                        {
                            "code": 0,
                            "msg": "",
                            "data": {
                                "querycode": "123456",
                                "smssign": "否",
                                "gprsused": "8000",
                                "gprssign": "是",
                                "packname": "GPRS10元套餐(2020)",
                                "openstate": "开机(2008)",
                                "smsmonthused": "2000(2012)",
                                "imsi": "460040260908676",
                                "outskutime": "2016-10-16",
                                "gprsnow": "2000",
                                "activetime": "2016-12-05 15:41:38",
                                "iccid": "898602B2221430000006",
                                "balance": "11.32(2011)",
                                "apicode": "0371",
                                "servicername": "郑州二七区服务商",
                                "inskutime": "2016-10-15",
                                "msisdn": 13803831221,
                                "gprstotal": "100",
                                "cardstate": "单向停机(2002)",
                                "lastsyntime": "2016-10-19 15:24:36",
                                "innettype": "4G(2001)",
                                "ip": "10.56.129.64(2001)",
                                "apn": "cmmtm(2001)"
                            }
                        }
                    ]);
                }, 500);
            });
        });


        //上传导入EXCEL文件数据
        mock.onPost('/api/cards/excel/imp').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '入库成功'
                    }]);
                }, 500);
            });
        });


        //上传批量激活EXCEL文件数据
        mock.onPost('/api/cards/excel/impbatchactive').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '入库成功'
                    }]);
                }, 500);
            });
        });


        //手动同步卡号信息
        mock.onGet('/api/cards/syncard').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '同步成功'
                    }]);
                }, 500);
            });
        });



        //获取卡号自动同步时间
        mock.onGet('/api/dict/getautosyntime').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '查询成功',
                        data: "02:00"
                    }]);
                }, 500);
            });
        });

        //设置卡号自动同步时间
        mock.onGet('/api/user/setsyntime').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '保存成功'
                    }]);
                }, 500);
            });
        });


        //删除用户
        mock.onGet('/api/user/remove').reply(config => {
            let { id } = config.params;
            _Users = _Users.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //批量删除用户
        mock.onGet('/user/batchremove').reply(config => {
            let { ids } = config.params;
            ids = ids.split(',');
            _Users = _Users.filter(u => !ids.includes(u.id));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //编辑用户
        mock.onPost('/api/user/edit').reply(config => {
            /*
            let { id, name, addr, age, birth, sex } = config.params;
            _Users.some(u => {
              if (u.id === id) {
                u.name = name;
                u.addr = addr;
                u.age = age;
                u.birth = birth;
                u.sex = sex;
                return true;
              }
            });
            */
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功'
                    }]);
                }, 500);
            });
        });

        //新增用户
        mock.onPost('/api/user/add').reply(config => {
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


        //模糊查询匹配的查询管理列表
        mock.onGet('/api/cards/like').reply(config => {
            let { pageNum, pageSize, likeCardKey } = config.params;
            let mockCards = _Cards.filter(card => {
                if (likeCardKey && card.PACKAGENAME.indexOf(likeCardKey) == -1) return false;
                return true;
            });
            let total = mockCards.length;
            mockCards = mockCards.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            total: total,
                            list: mockCards

                        }
                    }]);
                }, 1000);
            });
        });


        //模糊查询匹配的入库管理列表
        mock.onGet('/api/cards/likeinsku').reply(config => {
            let { pageNum, pageSize, likeCardKey } = config.params;
            let mockCards = _Cards.filter(card => {
                if (likeCardKey && card.PACKAGENAME.indexOf(likeCardKey) == -1) return false;
                return true;
            });
            let total = mockCards.length;
            mockCards = mockCards.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            total: total,
                            list: mockCards
                        }
                    }]);
                }, 1000);
            });
        });


        //模糊查询匹配的出库管理列表
        mock.onGet('/api/cards/likeoutsku').reply(config => {
            let { pageNum, pageSize, likeCardKey } = config.params;
            let mockCards = _Cards.filter(card => {
                if (likeCardKey && card.PACKAGENAME.indexOf(likeCardKey) == -1) return false;
                return true;
            });
            let total = mockCards.length;
            mockCards = mockCards.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: {
                            total: total,
                            list: mockCards
                        }
                    }]);
                }, 1000);
            });
        });


        //删除卡号
        mock.onGet('/api/cards/remove').reply(config => {
            let { cardId } = config.params;
            _Cards = _Cards.filter(u => u.id !== cardId);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //批量删除卡号
        mock.onGet('/api/cards/range/remove').reply(config => {
            //let { id } = config.params;
            //_Cards = _Cards.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '删除成功',
                        data: 5
                    }]);
                }, 500);
            });
        });

        //出库卡号
        mock.onGet('/api/cards/outsku').reply(config => {
            // let { cardId } = config.params;
            // _Cards = _Cards.filter(u => u.id !== cardId);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '出库成功'
                    }]);
                }, 500);
            });
        });

        //批量出库卡号
        mock.onGet('/api/cards/range/outsku').reply(config => {
            //let { id } = config.params;
            //_Cards = _Cards.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '出库成功'
                    }]);
                }, 500);
            });
        });



        //获取用户拥有某个号段卡内的实际数量
        mock.onGet('/api/cards/range/skunum').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '查询成功',
                        data: 5
                    }]);
                }, 500);
            });
        });


        //获取用户的直接下级服务商列表
        mock.onGet('/api/user/childusers').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: [{
                            "userid": 1,
                            "servicerName": "郑州二七区服务商"
                        }, {
                            "userid": 2,
                            "servicerName": "郑州金水区服务商"
                        }, {
                            "userid": 3,
                            "servicerName": "郑州高新区服务商"
                        }]
                    }]);
                }, 500);
            });
        });


        //获取所有的套餐列表
        mock.onGet('/api/dict/packlist').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: [{
                            "packname": "GPRS 10元包月套餐"
                        }, {
                            "packname": "GPRS 20元包月套餐"
                        }, {
                            "packname": "GPRS 30元包月套餐"
                        }]
                    }]);
                }, 500);
            });
        });

        //查询卡号详细信息
        mock.onGet('/api/stuCourse/detail').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200,
                        {
                            "code": 0,
                            "msg": "",
                            "data": {
                                "querycode": "123456",
                                "smssign": "否",
                                "gprsused": "8000",
                                "gprssign": "是",
                                "packname": "GPRS10元套餐(2020)",
                                "openstate": "开机(2008)",
                                "smsmonthused": "2000(2012)",
                                "imsi": "460040260908676",
                                "outskutime": "2016-10-16",
                                "gprsnow": "2000",
                                "activetime": "2016-12-05 15:41:38",
                                "iccid": "898602B2221430000006",
                                "balance": "11.32(2011)",
                                "apicode": "0371",
                                "servicername": "郑州二七区服务商",
                                "inskutime": "2016-10-15",
                                "msisdn": 13803831221,
                                "gprstotal": "100",
                                "cardstate": "单向停机(2002)",
                                "lastsyntime": "2016-10-19 15:24:36",
                                "innettype": "4G(2001)",
                                "ip": "10.56.129.64(2001)",
                                "apn": "cmmtm(2001)"
                            }
                        }
                    ]);
                }, 500);
            });
        });


        //获取所有的对接第三方同步接口的应用编码列表
        mock.onGet('/api/dict/appsynlist').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        data: [
                            { "apiname": "郑州地区", "apicode": "0371" },
                            { "apiname": "安阳地区", "apicode": "0372" }
                        ]
                    }]);
                }, 500);
            });
        });


        //批量编辑卡号
        mock.onGet('/api/cards/range/edit').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '修改成功'
                    }]);
                }, 500);
            });
        });

        //新增用户
        mock.onGet('/user/add').reply(config => {
            let { name, addr, age, birth, sex } = config.params;
            _Users.push({
                name: name,
                addr: addr,
                age: age,
                birth: birth,
                sex: sex
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '新增成功'
                    }]);
                }, 500);
            });
        });

        //获取用户列表（分页）
        mock.onGet('/user/listpage').reply(config => {
            let { page, name } = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            let total = mockUsers.length;
            mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        users: mockUsers
                    }]);
                }, 1000);
            });
        });

        //查询所有课程
        mock.onGet('/api/student/query').reply(config => {
            let { pageSize, currentPage } = config.params;
            let mockCourses = Courses;
            let total = mockCourses.length;
            mockCourses = mockCourses.filter((u, index) => index < pageSize * currentPage && index >= pageSize * (currentPage - 1));

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {

                        code: 0,
                        msg: '请求成功',
                        resData: {
                            total: total,
                            list: mockCourses
                        }
                    }]);
                }, 1000);
            });

        });

        //查询章节管理列表分页
        mock.onGet('/api/student/sectionPage').reply(config => {
            let { pageSize, currentPage } = config.params;

            let mockSections = Sections;
            let total = mockSections.length;
            mockSections = mockSections.filter((u, index) => index < pageSize * currentPage && index >= pageSize * (currentPage - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        resData: {
                            total: total,
                            list: mockSections
                        }
                    }]);
                }, 1000);
            });
        });

        //查询该章节对应的小节
        mock.onGet('/api/student/stuCourse/detail').reply(config => {
            let { pageSize, currentPage } = config.params;
            let mockCourses = Courses;
            let total = mockCourses.length;
            mockCourses = mockCourses.filter((u, index) => index < pageSize * currentPage && index >= pageSize * (currentPage - 1));

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {

                        resCode: 0,
                        resMsg: '请求成功',
                        resData: {
                            total: total,
                            list: [{
                                partName: '计算机基础',

                            }, {
                                partName: '操作系统',

                            }]
                        }
                    }]);
                }, 1000);
            });

        });

        //查询资源
        mock.onGet('/api/student/studys/study').reply(config => {
            let { pageSize, pageNum } = config.params;

            let mockSources = Sources;
            let total = mockSources.length;
            mockSources = mockSources.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        resData: {
                            total: total,
                            list: mockSources
                        }
                    }]);
                }, 1000);
            });
        });

        //得到视频
        mock.onGet('/api/student/getVideo').reply(config => {
            let { partId } = config.params;
            let videourls = null;
            let mockvideo = _Videos;

            for (var i = 0; i < _Videos.length; i++) {
                if (mockvideo[i].partId == partId) {
                    videourls = mockvideo[i].videourl

                }

            }

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        resData: {
                            videoPath: '/static/video/11.mp4',

                        }
                    }]);
                }, 1000);
            });
        });

        //获取公告（分页）
        mock.onGet('/api/student/notices/select').reply(config => {
            let { pageNum, pageSize } = config.params;
            let total = _notices.length;
            let mockNotices = _notices;
            // .filter(user => {
            //     if (pageNum && user.pageNum.indexOf(pageNum) == -1) return false;
            //     return true;
            // });
            mockNotices = mockNotices.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        resData: {
                            noticeList: mockNotices,
                            total: total,
                        },
                    }]);
                }, 1000);
            });
        });

        //教师信息
        mock.onGet('/api/student/listTeacher').reply(config => {
            let { pageNum, pageSize } = config.params;
            let total = TeacherInfo.length;
            let mockTeacherInfo = TeacherInfo;
            mockTeacherInfo = mockTeacherInfo.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        resData: {
                            list: mockTeacherInfo,
                            total: total
                        }
                    }]);
                }, 500);
            });
        });
        //教师评价
        mock.onGet('api/student/teacherEvaluatelist').reply(config => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 0,
                        msg: '请求成功',
                        resData: TeaEvaInfo
                    }]);
                }, 500);
            });
        });


        //获取需要考试的课程
        mock.onPost('/api/student/sectionTest/testCourse').reply(config => {

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resData: [{
                            courseNum: 1,
                            courseName: '2016-05-02',
                            sectionNum: 'java',
                            courseId: 1,
                        }, {
                            courseNum: 2,
                            courseName: '2016-05-01',
                            sectionNum: 'PHP',
                            courseId: 2,
                        }, {
                            courseNum: 3,
                            courseName: '2016-05-03',
                            sectionNum: 'H5',
                            courseId: 3,
                        }]
                    }]);
                }, 500);
            })
        });

        //获取章节的信息用于章节测试
        mock.onPost('/api/student/sectionTest/getSectionTest').reply(config => {
            let { course_id } = JSON.parse(config.data);

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        resData: [{
                            num: 1,
                            sectionName: '2016-05-02',
                            SectionName: 'java',
                            testState: '已经测试',
                            sectionId: 11,
                            score: 60
                        }, {
                            num: 2,
                            sectionName: '2016-05-04',
                            SectionName: 'java',
                            testState: '已经测试',
                            sectionId: 12,
                            score: 60
                        }, {
                            num: 3,
                            sectionName: '2016-05-01',
                            SectionName: 'PHP',
                            testState: '已经测试',
                            sectionId: 13,
                            score: 63
                        }, {
                            num: 4,
                            sectionName: '2016-05-03',
                            SectionName: 'H5',
                            testState: '已经测试',
                            sectionId: 14,
                            score: 65

                        }]
                    }]);
                }, 500);
            })
        });
        mock.onPost('/api/student/sectionTest/getTestPaperOfSection').reply(config => {

            let { section_id } = JSON.parse(config.data);

            setTimeout(() => {
                resolve([200, {}])
            }, 500);
        });
        //学生异动查询
        mock.onGet('/api/teacher/change/query2').reply(config => {

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功',
                        data: bbb
                    }]);
                }, 500);
            });
        });

        //学生申请异动
        mock.onPost('/api/teacher/change/addChange').reply(config => {

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '新增成功'
                    }]);
                }, 500);
            });
        });

    }
}