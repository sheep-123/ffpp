<template>
	<view>
		<Navbar title="设置" />
		<div class="sidebar-content">
            <div class="cell-box" v-for="(item, index) in list" :key="index">
                <div 
                    class="cell-item flex-jb" 
                    v-for="(cell, current) in item.cellList" 
                    :key="current" 
                    :class="{ 'no-border': current === item.cellList.length - 1 }"
                    @click="cell.url ? $utils.toPath.navigateTo(cell.url) : ''"
                >
                    <div class="left">
                        <div class="icon">
                            <u-icon name="setting"></u-icon>
                        </div>
                        <text>{{ cell.text }}</text>
                    </div>
                    <div class="right">
                        <u-icon name="arrow-right"></u-icon>
                    </div>
                </div>
            </div>
        </div>
		<!-- 退出登录按钮 白色背景 左右间距32 	#1D2326 字体颜色居中 -->
		<div class="logout-box" @click="logout">
			<view class="logout-button">退出登录</view>
		</div>
	</view>
</template> 

<script>
import 	Navbar from "@/components/WNavbar/index.vue";
export default {
	components: {
		Navbar
	},
	data() {
		return {
			list: [
                {
                    cellList: [
                        {
                            icon: "iconfont icon-shouye",
                            text: "账号与安全",
                            url: "/user/account-setting",
                        },
                        {
                            icon: "iconfont icon-wode",
                            text: "用户协议",
                            url: "",
                        },
                        {
                            icon: "iconfont icon-wode",
                            text: "隐私政策",
                            url: "",
                        },
						{
                            icon: "iconfont icon-wode",
                            text: "关于我们",
                            url: "",
                        },
                    ],
                },
                {
                    cellList: [
                        {
                            icon: "iconfont icon-shouye",
                            text: "徽章展示",
                            url: "",
                        },
                        {
                            icon: "iconfont icon-wode",
                            text: "奖杯展示",
                            url: "/pages/user/user",
                        },
                        {
                            icon: "iconfont icon-wode",
                            text: "运动等级",
                            url: "",
                        },
                    ],
                },
            ]
		};
	}
}
</script>
<style scoped lang="scss">
.cell-item.no-border {
    border-bottom: none !important ;
}
</style>
<style lang="scss">
page{
	height: 100%;
	background-color: #F7F7F7;
}

.logout-box{
	padding: 0 32rpx;
	.logout-button{
		width: 686rpx;
height: 96rpx;
background: #FFFFFF;
border-radius: 16rpx 16rpx 16rpx 16rpx;
color: #1D2326 ;
display: flex;
align-items: center;
justify-content: center;
font-size: 32rpx;
	}
}
.sidebar-content {
    background-color: #F7F7F7;
    padding: 32rpx 0;
    box-sizing: border-box;

    .cell-box {
        background: #FFFFFF;
        border-radius: 24rpx;
        padding: 0 32rpx;
        margin-bottom: 32rpx;



        .cell-item {
            padding: 32rpx 0;
            border-bottom: 1px solid #E5E5E5;
            font-size: 28rpx;
            color: #333333;
            line-height: 1.5;
            .left {
                display: flex;
                align-items: center;
                .icon {
                    margin-right: 16rpx;
                    font-size: 32rpx;
                    color: #333333;
                }
            }
            .right {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 32rpx;
                height: 32rpx;
                font-size: 32rpx;
                color: #333333;
            }
        }
    }
}
</style>
