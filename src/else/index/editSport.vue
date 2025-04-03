<template>
  <view class="box">
    <u-navbar></u-navbar>

    <view class="content">
      <view class="main">
        <view class="c-item">
          <text class="title">我的运动</text>
          <view class="sport">
            <text class="lock">附近</text>
            <view class="s-item">
              橄榄球
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/del.png" />
            </view>
            <view class="s-item">
              橄榄球
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/del.png" />
            </view>
            <view class="s-item">
              橄榄球
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/del.png" />
            </view>
            <view class="s-item">
              橄榄球
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/del.png" />
            </view>
            <view class="s-item">
              橄榄球
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/del.png" />
            </view>
          </view>
        </view>

        <view class="c-item">
          <text class="title">球类</text>
          <view class="sport">
            <view class="s-item">
              蓝球
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
            <view class="s-item">
              足球
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
            <view class="s-item">
              羽毛球
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
            <view class="s-item">
              网球
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
            <view class="s-item">
              乒乓球
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
            <view class="s-item">
              乒乓球
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
            <view class="s-item">
              壁球
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
            <view class="s-item">
              匹克球
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
            <view class="s-item">
              台球
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
            <view class="s-item">
              高尔夫
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
            <view class="s-item">
              水球
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
            <view class="s-item">
              棒球
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
          </view>
        </view>

        <view class="c-item">
          <text class="title">休闲类</text>
          <view class="sport">
            <view class="s-item">
              射箭
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
            <view class="s-item">
              攀岩
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
            <view class="s-item">
              训犬
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
            <view class="s-item">
              钓鱼
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
            <view class="s-item">
              健身
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
          </view>
        </view>

        <view class="c-item">
          <text class="title">电子竞技</text>
          <view class="sport">
            <view class="s-item">
              手游
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>
            <view class="s-item">
              网游
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/plus.png" />
            </view>

          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.box {
  width: 100%;
  height: 100%;

  .content {
    display: flex;
    flex-direction: column;
    .main {
      width: 90%;
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
      .c-item {
        .title {
          font-weight: 600;
          font-size: 16px;
          color: #1d2326;
        }
        .sport {
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;
          gap: 12px;
          .lock {
            width: 104px;
            height: 30px;
            background-color: #e6e6e6;
            border-radius: 5px;
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .s-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 104px;
            height: 30px;
            border-radius: 5px;
            border: 1px solid #e6e6e6;
            gap: 2px;
            font-weight: 400;
            font-size: 14px;
            color: #1d2326;
            image {
              width: 16px;
              height: 16px;
            }
          }
        }
      }
    }
  }
}
</style>
