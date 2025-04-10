<template>
  <view class="box">
    <image
      src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/fabu-bg.png"
      style="width: 100%"
    />
    <view class="main">
      <view class="tips">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/tips.png"
        />
        <text>你已加入泡泡365天</text>
      </view>

      <view class="content">
        <view class="item">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/发赛事.png"
            @click="toSaishi"
          />
          <view class="title">发赛事</view>
          <view class="value">赛场上见</view>
        </view>
        <view class="item">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/发动态.png"
            @click="toDongTai"
          />
          <view class="title">发动态</view>
          <view class="value">记录好心情</view>
        </view>
        <view class="item">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/发活动.png"
          />
          <view class="title">发活动</view>
          <view class="value">敬请期待...</view>
        </view>
        <view class="item">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/1V1挑战.png"
          />
          <view class="title">1V1挑战</view>
          <view class="value">挑战即将开启</view>
        </view>
      </view>

      <view class="delete" @click="back">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/delete.png"
          mode="scaleToFill"
          style="width: 24px; height: 24px"
        />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  onShow() {
    uni.hideTabBar();
  },

  methods: {
    back() {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        uni.navigateBack({ delta: 1 });
        uni.showTabBar();
      } else {
        uni.reLaunch({ url: "/pages/index/index" });
        uni.showTabBar();
      }
    },

    toSaishi() {
      uni.navigateTo({
        url: "/competition/publish/saishi",
      });
    },
    toDongTai() {
      uni.navigateTo({
        url: "/dynamic/publish/dongtai",
      });
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;

  .main {
    width: 90%;
    margin: auto;
    position: relative;

    .tips {
      background: #f3f3f3;
      display: inline-flex;
      gap: 5px;
      align-items: center;
      padding: 4px;

      image {
        width: 45px;
        height: 16px;
      }

      text {
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.5);
      }
    }

    .content {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 60%;
      justify-content: space-between;

      .item {
        width: 48%;
        position: relative;
        .title {
          position: absolute;
          top: 20px;
          left: 12px;
          font-weight: 400;
          font-size: 20px;
          color: #1d2326;
          font-family: youshe;
        }
        .value {
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.5);
          position: absolute;
          top: 50px;
          left: 12px;
        }
        image {
          width: 100%;
          height: 90px;
        }
      }
    }

    .delete {
      width: 60px;
      height: 60px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 36px;
      background-color: #f5f5f5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
