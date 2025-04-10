<template>
  <view class="box">
    <u-navbar autoBack leftText="我的赛事" :fixed="false"> </u-navbar>
    <view class="tab">
      <view class="main">
        <u-tabs
          :list="list"
          :is-scroll="false"
          v-model="current"
          @change="change"
          active-color="#1D2326"
          fonst-size="16"
          inactive-color="#1D2326"
          :bar-style="barStyle"
          lineColor="red"
        ></u-tabs>
      </view>
    </view>
    <view class="main">
      <view class="item">
        <view class="top">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            mode="aspectFill"
            style="width: 62px; height: 62px; border-radius: 5px"
          />
          <view class="right">
            <view class="title"
              >非凡泡泡16人制羽毛球单打赛 <text>待发布</text></view
            >
            <view class="g">地点：奥体中心羽毛球2号场</view>
            <view class="g">时间：2024-10-16 14:00</view>
          </view>
        </view>
        <view class="bottom">
          <view class="item" @click="execute"> 执行比赛 </view>
          <view class="item"> 托管奖金 </view>
          <view class="item"> 管理奖金 </view>
          <view class="item"> 管理报名 </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: "我的报名",
          id: 0,
        },
        {
          name: "我的赞助",
          id: 1,
        },
        {
          name: "我的发布",
          id: 2,
        },
        {
          name: "我的收藏",
          id: 3,
        },
      ],
      current: 0,
      barStyle: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
      },
    };
  },
  methods: {
    change(index) {
      this.current = index;
    },
    execute() {
      uni.navigateTo({
        url: "/user/execute",
      });
    },
    checkThis(index) {
      this.op = index;
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  background-color: #f7f7f7;
  .tab {
    background-color: white;
    .main {
      margin-left: 3%;
    }
  }
  .main {
    width: 90%;
    margin: auto;
    .item {
      padding: 12px;
      margin-top: 12px;
      background-color: white;
      .top {
        display: flex;
        align-items: center;
        gap: 12px;
        .right {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
          .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: 600;
            font-size: 12px;
            color: #1d2326;
            text {
              font-weight: 400;
              font-size: 12px;
              color: #ff6229;
            }
          }
          .g {
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.6);
          }
        }
      }
      .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item {
          font-weight: 400;
          font-size: 12px;
          color: #1d2326;
          white-space: nowrap;
          padding: 6px 13px;
          border: 1px solid #f0f0f0;
          border-radius: 22px;
        }
      }
    }
  }
}
</style>
