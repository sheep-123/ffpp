<template>
	<u-input :value="value"  @clear="clearHandle" @input="$emit('input', $event)" clearable 
		:customStyle="{'background':'#F5F5F5',height:'68rpx'}" border="none" shape="circle" :placeholder="placeholder">
		<template slot="prefix">
			<view v-if="leftShow" class="prefix-location" @click="$emit('choseAddHandle')">
				<text>{{cityName}}</text>
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
</template>

<script>
	export default {
		name: "WSerch",
		props: {
			value: { // 必须命名为 value
				type: String,
				default: ''
			},
			cityName: {
				default: '',
				type: [String]
			},
			leftShow:{
				default:true,
				type:Boolean
			},
			placeholder:{
				default:'请输入场地关键词',
				type: String,
			}
		},
		data() {
			return {

			};
		},
		methods: {
			searchHandle() {
				this.$emit('search');
			},
			clearHandle(){
				this.$emit('clear');
			}
		}
	}
</script>

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