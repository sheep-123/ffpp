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
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/发赛事.svg"
          @click="toSaishi"
        />
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/发动态.svg"
        />
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/发活动.svg"
        />
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/1v1挑战.svg"
        />
      </view>

      <image
        src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/delete.png"
        class="delete"
        @click="back"
      />
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
      image {
        width: 48%;
        height: 90px;
      }
    }

    .delete {
      width: 60px;
      height: 60px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 36px;
    }
  }
}
</style>
