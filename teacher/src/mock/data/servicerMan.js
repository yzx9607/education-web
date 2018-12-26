/**
 * 服务商用户模型数据
 */
import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'http://127.0.0.1:8080/user.png',
    name: '管理员'
  },
  {
    id: 1,
    username: 'zhangsan',
    password: '123456',
    avatar: 'http://127.0.0.1:8080/v1.png',
    name: '一级服务商'
  },
  {
    id: 1,
    username: 'lisi',
    password: '123456',
    avatar: 'http://127.0.0.1:8080/v2.png',
    name: '二级服务商'
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
    mobile:Mock.Random.integer(13803831120, 18815279642),
    accname:Mock.Random.integer(100001, 800253),
    accpwd:Mock.Random.integer(10000001, 50025003),
    contactname: Mock.Random.cname(),
    topname: Mock.Random.cname()

  }));
}

export { LoginUsers, Users };
