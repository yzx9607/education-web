import Login from './views/public/Login.vue'
import NotFound from './views/public/404.vue'
import Home from './views/public/Home.vue'
import Main from './views/public/Main.vue'
//import Table from './views/nav2/Table.vue'
import store_in from './views/public/nav2/store_in.vue'
import store_out from './views/public/nav2/store_out.vue'
import store_query from './views/public/nav2/store_query.vue'
import service_provider from './views/public/nav3/service_provider.vue'
import Register from './views/register/register.vue'
import Score from './views/student/score.vue'
import moneystate from './views/money/moneystate.vue'
import set_update from './views/public/nav3/set_update.vue'

import schange from './views/student/schange.vue'
import plan from './views/student/plan.vue'

import thesis from './views/student/thesis.vue'    //毕业论文界面 - 周长磊

import stu_index from './views/student/stu_index.vue' //学生主页
import class_index from './views/student/class_index.vue' //课程界面
import stu_course from './views/student/stu_course.vue' //学习课程界面
import teach_info from './views/student/teacherInfo.vue' //教师信息界面
import notice from './views/student/notice.vue' //教学公告界面
import studyResource from './views/student/studyResource.vue' //资源下载界面
import courseInfo from './views/student/courseInfo.vue' //课程详细信息
import play_video from './views/student/play_video.vue' //播放视频页面
import history_class from './views/student/history_class.vue' //历史课程
import sectionTest from './views/student/sectionTest.vue' //章节测试
import sectionTestPaper from './views/student/sectionTestPaper.vue' //试卷
import courseTest from './views/student/courseTest.vue' //课程测试


import Exam from './views/student/exam.vue'  //考试相关信息
import Paper from './views/student/exam_paper.vue' //考试详情

let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/das',
        component: Home,
        name: '',
        hidden: true
    },
    {
        path: '/home',
        component: Home,
        name: '学生主页',
        hidden: true
    },
    {
        path: '/register',
        component: Register,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/stu_index',
        component: Home,
        name: '学生主页',
        iconCls: 'el-icon-menu',
        leaf: true,
        children: [


            { path: '/stu_index', component: stu_index, name: '学生主页' },
            { path: '/class_index', component: class_index, name: '课程界面', hidden: true },
            { path: '/stu_course', component: stu_course, name: '学习课程', hidden: true },
            { path: '/teach_info', component: teach_info, name: '教师信息', hidden: true },
            { path: '/notice', component: notice, name: '教学公告', hidden: true },
            { path: '/studyResource', component: studyResource, name: '资源下载', hidden: true },
            { path: '/courseInfo', component: courseInfo, name: '课程详细信息', hidden: true },
            { path: '/play_video', component: play_video, name: '视频播放', hidden: true },

            { path: '/history_class', component: history_class, name: '历史课程', hidden: true },
            { path: '/sectionTest', component: sectionTest, name: '章节测试' },
            { path: '/sectionTestPaper', component: sectionTestPaper, name: '试卷' },
            { path: '/courseTest', component: courseTest, name: '选择课程' },

        ],
    },
    {
        path: '/sys1',
        component: Home,
        name: '系统公告',
        iconCls: 'el-icon-menu',
        leaf: true,
        children: [
            { path: '/my_3', component:notice,name: '系统公告' },
        ],
    },
    {
        path: '/',
        component: Home,
        name: '学费缴纳状态',
        iconCls: 'el-icon-menu',
        leaf: true,
        children: [
            { path: '/money', component: moneystate, name: '学费缴纳状态' },
        ],
    },

    {
        path: '/ziliao',
        component: Home,
        name: '学籍信息',
        iconCls: 'el-icon-menu',
        leaf: true,
        children: [
            { path: '/ziliao', name: '学籍信息' },
        ],
    },
    {
        path: '/jihua',
        component: Home,
        name: '教学计划',
        iconCls: 'el-icon-menu',
        leaf: true,
        children: [
            { path: '/plan',component:plan,name: '教学计划' },
        ],
    },
    {
        path: '/score',
        component: Home,
        name: '学生成绩',
        iconCls: 'el-icon-menu',
        leaf: true,
        children: [
            { path: '/score', component: Score, name: '学生成绩' },
        ],
    },
    {
        path: '/',
        component: Home,
        name: '考试安排',
        iconCls: 'el-icon-menu',
        leaf: true,
        children: [
            { path: '/kaoshi',component: Exam , name: '考试安排' },
            { path:'/Paper', component: Paper , name:'考试'}  
        ],
    },
    {
        path: '/',
        component: Home,
        name: '打印准考证',
        iconCls: 'el-icon-menu',
        leaf: true,
        children: [
            { path: '/print', name: '打印准考证' }
        ],
    },
    {
        path: '/',
        component: Home,
        name: '毕业论文',
        iconCls: 'el-icon-menu',
        leaf: true,
        children: [
            // { path: '/lunwen', name: '毕业论文' }
            { path: '/thesis', component: thesis, name: '毕业论文' }
        ],
    },
    {
        path: '/',
        component: Home,
        name: '异动申请',
        iconCls: 'el-icon-menu',
        leaf: true,
        children: [
            { path: '/schange',component: schange, name: '异动申请' }
        ],
    },

    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];


export default routes;