<template>
	<view class="content">
		<div class="p30 doTest">
			<h5 class="mt30">
				<span>算上一卦</span>
				<span></span>
			</h5>
			<div class="titleBg mt30">
				<p class="title">{{nowTopic.content}}（       ）</p>
			</div>
			<div class="btns mt30">
				<ul>
					<li v-for="(item,index) in answerList" :key="index" @click="toNextTopic(item.nextTopicId,item.esotericaId)"><span>{{index+1}}</span>{{item.content}}</li>
					
				</ul>
			</div>
		</div>
		
	</view>
</template>

<script>
	import {getAllTopic,selectAnswerByTopicId,getEsotericaByTargetId} from '@/api'
	export default {
		data() {
			return {
				topicList:[],
				nowTopic:{},
				answerList:[]
			}
		},
		onLoad() {
			getAllTopic({}).then(res=>{
				if(res.S==1){
					this.topicList=res.V;
					if(null!=this.topicList&&this.topicList.length>0){
						this.nowTopic=this.topicList[0];
						this.selectAnswerByTopicIdfun(this.nowTopic.id);
					}
				}else if(res.S=="1001"){
					uni.navigateTo({
						url: "../loginAndRegist"
					})
				}
			})
		},
		methods: {
			selectAnswerByTopicIdfun(topicId){
				selectAnswerByTopicId({topicId:topicId}).then(res=>{
					if(res.S==1){
						this.answerList=res.V;
					}
				})
			},
			toNextTopic(topicId,esotericaId){
				console.log("this.topicList",this.topicList);
				if(topicId!=0){
					for(var i=0;i<this.topicList.length;i++){
						if(topicId==this.topicList[i].id){
							this.nowTopic=this.topicList[i];
							this.selectAnswerByTopicIdfun(this.nowTopic.id);
						}
					}
				}else{
					//返回首页选择相应的证书
					getEsotericaByTargetId({id:esotericaId}).then(res=>{
						if(res.S==1){
							uni.setStorageSync('storage_key', res.V.courseId);
							uni.redirectTo({
								url: "../index?esotericaId="+res.V.courseId
							})
						}
					})
					
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.doTest{
		.content{
		
		}
		h5{
			display: flex;
			justify-content:space-between;
			font-size:32rpx;
			color:#b53509;
			span:nth-of-type(2){
				font-size:24rpx;
				font-weight: normal;
			}
		}
		.titleBg{
			height:329rpx;
			background:url(../../../static/problem.png) no-repeat left top;
			background-size:100% 100%;
			.title{
				padding:50rpx 66rpx;
				font-size:28rpx;
				line-height:48rpx;
			}
		}
		.btns{
			padding-top: 58rpx;
			ul{
				padding:0 ;
				margin:0;
				li{
					height:76rpx;
					line-height:76rpx;
					background:url(../../../static/options.png) no-repeat left top;
					background-size:100% 100%;
					margin-bottom:24rpx;
					display: flex;
					color:#6a1c1b;
					font-size:28rpx;
					span{
						display: block;
						margin:0 40rpx 0 88rpx;
						font-weight: 700;
					}
				}
			}
		}
	}
	
</style>
