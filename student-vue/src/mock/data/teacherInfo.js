import Mock from 'mockjs';

const TeacherInfo = [];

for (let i = 0; i < 86; i++) {
  TeacherInfo.push(Mock.mock({
    teacherRealName:"李四",
    courseModel:"java",
    teacherSchool:"清华",
    teacherDegree:"博士",
    teacherPhone:"13838389438",
    teacherAdderss:"郑州"
  }));
}

export { TeacherInfo };