<template>
  <view class="box">
    <u-navbar autoBack leftText="我的赛事" :fixed="false"> </u-navbar>
    <view class="tab">
      <view class="main">
        <u-tabs
          :list="list"
          lineColor="red"
          :current="current"
          @click="click"
        ></u-tabs>
      </view>
    </view>
    <view class="main1">
      <view class="item" v-for="(item, index) in matchList" :key="index">
        <view class="top">
          <image
            :src="item.mainImageUrl"
            mode="aspectFill"
            style="width: 62px; height: 62px; border-radius: 5px"
          />
          <view class="right">
            <view class="title"
              >{{ item.name }} <text>{{ item.matchStateName }}</text></view
            >
            <view class="g">地点：{{ item.address }}</view>
            <view class="g">时间：{{ item.startTime }}</view>
          </view>
        </view>
        <view class="bottom">
          <view class="item" @click="execute(item)"> 执行比赛 </view>
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
        },
        {
          name: "我的赞助",
        },
        {
          name: "我的发布",
        },
        {
          name: "我的收藏",
        },
      ],
      current: 0,
      currentIndex: 1,
      matchList: [],
    };
  },
  onLoad() {
    this.queryMyMatch();
  },
  methods: {
    execute(item) {
      uni.navigateTo({
        url: `/user/execute?matchId=${item.id}&&serialNum=${item.serialNum}`,
      });
    },
    click(n) {
      this.currentIndex = n.index + 1;
      this.queryMyMatch();
    },
    async queryMyMatch() {
      this.matchList = [];
      var result = await uni.$u.http.get("/wjmatch/queryMyMatch", {
        params: {
          queryFlag: this.currentIndex,
        },
      });
      if (result.status == 200) {
        this.matchList = result.data;
      }
    },
  },
};
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
.box {
  width: 100vw;

  .tab {
    background-color: white;
    .main {
      margin-left: 3%;
    }
  }
  .main1 {
    width: 90%;
    margin: auto;
    padding-bottom: 100px;
    .item {
      padding: 12px;
      margin-top: 12px;
      background-color: white;
      border-radius: 4px;
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
