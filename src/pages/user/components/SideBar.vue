<template>
    <u-popup mode="left" :show="visible" @close="handleClose" custom-class="sidebar-popup">
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
    </u-popup>
</template>

<style scoped lang="scss">
.cell-item.no-border {
    border-bottom: none !important ;
}
</style>

<script>
export default {
    name: "SideBar",
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            list: [
                {
                    cellList: [
                        {
                            icon: "iconfont icon-shouye",
                            text: "设置",
                            url: "/user/setting",
                        },
                        {
                            icon: "iconfont icon-wode",
                            text: "品牌认证",
                            url: "",
                        },
                        {
                            icon: "iconfont icon-wode",
                            text: "标记场地",
                            url: "",
                        },
                    ],
                },
                {
                    cellList: [
                        {
                            icon: "iconfont icon-shouye",
                            text: "我的小队",
                            url: "",
                        },
                        {
                            icon: "iconfont icon-wode",
                            text: "我的订单",
                            url: "/pages/user/user",
                        },
                        {
                            icon: "iconfont icon-wode",
                            text: "预约记录",
                            url: "",
                        },
                    ],
                },
                {
                    cellList: [
                        {
                            icon: "iconfont icon-shouye",
                            text: "帮助中心",
                            url: "",
                        },
                        {
                            icon: "iconfont icon-wode",
                            text: "意见反馈",
                            url: "",
                        },
                    ],
                },
            ]
        }
    },

    emits: ["update:visible"],
    methods: {
        handleClose() {
            this.$emit("update:visible", false);
        },
    },
};
</script>

<style scoped lang="scss">
.sidebar-content {
    width: 616rpx;
    height: 100vh;
    background-color: #F7F7F7;
    padding: 140rpx 32rpx;
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