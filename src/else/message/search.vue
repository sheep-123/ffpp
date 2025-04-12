<template>
  <view class="box">
    <u-navbar leftText="搜索聊天" autoBack :fixed="false"> </u-navbar>
    <view class="main">
      <view class="search">
        <view class="input">
          <u-input
            placeholder="搜搜你感兴趣的~"
            border="none"
            v-model="keyword"
            shape="circle"
            placeholderClass="pl-class"
            placeholderStyle="color:rgba(29,35,38,0.3)"
            @confirm="enter"
          >
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/搜索.png"
              mode="scaleToFill"
              style="width: 24px; height: 24px; margin-left: 10px"
              slot="prefix"
            />
            <image
              src="/static/images/circle-delete.png"
              mode="scaleToFill"
              style="width: 24px; height: 24px; margin-right: 10px"
              slot="suffix"
              @click="keyword = ''"
            />
          </u-input>
        </view>
        取消
      </view>
      <view
        class="item"
        v-for="(item, index) in items"
        :key="index"
        v-if="status"
      >
        <view class="top">
          <view class="left">{{ item.title }}</view>
          <view class="right"
            >更多 <u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon
          ></view>
        </view>
        <view class="next" v-for="(info, idx) in item.infos" :key="idx">
          <u-avatar :src="info.avatar"></u-avatar>
          <rich-text :nodes="info.htmlText"></rich-text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      items: [
        {
          title: "好友",
          infos: [
            { avatar: "src", text: "网球王子", htmlText: "" },
            { avatar: "src", text: "篮球小子", htmlText: "" },
          ],
        },
        {
          title: "群聊",
          infos: [
            { avatar: "src", text: "足球队", htmlText: "" },
            { avatar: "src", text: "篮球队", htmlText: "" },
          ],
        },
      ],
      status: false,
    };
  },
  methods: {
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },
    enter() {
      this.status = true;
      this.items.forEach((item) => {
        item.infos.forEach((info) => {
          // 如果关键字为空，直接显示原始文本
          if (!this.keyword.trim()) {
            info.htmlText = info.text;
            return;
          }

          // 正则匹配关键字（忽略大小写）
          const regex = new RegExp(`(${this.keyword})`, "gi");
          info.htmlText = info.text.replace(
            regex,
            `<span style="color: red;">$1</span>`
          );
        });
      });
    },
  },
  onLoad() {},
  onShow() {},
};
</script>

<style lang="scss">
.box {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  .main {
    width: 90%;
    margin: auto;
    .search {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
      .input {
        background-color: white;
        height: 36px;
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 85%;
      }
      font-weight: 400;
      font-size: 14px;
      color: #2a8aba;
    }
    .item {
      margin-bottom: 38px;
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          font-weight: 400;
          font-size: 14px;
          color: #1d2326;
        }
        .right {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 400;
          font-size: 14px;
          color: rgba(29, 35, 38, 0.5);
        }
      }
      .next {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 400;
        font-size: 16px;
        color: #1d2326;
        margin-top: 14px;
      }
    }
  }
}
</style>
