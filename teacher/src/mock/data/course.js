import Mock from 'mockjs';
const course = [];

for (let i = 0; i < 86; i++) {
    course.push(Mock.mock({
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        courseName: 'Java',
        title: '明天上课',
        address: '上海市普陀区金沙江路 1516 弄'
    }));
}

export { course };