<template>
	<view class="box" v-if="detail">
		<Navbar bgColor="#fff">
			<view  slot="left" style="display: flex; align-items: center">
				<u-icon @click="$utils.toPath.back()" bold name="arrow-left" size="19"></u-icon>
				<image  @click="$utils.toPath.navigateTo('/user/personPage/personPage?uId='+detail.releaseUser)" :src="detail.releaseUserUrl" mode="scaleToFill" class="img-1" />
				<view	@click="$utils.toPath.navigateTo('/user/personPage/personPage?uId='+detail.releaseUser)" class="img-2">{{detail.releaseUserName}}</view>
			</view>
		</Navbar>
		<view class="parent">
			<swiper @change="swpierChange" :indicator-dots="false" :circular="true" :current="current" :autoplay="true">
				<block v-for="(item, index) in detail.matchFiles" :key="index">
					<swiper-item  >
						<image @click="lookImgHandle" style="height: 504rpx; width: 702rpx; border-radius: 8rpx"
							:src="item.fileUrl" mode="">
						</image>
					</swiper-item>
				</block>
			</swiper>
			<view class="numDots" v-if="detail.matchFiles.length>1">
				<view>
					<image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/photo.png"
						mode="scaleToFill" />
					<text> {{ current + 1 }}/{{ detail.matchFiles.length }} </text>
				</view>
			</view>
			<view class="dots" v-if="detail.matchFiles.length>1">
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
			<CommetItem @clearLoadingId="loadingId=''" :loadingId="loadingId" @commetItemHandle="commetItemHandle"
				:itemInfos="item" v-for="(item,index) in commentList" :key="index" />
				
		</view>
		<view style="height: 136rpx"></view>
		<view class="bottomBox safe-bottom">
			<u-input @blur="focus=false" confirmHold :focus="focus" @confirm="inputConfirm" confirmType="send"
				shape="circle" v-model="commentBody.content" height="72rpx" :placeholder="placeholder"></u-input>
			<view @click="frieHandle">
				<image class="frie-svg" :src="detail.supportStatus=='0'?img.noFrie:img.Frie" mode="scaleToFill" />
				<text>{{detail.supportNum}}</text>
			</view>
			<view @click="conntectHandle">
				<image class="star-svg" :src="detail.collectionStatus=='0'?img.collect:img.collectEd"
					mode="scaleToFill" />
				<text>{{detail.collectionNum}}</text>
			</view> 
			<view @click="focus=true">
				<image class="comment-svg" :src="img.comment" mode="scaleToFill" />
				<text>{{detail.commentsNum}}</text>
			</view>
		</view>
	</view>
</template>
<script>
	const app = getApp();
	import Navbar from "@/components/WNavbar/index.vue";
	import CommetItem from "./components/commetItem.vue";
	export default {
		data() {
			return {
				placeholder: '聊聊你的想法...',
				glb: app.globalData,
				img: this.$img.dynamic,
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
					pageSize: 5
				},
				commentList: [],
				commentBody: {
					commentId: '',
					content: '',
					replyTo: '', //被回复人id
					replyType: '' //回复类型 1回复评论  2回复别人的评论
				},
				focus: false,
				choseCommetUser: '',
				loadStatus: 'loadmore', //loadmore还有更多 nomore没有了
				loadingId: '', //此id变化 
			};
		},
		components: {
			Navbar,
			CommetItem
		},
		watch: {
			focus(newOption) {
				if (!newOption) {
					this.placeholder = '聊聊你的想法...';
				}
			}

		},
		onReachBottom() {
			if (this.loadStatus == 'nomore') {
				return
			}
			this.commentSearchParmas.page++;
			this.getCommetList();
		},
		methods: {
			swpierChange(e){
				this.current = e.detail.current
			},
			commetItemHandle(evt) {
				this.focus = true;
				this.choseCommetUser = evt;
				this.commentBody.commentId = evt.id;
				this.commentBody.replyTo = evt.commentUser;
				this.commentBody.replyType = evt.replyType;
				this.placeholder = `回复 @${this.choseCommetUser.commentUserName}`
			},
			async frieHandle() {
				

				const res = await this.$requestAll.dynamics[this.detail.supportStatus == '0' ? 'saveNewsSupport' :
					'delNewsSupport'](this.newsId)
				if (res.status == 200) {
					this.$utils.toast(this.detail.supportStatus == '0' ? '点赞成功' : '取消点赞成功');
					this.getDetail()
				} else {
					this.$utils.toast(res.message);
				}
			},
			async conntectHandle() {
				const res = await this.$requestAll.dynamics[this.detail.collectionStatus=='0'?'saveNewsCollection':'delNewsCollection'](this.newsId)
				if (res.status == 200) {
					this.$utils.toast(this.detail.collectionStatus == '0' ? '收藏成功' : '取消收藏成功');
					this.getDetail()
				} else {
					this.$utils.toast(res.message);
				}
			},
			async inputConfirm(e) {
				if (!this.commentBody.content) {
					this.$utils.toast('请输入评论内容');
					return
				}
				const commentBody = uni.$u.deepClone(this.commentBody);
				if (!commentBody.commentId) {
					delete commentBody.commentId;
					delete commentBody.replyTo;
					delete commentBody.replyType;
				}
				const res = await this.$requestAll.dynamics[commentBody.commentId ? 'saveNewsCommentReply' :
					'saveNewsComments']({
					newsId: this.newsId,
					...commentBody
				});
				if (res.status == 200) {
					this.$utils.toast('评论成功');
					if (!commentBody.commentId) {
						this.commentSearchParmas.page = 1;
						this.commentBody.content = '';
						this.getCommetList();
						this.getDetail();
					} else {
						this.loadingId = this.commentBody.commentId;
						this.commentBody.commentId = '';
						this.commentBody.replyTo = '';
						this.commentBody.replyType = '';
						this.commentBody.content = '';
						this.getDetail();
					}
				} else {
					this.$utils.toast(res.message);
				}
			},
			async getCommetList() {
				const res = await this.$requestAll.dynamics.newsCommentList({
					newsId: this.newsId,
					...this.commentSearchParmas
				})
				res.data.content.length ? this.loadStatus = 'loadmore' : this.loadStatus = 'nomore';
				const commentList = [...this.commentList, ...res.data.content];
				this.commentList = this.$utils.uniqueById(commentList,'id');
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

		.comment-box-item {}
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
			height: 178rpx;
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