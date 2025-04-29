<template>
	<view class="conmentBox">
		<view>
			<view style="display: flex;">
				<view class="rightBox">
					<image class="userAvatar"
						:src="itemInfo.commentUserUrl"
						mode="scaleToFill" />
				</view>
				<view class="leftBox">
					<view class="row1">
						<view class="left">
							<text class="text1">{{itemInfo.commentUserName}}</text>
						</view>
						<view class="right" @tap="smallfrieActive(index)">
							<image class="comment-svg-small"
								src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/comment.svg"
								mode="scaleToFill" />
							<text>{{ 111}}</text>
						</view>
					</view>
					<view class="row2">
						<text>{{itemInfo.content}}</text>
					</view>
					<view class="row3">
						<text class="text2">今天 12:00</text>
					</view>
				</view> 
			</view>
			<view v-if="false" style="display: flex;justify-content: flex-end;">
				<view class="hr"></view>
			</view>
			<view v-if="false" style="display: flex;justify-content: flex-end;">
				<view class="smallCommentBox" v-for="(item, index) in 1" :key="index">
					<view style="display: flex;">
						<view class="rightBox">
							<image class="userAvatar"
								src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/avatar.png"
								mode="scaleToFill" />
						</view>
						<view class="leftBox">
							<view class="row1">
								<view class="left">
									<text class="text1">月诗风呤</text>
									<text class="text2">作者</text>
								</view>
								<view class="right" @tap="smallfrieActive(index)">
									<image class="comment-svg-small"
										src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/comment.svg"
										mode="scaleToFill" />
									<image v-show="!smallfrieisActive[index]" class="frie-svg-small"
										src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/frie.svg"
										mode="scaleToFill" />
									<image v-show="smallfrieisActive[index]" class="frie-svg-small"
										src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/frie-active.svg"
										mode="scaleToFill" />
									<text>{{ samllfrieCount[index] }}</text>
								</view>
							</view>
							<view class="row2">
								<text>这个场地难预定吗？</text>
							</view>
							<view class="row3">
								<text class="text2">今天 12:00</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name:'CommetItem',
		props:{
			itemInfo:{
				type:Object,
				default:()=>({})
			}
		},
		data() {
			return {
				
			}
		},
		methods: {

		},
		onLoad() {
			
		}
	}
</script>


<style scoped lang='scss'>
	.conmentBox {
		width: 100%;

		.hr {
			margin-bottom: 24rpx;
			width: calc(100% - 96rpx);
			border-bottom: 2rpx solid #F0F0F0;
			box-sizing: border-box;
		}

		.smallCommentBox {
			width: calc(100% - 96rpx);

			.rightBox {
				width: 44rpx;
				margin-right: 24rpx;
				.userAvatar {
					width: 44rpx;
					height: 44rpx;
				}
			}

			.leftBox {
				flex: 1;
				display: flex;
				flex-direction: column;
				
				.row1 {
					width: 100%;
					display: flex;
					justify-content: space-between;

					.left {
						.text1 {
							padding-right: 16rpx;
							font-weight: 400;
							font-size: 28rpx;
							color: rgba(29, 35, 38, 0.5);
							line-height: 44rpx;
							text-align: left;
						}

						.text2 {
							width: 40rpx;
							height: 24rpx;
							padding: 4rpx 4px;
							border-radius: 4rpx 4rpx 4rpx 4rpx;
							box-sizing: border-box;
							border: 2rpx solid #EC384A;
							font-family: PingFang SC, PingFang SC;
							font-weight: 600;
							font-size: 20rpx;
							color: #EC384A;
							line-height: 24rpx;
							text-align: left;
							font-style: normal;
							text-transform: none;
						}

					}

					.right {
						display: flex;

						.frie-svg-small {
							width: 32rpx;
							height: 32rpx;
							margin-right: 6rpx;
						}

						.comment-svg-small {
							width: 32rpx;
							height: 32rpx;
							margin-right: 32rpx;
						}

						text {
							font-family: PingFang SC, PingFang SC;
							font-weight: 400;
							font-size: 24rpx;
							color: #1D2326;
							line-height: 32rpx;
							text-align: right;
							font-style: normal;
							text-transform: none;
						}
					}
				}

				.row2 {
					margin-top: 4rpx;

					text {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: #1D2326;
						line-height: 24rpx;
						text-align: left;
						font-style: normal;
						text-transform: none;
					}
				}

				.row3 {
					margin-bottom: 24rpx;
					.text2 {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: rgba(29, 35, 38, 0.5);
						line-height: 32rpx;
						text-align: right;
						font-style: normal;
						text-transform: none;
					}
				}
			}
		}

		.rightBox {
			width: 68rpx;

			margin-right: 24rpx;
			.userAvatar {
				width: 68rpx;
				height: 68rpx;
			}
		}

		.leftBox {
			flex: 1;
			display: flex;
			flex-direction: column;

			.row1 {
				width: 100%;
				display: flex;
				justify-content: space-between;

				.left {
					/* width: 600rpx; */
					
					.text1 {
						padding-right: 16rpx;
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 28rpx;
						color: rgba(29, 35, 38, 0.5);
						line-height: 24rpx;
						text-align: left;
						font-style: normal;
						text-transform: none;
					}


				}

				.right {
					display: flex;

					.frie-svg-small {
						width: 32rpx;
						height: 32rpx;
						margin-right: 6rpx;
					}

					.comment-svg-small {
						width: 32rpx;
						height: 32rpx;
						margin-right: 32rpx;
					}

					text {
						font-family: PingFang SC, PingFang SC;
						font-weight: 400;
						font-size: 24rpx;
						color: #1D2326;
						line-height: 32rpx;
						text-align: right;
						font-style: normal;
						text-transform: none;
					}
				}
			}

			.row2 {
				margin-top: 14rpx;

				text {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 28rpx;
					color: #1D2326;
					line-height: 24rpx;
					text-align: left;
					font-style: normal;
					text-transform: none;
				}
			}

			.row3 {
				margin-top: 14rpx;
				margin-bottom: 12rpx;

				.text2 {
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;
					color: rgba(29, 35, 38, 0.5);
					line-height: 32rpx;
					text-align: right;
					font-style: normal;
					text-transform: none;
				}
			}
		}

	}
</style>