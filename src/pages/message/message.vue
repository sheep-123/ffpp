<template>
  <view class="box">
    <u-navbar :fixed="false">
      <view class="m-top" slot="left">
        <view class="left">
          <view
            @click="active = 1"
            :class="active == 1 ? 'item-active' : 'item'"
            >聊天 <view class="dian1"></view
          ></view>
          <view
            @click="active = 2"
            :class="active == 2 ? 'item-active' : 'item'"
            >互动 <view class="dian1"></view
          ></view>
        </view>
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/message.png"
          mode="scaleToFill"
          style="width: 28px; height: 28px; margin-right: 16px"
        />
      </view>
    </u-navbar>

    <view class="main">
      <view class="message" v-if="active == 2">
        <u-icon name="chat" size="16"></u-icon>
        全部消息
        <view class="biao"></view>
      </view>
      <view class="search" @click="toSearch" v-if="active == 1">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/搜索.png"
          mode="scaleToFill"
          style="width: 24px; height: 24px"
        />
        搜索好友、群聊、等聊天记录
      </view>

      <view class="type" v-if="active == 1">
        <view class="player">玩家</view>
        <view class="item">小队</view>
        <view class="item">场地</view>
      </view>

      <view class="list">
        <view class="item" @click="toChat" v-if="active == 1">
          <view class="avatar">
            <u-avatar :src="src" size="48"></u-avatar>
            <view class="dian"></view>
          </view>

          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="move" v-if="active == 2">
          <view class="avatar">
            <u-avatar :src="src" size="48"></u-avatar>
          </view>

          <view class="right">
            <view class="r1">
              <view class="name">奶瓶打不开</view>
              <view class="value">赞了你的动态 10/13 12:00</view>
            </view>
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
              mode="aspectFill"
              style="width: 44px; height: 44px"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      active: 1, //1为聊天，2为互动
    };
  },
  methods: {
    toChat() {
      uni.navigateTo({
        url: "/else/message/chat",
      });
    },
    toSearch() {
      uni.navigateTo({
        url: "/else/message/search",
      });
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  padding-bottom: 100px;
  .m-top {
    margin-left: 5%;
    display: flex;
    justify-content: space-between;
    width: 280px;
    .left {
      display: flex;
      gap: 27px;
      .item {
        font-weight: 600;
        font-size: 20px;
        color: rgba(29, 35, 38, 0.3);
        position: relative;
        .dian1 {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #ec383c;
          position: absolute;
          top: 0;
          right: -3px;
        }
      }
      .item-active {
        font-weight: 600;
        font-size: 20px;
        color: black;
        position: relative;
        .dian1 {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #ec383c;
          position: absolute;
          top: 0;
          right: -3px;
        }
      }
    }
  }
  .main {
    width: 90%;
    height: 100%;
    margin: auto;
    .message {
      display: flex;
      align-items: center;
      gap: 5px;
      width: 105px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 22px;
      border: 1px solid #f0f0f0;
      box-sizing: border-box;
      font-weight: 600;
      font-size: 12px;
      color: #1d2326;
      margin-top: 25px;
      .biao {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid black;
      }
    }

    .search {
      margin-top: 10px;
      height: 36px;
      border-radius: 18px;
      background-color: #f7f7f7;
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 400;
      font-size: 14px;
      color: rgba(29, 35, 38, 0.5);
      padding-left: 12px;
    }
    .type {
      margin-top: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      .player {
        background: url("https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/group.png")
          no-repeat center;
        width: 70px;
        height: 36px;
        font-weight: 600;
        font-size: 14px;
        color: #ffffff;
        text-align: center;
        line-height: 31px;
        padding-left: 3px;
      }
      .item {
        width: 76px;
        height: 30px;
        border-radius: 15px;
        border: 1px solid #f0f0f0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 14px;
        color: rgba(29, 35, 38, 0.3);
      }
    }

    .list {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      gap: 18px;
      padding-bottom: 60px;
      .item {
        display: flex;
        align-items: center;
        gap: 10px;
        .avatar {
          position: relative;
          .dian {
            position: absolute;
            top: 0;
            right: 0;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #ec383c;
          }
        }
        image {
          width: 48px;
          height: 48px;
        }
        .right {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;

          .top-value {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .name {
              font-weight: 400;
              font-size: 16px;
              color: #1d2326;
            }
            .time {
              font-weight: 400;
              font-size: 12px;
              color: rgba(29, 35, 38, 0.5);
            }
          }

          .value {
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.5);
          }
        }
      }
      .move {
        display: flex;
        align-items: center;
        gap: 10px;
        .avatar {
          position: relative;
          .dian {
            position: absolute;
            top: 0;
            right: 0;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #ec383c;
          }
        }

        .right {
          gap: 6px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .r1 {
            display: flex;
            flex-direction: column;
            gap: 5px;
            .name {
              font-weight: 400;
              font-size: 16px;
              color: #1d2326;
            }
            .value {
              font-weight: 400;
              font-size: 12px;
              color: rgba(29, 35, 38, 0.5);
            }
          }
        }
      }
    }
  }
}
</style>
