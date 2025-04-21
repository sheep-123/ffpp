<template>
  <view class="box">
    <u-navbar autoBack leftText="审核赞助" :fixed="false"> </u-navbar>
    <view class="list">
      <view class="title">现金赞助</view>
      <view class="content">
        <view class="item">
          <view class="left">赞助金额</view>
          <view class="money">￥200.00</view>
        </view>
        <view class="item" v-if="type == 2">
          <view class="left">期望赞助参赛数</view>
          <view class="right">2</view>
        </view>
      </view>
    </view>
    <view class="list" v-if="type == 1">
      <view class="title">奖品赞助</view>
      <view class="content">
        <view class="item">
          <view class="left">赞助类型</view>
          <view class="right">实物赞助</view>
        </view>
        <view class="item">
          <view class="left">领取方式</view>
          <view class="right">比赛现场发放</view>
        </view>
        <view class="item-o">
          <view class="top">
            <view class="left">奖品名称</view>
            <view class="right">￥200.00</view></view
          >
          <view class="next">
            <view class="item-n"> 数量 <text>3</text> </view>
            <view class="item-n"> 单位 <text>副</text> </view>
            <view class="item-n"> 目标对象 <text>前三名</text> </view>
          </view>
        </view>
        <view class="item">
          <view class="left">到店领取地址</view>
          <view class="right">广东省广州市天河区体育西路57号</view>
        </view>
        <view class="item">
          <view class="left">联系方式</view>
          <view class="right">183 9765 2820</view>
        </view>
      </view>
    </view>
    <view class="list" v-if="type == 2">
      <view class="title">实物赞助</view>
      <view class="content">
        <view class="item-o">
          <view class="top">
            <view class="left">实物名称</view>
            <view class="right">尖叫运动功能饮料</view></view
          >
          <view class="next">
            <view class="item-n"> 数量 <text>3</text> </view>
            <view class="item-n"> 单位 <text>瓶</text> </view>
          </view>
        </view>
      </view>
    </view>
    <view class="list" v-if="type == 1">
      <view class="title">现场服务</view>
      <view class="content">
        <view class="item">
          <view class="left">服务内容</view>
          <view class="right">赛后拉伸</view>
        </view>
        <view class="item">
          <view class="left">目标对象</view>
          <view class="right">所有参赛选手</view>
        </view>
      </view>
    </view>
    <view class="list" v-if="type == 2">
      <view class="title">服务赞助</view>
      <view class="content">
        <view class="item-o">
          <view class="top">
            <view class="left">服务内容</view>
            <view class="right">赛后拉伸指导课程</view></view
          >
          <view class="next">
            <view class="item-n"> 数量 <text>2</text> </view>
            <view class="item-n"> 单位 <text>节</text> </view>
          </view>
        </view>
      </view>
    </view>
    <view class="list" v-if="type == 2" style="margin-top: 16px">
      <view class="content">
        <view class="item">
          <view class="left">赞助时间</view>
          <view class="right">5个月</view>
        </view>
      </view>
    </view>
    <view class="list" v-if="type == 1">
      <view class="title">赞助方要求</view>
      <view class="content">
        <view class="explain">
          <view class="name"> 要求说明 </view>
          <view class="text" style="height: 160px">
            1.希望能在现场设置品牌A字版 2.比赛过程中可以口播品牌门店优惠信息
          </view>
        </view>
        <view class="explain" style="padding-bottom: 16px">
          <view class="name"> 赞助宣言 </view>
          <view class="text" style="height: 100px">
            李宁天河城店限时优惠满500减100，快来抢购
          </view>
        </view>
      </view>
    </view>

    <view class="first" v-if="type == 2">
      <view class="title"> 赞助方要求 </view>
      <view class="text"
        >需要穿着李宁提供羽毛球服装参加比赛，如果获奖，发表获奖感言需要提到李宁X门店</view
      >
    </view>

    <view class="second" v-if="type == 2">
      <view class="title"> 赞助口号 </view>
      <view class="text">李宁X门店成就X区域内羽毛球之王</view>
      <view class="next">
        <view class="left">赞助商logo</view>
        <view class="right">
          <u-avatar :src="src" size="50"></u-avatar>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>
    </view>

    <view class="list">
      <view class="title">审核意见</view>
      <view class="content">
        <view class="explain" style="padding: 16px 0">
          <textarea
            placeholder="审核意见"
            class="text"
            style="height: 100px; width: 92%"
          ></textarea>
        </view>
      </view>
    </view>
    <view class="bt">
      <view class="back">驳回</view>
      <view class="pass">同意该赞助</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      type: 0,
    };
  },
  onLoad(options) {
    this.type = options.type;
  },
  methods: {},
};
</script>

<style lang="scss">
body {
  background-color: #f7f7f7;
}
.box {
  width: 100%;
  .list {
    .title {
      width: 90%;
      margin: auto;
      font-weight: 600;
      font-size: 16px;
      color: #1d2326;
      margin-top: 12px;
      padding-bottom: 8px;
    }
    .content {
      background-color: #fff;
      padding: 0 16px;
      .item:nth-last-child(1) {
        border-bottom: none;
      }

      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;
        border-bottom: 1px solid #f0f0f0;
        .left {
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
        }
        .money {
          font-weight: 800;
          font-size: 18px;
          color: #1d2326;
        }
        .right {
          font-weight: 400;
          font-size: 14px;
          color: #1d2326;
        }
      }

      .item-o {
        display: flex;
        flex-direction: column;
        padding: 16px 0;
        gap: 16px;
        border-bottom: 1px solid #f0f0f0;
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .left {
            font-weight: 600;
            font-size: 14px;
            color: #1d2326;
          }
          .right {
            font-weight: 400;
            font-size: 14px;
            color: #1d2326;
          }
        }
        .next {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .item-n {
            display: flex;
            align-items: center;
            gap: 20px;
            font-weight: 400;
            font-size: 14px;
            color: #1d2326;
          }
        }
      }
      .explain {
        .name {
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
          padding: 16px 0 12px;
        }
        .text {
          padding: 12px;
          border: 1px solid #f0f0f0;
          border-radius: 4px;
          font-weight: 400;
          font-size: 14px;
          color: #1d2326;
        }
      }
    }
  }
  .bt {
    height: 102px;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    gap: 17px;
    margin-top: 5px;
    padding-top: 12px;
    box-sizing: border-box;
    .back {
      width: 40%;
      height: 44px;
      border-radius: 22px;
      border: 1px solid #dbdbdb;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pass {
      width: 40%;
      height: 44px;
      border-radius: 22px;
      background-color: #15181a;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 16px;
      color: #ffffff;
    }
  }
  .first {
    background-color: #fff;
    padding: 16px;
    margin-top: 16px;
    .title {
      font-weight: 600;
      font-size: 14px;
      color: #1d2326;
    }
    .text {
      margin-top: 16px;
      padding: 12px;
      font-weight: 400;
      font-size: 14px;
      color: #1d2326;
      border: 1px solid #f0f0f0;
      height: 176px;
      border-radius: 4px;
    }
  }
  .second {
    background-color: #fff;
    padding: 16px;
    margin-top: 16px;
    .title {
      font-weight: 600;
      font-size: 14px;
      color: #1d2326;
    }
    .text {
      margin-top: 16px;
      padding: 12px;
      font-weight: 400;
      font-size: 14px;
      color: #1d2326;
      border: 1px solid #f0f0f0;
      height: 100px;
      border-radius: 4px;
    }
    .next {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 17px;
      .left {
        font-weight: 600;
        font-size: 14px;
        color: #1d2326;
      }
      .right {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
}
</style>
