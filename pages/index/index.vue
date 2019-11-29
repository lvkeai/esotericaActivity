<template>
	<view class="content" >
			<h3 class="top p30">
				<img src="../../static/questionMark.png" />不知道选什么？
			</h3>
			<div class="btns pl30 pr30">
				<a href="javascript:;" @tap="toChild">
					我帮您算算
				</a>
				<!-- <a href="javascript:;">
					还有更多
				</a> -->
				<a href="javascript:;">
					<picker @change="PickerChange" :value="index" :range="picker" range-key="name">
						<view class="picker">
							{{index>-1?picker[index].name:'还有更多'}}
						</view>
					</picker>
				</a>
			</div>
			<div class="personBg">
				<image :class="'hand '+handclass" :src="'../../static/hand'+handcoler+'.png'"></image>
				<div class="booksize" @click="toMyCollection"></div>
				<p class="onecnMid" @tap="choose">{{chooseTitle}}</p>
				<ul>
					<li @tap="Toggle(item)" :class="[item.bookclass]" :data-class="item.name" v-for="(item,index) in booklist" :key="index">
						<img :src="['../../static/'+item.img]"/>
						<p class="onecn">{{item.name}}</p>
					</li>
					
				</ul>
				
				<div :class="'bottomBg backimg'+num" >
					<div>
						<img :src="'../../static/scroll/scroll'+num+'.png'" >
						<div class="text">
							<!-- <h4 :class="['fade-enter'+fade]">{{introductionText}}</h4> -->
							<p :class="['fade-enter'+fade]" style="font-size:8px;width: 90%;min-width: 200px;">{{nowBriefIntroduction}}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="cloud">
				<div class="cloudBg">
					<p class="shareCodeText"><input placeholder="输入分享码得双份" v-model="shareCode"></p>
				</div>
			</div>
			<view class="text-area">
				<text class="title">{{title}}</text>
			</view>
	</view>
</template>

