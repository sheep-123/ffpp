<template>
  <view>
    <view
      class="select"
      v-if="scoringMethod == 1"
      @click="$emit('showSc', user, item)"
    >
      {{ user.userScore || "积分" }}
      <view class="icon"></view>
    </view>
    <view class="time" v-else-if="scoringMethod == 2">
      3 <text>时</text> 23<text>分</text> 08 <text>秒</text>
    </view>
    <view class="time" v-else-if="scoringMethod == 3">
      <input
        type="number"
        placeholder="0"
        v-model="user.userScore"
        style="width: 15px"
        @input="handleInput"
        @confirm="$emit('updateUserScore', user, item)"
      />
      <text>米</text>
    </view>
    <view class="time" v-else-if="scoringMethod == 4">
      <input
        type="number"
        placeholder="0"
        v-model="user.userScore"
        style="width: 15px"
        @input="handleInput"
        @confirm="$emit('updateUserScore', user, item)"
      />
      <text>分</text>
    </view>
    <view class="time" v-else-if="scoringMethod == 5">
      <input
        type="number"
        placeholder="0"
        v-model="user.userScore"
        style="width: 15px"
        @input="handleInput"
        @confirm="$emit('updateUserScore', user, item)"
      />
      <text>千克</text>
    </view>
    <!-- <view class="select" v-if="scoringMethod == 6">
    设置
    <view class="icon"></view>
  </view> -->
  </view>
</template>

<script>
export default {
  name: "Sorce",
  props: {
    user: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    scoringMethod: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleInput(e) {
      const value = e.detail.value;
      // 发送更新事件到父组件
      this.$emit("input", {
        ...this.user,
        userScore: value,
      });
    },
  },
};
</script>

<style lang="scss">
.time {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  background-color: white;
  font-weight: 600;
  font-size: 12px;
  color: #1d2326;
  border-radius: 4px;
  margin-top: 8px;
  text {
    font-weight: 600;
    font-size: 12px;
    color: rgba(29, 35, 38, 0.3);
  }
}
.select {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  background-color: white;
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
  color: #1d2326;
  margin-top: 8px;
  .icon {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid black;
  }
}
</style>
