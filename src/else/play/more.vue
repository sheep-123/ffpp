<template>
  <view class="box">
    <u-navbar
      leftText="运动积分等级排行"
      leftIconColor="black"
      bgColor="rgba(0,0,0,0)"
      autoBack
    >
    </u-navbar>
    <view class="bg">
      <image
        src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/运动积分等级排行.png"
        mode="scaleToFill"
        style="width: 100%; height: 226px"
      >
      </image>
      <view class="select">
        <u-icon name="map"></u-icon>
        <view class="text">
          全国
          <u-icon name="arrow-down-fill" size="8" color="black"></u-icon>
        </view>
      </view>
    </view>

    <view class="type">
      <view
        class="item"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectTab(index)"
        :style="activeIndex == index ? 'color: black;' : ''"
      >
        {{ tab }}
      </view>
      <view
        class="item-active"
        :style="{ transform: `translateX(${activeIndex * 95}%)` }"
      ></view>
    </view>

    <view style="margin-top: 20px; margin-left: 10px">
      <u-tabs :list="list1" @click="click" lineColor="red"></u-tabs>
    </view>

    <view class="main">
      <view class="tabs">
        <view class="item-active">赛事积分</view>
        <view class="item">1v1</view>
      </view>

      <view class="rank">
        <view class="item">
          <view class="rank-num">2ST</view>
          <view class="b1">
            <view class="b2">
              <u-avatar :src="src"></u-avatar>
            </view>
          </view>
        </view>
        <view class="item" style="margin-top: -10px">
          <view class="rank-num">1ST</view>
          <view class="b3">
            <view class="b4">
              <u-avatar :src="src" size="50"></u-avatar>
            </view>
          </view>
        </view>
        <view class="item">
          <view class="rank-num">3ST</view>
          <view class="b1">
            <view class="b2">
              <u-avatar :src="src"></u-avatar>
            </view>
          </view>
        </view>
      </view>

      <view class="first">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/排名-bg.png"
          mode="scaleToFill"
          style="width: 100%; height: 82px; position: absolute"
        />
        <view class="item-first">
          <view class="name">蓝球之星</view>
          <view class="score">
            <view class="left">黄金V</view>
            <view class="line"></view>
            <view class="right">460</view>
          </view>
        </view>
        <view class="item-second">
          <view class="name">蓝球之星</view>
          <view class="score">
            <view class="left">黄金V</view>
            <view class="right">460</view>
          </view>
        </view>
        <view class="item-third">
          <view class="name">蓝球之星</view>
          <view class="score">
            <view class="left">黄金V</view>
            <view class="right">460</view>
          </view>
        </view>
      </view>

      <view class="second">
        <view class="left">
          <text>排名</text>
          <text>用户名</text>
        </view>

        <view class="right">积分值</view>
      </view>

      <view class="third">
        <view class="item">
          <view class="left">
            <view class="i1">04</view>
            <view class="i2">
              <u-avatar :src="src" size="24"></u-avatar>勇敢的心
            </view>
          </view>

          <view class="right">
            黄金I
            <view class="line"></view>
            400
            <u-icon name="arrow-right" size="8" color="#CCCCCC"></u-icon>
          </view>
        </view>
        <view class="item">
          <view class="left">
            <view class="i1">04</view>
            <view class="i2">
              <u-avatar :src="src" size="24"></u-avatar>勇敢的心
            </view>
          </view>

          <view class="right">
            黄金I
            <view class="line"></view>
            400
            <u-icon name="arrow-right" size="8" color="#CCCCCC"></u-icon>
          </view>
        </view>
        <view class="item">
          <view class="left">
            <view class="i1">04</view>
            <view class="i2">
              <u-avatar :src="src" size="24"></u-avatar>勇敢的心
            </view>
          </view>

          <view class="right">
            黄金I
            <view class="line"></view>
            400
            <u-icon name="arrow-right" size="8" color="#CCCCCC"></u-icon>
          </view>
        </view>
        <view class="item">
          <view class="left">
            <view class="i1">04</view>
            <view class="i2">
              <u-avatar :src="src" size="24"></u-avatar>勇敢的心
            </view>
          </view>

          <view class="right">
            黄金I
            <view class="line"></view>
            400
            <u-icon name="arrow-right" size="8" color="#CCCCCC"></u-icon>
          </view>
        </view>
        <view class="item">
          <view class="left">
            <view class="i1">04</view>
            <view class="i2">
              <u-avatar :src="src" size="24"></u-avatar>勇敢的心
            </view>
          </view>

          <view class="right">
            黄金I
            <view class="line"></view>
            400
            <u-icon name="arrow-right" size="8" color="#CCCCCC"></u-icon>
          </view>
        </view>
        <view class="item">
          <view class="left">
            <view class="i1">04</view>
            <view class="i2">
              <u-avatar :src="src" size="24"></u-avatar>勇敢的心
            </view>
          </view>

          <view class="right">
            黄金I
            <view class="line"></view>
            400
            <u-icon name="arrow-right" size="8" color="#CCCCCC"></u-icon>
          </view>
        </view>
        <view class="item">
          <view class="left">
            <view class="i1">04</view>
            <view class="i2">
              <u-avatar :src="src" size="24"></u-avatar>勇敢的心
            </view>
          </view>

          <view class="right">
            黄金I
            <view class="line"></view>
            400
            <u-icon name="arrow-right" size="8" color="#CCCCCC"></u-icon>
          </view>
        </view>
      </view>
    </view>

    <view class="bt">
      <view class="item">
        <view class="left">
          <view class="i1">04</view>
          <view class="i2">
            <u-avatar :src="src" size="24"></u-avatar>勇敢的心
          </view>
        </view>

        <view class="right">
          黄金I
          <view class="line"></view>
          400
          <u-icon name="arrow-right" size="8" color="#CCCCCC"></u-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabs: ["个人", "小队"],
      activeIndex: 0,
      list1: [
        {
          name: "全部",
        },
        {
          name: "蓝球",
        },
        {
          name: "羽毛球",
        },
        {
          name: "科技",
        },
        {
          name: "飞盘",
        },
        {
          name: "乒乓球",
        },
        {
          name: "健身",
        },
        {
          name: "财经",
        },
        {
          name: "手工",
        },
      ],
    };
  },
  methods: {
    selectTab(index) {
      this.activeIndex = index;
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  height: auto;
  position: relative;
  .bg {
    position: relative;
    .select {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      width: 96px;
      height: 32px;
      border-radius: 16px;
      border: 1px solid #f0f0f0;
      position: absolute;
      left: 5%;
      top: 78%;
      .text {
        display: flex;
        align-items: center;
        gap: 5px;
        font-weight: 600;
        font-size: 12px;
        color: #1d2326;
      }
    }
  }

  .type {
    width: 90%;
    height: 44px;
    border-radius: 22px;
    background-color: #f9f9f9;
    margin: auto;
    display: flex;
    align-items: center;
    position: relative;
    .item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
      color: rgba(29, 35, 38, 0.6);
      z-index: 2;
    }

    .item-active {
      z-index: 1;
      position: absolute;
      width: 50%;
      background-color: #fff;
      height: 38px;
      border-radius: 20px;
      transition: all 0.3s ease;
      left: 5px;
    }
  }

  .main {
    width: 90%;
    margin: auto;
    z-index: 3;

    padding-bottom: 100px;
    .tabs {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 10px;
      .item {
        padding: 4px 12px;
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.5);
        background-color: #f0f0f0;
        border-radius: 5px;
      }
      .item-active {
        padding: 4px 12px;
        font-weight: 600;
        font-size: 12px;
        color: #ec384a;
        background-color: #fff1ef;
        border-radius: 5px;
      }
    }

    .rank {
      display: flex;
      justify-content: space-evenly;
      padding-top: 35px;
      box-sizing: border-box;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        .rank-num {
          font-weight: 400;
          font-size: 12px;
          color: #1d2326;
          font-family: youshe;
        }
        .name {
          font-weight: 400;
          font-size: 14px;
          color: #242424;
        }
        .score {
          display: flex;
          border: 1px solid #f0f0f0;
          width: 100%;
          height: 20px;
          align-items: center;
          justify-content: space-evenly;
          .item {
            font-weight: 600;
            font-size: 10px;
            color: rgba(29, 35, 38, 0.5);
            &:first-child {
              border-right: 1px solid #f0f0f0;
            }
          }
        }

        .b1 {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          .b2 {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid #dedede;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .b3 {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: 2px solid #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          .b4 {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 2px solid #dedede;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }

    .first {
      margin-top: 4px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 82px;
      image {
        z-index: 1;
      }
      .item-first {
        margin-top: 10px;
        z-index: 2;
        width: 33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .name {
          font-weight: 600;
          font-size: 12px;
          color: #56829d;
        }
        .score {
          display: flex;
          align-items: center;
          gap: 5px;
          .left {
            font-weight: 600;
            font-size: 12px;
            color: #56829d;
            white-space: nowrap;
            padding: 2px;
          }
          .line {
            width: 1px;
            background-color: #56829d;
            height: 14px;
          }
          .right {
            font-weight: 600;
            font-size: 12px;
            color: #56829d;
            white-space: nowrap;

            padding: 2px;
          }
        }
      }

      .item-second {
        z-index: 2;
        width: 33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .name {
          font-weight: 600;
          font-size: 12px;
          color: #af4a4a;
        }
        .score {
          display: flex;
          align-items: center;
          gap: 5px;
          .left {
            font-weight: 600;
            font-size: 12px;
            color: #af4a4a;
            white-space: nowrap;
            padding: 2px;
          }
          .line {
            width: 1px;
            background-color: #af4a4a;
            height: 14px;
          }
          .right {
            font-weight: 600;
            font-size: 12px;
            color: #af4a4a;
            white-space: nowrap;

            padding: 2px;
          }
        }
      }

      .item-third {
        margin-top: 10px;
        z-index: 2;
        width: 33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .name {
          font-weight: 600;
          font-size: 12px;
          color: #a26e43;
        }
        .score {
          display: flex;
          align-items: center;
          gap: 5px;
          .left {
            font-weight: 600;
            font-size: 12px;
            color: #a26e43;
            white-space: nowrap;
            padding: 2px;
          }
          .line {
            width: 1px;
            background-color: #a26e43;
            height: 14px;
          }
          .right {
            font-weight: 600;
            font-size: 12px;
            color: #a26e43;
            white-space: nowrap;

            padding: 2px;
          }
        }
      }
    }

    .second {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 19px;
      .left {
        display: flex;
        gap: 17px;
        text {
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.5);
        }
      }
      .right {
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.5);
      }
    }

    .third {
      margin-top: 8px;
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        border-top: 1px solid #f0f0f0;
        box-sizing: border-box;
        .left {
          display: flex;
          align-items: center;
          gap: 24px;
          .i1 {
            font-weight: 800;
            font-size: 12px;
            color: #1d2326;
          }
          .i2 {
            display: flex;
            align-items: center;
            gap: 5px;
            font-weight: 400;
            font-size: 14px;
            color: #1d2326;
          }
        }

        .right {
          display: flex;
          align-items: center;
          font-weight: 400;
          font-size: 14px;
          color: rgba(29, 35, 38, 0.6);
          gap: 5px;

          .line {
            width: 1px;
            height: 14px;
            background-color: #f2f2f2;
            margin-top: 2px;
          }
        }
      }
    }
  }

  .bt {
    position: fixed;
    height: 84px;
    box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
    bottom: 0;
    width: 100%;
    z-index: 66;
    background-color: #fff;
    .item {
      width: 90%;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      border-top: 1px solid #f0f0f0;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        gap: 24px;
        .i1 {
          font-weight: 800;
          font-size: 12px;
          color: #1d2326;
        }
        .i2 {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 400;
          font-size: 14px;
          color: #1d2326;
        }
      }

      .right {
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 14px;
        color: rgba(29, 35, 38, 0.6);
        gap: 5px;

        .line {
          width: 1px;
          height: 14px;
          background-color: #f2f2f2;
          margin-top: 2px;
        }
      }
    }
  }
}
</style>
