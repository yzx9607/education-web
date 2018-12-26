
//冯云威
import Mock from 'mockjs';
const Teachers = [];

//教师信息模拟数据
for (let i = 0; i < 86; i++) {
    Teachers.push(Mock.mock({
        teacherId:'1',
        teacherRealName:'张三',
        teacherSex:'男',
        courseName:'java',
        teacherBirth:'2013-1-14',
        teacherDegree:'本科',
        teacherEmail:'120464654@qq.com',
        teacherPhoto:'13838389438',
        teacherAdderss:'河南',
        teacherSchool:'北京大学'
    }));
}

export { Teachers }