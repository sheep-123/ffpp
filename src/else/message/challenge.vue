<template>
  <view class="box">
    <u-navbar :fixed="false" leftText="发起挑战" autoBack> </u-navbar>
    <view class="user">
      <view class="item">
        <view class="avatar">
          <u-avatar :src="src" size="80"></u-avatar>
          <view class="icon">发起者</view>
        </view>
        <view class="name">篮球使者</view>
      </view>
      VS
      <view class="item">
        <view class="avatar">
          <u-avatar :src="src" size="80"></u-avatar>
          <view class="icon1">被挑战者</view>
        </view>
        <view class="name">篮球使者</view>
      </view>
    </view>
    <view class="content">
      <view class="main">
        <view class="item">
          <view class="left">挑战项目 <view class="icon">*</view></view>
          <view class="right">
            去选择
            <u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
          </view>
        </view>
        <view class="item">
          <view class="left">挑战时间 <view class="icon">*</view></view>
          <view class="right">
            去选择
            <u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
          </view>
        </view>
        <view class="item">
          <view class="left">挑战地点 <view class="icon">*</view></view>
          <view class="right">
            去选择
            <u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
          </view>
        </view>
      </view>
    </view>
    <view class="bt">
      <view class="item" @click="challenge">发起挑战</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      src: "https://img.yzcdn.cn/vant/cat.jpeg",
    };
  },
  methods: {
    challenge() {
      uni.navigateTo({
        url: "/else/message/chat?challengeStatus=true",
      });
    },
  },
};
</script>

<style lang="scss">
page {
  background-color: #f5f5f5;
}
.box {
  width: 100vw;
  height: 100vh;
  position: relative;
  .user {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
    padding: 28px 0 20px;
    .item {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      .avatar {
        position: relative;
        .icon {
          position: absolute;
          top: 0;
          left: 50%;
          background-color: red;
          font-weight: 600;
          font-size: 12px;
          color: #ffffff;
          padding: 2px 4px;
          border-bottom-left-radius: 10px;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
          white-space: nowrap;
          border: 1px solid #ffffff;
        }
        .icon1 {
          position: absolute;
          top: 0;
          left: 50%;
          background-color: #15181a;
          font-weight: 600;
          font-size: 12px;
          color: #ffffff;
          padding: 2px 4px;
          border-bottom-left-radius: 10px;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
          white-space: nowrap;
          border: 1px solid #ffffff;
        }
      }
      .name {
        font-weight: 600;
        font-size: 16px;
        color: #1d2326;
      }
    }
  }
  .content {
    background-color: #fff;
    margin-top: 12px;
    .main {
      width: 90%;
      margin: auto;
      .item:nth-last-child(1) {
        border: none;
      }
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;
        border-bottom: 1px solid rgba(29, 35, 38, 0.1);
        .left {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 400;
          font-size: 14px;
          color: #1d2326;
          .icon {
            color: #ec384a;
          }
        }
        .right {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 400;
          font-size: 14px;
          color: rgba(29, 35, 38, 0.3);
        }
      }
    }
  }
  .bt {
    position: absolute;
    height: 102px;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    .item {
      height: 44px;
      background-color: black;
      font-weight: 600;
      font-size: 16px;
      color: #ffffff;
      width: 80%;
      border-radius: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 12px auto;
    }
  }
}
</style>
