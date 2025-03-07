<template>
  <view class="box">
    <view class="main">
      <view class="top">
        <view class="left">
          <view class="item">聊天</view>
          <view class="item">互动</view>
        </view>
        <view class="right"></view>
      </view>

      <view class="search">
        <u-search
          placeholder="搜索好友、群聊、等聊天记录"
          v-model="keyword"
        ></u-search>
      </view>

      <view class="type">
        <view class="item">玩家</view>
        <view class="item">小队</view>
      </view>

      <view class="list">
        <view class="item">
          <!-- <u-avatar src="../../static/images/avatar.png" size="96"></u-avatar> -->
          <image src="/static/images/avatar.png" />
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <!-- <u-avatar src="../../static/images/avatar.png" size="96"></u-avatar> -->
          <image src="/static/images/avatar.png" />
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <!-- <u-avatar src="../../static/images/avatar.png" size="96"></u-avatar> -->
          <image src="/static/images/avatar.png" />
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <!-- <u-avatar src="../../static/images/avatar.png" size="96"></u-avatar> -->
          <image src="/static/images/avatar.png" />
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <!-- <u-avatar src="../../static/images/avatar.png" size="96"></u-avatar> -->
          <image src="/static/images/avatar.png" />
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <!-- <u-avatar src="../../static/images/avatar.png" size="96"></u-avatar> -->
          <image src="/static/images/avatar.png" />
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <!-- <u-avatar src="../../static/images/avatar.png" size="96"></u-avatar> -->
          <image src="/static/images/avatar.png" />
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <!-- <u-avatar src="../../static/images/avatar.png" size="96"></u-avatar> -->
          <image src="/static/images/avatar.png" />
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <!-- <u-avatar src="../../static/images/avatar.png" size="96"></u-avatar> -->
          <image src="/static/images/avatar.png" />
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <!-- <u-avatar src="../../static/images/avatar.png" size="96"></u-avatar> -->
          <image src="/static/images/avatar.png" />
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <!-- <u-avatar src="../../static/images/avatar.png" size="96"></u-avatar> -->
          <image src="/static/images/avatar.png" />
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <!-- <u-avatar src="../../static/images/avatar.png" size="96"></u-avatar> -->
          <image src="/static/images/avatar.png" />
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <!-- <u-avatar src="../../static/images/avatar.png" size="96"></u-avatar> -->
          <image src="/static/images/avatar.png" />
          <view class="right">
            <view class="top-value">
              <view class="name">奶瓶打不开</view>
              <view class="time">12:00</view>
            </view>
            <view class="value">那好吧，我下次再找你吧</view>
          </view>
        </view>
        <view class="item">
          <!-- <u-avatar src="../../static/images/avatar.png" size="96"></u-avatar> -->
          <image src="/static/images/avatar.png" />
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

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  .main {
    width: 90%;
    height: 100%;
    margin: auto;
    .top {
      margin-top: 7%;
      .left {
        display: flex;
        gap: 27px;
        .item {
          font-weight: 600;
          font-size: 20px;
          color: rgba(29, 35, 38, 0.3);
        }
      }
    }
    .search {
      margin-top: 25px;
    }
    .type {
      margin-top: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
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
      margin-top: 27px;
      gap: 18px;
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
