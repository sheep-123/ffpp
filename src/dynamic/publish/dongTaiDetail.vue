<template>
	<view class="box" v-if="detail">
		<Navbar bgColor="#fff">
			<view @click="$utils.toPath.back()" slot="left" style="display: flex; align-items: center">
				<u-icon bold name="arrow-left" size="19"></u-icon>
				<image :src="detail.releaseUserUrl" mode="scaleToFill" class="img-1" />
				<view class="img-2">{{detail.releaseUserName}}</view>
			</view>
		</Navbar>
		<view class="parent">
			<swiper :indicator-dots="false" :circular="true" :current="current" :autoplay="true">
				<block v-for="(item, index) in detail.matchFiles" :key="index">
					<swiper-item>
						<image @click="lookImgHandle" style="height: 504rpx; width: 702rpx; border-radius: 8rpx"
							:src="item.fileUrl" mode="">
						</image>
					</swiper-item>
				</block>
			</swiper>
			<view class="numDots">
				<view>
					<image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/photo.png"
						mode="scaleToFill" />
					<text> {{ current + 1 }}/{{ detail.matchFiles.length }} </text>
				</view>
			</view>
			<view class="dots">
				<block v-for="(item, index) in detail.matchFiles" :key="index">
					<view :class="current == index ? 'active' : ''"></view>
				</block>
			</view>
		</view>
		<view class="contentBox">
			<view style="margin-bottom: 24rpx">
				<view class="title">{{ detail.title }}</view>
				<text class="titleContent">
					{{ detail.content }}
				</text>
			</view>
			<div class="address flex-jb" @click="toAddressHandle">
				<text>{{ detail.address }}</text>
				<view class="right">
					<text></text>
					<u-icon name="arrow-right" color="#484D4F"></u-icon>
				</view>
			</div>
			<div v-if="detail.matchName" class="match flex-jb">
				<text>{{ detail.matchName }}</text>
				<view class="right">
					<text>查看</text>
					<u-icon name="arrow-right" color="#484D4F"></u-icon>
				</view>
			</div>
			<div v-if="detail.labelNameList.length" class="sport">
				<text>#</text>
				<view v-if="detail.labelNameList.length" class="l-box">
					<div class="l-box-item" v-for="(item, index) in detail.labelNameList" :key="index">
						{{ item }}
					</div>
				</view>
			</div>
		</view>
		<view class="comment-box" v-if="commentList.length">
			<CommetItem :itemInfo="item" v-for="(item,index) in commentList" :key="index" />
		</view>
		<view style="height: 136rpx"></view>
		<view class="bottomBox safe-bottom">
			<u-input @confirm="inputConfirm" confirmType="send" shape="circle" v-model="commentBody.content" height="72rpx" placeholder="聊聊你的想法..."></u-input>
			<view>
				<image class="frie-svg"
					src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/frie.svg"
					mode="scaleToFill" />
				<text>{{detail.supportNum}}</text>
			</view>
			<view>
				<image class="star-svg"
					src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/collect.svg"
					mode="scaleToFill" />
				<text>{{detail.collectionNum}}</text>
			</view>
			<view>
				<image class="comment-svg"
					src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/comment.svg"
					mode="scaleToFill" />
				<text>{{detail.commentsNum}}</text>
			</view>
		</view>
	</view>
