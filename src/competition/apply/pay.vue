<template>
  <view class="box">
    <u-navbar @leftClick="back" leftText="支付订单" :fixed="false"> </u-navbar>
    <view class="main">
      <view class="first">
        <image
          :src="payInfo.mainImage"
          mode="aspectFill"
          style="width: 60px; height: 60px; border-radius: 5px"
        />
        <view class="right">
          <view class="top">{{ payInfo.matchName }}</view>
          <view class="next">
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/location.png"
              style="width: 16px; height: 16px"
            />{{ payInfo.matchLocation }}
          </view>
        </view>
      </view>
      <view class="second">
        <view class="item">
          <view class="left">赛事时间</view>
          <view class="right">{{ payInfo.matchTime }}</view>
        </view>
        <view class="item">
          <view class="left">支付金额</view>
          <view class="right">￥{{ amount }}</view>
        </view>
        <view class="item">
          <view class="left">支付方式</view>
          <view class="right">{{ payInfo.paymentMethod }}</view>
        </view>
      </view>
      <view class="third">
        <view class="title">退款政策</view>
        <view class="content">
          <view class="left">
            <view class="top"
              ><u-icon name="clock" size="13"></u-icon>申请退款时间</view
            >
            <view
              class="time"
              v-for="(item, index) in refundPolicies"
              :key="index"
              >{{ item.refundTime }}</view
            >
          </view>
          <view class="left" style="border: none; margin-left: 20px">
            <view class="top"
              ><u-icon name="man-delete" size="13"></u-icon>退款规则</view
            >
            <view
              class="time"
              v-for="(item, index) in refundPolicies"
              :key="index"
              >{{ item.refundRule }}</view
            >
          </view>
        </view>
      </view>
      <view class="fourth">
        <view class="title">免责声明</view>
        <view class="content">{{ disclaimer || "暂无" }}</view>
      </view>
    </view>
    <view class="bt">
      <view class="pay" @click="pay">立即支付</view>
    </view>
    <u-toast ref="notice"></u-toast>
  </view>
</template>

<script>
export default {
  data() {
    return {
      disclaimer: uni.getStorageSync("disclaimer") || "",
      payInfo: {},
      refundPolicies: [],
      matchId: null,
      amount: null,
    };
  },
  onLoad(options) {
    this.matchId = options.matchId;
    this.amount = options.amount;
    console.log(options.params);
    this.getMatchPayInfo();
    this.getGame();
  },
  methods: {
    async pay() {
      try {
        //唤起微信支付
        const info = uni.getStorageSync("wechatOrderParams");
        if (!info) return;
        wx.requestPayment({
          ...info,
          success: (res) => {
            uni.navigateTo({
              url: `/competition/apply/appear?isFinish=true&&matchId=${this.matchId}`,
            });
            uni.removeStorageSync("wechatOrderParams");
          },
          fail(res) {},
        });
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.data.message,
        });
      }
    },
    async getGame() {
      var result = await uni.$u.http.get("/match/getMatchScheTypeInfo", {
        params: {
          matchId: this.matchId,
        },
      });
      if (result.status == 200) {
        this.scheId = result.data[0].scheId;
      }
    },

    async getMatchPayInfo() {
      try {
        var result = await uni.$u.http.post("/wechat/getMatchPayInfo", {
          matchId: Number(this.matchId),
          wjUserId: uni.getStorageSync("user").id,
        });
        this.payInfo = result.data;
        this.refundPolicies = result.data.refundPolicies;
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.data.message || "获取数据失败",
          complete: () => {
            uni.navigateBack();
          },
        });
      }
    },
    back() {
      uni.navigateBack();
      uni.removeStorageSync("requestJson");
      uni.removeStorageSync("responseJson");
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  background-color: #f7f7f7;
  position: relative;
  .main {
    width: 90%;
    margin: auto;
    .first {
      background-color: #fff;
      margin: 12px 0;
      padding: 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      .right {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .top {
          font-weight: 600;
          font-size: 12px;
          color: #1d2326;
        }
        .next {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.5);
        }
      }
    }
    .second {
      background-color: #fff;
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          font-weight: 400;
          font-size: 12px;
          color: #1d2326;
        }
        .right {
          font-weight: 400;
          font-size: 12px;
          color: #1d2326;
        }
      }
    }
    .third {
      background-color: #fff;
      margin: 12px 0;
      padding: 12px;
      .title {
        font-weight: 600;
        font-size: 14px;
        color: #1d2326;
      }
      .content {
        margin-top: 12px;
        background-color: #f7f7f7;
        padding: 12px;
        display: flex;
        align-items: center;

        .left {
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-right: 1px solid #dedede;
          flex: 1;
          .top {
            display: flex;
            align-items: center;
            gap: 5px;
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.6);
          }
          .time {
            font-weight: 400;
            font-size: 12px;
            color: #1d2326;
          }
        }
      }
    }
    .fourth {
      background-color: #fff;
      padding: 12px;
      .title {
        font-weight: 600;
        font-size: 14px;
        color: #1d2326;
      }
      .content {
        margin-top: 15px;
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.6);
      }
    }
  }
  .bt {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    height: 100px;
    .pay {
      background-color: black;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80%;
      height: 44px;
      font-weight: 600;
      font-size: 16px;
      color: #ffffff;
      border-radius: 22px;
      margin-top: 12px;
    }
  }
}
</style>
