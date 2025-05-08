<template>
	<view>
		<Navbar title="编辑资料" />
		<div class="content">
			<!-- 头像区域 -->
			<div class="avatar-section" @click="chooseAvatar">
				
				<div class="avatar-wrapper">
					<image v-if="form.avatar" :src="form.avatar" mode="aspectFill" class="avatar-image"></image>
					<image v-else src="/static/images/default-avatar.png" mode="aspectFill" class="avatar-image"></image>
					<view class="camera-icon">
						<u-icon name="camera-fill" size="28" color="#fff"></u-icon>
					</view>
				</div>
			</div>

			<!-- 基本信息列表 -->
			<div class="info-list">
				<!-- 名字 -->
				<div class="cell-item" @click="showNameInput">
					<div class="left">名字</div>
					<div class="right">
						<text class="value" :class="{'placeholder': !form.name}">{{form.name || '请输入名字'}}</text>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</div>
				</div>
				
				<!-- 个人简介 -->
				<div class="cell-item" @click="showIntroInput">
					<div class="left">个人简介</div>
					<div class="right">
						<text class="value" :class="{'placeholder': !form.intro}">{{form.intro || '请输入个人简介'}}</text>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</div>
				</div>
				
				<!-- 性别 -->
				<div class="cell-item" @click="showGenderPicker">
					<div class="left">性别</div>
					<div class="right">
						<text class="value" :class="{'placeholder': !form.gender}">{{form.gender || '请选择性别'}}</text>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</div>
				</div>
				
				<!-- 生日 -->
				<div class="cell-item" @click="showDatePicker">
					<div class="left">生日</div>
					<div class="right">
						<text class="value" :class="{'placeholder': !form.birthday}">{{form.birthday || '请选择生日'}}</text>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</div>
				</div>
				
				<!-- 所在地 -->
				<div class="cell-item" @click="showLocationPicker">
					<div class="left">所在地</div>
					<div class="right">
						<text class="value" :class="{'placeholder': !form.location}">{{form.location || '请选择所在地'}}</text>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</div>
				</div>
				
				<!-- 玩家号 -->
				<div class="cell-item" @click="showPlayerIdInput">
					<div class="left">玩家号</div>
					<div class="right">
						<text class="value" :class="{'placeholder': !form.playerId}">{{form.playerId || '请输入玩家号'}}</text>
						<u-icon name="arrow-right" color="#999999"></u-icon>
					</div>
				</div>
			</div>

			<!-- 背景图区域 -->
			<div class="background-box cell-item" @click="chooseBackground">
				<div class="left">背景图</div>
				<div class="right">
					<div class="bg-wrapper">
						<image v-if="form.backgroundImage" :src="form.backgroundImage" mode="aspectFill" class="bg-image"></image>
						<view v-else class="bg-placeholder">
							<u-icon name="camera-fill" size="28" color="#999"></u-icon>
						</view>
					</div>
					<u-icon name="arrow-right" color="#999999"></u-icon>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
import Navbar from "@/components/WNavbar/index.vue";

export default {
	components: {
		Navbar
	},
	data() {
		return {
			form: {
				avatar: '',
				name: '薛定谔的猫',
				intro: '本人😊, 爱好雪场与星空, 喜欢冬天去新疆滑雪, 如需商...',
				gender: '女',
				birthday: '2012/08/05',
				location: '广州市',
				playerId: '2238921943',
				backgroundImage: '' // 只需要一张背景图
			}
		}
	},
	methods: {
		// 选择头像
		chooseAvatar() {
			uni.chooseImage({
				count: 1,
				success: (res) => {
					this.form.avatar = res.tempFilePaths[0];
					this.uploadImage(res.tempFilePaths[0], 'avatar');
				}
			});
		},
		
		// 选择背景图
		chooseBackground() {
			uni.chooseImage({
				count: 1,
				success: (res) => {
					this.form.backgroundImage = res.tempFilePaths[0];
					this.uploadImage(res.tempFilePaths[0], 'background');
				}
			});
		},
		
		// 上传图片
		uploadImage(filePath, type) {
			// 实现图片上传逻辑
		},
		
		// 显示名字输入框
		showNameInput() {
			uni.navigateTo({
				url: '/pages/common/input?title=名字&value=' + this.form.name
			});
		},
		
		// 显示简介输入框
		showIntroInput() {
			uni.navigateTo({
				url: '/pages/common/input?title=个人简介&value=' + this.form.intro
			});
		},
		
		// 显示性别选择器
		showGenderPicker() {
			// 实现性别选择器
		},
		
		// 显示日期选择器
		showDatePicker() {
			// 实现日期选择器
		},
		
		// 显示地区选择器
		showLocationPicker() {
			// 实现地区选择器
		},
		
		// 显示玩家号输入框
		showPlayerIdInput() {
			uni.navigateTo({
				url: '/pages/common/input?title=玩家号&value=' + this.form.playerId
			});
		},
		
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

.avatar-section {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20rpx 32rpx 52rpx;

	.title {
		font-size: 32rpx;
		color: #333333;
		margin-bottom: 32rpx;
	}

	.avatar-wrapper {
		width: 140rpx;
		height: 140rpx;
		position: relative;
		border-radius: 70rpx;
		overflow: hidden;
		background: #fff;

		.avatar-image {
			width: 100%;
			height: 100%;
			display: block;
		}

		.camera-icon {
			position: absolute;
			right: 0;
			bottom: 0;
			width: 44rpx;
			height: 44rpx;
			background: rgba(0, 0, 0, 0.5);
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 22rpx 0 0 0;
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
		font-size: 32rpx;
		font-weight: 400;
		color: #333333;
	}

	.right {
		display: flex;
		align-items: center;
		
		.value {
			font-size: 32rpx;
			color: #666666;
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
