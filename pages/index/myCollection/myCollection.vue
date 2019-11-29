<template>
	<view class="content">
		<!--分享收集-->
		<div class="p30">
			<h4>赠送课程所需条件</h4>
			<p class="tips">有5个或以上秘籍残页可以获得完整秘籍（课程）</p>
		</div>
		<!-- 书 -->
		<div :class="'book'+isEnd">
			<div><p class="onecn">{{targetEsoterica.esotericaName}}</p></div>
			<div class="booksize" @click="toShare"></div>
		</div>
		<div :class="'bookCon'+isEnd">
			<span :class="isEnd!='2'?'':'hide'">{{bigNum}}/{{bigCompleteNum}}</span>
			<span :class="isEnd=='2'?'':'hide'">已经完成，请登录官网查看视频</span>
		</div>
		<!-- 其他 -->
		<div class="p30 other">
			<h4>其他收集量展示：</h4>
			<ul>
				<li @tap="exchangeEsotericafun(item)" :data-class="item.esotericaName" v-for="(item,index) in pagelist" :key="index">
					<p class="onecnOther">{{item.esotericaName}}</p><p class="pageNum">{{item.num}}</p>
				</li>
			</ul>
			<div class="btns">
				<!-- <a href="#">
					
				</a> -->
				<input placeholder="输入分享码,获得残页" v-model="shareCode">
				<a href="#" @click="enterShareCodefun">
					开始获得
				</a>
			</div>
		</div>
		
	</view>
</template>

<script>
	import {getAllEsotericaPage,enterShareCode,getNowActivityOperate,getEsoterica,exchangeEsoterica} from '@/api'
	export default {
		data() {
			return {
				targetEsoterica:{},
				exerciseId:'',
				chooseTitle:'',
				pagelist:[],
				newActivity:{},
				bigNum:'',
				bigCompleteNum:'',
				shareCode:'',
				isEnd:'',
			}
		},
		onLoad(options) {
			console.log("options",options);
			this.newActivity=getApp().globalData.newActivity;
			if(-1==this.newActivity.completeNum||{}==this.newActivity){
				//重新获取
				getNowActivityOperate({}).then(res=>{
				if(res.S=="1"){
					getApp().globalData.newActivity=res.V;
					this.newActivity=res.V;
				}
				this.targetEsoterica.esotericaId=options.targetEsotericaId
				this.targetEsoterica.esotericaName=options.chooseTitle
				this.targetEsoterica.userstate=options.userstate
				this.getAllEsotericaPagefun();
				})
			}else{
				if(null==options){
					//查询活动信息
				}else{
					this.targetEsoterica.esotericaId=options.targetEsotericaId
					this.targetEsoterica.esotericaName=options.chooseTitle
					this.targetEsoterica.userstate=options.userstate
					this.getAllEsotericaPagefun();
				}
			}
	    },
		methods: {
			toShare(e){
				uni.navigateTo({
					url: "../share/share?targetEsotericaId="+this.targetEsoterica.esotericaId+"&&chooseTitle="+this.targetEsoterica.esotericaName
				})
			},
			getAllEsotericaPagefun(){
				getAllEsotericaPage({}).then(res=>{
					if(res.S==1){
						if(this.targetEsoterica.userstate=='2'){
							this.isEnd='2';
							for(var i=res.V.length-1;i>=0;i--){
								if(res.V[i].esotericaId==this.targetEsoterica.esotericaId){
									this.targetEsoterica=JSON.parse(JSON.stringify(res.V[i]));
									this.bigNum=this.lowerToCap(this.targetEsoterica.num);
									this.bigCompleteNum=this.lowerToCap(this.newActivity.completeNum);
									res.V.splice(i, 1);
								}
							}
							this.pagelist=res.V;
						}else{
							for(var i=res.V.length-1;i>=0;i--){
								if(res.V[i].esotericaId==this.targetEsoterica.esotericaId){
									this.targetEsoterica=JSON.parse(JSON.stringify(res.V[i]));
									this.bigNum=this.lowerToCap(this.targetEsoterica.num);
									this.bigCompleteNum=this.lowerToCap(this.newActivity.completeNum);
									res.V.splice(i, 1);
								}
							}
							this.pagelist=res.V;
							if(this.targetEsoterica.num>=this.newActivity.completeNum){
								console.log("this.targetEsoterica.userstate=",this.targetEsoterica);
								//完成活动
								this.getEsotericafun();
							}
						}
						
					}
				})
			},
			//兑换非指定秘籍
			exchangeEsotericafun(item){
				exchangeEsoterica({esotericaId:item.esotericaId}).then(res=>{
					if(res.S==1){
						if(res.msg==1){
							alert("兑换成功！")
							this.getAllEsotericaPagefun();
						}else if(res.msg==-1){
							alert("残页数量不足以兑换,至少需要"+this.newActivity.exchangeNum+"张")
						}
					}else{
						alert(res.msg)
					}
					
				})
			},
			//合成目标秘籍
			getEsotericafun(){
				getEsoterica({}).then(res=>{
					if(res.S==1){
						alert(res.msg)
						this.isEnd='2';
					}else{
						alert(res.msg)
					}
				})
			},
			//分享码获得秘籍
			enterShareCodefun(){
				enterShareCode({shareCode:this.shareCode}).then(res=>{
					if(res.S==1){
						this.getAllEsotericaPagefun();
						alert(res.msg)
					}else{
						alert(res.msg)
					}
				})
			},
			//小写转大写
			lowerToCap(num){
				if(num==0){
					return "零";
				}else if(num==1){
					return "壹";
				}else if(num==2){
					return "贰";
				}else if(num==3){
					return "叁"
				}else if(num==4){
					return "肆"
				}else if(num==5){
					return "伍"
				}else if(num==6){
					return "陆"
				}else if(num==7){
					return "柒"
				}else if(num==8){
					return "捌"
				}else if(num==9){
					return "玖"
				}else if(num==10){
					return "拾"
				}
				
			}
			
		}
	}
