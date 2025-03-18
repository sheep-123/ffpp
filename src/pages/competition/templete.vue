<template>
  <view>
    <u-navbar leftText="赛事模版" @leftClick="back"></u-navbar>
    <view class="main" :style="{ marginTop: top }">
      <view class="content" v-if="list.length > 0">
        <view class="title"> 标准极限飞盘赛制（竞技向） </view>
        <view class="c-item">
          <view
            :class="selectIndex == index ? 'item-active' : 'item'"
            v-for="(item, index) in list"
            :key="index"
            @click="selectItem(item, index)"
          >
            {{ item.templateName }}
            <u-icon
              name="checkmark"
              size="15"
              v-if="index == selectIndex"
              color="#EC384A"
            ></u-icon>
            <u-icon name="plus-circle" size="15" v-else></u-icon>
          </view>
        </view>
      </view>
      <u-empty v-else></u-empty>
    </view>
    <view class="bt" v-if="list.length > 0">
      <view class="enter" @click="enter">确认选择</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      statusBarHeight: 0,
      navbarHeight: 44,
      labelId: 0,
      list: [],
      selectIndex: null,
      templateId: null,
      templateName: null,
    };
  },
  methods: {
    back() {
      uni.navigateBack();
    },
    async getList() {
      const res = await uni.$u.http.get("/match/searchTemplate", {
        params: { labelId: this.labelId },
      });
      this.list = res.data;
    },
    selectItem(item, index) {
      this.selectIndex = index;
      this.templateId = item.id;
      this.templateName = item.templateName;
      console.log(this.templateId);
    },
    enter() {
      uni.setStorageSync("templateId",this.templateId)
      uni.setStorageSync("templateName",this.templateName)
      uni.navigateTo({
        url: `/pages/competition/saishi`,
      });
    },
  },
  onShow() {
    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const labelId = currentPage.options.labelId || 0;
    this.labelId = labelId;
    this.getList();
  },
  computed: {
    top() {
      return this.statusBarHeight + this.navbarHeight + 20 + "px";
    },
  },
};
</script>

<style lang="scss">
.main {
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .title {
      font-weight: 400;
      font-size: 12px;
      color: rgba(29, 35, 38, 0.5);
    }
    .c-item {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 12px;
      .item {
        display: flex;
        gap: 5px;
        font-weight: 400;
        font-size: 14px;
        color: #1d2326;
        background-color: #f8f8f8;
        padding: 10px 12px;
        align-items: center;
        justify-content: center;
      }
      .item-active {
        display: flex;
        gap: 5px;
        font-weight: 400;
        font-size: 14px;
        color: #ec384a;
        background-color: #fcdfe2;
        padding: 10px 12px;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.bt {
  position: fixed;
  bottom: 0;
  height: 102px;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  .enter {
    width: 80%;
    background-color: black;
    height: 44px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    margin: 12px auto;
  }
}
</style>
