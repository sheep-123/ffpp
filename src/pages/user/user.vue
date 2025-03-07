<template>
  <view class="box">
    <view class="content">
      <view class="main">
        <view class="first">
          <image src="/static/images/avatar.png" />
          <view class="v">
            <view class="v-top">半场好球先生</view>
            <view class="value">玩家号：26734412</view>
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

        <view class="third"></view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: url("/static/images/05.jpg") no-repeat;

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
    }
  }
}
</style>
