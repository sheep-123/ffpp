<template>
  <view class="box">
    <view class="header-bg" :style="{
      'background-image': bgImg,
    }"></view>
    <WNavbar bgColor="rgba(0,0,0,0)">
      <view slot="left">
        <image @click="visible = true" style="width:56rpx;height:56rpx;margin-left: -12rpx"
          src="/static/templateImage/user/usercell.png" class="more" />
      </view>
    </WNavbar>
    <view class="contents"  >
      <view class="main">
        <view class="first">
          <u-avatar :src="userInfo.avatarUrl" size="80"></u-avatar>
          <view class="v">
            <view class="v-top">{{ userInfo.username }}</view>
            <view class="value">
              <view>玩家号：{{ userInfo.id }}</view>
              <!-- <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/qrcode.png" /> -->
            </view>
          </view>
        </view>

        <view class="second">
          <view class="s-left">
            <view class="item">
              <text class="num">{{ userInfo.followCount.value + userInfo.followCount.unit }}</text> <text>关注</text>
            </view>
            <view class="item"> <text class="num">{{ userInfo.fansCount.value + userInfo.fansCount.unit }}</text>粉丝
            </view>
            <view class="item"> <text class="num">{{ userInfo.likeCount.value + userInfo.likeCount.unit }}</text>获赞
            </view>
          </view>

          <view class="bt" @click="$utils.toPath.navigateTo('/user/updateUserInfo')">编辑资料</view>
        </view>

        <view class="third">
          <view class="left">
            <view class="info">
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/ssdj.png" />
              <text>{{ choseLevel.labelRankName }}</text>
            </view>

            <view class="value">{{ userInfo.biography || '还没有填写你的自我介绍呢，点击右上角编辑资料去填写吧～' }} </view>
          </view>
          <image :src="choseLevel.labelRankUrl" mode="scaleToFill" />
        </view>

        <view class="fourth">
          <view class="top">
            <view class="left">
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/小徽章.png"
                mode="scaleToFill" style="width: 16px; height: 16px" />
              <text>徽章</text>
              <view class="prizes">
                <image v-for="(item, index) in rankInfo.accomBadges" :key="index" :src="item.accomBadgeUrl"
                  mode="scaleToFill" style="width: 24px; height: 24px" />

                <!-- <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/huizhang1.png"
                  mode="scaleToFill" style="width: 24px; height: 24px" /> -->
              </view>
            </view>
            <view class="right">
              <text>去获得</text>
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                mode="scaleToFill" style="width: 12px; height: 12px" />
            </view>
          </view>
          <view class="top">
            <view class="left">
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/小奖杯.png"
                mode="scaleToFill" style="width: 16px; height: 16px" />
              <text>奖杯</text>
              <view class="prizes">
                <image v-for="(item, index) in rankInfo.cups" :key="index" :src="item.cupUrl" mode="scaleToFill"
                  style="width: 24px; height: 24px" />
              </view>
            </view>
            <view class="right">
              <text>去获得</text>
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                mode="scaleToFill" style="width: 12px; height: 12px" />
            </view>
          </view>
        </view>


        <!-- 订单等 -->
        <view class="fifth">
          <view class="item" @click="$utils.toPath.navigateTo('/user/my-order')">
            <view class="left">
              <view class="v1">我的订单</view>
              <!-- <view class="v2">新增赛事6个</view> -->
            </view>

            <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/我的订单.png"
              mode="scaleToFill" style="width: 40px; height: 40px" />
          </view>
          <view class="item" @click="$utils.toPath.navigateTo('/user/competition')">
            <view class="left">
              <view class="v1">我的赛事</view>
              <!-- <view class="v2">新增课程2个</view> -->
            </view>

            <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/我的赛事icon.png"
              mode="scaleToFill" style="width: 40px; height: 40px" />
          </view>
          <view class="item" @click="$utils.toPath.navigateTo('/user/sponsorIndex')">
            <view class="left">
              <view class="v1">我的赞助</view>
              <!-- <view class="v2">新增课程2个</view> -->
            </view>

            <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/我的赞助.png"
              mode="scaleToFill" style="width: 40px; height: 40px" />
          </view>
        </view>

        <view class="sixth">
          <u-tabs :list="list" :is-scroll="false"  @change="change" active-color="#1D2326"
            fonst-size="16" inactive-color="#1D2326" :bar-style="barStyle" lineColor="red"></u-tabs>
        </view>
      </view>
      <view class="dt" v-if="newsList.length">
        <view class="item" v-for="(item, index) in newsList" :key="index">
          <image :src="item.fileUrl" mode="widthFix" />
          <view class="value">{{ item.title }}</view>
          <view class="buttom">
            <view class="left">
              <u-avatar :src="item.releaseUserUrl" size="18"></u-avatar>
              <view class="value">{{ item.releaseUserName }}</view>
            </view>
            <view class="right">
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/无火花.png" />
              <view class="value">{{ item.supportNum }}</view>
            </view>
          </view>
        </view>
      </view>
      <view v-else>
        <emptyPage @clickHandle="$utils.toPath.navigateTo('/dynamic/publish/dongtai')" text="您还没有发布动态" btnText="去发布"
          v-if="current == 0" />
        <emptyPage @clickHandle="$utils.toPath.switchTab('/pages/index/index')" text="您还没有收藏动态" btnText="去逛逛"
          v-if="current == 1" />
        <emptyPage @clickHandle="$utils.toPath.switchTab('/pages/index/index')" text="您还没有点赞动态" btnText="去逛逛"
          v-if="current == 2" />
      </view>

    </view>

    <SideBar :visible="visible" @update:visible="visible = $event">
    </SideBar>
    <tabar-view :currentIndex="4"></tabar-view>
  </view>
