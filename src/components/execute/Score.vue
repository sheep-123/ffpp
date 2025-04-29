<template>
  <view>
    <!-- <view
      class="select"
      v-if="scoringMethod == 1"
      @click="$emit('showZk', user, item)"
    >
      {{ user.userScore || "积分" }}
      <view class="icon"></view>
    </view>
    <view
      class="time"
      v-else-if="scoringMethod == 2"
      @click="showTimePicker = true"
    >
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
    </view> -->
    <!-- <view class="select" v-if="scoringMethod == 6">
    设置
    <view class="icon"></view>
  </view> -->
    <view v-if="value === 'homeUserScore'">
      <view
        class="select"
        v-if="scoringMethod == 1"
        @click="$emit('showZk', value, war)"
      >
        {{ war.homeUserScore || "积分" }}
        <view class="icon"></view>
      </view>

      <view
        class="time"
        v-else-if="scoringMethod == 2"
        @click="$emit('showTimePicker', value, war)"
      >
        <!-- 3 <text>时</text> 23<text>分</text> 08 <text>秒</text> -->
        {{ war.homeUserScore }}
      </view>
      <view class="time" v-else-if="scoringMethod == 3">
        <input
          type="number"
          placeholder="0"
          v-model="war.homeUserScore"
          style="width: 15px"
          @input="handleInputHome"
          @confirm="$emit('updateHomeUserScore', war)"
        />
        <text>米</text>
      </view>
      <view class="time" v-else-if="scoringMethod == 4">
        <input
          type="number"
          placeholder="0"
          v-model="war.homeUserScore"
          style="width: 15px"
          @input="handleInputHome"
          @confirm="$emit('updateHomeUserScore')"
        />
        <text>分</text>
      </view>
      <view class="time" v-else-if="scoringMethod == 5">
        <input
          type="number"
          placeholder="0"
          v-model="war.homeUserScore"
          style="width: 15px"
          @input="handleInputHome"
          @confirm="$emit('updateHomeUserScore')"
        />
        <text>千克</text>
      </view>
    </view>
    <view v-else>
      <view
        class="select"
        v-if="scoringMethod == 1"
        @click="$emit('showZk', value, war)"
      >
        {{ war.awayUserScore || "积分" }}
        <view class="icon"></view>
      </view>
      <view
        class="time"
        v-else-if="scoringMethod == 2"
        @click="$emit('showTimePicker', value, war)"
      >
        <!-- 3 <text>时</text> 23<text>分</text> 08 <text>秒</text> -->
        {{ war.awayUserScore }}
      </view>
      <view class="time" v-else-if="scoringMethod == 3">
        <input
          type="number"
          placeholder="0"
          v-model="war.awayUserScore"
          style="width: 15px"
          @input="handleInputAway"
          @confirm="$emit('updateAwayUserScore')"
        />
        <text>米</text>
      </view>
      <view class="time" v-else-if="scoringMethod == 4">
        <input
          type="number"
          placeholder="0"
          v-model="war.awayUserScore"
          style="width: 15px"
          @input="handleInputAway"
          @confirm="$emit('updateAwayUserScore')"
        />
        <text>分</text>
      </view>
      <view class="time" v-else-if="scoringMethod == 5">
        <input
          type="number"
          placeholder="0"
          v-model="war.awayUserScore"
          style="width: 15px"
          @input="handleInputAway"
          @confirm="$emit('updateAwayUserScore')"
        />
        <text>千克</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "Score",
  props: {
    war: {
      type: Object,
      required: true,
      default: () => null,
    },
    scoringMethod: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleInputHome(e) {
      const value = e.detail.value;
      // 发送更新事件到父组件
      this.$emit("inputHome", {
        homeUserScore: value,
      });
    },
    handleInputAway(e) {
      const value = e.detail.value;
      // 发送更新事件到父组件
      this.$emit("inputHome", {
        awayUserScore: value,
      });
    },
    handleTimeChange(time) {
      this.$emit("updateUserTime", { ...this.user, userScore: time });
    },
  },
  data() {
    return {
      showTimePicker: false,
    };
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
