<template>
  <view class="box" @click="show = false">
    <u-navbar autoBack leftText="我的赞助" :fixed="false"> </u-navbar>
    <view class="search">
      <view class="se">
        <view class="first" @tap.stop="toggleTooltip">
          {{ selectIndex === 1 ? "赛事" : "小队" }}
          <view class="icon"></view>
          <view class="tooltip" v-if="show">
            <view class="item" @click="selectIndex = 1">
              赛事 <view class="dian"></view
            ></view>
            <view class="item" @click="selectIndex = 2"> 小队 </view>
          </view>
        </view>
        <view class="second" @tap.stop="toggleTooltip1">
          {{ selectIndex1 === 1 ? "被赞助" : "赞助方" }}
          <view class="icon"></view>
          <view class="tooltip" v-if="show1">
            <view class="item" @click="selectIndex1 = 1">
              被赞助 <view class="dian"></view
            ></view>
            <view class="item" @click="selectIndex1 = 2"> 赞助方 </view>
          </view>
        </view>
        <input class="input" type="text" placeholder="请输入赞助关键词" />
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/搜索.png"
          style="width: 24px; height: 24px"
        />
      </view>
    </view>
    <view class="main">
      <view class="tabs">
        <view class="item-active">全部</view>
        <view class="item">待审核</view>
        <view class="item">审核通过</view>
        <view class="item">审核失败</view>
      </view>
      <view class="item-list" v-if="selectIndex1 === 1">
        <view class="title">
          非凡泡泡16人制羽毛球单打赛
          <text>待审核</text>
        </view>
        <view class="next">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            mode="aspectFill"
            style="width: 62px; height: 62px"
          />
          <view class="info">
            <view class="name">xxx的现金赞助</view>
            <view class="time">赞助时间：2025-12-16 12:29:46</view>
          </view>
        </view>
        <view class="bt">
          <view class="sh" @click="sh">审核</view>
        </view>
      </view>
      <view class="item-list" v-if="selectIndex1 === 1">
        <view class="title">
          非凡泡泡16人制羽毛球单打赛
          <text style="color: #06b66c">审核通过</text>
        </view>
        <view class="next">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            mode="aspectFill"
            style="width: 62px; height: 62px"
          />
          <view class="info">
            <view class="name">xxx的现金赞助</view>
            <view class="time">赞助时间：2025-12-16 12:29:46</view>
          </view>
        </view>
        <view class="bt">
          <view class="sh" @click="toLook">查看</view>
        </view>
      </view>
      <view class="item-list" v-if="selectIndex1 === 1">
        <view class="title">
          非凡泡泡16人制羽毛球单打赛
          <text style="color: #ec384a">审核失败</text>
        </view>
        <view class="next">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            mode="aspectFill"
            style="width: 62px; height: 62px"
          />
          <view class="info">
            <view class="name">xxx的现金赞助</view>
            <view class="time">赞助时间：2025-12-16 12:29:46</view>
          </view>
        </view>
        <view class="bt">
          <view class="sh">查看</view>
        </view>
      </view>
      <view class="item-list" v-if="selectIndex1 === 2">
        <view class="title">
          非凡泡泡16人制羽毛球单打赛
          <text>待审核</text>
        </view>
        <view class="next">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            mode="aspectFill"
            style="width: 62px; height: 62px"
          />
          <view class="info">
            <view class="name">xxx的现金赞助</view>
            <view class="time">赞助时间：2025-12-16 12:29:46</view>
          </view>
        </view>
        <view class="bt">
          <view class="sh">查看</view>
        </view>
      </view>
      <view class="item-list" v-if="selectIndex1 === 2">
        <view class="title">
          非凡泡泡16人制羽毛球单打赛
          <text style="color: #06b66c">审核通过</text>
        </view>
        <view class="next">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            mode="aspectFill"
            style="width: 62px; height: 62px"
          />
          <view class="info">
            <view class="name">xxx的现金赞助</view>
            <view class="time">赞助时间：2025-12-16 12:29:46</view>
          </view>
        </view>
        <view class="bt">
          <view class="sh" @click="toLook">查看</view>
        </view>
      </view>
      <view class="item-list" v-if="selectIndex1 === 2">
        <view class="title">
          非凡泡泡16人制羽毛球单打赛
          <text style="color: #ec384a">审核失败</text>
        </view>
        <view class="next">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            mode="aspectFill"
            style="width: 62px; height: 62px"
          />
          <view class="info">
            <view class="name">xxx的现金赞助</view>
            <view class="time">赞助时间：2025-12-16 12:29:46</view>
          </view>
        </view>
        <view class="bt">
          <view class="sh" @click="toAlter">修改</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      selectIndex: 1,
      selectIndex1: 1,
      show1: false,
    };
  },
  methods: {
    sh() {
      uni.navigateTo({
        url: `/user/sponsorCheck?type=${this.selectIndex}`,
      });
    },
    toggleTooltip() {
      this.show = !this.show;
    },
    toggleTooltip1() {
      this.show1 = !this.show1;
    },
    toAlter() {
      uni.navigateTo({
        url: `/user/sponsorAlter?type=${this.selectIndex}`,
      });
    },
  },
  onLoad() {},
  onShow() {},
};
</script>

