<template>
  <view class="box" :style="{ backgroundColor: bgColor }">
    <u-navbar
      autoBack
      bgColor="rgba(0,0,0,0)"
      leftIconColor="#ffffff"
      leftText="生成分享图"
      :fixed="false"
    >
    </u-navbar>

    <view class="main">
      <view
        class="bg"
        :style="{
          background: `linear-gradient(180deg, ${bgColor} 0% ,#fff 100%)`,
        }"
      >
        <view class="image">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            mode="widthFix"
            style="width: 250px; height: 230px"
          >
          </image>
          <view class="bm" :style="{ background: bgColor }">
            <view class="num">17</view>
            人已报名</view
          >
        </view>
      </view>
      <view class="invite">邀你一起参加：</view>
      <view class="invite-text">「喜茶」x王者荣耀1v1挑战赛</view>
      <view class="invite-time">
        <view class="left">2024/10/7</view>
        <view class="right">参赛日期2024年10月7日</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bgColor: uni.getStorageSync("theme") || "#1B4CA7",
    };
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  .main {
    width: 80%;
    margin: auto;
    background-color: #fff;
    padding: 30px;
    box-sizing: border-box;
    border-radius: 10px;
    .bg {
      border-radius: 5px;
      height: 166px;
      .image {
        position: relative;
        image {
          border-radius: 5px;
          margin-left: -10px;
          margin-top: 10px;
        }
        .bm {
          position: absolute;
          top: 70%;
          left: -17px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 400;
          font-size: 12px;
          color: #ffffff;
          padding: 5px 10px;
          .num {
            font-weight: 600;
            font-size: 16px;
            color: #ffffff;
          }
        }
      }
    }
    .invite {
      margin-top: 30px;
      font-weight: 600;
      font-size: 16px;
      color: #1d2326;
    }
  }
}
</style>
