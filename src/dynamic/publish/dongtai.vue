<template>
	<view class="box">
		<u-navbar class="nav" fixed bgColor="#fff">
			<template #left>
				<view class="left-nav" @click="$utils.toPath.back(true)">
					<u-icon name="arrow-left" bold color="#1D2326"></u-icon>
					<text>发布动态</text>
				</view>
			</template>
		</u-navbar>
		<view class="zhanWei" :style="{height:(50+statusBarHeight)+'px'}"></view>
		<view style="margin-top: 24rpx;">
			<view class="contentBox">
				<view id="tipsBox">
					<scroll-view scroll-x style="width: 100%">
						<u-upload class="custom-upload" :fileList="fileList" @afterRead="afterRead" @delete="deletePic"
							accept="image" name="6" multiple :maxCount="18" width="86" height="86" :deleteIcon="'close'"
							:deleteIconColor="'#ff0000'" :deleteIconSize="20" :previewFullImage="true">
							<view class="custom-upload">
								<view class="plusIcon">
									<u-icon name="plus" size="52rpx" color="#CCCCCC"></u-icon>
								</view>
								<text class="upload-text">图片/视频</text>
							</view>
						</u-upload>
					</scroll-view>
				</view>
				<view class="tipsBox">
					<image class="topIcon" :src="imgs.topArrow" mode="scaleToFill" />
					<view class="box1">
						<image class="tipsIcon" :src="imgs.tips" mode="scaleToFill" />
						<text class="tipsText"> 说说你最近一次运动 </text>
						<image class="reloadIcon" :src="imgs.reload" mode="scaleToFill" />
					</view>
				</view>
				<view class="textBox">
					<u-input v-model="postBody.title" type="text" placeholder="添加标题" :maxlength="20" border="none">
						<template slot="suffix">
							<view style="display: flex; align-items: center">
								<image :src="imgs.close" mode="scaleToFill" style="width: 20px; height: 20px"
									@click="onClearTitle" />
								<text class="text-tips">{{ titleLength }}</text>
							</view>
						</template>
					</u-input>
					<view style="margin-top: 16rpx; margin-bottom: 24rpx">
						<u-divider color="#F0F0F0"></u-divider>
					</view>
					<view style="display: flex">
						<scroll-view scroll-y style="height: 512rpx" @scroll="onScroll">
							<textarea placeholder-style="color:rgba(29,35,38,0.3);font-size:14px;font-weig1ht: 400;"
								style="width: 100%; overflow: scroll !important;-webkit-overflow-scrolling: touch !important;"
								v-model="postBody.content" type="text" maxlength="800" disable-default-padding="true"
								placeholder="和大家聊聊你的热爱吧..." border="none" autoHeight="true"></textarea>
						</scroll-view>
					</view>
				</view>
			</view> 
			<view class="siteSelectionBox">
				<!-- 位置 -->
				<view class="box1">
					<view class="left">
						<image :src="imgs.location" mode="scaleToFill" style="width: 16px; height: 16px" />
						<text class="cell-title">添加位置</text>
					</view>
					<view class="right" @click="toAddLocation()">
						<text>{{postBody.address||'去选择'}}</text>
						<u-icon name="arrow-right" size="6 10" color="#CCCCCC"></u-icon>
					</view>
				</view>
				<!-- 关联赛事 -->
				<view class="box1">
					<view class="left">
						<image :src="imgs.cup" mode="scaleToFill" style="width: 16px; height: 16px" />
						<text class="cell-title">关联赛事</text>
					</view>
					<view class="right" @click="$utils.toPath.navigateTo('/dynamic/publish/choseMatch')">
						<text>{{obj.addAddressName||'去选择'}}</text>
						<u-icon name="arrow-right" size="6 10" color="#CCCCCC"></u-icon>
					</view>
				</view>
				<!-- 关联运动 -->
				<view class="box1">
					<view class="left">
						<image :src="imgs.basketball" mode="scaleToFill" style="width: 16px; height: 16px" />
						<text class="cell-title">关联运动</text>
					</view>
					<view class="right" @click="showModal=true">
						<scroll-view scroll-x v-if="sportList.length" class="l-box">
							<div class="l-box-item" v-for="(item,index) in sportList" :key="index">
								{{item.label_name}}
							</div>
						</scroll-view>
						<text v-else>去选择</text>
						<u-icon name="arrow-right" size="6 10" color="#CCCCCC"></u-icon>
					</view>
				</view>
			</view>
		</view>

		<AssociationSportModalVue :show="showModal" @close="showModal=false" @confrim="confrimHandle" />
		<!-- 占位 -->
		<view class="zhanWei" style="height: 136rpx;"></view>
		<view class="zhanWei" :style="{height: (keyboardHeight?1000:0)+'px'}"></view>
		<!-- 底部按钮 -->
		<view class="bottomBox safe-bottom">
			<view class="layoutBox">
				<view class="part">
					<view class="draftBox">
						<u-icon name="file-text" color="#000" size="24"></u-icon>
						<view>存草稿</view>
					</view>
					<view class="previewBox" @click="toPreview">
						<u-icon name="eye" color="#000" size="24"></u-icon>
						<view>预览</view>
					</view>
				</view>
				<u-button class="publishButton" color="#15181A ">发布动态</u-button>
			</view>
		</view>
	</view>
