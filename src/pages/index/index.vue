<template>
	<view>
		<view class="box">
			<!-- 顶部导航栏处 -->
			<view>
				<navbar :isZhanwei="false" :bgColor="bgColor">
					<view slot="left">
						<view class="search-container"
							:style="{ backgroundColor: bgColor=='#fff'?'#F7F7F7':'rgba(255, 255, 255, 0.5)' }">
							<u-input placeholder="搜搜你感兴趣的~" border="none" v-model="keyword" shape="circle"
								placeholderClass="pl-class" placeholderStyle="color:rgba(29,35,38,0.3)">
								<image :src="img.seatrh" class="w48-l" mode="scaleToFill" slot="prefix" />
								<image :src="img.scan" class="w48-r" mode="scaleToFill" slot="suffix" />

							</u-input>
						</view>
					</view>
				</navbar>
				<div @touchstart.stop="handleTouchStart" @touchmove.stop="handleTouchMove "
					@touchend.stop="handleTouchEnd" class="flow-tabs-top" v-if="isTopTabsShow"
					:style="{top:(44+systemInfo.statusBarHeight)+'px'}">
					<view style="width: 100%;" class="flow-box">
						<view class="left">
							<image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/定位.png"
								style="width: 32rpx; height: 32rpx" />
							<image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/附近.png"
								style="width: 72rpx; height: 30rpx" />
						</view>
						<scroll-view class="center" id="center-scroll" scroll-x>
							<view class="center-item" v-for="(item,index) in list" :key="index">{{item}}</view>
						</scroll-view>
						<view class="right">
							<image
								src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/more.png"
								class="more" @click="edit"></image>
						</view>
					</view>
				</div>
			</view>



			<map :enable-scroll="isMapOpen" class="map-example" :zIndex="-1" :latitude="nowAddInfo.latitude"
				:longitude="nowAddInfo.longitude" :markers="markers" :scale="16">
				<view @touchstart="handleTouchStart" @touchmove="handleTouchMove " @touchend="handleTouchEnd"
					:style="{transform: `translateY(${scrollY}px)`}">
					<view>
						<view class="pull" @touchstart.stop="handleTouchStart" @touchmove.stop="handleTouchMove "
							@touchend.stop="handleTouchEnd">
							<div class="pull_inner"></div>
							<!-- <image
								src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/pull.png"
								style="width: 36rpx; height: 22rpx" />
							<view class="value">下拉试试</view> -->
						</view>
					</view>
					<!-- tab栏 -->
					<view class="flow-tabs">
						<view style="width: 100%;" class="flow-box">
							<view class="left">
								<image
									src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/定位.png"
									style="width: 32rpx; height: 32rpx" />
								<image
									src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/附近.png"
									style="width: 72rpx; height: 30rpx" />
							</view>
							<scroll-view enhanced @dragstart="dragstart" @dragend="dragend" @scroll="isDragging=false"
								class="center" scroll-x>
								<view class="center-item" v-for="(item,index) in list" :key="index">{{item}}</view>
							</scroll-view>
							<view class="right">
								<image
									src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/more.png"
									class="more" @click="edit"></image>
							</view>
						</view>
					</view>

					<!-- 最开始 为 204 -->
					<!-- 最结束 为 830 -->
					<scroll-view :scroll-with-animation="true" :show-scrollbar="false" :bounces="false" enhanced
						enable-back-to-top @scrolltolower="scrolltolowerHandel" :scroll-y="(!isDragging||scrollDoFlag)"
						:style="{height: scrollViewHeight,'z-index':1}" class="list-box">
						<view class="main">
							<view class="item" @click="$utils.toPath.navigateTo('/dynamic/publish/dongTaiDetail?newsId='+item.id)" v-for="(item,index) in newsList" :key="item.id">
								<image :src="item.fileUrl" mode="widthFix" />
								<view class="value">{{item.title}}</view>
								<view class="buttom">
									<view class="left">
										<u-avatar :src="item.releaseUserUrl" size="18"></u-avatar>
										<view class="value">{{item.releaseUserName}}</view>
									</view>
									<view class="right">
										<image
											src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/火花.png" />
										<view class="value">1000</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</map>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	const mapHeight = 300; //地图可视区域常量
	const pullHeight = 30; //滑动器高度常量
	import navbar from '@/components/WNavbar/index.vue'
	export default {
		data() {
			return {
				customEasing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
				globalData: app.globalData,
				img: this.$img.home,
				keyword: '',
				bgColor: 'transparent',
				scrollY: mapHeight, //初始下挪高度 单位px
				isDragging: false, //下拉状态
				list: ['关注', '美式橄榄球', '篮球', '飞盘', '电竞', '关注', '美式橄榄球', '篮球', '飞盘', '电竞', '关注', '美式橄榄球', '篮球', '飞盘', '电竞'],
				nowAddInfo: {
					id: 1,
					latitude: null,
					longitude: null,
					width: 58,
					height: 58,
					iconPath: 'https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/Frame.png'
				},
				searchParmas: {
					page: 1,
					pageSize: 10
				},
				markers: [],
				newsList: [],
				loadStatus: 'loadmore', //loadmore还有更多 nomore没有了
				// tabsHeight:0,// tab栏高度
				scrollTop: 0,
				isScrolling: false,
				scrollDoFlag: false,
				difference: 0,
				start: 0,
				stop: false
			}
		},
		components: {
			navbar
		},
		computed: {
			isMapOpen() {
				return this.scrollY == (this.systemInfo.windowHeight - 30)
			},
			scrollViewHeight() {
				const tabsHeight = uni.upx2px(134);
				const marginToHeight = uni.upx2px(40);
				return `calc(100vh - ${this.scrollY+tabsHeight+pullHeight-marginToHeight}px)`
			},
			isTopTabsShow() {
				return this.bgColor == '#fff'
			},
			topHeight() {
				const tabsHeight = uni.upx2px(134); //tabs 的高
				const marginToHeight = uni.upx2px(40); //margin-top 的值
				const headTabs = uni.upx2px(108); //顶部tab的高
				const topHeight = (this.systemInfo.statusBarHeight + 44 + headTabs + marginToHeight) - (
					pullHeight +
					tabsHeight);
				return topHeight
			}
		},
		watch: {
			scrollY(newI) {
				newI <= this.topHeight ? this.bgColor = '#fff' : this.bgColor = 'transparent';
			}
		},
		onShow() {
			this.getList();
		},
		async onLoad() {
			if (!this.globalData.location.latitude) {
				await this.getLocation();
			}
			this.nowAddInfo.latitude = this.globalData.location.latitude;
			this.nowAddInfo.longitude = this.globalData.location.longitude;
			this.markers = [this.nowAddInfo];
		},
		methods: {
			scrolltolowerHandel(e) {
				if (this.loadStatus == 'nomore') {
					return
				}
				this.searchParmas.page++;
				this.getList();
			},
			async getList() {
				const res = await this.$requestAll.dynamics.getMainNews(this.searchParmas);
				res.data.length ? this.loadStatus = 'loadmore' : this.loadStatus = 'nomore';
				this.newsList = [...this.newsList, ...res.data];
			},
			handleTouchStart(e) {
				this.start = parseInt(e.touches[0].clientY);
				this.difference = parseInt(e.touches[0].clientY) - this.scrollY;
				this.isDragging = true;
			},
			handleTouchMove(e) {
				if (e.stopPropagation && (this.scrollY == this.systemInfo.windowHeight - 3)) {
					event.stopPropagation();
				}
				if (!this.isDragging) {
					return
				};
				const deltaY = e.touches[0].clientY - this.difference;
				if (deltaY >= mapHeight && deltaY <= this.systemInfo.windowHeight) {
					this.scrollY = deltaY;
				}
				if (deltaY <= mapHeight && deltaY >= 0) {
					this.scrollY = deltaY;
				}
			},
			handleTouchEnd(e) {
				// 横向拖动tabs时候不触发
				if (this.stop)return
				// 点击某处时候不触发
				if (this.start == parseInt(e.changedTouches[0].clientY))return
				this.isDragging = false;
				if (this.scrollY <= mapHeight / 2) {
					this.toTopHandle()
				}
				if (this.scrollY > mapHeight / 2 && this.scrollY <= mapHeight) {
					this.toCenterHandle()
				}
				if (this.scrollY > mapHeight && this.scrollY <= mapHeight + (this.systemInfo.windowHeight - mapHeight) /
					2) {
					this.toCenterHandle()
				}
				if (this.scrollY > mapHeight + (this.systemInfo.windowHeight - mapHeight) / 2) {
					this.toBottomHandle()
				}
			},
			dragstart() {
				this.stop = true;
			},
			dragend() {
				setTimeout(() => {
					this.stop = false
				}, 1000)
			},
			// 吸顶
			toTopHandle(){
				this.scrollY = this.topHeight;
				this.bgColor = '#fff';
				this.scrollDoFlag = true
			},
			toCenterHandle(){
				this.bgColor = 'transparent';
				this.scrollY = mapHeight;
				this.scrollDoFlag = false;
			},
			toBottomHandle(){
				this.bgColor = 'transparent';
				this.scrollY = this.systemInfo.windowHeight - pullHeight;
				this.scrollDoFlag = false;
			}
		}
	}
