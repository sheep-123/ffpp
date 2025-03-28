<template>
  <view class="box">
    <u-navbar leftText="更多赞助" :autoBack="true" :fixed="false"> </u-navbar>
    <view class="main">
      <view class="list">
        <view class="item">
          <u-avatar :src="src"></u-avatar>
          <view class="right">
            <view class="title"
              >腾讯体育
              <text>2024-12-14</text>
            </view>
            <view class="value">现金赞助 <text>3000</text>元</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src"></u-avatar>
          <view class="right">
            <view class="title"
              >腾讯体育
              <text>2024-12-14</text>
            </view>
            <view class="value">现金赞助 <text>3000</text>元</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src"></u-avatar>
          <view class="right">
            <view class="title"
              >腾讯体育
              <text>2024-12-14</text>
            </view>
            <view class="value">现金赞助 <text>3000</text>元</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src"></u-avatar>
          <view class="right">
            <view class="title"
              >腾讯体育
              <text>2024-12-14</text>
            </view>
            <view class="value">现金赞助 <text>3000</text>元</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src"></u-avatar>
          <view class="right">
            <view class="title"
              >腾讯体育
              <text>2024-12-14</text>
            </view>
            <view class="value">现金赞助 <text>3000</text>元</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src"></u-avatar>
          <view class="right">
            <view class="title"
              >腾讯体育
              <text>2024-12-14</text>
            </view>
            <view class="value">现金赞助 <text>3000</text>元</view>
          </view>
        </view>
        <view class="item">
          <u-avatar :src="src"></u-avatar>
          <view class="right">
            <view class="title"
              >腾讯体育
              <text>2024-12-14</text>
            </view>
            <view class="value">现金赞助 <text>3000</text>元</view>
          </view>
        </view>
      </view>
    </view>

    <view class="bt">
        <view class="b">我要赞助</view>
    </view>
  </view>
</template>

<style lang="scss">
.box {
  background-color: #f7f7f7;
  width: 100vw;
  height: 100vh;
  position: relative;
  .main {
    width: 90%;
    margin: 12px auto;

    .list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .item {
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: 12px;
        gap: 12px;
        .right {
          display: flex;
          flex-direction: column;
          gap: 5px;
          flex: 1;
          .title {
            font-weight: 400;
            font-size: 16px;
            color: #1d2326;
            display: flex;
            align-items: center;
            justify-content: space-between;
            text {
              font-weight: 400;
              font-size: 12px;
              color: rgba(29, 35, 38, 0.5);
            }
          }
          .value {
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.5);
            display: flex;
            align-items: center;
            gap: 5px;
            text {
              color: #ec384a;
            }
          }
        }
      }
    }
  }
  .bt {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: #fff;
    .b{
        width: 80%;
        height: 44px;
        background-color: black;
        margin: auto;
        border-radius: 22px;
        margin-top: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 16px;
        font-weight: 400;
    }
  }
}
</style>
