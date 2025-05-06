<template>
    <view class="map-bottom-box">
        <!-- 赛事内容 match -->
        <view class="map-bottom-item" v-if="activeNode == 'match'">
            <MatchItem :doType="2" :item="activeInfo"></MatchItem>
        </view>

        <!-- 活动内容 activity-->
        <view class="map-bottom-item" v-if="activeNode == 'activity'">
            <MatchItem :doType="2" :item="activeInfo"></MatchItem>
        </view>

        <!-- 场地内容 stadium-->
        <view class="map-bottom-item" v-if="activeNode == 'stadium'">
            <view class="stadium-item">
                <div class="left">
                    <image :src="activeInfo.mainImageUrl" />
                </div>
                <div class="right">
                    <div class="stadium-name">
                        Fiteon健身工作室
                    </div>
                    <div class="stadium-time">
                        <text class="good">营业时间</text>
                        <text>周一至周日 08:00-22:00</text>
                    </div>
                    <div class="stadium-address">
                        <u-icon name="map"></u-icon>
                        <text>广东省深圳市南山区深圳大学城</text>
                    </div>
                </div>
            </view>
        </view>

        <!-- 征召内容 invitation-->
        <view class="map-bottom-item" v-if="activeNode == 'invitation'">
            <div class="invitation-item">
                <div class="top">
                    <div class="left">
                        <div class="title">篮球组队信息</div>
                        <div class="time">
                            <u-icon name="clock"></u-icon>
                            <text>集合时间 周日6.12 19:00</text>
                        </div>
                        <div class="address">
                            <u-icon name="map"></u-icon>
                            <text>集合地点 绿茵篮球场3号场</text>
                        </div>
                    </div>
                    <div class="right">
                        <div class="av-box">
                            <div class="av">
                                <image :src="activeInfo.mainImageUrl" mode="" />
                                <div class="icon">
                                    <image :src="activeImg" mode=""></image>
                                </div>
                            </div>
                        </div>
                        <div class="av-bottom"></div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="left">
                        <div class="avatar-box">
                            <div class="avatar-item" :key="index" v-for="(item, index) in activeInfo.recentUsers">
                                <image class="avatar" :src="item.avatarUrl"></image>
                            </div>
                            <view class="add">
                                <u-icon name="plus" color="#ffffff" size="12"></u-icon>
                            </view>
                        </div>
                        <text>5等1</text>

                    </div>
                    <div class="right">
                        <div class="bt">
                            JOIN
                        </div>
                    </div>
                </div>
            </div>
        </view>
    </view>
</template>

<script>
import MatchItem from '@/components/MatchItem.vue';
const active = JSON.parse(JSON.stringify({
    "address": "广东省广州市天河区",
    "color": "#1B4CA7",
    "createTime": "2025-04-30 11:27:58",
    "distance": 3.84,
    "endTime": "2025-06-30 11:24:00",
    "entryFee": 648.00,
    "heat": 0,
    "id": 16,
    "mainImageUrl": "https://testfeifanpaopao.jireplayer.com/download/upload/20250430/tmp_7561ca43e2e817b742eb26c2a592068e.jpg",
    "name": "大胃🫅比赛",
    "recentUsers": [
        {
            "avatarUrl": "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/boy.jpg",
            "userId": 16
        },
        {
            "avatarUrl": "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/boy.jpg",
            "userId": 15
        },
        {
            "avatarUrl": "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/boy.jpg",
            "userId": 15
        },
        {
            "avatarUrl": "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/myavatar.jpg",
            "userId": 17
        }
    ],
    "registerNum": 4,
    "registrationEndTime": "2025-05-31 11:24:00",
    "serialNum": "202504001186",
    "startTime": "2025-05-30 11:24:00"
})
)

export default {
    name: 'MapBottomBox',
    props: {
        activeNode: { type: String, default: '' },
        activeId: { type: String, default: '' },
    },
    components: {
        MatchItem,
    },
    data() {
        return {
            activeInfo: active,
            activeImg: this.$img.home.caption
        }
    },
}
</script>

<style lang="scss">
.stadium-item {
    width: 686rpx;
    height: 258rpx;
    background: #FFFFFF;
    border-radius: 16rpx;
    padding: 28rpx 24rpx;
    box-sizing: border-box;

    display: flex;
    align-items: center;

    .right {
        .stadium-name {
            margin-bottom: 20rpx;
            font-weight: 600;
            font-size: 32rpx;
            color: #333333;
        }

        .stadium-address {
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 24rpx;
            color: rgba(29, 35, 38, 0.6);
        }

        .stadium-time {
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 24rpx;
            color: rgba(29, 35, 38, 0.6);
            margin-bottom: 28rpx;

            .good {
                width: 96rpx;
                height: 40rpx;
                border-radius: 6rpx;
                border: 2rpx solid #F0F0F0;
                margin-right: 12rpx;
                font-weight: 600;
                font-size: 20rpx;
                color: #EC384A;
                display: flex;
                align-items: center;
                justify-content: center;
            }



        }
    }

    .left {
        width: 180rpx;
        height: 180rpx;
        background: #F5F5F5;
        border-radius: 16rpx;
        overflow: hidden;
        margin-right: 28rpx;

        image {
            width: 100%;
            height: 100%;
        }
    }

}

.invitation-item {
    width: 686rpx;
    height: 308rpx;
    background: #FFFFFF;
    border-radius: 16rpx;
    padding: 28rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .top {
        display: flex;
        justify-content: space-between;

        .left {
            .title {
                font-weight: 600;
                font-size: 32rpx;
                color: #333333;
                margin-bottom: 24rpx;
            }

            .time {
                font-weight: 400;
                font-size: 24rpx;
                color: rgba(29, 35, 38, 0.8);
                margin-bottom: 28rpx;
                display: flex;
                align-items: center;

                >text {
                    margin-left: 6rpx;
                }
            }

            .address {
                font-weight: 400;
                font-size: 24rpx;
                color: rgba(29, 35, 38, 0.8);
                margin-bottom: 28rpx;
                display: flex;
                align-items: center;

                >text {
                    margin-left: 6rpx;
                }
            }
        }

        .right {
            display: flex;
            flex-direction: column;
            align-items: center;

            .av-bottom {
                width: 92rpx;
                height: 10rpx;
                background: #D9D9D9;
                border-radius: 40%;
            }

            .av-box {
                margin-bottom: 24rpx;

                .av {
                    width: 100rpx;
                    height: 100rpx;
                    border-radius: 50%;
                    border: 5rpx solid #FFFFFF;
                    position: relative;

                    >image {
                        width: 100rpx;
                        height: 100rpx;
                        border-radius: 50%;
                    }

                    .icon {
                        width: 56rpx;
                        height: 32rpx;
                        position: absolute;
                        right: 0;
                        top: -16rpx;

                        >image {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
    }

    .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
            display: flex;
            align-items: center;

            >text {
                font-weight: 400;
                font-size: 24rpx;
                color: #15181A;
            }

            .avatar-box {
                display: flex;
                align-items: center;
                margin-right: 16rpx;

                .add {
                    width: 40rpx;
                    height: 40rpx;
                    background: #CECECE;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #fff;
                }

                .avatar-item {
                    width: 40rpx;
                    height: 40rpx;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: -2rpx;

                    >image {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

        .right {
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
        }
    }
}
</style>
