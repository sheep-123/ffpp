<template>
  <view class="box">
    <u-navbar :fixed="false">
      <view class="nav" slot="left" @click="back">
        <u-icon name="arrow-left" color="black"></u-icon>场地聊天室
      </view>
    </u-navbar>

    <view class="challenge" v-if="challengeStatus" :style="{ top: stickyTop }">
      <view class="top">
        <view class="left"> <text>篮球使者</text> 对你发起篮球1V1挑战</view>
        <view class="right"> 10人已围观 </view>
      </view>
      <view class="mid">
        <view class="item">
          <u-avatar :src="src"></u-avatar>
          篮球使者
        </view>
        <view class="vs">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/vs.png"
            mode="scaleToFill"
            style="width: 50px; height: 50px"
          />
          10:00-12:00篮球2号场
        </view>
        <view class="item">
          <u-avatar :src="src"></u-avatar>
          篮球使者
        </view>
      </view>
      <view class="bottom">
        <view class="accpet" @click="challengeStatus = false"> 接受 </view>
        <view class="close" @click="challengeStatus = false"> 关闭 </view>
      </view>
    </view>

    <view class="first">
      <view class="left">
        <view class="item"> 今日活跃 300 </view>
        <view class="item"> 在线 48 <view class="dian"></view> </view>
      </view>
      <u-icon name="list" size="16"></u-icon>
    </view>
    <view class="second" :style="{ height: upStatus ? '381px' : '102px' }">
      <view class="top">
        <input class="input" placeholder="来聊聊你的想法..." />
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/发表情.png"
          mode="scaleToFill"
          style="width: 30px; height: 30px; display: block"
        />
        <view @click="add">
          <u-icon name="plus-circle" size="35" color="black"></u-icon
        ></view>
      </view>

      <view class="second-content" v-if="upStatus">
        <view class="item" @click="tozudui">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/快速组队.png"
            mode="scaleToFill"
            style="width: 54px; height: 54px"
          />
          快速组队
        </view>
        <view class="item">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/发起挑战.png"
            mode="scaleToFill"
            style="width: 54px; height: 54px"
          />
          发起挑战
        </view>
      </view>
    </view>

    <view class="myTeam">
      <view class="bg">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/我的队伍.png"
          mode="scaleToFill"
          style="width: 16px; height: 16px"
        />
      </view>
      我的队伍
    </view>
    <view class="hdlb" @click="tohuodong">
      <view class="bg">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/活动列表.png"
          mode="scaleToFill"
          style="width: 16px; height: 16px"
        />
      </view>
      活动列表
    </view>
    <scroll-view
      class="content"
      id="main"
      :scroll-top="scrollTop"
      scroll-y
      @click="show = false"
      show-scrollbar
    >
      <view class="main">
        <view class="others">
          <view class="avatar">
            <u-avatar :src="src" size="36" @tap.stop="toggleTooltip"></u-avatar>
            <view class="tooltip" v-show="show">
              <view class="item"> 查看主页 </view>
              <view class="item" @click="tozudui"> 邀请组队 </view>
              <view class="item" @click="tochallenge"> 发起挑战 </view>
            </view>
          </view>

          <view class="right">
            <view class="name">小明</view>
            <view class="text">今天天气不错，一起出去玩吧！</view>
          </view>
        </view>
        <view class="others">
          <view class="avatar">
            <u-avatar :src="src" size="36"></u-avatar>
          </view>
          <view class="right">
            <view class="name">小明</view>
            <view class="content">
              <view class="top">
                <view class="left"> 组队信息 <text>足球</text> </view>
                <view class="right">10分钟前</view>
              </view>
              <u-avatar-group :urls="urls" gap="0.4" size="20"></u-avatar-group>
              <view class="mid"> 集合时间 <text>2022-06-01 18:00</text> </view>
              <view class="mid"> 集合地点 <text>绿茵足球2号场</text> </view>
              <view class="third">
                <view class="left">
                  <view class="item"> 10等1</view>
                  <view class="item"><u-icon name="account"></u-icon>11</view>
                </view>
                <view class="look">查看</view>
              </view>
            </view>
          </view>
        </view>
        <view class="user">
          <view class="right">
            <view class="text">今天天气不错，一起出去玩吧！</view>
          </view>
          <u-avatar :src="src" size="36"></u-avatar>
        </view>
        <view class="user">
          <view class="right">
            <view class="content">
              <view class="top">
                <view class="left"> 组队信息 <text>足球</text> </view>
                <view class="right">10分钟前</view>
              </view>
              <u-avatar-group :urls="urls" gap="0.4" size="20"></u-avatar-group>
              <view class="mid"> 集合时间 <text>2022-06-01 18:00</text> </view>
              <view class="mid"> 集合地点 <text>绿茵足球2号场</text> </view>
              <view class="third">
                <view class="left">
                  <view class="item"> 10等1</view>
                  <view class="item"><u-icon name="account"></u-icon>11</view>
                </view>
                <view class="look">查看</view>
              </view>
            </view>
          </view>
          <u-avatar :src="src" size="36"></u-avatar>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/头像.png",
      urls: [
        "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/头像.png",
        "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/头像.png",
        "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/头像.png",
        "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/头像.png",
        "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/头像.png",
        "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/头像.png",
      ],
      upStatus: false,
      scrollTop: 0,
      show: false,
      challengeStatus: true,
      statusBarHeight: 0,
      navbarHeight: 44,
    };
  },
  onLoad(options) {
    this.scrollToBottom();
    if (options.challengeStatus) {
      this.challengeStatus = true;
    }
    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
  },
  computed: {
    stickyTop() {
      return `${this.statusBarHeight + this.navbarHeight}px`;
    },
  },
  methods: {
    add() {
      if (this.upStatus) {
        this.upStatus = false;
      } else {
        this.upStatus = true;
      }
    },
    tozudui() {
      uni.navigateTo({
        url: "/else/message/team",
      });
    },
    scrollToBottom() {
      uni
        .createSelectorQuery()
        .select("#main")
        .boundingClientRect((rect) => {
          if (rect) {
            this.scrollTop = rect.height; // 更新滚动位置
          }
        })
        .exec();
    },
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },
    toggleTooltip() {
      this.show = !this.show; // 切换工具提示显示状态
    },
    tohuodong() {
      uni.navigateTo({
        url: "/else/message/huodong",
      });
    },
    tochallenge() {
      uni.navigateTo({
        url: "/else/message/challenge",
      });
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  position: relative;
  display: flex;
  flex-direction: column;
  .nav {
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 600;
    font-size: 16px;
    color: #1d2326;
  }
  .first {
    position: sticky;
    top: 0;
    left: 0;
    background-color: #fbfbfb;
    width: 100%;
    height: 34px;
    font-weight: 400;
    font-size: 12px;
    color: #1d2326;
    display: flex;
    align-items: center;
    padding: 0 16px;
    justify-content: space-between;
    box-sizing: border-box;

    .left {
      display: flex;
      align-items: center;
      gap: 14px;
      .item {
        display: flex;
        align-items: center;
        gap: 4px;
        .dian {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #06b66c;
        }
      }
    }
  }
  .second {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    height: 102px;

    z-index: 99;
    .top {
      display: flex;
      padding-top: 16px;
      justify-content: space-around;
      box-sizing: border-box;
      .input {
        width: 70%;
        background-color: #f0f0f0;
        height: 36px;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 0px 12px;
        font-weight: 400;
        font-size: 14px;
        color: rgba(29, 35, 38, 0.6);
      }
    }
    .second-content {
      width: 90%;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      margin-top: 32px;
      .item {
        width: 25%;
        display: flex;
        flex-direction: column;
        gap: 6px;
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.6);
        align-items: center;
        margin-bottom: 12px;
      }
    }
  }
  .challenge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(360deg, #fef8f8 0%, #ffffff 100%);
    overflow: hidden;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border: 1px solid #fff;
    z-index: 999999999;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 90%;
      margin: auto;
      text {
        font-weight: 400;
        font-size: 14px;
        color: #ec384a;
      }
    }
    .mid {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin-top: 20px;
      .item {
        display: flex;
        flex-direction: column;
        gap: 3px;
        align-items: center;
        font-weight: 600;
        font-size: 12px;
        color: #1d2326;
      }
      .vs {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        font-weight: 400;
        font-size: 12px;
        color: #ec384a;
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin: 12px 0;
      .accpet {
        width: 30%;
        height: 32px;
        border-radius: 18px;
        background-color: #ec384a;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        font-size: 14px;
        color: #ffffff;
      }
      .close {
        width: 30%;
        height: 32px;
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #f0f0f0;
        font-weight: 400;
        font-size: 14px;
        color: #1d2326;
      }
    }
  }
  .myTeam {
    position: absolute;
    right: 5px;
    top: 73%;
    z-index: 999;
    .bg {
      width: 28px;
      height: 28px;
      background-color: #d2f0ff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 4px auto;
    }
    font-weight: 400;
    font-size: 10px;
    color: rgba(29, 35, 38, 0.6);
  }
  .hdlb {
    position: absolute;
    right: 5px;
    top: 80%;
    z-index: 999;
    .bg {
      width: 28px;
      height: 28px;
      background-color: #d2f0ff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 4px auto;
    }
    font-weight: 400;
    font-size: 10px;
    color: rgba(29, 35, 38, 0.6);
  }
  .main {
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    flex: 1;
    z-index: 88;
    padding-bottom: 105px;
    box-sizing: border-box;
    .others {
      display: flex;
      gap: 10px;
      margin-top: 16px;
      .avatar {
        position: relative;
        .tooltip {
          position: absolute;
          left: 47px;
          top: 0;
          background-color: #1d2326;
          padding: 0 15px;
          border-radius: 5px;
          .item {
            font-weight: 400;
            font-size: 14px;
            color: #ffffff;
            white-space: nowrap;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            padding: 12px 0;

            &:last-child {
              border-bottom: none;
            }
            &:first-child {
              position: relative;
              &:before {
                content: "";
                position: absolute;
                top: 5px;
                left: -20px;
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
                border-right: 5px solid #1d2326;
              }
            }
          }
        }
      }

      .right {
        width: 65%;
        .name {
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.6);
        }
        .text {
          box-sizing: border-box;
          padding: 10px 12px;
          font-weight: 400;
          font-size: 16px;
          color: #1d2326;
          background-color: #fff;
          margin-top: 4px;
          border-radius: 5px;
        }
        .content {
          box-sizing: border-box;
          padding: 12px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-radius: 5px;
          .top {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .left {
              font-weight: 400;
              font-size: 14px;
              color: #1d2326;
              display: flex;
              align-items: center;
              gap: 5px;
              text {
                border: 1px solid #ec384a;
                width: 28px;
                height: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 10px;
                color: #ec384a;
              }
            }
            .right {
              font-weight: 400;
              font-size: 12px;
              color: rgba(29, 35, 38, 0.3);
              width: auto;
            }
          }
          .mid {
            display: flex;
            align-items: center;
            gap: 3px;
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.6);
            text {
              color: rgba(29, 35, 38, 1);
            }
          }
          .third {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left {
              display: flex;
              align-items: center;
              gap: 12px;
              font-weight: 400;
              font-size: 12px;
              color: #15181a;
              .item {
                display: flex;
                align-items: center;
                gap: 2px;
              }
            }
            .look {
              width: 52px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: black;
              font-weight: 600;
              font-size: 12px;
              color: #ffffff;
              border-radius: 12px;
            }
          }
        }
      }
    }
    .user {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: 16px;

      .right {
        width: 65%;
        .name {
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.6);
        }
        .text {
          box-sizing: border-box;
          padding: 10px 12px;
          font-weight: 400;
          font-size: 16px;
          color: #1d2326;
          background-color: #fff;
          margin-top: 4px;
          border-radius: 5px;
        }
        .content {
          box-sizing: border-box;
          padding: 12px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-radius: 5px;
          .top {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .left {
              font-weight: 400;
              font-size: 14px;
              color: #1d2326;
              display: flex;
              align-items: center;
              gap: 5px;
              text {
                border: 1px solid #ec384a;
                width: 28px;
                height: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 10px;
                color: #ec384a;
              }
            }
            .right {
              font-weight: 400;
              font-size: 12px;
              color: rgba(29, 35, 38, 0.3);
              width: auto;
            }
          }
          .mid {
            display: flex;
            align-items: center;
            gap: 3px;
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.6);
            text {
              color: rgba(29, 35, 38, 1);
            }
          }
          .third {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left {
              display: flex;
              align-items: center;
              gap: 12px;
              font-weight: 400;
              font-size: 12px;
              color: #15181a;
              .item {
                display: flex;
                align-items: center;
                gap: 2px;
              }
            }
            .look {
              width: 52px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: black;
              font-weight: 600;
              font-size: 12px;
              color: #ffffff;
              border-radius: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
