<template>
  <view class="box">
    <u-navbar leftText="赛事项目" autoBack :fixed="false"></u-navbar>

    <view class="main">
      <view class="type">
        <view
          :class="typeId == item.id ? 'item-action' : 'item'"
          v-for="(item, index) in typeList"
          :key="index"
          @click="change(item)"
          >{{ item.typeName }}
        </view>
      </view>

      <view class="content">
        <view
          v-for="(item, index) in selectList"
          :key="index"
          @click="selectItem(item, index)"
          :class="[
            'item',
            { 'item-active': index == selectIndex || labelId == item.labelId },
          ]"
        >
          {{ item.labelName }}
          <u-icon
            name="checkmark"
            size="15"
            color="#EC384A"
            v-if="index == selectIndex || labelId == item.labelId"
          ></u-icon>
          <u-icon name="plus-circle" size="15" v-else></u-icon>
        </view>
      </view>
    </view>

    <bt @onConfirm="enter"></bt>
  </view>
</template>

<script>
export default {
  data() {
    return {
      selectIndex: null,
      selectList: [],
      typeList: [],
      typeId: 1,
      labelId: uni.getStorageSync("labelId") || "",
      typeName: "",
      labelCode: "",
    };
  },
  async onShow() {
    const result = await uni.$u.http.get("/match/matchLabelTypes");
    if (result.status == 200) {
      this.typeList = result.data;
    }
    this.matchLabelTypes();
  },

  methods: {
    selectItem(item, index) {
      this.selectIndex = index;
      this.labelId = item.labelId;
      this.typeName = item.labelName;
      this.labelCode = item.labelCode;
    },
    async matchLabelTypes() {
      const res = await uni.$u.http.get("/match/matchLabelType", {
        params: { typeId: this.typeId },
      });

      if (res.status == 200) {
        this.selectList = res.data;
      }
    },
    change(item) {
      this.typeId = item.id;
      this.matchLabelTypes();
    },
    enter() {
      uni.setStorageSync("labelId", this.labelId);
      uni.setStorageSync("typeName", this.typeName);
      uni.setStorageSync("labelCode", this.labelCode);
      uni.navigateBack({ delta: 1 });
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  position: relative;

  .main {
    width: 90%;
    margin: auto;
    .type {
      display: flex;
      gap: 10px;
      overflow-x: auto; // 允许横向滚动
      white-space: nowrap; // 防止子项换行

      .item-action {
        background-color: black;
        color: white;
        border: none;
        padding: 6px 18px;
        border-radius: 20px;
      }
      .item {
        padding: 6px 18px;
        border-radius: 20px;
        font-weight: 400;
        font-size: 14px;
        color: #1d2326;
        border: 1px solid #f0f0f0;
      }
    }

    .content {
      display: flex;
      margin-top: 20px;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 12px;
      .item {
        display: flex;
        align-items: center;
        gap: 5px;
        width: 30%;
        background-color: #f8f8f8;
        align-items: center;
        justify-content: center;
        height: 42px;
        font-weight: 400;
        font-size: 14px;
        color: #1d2326;
        margin-bottom: 12px;
      }
      .item-active {
        display: flex;
        align-items: center;
        gap: 5px;
        width: 30%;
        background-color: #fcdfe2;
        align-items: center;
        justify-content: center;
        height: 42px;
        font-weight: 400;
        font-size: 14px;
        color: #ec384a;
        margin-bottom: 12px;
      }
    }
  }
}
</style>
