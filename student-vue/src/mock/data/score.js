import Mock from 'mockjs';

const Scores = [{
    courseId: '1',
    courseName: '语文',
    scoreExam: '200',
    examAddtime: '2017-6-6',
    examDelete: '休学'
}, {
    courseId: '2',
    courseName: '数学',
    scoreExam: '100',
    examAddtime: '2017-6-6',
    examDelete: '休学'
}, {
    courseId: '3',
    courseName: '物理',
    scoreExam: '100',
    examAddtime: '2017-6-6',
    examDelete: '休学'
}, {
    courseId: '4',
    courseName: '化学',
    scoreExam: '100',
    examAddtime: '2017-6-6',
    examDelete: '休学'
}];
const ScoreDetail = [{
    scorePlay: '1',
    scoreOntime: '钢铁是怎样炼成的',
    scoreTest: '30',
    scoreExam: '2017-6-6',
}, {
    scorePlay: '2',
    scoreOntime: '语文',
    scoreTest: '30',
    scoreExam: '2017-6-6',

}, {
    scorePlay: '3',
    scoreOntime: '语文',
    scoreTest: '30',
    scoreExam: '2017-6-6',

}, {
    scorePlay: '4',
    scoreOntime: '语文',
    scoreTest: '30',
    scoreExam: '2017-6-6'
}];
const Topics = [{
        selectName: '题目',
        selectA: '....',
        selectB: '30',
        selectC: '20',
        selectD: '10',
        selectAnswer: '10'
    },
    {
        selectName: '题目',
        selectA: '....',
        selectB: '30',
        selectC: '20',
        selectD: '10',
        selectAnswer: '10'
    },

    {
        selectName: '题目',
        selectA: '....',
        selectB: '30',
        selectC: '20',
        selectD: '10',
        selectAnswer: '10'
    },

    {
        selectName: '题目',
        selectA: '....',
        selectB: '30',
        selectC: '20',
        selectD: '10',
        selectAnswer: '10'
    }

];

export { Scores, ScoreDetail, Topics };