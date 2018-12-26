import Mock from 'mockjs';
const LoginUsers = [{
        id: 1,
        username: '1001',
        password: '000000',
        avatar: 'http://127.0.0.1:8090/user.png',
        name: '管理员',
        userid: 1,
        userlevel: 0,
        rememberMe: false
    },
    {
        id: 2,
        username: '1002',
        password: '123456',
        avatar: 'http://127.0.0.1:8090/v1.png',
        name: '一级服务商',
        userid: 2,
        userlevel: 1,
        rememberMe: false
    },
    {
        id: 3,
        username: '1003',
        password: '123456',
        avatar: 'http://127.0.0.1:8090/v2.png',
        name: '二级服务商',
        userid: 3,
        userlevel: 2,
        rememberMe: false
    }
];

const Users = [];

for (let i = 0; i < 86; i++) {
    Users.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        addr: Mock.mock('@county(true)'),
        'age|18-60': 1,
        birth: Mock.Random.date(),
        sex: Mock.Random.integer(0, 1),
        mobile: Mock.Random.integer(13803831120, 18815279642),
        accname: Mock.Random.integer(100001, 800253),
        accpwd: Mock.Random.integer(10000001, 50025003),
        contactname: Mock.Random.cname(),
        topname: Mock.Random.cname()

    }));
}

export { LoginUsers, Users };