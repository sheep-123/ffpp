<template>
	<view>
		<Navbar>
			<template #left>
				<view class="top-box">
					<u-search searchIconColor="#000" :showAction="false" placeholder="请搜索赛事关键词"
						v-model="searchParams.keywords"></u-search>
					<text @click="$utils.toPath.back(false)">取消</text>
				</view>
			</template>
		</Navbar>
		<filterArea @choseAdd="choseAdd" @choseSport="choseSport" @choseSort="choseSort" />
		<view class="list-box">
			<MatchItemVue @choseMatch="choseMatchHandle" v-for="(item,index) in list" :key="item.id" :item="item" />
		</view>
	</view>
</template>

<script>
	const app = getApp();
	import MatchItemVue from '@/components/MatchItem.vue';
	import filterArea from './components/filterArea.vue';
	import Navbar from '@/components/WNavbar/index.vue';
	export default {
		components: { 
			Navbar,
			filterArea,
			MatchItemVue
		},
		async onLoad() {
			if (!this.globalData.location.latitude) {
				await this.getLocation();
			}
			this.searchParams.userLat = this.globalData.location.latitude;
			this.searchParams.userLng = this.globalData.location.longitude;
			this.getList();
		},
		data() {
			return { 
				globalData:app.globalData,
				list: [],
				total:0,
				searchParams: {
					pageNum: 1,
					pageSize: 10,
					userLat: 0,
					userLng: 0,
					labelCode: '',
					adcode4: '',
					adcode6: '',
					sortType: '',
					keywords: '',
				}
			}
		},
		onReachBottom() {
			if(this.list.length==this.total){
				return
			}
			this.searchParams.pageNum++;
			this.getList();
		},
		methods: {
			startFn() {
				this.searchParams.pageNum = 1;
				this.list = [];
				this.getList();
			},
			choseAdd(e) {
				this.searchParams.adcode6 = e.distCode;
				this.startFn();
			},
			choseSport(e) {
				this.searchParams.labelCode = e.value;
				this.startFn();
			},
			choseSort(e) {
				this.searchParams.sortType = e.value;
				this.startFn();
			},
			async getList() {
				try {
					uni.showLoading({
						title: '加载中...'
					})
					const res = await this.$requestAll.dynamics.getRaceList(this.searchParams);
					this.list = [...this.list, ...res.data.list];
					this.total = res.data.total;
					uni.hideLoading();
				} catch (error) {
					
				}
			},
			choseMatchHandle(e) {
				// 模拟
				uni.setStorageSync('choseMachItem', JSON.stringify({
					id: e.id,
					name: e.name
				}));
				this.$utils.toPath.back();
				// this.$utils.toast('选择成功')
				// setTimeout(() => {
				// 	this.$utils.toPath.back(false);
				// })
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

	.list-box {
		padding: 32rpx;

		.list-item {
			width: 686rpx;
			height: 308rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			margin-bottom: 24rpx;
			padding: 24rpx;
			box-sizing: border-box;

			.item-bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 74rpx;

				.btn {
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

				.num {
					font-weight: 400;
					font-size: 24rpx;
					color: rgba(29, 35, 38, 0.5);

					// margin-right: 80rpx;
					>text {
						color: #1D2326;
					}
				}

				.status {
					display: flex;
					align-items: center;
					font-weight: 400;
					font-size: 20rpx;
					color: rgba(29, 35, 38, 0.5);

					// margin-right: 108rpx;
					.dot {
						width: 16rpx;
						height: 16rpx;
						background: #CCCCCC;
						border-radius: 50%;
						margin-right: 10rpx;

					}
				}
			}

			.item-top {
				display: flex;

				.img-box {
					width: 180rpx;
					height: 210rpx;
					border-radius: 4rpx;
					overflow: hidden;
					margin-right: 28rpx;

					>image {
						width: 100%;
						height: 100%;
					}
				}

				.info-box {
					.title {
						font-weight: 600;
						font-size: 28rpx;
						color: #333333;
						margin-bottom: 24rpx;
					}

					.time {
						font-weight: 400;
						font-size: 24rpx;
						color: rgba(29, 35, 38, 0.8);
						width: 430rpx;
						height: 52rpx;
						background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #F5FAF8 100%);
						border-radius: 60rpx 60rpx 60rpx 60rpx;
						display: flex;
						align-items: center;
						margin-bottom: 24rpx;

						>text {
							margin-left: 8rpx;
						}
					}

					.address {
						font-weight: 400;
						font-size: 24rpx;
						color: rgba(29, 35, 38, 0.8);
						display: flex;
						align-items: center;

						>text {
							margin-left: 8rpx;
						}
					}
				}
			}

			.item-bottom {}
		}



	}
</style>