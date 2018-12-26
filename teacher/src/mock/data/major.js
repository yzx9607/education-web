import Mock from 'mockjs';
const majors = [];

for (let i = 0; i < 88; i++) {
    majors.push(Mock.mock({
        majorId: 1,
        create_date: '2016-05-04',
        majorName: '好好学习',
        majorCredit: 4,
        majorAcademic: 100,
        cla: 'Java',
        name: '王小虎',
        person: '赵睿慷',
        date: '2017-07-03',
        majorProfile: '上海市普陀区金沙江路 1517 弄'
    }));
}

export { majors };