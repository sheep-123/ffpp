<template>
	<view>
		<Navbar title="编辑资料" />
		<div class="content">
			<!-- 头像区域 -->
			<div class="avatar-section" @click="chooseAvatar">
				<div class="avatar-wrapper">
					<image :src="form.avatarUrl" mode="aspectFill" class="avatar-image"></image>
					<view class="camera-icon">
						<image src="/static/templateImage/user/camera.png" mode=""></image>
					</view>
				</div>
			</div>

			<!-- 基本信息列表 -->
			<div class="info-list">
				<!-- 名字 -->
				<div class="cell-item" @click="showNameInput">
					<div class="left">名字</div>
					<div class="right">
						<text class="value" :class="{ 'placeholder': !form.username }">{{ form.username || '请输入名字'
						}}</text>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</div>
				</div>

				<u-popup safeAreaInsetBottom :show="nameShow">
					<view class="poup-box">
						<div class="head-box">
							<div class="left" @click="nameShow=false" >取消</div>
							<div class="center">编辑昵称</div>
							<div class="right" @click="nicknameConrimHandle" >确定</div>
						</div>
						<div class="bottom-box">
							<u-input v-model="nickname" placeholder="请输入昵称" border="bottom" clearable></u-input>
						</div>
					</view>
				</u-popup>

				<!-- 个人简介 -->
				<div class="cell-item" @click="showIntroInput">
					<div class="left">个人简介</div>
					<div class="right">
						<text class="value" :class="{ 'placeholder': !form.biography }">{{ form.biography ||
							'请输入个人简介' }}</text>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</div>
				</div>
				<u-popup safeAreaInsetBottom :show="detailShow">
					<view class="poup-box">
						<div class="head-box">
							<div class="left" @click="detailShow=false" >取消</div>
							<div class="center">编辑简介</div>
							<div class="right" @click="conetntConfrimHandle" >确定</div>
						</div>
						<div class="bottom-box">
							<u-textarea  v-model="detail" placeholder="请输入简介" border="bottom" clearable></u-textarea>
						</div>
					</view>
				</u-popup>

				<!-- 性别 -->
				<div class="cell-item" @click="showGenderPicker">
					<div class="left">性别</div>
					<div class="right">
						<text class="value" :class="{ 'placeholder': !form.gender }">{{
							form.gender == '0' ? '未知' : `${form.gender == '1' ? '男' : '女'}` || '请选择性别' }}</text>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</div>
				</div>
				<u-picker @confirm="confrimSexHandle" @cancel="sexShow = false" :show="sexShow"
					:columns="columns"></u-picker>

				<!-- 生日 -->
				<div class="cell-item" @click="showDatePicker">
					<div class="left">生日</div>
					<div class="right">
						<text class="value" :class="{ 'placeholder': !form.birthday }">{{ form.birthday || '请选择生日'
						}}</text>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</div>
				</div>
				<u-datetime-picker :minDate="minDate" @confirm="confrimBrithDayHandle" @cancel="brithDayShow = false"
					:show="brithDayShow" mode="date"></u-datetime-picker>

				<!-- 所在地 -->
				<div class="cell-item" @click="showLocationPicker">
					<div class="left">所在地</div>
					<div class="right">
						<text class="value" :class="{ 'placeholder': !form.location }">{{ form.location ||
							'请选择所在地' }}</text>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</div>
				</div>
				<addressPopup :show.sync="loactionShow" :safe='false' @handelAddress="handleAddress"></addressPopup>

				<div class="cell-item" @click="chooseBackground">
					<div class="left">背景图</div>
					<div class="right">
						<div class="bg-wrapper">
							<image style="width: 86rpx;height: 58rpx;" v-if="form.backgroundImage"
								:src="form.backgroundImage" mode="aspectFill" class="bg-image"></image>
							<view v-else class="bg-placeholder">
								<u-icon name="camera-fill" size="28" color="#999"></u-icon>
							</view>
						</div>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</div>
				</div>

				<!-- 玩家号 -->
				<div class="cell-item" @click="showPlayerIdInput">
					<div class="left">玩家号</div>
					<div class="right">
						<text class="value" :class="{ 'placeholder': !form.userId }">{{ form.userId || '请输入玩家号'
						}}</text>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</div>
				</div>
			</div>

			<!-- 背景图区域 -->

		</div>
	</view>
