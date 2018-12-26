<template>
	<el-form ref="form" :model="form" label-width="200px" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="所有数据每天">
			 <el-time-select
				v-model="form.syntime"
				:picker-options="{ 
						start: '00:00',
						step: '00:60',
						end: '23:00'
						}"
				placeholder="请选择时间">
			 </el-time-select>
			开始同步更新(<span style="color:red">*尽量选择系统闲时，比如:凌晨1点</span>)
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click.native="save" >保存</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import util from '../../../common/js/util'
	import { getSynTime,setSynTime } from '../../../api/api';

	export default {
		data() {
			return {
				form: {
					syntime: ''
				}
			}
		},
		methods: {
			save() {

				if(''===this.form.syntime){
					this.$message({
						message: '请输入每天数据同步的时间点',
						type: 'error'
					});
					return;
				}		

				let para = Object.assign({}, this.form);

				// var tmpSyntime = (!para.syntime || para.syntime == '') ? '' : util.formatDate.format(new Date(para.syntime), 'hh');
				// if(tmpSyntime>6 && tmpSyntime<22 ){
				// 	this.$message({
				// 		message: '同步数据比较耗费系统资源，请尽量选择系统闲时【22:00~06:00】',
				// 		type: 'error'
				// 	});
				// 	return;
				// }


				//hh:mm:ss
				//para.syntime = (!para.syntime || para.syntime == '') ? '' : util.formatDate.format(new Date(para.syntime), 'ss mm hh');
				//para.syntime="00"+" "+para.syntime.split(":")[1]+" "+para.syntime.split(":")[0];
				console.log("para.syntime:"+para.syntime);
				
				setSynTime(para).then((res) => {
					
					let { msg, code } = res;
					if (code !== 0) {
						this.$message({
							message: "设置失败",
							type: 'error'
						});
					} else {
						this.$message({
							message: '保存成功',
							type: 'success'
						});
					}

				});

			}
		},
		mounted() {
			let para = {};
			getSynTime(para).then((res) => {
				this.form.syntime=res.data;
			});
		}

	}
</script>