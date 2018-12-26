import Mock from 'mockjs';
let sections = [];
for (let i = 0; i <= 10; i++) {
    sections.push(Mock.mock({
        courseId: i,
        courseName: 'Java语言基础',
        majorName: '计算机应用技术',
        courseEdition: '2017年春版本',
        courseClass: '计算机专业课程',
        courseCreateDateStr: '2017-6-29'
    }));
}
export { sections }