</template>
<script>
	import AssociationSportModalVue from '@/components/AssociationSportModal/AssociationSportModal.vue';
	export default {
		components: {
			AssociationSportModalVue
		},
		computed: {
			titleLength() {
				return (20 - this.postBody.title.length)
			},
			isShow() {
				return this.postBody.title.length > 0
			}
		},
		data() {
			return {
				imgs: this.$img.dynamic,
				showModal: false, //选择体育弹窗
				fileList: [],
				title: "",
				titleContent: "",
				bottomBoxHeight: 0,
				windowHeight: uni.getSystemInfoSync().windowHeight,
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				isShowPopup: false,
				showPreview: false,
				obj: {
					lineTop: 0,
					addAddressName: "",
				},
				postBody: {
					matchId: '', //赛事id?
					venueId: '', //场地id?
					labelCode: '', //'赛事项目代码，多个以逗号隔开',
					serialNum: '', //流水号
					title: '', //标题
					content: '', //内容
					address: '', //发布地址
					detailAddress: '', //详细地址
					courseUrl: '', //课程链接?
					venueUrl: '', //场地链接？
					state: '', //动态状态：0-草稿，1-已发布
					locationLng: 0, //
					locationLat: 0
				},
				keyboardHeight: 0,
				scrollTop: 0,
				sportList: []
			};
		},
		watch: {
			postBody: {
				handler(newVal, oldVal) {
					if (newVal.title.length == 20) {
						this.$utils.toast('标题最多输入20字');
					}
				},
				deep: true,

			},
			keyboardHeight(newVal) {
				if (newVal > 0) {
					this.$nextTick(() => {
						uni.pageScrollTo({
							selector: '#tipsBox'
						})
					});
				} else {
					this.scrollTop = 0; // 重置滚动位置
					uni.pageScrollTo({
						scrollTop: 0
					})
				}
			}
		},
		methods: {
			async getNewsSerialNum() {
				const res = await this.$requestAll.dynamics.getNewsSerialNum();
				this.postBody.serialNum = res.data.newsSerialNum;
			},
			// ========
			confrimHandle(evt) {
				this.sportList = evt;
			},
			//图片读取后的处理函数
			async afterRead(e) {
				console.log(e);
				try {
					let that = this;
					const res = await Promise.all(e.file.map(item => this.$utils.uploadImg(
						'http://192.168.3.46:8001/news/upload',
						item.url, {
							file: item.url,
							serialNum: that.postBody.serialNum,
							fileTypeCode: '111',
							fileTypeName: '动态发布'
						}
					)))
					this.$utils.toast('上传成功');
					this.fileList = res.map(o => ({
						...o,
						url: o.fileURL
					}));
				} catch (error) {}
			},
			//图片删除函数
			async deletePic(e) {
				console.log(e.file.id, '点击删除');
				const id = e.file.id;
				const res = await this.$requestAll.dynamics.delImg(id);
				if (res.status == 200) {
					this.$utils.toast('删除成功');
					this.fileList.splice(e.index, 1);
				} else {
					this.$utils.toast(res.message);
				}
			},
			//标题输入事件
			changeEvent(e) {
				console.log(e);
			},
			onClearTitle() {
				this.postBody.title = '';
			},
			toPreview() {
				
			},
			toAddLocation() {
				this.$utils.toPath.navigateTo('/dynamic/publish/addLocation');
			},
			onScroll(e) {
				this.$set(this.obj, "lineTop", e.detail.scrollTop);

			},
		},

		onLoad() {
			this.getNewsSerialNum();
			uni.onKeyboardHeightChange((res) => {
				this.keyboardHeight = res.height || 0
			});
		},
		onShow() {

			// 选择赛事
			// if (uni.getStorageSync('choseMachItem')) {
			// 	this.postBody.match = uni.getStorageSync('choseMachItem');
			// 	uni.removeStorageSync('choseMachItem')
			// }

			// 添加位置
			if (uni.getStorageSync('choseAddressInfo')) {
				const choseAddressInfo = JSON.parse(uni.getStorageSync('choseAddressInfo'));
				Object.assign(this.postBody, choseAddressInfo);
				uni.removeStorageSync('choseAddressInfo');
				if (!choseAddressInfo.venueId) {
					this.postBody.venueId = '';
				}
			}


		}
	};
