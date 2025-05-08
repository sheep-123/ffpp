<template>
	<view class="box">
		<WNavbar title="我的订单" />
		<u-sticky :offsetTop="(44+systemInfo.statusBarHeight)+'px'">
			<view class="tabs-box">
				<u-tabs :activeStyle="{color:'#1D2326','font-weight':600}" lineColor="#EC384A" :list="list1"></u-tabs>
			</view>
		</u-sticky>

		<div class="search-box">
			<u-input :value="value" @clear="clearHandle" @input="$emit('input', $event)" clearable
				:customStyle="{'background':'#FFF',height:'68rpx'}" border="none" shape="circle" placeholder="请输入订单关键词">
				<template slot="prefix">
					<view class="prefix-location" @click="$emit('choseAddHandle')">
						<text>赛事</text>
						<view class="triangle-down-999C9D">

						</view>
					</view>
				</template>
				<template slot="suffix">
					<view class="suffix-box">
						<div class="search-btn" @click="searchHandle">
							搜索
						</div>
					</view>
				</template>
			</u-input>
		</div>

		<div class="tab-btn-box">
			<div :class="searchParmas.activeTab==item.key?'tab-btn-box_item active':'tab-btn-box_item'"
				v-for="(item,index) in tabs" :key="index">
				{{item.value}}
			</div>
		</div>

		<div class="order-list">
			<div class="order-list_item" v-for="(item,index) in orderList" :key="index">
				<div class="top flex-jb">
					<div class="left flex-ac">
						<div class="type flex-center">托管奖金</div>
						<div class="title">{{item.name}}</div>
					</div>
					<div class="right">
						已支付
					</div>
				</div>
				<div class="center">
					<div class="img-box">
						<!-- <image src="" mode=""></image> -->
					</div>
					<div class="info">
						<div class="price">托管奖金 ¥500</div>
						<div class="date">取消日期：2025-12-16 12:59:46</div>
					</div>
				</div>
				<div class="bottom">
					<div class="btns">
						<div class="bt1 flex-center" @click="$utils.toPath.navigateTo('/user/order-detail')" >
							查看
						</div>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>


<script>
	const app = getApp();
	import WNavbar from '@/components/WNavbar/index.vue'
	export default {
		components: {
			WNavbar,
		},
		data() {
			return {
				value: '',
				list1: [{
					name: '支付',
				}, {
					name: '收入',
				}],
				searchParmas: {
					value: '',
					activeTab: 0,
				},
				tabs: [{
						key: 0,
						value: '全部'
					},
					{
						key: 1,
						value: '待支付'
					},
					{
						key: 2,
						value: '已支付'
					},
					{
						key: 3,
						value: '已发放'
					},
				],
				orderList: [{
					id: 1,
					type: '1',
					name: '非凡泡泡16人制羽毛球单打赛',
					price: 500,
					time: '2025-12-16 12:59:46',
					status: 0
				}, ]
			}
		},
		onReachBottom() {

		},
		async onLoad() {},
	}
</script>


<style lang="scss">
	page {
		height: 100%;
		background-color: #F7F7F7;
	}

	.tabs-box {
		padding: 8rpx 32rpx;
		background-color: #fff;

	}

	.search-box {
		padding: 8rpx 32rpx;
		margin: 20rpx 0;
	}

	.order-list {
		padding: 0 24rpx;
	
		&_item {
			padding: 30rpx;
			border-radius: 8rpx;
			background-color: #fff;
			.bottom{
				.btns{
					display: flex;
					flex-direction: row-reverse;
					.bt1{
						width: 128rpx;
						height: 56rpx;
						border-radius: 56rpx 56rpx 56rpx 56rpx;
						border: 2rpx solid #F0F0F0;
						font-weight: 400;
						font-size: 28rpx;
						color: #1D2326;
					}
				}
			}
			.center{
				display: flex;
				margin-bottom: 24rpx;
				.img-box{
					width: 124rpx;
					height: 124rpx;
					border-radius: 8rpx;
					overflow: hidden;
					margin-right: 24rpx;
					background-color: #F7F7F7;
					>image{
						width: 100%;
						height: 100%;
					}
				}
				.info{
					.price{
						font-weight: 600;
						font-size: 24rpx;
						color: #1D2326;
						margin-bottom: 16rpx;
					}
					.date{
						font-weight: 400;
						font-size: 24rpx;
						color: rgba(29,35,38,0.6);
					}
				}
			}
			.top {
				margin-bottom: 24rpx;

				.left {
					.type {
						width: 120rpx;
						height: 44rpx;
						border-radius: 4rpx 4rpx 4rpx 4rpx;
						border: 2rpx solid rgba(236, 56, 74, 0.2);
						font-weight: 600;
						font-size: 24rpx;
						color: #EC384A;
						margin-right: 8rpx;
					}

					.title {
						font-weight: 600;
						font-size: 24rpx;
						color: #1D2326;
					}
				}
				.right{
					font-weight: 400;
					font-size: 24rpx;
					color: rgba(29,35,38,0.6);
				}

			}
		}
	}

	.tab-btn-box {
		display: flex;
		align-items: center;
		padding: 0 32rpx;
		margin-bottom: 20rpx;

		&_item {
			width: 120rpx;
			height: 48rpx;
			background: rgba(41, 41, 41, 0.06);
			border-radius: 8rpx 8rpx 8rpx 8rpx;
			font-weight: 400;
			font-size: 24rpx;
			color: rgba(29, 35, 38, 0.8);
			line-height: 48rpx;
			text-align: center;
			margin-right: 24rpx;
		}

		.active {
			background: #15181A;
			color: #fff;
		}
	}
</style>

<style lang="scss">
	.prefix-location {
		display: flex;
		align-items: center;
		padding: 16rpx 26rpx;

		>text {
			font-weight: 400;
			font-size: 24rpx;
			color: #1D2326;
			margin-right: 4rpx;
		}

		.triangle-down-999C9D {
			width: 0;
			height: 0;
			border-left: 8rpx solid transparent;
			border-right: 8rpx solid transparent;
			border-top: 10rpx solid #1D2326;
		}
	}

	.suffix-box {
		padding: 6rpx;

		.search-btn {
			width: 90rpx;
			height: 45rpx;
			background: #EC384A;
			border-radius: 32rpx;
			font-size: 24rpx;
			color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>