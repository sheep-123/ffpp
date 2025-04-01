<template>
  <view class="box">
    <u-navbar>
      <view class="m-top" slot="left">
        <view class="left">
          <view class="item-active">聊天</view>
          <view class="item">互动</view>
        </view>
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/message.png"
          mode="scaleToFill"
          style="width: 28px; height: 28px; margin-right: 16px"
        />
      </view>
    </u-navbar>

    <view class="main" :style="{ marginTop: stickyTop }">
      <view class="search">
        <u-search
          placeholder="搜索好友、群聊、等聊天记录"
          v-model="keyword"
          :show-action="false"
          :clearabled="true"
        ></u-search>
      </view>

      <view class="type">
        <view class="player">玩家</view>
        <view class="item">小队</view>
        <view class="item">场地</view>
      </view>

      <view class="list">
        <view class="item">
          <u-avatar :src="src" size="48"></u-avatar>
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src" size="48"></u-avatar>
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src" size="48"></u-avatar>
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src" size="48"></u-avatar>
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src" size="48"></u-avatar>
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src" size="48"></u-avatar>
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src" size="48"></u-avatar>
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src" size="48"></u-avatar>
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src" size="48"></u-avatar>
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src" size="48"></u-avatar>
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src" size="48"></u-avatar>
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src" size="48"></u-avatar>
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src" size="48"></u-avatar>
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src" size="48"></u-avatar>
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
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
      statusBarHeight: 0,
      navbarHeight: 44,
    };
  },
  onShow() {
    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
  },
  computed: {
    stickyTop() {
      return `${this.statusBarHeight + this.navbarHeight}px`;
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;
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
      }
      .item-active {
        font-weight: 600;
        font-size: 20px;
        color: black;
      }
    }
  }
  .main {
    width: 90%;
    height: 100%;
    margin: auto;

    .search {
      margin-top: 10px;
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
    }
  }
}
</style>
