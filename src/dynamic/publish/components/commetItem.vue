<template>
	<view class="conmentBox" v-if="itemInfo">
		<view>
			<view style="display: flex;">
				<view class="rightBox">
					<image class="userAvatar" :src="itemInfo.commentUserUrl" mode="scaleToFill" />
				</view>
				<view class="leftBox">
					<view class="row1">
						<view class="left">
							<text class="text1">{{ itemInfo.commentUserName }}</text>
						</view>
						<view class="right">
							<image @click="commetItemHandle('1')" class="comment-svg-small" :src="img.comment"
								mode="scaleToFill" />
							<image @click="frieHandleInner(itemInfo)" class="frie-svg-small"
								:src="itemInfo.commentSupportStatus == '0' ? img.noFrie : img.Frie" mode="scaleToFill" />
							<text>{{ itemInfo.supportNum }}</text>
						</view>
					</view>
					<view class="row2">
						<text>{{ itemInfo.content }}</text>
					</view>
					<view class="row3">
						<text class="text2">{{ formatDate(itemInfo.createTime) }}</text>
					</view>
				</view>
			</view>
			<view v-if="list.length" style="display: flex;justify-content: flex-end;">
				<view class="hr"></view>
			</view>
			<view v-if="list.length" style="padding-left: 96rpx;">
				<view class="smallCommentBox" v-for="(item, index) in list" :key="item.id">
					<view style="display: flex;">
						<view class="rightBox">
							<image class="userAvatar" :src="item.replyUserUrl" mode="scaleToFill" />
						</view>
						<view class="leftBox">
							<view class="row1">
								<view class="left">
									<text class="text1">{{ item.replyUserName }}</text>
									<text class="text2" v-if="item.replyUser == itemInfo.commentUser">作者</text>
								</view>
								<view class="right">
									<image @click="commetItemHandle('2')" class="comment-svg-small" :src="img.comment"
										mode="scaleToFill" />
									<image @click="frieHandleInnerItem(item)" class="frie-svg-small"
										:src="item.commentReplySupportStatus == '0' ? img.noFrie : img.Frie"
										mode="scaleToFill" />
									<text>{{ item.supportNum }}</text>
								</view>
							</view>
							<view class="row2">
								<text style="margin-right: 4rpx;" v-if="item.replyType == '2'" class="backTo">
									<text style="margin-right: 4rpx;">回复</text> <text
										class="hei">{{ item.replyToUserName }} :</text>
								</text> <text> {{ item.content }}</text>
							</view>
							<view class="row3">
								<text class="text2">{{ formatDate(item.createTime) }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<div class="open-comment" @click="openCommentHandle" v-if="listStatus.status">
				<div class="left"></div>
				<div class="right">
					{{ listStatus.text }}
				</div>
			</div>
		</view>
	</view>
</template>
<script>
function uniqueById(arr) {
	const map = new Map();
	arr.forEach(item => {
		if (!map.has(item.id)) {
			map.set(item.id, item);
		}
	});
	return Array.from(map.values());
}
export default {
	name: 'CommetItem',
	props: {
		itemInfos: {
			type: Object,
			default: () => ({})
		},
		loadingId: {
			type: String,
			default: () => ''
		}
	},
	computed: {
		listStatus() {
			if (this.itemInfo.commentsNum <= 1) {
				// 一条够了
				return {
					status: false,
					text: ''
				}
			} else {
				// 满了
				if (this.list.length == this.itemInfo.commentsNum) {
					return {
						status: false,
						text: ''
					}
				} else {
					// 如果大于一
					if (this.list.length == 1) {
						return {
							status: 'loadingMore', //修改成正常分页 5条
							text: `展开${this.itemInfo.commentsNum}条回复`
						}
					} else {
						return {
							status: 'pageAnd', //分页查询
							text: '展开更多回复'
						}
					}
				}

			}
		}
	},
	watch: {
		loadingId(newOption) {

			if (newOption == this.itemInfo.id) {
				if (this.list.length == this.itemInfo.commentsNum) {
					this.itemInfo.commentsNum++
				}
				this.getList();
				this.$emit('clearLoadingId');
			}
		}
	},
	data() {
		return {
			img: this.$img.dynamic,
			searchParmas: {
				page: 1,
				pageSize: 5
			},
			list: [],
			itemInfo: ''
		}
	},
	methods: {
		async frieHandleInner(item) {
			const data = {
				commentId: item.id,
				newsId: item.newsId
			}
			const id = item.id
			const res = await this.$requestAll.dynamics[item.commentSupportStatus == '0' ?
				'saveNewsCommentSupport' : 'delNewsCommentSupport'](
					item.commentSupportStatus == '0' ? data : id
				)
			if (res.status == 200) {
				this.$utils.toast(item.commentSupportStatus == '0'	? '点赞成功' : '取消点赞成功');
				if (item.commentSupportStatus == '0') {
					this.itemInfo.commentSupportStatus = '1';
					this.itemInfo.supportNum++;
				} else {
					this.itemInfo.commentSupportStatus = '0';
					this.itemInfo.supportNum--;
				}
			} else {
				this.$utils.toast(res.message);
			}
		},
		async frieHandleInnerItem(item) {
			const data = {
				commentId: item.commentId,
				newsId: item.newsId,
				commentReplyId: item.id
			}
			const res = await this.$requestAll.dynamics[item.commentReplySupportStatus == '0' ?
				'saveNewsCommentReplySupport' : 'delNewsCommentReplySupport'](
					data
				)
			if (res.status == 200) {
				// this.$utils.toast(res.message);
				this.$utils.toast(item.commentReplySupportStatus == '0'	? '点赞成功' : '取消点赞成功');
				if (item.commentReplySupportStatus == '0') {
					// 找到list 对应id将其 commentReplySupportStatus改为1
					this.list = this.list.map(item => {
						if (item.id == data.commentReplyId) {
							item.commentReplySupportStatus = '1';
							item.supportNum++;
						}
						return item;
					});

				} else {
					// 找到list 对应id将其 commentReplySupportStatus改为0
					this.list = this.list.map(item => {
						if (item.id == data.commentReplyId) {
							item.commentReplySupportStatus = '0';
							item.supportNum--;
						}
						return item;
					});
				}
			} else {
				this.$utils.toast(res.message);
			}
		},
		formatDate(inputStr) {
			// 解析输入字符串为日期对象
			const parseDate = (dateStr) => {
				const parts = dateStr.split(/[- :]/);
				return new Date(
					parseInt(parts[0]),
					parseInt(parts[1]) - 1, // 月份从0开始
					parseInt(parts[2]),
					parseInt(parts[3]),
					parseInt(parts[4]),
					parseInt(parts[5])
				);
			};
			// 格式化时间（HH:mm）
			const formatTime = (date) => {
				return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
			};
			// 格式化月-日（MM-dd）
			const formatMonthDay = (date) => {
				return `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
			};
			const inputDate = parseDate(inputStr);
			const now = new Date();
			// 计算当天0点
			const getDayStart = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
			const todayStart = getDayStart(now);
			const inputDayStart = getDayStart(inputDate);
			// 计算天数差
			const diffDays = Math.floor((todayStart - inputDayStart) / (86400000));
			if (diffDays === 0) return `今天 ${formatTime(inputDate)}`;
			if (diffDays === 1) return `昨天 ${formatTime(inputDate)}`;
			if (diffDays <= 10) return `${diffDays}天前`;
			return formatMonthDay(inputDate);
		},

		commetItemHandle(e) {
			this.$emit('commetItemHandle', {
				...this.itemInfo,
				replyType: e
			});
		},
		async getList() {
			// 获取此评论的回复
			const res = await this.$requestAll.dynamics.getNewsCommentReply({
				newsCommentId: this.itemInfo.id,
				...this.searchParmas
			})
			const list = [...this.list, ...res.data];
			this.list = uniqueById(list);
		},
		async getListBy1() {
			const res = await this.$requestAll.dynamics.getNewsCommentReply({
				newsCommentId: this.itemInfo.id,
				page: 1,
				pageSize: 1
			})
			this.list = res.data;
		},
		openCommentHandle() {
			if (this.listStatus.status == 'loadingMore') {
				this.getList();
				return
			}
			if (this.listStatus.status == 'pageAnd') {
				this.searchParmas.page++;
				this.getList();
				return
			}
		}

	},
	mounted() {
		this.itemInfo = this.itemInfos;
		this.getListBy1();
	}
}
</script>


<style scoped lang='scss'>
.open-comment {
	padding-left: 96rpx;
	display: flex;
	align-items: center;
	margin-bottom: 12rpx;

	.left {
		width: 46rpx;
		height: 1rpx;
		background-color: #ccc;
		transform: scale(.8);
		margin-right: 6rpx;
	}

	.right {
		font-size: 24rpx;
		color: #0F4C81;
	}

}

.conmentBox {
	width: 100%;

	.hr {
		margin-bottom: 24rpx;
		width: calc(100% - 96rpx);
		border-bottom: 2rpx solid #F0F0F0;
		box-sizing: border-box;
	}

	.smallCommentBox {

		/* width: calc(100% - 96rpx); */
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
				align-items: center;

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

			.backTo {
				.hei {
					color: #8E9192;
				}
			}

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