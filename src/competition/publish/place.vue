<template>
  <view>
    <u-navbar leftText="赛事地点" @leftClick="back"></u-navbar>
    <view :style="{ marginTop: top }" class="type">
      <u-tabs
        :list="list1"
        @click="click"
        lineColor="#EC384A"
        :activeStyle="{ color: '#1D2326', fontWeight: '600', fontSize: '14px' }"
        :current="action"
      ></u-tabs>
    </view>
    <view class="content">
      <view class="main">
        <view class="search">
          <u-input
            shape="circle"
            placeholder="请输入场地关键词"
            placeholderClass="placehoder"
          >
            <view slot="prefix" class="prefix">
              广州
              <u-icon size="8" name="arrow-down-fill" color="#CCCCCC"></u-icon>
            </view>
            <view slot="suffix" class="suffix">搜索</view>
          </u-input>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list1: [
        {
          name: "选场地",
        },
        {
          name: "选地址",
        },
      ],
      statusBarHeight: 0,
      navbarHeight: 44,
      action: 0,
    };
  },
  onShow() {
    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
  },
  methods: {
    back() {
      uni.navigateBack();
    },
    click(item) {
      this.action = item.index;
      if (item.index == 1) {
        uni.chooseLocation({
          success: function (res) {
            // console.log(res);
            uni.setStorageSync("fullAddress", res.address);
            uni.navigateTo({
              url: `/competition/publish/saishi`,
            });
          },
          fail: function () {},
          complete: function () {},
        });
      }
    },
    enter() {},
  },
  computed: {
    top() {
      return this.statusBarHeight + this.navbarHeight + "px";
    },
  },
};
</script>

<style lang="scss">
.content {
  background-color: #f7f7f7;
  .main {
    width: 95%;
    margin: auto;
    height: 600px;
    overflow: hidden;
    z-index: 99;
    .search {
      background-color: #fff;
      border-radius: 20px;
      margin: 10px;
      .prefix {
        display: flex;
        align-items: center;
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.6);
        gap: 3px;
        padding: 5px;
      }
      .suffix {
        font-weight: 600;
        font-size: 12px;
        color: #ffffff;
        // width: 56px;
        // height: 28px;
        padding: 6px 16px;
        border-radius: 20px;
        background-color: #ec384a;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .list {
      width: 90%;
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 20px;
      .item {
        display: flex;
        flex-direction: column;
        gap: 7px;
        .top {
          display: flex;
          justify-content: space-between;
          .place {
            font-weight: 400;
            font-size: 16px;
            color: #1d2326;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 80%;
            overflow: hidden;
          }
          .way {
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.5);
          }
        }
        .detail {
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.5);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
      .item-active {
        display: flex;
        flex-direction: column;
        gap: 7px;
        .top {
          display: flex;
          justify-content: space-between;
          .place {
            font-weight: 400;
            font-size: 16px;
            color: #ec384a;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 80%;
            overflow: hidden;
          }
          .way {
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.5);
          }
        }
        .detail {
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.5);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}

.type {
  width: 95%;
  margin: auto;
}

.placehoder {
  font-weight: 400;
  font-size: 14px;
  color: rgba(29, 35, 38, 0.5);
}

.placehoder-y {
  font-weight: 400;
  font-size: 14px;
  color: rgba(29, 35, 38, 0.6);
}

map {
  width: 100%;
  height: 250px;
}

.ab {
  position: fixed;
  bottom: 0;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  width: 100%;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  .bt {
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    width: 80%;
    border-radius: 20px;
    background-color: #b9baba;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
