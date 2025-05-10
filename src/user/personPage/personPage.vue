<template>
	<view class="box">
		<view class="header-bg" :style="{
			'background-image': bgImg,
		}"></view>
		<WNavbar bgColor="rgba(0,0,0,0)">
			<view slot="left">
				<view class="back" @click="$utils.toPath.back()" >
					<u-icon name="arrow-left" color="#fff"></u-icon>
				</view>
			</view>
		</WNavbar>
		<view class="contents">
			<view class="main">
				<view class="first">
					<u-avatar :src="userInfo.avatarUrl" size="80"></u-avatar>
					<view class="v">
						<view class="v-top">{{ userInfo.username }}</view>
						<view class="value">
							<view>玩家天数 {{ userInfo.joinDays }}</view>
							<!-- <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/qrcode.png" /> -->
						</view>
					</view>
					<div class="focous">
						<view style="margin-right:12rpx;" >
							<u-icon size="26" name="chat"></u-icon>
						</view>
						<view class="bt" @click="fllowHandle">
							{{ userInfo.isFollowing ? '已关注' : '关注' }}
						</view>
					</div>
				</view>

				<view class="second">
					<view class="s-left">
						<view class="item">
							<text class="num">{{ userInfo.followCount.value + userInfo.followCount.unit }}</text>
							<text>关注</text>
						</view>
						<view class="item"> <text class="num">{{ userInfo.fansCount.value + userInfo.fansCount.unit
								}}</text>粉丝
						</view>
						<view class="item"> <text class="num">{{ userInfo.likeCount.value + userInfo.likeCount.unit
								}}</text>获赞
						</view>
					</view>

				</view>

				<view class="third">
					<view class="left">
						<view class="info">
							<image
								src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/ssdj.png" />
							<text>{{ choseLevel.labelRankName }}</text>
						</view>

						<view class="value">{{ userInfo.biography || 'TA很神秘，什么都没留下～' }} </view>
					</view>
					<image :src="choseLevel.labelRankUrl" mode="scaleToFill" />
				</view>

				<view class="fourth">
					<view class="top">
						<view class="left">
							<image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/小徽章.png"
								mode="scaleToFill" style="width: 16px; height: 16px" />
							<text>徽章</text>
							<view class="prizes">
								<image v-for="(item, index) in rankInfo.accomBadges" :key="index"
									:src="item.accomBadgeUrl" mode="scaleToFill" style="width: 24px; height: 24px" />
							</view>
						</view>
						<view class="right">
							<!-- <text>去获得</text> -->
							<image
								src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
								mode="scaleToFill" style="width: 12px; height: 12px" />
						</view>
					</view>
					<view class="top">
						<view class="left">
							<image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/小奖杯.png"
								mode="scaleToFill" style="width: 16px; height: 16px" />
							<text>奖杯</text>
							<view class="prizes">
								<image v-for="(item, index) in rankInfo.cups" :key="index" :src="item.cupUrl"
									mode="scaleToFill" style="width: 24px; height: 24px" />
							</view>
						</view>
						<view class="right">
							<!-- <text>去获得</text> -->
							<image
								src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
								mode="scaleToFill" style="width: 12px; height: 12px" />
						</view>
					</view>
				</view>



				<view class="sixth">
					<u-tabs :list="list" :is-scroll="false" @change="change" active-color="#1D2326" fonst-size="16"
						inactive-color="#1D2326" :bar-style="barStyle" lineColor="red"></u-tabs>
				</view>
			</view>
			<view class="dt" v-if="newsList.length">
				<view class="item" v-for="(item, index) in newsList" :key="index">
					<image :src="item.fileUrl" mode="widthFix" />
					<view class="value">{{ item.title }}</view>
					<view class="buttom">
						<view class="left">
							<u-avatar :src="item.releaseUserUrl" size="18"></u-avatar>
							<view class="value">{{ item.releaseUserName }}</view>
						</view>
						<view class="right">
							<image
								src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/无火花.png" />
							<view class="value">{{ item.supportNum }}</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<emptyPage text="TA还没有发布动态" v-if="current == 0" />
				<emptyPage text="TA还没有参加赛事" v-if="current == 1" />
			</view>

		</view>

	</view>
