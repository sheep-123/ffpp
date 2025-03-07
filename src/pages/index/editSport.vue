<template>
  <view class="box">
    <u-navbar
      back-text="编辑运动"
      :border-bottom="false"
      back-text-style="font-weight: 600;font-size: 16px;color: #1D2326;"
    ></u-navbar>

    <view class="content">
      <view class="main">
        <view class="c-item">
          <text class="title">我的运动</text>
          <view class="sport">
            <u-tag text="橄榄球" closeable :show="show" @close="tagClick" />
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
          .u-tag {

          }
        }
      }
    }
  }
}
</style>
