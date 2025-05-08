<template>
	<view class="mark-site-container">
		<Wnavbar title="标记场地"></Wnavbar>
		<view class="form-container">
			<view class="form-item">
				<view class="label required">场地名称</view>
				<input class="input" type="text" v-model="formData.siteName" placeholder="请与场地招牌上的名字保持一致" />
			</view>
			<view class="form-item">
				<view class="label required">场地入口照片</view>
				<view class="upload-box" @click="chooseImage">
					<image v-if="formData.doorPhoto" :src="formData.doorPhoto" mode="aspectFill" class="preview-image">
					</image>
					<view v-else class="upload-placeholder">
						<text class="iconfont icon-add">+</text>
						<text class="upload-text">上传图片</text>
					</view>
				</view>
			</view>
			<view class="form-item">
				<view class="label required">场地位置</view>
				<view class="map-container">
					<view class="map-box" @click="chooseLocation">
						<map :latitude="formData.locationLat" :longitude="formData.locationLng" :markers="marks"
							style="width: 100%; height: 172rpx"></map>
						<view v-if="!formData.locationLat" class="map-placeholder">
							<view style="margin-bottom:12rpx ;">
								<u-icon name="map" color="#fff"></u-icon>
							</view>
							<text>请在地图上选择位置</text>
						</view>
					</view>
				</view>
				<view class="location-input">
					<view>
						<u-input border="none" class="address-input" type="text" v-model="formData.address"
							placeholder="请填写详细地址(选填)" />
					</view>
				</view>
			</view>

			<!-- 商家信息 -->
			<div class="form-box">
				<view class="section-title">商家信息</view>
				<view class="form-item-s flex-jb bottom-b">
					<view class="label-s">商家类型</view>
					<view class="value-box-s " @tap="selectBusinessType">
						<text>{{ formData.stadiumType || '请选择' }}</text>
						<u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
					</view>
				</view>

				<!-- 手机号 -->
				<view class="form-item-s  flex-jb  bottom-b">
					<view class="label-s">手机号</view>
					<view class="value-box-c">
						<u-input border="none" type="text" v-model="formData.contactWay" placeholder="请输入手机号" />
					</view>
				</view>

				<view class="form-item-s flex-jb bottom-b">
					<view class="label-s">经营状态</view>
					<view class="value-box-s" @tap="selectBusinessStatus">
						<text>{{ formData.openStatus || '请选择' }}</text>
						<u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
					</view>
				</view>

				<view class="form-item-s flex-jb bottom-b">
					<view class="label-s">经营时间</view>
					<view class="value-box-s" @tap="selectBusinessHours">
						<text>{{ formData.openTime || '请选择' }}</text>
						<u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
					</view>
				</view>

			</div>

			<!-- 场地信息 -->
			<div class="form-box">
				<view class="section-title">场地信息</view>
				<view v-for="(item, index) in formData.cdMarkInfoList" :key="index" class="site-info-section">
					<view class="form-item-s flex-jb bottom-b">
						<view class="label-s">场地类型</view>
						<view class="value-box-s" @tap="selectSiteType(index)">
							<text>{{ item.siteType || '请选择' }}</text>
							<u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
						</view>
					</view>

					<view class="form-item-s flex-jb bottom-b">
						<view class="label-s">最小单元</view>
						<view class="value-box-s" @tap="selectMinUnit(index)">
							<text>{{ item.minSiteUnit || '请选择' }}</text>
							<u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
						</view>
					</view>

					<view class="form-item-s flex-jb bottom-b">
						<view class="label-s">场地数量</view>
						<view class="value-box-s" @tap="selectSiteCount(index)">
							<text>{{ item.siteNumber || '请选择' }}</text>
							<u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
						</view>
					</view>

					<!-- 运动类型 -->
					<view class="form-item-s flex-jb bottom-b">
						<view class="label-s">运动类型</view>
						<view class="value-box-s" @tap="selectSports(index)">
							<text>{{ item.suitableSports.length > 0 ? item.suitableSports.join(', ') : '请选择' }}</text>
							<u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
						</view>
					</view>
				</view>

				<view class="add-site-btn" @click="addSiteInfo">
					<text class="iconfont icon-add">+</text>
					<text>添加场地信息</text>
				</view>
			</div>

			<!-- 添加其他类型按钮 -->
		</view>

		<view style="height: 136rpx;"></view>
		<view class="safe-bottom bottom-btn">
			<view class="btn" @click="sureHandle" :style="{ 'background-color': '#15181A' }">
				确认选择
			</view>
		</view>
	</view>
</template>

