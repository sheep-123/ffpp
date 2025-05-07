<template>
	<view>
		<view class="box">
			<!-- 顶部导航栏处 -->
			<view>
				<navbar :isZhanwei="false" :bgColor="bgColor">
					<view slot="left">
						<view class="search-container"
							:style="{ backgroundColor: bgColor == '#fff' ? '#F7F7F7' : 'rgba(255, 255, 255, 0.5)', }">
							<u-input placeholder="搜搜你感兴趣的~" border="none" v-model="keyword" shape="circle"
								placeholderClass="pl-class" placeholderStyle="color:rgba(29,35,38,0.3)">
								<image :src="img.seatrh" class="w48-l" mode="scaleToFill" slot="prefix" />
								<image :src="img.scan" class="w48-r" mode="scaleToFill" slot="suffix" />
							</u-input>
						</view>
					</view>
				</navbar>
				<div @touchstart.stop="handleTouchStart" @touchmove.stop="handleTouchMove"
					@touchend.stop="handleTouchEnd" class="flow-tabs-top" v-if="isTopTabsShow"
					:style="{ top: 44 + systemInfo.statusBarHeight + 'px' }">
					<view style="width: 100%" class="flow-box">
						<view class="left">
							<image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/定位.png"
								style="width: 32rpx; height: 32rpx" />
							<image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/附近.png"
								style="width: 72rpx; height: 30rpx" />
						</view>
						<scroll-view class="center" id="center-scroll" scroll-x>
							<view class="center-item" v-for="(item, index) in list" :key="index">{{ item }}</view>
						</scroll-view>
						<view class="right">
							<image
								src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/more.png"
								class="more" @click="edit"></image>
						</view>
					</view>
				</div>
			</view>

			<!-- 当地图展开的时候 出现的顶部tab栏 -->
			<view v-if="isMapOpen" :style="{ top: 54 + systemInfo.statusBarHeight + 'px' }" class="top-tabs">
				<!-- 循环activeLIST -->

				<block v-for="(item, index) in activeList" :key="index">
					<view @click="activeNode = item.type">
						<view v-if="item.type == activeNode" class="active-img">
							<image :src="item.activeImg"></image>
						</view>
						<view v-else class="tab-item">
							{{ item.name }}
						</view>
					</view>
				</block>
			</view>

			<!-- 场地标记 -->
			<view v-if="isMapOpen"  @click="$utils.toPath.navigateTo('/else/index/markSite')"  class="site-mark" >
				<image :src="img.sitemark" ></image>
			</view>

			<!-- 地图底部信息内容 展开时候出现 -->
			<view v-if="isMapOpen" class="map-bottom-info">
				<mapBottomBox :activeNode="activeNode" />
			</view>

			<map :enable-scroll="isMapOpen" class="map-example" :latitude="nowAddInfo.latitude"
				:longitude="nowAddInfo.longitude" :markers="markers" :scale="16">

				<!-- 首页地图部分 -->

				<!-- 赛事 -->
				<cover-view v-if="isMapOpen && activeNode == 'match'" slot="callout">
					<cover-view v-for="(item, index) in markers" :key="index" :marker-id="item.id" class="map-callout">
						<cover-view class="top">
							<cover-view class="img-box">
								<cover-image
									src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/Frame.png">
								</cover-image>
							</cover-view>
							<cover-view class="title">
								篮球1v1挑战赛 6.12中大篮球1v1挑战赛 6.12中大篮球1v1挑战赛 6.12中大
							</cover-view>
						</cover-view>
						<cover-view class="bottom">
							<cover-view class="type1">进行中</cover-view>
							<cover-view class="avatar-box">
								<cover-view class="avatar-item" :key="index"
									v-for="(item, index) in activeInfo.recentUsers">
									<cover-image class="avatar" :src="item.avatarUrl"></cover-image>
								</cover-view>
								<cover-view class="add">
									<u-icon name="plus" color="#ffffff" size="6"></u-icon>
								</cover-view>
							</cover-view>
						</cover-view>
					</cover-view>
				</cover-view>

				<!-- 活动 -->
				<cover-view v-if="isMapOpen && activeNode == 'activity'" slot="callout">
					<cover-view v-for="(item, index) in markers" :key="index" :marker-id="item.id" class="map-callout">
						<cover-view class="top">
							<cover-view class="img-box">
								<cover-image
									src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/Frame.png">
								</cover-image>
							</cover-view>
							<cover-view class="title">
								篮球1v1挑战赛 6.12中大篮球1v1挑战赛 6.12中大篮球1v1挑战赛 6.12中大
							</cover-view>
						</cover-view>
						<cover-view class="bottom">
							<cover-view class="type1">进行中</cover-view>
							<cover-view class="avatar-box">
								<cover-view class="avatar-item" :key="index"
									v-for="(item, index) in activeInfo.recentUsers">
									<cover-image class="avatar" :src="item.avatarUrl"></cover-image>
								</cover-view>
								<cover-view class="add">
									<u-icon name="plus" color="#ffffff" size="6"></u-icon>
								</cover-view>
							</cover-view>
						</cover-view>

					</cover-view>
				</cover-view>


				<!-- 场地 -->
				<cover-view v-if="isMapOpen && activeNode == 'stadium'" slot="callout">
					<cover-view v-for="(item, index) in markers" :key="index" :marker-id="item.id"
						class="map-callout-stadium">
						<cover-view class="map-callout-stadium-box">
							<cover-image class="map-callout-stadium-img"
								src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/Frame.png">
							</cover-image>
							<cover-view class="map-callout-stadium-title">
								佐佐排球馆
							</cover-view>
						</cover-view>

					</cover-view>
				</cover-view>
				<!-- 征召 -->
				<cover-view v-if="isMapOpen && activeNode == 'invitation'" slot="callout">
					<cover-view class="invitation-box" v-for="(item, index) in markers" :key="index"
						:marker-id="item.id">
						<cover-view class="invitation-top">
							<cover-image class="invitation-top_img"
								src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/Frame.png">
							</cover-image>
							<cover-view class="invitation-top_title">
								麻将组队
							</cover-view>
						</cover-view>
						<cover-view class="invitation-bottom">
							<cover-view class="invitation-bottom_type1">组队中</cover-view>
							<cover-view class="invitation-bottom_num">三缺一</cover-view>
						</cover-view>
					</cover-view>
				</cover-view>
				<!-- 首页内容部分 -->
				<view @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"
					:style="{ transform: `translateY(${scrollY}px)` }">
					<view>
						<view class="pull" @touchstart.stop="handleTouchStart" @touchmove.stop="handleTouchMove"
							@touchend.stop="handleTouchEnd">
							<div class="pull_inner"></div>
						</view>
					</view>
					<!-- tab栏 -->
					<view class="flow-tabs">
						<view style="width: 100%" class="flow-box">
							<view class="left">
								<image
									src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/定位.png"
									style="width: 32rpx; height: 32rpx" />
								<image
									src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/附近.png"
									style="width: 72rpx; height: 30rpx" />
							</view>
							<scroll-view enhanced @dragstart="dragstart" @dragend="dragend" @scroll="isDragging = false"
								class="center" scroll-x>
								<view class="center-item" v-for="(item, index) in list" :key="index">{{ item }}</view>
							</scroll-view>
							<view class="right">
								<image
									src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/more.png"
									class="more" @click="$utils.toPath.navigateTo('/else/index/editSport')"></image>
							</view>
						</view>
					</view>

					<!-- 最开始 为 204 -->
					<!-- 最结束 为 830 -->
					<scroll-view :scroll-with-animation="true" :show-scrollbar="false" :bounces="false" enhanced
						enable-back-to-top @scrolltolower="scrolltolowerHandel" :scroll-y="!isDragging || scrollDoFlag"
						:style="{ height: scrollViewHeight, 'z-index': 1 }" class="list-box">
						<view class="main">
							<view class="item" @click="toDetail(item.id)" v-for="(item) in newsList" :key="item.id">
								<image :src="item.fileUrl" mode="widthFix" />
								<view class="value">{{ item.title }}</view>
								<view class="buttom">
									<view class="left">
										<u-avatar :src="item.releaseUserUrl" size="18"></u-avatar>
										<view class="value">{{ item.releaseUserName }}</view>
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
const mapHeight = 208; //地图可视区域常量
const pullHeight = 30; //滑动器高度常量
import navbar from '@/components/WNavbar/index.vue';
import mapBottomBox from './components/mapBottomBox.vue';
const active = JSON.parse(JSON.stringify({
	"address": "广东省广州市天河区",
	"color": "#1B4CA7",
	"createTime": "2025-04-30 11:27:58",
	"distance": 3.84,
	"endTime": "2025-06-30 11:24:00",
	"entryFee": 648.00,
	"heat": 0,
	"id": 16,
	"mainImageUrl": "https://testfeifanpaopao.jireplayer.com/download/upload/20250430/tmp_7561ca43e2e817b742eb26c2a592068e.jpg",
	"name": "大胃🫅比赛",
	"recentUsers": [
		{
			"avatarUrl": "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/boy.jpg",
			"userId": 16
		},
		{
			"avatarUrl": "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/boy.jpg",
			"userId": 15
		},
		{
			"avatarUrl": "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/boy.jpg",
			"userId": 15
		},
		{
			"avatarUrl": "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/myavatar.jpg",
			"userId": 17
		}
	],
	"registerNum": 4,
	"registrationEndTime": "2025-05-31 11:24:00",
	"serialNum": "202504001186",
	"startTime": "2025-05-30 11:24:00"
})
)
export default {
	data() {
		return {

			// 首页地图模块
			activeInfo: active,

			activeNode: 'match',
			activeList: [
				{
					type: 'match',
					name: '赛事',
					activeImg: this.$img.home.saishi
				},
				// 活动
				{
					type: 'activity',
					name: '活动',
					activeImg: this.$img.home.huodong
				},
				// 场地
				{
					type: 'stadium',
					name: '场地',
					activeImg: this.$img.home.changdi
				},
				// 征召
				{
					type: 'invitation',
					name: '征召',
					activeImg: this.$img.home.zhangzhao
				}
			],

			// 首页内容模块
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
			markers: [
				{
					id: 1,
					latitude: 23.12463,
					longitude: 113.36199,
					width: 4,
					height: 4,
					iconPath: 'https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/Frame.png',
					customCallout: {
						anchorX: 0,
						anchorY: 0,
						display: 'ALWAYS'
					},
				},
				{
					id: 2,
					latitude: 23.12363,
					longitude: 113.37199,
					width: 4,
					height: 4,
					iconPath: 'https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/Frame.png',
					customCallout: {
						anchorX: 0,
						anchorY: 0,
						display: 'ALWAYS'
					},
				},
				{
					id: 3,
					latitude: 23.12563,
					longitude: 113.36699,
					width: 4,
					height: 4,
					iconPath: 'https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/Frame.png',
					customCallout: {
						anchorX: 0,
						anchorY: 0,
						display: 'ALWAYS'
					},
				},
			],
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
		navbar,
		mapBottomBox
	},
	computed: {
		isMapOpen() {
			return this.scrollY == (this.systemInfo.windowHeight - 30)
		},
		scrollViewHeight() {
			const tabsHeight = uni.upx2px(134);
			const marginToHeight = uni.upx2px(40);
			return `calc(100vh - ${this.scrollY + tabsHeight + pullHeight - marginToHeight}px)`
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
	onShow() { },
	async onLoad() {
		this.getList();
		if (!this.globalData.location.latitude) {
			await this.getLocation();
		}
		this.nowAddInfo.latitude = this.globalData.location.latitude;
		this.nowAddInfo.longitude = this.globalData.location.longitude;
		// this.markers = [this.nowAddInfo];
	},
	methods: {
		toDetail(id) {
			this.$utils.toPath.navigateTo('/dynamic/publish/dongTaiDetail?newId=' + id);
		},
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
				e.stopPropagation();
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
			if (this.stop) return
			// 点击某处时候不触发
			if (this.start == parseInt(e.changedTouches[0].clientY)) return
			this.isDragging = false;

			const endY = parseInt(e.changedTouches[0].clientY);
			const deltaY = endY - this.start; // 计算滑动的距离
			if(deltaY > 0) {
				// 向下滑动
				// 如果scrollY在顶部和mapHeight之间，向下滑动时，toCenterHandle()，否则不做处理
				if (this.scrollY <= mapHeight) {
					this.toCenterHandle()
				} 
				// 如果scrollY在mapHeight和底部之间，向下滑动时，toBottomHandle()，否则不做处理
				if (this.scrollY > mapHeight && this.scrollY <= this.systemInfo.windowHeight - pullHeight) {
					this.toBottomHandle()
				}

			} else {
				// 向上滑动
				if (this.scrollY <= mapHeight) {
					this.toTopHandle()
				} else if (this.scrollY > mapHeight && this.scrollY <= this.systemInfo.windowHeight - pullHeight) {
					this.toCenterHandle()
				} else if (this.scrollY > this.systemInfo.windowHeight - pullHeight) {
					this.toBottomHandle()
				} 

			}

			// 根据scrollY的值来判断吸顶的状态
			// if (this.scrollY <= mapHeight / 2) {
			// 	this.toTopHandle()
			// }
			// if (this.scrollY > mapHeight / 2 && this.scrollY <= mapHeight) {
			// 	this.toCenterHandle()
			// }
			// if (this.scrollY > mapHeight && this.scrollY <= mapHeight + (this.systemInfo.windowHeight - mapHeight) /
			// 	2) {
			// 	this.toCenterHandle()
			// }
			// if (this.scrollY > mapHeight + (this.systemInfo.windowHeight - mapHeight) / 2) {
			// 	this.toBottomHandle()
			// }
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
		toTopHandle() {
			this.scrollY = this.topHeight;
			this.bgColor = '#fff';
			this.scrollDoFlag = true
		},
		toCenterHandle() {
			this.bgColor = 'transparent';
			this.scrollY = mapHeight;
			this.scrollDoFlag = false;
		},
		toBottomHandle() {
			this.bgColor = 'transparent';
			this.scrollY = this.systemInfo.windowHeight - pullHeight;
			this.scrollDoFlag = false;
		}
	}
}
</script>

<style lang="scss">
.site-mark{
	position: absolute;
	top: 60%;
	right: 0;
	z-index: 1000;
	width: 60rpx;
	height: 128rpx;

	>image {
		width: 100%;
		height: 100%;
	}
}
.invitation-box {
	width: 200rpx;
	height: 108rpx;
	background: #FFFFFF;
	border-radius: 20rpx;
	padding: 12rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.invitation-bottom {
		display: flex;
		align-items: center;

		&_type1 {
			font-weight: 600;
			font-size: 20rpx;
			color: #2A8ABA;
			margin-right: 8rpx;
		}

		&_num {
			font-weight: 400;
			font-size: 24rpx;
			color: rgba(29, 35, 38, 0.6);
		}
	}

	.invitation-top {
		display: flex;
		align-items: center;
		// margin-bottom: 8rpx;

		&_img {
			width: 56rpx;
			height: 56rpx;
			margin-right: 10rpx;
		}

		&_title {
			font-weight: 600;
			font-size: 24rpx;
			color: #1D2326;
		}
	}
}


.map-callout-stadium {
	width: 220rpx;
	height: 122rpx;
	background: #F4F4F3;
	border-radius: 20rpx;
	border: 2rpx solid #fff;
	box-sizing: border-box;
	opacity: .8;
	overflow: visible !important;

	.map-callout-stadium-box {
		display: flex;
		flex-direction: column;
		align-items: center;

		.map-callout-stadium-img {
			width: 82rpx;
			height: 82rpx;
		}

		.map-callout-stadium-title {
			font-weight: 600;
			font-size: 24rpx;
			color: rgba(29, 35, 38, 0.6);
		}
	}

}

.map-callout {
	width: 260rpx;
	height: 122rpx;
	background: #FFFFFF;
	border-radius: 20rpx;
	padding: 12rpx 8rpx;
	box-sizing: border-box;

	.bottom {
		display: flex;
		align-items: center;

		.type1 {
			font-weight: 600;
			font-size: 20rpx;
			color: #EC384A;
			margin-right: 12rpx;
		}

		.avatar-box {
			display: flex;
			align-items: center;

			.add {
				width: 24rpx;
				height: 24rpx;
				background: #CECECE;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
			}

			.avatar-item {
				width: 24rpx;
				height: 24rpx;
				border-radius: 50%;
				overflow: hidden;
				margin-right: -6rpx;

				>image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.top {
		display: flex;
		margin-bottom: 10rpx;

		.img-box {
			display: inline-block;
			width: 56rpx;
			height: 56rpx;
			margin-right: 4rpx;

			>cover-image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}

		.title {
			width: 172rpx;
			height: 56rpx;
			font-weight: 600;
			font-size: 24rpx;
			color: #1D2326;
			line-height: 56rpx;
			text-overflow: ellipsis;
		}
	}
}

.map-bottom-info {
	width: 750rpx;
	height: 308rpx;
	position: fixed;
	z-index: 111;
	padding: 0 32rpx;
	bottom: 48rpx;
}


// 地图模块
.top-tabs {
	width: 750rpx;
	position: fixed;
	z-index: 111;
	padding: 0 32rpx;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;

	.active-img {
		width: 140rpx;
		height: 68rpx;

		>image {
			width: 100%;
			height: 100%;
		}
	}

	.tab-item {
		width: 140rpx;
		height: 60rpx;
		background: #FFFFFF;
		border-radius: 48rpx;
		border: 2rpx solid #F0F0F0;
		font-weight: 600;
		font-size: 28rpx;
		color: rgba(29, 35, 38, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

}




// 首页模块
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
	border-image: linear-gradient(360deg,
			rgba(255, 255, 255, 1),
			rgba(245, 245, 243, 1)) 3 3;
	box-sizing: border-box;
	padding: 36rpx;
	border-radius: 10%;
	background: #f9f9f8;

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
				background-color: rgb(0, 0, 0, 0.5);
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
			transition: transform linear 0.1s;

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