</template>

<script>
import WNavbar from "@/components/WNavbar/index.vue";
import emptyPage from '@/components/emptyPage/index.vue'
import { onLoad } from "@dcloudio/uni-app";
export default {
	components: {
		WNavbar,
		emptyPage
	},
	computed: {
		bgImg() {
			if (!this.userInfo.backgroundImage) {
				return `linear-gradient( 180deg, rgba(0,0,0,0) 0%, #030303 100%), url(/static/templateImage/user/defaultBack.png)`
			} else {
				return `url(${this.userInfo.backgroundImage})`
			}
		}
	},
	data() {
		return {
			current: 0,
			visible: false,
			list: [
				{
					name: "动态",
				},
				{
					name: "赛事",
				},
			],
			userInfo: '',
			rankInfo: {
				accomBadges: [], cups: [], labelRanks: []
			},
			newsList: [],
			choseLevel: {
				labelRankName: '暂无赛事等级',
				labelRankUrl: 'https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/empty.png'
			},
			userId: ''
		};
	},
	methods: {
		async fllowHandle() {
			const data = {
				followedId: this.userId,
				userId: uni.getStorageSync('user').id,
			};
			const res = await this.$requestAll.user[this.userInfo.isFollowing?'unfollowUser':'followUser'](data);
			if (res.status == 200) {
				this.$utils.toast(this.userInfo.isFollowing ? '关注成功' : '取消关注成功');
				this.getUserInfo();
			} else {
				this.$utils.toast(res.message);
			}
			// this.userInfo.isFollowing = !this.userInfo.isFollowing;
			// this.$requestAll.user.fllowUser(this.userId, this.userInfo.isFollowing ? 1 : 0);
		},
		change(e) {
			this.current = e.index;
			console.log(this.current, "当前选中");
		},
		async getMyNews() {
			const res = await this.$requestAll.user.getMyNews();
			this.newsList = res.data;
			console.log(res, "动态");
		},
		async getUserInfo() {
			const res = await this.$requestAll.user.getUserInfoById(this.userId);
			this.userInfo = res.data.userInfo;
			this.rankInfo = res.data.rankInfo;
			this.choseLevel = res.data.rankInfo.labelRanks.find(item => item.wearing == 1);
			console.log(res, "用户信息");
		}
	},
	onLoad(opt) {
		this.userId = opt.uId;
		this.getUserInfo();
		// this.getMyNews();
	},
};
</script>

<style lang="scss">
.back {
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	background-color: rgba(0, 0, 0, 0.3);
	margin-left: -12rpx;
}


