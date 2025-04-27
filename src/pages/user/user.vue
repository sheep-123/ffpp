<template>
  <view class="box">
    <u-navbar bgColor="rgba(0,0,0,0)">
      <view slot="left">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/更多-白色.png"
          class="more"
        />
      </view>
    </u-navbar>
    <view class="content">
      <view class="main">
        <view class="first">
          <u-avatar :src="src" size="80"></u-avatar>
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

          <view class="bt">编辑资料</view>
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
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/huizhang1.png"
                  mode="scaleToFill"
                  style="width: 24px; height: 24px"
                />
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/huizhang1.png"
                  mode="scaleToFill"
                  style="width: 24px; height: 24px"
                />
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/huizhang1.png"
                  mode="scaleToFill"
                  style="width: 24px; height: 24px"
                />
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
          <view class="item">
            <view class="left">
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
        <view class="item">
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
        <view class="item">
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
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/火花.png"
              />
              <view class="value">1000</view>
            </view>
          </view>
        </view>
        <view class="item">
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
        <view class="item">
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
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/火花.png"
              />
              <view class="value">1000</view>
            </view>
          </view>
        </view>
        <view class="item">
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
        <view class="item">
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
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/火花.png"
              />
              <view class="value">1000</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <u-toast ref="notice"></u-toast>
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
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
    uni.showTabBar();
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url("https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/05.jpg")
    no-repeat;

  .more {
    width: 16px;
    height: 16px;
    margin-left: 5%;
  }

  .content {
    width: 100%;
    height: auto;
    position: absolute;
    background: #ffffff;
    border-radius: 20px;
    top: 20%;
    left: 0%;

    .main {
      width: 90%;
      margin: auto;
      .first {
        display: flex;
        gap: 10px;
        align-items: center;
        image {
          width: 80px;
          height: 80px;
          margin-top: -20px;
        }
        .v {
          display: flex;
          flex-direction: column;
          gap: 6px;
          .v-top {
            font-weight: 600;
            font-size: 18px;
            color: #1d2326;
          }
          .value {
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.6);
            gap: 3px;
            display: flex;
            align-items: center;
            image {
              width: 16px;
              height: 16px;
              margin-top: 0px;
            }
          }
        }
      }

      .second {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .s-left {
          // gap: 20px;
          display: flex;
          align-items: center;
          .item:nth-child(1) {
            position: relative;
            &::after {
              content: "";
              position: absolute;
              right: 0;
              top: 55%; // 控制边框起始位置
              height: 30%; // 限制边框长度为父元素的60%
              border-right: 1px solid #f0f0f0;
              transform: translateY(-50%);
            }
          }
          .item:nth-child(2) {
            position: relative;
            &::after {
              content: "";
              position: absolute;
              right: 0;
              top: 55%; // 控制边框起始位置
              height: 30%; // 限制边框长度为父元素的60%
              border-right: 1px solid #f0f0f0;
              transform: translateY(-50%);
            }
          }
          .item {
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.5);
            padding: 10px;
            .num {
              font-weight: 800;
              font-size: 16px;
              color: #1d2326;
              margin-right: 6px;
            }
          }
        }
        .bt {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px 12px;
          background-color: #f0f0f0;
          border-radius: 10px;
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.8);
        }
      }

      .third {
        border: 1px solid #f5f5f5;
        border-radius: 10px;
        display: flex;
        height: 114px;

        .left {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 60%;
          margin-left: 15px;
          .info {
            display: flex;
            align-items: center;
            margin-top: 14px;
            image {
              width: 163px;
              height: 18px;
            }
            text {
              font-weight: 400;
              font-size: 14px;
              color: rgba(29, 35, 38, 0.5);
              margin-left: -90px;
            }
          }
          .value {
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.8);
          }
        }
        image {
          width: 124px;
          height: 104px;
        }
      }

      .fourth {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 15px;
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .left {
            display: flex;
            align-items: center;
            text {
              margin-left: 3px;
              font-weight: 400;
              font-size: 14px;
              color: #1d2326;
            }
            .prizes {
              margin-left: 9px;
              display: flex;
              gap: 7px;
            }
          }
          .right {
            display: flex;
            align-items: center;
            text {
              font-weight: 400;
              font-size: 12px;
              color: rgba(29, 35, 38, 0.5);
            }
          }
        }
      }

      .fifth {
        display: flex;
        gap: 10px;
        margin-top: 24px;
        overflow-x: scroll;
        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #f0f0f0;
          box-sizing: border-box;
          padding: 10px;
          width: 118px;
          height: 52px;
          flex-shrink: 0;
          .left {
            .v1 {
              font-weight: 600;
              font-size: 12px;
              color: #1d2326;
            }
            .v2 {
              font-weight: 400;
              font-size: 10px;
              color: rgba(29, 35, 38, 0.5);
            }
          }
        }
      }

      .sixth {
        width: 183px;
        margin-top: 32px;
      }
    }
    .dt {
      column-count: 2;
      column-gap: 10px;
      background: #fafafa;
      border-radius: 20px;
      padding: 10px;
      .item {
        width: 100%;
        break-inside: avoid; /* 防止元素被分割到不同列 */
        margin-bottom: 10px;
        image {
          width: 100%;
          border-radius: 10px;
        }
        .value {
          font-size: 14px;
          color: #353738;
          font-weight: 600;
        }
        .buttom {
          display: flex;
          justify-content: space-between;
          margin-top: 7px;
          .left {
            display: flex;
            align-items: center;
            gap: 5px;
            image {
              width: 18px;
              height: 18px !important;
            }
            .value {
              font-size: 12px;
              font-weight: 400;
              color: #474747;
            }
          }
          .right {
            display: flex;
            align-items: center;
            gap: 2px;
            image {
              width: 20px;
              height: 20px;
            }
            .value {
              font-weight: 400;
              font-size: 12px;
              color: #474747;
            }
          }
        }
      }
    }
  }
}
</style>
