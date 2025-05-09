<template>
	<view>
		<u-tabbar :value="value">
			<block v-for="(item,index) of tabarList" :key="index">
				<u-tabbar-item :text="item.name" @click="toPath(item.path,'switchTab')" :key="index">
					<image class="u-page__item__slot-icon" slot="active-icon" :src="item.selectPath"></image>
					<image class="u-page__item__slot-icon" slot="inactive-icon" :src="item.iconPath"></image>
				</u-tabbar-item>
			</block>
		</u-tabbar>
	</view>
</template>
<script> 
	export default {
		name: "tabarView",
		props:['value'],
		data() {
			return {
				tabarList: [{
						id: 0,
						name: '找工作',
						path: '/pages/job/index',
						iconPath: '/static/tabar/zg.png',
						selectPath: '/static/tabar/zgX.png'
					},
					{
						id: 1,
						name: '招工人',
						path: '/pages/work/index',
						iconPath: '/static/tabar/zh.png',
						selectPath: '/static/tabar/zhX.png'
					},
					{
						id: 2,
						name: '找工程',
						path: '/pages/project/index',
						iconPath: '/static/tabar/engineering.png',
						selectPath: '/static/tabar/engineerinX.png'
					},
					{
						id: 3,
						name: '课程培训',
						path: '/pages/course/index',
						iconPath: '/static/tabar/course.png',
						selectPath: '/static/tabar/courseX.png'
					},
					{
						id: 4,
						name: '个人中心',
						path: '/pages/mine/index',
						iconPath: '/static/tabar/wode.png',
						selectPath: '/static/tabar/wodeX.png'
					},
				]
			};
		},
		created() {
			uni.hideTabBar();
		}
	}
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
