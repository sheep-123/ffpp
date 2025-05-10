<template>
  <view class="box">
    <u-navbar :fixed="false" leftText="快速组队" autoBack> </u-navbar>
    <view class="main">
      <teamSet :list="list" @item-click="handleItemClick"></teamSet>
      <view class="member">
        <view class="item">
          <view class="avatar">
            <u-avatar :src="src" size="40"></u-avatar>
            <view class="icon">队长</view>
          </view>
          <view class="name">昵称</view>
        </view>
        <view class="item" @click="show = true">
          <u-icon name="plus-circle-fill" size="40" color="#F0F0F0"></u-icon>
        </view>
        <view class="item">
          <u-icon name="plus-circle-fill" size="40" color="#F0F0F0"></u-icon>
        </view>
        <view class="item">
          <u-icon name="plus-circle-fill" size="40" color="#F0F0F0"></u-icon>
        </view>
        <view class="item">
          <u-icon name="plus-circle-fill" size="40" color="#F0F0F0"></u-icon>
        </view>
        <view class="item">
          <u-icon name="plus-circle-fill" size="40" color="#F0F0F0"></u-icon>
        </view>
        <view class="item">
          <u-icon name="plus-circle-fill" size="40" color="#F0F0F0"></u-icon>
        </view>
        <view class="item">
          <u-icon name="plus-circle-fill" size="40" color="#F0F0F0"></u-icon>
        </view>
        <view class="item">
          <u-icon name="plus-circle-fill" size="40" color="#F0F0F0"></u-icon>
        </view>
      </view>
      <view class="send">发布组队</view>
      <view class="invite">邀请微信好友</view>
    </view>
    <u-popup
      :show="show"
      mode="bottom"
      @close="show = false"
      @open="open"
      :round="10"
    >
      <view class="people">
        <view class="title">
          <view></view>
          好友列表
          <text @click="show = false">取消</text>
        </view>
        <view class="p-content">
          <view class="item">
            <view class="left">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="dian"></view>
              </view>
              <view class="v">
                <view class="v1">爱足球爱睡觉</view>
                <view class="v2">空闲中</view>
              </view>
            </view>
            <view class="right">
              <view class="wx">微信邀请</view>
              <view class="invite">邀请入队</view>
            </view>
          </view>
          <view class="item">
            <view class="left">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="dian"></view>
              </view>
              <view class="v">
                <view class="v1">爱足球爱睡觉</view>
                <view class="v2">空闲中</view>
              </view>
            </view>
            <view class="right">
              <view class="wx">微信邀请</view>
              <view class="invite">邀请入队</view>
            </view>
          </view>
          <view class="item">
            <view class="left">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="dian"></view>
              </view>
              <view class="v">
                <view class="v1">爱足球爱睡觉</view>
                <view class="v2">空闲中</view>
              </view>
            </view>
            <view class="right">
              <view class="wx">微信邀请</view>
              <view class="invite">邀请入队</view>
            </view>
          </view>
          <view class="item">
            <view class="left">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="dian"></view>
              </view>
              <view class="v">
                <view class="v1">爱足球爱睡觉</view>
                <view class="v2">空闲中</view>
              </view>
            </view>
            <view class="right">
              <view class="wx">微信邀请</view>
              <view class="invite">邀请入队</view>
            </view>
          </view>
          <view class="item">
            <view class="left">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="dian"></view>
              </view>
              <view class="v">
                <view class="v1">爱足球爱睡觉</view>
                <view class="v2">空闲中</view>
              </view>
            </view>
            <view class="right">
              <view class="wx">微信邀请</view>
              <view class="invite">邀请入队</view>
            </view>
          </view>
          <view class="item">
            <view class="left">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="dian"></view>
              </view>
              <view class="v">
                <view class="v1">爱足球爱睡觉</view>
                <view class="v2">空闲中</view>
              </view>
            </view>
            <view class="right">
              <view class="wx">微信邀请</view>
              <view class="invite">邀请入队</view>
            </view>
          </view>
          <view class="item">
            <view class="left">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="dian"></view>
              </view>
              <view class="v">
                <view class="v1">爱足球爱睡觉</view>
                <view class="v2">空闲中</view>
              </view>
            </view>
            <view class="right">
              <view class="wx">微信邀请</view>
              <view class="invite">邀请入队</view>
            </view>
          </view>
          <view class="item">
            <view class="left">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="dian"></view>
              </view>
              <view class="v">
                <view class="v1">爱足球爱睡觉</view>
                <view class="v2">空闲中</view>
              </view>
            </view>
            <view class="right">
              <view class="wx">微信邀请</view>
              <view class="invite">邀请入队</view>
            </view>
          </view>
          <view class="item">
            <view class="left">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="dian"></view>
              </view>
              <view class="v">
                <view class="v1">爱足球爱睡觉</view>
                <view class="v2">空闲中</view>
              </view>
            </view>
            <view class="right">
              <view class="wx">微信邀请</view>
              <view class="invite">邀请入队</view>
            </view>
          </view>
          <view class="item">
            <view class="left">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="dian"></view>
              </view>
              <view class="v">
                <view class="v1">爱足球爱睡觉</view>
                <view class="v2">空闲中</view>
              </view>
            </view>
            <view class="right">
              <view class="wx">微信邀请</view>
              <view class="invite">邀请入队</view>
            </view>
          </view>
          <view class="item">
            <view class="left">
              <view class="avatar">
                <u-avatar :src="src" size="40"></u-avatar>
                <view class="dian"></view>
              </view>
              <view class="v">
                <view class="v1">爱足球爱睡觉</view>
                <view class="v2">空闲中</view>
              </view>
            </view>
            <view class="right">
              <view class="wx">微信邀请</view>
              <view class="invite">邀请入队</view>
            </view>
          </view>
        </view>
      </view>
    </u-popup>
    <u-picker
      :show="show1"
      ref="uPicker"
      :columns="columns"
      @confirm="confirm"
    ></u-picker>
    <u-datetime-picker
      :show="show2"
      v-model="selectedTime"
      mode="datetime"
      @confirm="handleConfirm"
      @cancel="show2 = false"
    ></u-datetime-picker>
  </view>
