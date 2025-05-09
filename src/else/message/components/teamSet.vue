<template>
  <view class="o-text">
    <view class="item" v-for="(item, index) in list" :key="index">
      <view class="left">{{ item.name }} <view class="icon">*</view></view>
      <view class="right" @click="onItemClick(item, index)"
        ><text :style="{ color: item.value ? 'black' : '' }">{{
          item.value || "去选择"
        }}</text>
        <u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
      </view>
    </view>
    <!-- <view class="item">
      <view class="left">队伍标签 <view class="icon">*</view></view>
      <view class="right" @click="toSaiShiProject"
        ><text :style="{ color: typeName ? 'black' : '' }">{{
          typeName || "去选择"
        }}</text>
        <u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
      </view>
    </view>
    <view class="item">
      <view class="left">集合时间 <view class="icon">*</view></view>
      <view class="right" @click="toSaiShiProject"
        ><text :style="{ color: typeName ? 'black' : '' }">{{
          typeName || "去选择"
        }}</text>
        <u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
      </view>
    </view>
    <view class="item">
      <view class="left">集合地点 <view class="icon">*</view></view>
      <view class="right" @click="toSaiShiProject"
        ><text :style="{ color: typeName ? 'black' : '' }">{{
          typeName || "去选择"
        }}</text>
        <u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
      </view>
    </view> -->
  </view>
</template>

<script>
export default {
  name: "teamSet",
  props: {
    value: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    timeValue: {
      type: String,
    },
  },
  emits: ["update:timeValue", "item-click"],
  data() {
    return {};
  },
  methods: {
    onItemClick(item, index) {
      this.$emit("item-click", { item, index });
    },
  },
};
</script>

<style lang="scss">
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
</style>