</template>

<script>
import WNavbar from "@/components/WNavbar/index.vue";
import SideBar from "./components/SideBar.vue";
import emptyPage from '@/components/emptyPage/index.vue'
export default {
  components: {
    WNavbar,
    SideBar,
    emptyPage
  },
  computed: {
   bgImg(){
    if(!this.userInfo.background_image){
      return `linear-gradient( 180deg, rgba(0,0,0,0) 0%, #030303 100%), url(/static/templateImage/user/defaultBack.png)`
    }else{
      return `url(${this.userInfo.background_image})`
    }
   }
  },
  data() {
    return {
      current: 0,
      visible: false,
      list: [
        {
          name: "动态",
        },
        {
          name: "收藏",
        },
        {
          name: "点赞",
        },
      ],
      userInfo: '',
      rankInfo: {
        accomBadges: [], cups: [], labelRanks: []
      },
      newsList: [],
      choseLevel: {
        labelRankName: '暂无赛事等级',
        labelRankUrl: 'https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/empty.png'
      },
    };
  },
  methods: {
    change(e) {
      this.current = e.index;
      console.log(this.current, "当前选中");
    },
    async getMyNews() {
      const res = await this.$requestAll.user.getMyNews();
      this.newsList = res.data;
      console.log(res, "动态");
    },
    async getUserInfo() {
      const userId = uni.getStorageSync("user").id;
      const res = await this.$requestAll.user.getUserInfoById(userId);
      this.userInfo = res.data.userInfo;
      this.rankInfo = res.data.rankInfo;
      this.choseLevel = res.data.rankInfo.labelRanks.find(item => item.wearing == 1);
      console.log(res, "用户信息");
    }
  },
  onShow() {
    if (uni.getStorageSync("token")) {
      this.getUserInfo();
      this.getMyNews();
    } else {
      uni.showModal({
        title: "提示",
        content: "请先登录",
        showCancel: false,
        success: (res) => {
          if (res.confirm) {
            uni.navigateTo({
              url: "/else/user/login",
            });
          }
        },
      });
    }
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  min-height: calc(100vh - 84px);
  display: flex;
  flex-direction: column;
  position: relative;

  .header-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 400rpx;
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
    z-index: 0;
  }
  :deep(.more) {
    width: 32rpx;
    height: 32rpx;
    margin-left: 5%;
  }

  .contents {
    width: 100%;
    flex: 1;
    margin-top: 180rpx;
    background: #ffffff;
    border-radius: 40rpx 40rpx 0 0;
    padding-bottom: 40rpx;
    position: relative;
    z-index: 2;

    .main {
      width: 90%;
      margin: auto;

      .first {
        display: flex;
        gap: 20rpx;
        align-items: center;

        image {
          width: 160rpx;
          height: 160rpx;
          margin-top: -40rpx;
        }

        .v {
          display: flex;
          flex-direction: column;
          gap: 12rpx;

          .v-top {
            font-weight: 600;
            font-size: 36rpx;
            color: #1d2326;
          }

          .value {
            font-weight: 400;
            font-size: 24rpx;
            color: rgba(29, 35, 38, 0.6);
            gap: 6rpx;
            display: flex;
            align-items: center;

            image {
              width: 32rpx;
              height: 32rpx;
              margin-top: 0rpx;
            }
          }
        }
      }

      .second {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .s-left {
          display: flex;
          align-items: center;

          .item:nth-child(1) {
            position: relative;

            &::after {
              content: "";
              position: absolute;
              right: 0;
              top: 55%;
              height: 30%;
              border-right: 2rpx solid #f0f0f0;
              transform: translateY(-50%);
            }
          }

          .item:nth-child(2) {
            position: relative;

            &::after {
              content: "";
              position: absolute;
              right: 0;
              top: 55%;
              height: 30%;
              border-right: 2rpx solid #f0f0f0;
              transform: translateY(-50%);
            }
          }

          .item {
            font-weight: 400;
            font-size: 24rpx;
            color: rgba(29, 35, 38, 0.5);
            padding: 20rpx;

            .num {
              font-weight: 800;
              font-size: 32rpx;
              color: #1d2326;
              margin-right: 12rpx;
            }
          }
        }

        .bt {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rpx 24rpx;
          background-color: #f0f0f0;
          border-radius: 20rpx;
          font-weight: 400;
          font-size: 24rpx;
          color: rgba(29, 35, 38, 0.8);
        }
      }

      .third {
        border: 2rpx solid #f5f5f5;
        border-radius: 20rpx;
        display: flex;
        height: 228rpx;

        .left {
          display: flex;
          flex-direction: column;
          gap: 20rpx;
          width: 60%;
          margin-left: 30rpx;

          .info {
            display: flex;
            align-items: center;
            margin-top: 28rpx;

            image {
              width: 326rpx;
              height: 36rpx;
            }

            text {
              font-weight: 400;
              font-size: 28rpx;
              color: rgba(29, 35, 38, 0.5);
              margin-left: -180rpx;
            }
          }

          .value {
            font-weight: 400;
            font-size: 24rpx;
            color: rgba(29, 35, 38, 0.8);
          }
        }

        image {
          width: 248rpx;
          height: 208rpx;
        }
      }

      .fourth {
        display: flex;
        flex-direction: column;
        gap: 20rpx;
        margin-top: 30rpx;

        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .left {
            display: flex;
            align-items: center;

            text {
              margin-left: 6rpx;
              font-weight: 400;
              font-size: 28rpx;
              color: #1d2326;
            }

            .prizes {
              margin-left: 18rpx;
              display: flex;
              gap: 14rpx;
            }
          }

          .right {
            display: flex;
            align-items: center;

            text {
              font-weight: 400;
              font-size: 24rpx;
              color: rgba(29, 35, 38, 0.5);
            }
          }
        }
      }

      .fifth {
        display: flex;
        gap: 20rpx;
        margin-top: 48rpx;
        overflow-x: scroll;

        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 2rpx solid #f0f0f0;
          box-sizing: border-box;
          padding: 20rpx;
          width: 236rpx;
          height: 104rpx;
          flex-shrink: 0;

          .left {
            .v1 {
              font-weight: 600;
              font-size: 24rpx;
              color: #1d2326;
            }

            .v2 {
              font-weight: 400;
              font-size: 20rpx;
              color: rgba(29, 35, 38, 0.5);
            }
          }
        }
      }

      .sixth {
        width: 366rpx;
        margin-top: 64rpx;
      }
    }

    .dt {
     column-count: 2;
     column-gap: 20rpx;
     // background: #ffffff;
     border-radius: 40rpx;
     padding: 20rpx; // 新增内边距
     // box-shadow: 0px -2px 8px 0px rgba(168, 186, 197, 0.2);
     box-sizing: border-box;

      .item {
        width: 100%;
        break-inside: avoid;
        margin-bottom: 20rpx;

        image {
          width: 100%;
          border-radius: 20rpx;
        }

        .value {
          font-size: 28rpx;
          color: #353738;
          font-weight: 600;
        }

        .buttom {
          display: flex;
          justify-content: space-between;
          margin-top: 14rpx;

          .left {
            display: flex;
            align-items: center;
            gap: 10rpx;

            image {
              width: 36rpx;
              height: 36rpx !important;
            }

            .value {
              font-size: 24rpx;
              font-weight: 400;
              color: #474747;
            }
          }

          .right {
            display: flex;
            align-items: center;
            gap: 4rpx;

            image {
              width: 40rpx;
              height: 40rpx;
            }

            .value {
              font-weight: 400;
              font-size: 24rpx;
              color: #474747;
            }
          }
        }
      }
    }
  }
}
</style>