</script>

<style lang="scss">
	.flow-tabs-top {
		width: 750rpx;
		height: 108rpx;
		box-sizing: border-box;
		padding: 34rpx 32rpx;
		background: #fff;
		position: fixed;
		z-index: 111;

		.flow-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 134rpx;

			.left {
				width: 200rpx;
				height: 134rpx;
			}

			.center {
				width: 450rpx;
				white-space: nowrap;
				height: 134rpx;

				.center-item {
					display: inline-block;
					margin-right: 28rpx;
					font-weight: 400;
					font-size: 28rpx;
					color: rgba(29, 35, 38, 0.5);
				}
			}

			.right {
				height: 134rpx;
				width: 100rpx;
				text-align: center;

				>image {
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
	}


	.w48-l {
		width: 48rpx;
		height: 48rpx;
		margin-left: 20rpx;
	}

	.w48-r {
		width: 48rpx;
		height: 48rpx;
		margin-right: 20rpx;
	}

	.flow-tabs {
		position: relative;
		width: 750rpx;
		height: 134rpx;
		box-shadow: 0rpx -4rpx 16rpx 0rpx rgba(98, 120, 134, 0.2);
		border: 3rpx solid;
		border-image: linear-gradient(360deg, rgba(255, 255, 255, 1), rgba(245, 245, 243, 1)) 3 3;
		box-sizing: border-box;
		padding: 36rpx;
		border-radius: 10%;
		background: #F9F9F8;

		.flow-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 134rpx;

			.left {
				width: 200rpx;
				height: 134rpx;
			}

			.center {
				width: 450rpx;
				white-space: nowrap;
				height: 134rpx;

				.center-item {
					display: inline-block;
					margin-right: 28rpx;
					font-weight: 400;
					font-size: 28rpx;
					color: rgba(29, 35, 38, 0.5);
				}
			}

			.right {
				height: 134rpx;
				width: 100rpx;
				text-align: center;

				>image {
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
	}

	.search-container {
		display: flex;
		align-items: center;
		border-radius: 20px;
		border: 1px solid #ffffff;
		height: 36px;
		background-color: rgba(255, 255, 255, 0.5);
		width: 80%;
		backdrop-filter: blur(30px);

		&.search-y {
			background: #ffffff;
			width: 85%;

			.back-btn {
				width: 20px;
				height: 20px;
				margin-right: 10px;
			}
		}
	}

	.pl-class {
		font-weight: 400;
		font-size: 14px;
		color: black;
	}

	.pl-class1 {
		font-weight: 400;
		font-size: 14px;
		color: black;
	}

	.box {
		.map-example {
			width: 750rpx;
			height: 100vh;

			.pull {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 30px;

				&_inner {
					width: 60rpx;
					height: 6px;
					border-radius: 3px;
					background-color: rgb(0, 0, 0, .5);
				}

				.value {
					font-weight: 400;
					font-size: 20rpx;
					color: rgba(29, 35, 38, 0.5);
				}

				image {
					width: 32rpx;
					height: 16rpx;
				}
			}

			.list-box {
				position: relative;
				background-color: #fff;
				margin-top: -40rpx;
				transition: transform linear .1s;
				.main {
					column-count: 2;
					column-gap: 20rpx;
					background: #ffffff;
					border-radius: 40rpx;
					padding: 20rpx; // 新增内边距
					box-shadow: 0px -2px 8px 0px rgba(168, 186, 197, 0.2);
					box-sizing: border-box;

					.item {
						width: 100%;
						break-inside: avoid;
						/* 防止元素被分割到不同列 */
						margin-bottom: 20rpx;

						image {
							width: 100%;
							border-radius: 20rpx;
						}

						.value {
							font-size: 28rpx;
							color: #353738;
							font-weight: 600;
						}

						.buttom {
							display: flex;
							justify-content: space-between;
							margin-top: 14rpx;

							.left {
								display: flex;
								align-items: center;
								gap: 10rpx;

								image {
									width: 36rpx;
									height: 36rpx !important;
								}

								.value {
									font-size: 24rpx;
									font-weight: 400;
									color: #474747;
								}
							}

							.right {
								display: flex;
								align-items: center;
								gap: 4rpx;

								image {
									width: 40rpx;
									height: 40rpx;
								}

								.value {
									font-weight: 400;
									font-size: 24rpx;
									color: #474747;
								}
							}
						}
					}
				}
			}
		}
	}
</style>