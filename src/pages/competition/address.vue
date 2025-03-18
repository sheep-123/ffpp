<template>
  <view class="box">
    <u-navbar leftText="详细场次填写"></u-navbar>
    <view
      class="main"
      :style="{ marginTop: statusBarHeight + navbarHeight + 'px' }"
    >
      <view class="item">
        <view class="top">详细场次 <view class="icon">*</view></view>
        <view class="next"></view>
      </view>
    </view>
    <view class="bt">
      <view class="enter" @click="enter">生成邀请码</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: 0,
      navbarHeight: 44,
    };
  },
  onShow() {
    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
  },

  method: {
    enter() {},
  },
};
</script>

<style lang="scss">
.box {
  background: #f7f7f7;
  position: relative;
  .bt {
    position: fixed;
    bottom: 0;
    height: 102px;
    box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    .enter {
      width: 80%;
      background-color: black;
      height: 44px;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      font-size: 16px;
      color: #ffffff;
      margin: 12px auto;
    }
  }
}
.main {
  width: 90%;
  margin: auto;
  height: 900px;
  overflow: hidden;
  .item {
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 0 30px 15px;
    margin: 20px 0;
    .top {
      font-weight: 600;
      font-size: 16px;
      color: #1d2326;
    }
    .next {
      display: flex;
      align-items: center;
      gap: 15px;
      .left {
        position: relative;
        &::after {
          content: "未认证";
          position: absolute;
          bottom: -8px;
          padding: 2px 5px;
          background: black;
          white-space: nowrap;
          left: 50%;
          transform: translateX(-50%);
          font-weight: 400;
          font-size: 12px;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          //切割为平行四边形
          clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%);
        }
        image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid black;
          position: relative;
        }
      }
      .left-l {
        position: relative;
        &::after {
          content: "未认证";
          position: absolute;
          bottom: -8px;
          padding: 2px 5px;
          background: black;
          white-space: nowrap;
          left: 50%;
          transform: translateX(-50%);
          font-weight: 400;
          font-size: 12px;
          color: green;
          display: flex;
          justify-content: center;
          align-items: center;
          //切割为平行四边形
          clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%);
        }
        image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid #06b66c;
          position: relative;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .name {
          font-weight: 600;
          font-size: 16px;
          color: #1d2326;
        }
        .role {
          font-weight: 600;
          font-size: 12px;
          color: #1d2326;
        }
      }
    }
  }
  .sm {
    margin-top: 50px;
    font-weight: 600;
    font-size: 16px;
    color: #1d2326;
  }
  .content {
    margin-top: 10px;
    font-weight: 400;
    font-size: 14px;
    color: rgba(29, 35, 38, 0.3);
  }
}
</style>
