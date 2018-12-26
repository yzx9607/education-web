import Login from './views/public/Login.vue'
import NotFound from './views/public/404.vue'
import Home from './views/public/Home.vue'
import Main from './views/public/Main.vue'
import service_provider from './views/public/nav3/service_provider.vue'
import set_update from './views/public/nav3/set_update.vue'
import section from './views/teacher/section.vue'
import section_detail from './views/teacher/section_detail.vue'
import major from './views/manager/public/major.vue'
import permession from './views/super/permession.vue'
import role from './views/super/role.vue'
import courseInform from './views/manager/public/courseInform.vue'
import plan from './views/manager/public/plan.vue'
//引入教师管理页面--冯云威
import teachers_manager from './views/teacher/teachersManager.vue'
//引入添加教师页面 --冯云威
import add_teachers from './views/teacher/addTeacher.vue'
//引入成绩管理页面 --冯云威
import score from './views/teacher/score.vue'
//学费管理页面 - 周长磊
import tuition from './views/manager/Tuition.vue'

import student from './views/manager/student.vue'
import thesis from './views/manager/public/ManageThesis.vue'    //论文管理
import thesisLayout from './views/manager/public/thesisLayout.vue'    //论文规范
import courseManage from './views/manager/public/courseManage.vue'     //课程管理
import enroll from './views/manager/enroll.vue'
import selectSubject from './views/manager/selectSubject.vue'
import judgeSubject from './views/manager/judgeSubject.vue'
import exammanger from './views/teacher/exammanger.vue'
import videomentoring from './views/teacher/videomentoring.vue'
//张露林my_311,my_322,my_333,my_344,shi_21
import my_311 from './views/recruit/public/my_311.vue'
import my_322 from './views/recruit/public/my_322.vue'
import my_333 from './views/recruit/public/my_333.vue'
import my_344 from './views/recruit/public/my_344.vue'
import shi_21 from './views/recruit/public/shi_21.vue'

//申忠正 资源 课件
import teacher_resource from './views/teacher/resource.vue'
import teacher_courseware from './views/teacher/courseware.vue'

//辛亚会 异动管理
import tchange from './views/teacher/tchange.vue'

// 张建磊 公告管理
import notice from './views/manager/public/Notice.vue'

