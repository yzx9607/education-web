import Mock from 'mockjs';

const Courses = [];

for (let i = 0; i < 30; i++) {
  Courses.push(Mock.mock({
    number: i+1,
    courseName: 'java课程',
    teacherName: '张老师',
    scoreCredit: '90'
  }));
}

export { Courses };