<script>
	import Wnavbar from '@/components/WNavbar/index.vue';
	const obj = {
		siteType: '', //场地类型
		minSiteUnit: '', //最小场地单元 (1--半场，2--全场
		siteNumber: 0, //场地数量
		suitableSports: '', //适合运动（多个以逗号隔开）
	}
	export default {
		components: {
			Wnavbar
		},
		data() {
			return {
				formData: {
					doorPhoto: '',
					siteName: '',
					siteAddress: '',
					address: '',
					city: '广州市',
					locationLat: 0,
					locationLng: 0,
					stadiumType: '', //商家类型
					contactWay: '', //联系方式
					openStatus: '', //经营状态 经营状态（1--即将营业，2--正在营业，3--暂停营业)}
					openTime: '', //经营时间
					cdMarkInfoList: [{
						siteType: '', //场地类型
						minSiteUnit: '', //最小场地单元 (1--半场，2--全场
						siteNumber: 0, //场地数量
						suitableSports: [], //适合运动（多个以逗号隔开）
					}]
				},
				choseInfo: {
					id: 0,
					latitude: null,
					longitude: null,
					width: 58,
					height: 58,
					iconPath: 'https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/Frame.png'
				},
				marks:[]
			};
		},
		methods: {
			chooseLocation() {
				uni.chooseLocation({
					success: (res) => {
						console.log(res, '地址');
						this.formData.locationLng = res.longitude;
						this.formData.locationLat = res.latitude;
						this.choseInfo.latitude = res.latitude;
						this.choseInfo.longitude = res.longitude;
						this.formData.siteAddress = res.address;
						this.marks = [this.choseInfo]
					}
				});
			},
			chooseImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.formData.doorPhoto = res.tempFilePaths[0];
					}
				});
			},
			selectCity() {
				// 城市选择逻辑
			},
			selectBusinessType() {
				// 商家类型选择逻辑
			},
			selectBusinessStatus() {
				// 经营状态选择逻辑
			},
			selectBusinessHours() {
				// 经营时间选择逻辑
			},
			selectSiteType(index) {
				// 场地类型选择逻辑
			},
			selectMinUnit(index) {
				// 最小单元选择逻辑
			},
			selectSiteCount(index) {
				// 场地数量选择逻辑
			},
			selectSports(index) {
				// 运动类型选择逻辑
			},
			addOtherType() {
				// 添加其他类型逻辑
			},
			submitForm() {
				// 表单提交逻辑
				console.log(this.formData);
			},
			addSiteInfo() {
				this.formData.cdMarkInfoList.push({
					siteType: '', //场地类型
					minSiteUnit: '', //最小场地单元 (1--半场，2--全场
					siteNumber: 0, //场地数量
					suitableSports: [], //适合运动（多个以逗号隔开）
				})
			},
			removeSiteInfo(index) {
				this.formData.cdMarkInfoList.splice(index, 1)
			}
		}
	};
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #f5f5f5;
	}

	.bottom-b {
		border-bottom: 1rpx solid #F0F0F0;
	}

	.form-item-s {
		padding: 32rpx 0;

		.label-s {
			font-weight: 600;
			font-size: 28rpx;
			color: #1D2326;
		}

		.value-box-c {
			display: flex;
			align-items: end;
		}

		.value-box-s {
			display: flex;
			align-items: center;

			>text {
				font-weight: 400;
				font-size: 28rpx;
				color: #CCCCCC;
				margin-right: 6rpx;
			}

		}
	}

	.form-box {
		background-color: #fff;
		margin-bottom: 20rpx;
		padding: 24rpx 32rpx;
	}

	.triangle-down-999C9D {
		width: 0;
		height: 0;
		border-left: 10rpx solid transparent;
		border-right: 10rpx solid transparent;
		border-top: 12rpx solid #15181a;
	}

	.bottom-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 136rpx;
		background-color: #fff;
		padding: 24rpx 38rpx;
		z-index: 1000;

		.btn {
			font-weight: 600;
			font-size: 32rpx;
			color: #FFFFFF;
			width: 654rpx;
			height: 88rpx;
			background: #15181A;
			border-radius: 80rpx 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.mark-site-container {}

	.form-container {
		padding: 24rpx 32rpx;
	}

	.form-item {
		background-color: #fff;
		padding: 32rpx 24rpx;
		margin-bottom: 24rpx;
	}

	.label {
		font-weight: 600;
		font-size: 28rpx;
		color: #1D2326;
		margin-bottom: 24rpx;

		&.required::after {
			content: '*';
			color: #ff4d4f;
			margin-left: 4rpx;
		}
	}

	.input {
		width: 100%;
		height: 80rpx;
		font-size: 28rpx;
		color: #333;
	}

	.upload-box {
		width: 172rpx;
		height: 172rpx;
		background-color: #f7f7f7;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.upload-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;

		.icon-add {
			font-size: 60rpx;
			color: #999;
		}

		.upload-text {
			font-size: 24rpx;
			color: #999;
			margin-top: 10rpx;
		}
	}

	.preview-image {
		width: 100%;
		height: 100%;
	}

	.map-container {
		width: 100%;
		height: 172rpx;
		// background-color: #484B4C;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;

		.map-box {
			position: relative;
			width: 100%;

			.map-placeholder {
				width: 100%;
				height: 172rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				position: absolute;
				font-weight: 400;
				font-size: 28rpx;
				color: #FFFFFF;
				top: 0;
				left: 0;
				z-index: 1;
				background-color: rgba(0, 0, 0, 0.5);
			}
		}

	}

	.location-input {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.city-select {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-weight: 400;
			font-size: 28rpx;
			color: #1D2326;

			>text {
				margin-right: 8rpx;
			}
		}

	}

	.section-title {
		font-weight: 600;
		font-size: 32rpx;
		color: #1D2326;
		margin-bottom: 8rpx;
	}

	.value-box {
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.placeholder {
			color: #999;
			font-size: 28rpx;
		}

		.arrow {
			color: #999;
			font-size: 28rpx;
		}
	}

	.add-more {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		margin-top: 20rpx;

		.add-icon {
			color: #ff4d4f;
			margin-right: 10rpx;
		}
	}

	.submit-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		background-color: #000;
		color: #fff;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.add-site-btn {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		margin-top: 20rpx;

		.iconfont {
			color: #ff4d4f;
			margin-right: 10rpx;
		}
	}

	.site-info-section {
		margin-bottom: 20rpx;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;

		.delete-btn {
			color: #ff4d4f;
		}
	}
</style>