</template>
<script>
	const app = getApp();
	import Navbar from "@/components/WNavbar/index.vue";
	import CommetItem from "./components/commetItem.vue"
	export default {
		data() {
			return {
				glb: app.globalData,
				current: 0,
				indicatorColor: "#000000",
				detail: "",
				sportList: [],
				newsId: '',
				searchParmas: {
					locationLng: '',
					locationLat: ''
				},
				commentSearchParmas: {
					page: 1,
					pageSize: 10
				},
				commentList: [],
				commentBody: {
					content: ''
				}
			};
		},
		components: {
			Navbar,
			CommetItem
		},
		methods: {
			async inputConfirm(e){
				if(!this.commentBody.content){
					this.$utils.toast('请输入评论内容');
					return
				}
				uni.showLoading({
					title:'评论中...'
				})
				const res = await this.$requestAll.dynamics.saveNewsComments({
					newsId: this.newsId,
					...this.commentBody
				});
				if(res.status==200){
					this.$utils.toast('评论成功');
					this.commentSearchParmas.page =1;
					this.commentBody.content = '';
					this.getCommetList()
					uni.hideLoading();
				}else{
					this.$utils.toast(res.message);
					uni.hideLoading();
				}
			},
			async getCommetList() {
				const res = await this.$requestAll.dynamics.newsCommentList({
					newsId: this.newsId,
					...this.commentSearchParmas
				})
				this.commentList = res.data;
				
			},
			async getDetail() {
				const res = await this.$requestAll.dynamics.newsDetail({
					newsId: this.newsId,
					...this.searchParmas
				});
				this.detail = res.data;
			},
			lookImgHandle() {
				uni.previewImage({
					urls: this.detail.matchFiles.map(i => i.fileUrl)
				})
			},
			toAddressHandle() {
				const {
					detail
				} = this;
				uni.openLocation({
					latitude: detail.locationLat,
					longitude: detail.locationLng,
					name: detail.address,
					address: detail.detailAddress
				})
			}
		},
		onLoad(option) {
			this.newsId = option.newId;
			this.getDetail();
			this.getCommetList();
		},
	};
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #f5f5f5;
	}

	.comment-box {
		padding: 32rpx;
		background-color: #fff;
		box-sizing: border-box;
		.comment-box-item{
			
		}
	}

	.sport {
		display: flex;
		align-items: center;

		>text {
			color: #f0f0f0;
			font-size: 32rpx;
			font-weight: bolder;
			margin-right: 16rpx;
		}

		.l-box {
			display: flex;
			align-items: center;
			box-sizing: border-box;

			.l-box-item {
				padding: 6rpx 12rpx;
				font-weight: 600;
				font-size: 24rpx;
				color: #ec383c;
				border: 2rpx solid rgba(236, 56, 74, 0.2);
				border-radius: 4rpx;
				margin-right: 12rpx;
				box-sizing: border-box;
			}
		}
	}

	.img-1 {
		margin-left: 6px;
		width: 36px;
		height: 36px;
		border-radius: 50%;
	}

	.img-2 {
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 16px;
		color: #1d2326;
		line-height: 24px;
		text-align: left;
		font-style: normal;
		text-transform: none;
		margin-left: 8px;
	}

	.parent {
		position: relative;
		background-color: #fff;
		padding: 0 24rpx;
		box-sizing: border-box;

		swiper {
			height: 510rpx;

			swiper-item view {
				height: 100%;
			}
		}
	}

	.numDots {
		position: absolute;
		top: 432rpx;
		right: 48rpx;

		view {
			// width: 102rpx;
			// height: 48rpx;
			background: rgba(41, 41, 41, 0.3);
			border-radius: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: rgba(41, 41, 41, 0.3);
			padding: 12rpx 16rpx;
			box-sizing: border-box;

			image {
				width: 12px;
				height: 12px;
				margin-right: 2px;
			}

			text {
				font-family: PingFang SC, PingFang SC;
				font-weight: 600;
				font-size: 12px;
				color: #ffffff;
				line-height: 16px;
				text-align: right;
				font-style: normal;
				text-transform: none;
			}
		}
	}

	.dots {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		left: 50%;
		transform: translateX(-50%);
		view {
			width: 10rpx;
			height: 10rpx;
			margin: 0 6rpx;
			border-radius: 10rpx;
			background-color: #cccccc;
		}

		.active {
			width: 30rpx;
			background-color: #15181a;
		}
	}

	::v-deep .u-icon__icon.data-v-172979f2.uicon-close {
		font-size: 15px !important;
		top: 50% !important;
		right: 50% !important;
		transform: translate(8px, 3px) !important;
	}

	::v-deep .u-input__content.data-v-fdbb9fe6 {
		background-color: #fff;
	}

	::v-deep .u-input__content__field-wrapper__field.data-v-fdbb9fe6 {
		font-size: 14px !important;
	}

	::v-deep .data-v-0e3867ac .u-input__content__field-wrapper__field.data-v-fdbb9fe6 {
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 16px;
		color: rgba(29, 35, 38, 0.3);
		line-height: 24px;
		text-align: left;
		font-style: normal;
		text-transform: none;
	}

	::v-deep .u-button--square.data-v-3bf2dba7 {
		border-radius: 40px;
	}

	::v-deep .u-button.data-v-3bf2dba7 {
		width: 327px;
		height: 44px;
	}

	.box {
		.indicator {
			@include flex(row);
			justify-content: center;

			&__dot {
				height: 6px;
				width: 6px;
				border-radius: 100px;
				background-color: rgba(255, 255, 255, 0.35);
				margin: 0 5px;
				transition: background-color 0.3s;

				&--active {
					background-color: #ffffff;
				}
			}
		}

		.indicator-num {
			padding: 2px 0;
			background-color: rgba(0, 0, 0, 0.35);
			border-radius: 100px;
			width: 35px;
			@include flex;
			justify-content: center;

			&__text {
				color: #ffffff;
				font-size: 12px;
			}
		}

		.contentBox {
			background-color: #fff;
			padding: 48rpx 24rpx;
			margin-bottom: 16rpx;
			box-sizing: border-box;
			margin-bottom: 16rpx;

			.title {
				font-weight: 600;
				font-size: 36rpx;
				color: #1d2326;
				margin-bottom: 24rpx;
			}

			.titleContent {
				margin-bottom: 32rpx;
				font-weight: 400;
				font-size: 32rpx;
				color: rgba(29, 35, 38, 0.8);
			}

			.address {
				// width: 686rpx;
				height: 76rpx;
				background: #f5f5f5;
				border-radius: 8rpx;
				padding: 16rpx 24rpx;
				font-weight: 400;
				font-size: 28rpx;
				color: rgba(29, 35, 38, 0.8);
				margin-bottom: 24rpx;
				box-sizing: border-box;

				.right {
					display: flex;
					align-items: center;

					>text {
						margin-right: 10rpx;
					}
				}
			}

			.match {
				// width: 686rpx;
				height: 76rpx;
				background: #f5f5f5;
				border-radius: 8rpx;
				padding: 16rpx 24rpx;
				font-weight: 400;
				font-size: 28rpx;
				color: rgba(29, 35, 38, 0.8);
				margin-bottom: 40rpx;
				box-sizing: border-box;

				.right {
					display: flex;
					align-items: center;

					>text {
						margin-right: 10rpx;
					}
				}
			}
		}

		.bottomBox {
			width: 750rpx;
			height: 136rpx;
			background-color: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			padding: 32rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.inputs {
				width: 298rpx;
				height: 72rpx;
				background: #F0F0F0;
				border-radius: 40rpx;
				margin-right: 24rpx;
			}

			>view {
				display: flex;
				align-items: center;
				margin-right: 12rpx;

				>image {
					width: 60rpx;
					height: 60rpx;
					margin-right: 8rpx;
				}
			}
		}
	}
</style>