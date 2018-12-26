import Mock from 'mockjs';

const Sources = [];

for (let i = 0; i < 15; i++) {
  Sources.push(Mock.mock({
    number: i+1,
    resourceId: 1000+1,
    resourceName: '计算机基础知识',
    teacherRealName: '张老师',
    resourceTitle: '2017-7-3'
  }));
}

export { Sources };