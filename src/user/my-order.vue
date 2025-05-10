<template>
	<!-- 
		订单 : 
		根据 订单状态是否为 4、5 
		是： 按订单状态展示 （查看）
		否: 查看退款状态 
		非1 ： 按退款状态展示 （查看）
		是1：判断支付状态
		
	 -->

	<view class="box">
		<WNavbar title="我的订单" />
		<!-- <u-sticky :offsetTop="(44+systemInfo.statusBarHeight)+'px'">
			<view class="tabs-box">
				<u-tabs :activeStyle="{color:'#1D2326','font-weight':600}" lineColor="#EC384A" :list="list1"></u-tabs>
			</view>
		</u-sticky> -->

		<div class="search-box">
			<u-input v-model="searchParmas.keywords" @clear="clearHandle" @input="$emit('input', $event)" clearable
				:customStyle="{'background':'#FFF',height:'68rpx'}" border="none" shape="circle" placeholder="请输入订单关键词">
				<template slot="prefix">
					<view class="prefix-location" @click="$emit('choseAddHandle')">
						<text>赛事</text>
						<!-- <view class="triangle-down-999C9D">
							
						</view> -->
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
			<div @click="tabChangleHandle(item)"
				:class="searchParmas.paymentStatus==item.key?'tab-btn-box_item active':'tab-btn-box_item'"
				v-for="(item,index) in tabs" :key="index">
				{{item.value}}
			</div>
		</div>

		<div class="order-list" v-if="orderList.length" >
			<div class="order-list_item" v-for="(item,index) in orderList" :key="index">
				<div class="top flex-jb">
					<div class="left flex-ac">
						<div class="type flex-center">{{orderType[item.orderType]}}</div>
						<div class="title">{{item.matchName}}</div>
					</div>
					<div class="right">
						{{getOrderStatus(item).statusText}}
					</div>
				</div>
				<div class="center">
					<div class="img-box">
						<image :src="item.matchMainImage" mode=""></image>
					</div>
					<div class="info">
						<div class="price">托管奖金 ¥{{item.amount}}</div>
						<div class="date">{{getOrderStatus(item).dateText}}：{{item.updateTime}}</div>
					</div>
				</div>
				<div class="bottom">
					<div class="btns">
						<div v-if="getOrderStatus(item).btns.includes('detail')"  class="bt1 flex-center" @click="$utils.toPath.navigateTo('/user/order-detail?orderId='+item.id)">
							查看
						</div>
						<div v-if="getOrderStatus(item).btns.includes('pay')"  class="bt1 flex-center" @click="$utils.toPath.navigateTo('/user/order-detail?orderId='+item.id)">
							去支付
						</div>
						<div v-if="getOrderStatus(item).btns.includes('back')"  class="bt1 flex-center" @click="$utils.toPath.navigateTo('/user/order-detail?orderId='+item.id)">
							退款
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<emptyPage text="暂无订单信息" v-else ></emptyPage>
	</view>
</template>


<script>
	const app = getApp();
	import WNavbar from '@/components/WNavbar/index.vue';
	import emptyPage from '@/components/emptyPage/index.vue'
	export default {
		components: {
			WNavbar,
			emptyPage
		},
		data() {
			return {
				orderType: {
					'1': '托管奖金',
					'2': '赞助奖金',
					'3': '报名费',
				},
				value: '',
				list1: [{
					name: '支付',
				}, {
					name: '收入',
				}],
				tabs: [{
						key: '',
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
				searchParmas: {
					// userId:uni.getStorageSync('user').id,
					userId: 4,
					page: 1,
					size: 10,
					paymentStatus: '',
					keywords: ''
				},
				orderList: []
			}
		},
		onReachBottom() {
		
		},
		methods: {
			getOrderStatus(item) {
				// 订单 : 
				// 根据 订单状态是否为 4、5 
				// 是： 按订单状态展示 （查看）
				// 否: 查看退款状态 
				// 非1 ： 按退款状态展示 （查看）
				// 是1：判断支付状态
				// 按钮 detai:查看 pay:支付  back:退款
				if (item.orderStatus == '4' || item.orderStatus == '5') {
					return {
						statusText: item.orderStatus == '4' ? '已取消' : '过期未支付',
						dateText:'取消日期',
						btns:['detai']
					}
				} else {
					if (item.refundStatus != '1') {
						// 发起退款
						const obj = {
							'2': '部分退款',
							'3': '全额退款',
							'4': '退款处理中',
							'5': '退款失败'
						}
						return {
							statusText: obj[item.refundStatus],
							dateText:'退款日期',
							btns:['detai']
						}
					} else {
						const obj = {
							'1': '未支付',
							'2': '支付成功',
							'3': '支付失败'
						}
						let btns = ['detail']
						item.paymentStatus=='1'&&(btns = ['pay']);
						item.paymentStatus=='2'&&(btns.push('back'));
						return {
							statusText: obj[item.paymentStatus],
							dateText:'支付日期',
							btns
						}

					}
				}
			},
			clearHandle() {
				this.searchParmas.keywords = '';
				this.startFn();
			},
			searchHandle() {
				this.startFn();
			},

			startFn() {
				this.searchParmas.page = 1;
				this.orderList = [];
				this.getList();
			},
			async getList() {
				const res = await this.$requestAll.user.getMyOrderList(this.searchParmas);
				const orderList = [...this.orderList, ...res.data.content]
				this.orderList = this.$utils.uniqueById(orderList, 'id');
			},
			tabChangleHandle(e) {
				this.searchParmas.paymentStatus = e.key;
				this.startFn();

			}
		},
		onLoad() {
			this.getList();
		},
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
			margin-bottom: 24rpx;
			.bottom {
				.btns {
					display: flex;
					flex-direction: row-reverse;

					.bt1 {
						width: 128rpx;
						height: 56rpx;
						border-radius: 56rpx 56rpx 56rpx 56rpx;
						border: 2rpx solid #F0F0F0;
						font-weight: 400;
						font-size: 28rpx;
						color: #1D2326;
						margin-left: 24rpx;
					}
				}
			}

			.center {
				display: flex;
				margin-bottom: 24rpx;

				.img-box {
					width: 124rpx;
					height: 124rpx;
					border-radius: 8rpx;
					overflow: hidden;
					margin-right: 24rpx;
					background-color: #F7F7F7;

					>image {
						width: 100%;
						height: 100%;
					}
				}

				.info {
					.price {
						font-weight: 600;
						font-size: 24rpx;
						color: #1D2326;
						margin-bottom: 16rpx;
					}

					.date {
						font-weight: 400;
						font-size: 24rpx;
						color: rgba(29, 35, 38, 0.6);
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

				.right {
					font-weight: 400;
					font-size: 24rpx;
					color: rgba(29, 35, 38, 0.6);
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