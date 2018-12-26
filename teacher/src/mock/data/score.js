import Mock from 'mockjs';
const Score = [];
for (let i = 0; i < 86; i++) {
  Score.push(Mock.mock({
   studentId:'1',
   studentName:'张三',
   courseName:'java',
   score:'60',
   scorePlay:'10',
   scoreOntime:'10',
   scoreTest:'10',
   scoreExam:'30'
  }));
}
export {Score};