</script>

<style scoped lang="scss">
	h4{
		font-size:15px;
		color:#333;
	}
	.hide{
		display: none;
	}
	.tips{
		color:#fff;
		font-size:12px;
	}
	.book{
		width:467rpx;
		height:429rpx;
		margin:36rpx auto 72rpx;
		background: url(../../../static/collect.png) no-repeat left center;
		background-size: 100% 100%;
	}
	.book2{
		width:467rpx;
		height:429rpx;
		margin:36rpx auto 72rpx;
		background: url(../../../static/book.png) no-repeat left center;
		background-size: 100% 100%;
	}
	.bookCon{
		padding:3px 76px 0 0;
		text-align: right;
		margin:-220px 64px 156px 35px;
		span{
			font-size:68rpx;
			font-family: '经典繁毛楷';
			font-weight: 700;
			color:#c81010;
		}
	}
	.bookCon2{
		padding:3px 76px 0 0;
		text-align: left;
		margin:-218px 0px 158px 166px;
		width: 86px;
		span{
			font-size:34rpx;
			font-family: '经典繁毛楷';
			font-weight: 700;
		}
	}
	.other{
		ul{
			display: flex;
			padding-top:30rpx;
			li{
				width:166rpx;
				height:227rpx;
				background:url(../../../static/residualPage.png) no-repeat left top;
				background-size: 100% 100%;
				list-style: none;
			}
		}
		.btns{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding:58rpx 40rpx 0;
			a{
				display: block;
				width:211rpx;
				height:86rpx;
				color:#fff;
				font-size:12px;
				text-align:center;
				line-height:80rpx;
				text-decoration: none;
				&:nth-child(1){
					background:url(../../../static/arrowLeft.png) no-repeat left top;
					background-size: 100% 100%;
				}
				&:nth-child(2){
					background:url(../../../static/arrowRight.png) no-repeat left top;
					background-size: 100% 100%;
				}
			}
		}
	}
	.two{
	    margin: 0 auto;  
	    height: 140px;  
	    writing-mode: vertical-lr;/*从左向右 从右向左是 writing-mode: vertical-rl;*/ 
	    writing-mode: tb-lr;/*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/  
	}
	.onecn{
	    width: 20px;  
	    margin: 54px 0 -115px 39px;  
	    line-height: 18px;  
		transform: rotate(-17deg); 
	}
	.onecnOther{
	    width: 20px;  
	    margin: 18px 0px -91px 18px;  
	    line-height: 12px;  
		font-size: 12rpx;
		color:#c81010;
	}
	.pageNum{
		width: 40px;
		margin: 58px 0px -91px 40px;  
		line-height: 12px;  
		font-size: 26px;
		color:#c81010;
	}
	.booksize{
		margin: -64px 0px -258px 164px;
		width: 100px;
		height: 150px;
		background-color: #DD524D;
		opacity:0;
	}
</style>
