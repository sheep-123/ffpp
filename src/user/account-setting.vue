<template>
	<view>
		<Navbar title="账户与安全" />
		<div class="sidebar-content">
            <div class="cell-box">
                <div 
                    class="cell-item flex-jb" 
                    v-for="(item, index) in list" 
                    :key="index"
                    :class="{ 'no-border': index === list.length - 1 }"
                    @click="item.url ? $utils.toPath.navigateTo(item.url) : ''"
                >
                    <div class="left">
                        <text>{{ item.text }}</text>
                    </div>
                    <div class="right">
                        <text class="value">{{ item.value }}</text>
                        <u-icon name="arrow-right"></u-icon>
                    </div>
                </div>
            </div>
        </div>
		<!-- 注销账号按钮 -->
		<div class="logout-box" @click="deleteAccount">
			<view class="logout-button">注销账号</view>
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
			list: [
                {
                    text: "手机号",
                    value: "未绑定",
                    url: "",
                },
                {
                    text: "登录密码",
                    value: "未设置",
                    url: "",
                },
                {
                    text: "实名认证",
                    value: "未认证",
                    url: "",
                },
                {
                    text: "微信账号",
                    value: "yymore",
                    url: "",
                }
            ]
		};
	},
	methods: {
		deleteAccount() {
			// 处理注销账号逻辑
			uni.showModal({
				title: '提示',
				content: '确定要注销账号吗？',
				success: function (res) {
					if (res.confirm) {
						// 这里添加注销账号的具体逻辑
						console.log('用户点击确定');
					}
				}
			});
		}
	}
}
</script>

<style  lang="scss">
page{
	height: 100%;
    background-color: #F7F7F7;
}

.cell-item.no-border {
    border-bottom: none !important;
}

.sidebar-content {
    padding: 32rpx 0;
    box-sizing: border-box;

    .cell-box {
        background: #FFFFFF;
        border-radius: 24rpx;
        padding: 0 32rpx;

        .cell-item {
            padding: 32rpx 0;
            border-bottom: 1px solid #E5E5E5;
            font-size: 28rpx;
            color: #333333;
            line-height: 1.5;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left {
                display: flex;
                align-items: center;
            }

            .right {
                display: flex;
                align-items: center;
                
                .value {
                    color: #666666;
                    margin-right: 16rpx;
                    font-size: 28rpx;
                }

                .u-icon {
                    font-size: 32rpx;
                    color: #999999;
                }
            }
        }
    }
}

.logout-box {
	padding: 0 32rpx;
	margin-top: 32rpx;
	
	.logout-button {
		width: 686rpx;
		height: 96rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		color: #E02020;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
	}
}
</style>
