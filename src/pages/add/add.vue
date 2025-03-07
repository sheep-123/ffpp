<template>
  <view class="box">
    <image src="/static/images/fabu-bg.png" style="width: 100%" />
    <view class="main">
      <view class="tips">
        <image src="/static/images/tips.png" />
        <text>你已加入泡泡365天</text>
      </view>

      <view class="content">
        <image src="/static/images/fasaishi.png" />
        <image src="/static/images/fabuhuodong.png" />
        <image src="/static/images/faqitiaozhan.png" />
        <image src="/static/images/jifensai.png" />
      </view>

      <image src="/static/images/delete.png" class="delete" @click="back" />
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
