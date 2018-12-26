
//卡号状态下拉框
const options_cardstate = [
          {
					  value: '00',
					  label: '正常'
					}, {
					  value: '01',
					  label: '单向停机'
					}, {
					  value: '02',
					  label: '停机'
					}, {
					  value: '03',
					  label: '预销号'
					}, {
					  value: '04',
					  label: '销号'
					}, {
					  value: '05',
					  label: '过户'
					}, {
					  value: '06',
					  label: '休眠'
					}, {
					  value: '07',
					  label: '待激活'
					}, {
					  value: '99',
					  label: '号码不存在'
					}
];

//卡号套餐类型下拉框
const options_cardtype = [
          {
					  value: '0',
					  label: '全球通A套餐'
					}, {
					  value: '1',
					  label: '全球通B套餐'
					}, {
					  value: '2',
					  label: '全球通C套餐'
					}, {
					  value: '3',
					  label: '全球通D套餐'
					}, {
					  value: '4',
					  label: '全球通E套餐'
					}
];                  

//卡号API代码下拉框
const options_cardapicode = [
          {
					  value: '0371',
					  label: '郑州地区'
					}, {
					  value: '0391',
					  label: '焦作地区'
					}, {
					  value: '0379',
					  label: '洛阳地区'
					}, {
					  value: '0373',
					  label: '新乡地区'
					}, {
					  value: '0372',
					  label: '安阳地区'
					}
]; 

//卡号服务商下拉框
let options_servicerman = [
          {
					  value: '0',
					  label: '郑州服务商'
					}, {
					  value: '1',
					  label: '焦作服务商'
					}, {
					  value: '2',
					  label: '安阳服务商'
					}, {
					  value: '3',
					  label: '开封服务商'
					}, {
					  value: '4',
					  label: '南阳服务商'
					}
]; 


//卡号服务商下拉框
const options_servicerLevel = [
					{
					  value: '0',
					  label: '管理员'
					},
					{
					  value: '1',
					  label: '一级服务商'
					}, {
					  value: '2',
					  label: '二级服务商'
					}
]; 




export default { 
	opt_cardstate:options_cardstate,
	opt_cardtype:options_cardtype,
	opt_cardapicode:options_cardapicode,
  opt_servicerman:options_servicerman,
	opt_servicerLevel:options_servicerLevel
};