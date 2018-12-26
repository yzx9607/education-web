<template>

<el-dialog title="修改密码" v-model="editUserPwdFormVisible" :close-on-click-modal="false">

	<el-form ref="form" :model="form" label-width="200px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="账号：">
			<el-input value="zxy01" :disabled="true"></el-input>
		</el-form-item>
		<el-form-item label="手机：">
			<el-input value="15912321791" :disabled="true"></el-input>
		</el-form-item>
		<el-form-item label="原密码：">
			<el-input v-model="form.delivery"></el-input>
		</el-form-item>
		<el-form-item label="新密码：">
			<el-input v-model="form.delivery"></el-input>
		</el-form-item>
		<el-form-item label="确认密码：">
			<el-input v-model="form.delivery"></el-input>
		</el-form-item>		
		<el-form-item>
			<el-button type="primary">确定</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				editUserPwdFormVisible:true,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: '******',
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			}
		}
	}

</script>