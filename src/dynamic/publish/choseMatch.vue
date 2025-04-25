<template>
	<view>
		<Navbar>
			<template #left>
				<view class="top-box">
					<u-search searchIconColor="#000" :showAction="false" placeholder="请搜索赛事关键词"
						v-model="keyword"></u-search>
					<text @click="$utils.toPath.back(false)">取消</text>
				</view>
			</template>
		</Navbar>
		<filterArea/>
		<view class="list-box">
			<div class="list-item" v-for="(item,index) in list" :key="item.id" >
				<div class="item-top">
					<view class="img-box">
						<image :src="item.mainImageUrl" mode=""></image>
					</view>
					<view class="info-box">
						<view class="title u-line-2">
							{{item.name}}
						</view> 
						<view class="time">
							<u-icon name="clock"></u-icon>
							<text>周日3.18 19:00-20:30</text>
						</view>
						<view class="address">
							<u-icon name="map"></u-icon>
							<text>1.5km｜ 体育中心体育场</text>
						</view>
					</view>
				</div>
				<view class="item-bottom">
					<div class="num">
						<text>{{item.registerNum}}</text>人已报名
					</div>
					<div class="status">
						<div class="dot"></div>
						<text>报名已结束</text>
					</div>
					<div class="btn" @click="choseMatchHandle(item)">
						关联
					</div>
				</view>
			</div>
		</view>
	</view>
</template>

<script>
	import filterArea from './components/filterArea.vue';
	import Navbar from '@/components/WNavbar/index.vue';

	export default {
		components: {
			Navbar,
			filterArea
		},
		onLoad() {
			this.getList();
		},
		data(){
			return {
				list:[],
				searchParams:{
					pageNum: 1,
					pageSize: 10,
					userLat:0,
					userLng:0,
					labelCode:'',
					adcode4:'',
					adcode6:'',
					sortType: '',
					keywords: '',
				}
			}
		},
		methods:{
			async getList(){
				try {
					uni.showLoading({
						title:'加载中...'
					})
					const res = await this.$requestAll.dynamics.getRaceList(this.searchParams);
					this.list = [...this.list,...res.data.list]
					uni.hideLoading()
				} catch (error) {
					
				}
			},
			choseMatchHandle(e){
				// 模拟
				uni.setStorageSync('choseMachItem','麻将馆比赛');
				// this.$utils.toast('选择成功')
				setTimeout(()=>{
					this.$utils.toPath.back(false);
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #F7F7F7;
	}

	.top-box {
		display: flex;
		align-items: center;

		>text {
			margin-left: 24rpx;
			font-weight: 400;
			font-size: 28rpx;
			color: #000;
		}
	}
	
	.list-box{
		padding: 32rpx;
		.list-item{
			width: 686rpx;
			height: 308rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			margin-bottom: 24rpx;
			padding: 24rpx;
			box-sizing: border-box;
			.item-bottom{
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 74rpx;
				.btn{
					width: 128rpx;
					height: 56rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: 400;
					font-size: 28rpx;
					color: #1D2326;
					border: 2rpx solid #F0F0F0;
					border-radius: 28rpx;
				}
				.num{
					font-weight: 400;
					font-size: 24rpx;
					color: rgba(29,35,38,0.5);
					// margin-right: 80rpx;
					>text{
						color:#1D2326;
					}
				}
				.status{
					display: flex;
					align-items: center;
					font-weight: 400;
					font-size: 20rpx;
					color: rgba(29,35,38,0.5);
					// margin-right: 108rpx;
					.dot{
						width: 16rpx;
						height: 16rpx;
						background: #CCCCCC;
						border-radius: 50%;
						margin-right: 10rpx;
						
					}
				}
			}
			.item-top{
				display: flex;
				.img-box{
					width: 180rpx;
					height: 210rpx;
					border-radius: 4rpx;
					overflow: hidden;
					margin-right: 28rpx;
					>image{
						width: 100%;
						height:100%;
					}
				}
				.info-box{
					.title{
						font-weight: 600;
						font-size: 28rpx;
						color: #333333;
						margin-bottom: 24rpx;
					}
					.time{
						font-weight: 400;
						font-size: 24rpx;
						color: rgba(29,35,38,0.8);
						width: 430rpx;
						height: 52rpx;
						background: linear-gradient( 90deg, rgba(255,255,255,0) 0%, #F5FAF8 100%);
						border-radius: 60rpx 60rpx 60rpx 60rpx;
						display: flex;
						align-items: center;
						margin-bottom: 24rpx;
						>text{
							margin-left:  8rpx;
						}
					}
					.address{
						font-weight: 400;
						font-size: 24rpx;
						color: rgba(29,35,38,0.8);
						display: flex;
						align-items: center;
						>text{
							margin-left:  8rpx;
						}
					}
				}
			}
			.item-bottom{
				
			}
		}
	}
</style>