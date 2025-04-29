<template>
  <view>
    <view class="tooltip" :style="zz == 2 || zz == 1 ? 'top:116%' : ''">
      <view class="t-first" v-if="tooltipState == 'first'">
        <view class="icon"></view>
        <view
          class="t-item"
          @tap.stop="
            zz == 6
              ? $emit('update-tooltip-state', 'sixth')
              : $emit('update-tooltip-state', 'second')
          "
          >晋级</view
        >
        <view
          class="t-item"
          @tap.stop="$emit('updateUserPromotion', user, item, '淘汰')"
          >淘汰</view
        >
        <view class="t-item" @tap.stop="$emit('update-tooltip-state', 'fourth')"
          >设置排名</view
        >
      </view>
      <view class="t-first" v-else-if="tooltipState == 'second'">
        <view class="icon" style="top: -16px"></view>
        <view class="title">晋级至 </view>
        <view
          class="t-item"
          v-for="(option, oIndex) in nextStageOptions"
          :key="oIndex"
          @tap.stop="$emit('updateUserPromotion', user, item, option)"
        >
          {{ option }}
        </view>
        <view class="t-item"> 无 </view>
      </view>
      <view class="t-first" v-else-if="tooltipState == 'third'">
        <view class="icon"></view>
        <view
          class="t-item"
          @click="$emit('removeUserPromotion', user, item, 'null')"
          >取消晋级</view
        >
      </view>
      <view class="t-first" v-else-if="tooltipState == 'fourth'">
        <view class="icon" style="top: -16px"></view>
        <view class="title">设置排名 </view>
        <view
          class="t-item"
          v-for="(rank, Rindex) in rankList"
          :key="Rindex"
          @tap.stop="$emit('updateUserRank', user, item, rank)"
        >
          {{ rank }}
        </view>
        <view
          class="t-item"
          @tap.stop="$emit('updateUserRank', user, item, '')"
        >
          无
        </view>
      </view>
      <view class="t-first" v-else-if="tooltipState == 'fifth'">
        <view class="icon"></view>
        <view
          class="t-item"
          @tap.stop="$emit('removeUserPromotion', user, item, 'null')"
          >取消淘汰
        </view>
      </view>
      <view class="t-first" v-else-if="tooltipState == 'second'">
        <view class="icon"></view>
        <view class="title">晋级至 </view>
        <view
          class="t-item"
          v-for="(option, oIndex) in nextStageOptions"
          :key="oIndex"
          @tap.stop="$emit('updateUserPromotion', user, item, option)"
        >
          {{ option }}
        </view>
        <view class="t-item"> 无 </view>
      </view>
      <view class="t-first" v-else-if="tooltipState == 'sixth'">
        <view class="icon" style="top: -16px"></view>
        <view class="title">晋级至 </view>
        <view
          class="t-item"
          v-for="(dou, dIndex) in doubleList"
          :key="dIndex"
          @tap.stop="$emit('updateUserPromotion', user, item, dou)"
        >
          {{ dou }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    user: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    tooltipState: {
      type: String,
      required: true,
    },
    nextStageOptions: {
      type: Array,
      required: true,
    },
    zz: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      rankList: ["8强", "第四名", "季军", "亚军", "冠军"],
      doubleList: ["双败赛胜者组", "双败赛败者组"],
    };
  },
};
</script>

<style lang="scss">
.tooltip {
  position: absolute;
  top: 145%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #232323;
  border-radius: 4px;
  padding: 0px 20px;
  z-index: 999;
  .t-first {
    position: relative;
    .icon {
      content: "";
      position: absolute;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 4px solid #232323;
      top: -4px;
      left: 45%;
      //   transform: translateX(-50%);
    }
    .t-item:nth-last-child(1) {
      border: none;
    }
    .t-item {
      width: 100%;
      font-weight: 600;
      font-size: 10px;
      color: #ffffff;
      border-bottom: 2rpx solid rgba(255, 255, 255, 0.5);
      white-space: nowrap;
      text-align: center;
      padding: 12px 0;
    }
    .title {
      font-weight: 600;
      font-size: 10px;
      color: rgba(255, 255, 255, 0.49);
      white-space: nowrap;
      position: relative;
      margin-top: 12px;
      text-align: center;
    }
  }
}
</style>