let routes = [{
        path: '/login',
        component: Login,
        name: '登录',
        hidden: true,
        meta: {
            requiresAuth: 0
        }
    },
    {
        path: '/404',
        component: NotFound,
        name: '404',
        hidden: true,
        meta: {
            requiresAuth: 0
        }
    },
    {
        path: '/home',
        component: Home,
        name: '主页',
        hidden: true,
        meta: {
            requiresAuth: 0
        }
    },
    {
        path: '/quan',
        component: Home,
        hidden: false,
        name: '权限模块',
        iconCls: 'el-icon-star-on',
        leaf: true,
        children: [
            { path: '/quaxian', component: permession, name: '权限管理' },
        ],
        meta: {
            requiresAuth: 1
        }

    },
    {
        path: '/role',
        component: Home,
        hidden: false,
        name: '角色模块',
        iconCls: 'el-icon-star-on',
        leaf: true,
        children: [
            { path: '/roleManage', component: role, name: '角色管理' },
        ],
        meta: {
            requiresAuth: 1
        }

    },
    {
        path: '/jiaowu',
        component: Home,
        name: '教务主页',
        hidden: false,
        iconCls: 'el-icon-menu',
        leaf: true,
        children: [
            { path: '/jiao_11', name: '教务主页' },
        ],
        meta: {
            requiresAuth: 2
        }

    },
    {
        path: '/jiaowu',
        component: Home,
        hidden: false,
        name: '学生管理',
        iconCls: 'el-icon-document',
        leaf: true,
        children: [
            { path: '/jiao_12', component: student, name: '学生管理' },
        ],
        meta: {
            requiresAuth: 2
        }

    },

    {
        path: '/jiaowu',
        component: Home,
        name: '学费管理',
        hidden: false,
        iconCls: 'el-icon-star-on',
        leaf: true,
        children: [
            // { path: '/jiao_13', name: '学费管理' },
            { path: '/tuition', component: tuition, name: '学费管理' }
        ],
        meta: {
            requiresAuth: 2
        }

    },
    {
        path: '/jiaowu',
        component: Home,
        hidden: false,
        name: '教学管理',
        iconCls: 'el-icon-edit',
        leaf: true,
        children: [
            { path: '/jiao_14', name: '教学管理' },
        ],
        meta: {
            requiresAuth: 2
        }

    },
    {
        path: '/jiaowu',
        component: Home,
        name: '教师管理',
        hidden: false,
        iconCls: 'el-icon-star-off',
        leaf: true,
        children: [
            { path: '/teachers_manager',component: teachers_manager,name: '教师管理' },
            { path: '/add_teachers',component: add_teachers,name: '添加教师' }
        ],
        meta: {
            requiresAuth: 2
        }

    },
    {
        path: '/jiaowu',
        component: Home,
        hidden: false,
        name: '专业管理',
        iconCls: 'el-icon-star-on',
        leaf: true,
        children: [
            // { path: '/jiao_16', name: '专业管理' },
            { path: '/major', component: major, name: '专业管理' }
        ],
        meta: {
            requiresAuth: 2
        }

    },
    {
        path: '/jiaowu',
        component: Home,
        hidden: false,
        name: '课程管理',
        iconCls: 'el-icon-star-on',
        leaf: true,
        children: [
             { path: '/jiao_17',component:courseManage, name: '课程管理' },
        ],
        meta: {
            requiresAuth: 2
        }

    },
    {
        path: '/jiaowu',
        component: Home,
        hidden: false,
        name: '招生计划',
        iconCls: 'el-icon-star-on',
        leaf: true,
        children: [
            { path: '/jiao_18',component: enroll, name: '招生计划' },
        ],
        meta: {
            requiresAuth: 2
        }

    },
    {
        path: '/jiaowu',
        component: Home,
        name: '异动审核',
        hidden: false,
        iconCls: 'el-icon-star-on',
        leaf: true,
        children: [
            { path: '/tchange',component: tchange, name: '异动审核' },
        ],
        meta: {
            requiresAuth: 2
        }

    },
    {
        path: '/jiaowu',
        component: Home,
        name: '公告管理',
        hidden: false,
        iconCls: 'el-icon-date',
        leaf: true,
        children: [
            // { path: '/jiao_20', name: '公告' },
            { path: '/notice', component: notice, name: '公告管理' }
        ],
        meta: {
            requiresAuth: 2
        }

    },
    {
        path: '/jiaowu',
        component: Home,
        name: '论文管理',
        hidden: false,
        iconCls: 'el-icon-document',
        leaf: true,
        children: [
            { path: '/jiao_21',component:thesis, name: '论文管理' },
            { path: '/layout',component:thesisLayout, name: '论文标准' }
        ],
        meta: {
            requiresAuth: 2
        }

    },
    {
        path: '/jiaowu',
        component: Home,
        hidden: false,
        name: '教学计划',
        iconCls: 'el-icon-document',
        leaf: true,
        children: [
            { path: '/plan',component:plan, name: '教学计划' },
        ],
        meta: {
            requiresAuth: 2
        }

    },
    {
        path: '/jisohi',
        component: Home,
        hidden: false,
        name: '教师主页',
        iconCls: 'el-icon-message', //文字旁边的小图标
        leaf: true,
        children: [
            { path: '/shi_21', name: '教师主页' },
        ],
        meta: {
            requiresAuth: 3
        }
    },

    {
        path: '/point',
        component: Home,
        name: '成绩管理',
        hidden: false,
        iconCls: 'fa fa-bar-chart',
        leaf: true,
        children: [
            { path: '/shi_22', name: '成绩管理' ,component: score},
        ],
        meta: {
            requiresAuth: 3
        }
    },
     {
        path: '/',
        component: Home,
        name: '考试管理',
        iconCls: 'el-icon-edit',
        children: [
            { path: '/selectSubject', component: selectSubject, name: '选择题录入' },
            { path: '/judgeSubject', component: judgeSubject, name: '判断题录入' }

        ],
        hidden: false,
        meta: {
            requiresAuth: 3
        }
    },
    {
        path: '/',    
        hidden: false,
        component: Home,
        name: '课程通知',
        iconCls: 'el-icon-time',
        leaf: true,
        children: [
            { path: '/courseInform', component: courseInform, name: '课程通知' },
        ],
        meta: {
            requiresAuth: 3
        }

    },
    {
        path: '/',
        component: Home,
        name: '考试信息',
        hidden: false,
        iconCls: 'el-icon-document',
        leaf: true,
        children: [
            { path: '/exammanger', name: '考试管理',component: exammanger},
        ],
        meta: {
            requiresAuth: 3
        }
    },
  {
        path: '/',
        component: Home,
        name: '网上答疑',
        iconCls: 'el-icon-edit',
        children: [
            { path: '/videomentoring', name: '视频答疑', component: videomentoring},
            { path: '/my_2', name: '论坛答疑' }

        ],
        hidden: false,
        meta: {
            requiresAuth: 3
        }
    },
    {
        path: '/',
        component: Home,
        name: '课程资源管理',
        hidden: false,
        iconCls: 'fa fa-id-card-o',
        children: [

            { path: '/teacher_resource' ,component:teacher_resource, name: '导学资源'}, 
            { path: '/teacher_courseware/:id' ,component:teacher_courseware, name: '导学课件',hidden: true},
            { path: '/section_detail', name: '管理课程章节', component: section_detail },
            { path: '/store_query', name: '题库' },
        ],
        meta: {
            requiresAuth: 3
        }
    },
   
    {
        path: '/',
        component: Home,
        name: '审核人员',
        hidden: false,
        iconCls: 'el-icon-information',
        leaf: true,
        children: [
            { path: '/my_311', component: my_311,name: '审核人员' },
        ],
        meta: {
            requiresAuth: 4
        }

    },

    {
        path: '/shehe1',
        component: Home,
        name: '缴费信息',
        hidden: false,
        leaf: true,
        iconCls: 'el-icon-plus',
        children: [
            { path: '/my_322', component: my_322,name: '缴费详情' },
        ],
        meta: {
            requiresAuth: 4
        }

    },

    {
        path: '/jiaowu',
        component: Home,
        name: '入学成绩',
        hidden: false,
        iconCls: 'el-icon-document',
        leaf: true,
        children: [
            { path: '/my_333',component: my_333, name: '入学成绩' },
        ],
        meta: {
            requiresAuth: 4
        }

    },
    {
        path: '/jiaowu',
        component: Home,
        name: '历史记录',
        hidden: false,
        iconCls: 'el-icon-d-arrow-left',
        leaf: true,
        children: [
            { path: '/my_344',component: my_344, name: '历史记录' },
        ],
        meta: {
            requiresAuth: 4
        }

    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' },
        meta: {
            requiresAuth: 0
        }
    }
];

export default routes;