.box {
	width: 100vw;
	min-height: calc(100vh - 84px);
	display: flex;
	flex-direction: column;
	position: relative;

	.header-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 400rpx;
		background-size: cover;
		background-position: top center;
		background-repeat: no-repeat;
		z-index: 0;
	}

	:deep(.more) {
		width: 32rpx;
		height: 32rpx;
		margin-left: 5%;
	}

	.contents {
		width: 100%;
		flex: 1;
		margin-top: 180rpx;
		background: #ffffff;
		border-radius: 40rpx 40rpx 0 0;
		padding-bottom: 40rpx;
		position: relative;
		z-index: 2;

		.main {
			width: 90%;
			margin: auto;

			.first {
				display: flex;
				gap: 20rpx;
				align-items: center;

				image {
					width: 160rpx;
					height: 160rpx;
					margin-top: -40rpx;
				}

				.focous {
					display: flex;
					align-items: center;

					.bt {
						width: 128rpx;
						height: 60rpx;
						background: #15181A;
						border-radius: 56rpx 56rpx 56rpx 56rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-weight: 600;
						font-size: 28rpx;
						color: #FFFFFF;
					}
				}

				.v {
					display: flex;
					flex-direction: column;
					margin-right: 20rpx;
					gap: 12rpx;

					.v-top {
						font-weight: 600;
						font-size: 36rpx;
						color: #1d2326;
					}

					.value {
						font-weight: 400;
						font-size: 24rpx;
						color: rgba(29, 35, 38, 0.6);
						gap: 6rpx;
						display: flex;
						align-items: center;

						image {
							width: 32rpx;
							height: 32rpx;
							margin-top: 0rpx;
						}
					}
				}
			}

			.second {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.s-left {
					display: flex;
					align-items: center;

					.item:nth-child(1) {
						position: relative;

						&::after {
							content: "";
							position: absolute;
							right: 0;
							top: 55%;
							height: 30%;
							border-right: 2rpx solid #f0f0f0;
							transform: translateY(-50%);
						}
					}

					.item:nth-child(2) {
						position: relative;

						&::after {
							content: "";
							position: absolute;
							right: 0;
							top: 55%;
							height: 30%;
							border-right: 2rpx solid #f0f0f0;
							transform: translateY(-50%);
						}
					}

					.item {
						font-weight: 400;
						font-size: 24rpx;
						color: rgba(29, 35, 38, 0.5);
						padding: 20rpx;

						.num {
							font-weight: 800;
							font-size: 32rpx;
							color: #1d2326;
							margin-right: 12rpx;
						}
					}
				}

				.bt {
					display: flex;
					align-items: center;
					justify-content: center;
					padding: 8rpx 24rpx;
					background-color: #f0f0f0;
					border-radius: 20rpx;
					font-weight: 400;
					font-size: 24rpx;
					color: rgba(29, 35, 38, 0.8);
				}
			}

			.third {
				border: 2rpx solid #f5f5f5;
				border-radius: 20rpx;
				display: flex;
				height: 228rpx;

				.left {
					display: flex;
					flex-direction: column;
					gap: 20rpx;
					width: 60%;
					margin-left: 30rpx;

					.info {
						display: flex;
						align-items: center;
						margin-top: 28rpx;

						image {
							width: 326rpx;
							height: 36rpx;
						}

						text {
							font-weight: 400;
							font-size: 28rpx;
							color: rgba(29, 35, 38, 0.5);
							margin-left: -180rpx;
						}
					}

					.value {
						font-weight: 400;
						font-size: 24rpx;
						color: rgba(29, 35, 38, 0.8);
					}
				}

				image {
					width: 248rpx;
					height: 208rpx;
				}
			}

			.fourth {
				display: flex;
				flex-direction: column;
				gap: 20rpx;
				margin-top: 30rpx;

				.top {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.left {
						display: flex;
						align-items: center;

						text {
							margin-left: 6rpx;
							font-weight: 400;
							font-size: 28rpx;
							color: #1d2326;
						}

						.prizes {
							margin-left: 18rpx;
							display: flex;
							gap: 14rpx;
						}
					}

					.right {
						display: flex;
						align-items: center;

						text {
							font-weight: 400;
							font-size: 24rpx;
							color: rgba(29, 35, 38, 0.5);
						}
					}
				}
			}

			.fifth {
				display: flex;
				gap: 20rpx;
				margin-top: 48rpx;
				overflow-x: scroll;

				.item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border: 2rpx solid #f0f0f0;
					box-sizing: border-box;
					padding: 20rpx;
					width: 236rpx;
					height: 104rpx;
					flex-shrink: 0;

					.left {
						.v1 {
							font-weight: 600;
							font-size: 24rpx;
							color: #1d2326;
						}

						.v2 {
							font-weight: 400;
							font-size: 20rpx;
							color: rgba(29, 35, 38, 0.5);
						}
					}
				}
			}

			.sixth {
				width: 366rpx;
				margin-top: 64rpx;
			}
		}

		.dt {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 20rpx;
			background: #fafafa;
			border-radius: 40rpx;
			padding: 20rpx;
			padding: 20rpx;
			padding-bottom: 84px;

			.item {
				width: 100%;
				break-inside: avoid;
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
</style>
