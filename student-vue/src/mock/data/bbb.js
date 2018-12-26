import Mock from 'mockjs';

const bbb = [];

for (let i = 0; i < 15; i++) {
    bbb.push(Mock.mock({
        id:1+i,
       studentId: 1+i,
          studentName: '王小虎',
          studentSex: '男',
          transactionRequest:'修学',
          transactionText: '修学',
          transactionApplyDateStr: '2016-05-03',
          transactionStartStr: '2016-05-03',
          transactionCurrState:'已修学',
          transactionResState: '已审核'
    }));
}

export { bbb };