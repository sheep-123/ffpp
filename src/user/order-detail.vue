<template>
	<view>
		<WNavbar title="订单详情" bgColor="#f7f7f7" />
		<view class="main-box">
			<div class="status-box">
				<div class="icon">
					<u-icon color="#06B66C" name="checkmark-circle-fill" size="24"></u-icon>
				</div>
				<text>已发放</text>
			</div>
			<div class="order-list">
				<div class="order-list_item">
					<div class="top flex-jb">
						<div class="left flex-ac">
							<div class="type flex-center">托管奖金</div>
							<div class="title">非凡泡泡16人制羽毛球单打赛</div>
						</div>
						<div class="right">
							已支付
						</div>
					</div>
					<div class="center">
						<div class="img-box">
							<!-- <image src="" mode=""></image> -->
						</div>
						<div class="info">
							<div class="price">托管奖金 ¥500</div>
							<div class="date">取消日期：2025-12-16 12:59:46</div>
						</div>
					</div>
					<div class="bottom">
						<div class="btns">
						</div>
					</div>
				</div>
			</div>


			<div class="order-info">
				<div class="title">订单信息</div>
				<div class="cell-item flex-jb">
					<div class="left">订单编号</div>
					<div class="right">122637574444532</div>
				</div>
				<div class="cell-item flex-jb">
					<div class="left">订单状态</div>
					<div class="right">已支付</div>
				</div>
				<div class="cell-item flex-jb">
					<div class="left">订单金额</div>
					<div class="right">¥500</div>
				</div>
				<div class="cell-item flex-jb">
					<div class="left">下单时间</div>
					<div class="right">2024-10-10 19:00:45</div>
				</div>
				<div class="cell-item flex-jb">
					<div class="left">支付时间</div>
					<div class="right">2024-10-10 16:00:12</div>
				</div>
			</div>
		</view>
	</view>


</template>

<script>
	import WNavbar from '@/components/WNavbar/index.vue'
	export default {
		components: {
			WNavbar,
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #F7F7F7;
	}

	.main-box {
		padding: 16rpx 34rpx;
		
		.order-info{
			padding: 24rpx;
			background-color: #fff;
			.title{
				font-weight: 600;
				font-size: 28rpx;
				color: #1D2326;
				margin-bottom: 24rpx;
			}
			.cell-item{
				margin-bottom: 24rpx;
				.left{
					font-weight: 400;
					font-size: 24rpx;
					color: rgba(29,35,38,0.6);
				}
				.right{
					font-weight: 400;
					font-size: 24rpx;
					color: #1D2326;
				}
			}
			
		}
		
		.order-list {
			margin-bottom: 24rpx;
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

		.status-box {
			display: flex;
			align-items: center;
			margin-bottom: 36rpx;

			.icon {
				margin-right: 18rpx;
			}

			>text {
				font-weight: 600;
				font-size: 40rpx;
				color: #1D2326;
			}
		}
	}
</style>