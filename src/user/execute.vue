<template>
  <view class="box">
    <u-navbar
      autoBack
      leftText="赛事执行"
      :fixed="false"
      bgColor="#1b4ca7"
      leftIconColor="#fff"
    >
    </u-navbar>
    <view style="margin-left: 5%">
      <u-scroll-list :indicator="false">
        <view class="tick">
          <view
            v-for="(item, index) in gameList"
            :key="index"
            :class="op == index ? 'item-a' : 'item'"
            @click="checkThis(index)"
          >
            {{ item.scheTypeName }}
          </view>
        </view>
      </u-scroll-list>
    </view>

    <view class="main">
      <view class="jdsz"
        >阶段设置<u-icon name="arrow-down-fill" color="#fff" size="10"></u-icon
      ></view>

      <view class="pp-content">
        <view class="first">
          <view class="left">
            组名
            <view class="h">1组</view>
          </view>
          <view class="judge">
            <u-avatar :src="src" size="60"></u-avatar>
            <view class="name">裁判员</view>
          </view>
        </view>
        <view class="second">
          <view class="left">比赛场地 <view class="icon">*</view></view>
          <view class="right"
            >天河体育中心羽毛球馆<u-icon
              name="arrow-right"
              color="#CCCCCC"
              size="12"
            ></u-icon
          ></view>
        </view>
        <view class="second">
          <view class="left">比赛时间 <view class="icon">*</view></view>
          <view class="right"
            >10月12日 14:00<u-icon
              name="arrow-right"
              color="#CCCCCC"
              size="12"
            ></u-icon
          ></view>
        </view>
        <view class="third">
          <view class="left">直播地址 </view>
          <view class="right">https://v.douyin.com/iA23Phvv/7@7.com :9pm</view>
        </view>
        <view class="member">
          <view
            v-for="(item, index) in memberList"
            :key="index"
            class="item"
            @click="toggleTooltip(index)"
          >
            <view class="avatar">
              <u-avatar :src="item.avatar" size="40"></u-avatar>
              <view class="rank">{{ item.rank }}</view>
            </view>
            <view class="grade" v-if="way == 2">积分0</view>
            <view class="select" v-if="way == 1">
              {{ item.score }}
              <u-icon name="arrow-down-fill" color="black" size="8"></u-icon>
            </view>

            <!-- 自定义 Tooltip -->
            <view v-if="showTooltipIndex === index" class="custom-tooltip">
              <view class="tooltip-title">标题</view>
              <view class="tooltip-options">
                <view
                  v-for="(option, idx) in tooltipOptions"
                  :key="idx"
                  class="tooltip-option"
                  @click.stop="handleOptionClick(option)"
                >
                  {{ option }}
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="bt" v-if="way == 1"> 确认比赛结果 </view>
        <view v-if="way == 2">
          <u-divider text="对战详情"></u-divider>
          <view class="item-list" v-show="expand">
            <view class="detail">
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="item.avatar" size="40"></u-avatar>
                  <view class="rank">A01</view>
                </view>
                <view class="grade">积分0</view>
              </view>
              VS
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="item.avatar" size="40"></u-avatar>
                  <view class="rank">A01</view>
                </view>
                <view class="grade">积分0</view>
              </view>
              <view class="chang">第1场</view>
            </view>
            <view class="next">
              <view class="left">比赛时间 <view class="icon">*</view></view>
              <view class="right"
                >10月12日 14:00-17:00
                <u-icon name="arrow-right" size="10"></u-icon
              ></view>
            </view>
          </view>
          <view class="item-list" v-show="expand">
            <view class="detail">
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="item.avatar" size="40"></u-avatar>
                  <view class="rank">A01</view>
                </view>
                <view class="grade">积分0</view>
              </view>
              VS
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="item.avatar" size="40"></u-avatar>
                  <view class="rank">A01</view>
                </view>
                <view class="grade">积分0</view>
              </view>
              <view class="chang">第1场</view>
            </view>
            <view class="next">
              <view class="left">比赛时间 <view class="icon">*</view></view>
              <view class="right"
                >10月12日 14:00-17:00
                <u-icon name="arrow-right" size="10"></u-icon
              ></view>
            </view>
          </view>
          <view class="item-list" v-show="expand">
            <view class="detail">
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="item.avatar" size="40"></u-avatar>
                  <view class="rank">A01</view>
                </view>
                <view class="grade">积分0</view>
              </view>
              VS
              <view class="item">
                <view class="avatar">
                  <u-avatar :src="item.avatar" size="40"></u-avatar>
                  <view class="rank">A01</view>
                </view>
                <view class="grade">积分0</view>
              </view>
              <view class="chang">第1场</view>
            </view>
            <view class="next">
              <view class="left">比赛时间 <view class="icon">*</view></view>
              <view class="right"
                >10月12日 14:00-17:00
                <u-icon name="arrow-right" size="10"></u-icon
              ></view>
            </view>
          </view>

          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/卡片展开.png"
            mode="scaleToFill"
            style="width: 80px; height: 16px; margin: auto; display: block"
            @click="expand = true"
            v-if="!expand"
          />
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/卡片收起.png"
            mode="scaleToFill"
            style="width: 80px; height: 16px; margin: auto; display: block"
            @click="expand = false"
            v-else
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      op: 0,
      gameList: [
        {
          scheTypeName: "赛制设置",
        },
        {
          scheTypeName: "赛制模板",
        },
        {
          scheTypeName: "赛制分组",
        },
        {
          scheTypeName: "赛制分组",
        },
        {
          scheTypeName: "赛制分组",
        },
      ],
      showTooltipIndex: null, // 当前显示 tooltip 的索引
      tooltipOptions: ["选项1", "选项2", "选项3"], // tooltip 的选项内容
      memberList: [
        { avatar: "https://example.com/avatar1.jpg", rank: "A01", score: "3" },
        { avatar: "https://example.com/avatar2.jpg", rank: "A02", score: "3" },
        { avatar: "https://example.com/avatar3.jpg", rank: "A03", score: "3" },
        { avatar: "https://example.com/avatar4.jpg", rank: "A04", score: "3" },
      ],
      way: 2, //，1-不知道  2-单循环
      expand: false,
    };
  },
  methods: {
    toggleTooltip(index) {
      // 切换 tooltip 显示状态
      this.showTooltipIndex = index;
      console.log(index);
    },
    handleOptionClick(option) {
      this.showTooltipIndex = null; // 隐藏 tooltip
    },
    checkThis(index) {
      this.op = index;
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #1b4ca7;
}
.box {
  width: 100vw;
  padding-bottom: 50px;
  background-color: #1b4ca7;
  .tick {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
    .item-a {
      background-color: black;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 12px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 12px;
      color: #ffffff;
      white-space: nowrap;
      box-sizing: border-box;
    }
    .item {
      white-space: nowrap;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px 12px;
      border-radius: 20px;
      font-weight: 400;
      font-size: 12px;
      color: rgba(29, 35, 38, 0.5);
      box-sizing: border-box;
    }
  }
  .main {
    width: 90%;
    margin: auto;
    .jdsz {
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 600;
      font-size: 14px;
      color: #ffffff;
    }
    .pp-content {
      background-color: #fff;
      padding: 12px 12px 0 12px;
      box-sizing: border-box;
      border-radius: 10px;
      margin-top: 22px;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1),
        -5px -5px 10px rgba(0, 0, 0, 0.1);
      .first {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
          display: flex;
          align-items: center;
          width: 50%;
          justify-content: space-between;
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 11px;
          .h {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f5f5f5;
            width: 50%;
            height: 32px;
            font-weight: 400;
            font-size: 14px;
            color: #1d2326;
          }
        }
        .judge {
          margin-top: -40px;
          position: relative;
          .name {
            position: absolute;
            font-weight: 400;
            font-size: 12px;
            color: #ffffff;
            left: 50%;
            transform: translateX(-50%);
            background-color: black;
            white-space: nowrap;
            padding: 3px 5px;
            clip-path: polygon(5% 0, 100% 0, 95% 100%, 0 100%);
            bottom: -10px;
          }
        }
      }
      .second {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #f0f0f0;
        .left {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
          .icon {
            color: red;
          }
        }
        .right {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 400;
          font-size: 14px;
          color: #1d2326;
        }
      }
      .third {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;
        box-sizing: border-box;
        .left {
          white-space: nowrap;
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
        }
        .right {
          font-weight: 400;
          font-size: 10px;
          color: #1d2326;
        }
      }
      .member {
        display: flex;
        align-items: center;
        height: 83px;
        background-color: #f7f7f7;
        margin-top: 5px;
        justify-content: space-around;
        .item:nth-last-child(1) {
          border: none;
        }

        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          border-right: 1px solid #e6e6e6;
          flex: 1;
          position: relative;
          .avatar {
            position: relative;
            .rank {
              position: absolute;
              bottom: -5px;
              left: 50%;
              transform: translateX(-50%);
              background-color: white;
              width: 40px;
              height: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 400;
              font-size: 12px;
              color: #ec384a;
            }
          }
          .grade {
            font-weight: 400;
            font-size: 10px;
            color: rgba(29, 35, 38, 0.5);
            margin-top: 5px;
          }
          .select {
            display: flex;
            align-items: center;
            gap: 5px;
            background-color: #fff;
            padding: 4px 8px;
            box-sizing: border-box;
            font-weight: 600;
            font-size: 12px;
            color: #000000;
            margin-top: 8px;
          }
          .custom-tooltip {
            position: absolute;
            top: 70%; // 向下显示
            left: 50%;
            transform: translateX(-50%);
            background-color: black;
            color: white;
            border-radius: 5px;
            padding: 16px 16px 0 16px;
            width: 72px;
            z-index: 999;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            box-sizing: border-box;
            text-align: center;

            .tooltip-title {
              font-weight: 600;
              font-size: 10px;
              color: rgba(255, 255, 255, 0.49);
              position: relative;
              &::after {
                position: absolute;
                content: "";
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 5px solid black;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
              }
            }

            .tooltip-options {
              display: flex;
              flex-direction: column;
              gap: 6px;
              white-space: nowrap;
              .tooltip-option:nth-last-child(1) {
                border-bottom: none;
              }
              .tooltip-option {
                font-weight: 600;
                font-size: 10px;
                color: #ffffff;
                cursor: pointer;
                padding: 12px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.5);

                &:hover {
                  background-color: #333;
                }
              }
            }
          }
        }
      }
      .bt {
        box-sizing: border-box;
        border-radius: 22px;
        font-weight: 400;
        font-size: 14px;
        color: #15181a;
        border: 1px solid #e6e6e6;
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        margin: auto;
        margin-top: 11px;
      }

      .item-list {
        border-bottom: 1px solid #f0f0f0;
        margin-bottom: 18px;
        .detail {
          display: flex;
          align-items: center;
          justify-content: space-around;
          background-color: #f7f7f7;
          height: 90px;
          position: relative;
          padding: 0px 20px;
          box-sizing: border-box;
          .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            position: relative;
            .avatar {
              position: relative;
              .rank {
                position: absolute;
                bottom: -5px;
                left: 50%;
                transform: translateX(-50%);
                background-color: white;
                width: 40px;
                height: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 400;
                font-size: 12px;
                color: #ec384a;
              }
            }
            .grade {
              font-weight: 400;
              font-size: 10px;
              color: rgba(29, 35, 38, 0.5);
              margin-top: 10px;
            }
          }
          .chang {
            position: absolute;
            top: 0;
            left: 0;
            background-color: red;
            font-weight: 600;
            font-size: 12px;
            color: #ffffff;
            padding: 2px 6px;
          }
        }
        .next {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          .left {
            display: flex;
            align-items: center;
            gap: 5px;
            font-weight: 600;
            font-size: 14px;
            color: #1d2326;
            .icon {
              color: red;
            }
          }
          .right {
            display: flex;
            align-items: center;
            gap: 5px;
            font-weight: 400;
            font-size: 14px;
            color: #1d2326;
          }
        }
      }
    }
  }
}
</style>
