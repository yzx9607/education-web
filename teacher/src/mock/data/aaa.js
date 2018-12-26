import Mock from 'mockjs';

const aaa = [];

for (let i = 0; i < 15; i++) {
    aaa.push(Mock.mock({
       studentId: 1+i,
          studentName: '王小虎',
          studentSex: '男',
          transactionRequest:'修学',
          transactionText: '修学',
          transactionApplyDate: '2016-05-03',
          transactionStart: '2016-05-03',
          transactionCurrState:'已修学',
          transactionResState: '已审核'
    }));
}

export { aaa };