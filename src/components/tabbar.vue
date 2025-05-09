<template>
	<view>
		<view style="height: 84px;"></view>
		<!-- <u-tabbar :value="currentIndex">
			<block v-for="(item,index) of tabList" :key="index">
				<u-tabbar-item :text="item.text" @click="switchTab(index)" :key="index">
					<image class="u-page__item__slot-icon" slot="active-icon" :src="item.selectedIconPath"></image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" :src="item.iconPath"></image>
				</u-tabbar-item>
			</block>
		</u-tabbar> -->
		
		
		<view class="tabbar">
			<view v-for="(item, index) in tabList" :key="index" class="tabbar-item"
				:class="{ active: currentIndex === index }" @click="switchTab(index)">
				<image :src="currentIndex === index ? item.selectedIconPath : item.iconPath" :style="
		      index == 2 ? 'width: 44px; height: 44px' : 'width: 28px; height: 28px'
		    " mode="widthFix" />
				<view :class="currentIndex === index? 'tabbar-item-text':'tabbar-item-text-no'">{{ item.text }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tabar-view',
		props: ['currentIndex'],
		data() {
			return {
				tabList: [{
						text: "首页",
						iconPath: "/static/images/首页.png",
						selectedIconPath: "/static/images/首页选中.png",
						url: "/pages/index/index",
					},
					{
						text: "去玩",
						iconPath: "/static/images/去玩.png",
						selectedIconPath: "/static/images/去玩选中.png",
						url: "/pages/play/play",
					},
					{
						iconPath: "/static/images/发布.png",
						selectedIconPath: "/static/images/发布.png",
						url: "/pages/add/add",
					},
					{
						text: "消息",
						iconPath: "/static/images/消息.png",
						selectedIconPath: "/static/images/消息选中.png",
						url: "/pages/message/message",
					},
					{
						text: "我的",
						iconPath: "/static/images/我的.png",
						selectedIconPath: "/static/images/我的选中.png",
						url: "/pages/user/user",
					},
				],
			};
		},
		methods: {
			switchTab(index) {
				const {
					url
				} = this.tabList[index];
				if (!url) return; // 如果没有配置跳转路径，则不处理
				uni.switchTab({
					url
				});
			},
		},
		created() {
			console.log(11111111111111);
			uni.hideTabBar();
		}

	};
</script>


<style lang="scss">
	.u-page__item__slot-icon {
		width: 46rpx;
		height: 46rpx;
	}
	.badge {
		position: absolute;
		text-align: center;
		border-radius: 28rpx;
		min-width: 28rpx;
		height: 28rpx;
		line-height: 28rpx;
		padding: 0 2rpx;
		right: 18rpx;
		top: 0;
		background-color: red;
		font-size: 22rpx;
		color: #fff;
	}
	.center {
		flex: 1;
		position: relative;
		.img {
			position: absolute;
			border-radius: 50%;
			border: 0;
			box-shadow:0rpx 0rpx 20rpx 10rpx #b7d4ff;
			top: -28rpx;
			left:21rpx;
			right: 21rpx;
			width:108rpx;
			height:108rpx;
		}
	}
</style>


<style lang="scss">
	.tabbar {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		height: 84px;
		display: flex;
		justify-content: space-around;
		font-weight: 600;
		font-size: 10px;
		color: #1d2326;
		box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
		z-index: 9999999999999999999;
		.tabbar-item {
			margin-top: 12px;
			display: flex;
			flex-direction: column;
			align-items: center;
			.tabbar-item-text{
				font-weight: 600;
				font-size: 20rpx;
				color: #1D2326;
			}
			.tabbar-item-text-no{
				font-weight: 400;
				font-size: 20rpx;
				color: rgba(29,35,38,0.6);
			}
		}
	}
</style>