</script>

<style lang="scss">
	.l-box {
		width: 400rpx;
		white-space: nowrap;
		text-align: end;

		.l-box-item {
			display: inline-block;
			padding: 6rpx 12rpx;
			font-weight: 600;
			font-size: 24rpx;
			color: #EC383C;
			border: 2rpx solid rgba(236, 56, 74, 0.2);
			border-radius: 4rpx;
			margin-right: 12rpx;
		}
	}

	.cell-title {
		padding-left: 3px;
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 14px;
		color: #1d2326;
		line-height: 22px;
		text-align: left;
		font-style: normal;
		text-transform: none;
	}

	.text-tips {
		font-family: PingFang SC, PingFang SC;
		font-weight: 400;
		font-size: 12px;
		color: rgba(29, 35, 38, 0.3);
		line-height: 16px;
		text-align: left;
		font-style: normal;
		text-transform: none;
	}

	.left-nav {
		display: flex;
		align-items: center;

		>text {
			margin-left: 8rpx;
			font-weight: 600;
			font-size: 32rpx;
			color: #1D2326;
		}
	}

	::v-deep .u-upload__deletable.data-v-49deb6f2 {
		white-space: nowrap;
		/* 禁止换行 */
	}

	::v-deep .u-upload__wrap.data-v-49deb6f2 {
		flex-wrap: nowrap !important;
	}

	::v-deep .u-upload__wrap__preview.data-v-49deb6f2 {
		margin: 0px 8px 0px 0px !important;
	}

	::v-deep .u-upload__deletable.data-v-49deb6f2 {
		border-bottom-left-radius: 5px;
		border-top-right-radius: 5px;
		background-color: #71767c;
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
		width: 220px;
		height: 44px;
	}

	.box {
		background-color: #fff;
		width: 100vw;
		height: 100vh;

		.text-area {
			display: flex;
			justify-content: center;
		}

		.title {
			font-size: 26rpx;
			color: #999999;
		}

		image {
			width: 750rpx;
		}

		.contentBox {
			width: calc(100% - 60px);
			margin: 0 16px;
			padding: 12px;
			background-color: #f3f4f5;
			border-radius: 10px;

			.custom-preview-image {
				width: 100%;
				max-height: 80vh;
				object-fit: contain;
				border-radius: 8px;
			}

			.close-btn {
				position: absolute;
				top: 10px;
				right: 10px;
				background: rgba(0, 0, 0, 0.5);
				color: white;
				border: none;
				padding: 5px 10px;
				border-radius: 4px;
				cursor: pointer;
			}

			.tipsBox {
				.topIcon {
					position: relative;
					top: 4px;
					left: 13px;
					width: 20px;
					height: 8px;
				}

				.box1 {
					display: flex;
					align-items: center;
					margin-bottom: 24rpx;
					width: 416rpx;
					height: 48rpx;
					background: #ffffff;
					border-radius: 8rpx;

					.tipsText {
						padding: 0 12rpx;
						width: 260rpx;
						height: 24rpx;
						font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
						font-size: 28rpx;
						color: #1d2326;
						line-height: 12px;
						font-style: italic;
						font-weight: bolder;
					}

					.tipsIcon {
						margin-left: 4px;
						width: 45px;
						height: 16px;
					}

					.reloadIcon {
						width: 16px;
						height: 16px;
					}
				}
			}

			.custom-upload {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				background-color: #fff;
				width: 86px;
				height: 86px;
				border-radius: 4px;

				.plusIcon {
					display: flex;
					justify-content: center;
					align-items: center;
					margin-bottom: 12rpx;
				}

				.upload-text {
					width: 110rpx;
					height: 32rpx;
					font-family: PingFang SC, PingFang SC;
					font-weight: 400;
					font-size: 24rpx;

					color: rgba(29, 35, 38, 0.6);
					line-height: 16px;
					text-align: left;
					font-style: normal;
					text-transform: none;
				}
			}

			.textBox {
				width: calc(100% - 24px);
				padding: 12px;
				background-color: #fff;
			}
		}

		.siteSelectionBox {
			margin-top: 16px;
			width: 100%;

			.box1 {
				margin: 16px;
				width: calc(100% - 36px);
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					display: flex;
					align-items: center;
				}

				.right {
					color: #8a8a8a;
					display: flex;
					align-items: center;

					>text {
						font-weight: 400;
						font-size: 28rpx;
					}
				}
			}

			.box2 {
				margin: 0 16px;
				width: calc(100% - 36px);

				.top2Icon {
					position: relative;
					top: 4px;
					left: 18px;
					width: 20px;
					height: 8px;
				}

				.scrollxBox {
					padding: 0 6px;
					width: calc(100% - 12px);
					display: flex;
					border-radius: 4px;
					background-color: #f3f4f5;

					.cardBox {
						width: calc(100% - 12px);
						display: flex;
						align-items: center;
						padding: 6px 0px;

						.card {
							display: flex;
							align-items: center;
							justify-content: center;
							height: 22px;
							padding: 5px 8px;
							border-radius: 4px;
							margin-right: 8px;
							background-color: #fff;
							white-space: nowrap;

							text {
								font-family: PingFang SC, PingFang SC;
								font-weight: 400;
								font-size: 14px;
								color: rgba(29, 35, 38, 0.6);
								line-height: 22px;
								text-align: left;
								font-style: normal;
								text-transform: none;
							}
						}
					}
				}
			}
		}

		.bottomBox {
			box-shadow: 0px -4px 10px 0px rgba(203, 212, 226, 0.28);
			width: 100%;
			height: 136rpx;
			box-sizing: border-box;
			background-color: #fff;
			position: fixed;
			bottom: 0;
			// padding-bottom: 34px;

			.layoutBox {
				width: calc(100% - 48px);
				margin: 0 16px;
				display: flex;
				align-items: center;
				padding: 12px 0px;
				padding-left: 16px;
				justify-content: space-between;

				.part {
					display: flex;

					.draftBox {
						width: 48px;
						height: 44px;
						margin-right: 16px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						font-size: 12px;
					}

					.previewBox {
						width: 48px;
						height: 44px;
						margin-right: 11px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						font-size: 12px;
					}
				}

				.publishButton {
					font-family: PingFang SC, PingFang SC;
					font-weight: 600;
					font-size: 16px;
					color: #ffffff;
					line-height: 24px;
					text-align: left;
					font-style: normal;
					text-transform: none;
				}
			}
		}
	}
</style>