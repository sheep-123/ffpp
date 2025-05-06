<template>
	<div class="list-item">
		<div class="item-top">
			<view class="img-box">
				<image :src="item.mainImageUrl" mode=""></image>
			</view>
			<view class="info-box">
				<view class="title u-line-2">
					{{ item.name }}
				</view>
				<view class="time">
					<u-icon name="clock"></u-icon>
					<text>{{ formatTimeRange(item.startTime, item.endTime) }}</text>
				</view>
				<view class="address">
					<u-icon name="map"></u-icon>
					<text>{{ item.distance }}km｜ {{ item.address }}</text>
				</view>
			</view>
		</div>
		<view class="item-bottom">
			<div class="num">
				<text>{{ item.registerNum }}</text>人已报名
			</div>
			<div class="status">
				<div class="dot"></div>
				<text>{{ checkSignupStatus(item.registrationEndTime).text }}</text>
			</div>
			<div class="btn" v-if="doType == '1'" @click="choseMatchHandle(item)">
				关联
			</div>
			<view class="bt" v-if="doType == '2'" @click="join(item)">JOIN</view>

		</view>
	</div>
</template>

<script>
export default {
	name: "MatchItem",
	props: {
		item: {
			type: Object,
			default: () => ({})
		},
		doType: {
			type: Number,
			default: 1,// 1:关联赛事;2:加入赛事
		}
	},
	data() {
		return {

		};
	},
	methods: {
		choseMatchHandle(item) {
			this.$emit('choseMatch', item)
		},
		checkSignupStatus(deadlineStr) {
			// 解析时间字符串为本地时间对象
			const parseDateTime = (str) => {
				const [datePart, timePart] = str.split(' ');
				const [year, month, day] = datePart.split('-').map(Number);
				const [hour, minute] = timePart.split(':').map(Number);
				return new Date(year, month - 1, day, hour, minute);
			};

			// 格式化时间为 HH:mm（自动补零）
			const formatTime = (date) => {
				return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
			};

			// 计算基于自然日的天数差（今天/明天/后天）
			const getDayDiff = (targetDate) => {
				const now = new Date();
				const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
				const targetDay = new Date(
					targetDate.getFullYear(),
					targetDate.getMonth(),
					targetDate.getDate()
				);
				return Math.round((targetDay - today) / (1000 * 60 * 60 * 24));
			};

			try {
				const deadline = parseDateTime(deadlineStr);
				const now = new Date();

				// 已过截止时间
				if (now >= deadline) {
					return {
						status: false,
						text: "报名已结束"
					};
				}

				// 计算时间差
				const dayDiff = getDayDiff(deadline);
				const timeStr = formatTime(deadline);

				// 生成提示文本
				let dayText = "";
				if (dayDiff === 0) dayText = "今天";
				else if (dayDiff === 1) dayText = "明天";
				else if (dayDiff === 2) dayText = "后天";
				else dayText = `${dayDiff}天后`;

				return {
					status: true,
					text: `${dayText} ${timeStr}结束报名`
				};
			} catch (e) {
				console.error("时间格式错误，请使用 YYYY-MM-DD HH:mm:ss 格式");
				return {
					status: false,
					text: "时间格式错误"
				};
			}
		},
		formatTimeRange(starttime, endtime) {
			// 解析时间字符串为日期对象（兼容本地时区）
			const parseDate = (datetimeStr) => {
				const [datePart, timePart] = datetimeStr.split(' ');
				const [year, month, day] = datePart.split('-').map(Number);
				const [hour, minute] = timePart.split(':').map(Number);
				return new Date(year, month - 1, day, hour, minute);
			};

			const startDate = parseDate(starttime);
			const endDate = parseDate(endtime);

			// 中文星期映射
			const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
			const weekday = weekdays[startDate.getDay()];

			// 格式化月.日（自动去除前导零）
			const month = startDate.getMonth() + 1;
			const day = startDate.getDate();
			const monthDay = `${month}.${day}`;

			// 格式化时间部分（保持两位数）
			const formatTime = (date) =>
				`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

			return `${weekday}${monthDay} ${formatTime(startDate)}-${formatTime(endDate)}`;
		},

	}
}
</script>

<style lang="scss">
.list-item {
	width: 686rpx;
	height: 308rpx;
	background: #FFFFFF;
	border-radius: 8rpx;
	margin-bottom: 24rpx;
	padding: 24rpx;
	box-sizing: border-box;

	.item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 74rpx;

		.btn {
			width: 128rpx;
			height: 56rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 400;
			font-size: 28rpx;
			color: #1D2326;
			border: 2rpx solid #F0F0F0;
			border-radius: 28rpx;
		}

		.bt {
			width: 150rpx;
			height: 56rpx;
			border-radius: 40rpx;
			border: 2rpx solid #dbdbdb;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 400;
			font-size: 32rpx;
			color: #1d2326;
			font-family: youshe;
		}

		.num {
			font-weight: 400;
			font-size: 24rpx;
			color: rgba(29, 35, 38, 0.5);

			// margin-right: 80rpx;
			>text {
				color: #1D2326;
			}
		}

		.status {
			display: flex;
			align-items: center;
			font-weight: 400;
			font-size: 20rpx;
			color: rgba(29, 35, 38, 0.5);

			// margin-right: 108rpx;
			.dot {
				width: 16rpx;
				height: 16rpx;
				background: #CCCCCC;
				border-radius: 50%;
				margin-right: 10rpx;

			}
		}
	}

	.item-top {
		display: flex;

		.img-box {
			width: 180rpx;
			height: 210rpx;
			border-radius: 4rpx;
			overflow: hidden;
			margin-right: 28rpx;

			>image {
				width: 100%;
				height: 100%;
			}
		}

		.info-box {
			.title {
				font-weight: 600;
				font-size: 28rpx;
				color: #333333;
				margin-bottom: 24rpx;
			}

			.time {
				font-weight: 400;
				font-size: 24rpx;
				color: rgba(29, 35, 38, 0.8);
				width: 430rpx;
				height: 52rpx;
				background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #F5FAF8 100%);
				border-radius: 60rpx 60rpx 60rpx 60rpx;
				display: flex;
				align-items: center;
				margin-bottom: 24rpx;

				>text {
					margin-left: 8rpx;
				}
			}

			.address {
				font-weight: 400;
				font-size: 24rpx;
				color: rgba(29, 35, 38, 0.8);
				display: flex;
				align-items: center;

				>text {
					margin-left: 8rpx;
				}
			}
		}
	}

	.item-bottom {}
}
</style>