<script>
	import {login,getAllEsoterica,getNowActivityOperate,chooseTargetEsotericaId,participate,getEsotericaByTargetId} from '@/api'
	export default {
		data() {
			return {
				shareCode:'',
				title: '',
				imgHeight:0,
				num:1,
				num2:1,
				fps:10,
				introductionText:'课程简介',
				fade:'',
				moreCertificate:[],
				certificateId:'',
				index: -1,
				handcoler:'grey',
				picker: [],
				nowBriefIntroduction:'选择秘籍，收集残页',
				chooseTitle:'如来神掌',
				chooseId:'',
				handclass:'fade-enter',
				booklist: [{
					    id:'001',
						name: '教师资格证',
						img: 'darkBlue.png',
						bookclass:'bookFold',
						briefIntroduction:'师资证则教业业师之可证。在我国，须在世应认证试等一连试后才请师资证'
					}
				],
				nowActivity:{},
				imgList:['lightBlue.png','purple.png','darkBlue.png'],
				nowCourseId:'',
				booklist2:[]
			}
		},
		onLoad(options) {
			// this.imgHeight=document.body.clientWidth
			var src ='../../static/scroll/scroll1.png';
			setTimeout(function() {
					// XHR to request a JS and a CSS
					var xhr = new XMLHttpRequest();
					// preload image
					new Image().src = "../../static/scroll/scroll3.png";
					new Image().src = "../../static/scroll/scroll5.png";
					new Image().src = "../../static/scroll/scroll7.png";
					new Image().src = "../../static/scroll/scroll9.png";
					new Image().src = "../../static/scroll/scroll11.png";
					new Image().src = "../../static/scroll/scroll13.png";
					new Image().src = "../../static/scroll/scroll15.png";
					new Image().src = "../../static/scroll/scroll17.png";
					new Image().src = "../../static/scroll/scroll19.png";
					new Image().src = "../../static/scroll/scroll21.png";
					
			}, 1000);
			if(null!=options.esotericaId){
				this.nowCourseId=options.esotericaId;
			}
			
			this.tick();
			this.init();

		},
		methods: {
			//初始化，先获得当前启动活动，在获得所有参与活动的秘籍
			init(){
				getNowActivityOperate({}).then(res=>{
					if(res.S=="1"){
						getApp().globalData.newActivity=res.V;
						participate({}).then(res=>{
							if(res.S==1){
								if(res.msg==2){//已经参加活动，去我的收集页面
									console.log("res.v="+res.V.targetEsotericaId+"-----",res.V);
									uni.navigateTo({
										url: "myCollection/myCollection?targetEsotericaId="+res.V.targetEsotericaId+"&&userstate="+res.V.state
									})
								}else{
									this.getAllEsotericafun();
								}
							}
						})
					}else{
						uni.navigateTo({
							url: "loginAndRegist"
						})
					}
				})
				
				
			},
			getAllEsotericafun(){
				getAllEsoterica({}).then(res=>{
					if(res.S==1){
						
						var courses={}
						for(var i=0;i<res.V.length;i++){
							res.V[i].img=this.imgList[i%3];
							res.V[i].bookclass="bookFold";
							courses[res.V[i].courseId]=res.V[i].courseName;
							if(this.nowCourseId!=''){//选中证书
								if(this.nowCourseId==res.V[i].courseId){
									this.booklist.push(res.V[i]);
								}
							}
						}
						for(var key in courses){
							var temp={}
							temp.id=key
							temp.name=courses[key]
							this.picker.push(temp)
						}
						if(this.nowCourseId==''){//默认全部
							this.booklist=res.V;
						}else{
							for(var i=0;i<this.picker.length;i++){
								if(this.nowCourseId==this.picker[i].id){
									this.index=i;
								}
							}
						}
						    this.booklist2=JSON.parse(JSON.stringify(res.V));
					}else{
						alert(res.msg);
					}
					
				})
			},
			Toggle(e) {
				for(var i=0;i<this.booklist.length;i++){
					this.booklist[i].bookclass="bookFold";
				}
				// var anmiaton = e.currentTarget.dataset.class;
				e.bookclass= "bookUnFold";
				this.nowBriefIntroduction=e.briefIntroduction;
				this.chooseTitle=e.name;
				this.chooseId=e.id;
				if(this.handclass=='fade-enter'){
						this.handclass='fade-enter-active';
						this.tick2(10);
				}
			},
			tick() {
				if(this.num<21){
					var self=this;
					setTimeout(function() {
					// 　　　　requestAnimationFrame(this.tick());
					　　　　self.draw(); // ... Code for Drawing the Frame ...
					       self.tick();
					　　}, 1000 / self.fps);
				}else if(this.num>=21){
					//浮现简介
					this.fade='-active'
				}
			},
			draw(){
				if(this.num<21){
					this.num=this.num+2;
				}
			},
			tick2(num){
				if(num>0){
					num--;
					var self=this;
					setTimeout(function() {
					// 　　　　requestAnimationFrame(this.tick());
					　　　　self.draw2(); // ... Code for Drawing the Frame ...
					       self.tick2(num);
					　　}, 1000 / 5);
				}else{
					this.handclass='fade-enter';
				}
			},
			draw2(){
				if(this.handcoler=='grey'){
					this.handcoler='white';
				}else{
					this.handcoler='grey';
				}
				
			},
			//选证书
			PickerChange(e) {
				console.log("e",e);
				// this.fade='';
				// this.num=1;
				this.index = e.detail.value
				var id=this.picker[this.index].id;
				this.booklist=[];
				for(var i=0;i<this.booklist2.length;i++){
					if(id==this.booklist2[i].courseId){
						this.booklist.push(this.booklist2[i]);
					}
				}
				this.tick();
			},
			toChild(e) {
				uni.navigateTo({
					url: "doExercise/doExercise"
				})
			},
			//选择目标秘籍去我的页面
			toMyCollection(e){
				//添加秘籍
				if(this.chooseId==null||this.chooseId==''){
					alert("请选择其他秘籍，如来神掌不卖！")
					return;
				}
				chooseTargetEsotericaId({esotericaId:this.chooseId,shareCode:this.shareCode}).then(res=>{
					if(res.S==1){
						uni.navigateTo({
							url: "myCollection/myCollection?targetEsotericaId="+this.chooseId+"&&chooseTitle="+this.chooseTitle
						})
					}else{
						alert(res.msg)
					}
				})
			},
			choose(e){
				console.log("教师资格证！！！")
			}
		}
	}
