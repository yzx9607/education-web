import Mock from 'mockjs';

const Permession = [];

for (let i = 0; i < 86; i++) {
    Permession.push(Mock.mock({
        permissionId: i + 1,
        permissionName: '用户登陆',
        permissionType: 'menu',
        permissionUrl: '/home/manager/list/add' + i,
        permissionCode: 'all:login'
    }))
}
export { Permession };