<template>
  <view class="box">
    <u-navbar leftText="赛事项目"></u-navbar>

    <view class="type">
      <view class="item"> 热门 </view>
      <view class="item"> 潮流运动 </view>
      <view class="item"> 传统运动升级 </view>
      <view class="item"> 潮流运动 </view>
      <view class="item"> 传统运动升级 </view>
      <view class="item"> 潮流运动 </view>
      <view class="item"> 传统运动升级 </view>
    </view>
  </view>
</template>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;

  .type {
    margin-top: 100px;
    display: flex;
    gap: 10px;
    overflow-x: auto; // 允许横向滚动
    white-space: nowrap; // 防止子项换行

    .item:nth-child(1) {
      background-color: black;
      color: white;
      border: none;
    }
    .item {
      padding: 6px 18px;
      border-radius: 20px;
      font-weight: 400;
      font-size: 14px;
      color: #1d2326;
      border: 1px solid #f0f0f0;
    }
  }
}
</style>
