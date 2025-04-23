<template>
	<u-popup :show="show" :round="16" safeAreaInsetBottom>
		<view class="ass-modal-box">
			<div class="box-top">
				<div class="left" @click="$emit('close')">取消</div>
				<div class="center">请选择关联运动</div>
				<div class="right" @click="confrimHandle">确定</div>
			</div>
		</view>
		<view style="height: 48vh;">
			<view class="chose-box">
				<div :class="choseList.includes(index)?'chose-item active':'chose-item'" @click="choseItemHandle(index)"
					v-for="(item,index) in sportList" :key="index">
					{{item}}
					<view class="dot" v-if="choseList.includes(index)" >
						—
					</view>
				</div>
			</view>
		</view>
		<view class="ready-chose-box">
			<text>已选择</text>
			<view class="flex-box">
				<div class="item" v-for="(item,index) in choseList" :key="index">
					{{item}}
				</div>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name: "AssociationSportModal",
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				sportList: [
					'篮球', '足球', '足球', '篮球', '足球', '足球', '篮球', '足球', '足球', '篮球', '足球', '足球', '篮球', '足球', '足球', '篮球',
					'足球', '足球',
				],
				choseList: []
			};
		},
		methods: {
			choseItemHandle(current) {
				if (this.choseList.includes(current)) {
					this.choseList.splice(this.choseList.findIndex(i => i == current), 1)
				} else {
					this.choseList.push(current)
				}
			},
			confrimHandle(){
				if(!this.choseList.length){
					this.$utils.toast('请选择关联运动')
					return
				}
				this.$emit('confrim',this.choseList);
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss">
	.ready-chose-box{
		padding: 0 32rpx;
		display: flex;
		align-items: center;
		>text{
			font-weight: 400;
			font-size: 24rpx;
			color: #000000;
			margin-right: 12rpx;
		}
		.flex-box{
			display: flex;
			align-items: center;
			justify-content: center;
			.item{
				padding: 6rpx 12rpx;
				border-radius: 8rpx;
				border: 2rpx solid #EC383C;
				color: #EC383C;
				font-weight: 600;
				font-size: 24rpx;
				color: #EC383C;
				margin-right: 12rpx;
			}
		}
	}
	
	.chose-box {
		padding: 24rpx 32rpx;
		display: flex;
		flex-wrap: wrap;

		.chose-item {
			width: 160rpx;
			height: 64rpx;
			background: #F7F7F7;
			border-radius: 8rpx;
			font-weight: 400;
			font-size: 24rpx;
			color: #1D2326;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 8rpx;
			margin-bottom: 16rpx;
		}

		.active {
			border: 2rpx solid #EC384A;
			box-sizing: border-box;
			position: relative;
			.dot{
				width: 36rpx;
				height: 36rpx;
				background: #FFFFFF;
				border: 3rpx solid #CCCCCC;
				border-radius: 50%;
				display: flex;
				align-items: baseline;
				justify-content: center;
				position: absolute;
				right: -18rpx;
				top: -18rpx;
				color: #ccc;
			}
		}
	}

	.ass-modal-box {
		.box-top {
			height: 110rpx;
			padding: 32rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left {
				font-weight: 400;
				font-size: 28rpx;
				color: rgba(29, 35, 38);
			}

			.center {
				font-weight: 600;
				font-size: 32rpx;
				color: #1D2326;
				line-height: 48rpx;
			}

			.right {
				font-weight: 600;
				font-size: 28rpx;
				color: #2A8ABA;
			}
		}
	}
</style>