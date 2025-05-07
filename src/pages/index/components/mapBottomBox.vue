<template>
    <view class="map-bottom-box" v-if="activeInfo" >
        <!-- 赛事内容 match -->
        <view class="map-bottom-item" v-if="activeNode == 'match'&&activeId">
            <MatchItem :doType="2" :item="activeInfo"></MatchItem>
        </view>

        <!-- 活动内容 activity-->
        <view class="map-bottom-item" v-if="activeNode == 'activity'&&activeId">
            <MatchItem :doType="2" :item="activeInfo"></MatchItem>
        </view>

        <!-- 场地内容 stadium-->
        <view class="map-bottom-item" v-if="activeNode == 'stadium'&&activeId">
            <view class="stadium-item">
                <div class="left">
                    <image :src="activeInfo.mainImageUrl" />
                </div>
                <div class="right">
                    <div class="stadium-name">
                        {{activeInfo.name}}
                    </div>
                    <div class="stadium-time" >
                        <text class="good" >营业时间</text>
                        <text>周一至周日 08:00-22:00</text>
                    </div>
                    <div class="stadium-address">
                        <u-icon name="map"></u-icon>
                        <text class="u-line-1"> {{ activeInfo.distance }}km | {{ activeInfo.address }}</text>
                    </div>
                </div>
            </view>
        </view>

        <!-- 征召内容 invitation-->
        <view class="map-bottom-item" v-if="activeNode == 'invitation'&&activeId">
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
const app = getApp();

import MatchItem from '@/components/MatchItem.vue';

export default {
    name: 'MapBottomBox',
    props: {
        activeNode: { type: String, default: '' },
        activeId: { type: String, default: '' },
    },
    components: {
        MatchItem,
    },
    watch: {
        activeId(newVal) {
            if(this.activeNode == 'invitation' && newVal) {
                console.log('invitation', newVal)
            } else if (this.activeNode == 'activity' && newVal) {
                console.log('activity', newVal)

                
            } else if (this.activeNode == 'match' && newVal) {
                this.activeInfo = ''
                this.getMatchInfo()
                console.log('match', newVal)

            } else if (this.activeNode == 'stadium' && newVal) {
                this.activeInfo = ''
                this.getCdDetail()
                console.log('stadium', newVal)

            }
        },
    },
    data() {
        return {
			globalData: app.globalData,
            activeInfo: '',
            activeImg: this.$img.home.caption
        }
    },
    methods: {
        // 获取场地详情
        async getCdDetail() {
            const res = await this.$requestAll.home.getCdDetail({
                cdId: this.activeId,
                lat : this.globalData.location.latitude,
                lng : this.globalData.location.longitude,
            });
            this.activeInfo = res.data
        },
        async getMatchInfo() {
            const res = await this.$requestAll.home.getMatchDetail({
                matchId: this.activeId,
                lat : this.globalData.location.latitude,
                lng : this.globalData.location.longitude,
            });
            this.activeInfo = res.data[0]
        },
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
            // align-items: center;
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