</template>

<script>
	import Navbar from "@/components/WNavbar/index.vue";
	import addressPoup from '@/components/addressPopup/addressPopup.vue';
	// minDate 是从1949年1月1日的00:00:00开始的时间戳
	const minDate = new Date(1949, 0, 1).getTime();



	export default {
		components: {
			Navbar,
			addressPoup
		},
		data() {
			return {
				columns: [
					['未知', '男', '女']
				],
				nickname:'',
				detail: '',
				minDate,
				form: {},
				nameShow: false,
				detailShow: false,
				sexShow: false,
				brithDayShow: false,
				loactionShow: false
			}
		},
		onLoad() {
			this.getUserInfo();
		},
		methods: {
			async conetntConfrimHandle() {
				if (this.detail == '') {
					this.$utils.toast('请输入简介');
					return;
				}
				const res = await this.$requestAll.user.updateUserBasicInfo({
					biography: this.detail
				});
				if (res.status == 200) {
					this.$utils.toast('修改成功');
					this.detailShow = false;
					this.getUserInfo();
				} else {
					this.$utils.toast(res.message);
				}
			},
			async nicknameConrimHandle() {
				if (this.nickname == '') {
					this.$utils.toast('请输入昵称');
					return;
				}
				const res = await this.$requestAll.user.updateUserBasicInfo({
					username: this.nickname
				});
				if (res.status == 200) {
					this.$utils.toast('修改成功');
					this.nameShow = false;
					this.getUserInfo();
				} else {
					this.$utils.toast(res.message);
				}
			},
			async getUserInfo() {
				const res = await this.$requestAll.user.getUserBasicInfo(uni.getStorageSync('user').id);
				this.form = res.data;
			},
			async handleAddress(e) {
				const location = e.province + e.city + e.area;
				const res = await this.$requestAll.user.updateUserBasicInfo({
					location
				})
				if (res.status == 200) {
					this.$utils.toast('修改成功');
					this.loactionShow = false;
					this.getUserInfo();
				} else {
					this.$utils.toast(res.message);
				}

			},
			// 选择头像
			async chooseAvatar() {
				try {
					const res = await uni.chooseImage({
						count: 1
					});
					const reslut = await this.$utils.uploadImg('/userPage/uploadUserAvatar?userId=' + uni
						.getStorageSync('user').id, res.tempFilePaths[0])
					this.$utils.toast('头像修改成功');
					this.getUserInfo();
				} catch (error) {
					// this.$utils.toast('取消选择');
				}
			},

			// 选择背景图
			async chooseBackground() {
				try {
					const res = await uni.chooseImage({
						count: 1
					});
					const reslut = await this.$utils.uploadImg('/userPage/uploadUserBackground?userId=' + uni
						.getStorageSync('user').id, res.tempFilePaths[0])
					this.$utils.toast('背景图修改成功');
					this.getUserInfo();
				} catch (error) {
					// this.$utils.toast('取消选择');
				}
			},
			async confrimBrithDayHandle(e) {
				const date = new Date(e.value);
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				const birthday = `${year}-${month}-${day}`;
				const res = await this.$requestAll.user.updateUserBasicInfo({
					birthday
				});
				if (res.status == 200) {
					this.$utils.toast('修改成功');
					this.brithDayShow = false;
					this.getUserInfo();
				} else {
					this.$utils.toast(res.message);
				}
			},
			async confrimSexHandle(e) {
				console.log(e);
				const gender = e.indexs[0];
				const res = await this.$requestAll.user.updateUserBasicInfo({
					gender
				})
				if (res.status == 200) {
					this.$utils.toast('修改成功');
					this.sexShow = false;
					this.getUserInfo();
				} else {
					this.$utils.toast(res.message);
				}

			},


			// 上传图片
			uploadImage(filePath, type) {
				// 实现图片上传逻辑
			},

			// 显示名字输入框
			showNameInput() {
				this.nickname = this.form.username;
				this.nameShow = true;
			},

			// 显示简介输入框
			showIntroInput() {
				this.detail = this.form.biography;
				this.detailShow = true;
			},

			// 显示性别选择器
			showGenderPicker() {
				// 实现性别选择器
				this.sexShow = true;
			},

			// 显示日期选择器
			showDatePicker() {
				// 实现日期选择器
				this.brithDayShow = true;
			},

			// 显示地区选择器
			showLocationPicker() {
				// 实现地区选择器
				this.loactionShow = true;
			},

			// 显示玩家号输入框
			showPlayerIdInput() {},

			// 提交表单
			submitForm() {
				// 表单验证
				if (!this.form.name) {
					uni.showToast({
						title: '请输入名字',
						icon: 'none'
					});
					return;
				}

				// 提交表单
				uni.showLoading({
					title: '保存中...'
				});

				// 这里调用API保存用户信息
				// saveUserInfo(this.form).then(() => {
				// 	uni.hideLoading();
				// 	uni.showToast({
				// 		title: '保存成功'
				// 	});
				// 	uni.navigateBack();
				// }).catch(err => {
				// 	uni.hideLoading();
				// 	uni.showToast({
				// 		title: err.message || '保存失败',
				// 		icon: 'none'
				// 	});
				// });
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding-top: 32rpx;
	}

	.poup-box {
		width: 100%;
		height: 60vh;
		padding: 28rpx;
		box-sizing: border-box;

		.bottom-box {
			padding: 28rpx;
		}

		.head-box {
			height: 48rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.left {
				font-weight: 400;
				font-size: 24rpx;
				color: rgba(29, 35, 38, 0.3);
			}

			.center {
				font-weight: 600;
				font-size: 28rpx;
				color: #1D2326;
			}

			.right {
				font-weight: 600;
				font-size: 24rpx;
				color: #2A8ABA;
			}
		}
	}

	.avatar-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20rpx 32rpx 52rpx;
		// background-color:yellow;

		.avatar-wrapper {
			width: 200rpx;
			height: 200rpx;
			position: relative;
			// border-radius: 50%;
			// overflow: hidden;
			// background: #fff;

			.avatar-image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
				display: block;
			}

			.camera-icon {
				position: absolute;
				right: 0;
				bottom: 0;
				width: 44rpx;
				height: 44rpx;

				>image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.cell-item {
		background: #FFFFFF;
		padding: 32rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #EEEEEE;

		.left {
			font-weight: 400;
			font-size: 28rpx;
			color: rgba(29, 35, 38, 0.8);
		}

		.right {
			display: flex;
			align-items: center;

			.value {
				font-weight: 400;
				font-size: 28rpx;
				color: #1D2326;
				margin-right: 16rpx;
				max-width: 400rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;

				&.placeholder {
					color: #999999;
				}
			}

			.u-icon {
				font-size: 32rpx;
			}
		}

		&:last-child {
			border-bottom: none;
		}
	}

	.background-box {
		margin-top: 32rpx;
		border-radius: 0;

		.bg-wrapper {
			width: 140rpx;
			height: 180rpx;
			margin-right: 16rpx;
			border-radius: 16rpx;
			overflow: hidden;
			position: relative;
			background: #fff;

			.bg-image {
				width: 100%;
				height: 100%;
				display: block;
			}

			.bg-placeholder {
				width: 100%;
				height: 100%;
				background: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	.info-list {
		background: #FFFFFF;
		border-top: 20rpx solid #fff;
		border-bottom: 20rpx solid #fff;

		.cell-item {
			margin: 0;
			border-radius: 0;
		}
	}
</style>