</template>

<script>
import teamSet from "./components/teamSet.vue";
export default {
  components: { teamSet },
  data() {
    return {
      show: false,
      show1: false,
      show2: false,
      selectItem: null,
      columns: [],
      list: [
        {
          name: "队伍人数",
          column: [["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]],
          type: "select",
        },
        {
          name: "运动类型",
          type: "select",
          column: [["足球", "篮球", "乒乓球"]],
        },
        { name: "集合时间", type: "time" },
        { name: "集合地点", type: "address" },
      ],
      selectedTime: Date.now(),
    };
  },
  methods: {
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },
    handleItemClick({ item, index }) {
      this.selectItem = index;
      switch (item.type) {
        case "time":
          this.show2 = true;
          break;
        case "select":
          this.show1 = true;
          this.columns = item.column;
          break;
        case "address":
          uni.chooseLocation({
            success: (res) => {
              this.$set(this.list[this.selectItem], "value", res.address);
            },
            fail: function () {},
            complete: function () {},
          });
          break;
      }
    },
    formatTime(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    handleConfirm(n) {
      const time = n.value;
      this.list[this.selectItem].value = this.formatTime(time);
      this.show2 = false;
    },
    confirm(n) {
      this.list[this.selectItem].value = n.value[0];
      this.show1 = false;
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100%;
  height: 100vh;
  .nav {
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 600;
    font-size: 16px;
    color: #1d2326;
  }
  .main {
    width: 90%;
    margin: auto;
    .o-text {
      width: 100%;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      .item {
        width: 100%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0px;
        border-bottom: 1px solid #f0f0f0;

        .left {
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
          display: flex;
          align-items: center;
          gap: 5px;

          .wh {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #4aa9df;
            border: 1px solid gray;
            background-color: #f2f7ff;
            font-size: 10px;
          }

          .icon {
            color: #ec384a;
          }
        }

        .right {
          display: flex;
          align-items: center;
          gap: 2px;

          text {
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
          }

          .input {
            width: 120px;
            display: flex;
            align-items: center;
          }
        }
        .right-r {
          display: flex;
          align-items: center;
          gap: 2px;

          text {
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
          }
        }
      }

      .item-o {
        width: 90%;
        margin: auto;
        display: flex;
        flex-direction: column;
        padding: 16px 0px;
        border-bottom: 1px solid #f0f0f0;
        gap: 10px;

        .right-y {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 400;
          font-size: 14px;
          color: rgba(29, 35, 38, 0.3);
        }

        .top {
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 5px;

          .wh {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #4aa9df;
            border: 1px solid gray;
            background-color: #f2f7ff;
            font-size: 10px;
          }

          .icon {
            color: #ec384a;
          }
        }

        .bt {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2px;
          font-weight: 400;
          font-size: 14px;
          color: #1d2326;
          .left {
            .l2 {
              display: flex;
              align-items: center;
              gap: 5px;
            }
          }
          .right {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .r2 {
              display: flex;
              align-items: center;
              gap: 5px;
            }
          }
        }

        .bt-radio {
          width: 100%;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          font-weight: 400;
          font-size: 14px;
          color: #1d2326;
          justify-content: flex-start;
          .item-radio {
            width: 25%;
            border: none;
            padding-bottom: 10px;
          }
          .right {
            display: flex;
            justify-content: flex-end;
          }
        }

        .left {
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
          display: flex;
          align-items: center;
          gap: 5px;
          //不换行
          white-space: nowrap;

          .wh {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #4aa9df;
            border: 1px solid gray;
            background-color: #f2f7ff;
            font-size: 10px;
          }

          .icon {
            color: #ec384a;
          }
        }

        .left-l {
          font-weight: 400;
          font-size: 14px;
          color: #1d2326;
          display: flex;
          align-items: center;
          gap: 5px;
          //不换行
          white-space: nowrap;
          width: 40%;
          justify-content: space-between;
          .l2 {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .wh {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #4aa9df;
            border: 1px solid gray;
            background-color: #f2f7ff;
            font-size: 10px;
          }

          .icon {
            color: #ec384a;
          }
        }

        .right {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 2px;

          .r1 {
            white-space: nowrap;
          }

          .time {
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
            width: 49%;
          }

          text {
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
          }

          .input {
            width: 120px;
          }
        }
        .right-l {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 40%;

          .r1 {
            white-space: nowrap;
          }
          .r2 {
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .time {
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
            width: 49%;
          }

          text {
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
          }

          .input {
            width: 120px;
          }
        }
        .right-r {
          display: flex;
          align-items: center;
          gap: 2px;

          text {
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
          }
        }
      }
    }
    .member {
      display: grid;
      grid-template-columns: repeat(5, auto); // 每行最多 5 列，列宽自适应
      gap: 10px; // 设置间距
      margin-top: 28px;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
        .avatar {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          .icon {
            position: absolute;
            top: 0;
            right: -10px;
            font-weight: 600;
            font-size: 10px;
            color: #ffffff;
            background-color: #ec384a;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
            border-bottom-left-radius: 15px;
            padding: 2px 4px;
          }
        }
        .name {
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.5);
        }
      }
    }
    .send {
      position: absolute;
      top: 85%;
      width: 80%;
      left: 50%;
      transform: translateX(-50%);
      height: 44px;
      border-radius: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 16px;
      color: #ffffff;
      background-color: black;
    }
    .invite {
      position: absolute;
      top: 92%;
      width: 60%;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 400;
      font-size: 16px;
      color: rgba(29, 35, 38, 0.5);
    }
  }
}
.people {
  height: 600px;
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 16px;
    color: #1d2326;
    margin-top: 16px;
    text {
      font-weight: 400;
      font-size: 16px;
      color: #1d2326;
    }
  }
  .p-content {
    margin-top: 16px;
    overflow-y: scroll;
    flex: 1;
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f0f0f0;
      padding: 12px 0;
      .left {
        display: flex;
        align-items: center;
        gap: 10px;
        .avatar {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          .dian {
            position: absolute;
            top: 0;
            right: 2px;
            width: 8px;
            height: 8px;
            background-color: #06b66c;
            border-radius: 50%;
          }
        }
        .v {
          display: flex;
          gap: 5px;
          flex-direction: column;

          .v1 {
            font-weight: 600;
            font-size: 14px;
            color: #1d2326;
          }
          .v2 {
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.6);
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        gap: 12px;

        .wx {
          font-weight: 400;
          font-size: 12px;
          color: #1d2326;
          padding: 6px 14px;
          border: 1px solid #f0f0f0;
          border-radius: 22px;
        }

        .invite {
          font-weight: 600;
          font-size: 12px;
          color: #ffffff;
          padding: 6px 14px;
          border: 1px solid #f0f0f0;
          border-radius: 22px;
          background-color: #ec384a;
        }
      }
    }
  }
}
</style>
