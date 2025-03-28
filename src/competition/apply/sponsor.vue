<template>
  <view class="box" :style="{ backgroundColor: bgColor }">
    <u-navbar
      autoBack
      leftIconColor="#ffffff"
      leftText="我要赞助"
      bgColor="rgba(0,0,0,0)"
      :fixed="false"
    ></u-navbar>
    <view class="main">
      <view class="item-top">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/现金赞助.svg"
          mode="scaleToFill"
          style="width: 152px; height: 22px"
        />
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/拿钱.svg"
          mode="scaleToFill"
          style="width: 108px; height: 108px; position: absolute; right: 0"
        />

        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/cup-bg1.png"
          mode="scaleToFill"
          style="
            width: 235px;
            height: 279px;
            position: absolute;
            right: 0;
            top: -150px;
          "
        />

        <view class="sp">
          <view class="first">
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/赞助.svg"
              mode="scaleToFill"
              style="width: 56px; height: 22px"
            />
            <view class="jx">您的每一份赞助，50%直接助理选手追梦！</view>
            <view class="jx-n">
              <view class="item">
                选手激励50%
                <text>|</text>
                赛事运营30%
                <text>|</text>
                平台服务20%
              </view>
            </view>
            <view class="price">
              ￥<view class="num">5000</view> 现金池
              <text>|</text>
              ￥<view class="num">2500</view> 待分配奖金
            </view>
          </view>
          <view class="second">
            <view class="left">
              <u-avatar-group
                :urls="urls"
                size="24"
                gap="0.4"
                maxCount="4"
              ></u-avatar-group>
              等10人已赞助
            </view>
            <view class="right"> 您已赞助 <text>￥0</text> </view>
          </view>
        </view>
      </view>

      <view class="item">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/奖品赞助.svg"
          mode="scaleToFill"
          style="width: 152px; height: 22px"
        />
        <view class="content">
          <textarea
            class="t1"
            placeholder="请输入内容"
            placeholder-class="placeholder-class"
            auto-height
            v-model="t1"
          >
          </textarea>
        </view>
      </view>

      <view class="item">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/现场服务.svg"
          mode="scaleToFill"
          style="width: 152px; height: 22px"
        />
        <view class="content">
          <textarea
            class="t1"
            placeholder="请输入内容"
            placeholder-class="placeholder-class"
            auto-height
            v-model="t2"
          >
          </textarea>
        </view>
      </view>

      <view class="item">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/赞助说明.svg"
          mode="scaleToFill"
          style="width: 88px; height: 22px"
        />
        <view class="text">
          <view class="item">
            <view class="title"> <text>01</text> 观赛权益</view>
            <view class="value"
              >成功赞助的企业或个人将获赞助商资格，尊享绝佳观赛体验，于赛场最佳位置见证赛事激情，名额稀缺，先到先得！</view
            >
          </view>
          <view class="item">
            <view class="title"> <text>02</text>营销推广机会</view>
            <view class="value"
              >赞助商有机会在比赛特定区域开展营销活动，拓展品牌影响力。但因优质位置有限，赛事主办方将依据赞助规模与价值综合评估，确定最终名额分配。</view
            >
          </view>
          <view class="item">
            <view class="title"> <text>03</text> 赞助审核机制</view>
            <view class="value"
              >现金赞助：无特定要求的现金赞助可直接参与；有明确要求的现金赞助则需审核，确保与赛事需求及规划相符。
              实物或服务赞助：所有实物或服务赞助均需审核，以保障赛事顺利进行与品质提升。
              现场服务赞助：同样需经审核流程，确认其专业性与适配性。</view
            >
          </view>
          <view class="item">
            <view class="title"> <text>04</text> 业性与适配性</view>
            <view class="value"
              >赞助方可提出详细赞助要求与方案，经赛事主办方确认后，赞助协议正式生效并具备法律效力，开启双方共赢合作之旅。
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="bt">
      <view class="left">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/赞助消息.svg"
          mode="scaleToFill"
          style="width: 24px; height: 24px"
        />
        联系主办方
      </view>
      <view class="button" @click="show = true"> 申请赞助 </view>
    </view>
    <u-popup :show="show" :round="10" mode="bottom" @close="show = false">
      <view class="pop">
        <view class="title">请选择要赞助的方式（可多选）</view>
        <view class="f-item">
          <view
            v-for="(item, index) in column"
            :key="index"
            @click="checkboxChange(index)"
            class="item"
          >
            {{ item }}
            <view class="icon" v-if="select == index">
              <u-icon name="checkbox-mark" color="red" size="24"></u-icon>
            </view>
          </view>
        </view>
        <view class="enter" @click="enter">确定</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bgColor: uni.getStorageSync("theme") || "#1B4CA7",
      urls: [
        "https://uviewui.com/album/1.jpg",
        "https://uviewui.com/album/2.jpg",
        "https://uviewui.com/album/3.jpg",
        "https://uviewui.com/album/4.jpg",
        "https://uviewui.com/album/7.jpg",
        "https://uviewui.com/album/6.jpg",
        "https://uviewui.com/album/5.jpg",
      ],
      t1: "实物赞助 羽毛球64个（1-4名平分）",
      t2: "现场服务 赛后被动拉伸体验",
      show: false,
      column: ["赞助现金", "赞助奖品", "提供现场服务"],
      select: "",
    };
  },
  methods: {
    enter() {
      uni.navigateTo({
        url: "/competition/apply/sponsorship",
      });
    },
    checkboxChange(index) {
      this.select = index;
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  height: auto;

  .main {
    width: 90%;
    margin: auto;
    .item-top {
      position: relative;
      .sp {
        height: 200px;
        border-radius: 10px;
        overflow: hidden;
        margin-top: 16px;
        clip-path: polygon(0 0, 60% 0, 65% 10%, 100% 10%, 100% 100%, 0 100%);

        .first {
          height: 75%;
          background-color: rgba(255, 255, 255, 0.1);
          padding: 13px 12px;
          box-sizing: border-box;
          .jx {
            font-weight: 400;
            font-size: 12px;
            color: #ffffff;
            margin-top: 5px;
          }
          .jx-n {
            font-weight: 400;
            font-size: 12px;
            color: #f0f0f0;
            margin-top: 10px;
            .item {
              display: flex;
              align-items: center;
              gap: 5px;
              margin: 0;
            }
          }
          .price {
            background-color: rgba(255, 255, 255, 0.2);
            margin-top: 18px;
            height: 34px;
            display: flex;
            align-items: center;
            gap: 5px;
            font-weight: 400;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
            border-radius: 5px;
            padding-left: 10px;
            .num {
              font-weight: 800;
              font-size: 18px;
              color: #ffffff;
            }
          }
        }

        .second {
          height: 25%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #fff;
          padding: 0px 12px;
          box-sizing: border-box;
          gap: 5px;
          .left {
            display: flex;
            align-items: center;
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.5);
            gap: 5px;
          }
          .right {
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.5);
            text {
              font-weight: 400;
              font-size: 12px;
              color: #1d2326;
            }
          }
        }
      }
    }
    .item {
      margin-top: 36px;
      .t1 {
        padding: 12px 20px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        font-weight: 400;
        font-size: 12px;
        color: #ffffff;
        margin-top: 12px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1),
          -5px -5px 10px rgba(0, 0, 0, 0.1);
      }
      .text {
        padding: 12px 20px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        margin-top: 12px;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1),
          -5px -5px 10px rgba(0, 0, 0, 0.1);
        gap: 12px;
        display: flex;
        flex-direction: column;

        .item {
          margin: 0;
          .title {
            font-weight: 600;
            font-size: 16px;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 5px;
          }
          .value {
            font-weight: 400;
            font-size: 12px;
            color: #ffffff;
            margin-top: 10px;
          }
        }
      }
    }
  }

  .bt {
    height: 90px;
    background-color: #fff;
    display: flex;
    padding-top: 12px;
    box-sizing: border-box;
    justify-content: space-evenly;
    margin-top: 42px;
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 400;
      font-size: 12px;
      color: rgba(29, 35, 38, 0.5);
    }
    .button {
      width: 65%;
      height: 44px;
      background-color: black;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 16px;
      color: #ffffff;
      border-radius: 20px;
    }
  }
}

.placeholder-class {
  font-size: 12px;
  color: #ffffff;
  margin-top: 12px;
}

.pop {
  height: 225px;
  width: 90%;
  margin: 30px auto;
  text-align: center;
  .title {
    font-weight: 600;
    font-size: 16px;
    color: #1d2326;
  }
  .f-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    margin-top: 12px;
    position: relative;
    .item {
      width: 80%;
      height: 38px;
      border-radius: 10px;
      border: 1px solid #d4f1ff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 400;
      font-size: 14px;
      color: #1d2326;
    }
    .icon {
      position: absolute;
      right: 20%;
    }
  }
  .enter {
    width: 80%;
    margin: auto;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    border-radius: 10px;
    background-color: black;
    margin-top: 24px;
  }
}
</style>
