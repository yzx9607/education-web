import Mock from 'mockjs';
const notices = [];
for (let i = 0; i < 86; i++) {
    notices.push(Mock.mock({
        noticeId: '12987122',
        noticeName: '好滋好味鸡蛋仔',
        noticeTarget: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        teacherRealName: '王小虎夫妻店',
        noticeDateStr: '10333',
        cate: '王小虎夫妻店'
    }));
}

export { notices };