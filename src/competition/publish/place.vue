<template>
  <view class="box">
    <u-navbar leftText="赛事地点" autoBack :fixed="false"></u-navbar>
    <view class="type">
      <u-tabs
        :list="list1"
        @click="click"
        lineColor="#EC384A"
        :activeStyle="{ color: '#1D2326', fontWeight: '600', fontSize: '14px' }"
        :current="action"
      ></u-tabs>
    </view>

    <view class="main">
      <view class="search">
        <view class="prefix">广州 <text></text></view>
        <input
          shape="circle"
          placeholder="请输入场地关键词"
          placeholder-class="placehoder"
          style="width: 100%"
          v-model="keywords"
        />
        <view class="suffix" @click="getUserLocation">搜索</view>
      </view>
      <view class="list">
        <view
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="select(item, index)"
        >
          <image
            :src="
              item.doorPhoto ||
              'https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg'
            "
            mode="aspectFill"
            style="width: 78px; height: 78px; border-radius: 4px"
          />
          <view class="right">
            <view class="top"> {{ item.siteName }} <text>0.4km</text> </view>
            <view class="place">{{ item.siteType }}</view>
            <view class="position"
              ><text style="width: 80%">{{ item.siteAddress }}</text
              ><u-icon
                v-if="active == index"
                name="checkbox-mark"
                color="#EC384A"
                size="24"
              ></u-icon
            ></view>
          </view>
        </view>
      </view>
    </view>
    <bt @onConfirm="enter" />
    <u-toast ref="notice"></u-toast>
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
      action: 0,
      keywords: "",
      latitude: null,
      longitude: null,
      page: 1,
      pageSize: 10,
      list: [],
      active: null,
    };
  },
  async onLoad() {
    this.getUserLocation();
  },
  methods: {
    async getUserLocation() {
      const res = await uni.getLocation({
        type: "gcj02", // 坐标系类型，常用 gcj02（国测局坐标系）
      });
      const { latitude, longitude } = res;
      this.latitude = latitude;
      this.longitude = longitude;
      try {
        const params = {
          city: "广州",
          keywords: this.keywords,
          userLat: this.latitude,
          userLng: this.longitude,
          page: this.page,
          pageSize: this.pageSize,
        };

        const result = await this.$api.queryCdInfo(params);
        this.list = result.data;
      } catch (error) {
        this.$refs.notice.show({
          type: "default",
          message: error.data.message,
        });
      }
    },
    click(item) {
      if (item.index == 1) {
        uni.chooseLocation({
          success: function (res) {
            uni.setStorageSync("fullAddress", res.address);
            uni.setStorageSync("bmLocal", {
              latitude: res.latitude,
              longitude: res.longitude,
            });
            uni.navigateBack({ delta: 1 });
          },
          fail: function () {},
          complete: function () {},
        });
      }
    },
    enter() {
      uni.navigateBack({ delta: 1 });
      uni.setStorageSync("fullAddress", this.selectItem);
    },
    select(item, index) {
      this.active = index;
      this.selectItem = item.siteAddress;
    },
  },
};
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
.box {
  width: 100%;
  position: relative;
  height: 100vh;
  .main {
    width: 90%;
    margin: auto;
    padding-bottom: 150px;
    .search {
      background-color: #fff;
      border-radius: 20px;
      margin: 10px 0;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .prefix {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.6);
        gap: 3px;
        padding: 0 5px 0 10px;
        margin-right: 10px;
        white-space: nowrap;

        width: 15%;
        border-right: 1px solid #ccc;
        text {
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid #cccccc;
        }
      }
      .suffix {
        font-weight: 600;
        font-size: 12px;
        color: #ffffff;
        padding: 6px 16px;
        border-radius: 20px;
        background-color: #ec384a;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        margin-right: 5px;
      }
    }

    .list {
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      .item {
        display: flex;
        align-items: center;
        background-color: #fff;
        border-radius: 4px;
        padding: 12px;
        box-sizing: border-box;
        gap: 7px;
        .right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 10px;
          flex: 1;
          .top {
            display: flex;
            justify-content: space-between;
            font-weight: 600;
            font-size: 14px;
            color: #15181a;
            align-items: center;
            text {
              font-weight: 400;
              font-size: 12px;
              color: rgba(29, 35, 38, 0.6);
            }
          }
          .place {
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.6);
            margin-top: -10px;
          }
          .position {
            display: flex;
            align-items: center;
            justify-content: space-between;
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
  .type {
    padding-left: 1%;
    background-color: #fff;
  }
}
.placehoder {
  font-weight: 400;
  font-size: 14px;
  color: rgba(29, 35, 38, 0.5);
}
</style>
