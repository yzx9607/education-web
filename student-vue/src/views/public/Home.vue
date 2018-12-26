<template>
	<el-row class="container">
		<el-col :span="24" class="header"  style="background: #0099cb">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'" @click.native="showMain">
				{{collapsed?'云':sysName}}
			</el-col>
			<el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="showUserInfo">个人资料</el-dropdown-item>
						<el-dropdown-item @click.native="showEditPwd">修改密码</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
							<i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
				
				
				<el-dialog title="修改密码" v-model="editUserPwdFormVisible" :close-on-click-modal="false">
					<el-form ref="editUserPwdForm" :model="editUserPwdForm" :rules="editUserPwdFormRules"  label-width="200px" style="margin:20px;width:60%;min-width:600px;">
						<el-form-item label="账号：">
							<el-input v-model="editUserPwdForm.username" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="手机：">
							<el-input v-model="editUserPwdForm.contactMobile" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="原密码：" prop="sourcePwd">
							<el-input v-model="editUserPwdForm.sourcePwd" type="password"></el-input>
						</el-form-item>
						<el-form-item label="新密码：" prop="newPwd">
							<el-input v-model="editUserPwdForm.newPwd" type="password"></el-input>
						</el-form-item>
						<el-form-item label="确认密码：" prop="okPwd">
							<el-input v-model="editUserPwdForm.okPwd"  type="password"></el-input>
						</el-form-item>		
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click.native="editUserPwdFormVisible = false">取消</el-button>
						<el-button type="primary" @click.native="editUserPwdSubmit" :loading="editLoading">确定</el-button>
					</div>
				</el-dialog>
				
				
				<el-dialog title="个人资料" v-model="userInfoFormVisible" :close-on-click-modal="false">
				
					<el-row>
					  <el-col :span="4" style="padding-top:30px;padding-left:20px;">
						<img :src="sysUserAvatar" />
					  </el-col>
					  <el-col :span="20">
						<el-form ref="userInfoForm" label-position="left" :model="userInfoForm" label-width="100px" style="margin:20px;width:60%;min-width:600px;">
							<el-form-item label="姓名：">
								{{userInfoForm.contactMan}}
							</el-form-item>
							<el-form-item label="手机：">
								<div v-show="!isEditMobile">{{userInfoForm.contactMobile}} <a @click="showEditMobile" style="color:#0099cb;cursor:pointer;">修改</a></div>
								<div v-show="isEditMobile">
									<el-col :span="6"><el-input v-model="userInfoForm.contactMobile" size="small"></el-input></el-col>
									<el-col :span="5"> <el-button type="primary" size="small" @click="handleEditMobile">确定</el-button></el-col>
									<el-col :span="13"></el-col>							
								</div>
							</el-form-item>
							<el-form-item label="级别：">
								{{sysUserName}}
							</el-form-item>
							<el-form-item label="上级服务商：">
								{{userInfoForm.f_contactMan}} {{userInfoForm.f_contactMobile}}
							</el-form-item>
							<el-form-item label="平台账号：">
								{{userInfoForm.username}}
							</el-form-item>
							<el-form-item label="注册时间：">
								{{userInfoForm.regTime}}
							</el-form-item>
						</el-form>	  
					  </el-col>
					</el-row>

					<div slot="footer" class="dialog-footer">
						<el-button type="primary" @click.native="userInfoFormVisible = false">确定</el-button>
					</div>
				</el-dialog>
	
			</section>
		</el-col>
	</el-row>
	
	

	
</template>

<script>
	import { requestLogout,getUserInfo,editUserPwd,editUserMobile } from '../../api/api';

	export default {
		data() {
		
			//自定义二次密码校验器
			var validPwdSame = (rule, value, callback) => {
				if (value === '') {
				  callback(new Error('请再次输入密码'));
				} else if (value !== this.editUserPwdForm.newPwd) {
				  callback(new Error('两次输入密码不一致!'));
				} else {
				  callback();
				}
		    };
		
			return {
				sysName:'云教育学生端 ',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '/static/img/v0.png',
				editLoading:false,
				editUserPwdForm: {
					username: '',
					contactMobile: '',
					sourcePwd: '',
					newPwd: '',
					okPwd: ''
				},
				editUserPwdFormRules: {
					sourcePwd: [
						{ required: true, message: '请输入旧密码', trigger: 'blur' }
					],
					newPwd: [
						{ required: true,min:6, message: '请输入新密码(至少6个字符)', trigger: 'blur' }
					],
					okPwd: [
						{ validator: validPwdSame, trigger: 'blur' }
					]
				},
				editUserPwdFormVisible:false,
				userInfoForm: {
					username: '',
					userlevel: '',
					contactMan: '',
					contactMobile: '',
					regTime: '',
					f_contactMan: '',
					f_contactMobile: ''
				},				
				userInfoFormVisible:false,
				isEditMobile:false

			}
		},
		methods: {
			showMain(){
				var _this = this;
				_this.$router.push('/main');
			},	
			showEditPwd: function() {
				getUserInfo().then(res => {
					this.editUserPwdForm=res.data;
					this.editUserPwdFormVisible = true;
				});	
			},	
			showUserInfo: function() {				
				getUserInfo().then(res => {
					this.userInfoForm=res.data;
					this.userInfoFormVisible = true;
				});		
			},	
			showEditMobile: function() {	
				this.isEditMobile=true;
			},	
			handleEditMobile: function() {	

				//校验手机号的格式
				let mobile = this.userInfoForm.contactMobile;
				var reg = /^1[0-9]{10}$/; 
				if (!reg.test(mobile)) {
					this.$message({
						message: '请输入正确的手机号码',
						type: 'error'
					});
				} else {
						//提交到服务器
					 	var params = { mobile: mobile };
						editUserMobile(params).then(res => {
							this.editLoading=false;
							let { msg, code } = res;
							if (code !== 0) {
								this.$message({
									message: msg,
									type: 'error'
								});
							} else {
								this.$message({
									message: '修改成功',
									type: 'success'
								});
								this.isEditMobile=false;
							}
						}).catch(() => {
							this.$message({
								message: '系统繁忙,请稍候',
								type: 'error'
							});
						});

				}	

			},
			editUserPwdSubmit(){
				this.$refs.editUserPwdForm.validate((valid) => {
					if (valid) {
						this.editLoading=true;
            			var editPwdParams = { oldpwd: this.editUserPwdForm.sourcePwd, newpwd: this.editUserPwdForm.newPwd };
						editUserPwd(editPwdParams).then(res => {
							this.editLoading=false;
							let { msg, code } = res;
							if (code !== 0) {
								this.$message({
									message: msg,
									type: 'error'
								});
							} else {
								this.$message({
									message: '修改成功',
									type: 'success'
								});
								this.$refs['editUserPwdForm'].resetFields();
								this.editUserPwdFormVisible = false;
							}
						}).catch(() => {
							console.log('异常!');
						});

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					//sessionStorage.removeItem('user');
					requestLogout().then(res => {
					sessionStorage.removeItem("stu");
						_this.$router.push('/login');
					});
				}).catch(() => {

				});


			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: $color-primary;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>