<template>
	<view>
		<u-input clearable :customStyle="{'background':'#F5F5F5',height:'68rpx'}" border="none" shape="circle" placeholder="请输入场地关键词">
			<template slot="prefix">
				<view class="prefix-location"  @click="$emit('choseAddHandle')" >
					<text>广州</text>
					<view class="triangle-down-999C9D">
						
					</view>
				</view>
			</template>
			<template slot="suffix">
				<view class="suffix-box" >
					<div class="search-btn">
						搜索
					</div>
				</view>
			</template>
		</u-input>
	</view>
</template>

<script>
	export default {
		name: "WSerch",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
.prefix-location{
	display: flex;
	align-items: center;
	padding: 16rpx 26rpx;
	>text{
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
.suffix-box{
	padding: 6rpx;
	.search-btn{
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