</script>

<style scoped lang = "scss">
	.content {
		height:100%;
		display: flex;
		flex-direction: column;
		/*align-items: center;
		justify-content: center; */
		background: url(../../static/background.png) no-repeat left top;
		background-size:100% 100%;;
		h3.top{
			font-size:30rpx;
			vertical-align:middle;
			img{
				width:36rpx;
				height:30rpx;
				vertical-align:middle;
				margin-right:16rpx;
			}
		}
		.btns{
			display: flex;
			align-items: center;
			justify-content: space-between;
			a{
				width:290rpx;
				height:100rpx;
				line-height: 100rpx;
				background:url(../../static/cloudButton.png) no-repeat left center;
				background-size:100% 100%;
				vartical-align:middle;
				font-size:26rpx;
				font-weight: 700;
				color:#fff;
				text-decoration: none;
				text-align:center;
				
			}
		}
		.fade-enter {
		  opacity:0;
		}
		.fade-enter-active{
		  opacity:1;
		  transition:opacity 2s;
		}
		.personBg{
			position: relative;
			height:calc(100% - 100px);
			margin:0 60rpx 0;
			background:url(../../static/people.png) no-repeat left top;
			background-size:100% auto;
			ul{
				padding:0;
				margin:0;
				position: absolute;
				bottom:280rpx;
				left:0rpx;
				display: flex;
				align-items: center;
				/* li{
					width:132rpx;
					height:210rpx;
					list-style: none;
					img{
						height:100%;
					}
				} */
			}
			.bottomBg{
				width:100%;
				position: absolute;
				bottom:10rpx;
				left:0rpx;
				img{
					display: block;
					width:auto;
					height:270rpx;
				}
				.text{
					position: absolute;
					left:44rpx;
					top:36rpx;
					padding:30rpx;
					h4{
						font-size:30rpx;
						color:#333;
					}
					p{
						font-size:24rpx;
					}
				}
				
			}
			.bookFold{
				width:60rpx;
				transition:width 2s;
				height:210rpx;
				list-style: none;
				img{
					height:100%;
				}
			}
			.bookUnFold{
				width:131rpx;
				transition:width 2s;
				height:210rpx;
				list-style: none;
				img{
					height:100%;
				}
			}
		}
	}

	

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.p30{
		padding:30rpx;
	}
	.pl30{
		padding-left:30rpx;
	}
	.pr30{
		padding-right:30rpx;
	}
	.pt30{
		padding-top:30rpx;
	}
	.onecn{
	    width: 20px;  
	    margin: -108px 0px 0px 5px;  
	    line-height: 12px; 
		 font-size: 12rpx;
	}
	.onecnMid{
		width: 20px;
		margin: 146px 0px 0px 231px;  
		line-height: 14px; 
		 font-size: 14px;
		transform: rotate(17deg); 
	}
	.hand{
		margin: 193px 0px -238px 232px;
		width: 50px;
		height: 40px;
	}
	.booksize{
		margin: 130px 0px -258px 233px;
		width: 100px;
		height: 120px;
		background-color: #DD524D;
		opacity:0;
	}
	.picker{
		margin: 10px 0px 0px 0px;
		vartical-align:middle;
	}
	.cloud{
		position: absolute;
		right:8rpx;
		top:288rpx;
		font-size:13px;
		.cloudBg{
			margin: -22px -9px 0px 1px;
			width:360rpx;
			height:156rpx;
			background:url(../../static/cloud.png) no-repeat left top;
			background-size:100% 100%;
			float:right;
			p{
				text-align: center;
				width:80%;
				padding:40rpx 0 0;
			}
		}
	}
	.shareCodeText{
		margin: -5px 0px 0px 20px;
	}
</style>
