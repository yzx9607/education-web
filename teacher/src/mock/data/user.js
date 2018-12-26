import Mock from 'mockjs';
const LoginUsers = [{
        id: 1,
        username: '1001',
        password: '000000',
        roleId: 0,
        rememberMe: false,
    },
    {
        id: 1,
        username: '1002',
        password: '123456',
        roleId: 1,
        rememberMe: false,
    },
    {
        id: 2,
        username: '1003',
        password: '123456',
        roleId: 2,
        rememberMe: false,
    },
    {
        id: 3,
        username: '1004',
        password: '123456',
        userid: 3,
        roleId: 3,
        rememberMe: false,
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