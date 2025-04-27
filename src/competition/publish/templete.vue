<template>
  <view>
    <u-navbar leftText="赛事模版" autoBack :fixed="false"></u-navbar>
    <view class="main">
      <view class="content" v-if="list.length > 0">
        <view class="title"> 标准极限飞盘赛制（竞技向） </view>
        <view class="c-item">
          <view
            :class="
              selectIndex == index || templateId == item.templateId
                ? 'item-active'
                : 'item'
            "
            v-for="(item, index) in list"
            :key="index"
            @click="selectItem(item, index)"
          >
            {{ item.templateName }}
            <u-icon
              name="checkmark"
              size="15"
              v-if="index == selectIndex || templateId == item.templateId"
              color="#EC384A"
            ></u-icon>
            <u-icon name="plus-circle" size="15" v-else></u-icon>
          </view>
        </view>
      </view>
      <u-empty v-else></u-empty>
    </view>
    <bt @onConfirm="enter"></bt>
    <u-toast ref="notice"></u-toast>
  </view>
</template>

<script>
export default {
  data() {
    return {
      labelId: 0,
      list: [],
      selectIndex: null,
      templateId: "",
      templateName: "",
    };
  },
  methods: {
    async getList() {
      const res = await uni.$u.http.get("/match/getMatchTemplateMain", {
        params: { labelId: this.labelId },
      });
      this.list = res.data;
    },
    selectItem(item, index) {
      this.selectIndex = index;
      this.templateId = item.templateId;
      this.templateName = item.templateName;
    },
    async enter() {
      try {
        var result = await uni.$u.http.get(
          "/match/getMatchTemplateRegisterInfo",
          {
            params: { templateId: this.templateId },
          }
        );
        if (result.status == 200) {
          uni.setStorageSync("entryFee", result.data.entryFee);
          uni.setStorageSync("genderLimit", result.data.genderLimit);
          uni.setStorageSync("number", result.data.registerNum);
          uni.setStorageSync("way", result.data.way);
          uni.setStorageSync("templateId", this.templateId);
          uni.setStorageSync("templateName", this.templateName);
          uni.navigateBack({ delta: 1 });
        }
      } catch (err) {
        this.$refs.notice.show({
          type: "default",
          message: err.message,
        });
      }
    },
  },
  onShow() {
    this.labelId = uni.getStorageSync("labelId") || "";
    this.getList();
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
  height: 88px;
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
