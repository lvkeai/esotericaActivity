<template>
	<view>
		
		<view class="uni-common-mt" :class="islogin==true?'hide':''">
		            <view class="uni-form-item uni-column">
		                <view class="title">手机号</view>
		                <input class="uni-input" focus placeholder="自动获得焦点" v-model="registForm.phone"/>
		            </view>
					<view class="uni-form-item uni-column">
					    <view class="title">短信验证码<button style="float:right;" type="warn" size="mini" class="phonecodeButtom">获取手机验证码</button></view>
					    <input class="uni-input" maxlength="10" placeholder="输入短信验证码" v-model="registForm.checksms"/>
					</view>
		            <view class="uni-form-item uni-column">
		            	<view class="title">密码</view>
		            	<view class="with-fun">
		            		<input class="uni-input" placeholder="请输入密码" :password="showPassword" v-model="registForm.password"/>
		            	</view>
		            </view>
		            <view class="uni-form-item uni-column">
		            	<view class="title">再次输入</view>
		            	<view class="with-fun">
		            		<input class="uni-input" placeholder="请输入密码" :password="showPassword" />
		            	</view>
		            </view>
					<button type="primary" :loading="false" @click="registfun">注册</button>
					<div><a @click="changeState" style="float:right;color:#8A6DE9;">有账号，去登录!....</a></div>
		</view>
		<view class="uni-common-mt" :class="islogin==false?'hide':''">
		            <view class="uni-form-item uni-column">
		                <view class="title">手机号<button style="float:right;" type="warn" size="mini" @click="changeLogin" >{{loginTypeName}}</button></view>
		                <input class="uni-input" focus placeholder="自动获得焦点" v-model="loginForm.phone" />
		            </view>
		            <view class="uni-form-item uni-column">
		            	<view class="title">{{loginType=="password"?"密码":"短信验证码"}}</view>
		            	<view class="with-fun">
		            		<input class="uni-input" v-model="loginForm.password" :placeholder="loginType=='password'?'请输入密码':'请输入短信验证码'" :password="loginType=='password'?true:false" />
		            	</view>
		            </view>
					<button type="primary" :loading="false" @click="loginfun">登录</button>
					<div><a @click="changeState" style="float:right;color:#8A6DE9;">没有账号，去注册!....</a></div>
		</view>
	</view>
</template>

<script>
	import {sendRandCumSMSForWebXKWByUnlockNoLogin,registForH5,login,userSMSloginNoLogin,getActivityoperateByPage,participate} from '@/api'
	export default {
		data() {
			return {
				loginForm:{},
				registForm:{},
				passwordName:"密码",
				loginType:'password',
				loginTypeName:"验证码登录",
				title:"注册",
				activeConfigForm:{},
				showPassword: true,
				islogin:true,
				src: '../../../static/eye-1.png',
				tabIndex:0,
				tabBars:[{
                    name: '登录',
                    id: 'guanzhu'
                }, {
                    name: '注册',
                    id: 'tuijian'
                }]
			}
			},
			methods: {
				changePassword: function() {
					this.showPassword = !this.showPassword;
				},
				changeState(){
					if(this.islogin){
						this.islogin=false;
					}else{
						this.islogin=true;
					}
				},
				//切换登录方式
				changeLogin(){
					if(this.loginType=='password'){
						if(this.loginForm.phone==''||undefined==this.loginForm.phone){
							alert("手机号不能为空！")
							return;
						}
						this.sendRandCumSMSForWebXKWByUnlockNoLoginfun();
						this.loginType='smscode';
						this.loginTypeName="返回密码登录"
					}else{
						this.loginType='password';
						this.loginTypeName="验证码登录"
					}
				},
				participatefun(id){
					participate({id:id}).then(res=>{
						if(res.S==1){
							if(res.msg==1){
								uni.navigateTo({
									url: "index"
								})
							}else{
								console.log("res.v222="+res.V.targetEsotericaId+"-----",res.V);
								uni.navigateTo({
									url: "myCollection/myCollection?targetEsotericaId="+res.V.targetEsotericaId+"&&userstate="+res.V.state
								})
							}
						}
					})
				},
				registfun(){
					registForH5({account:this.registForm.phone,nickName:this.registForm.phone,password:this.registForm.password,phone:this.registForm.password,checksms:this.registForm.checksms}).then(res=>{
						if(res.S==1){
							//注册成功直接登录
							login({account:this.registForm.phone,password:this.registForm.password}).then(res=>{
								if(res.S==1000){
									//判断是否参加活动
									this.participatefun(res.V.id);
								}else{
									
								}
							})
						}
					})
				},
				loginfun(){
					if(this.loginType=='password'){
						login({account:this.loginForm.phone,password:this.loginForm.password}).then(res=>{
							console.log("res",res)
							if(res.S==1000){
								//判断是否参加活动
								this.participatefun(res.V.id);
								
							}else{
								alert("登录失败，账号或密码错误")
							}
						})
					}else{
						userSMSloginNoLogin({phone:this.loginForm.phone,appTag:99,smscode:this.loginForm.password}).then(res=>{
							if(res.S==1000){
								//判断是否参加活动
								this.participatefun(res.V.id);
									
								}else{
									alert("登录失败，账号或密码错误")
							}
						})
					}
				},
				//短信验证码
				sendRandCumSMSForWebXKWByUnlockNoLoginfun(){
					sendRandCumSMSForWebXKWByUnlockNoLogin({phone:this.loginForm.phone}).then(res=>{
						
					})
				}
			}
	}
</script>

<style scoped>
	.title {
		padding: 10upx 25upx;
	}
	.uni-icon-clear,
	.uni-icon-eye {
		color: #999;
	}
	.phonecodeButtom{
		margin: 0 0 0 0;
	}
	.hide{
		display: none;
	}
</style>
