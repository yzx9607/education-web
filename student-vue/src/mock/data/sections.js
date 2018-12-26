import Mock from 'mockjs';

const Sections = [];

for (let i = 0; i < 15; i++) {
  Sections.push(Mock.mock({
    number: i+1,
    sectionId: 1000+1,
    sectionName: '计算机基础知识',
    teacherName: '张老师',
    secAddtimeStr: '2017-7-3'
  }));
}

export { Sections };

