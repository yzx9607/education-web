import Mock from 'mockjs';

const Cards = [];

for (let i = 0; i < 86; i++) {
    Cards.push(Mock.mock({
        msisdn: Mock.Random.integer(50000, 99999),
        iccid: Mock.Random.integer(10000, 50025003),
        imsi: Mock.Random.integer(10000001, 50025003),
        querycode: Mock.Random.integer(1000, 2000), //查询代码
        packagename: Mock.Random.cname(), //套餐名称
        apicode: Mock.Random.integer(10803831120, 18815279642),
        addtime: Mock.Random.date(), //入库日期
        //卡状态
        cardstate: "正常",
        //激活日期
        activeDate: Mock.Random.date(),
        //出库日期
        outSkuDate: Mock.Random.date(),
        //服务商名字
        servicername: Mock.Random.cname(),
        //联系人
        contactmobile: Mock.Random.integer(13803831120, 13803831229),
        //用户余额
        currentmoney: Mock.Random.integer(10, 60),
        //总流量
        totalgprs: Mock.Random.integer(500000, 999990),
        //剩余流量
        currentgprs: Mock.Random.integer(50000, 99999),
        //短信使用条数
        usedsmsnum: Mock.Random.integer(100, 5000)
    }));
}

export { Cards };