<style lang="scss">
body {
  background-color: #f7f7f7;
}
.box {
  width: 100%;
  height: auto;
  .search {
    width: 100%;
    background-color: #fff;
    height: 52px;

    .se {
      width: 90%;
      margin: auto;
      display: flex;
      align-items: center;
      height: 36px;
      border-radius: 18px;
      border: 1px solid #f0f0f0;
      justify-content: space-around;
      .first {
        display: flex;
        align-items: center;
        gap: 5px;
        font-weight: 400;
        font-size: 12px;
        color: #ec384a;
        border-right: 1px solid #e6e6e6;
        padding-right: 10px;
        position: relative;
        .icon {
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid #ec384a;
        }
        .tooltip {
          position: absolute;
          top: 157%;
          left: -11px;
          padding: 0 15px;
          background-color: #1d2326;
          border-radius: 4px;
          .item:nth-child(1) {
            position: relative;
            .dian {
              position: absolute;
              top: -4px;
              left: 11px;
              content: "";
              border-left: 4px solid transparent;
              border-right: 4px solid transparent;
              border-bottom: 4px solid black;
            }
          }

          .item {
            white-space: nowrap;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            padding: 12px 0;
            text-align: center;
            font-weight: 400;
            font-size: 14px;
            color: #ffffff;
          }
          .item:nth-last-child(1) {
            border: none;
          }
        }
      }
      .second {
        display: flex;
        align-items: center;
        gap: 5px;
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.6);
        margin-left: -10px;
        position: relative;
        .icon {
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid #cccccc;
        }
        .tooltip {
          position: absolute;
          top: 157%;
          left: -11px;
          padding: 0 15px;
          background-color: #1d2326;
          border-radius: 4px;
          .item:nth-child(1) {
            position: relative;
            .dian {
              position: absolute;
              top: -4px;
              left: 11px;
              content: "";
              border-left: 4px solid transparent;
              border-right: 4px solid transparent;
              border-bottom: 4px solid black;
            }
          }

          .item {
            white-space: nowrap;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            padding: 12px 0;
            text-align: center;
            font-weight: 400;
            font-size: 14px;
            color: #ffffff;
          }
          .item:nth-last-child(1) {
            border: none;
          }
        }
      }
      .input {
        font-weight: 400;
        font-size: 14px;
        color: rgba(29, 35, 38, 0.3);
      }
    }
  }
  .main {
    width: 90%;
    margin: auto;
    .tabs {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 12px 0;
      .item {
        padding: 4px 12px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        background: rgba(41, 41, 41, 0.06);
        justify-content: center;
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.8);
      }
      .item-active {
        padding: 4px 12px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        background: #15181a;
        justify-content: center;
        font-weight: 400;
        font-size: 12px;
        color: #fff;
      }
    }
    .item-list {
      box-sizing: border-box;
      padding: 12px;
      background-color: #fff;
      border-radius: 4px;
      margin-bottom: 16px;
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
      .next {
        display: flex;
        gap: 12px;
        align-items: center;
        margin-top: 12px;
        .info {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          height: 62px;
          gap: 5px;
          .name {
            font-weight: 600;
            font-size: 12px;
            color: #1d2326;
          }
          .time {
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.6);
          }
        }
      }
      .bt {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        .sh {
          padding: 3px 18px;
          border: 1px solid #f0f0f0;
          border-radius: 22px;
          font-weight: 400;
          font-size: 14px;
          color: #1d2326;
        }
      }
    }
  }
}
</style>
