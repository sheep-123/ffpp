<template>
  <view class="box">
    <u-navbar  v-if="isSticky && !isMapExpanded">
      <view slot="left">
        <view class="search" id="search">
          <u-search
            placeholder="搜搜你感兴趣的~"
            v-model="keyword"
            :showAction="false"
            @clear="clear"
            bgColor="#F7F7F7"
          ></u-search>
        </view>
      </view>
    </u-navbar>
    <u-navbar  bgColor="rgba(0,0,0,0)" v-else>
      <view slot="left">
        <view class="search" v-if="!isMapExpanded">
          <u-search
            placeholder="搜搜你感兴趣的~"
            v-model="keyword"
            :showAction="false"
            @clear="clear"
            bgColor="#F5F7F5"
            borderColor="#ffffff"
          ></u-search>
        </view>
        <view class="search-y" v-else>
          <image src="/static/images/left.png" @click="back" />

          <u-search
            placeholder="搜搜你感兴趣的~"
            v-model="keyword"
            :show-action="false"
            bg-color="#FFFFFF"
            @clear="clear"
          ></u-search>
        </view>
      </view>
    </u-navbar>

    <!-- <view class="v-title" v-if="isSticky && !isMapExpanded">
      <view class="first">
        <image src="/static/images/location.png" />
        <image src="/static/images/near.png" />
      </view>
      <view class="item">关注</view>
      <view class="item">美式橄榄球</view>
      <view class="item">飞盘</view>
      <view class="item">桌游</view>
      <view class="item">电竞</view>
      <image src="/static/images/more.png" class="more" @click="edit"></image>
    </view> -->

    <map
      id="myMap"
      :latitude="latitude"
      :longitude="longitude"
      :markers="markers"
      :scale="18"
      v-if="!isSticky||isMapExpanded"
    >
    </map>

    <view
      class="pull"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      :style="{ transform: `translateY(${moveY}px)` }"
      v-show="!isSticky"
    >
      <image src="/static/images/pull.png" />
      <view class="value">下拉试试</view>
    </view>

    <view class="content" :style="{ transform: `translateY(${moveY}px)` }">
      <view class="title" ref="title" id="title">
        <view class="first">
          <image src="/static/images/location.png" />
          <image src="/static/images/near.png" />
        </view>
        <view class="item">关注</view>
        <view class="item">美式橄榄球</view>
        <view class="item">飞盘</view>
        <view class="item">桌游</view>
        <view class="item">电竞</view>
        <image src="/static/images/more.png" class="more" @click="edit"></image>
      </view>

      <view class="main">
        <view class="item">
          <image src="/static/images/02.jpg" mode="widthFix" />
          <view class="value">环境非常优美在40楼 打卡全广州最高的健身房</view>
          <view class="buttom">
            <view class="left">
              <image src="/static/images/avatar.png" />
              <view class="value">滑板高手</view>
            </view>
            <view class="right">
              <image src="/static/images/like.png" />
              <view class="value">1000</view>
            </view>
          </view>
        </view>
        <view class="item">
          <image src="/static/images/01.jpg" mode="widthFix" />
          <view class="value">环境非常优美在40楼 打卡全广州最高的健身房</view>
          <view class="buttom">
            <view class="left">
              <image src="/static/images/avatar.png" />
              <view class="value">滑板高手</view>
            </view>
            <view class="right">
              <image src="/static/images/like.png" />
              <view class="value">1000</view>
            </view>
          </view>
        </view>
        <view class="item">
          <image src="/static/images/01.jpg" mode="widthFix" />
          <view class="value">环境非常优美在40楼 打卡全广州最高的健身房</view>
          <view class="buttom">
            <view class="left">
              <image src="/static/images/avatar.png" />
              <view class="value">滑板高手</view>
            </view>
            <view class="right">
              <image src="/static/images/like.png" />
              <view class="value">1000</view>
            </view>
          </view>
        </view>
        <view class="item">
          <image src="/static/images/03.jpg" mode="widthFix" />
          <view class="value">环境非常优美在40楼 打卡全广州最高的健身房</view>
          <view class="buttom">
            <view class="left">
              <image src="/static/images/avatar.png" />
              <view class="value">滑板高手</view>
            </view>
            <view class="right">
              <image src="/static/images/like.png" />
              <view class="value">1000</view>
            </view>
          </view>
        </view>
        <view class="item">
          <image src="/static/images/01.jpg" mode="widthFix" />
          <view class="value">环境非常优美在40楼 打卡全广州最高的健身房</view>
          <view class="buttom">
            <view class="left">
              <image src="/static/images/avatar.png" />
              <view class="value">滑板高手</view>
            </view>
            <view class="right">
              <image src="/static/images/like.png" />
              <view class="value">1000</view>
            </view>
          </view>
        </view>
        <view class="item">
          <image src="/static/images/01.jpg" mode="widthFix" />
          <view class="value">环境非常优美在40楼 打卡全广州最高的健身房</view>
          <view class="buttom">
            <view class="left">
              <image src="/static/images/avatar.png" />
              <view class="value">滑板高手</view>
            </view>
            <view class="right">
              <image src="/static/images/like.png" />
              <view class="value">1000</view>
            </view>
          </view>
        </view>
        <view class="item">
          <image src="/static/images/01.jpg" mode="widthFix" />
          <view class="value">环境非常优美在40楼 打卡全广州最高的健身房</view>
          <view class="buttom">
            <view class="left">
              <image src="/static/images/avatar.png" />
              <view class="value">滑板高手</view>
            </view>
            <view class="right">
              <image src="/static/images/like.png" />
              <view class="value">1000</view>
            </view>
          </view>
        </view>
        <view class="item">
          <image src="/static/images/01.jpg" mode="widthFix" />
          <view class="value">环境非常优美在40楼 打卡全广州最高的健身房</view>
          <view class="buttom">
            <view class="left">
              <image src="/static/images/avatar.png" />
              <view class="value">滑板高手</view>
            </view>
            <view class="right">
              <image src="/static/images/like.png" />
              <view class="value">1000</view>
            </view>
          </view>
        </view>
        <view class="item">
          <image src="/static/images/01.jpg" mode="widthFix" />
          <view class="value">环境非常优美在40楼 打卡全广州最高的健身房</view>
          <view class="buttom">
            <view class="left">
              <image src="/static/images/avatar.png" />
              <view class="value">滑板高手</view>
            </view>
            <view class="right">
              <image src="/static/images/like.png" />
              <view class="value">1000</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      latitude: 23,
      longitude: 113,
      markers: [
        {
          id: 0,
          latitude: 0,
          longitude: 0,
          title: "当前位置",
          iconPath: "/static/images/Frame.png",
          width: 60, // 新增宽度
          height: 60, // 新增高度
          label: {
            content: "青春足球场",
            color: "rgba(29,35,38,0.5)",
            fontSize: 12,
            anchorY: -10,
            textAlign: "center",
          },
        },
        {
          iconPath: "/static/images/Frame.png",
          id: 1,
          latitude: 0,
          longitude: 0,
          width: 60,
          height: 60,
          title: "其他位置",
          label: {
            content: "青春篮球场",
            color: "rgba(29,35,38,0.5)",
            fontSize: 12,
            anchorY: -10,
            textAlign: "center",
          },
        },
      ],
      isMapExpanded: false, //地图展开
      isSticky: false, //吸顶状态
      dragStartY: 0, //下拉开始的位置
      isDragging: false, //下拉状态
      screenHeight: 0, //屏幕高度
      moveY: 0, //下拉距离
      keyword: "",
      isAndroid: false,
    };
  },
  onLoad() {
    this.Location();
    const systemInfo = uni.getSystemInfoSync();
    console.log(systemInfo.osName);
    if (systemInfo.osName === "android") {
      this.isAndroid = true;
      console.log(this.isAndroid);
    }
  },
  onReady() {
    const systemInfo = uni.getSystemInfoSync();
    this.screenHeight = systemInfo.windowHeight;
  },
  mounted() {
    this.initIntersectionObserver();
  },

  methods: {
    async Location() {
      try {
        const res = await uni.getLocation({ type: "wgs84" });
        this.latitude = res.latitude - 0.001;
        this.longitude = res.longitude;
        this.markers[0].latitude = res.latitude;
        this.markers[0].longitude = res.longitude;
        this.markers[1].latitude = res.latitude + 0.0005;
        this.markers[1].longitude = res.longitude + 0.0005;
      } catch (err) {
        console.error("定位失败:", err);
      }
    },

    handleTouchStart(e) {
      this.dragStartY = e.touches[0].clientY;
      this.isDragging = true;
    },

    handleTouchMove(e) {
      if (!this.isDragging) return;
      const deltaY = e.touches[0].clientY - this.dragStartY;

      if (deltaY >= 0 && deltaY <= this.screenHeight) {
        this.moveY = deltaY;
      }
    },
    // 新增触摸结束处理
    handleTouchEnd() {
      this.isDragging = false;
      // 判断是否达到滑动阈值，决定是否展开地图
      if (this.moveY >= 300) {
        this.isMapExpanded = true;
        this.moveY = this.screenHeight;
      }
    },
    back() {
      this.isMapExpanded = false;
      this.moveY = 0;
    },

    edit() {
      uni.navigateTo({
        url: "/pages/index/editSport",
      });
    },

    initIntersectionObserver() {
      this.$nextTick(() => {
        this.observer = uni.createIntersectionObserver(this);
        this.observer.relativeToViewport().observe("#title", (res) => {
          this.isSticky = res.intersectionRatio <= 0;
        });
      });
    },

    clear() {
      this.keyword = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  // display: none;
  position: absolute;
  top: 30%;
  width: 100%;
  border-radius: 30px;
  background-color: #f8f9f9;
  height: auto;
  box-shadow: 0px -2px 8px 0px rgba(98, 120, 134, 0.2);
  border: 2px solid #ffffff;
  margin-bottom: 60px;
  overflow: hidden;

  .title {
    width: 100%;
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: space-evenly;
    background-color: #f8f9f9;
    .first {
      display: flex;
      align-items: center;
      gap: 3px;
      image:nth-child(1) {
        width: 18px;
        height: 18px;
      }
      image:nth-child(2) {
        width: 36px;
        height: 15px;
      }
    }
    .item {
      font-size: 14px;
      color: rgba(29, 35, 38, 0.5);
      font-family: "PING FANG SHAO HUA";
    }
  }

  .main {
    column-count: 2;
    column-gap: 10px;
    background: #ffffff;
    border-radius: 20px;
    padding: 10px; // 新增内边距

    .item {
      width: 100%;
      break-inside: avoid; /* 防止元素被分割到不同列 */
      margin-bottom: 10px;
      image {
        width: 100%;
        border-radius: 10px;
      }
      .value {
        font-size: 14px;
        color: #353738;
        font-weight: 600;
      }
      .buttom {
        display: flex;
        justify-content: space-between;
        margin-top: 7px;
        .left {
          display: flex;
          align-items: center;
          gap: 5px;
          image {
            width: 18px;
            height: 18px !important;
          }
          .value {
            font-size: 12px;
            font-weight: 400;
            color: #474747;
          }
        }
        .right {
          display: flex;
          align-items: center;
          gap: 2px;
          image {
            width: 20px;
            height: 20px;
          }
          .value {
            font-weight: 400;
            font-size: 12px;
            color: #474747;
          }
        }
      }
    }
  }
}

.more {
  width: 16px;
  height: 16px;
}

.v-title {
  position: fixed;
  top: 0;
  z-index: 99999999999;
  width: 100%;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-evenly;
  background-color: #ffffff;
  .first {
    display: flex;
    align-items: center;
    image:nth-child(1) {
      width: 18px;
      height: 18px;
    }
    image:nth-child(2) {
      width: 36px;
      height: 15px;
    }
  }
  .item {
    font-size: 14px;
    color: rgba(29, 35, 38, 0.5);
    font-family: "PING FANG SHAO HUA";
  }
}

.search {
  background: #f7f7f7;
  border-radius: 20px;
  display: flex;
  align-items: center;
}

.search-y {
  background: #ffffff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  image {
    width: 20px;
    height: 20px;
    margin: 10px;
  }
}

.pull {
  position: absolute;
  top: 26%;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all linear;

  .value {
    font-weight: 400;
    font-size: 10px;
    color: rgba(29, 35, 38, 0.5);
  }
  image {
    width: 16px;
    height: 8px;
  }
}

map {
  height: 100vh;
  width: 100vw;
}
</style>
