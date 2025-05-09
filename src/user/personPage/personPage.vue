<template>
  <view class="box">
    <WNavbar bgColor="rgba(0,0,0,0)"> 
      <view slot="left">
        <image
        @click="visible = true"
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/更多-白色.png"
          class="more"
        />
      </view>
    </WNavbar>


    <view class="content">
      <view class="main">
        <view class="first">
          <u-avatar :src="avatar" size="80"></u-avatar>
          <view class="v">
            <view class="v-top">半场好球先生</view>
            <view class="value">
              <view>玩家号：26734412</view>
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/qrcode.png"
              />
            </view>
          </view>
        </view>

        <view class="second">
          <view class="s-left">
            <view class="item">
              <text class="num">25</text> <text>关注</text>
            </view>
            <view class="item"> <text class="num">300</text>粉丝 </view>
            <view class="item"> <text class="num">1.7w</text>获赞 </view>
          </view>

          <view class="bt" @click="$utils.toPath.navigateTo('/user/updateUserInfo')" >编辑资料</view>
        </view>

        <view class="third">
          <view class="left">
            <view class="info">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/ssdj.png"
              />
              <text>暂无赛事等级</text>
            </view>

            <view class="value"
              >还没有填写你的自我介绍呢，点击右上角编辑资料去填写吧～</view
            >
          </view>
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/empty.png"
            mode="scaleToFill"
          />
        </view>
 
        <view class="fourth">
          <view class="top">
            <view class="left">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/小徽章.png"
                mode="scaleToFill"
                style="width: 16px; height: 16px"
              />
              <text>徽章</text>
              <view class="prizes">
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/huizhang1.png"
                  mode="scaleToFill"
                  style="width: 24px; height: 24px"
                />
              </view>
            </view>
            <view class="right">
              <text>去获得</text>
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                mode="scaleToFill"
                style="width: 12px; height: 12px"
              />
            </view>
          </view>
          <view class="top">
            <view class="left">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/小奖杯.png"
                mode="scaleToFill"
                style="width: 16px; height: 16px"
              />
              <text>奖杯</text>
              <view class="prizes"> </view>
            </view>
            <view class="right">
              <text>去获得</text>
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/right.png"
                mode="scaleToFill"
                style="width: 12px; height: 12px"
              />
            </view>
          </view>
        </view>

        <view class="fifth">
          <view class="item" @click="$utils.toPath.navigateTo('/user/my-order')" >
            <view class="left"   >
              <view class="v1">我的订单</view>
              <view class="v2">新增赛事6个</view>
            </view>

            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/我的订单.png"
              mode="scaleToFill"
              style="width: 40px; height: 40px"
            />
          </view>
          <view class="item" @click="toMyCompetition">
            <view class="left">
              <view class="v1">我的赛事</view>
              <view class="v2">新增课程2个</view>
            </view>

            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/我的赛事icon.png"
              mode="scaleToFill"
              style="width: 40px; height: 40px"
            />
          </view>
          <view class="item" @click="toMySponsor">
            <view class="left">
              <view class="v1">我的赞助</view>
              <view class="v2">新增课程2个</view>
            </view>

            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/我的赞助.png"
              mode="scaleToFill"
              style="width: 40px; height: 40px"
            />
          </view>
        </view>

        <view class="sixth">
          <u-tabs
            :list="list"
            :is-scroll="false"
            v-model="current"
            @change="change"
            active-color="#1D2326"
            fonst-size="16"
            inactive-color="#1D2326"
            :bar-style="barStyle"
            lineColor="red"
          ></u-tabs
        ></view>
      </view>
      <view class="dt">
        <view class="item"  v-for="(item,index) in 20" :key="index" >
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            mode="widthFix"
          />
          <view class="value">环境非常优美在40楼 打卡全广州最高的健身房</view>
          <view class="buttom">
            <view class="left">
              <u-avatar :src="src" size="18"></u-avatar>
              <view class="value">滑板高手</view>
            </view>
            <view class="right">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/无火花.png"
              />
              <view class="value">1000</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import WNavbar from "@/components/WNavbar/index.vue";

export default {
  components: {
    WNavbar,
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
          name: "赛事",
        },
        // {
        //   name: "点赞",
        // },
      ],
      avatar: uni.getStorageSync("user").avatarUrl || "",
    };
  },
  methods: {
    toMyCompetition() {
      uni.navigateTo({
        url: "/user/competition",
      });
    },
    toMySponsor() {
      uni.navigateTo({
        url: "/user/sponsorIndex",
      });
    },
  },
  onShow() {
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  height: calc(100vh - 84px);
  position: relative;
  background: url("https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/05.jpg")
    no-repeat;

  .more {
    width: 32rpx;
    height: 32rpx;
    margin-left: 5%;
  }

  .content {
    width: 100%;
    height: auto;
    position: absolute;
    background: #ffffff;
    border-radius: 40rpx;
    top: 20%;
    left: 0%;

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
      background: #fafafa;
      border-radius: 40rpx;
      padding: 20rpx;
	  padding-bottom:84px ;
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
