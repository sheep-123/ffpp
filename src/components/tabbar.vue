<template>
  <view class="tabbar">
    <view
      v-for="(item, index) in tabList"
      :key="index"
      class="tabbar-item"
      :class="{ active: currentIndex === index }"
      @click="switchTab(index)"
    >
      <image
        :src="currentIndex === index ? item.selectedIconPath : item.iconPath"
        :style="
          index == 2 ? 'width: 44px; height: 44px' : 'width: 28px; height: 28px'
        "
        mode="widthFix"
      />
      <view class="tabbar-item-text">{{ item.text }}</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      tabList: [
        {
          text: "首页",
          iconPath: "/static/images/首页.png",
          selectedIconPath: "/static/images/首页选中.png",
          url: "/pages/index/index",
        },
        {
          text: "去玩",
          iconPath: "/static/images/去玩.png",
          selectedIconPath: "/static/images/去玩选中.png",
          url: "/pages/play/play",
        },
        {
          iconPath: "/static/images/发布.png",
          selectedIconPath: "/static/images/发布.png",
          url: "",
        },
        {
          text: "消息",
          iconPath: "/static/images/消息.png",
          selectedIconPath: "/static/images/消息选中.png",
          url: "/pages/message/message",
        },
        {
          text: "我的",
          iconPath: "/static/images/我的.png",
          selectedIconPath: "/static/images/我的选中.png",
          url: "/pages/user/user",
        },
      ],
    };
  },
  methods: {
    switchTab(index) {
      const path = this.list[index].pagePath;
      uni.switchTab({
        url: `/${path}`,
        success: () => {
          this.currentIndex = index;
        },
      });
    },
  },
};
</script>

<style lang="scss">
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  height: 84px;
  display: flex;
  justify-content: space-around;
  font-weight: 600;
  font-size: 10px;
  color: #1d2326;
  .tabbar-item {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
