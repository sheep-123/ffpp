<template>
  <view>
    <view class="box">
      <!-- 顶部导航栏处 -->
      <view>
        <navbar :isZhanwei="false" :bgColor="bgColor">
          <view slot="left">
            <view
              class="search-container"
              :style="{
                backgroundColor:
                  bgColor == '#fff' ? '#F7F7F7' : 'rgba(255, 255, 255, 0.5)',
              }"
            >
              <u-input
                placeholder="搜搜你感兴趣的~"
                border="none"
                v-model="keyword"
                shape="circle"
                placeholderClass="pl-class"
                placeholderStyle="color:rgba(29,35,38,0.3)"
              >
                <image
                  :src="img.seatrh"
                  class="w48-l"
                  mode="scaleToFill"
                  slot="prefix"
                />
                <image
                  :src="img.scan"
                  class="w48-r"
                  mode="scaleToFill"
                  slot="suffix"
                />
              </u-input>
            </view>
          </view>
        </navbar>
        <div
          class="flow-tabs-top"
          v-if="bgColor == '#fff'"
          :style="{ top: 44 + systemInfo.statusBarHeight + 'px' }"
        >
          <view style="width: 100%" class="flow-box">
            <view class="left">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/定位.png"
                style="width: 32rpx; height: 32rpx"
              />
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/附近.png"
                style="width: 72rpx; height: 30rpx"
              />
            </view>
            <scroll-view class="center" scroll-x>
              <view
                class="center-item"
                v-for="(item, index) in list"
                :key="index"
                >{{ item }}</view
              >
            </scroll-view>
            <view class="right">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/more.png"
                class="more"
                @click="edit"
              ></image>
            </view>
          </view>
        </div>
      </view>

      <!-- 	<view class="">
				
			</view> -->

      <map
        class="map-example"
        :zIndex="-1"
        :latitude="nowAddInfo.latitude"
        :longitude="nowAddInfo.longitude"
        :markers="markers"
        :scale="18"
      >
        <!-- 地图可视区域 204px -->
        <view :style="{ transform: `translateY(${scrollY}px)` }">
          <!-- 下拉-上拉 -->
          <view
            @touchstart.stop="handleTouchStart"
            @touchmove.stop="handleTouchMove"
            @touchend.stop="handleTouchEnd"
          >
            <view class="pull">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/pull.png"
                style="width: 36rpx; height: 22rpx"
              />
              <view class="value">下拉试试</view>
            </view>
          </view>
          <!-- tab栏 -->
          <view class="flow-tabs">
            <view style="width: 100%" class="flow-box">
              <view class="left">
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/定位.png"
                  style="width: 32rpx; height: 32rpx"
                />
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/附近.png"
                  style="width: 72rpx; height: 30rpx"
                />
              </view>
              <scroll-view class="center" scroll-x>
                <view
                  class="center-item"
                  v-for="(item, index) in list"
                  :key="index"
                  >{{ item }}</view
                >
              </scroll-view>
              <view class="right">
                <image
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/more.png"
                  class="more"
                  @click="edit"
                ></image>
              </view>
            </view>
          </view>

          <!-- 最开始 为 204 -->
          <!-- 最结束 为 830 -->

          <scroll-view
            @scroll="pageScrollHandle"
            :scroll-y="!isDragging"
            :style="{
              height: scrollY > 0 ? `calc(100vh - ${scrollY}px)` : '100vh',
            }"
            class="list-box"
          >
            <view class="main">
              <!-- <view class="item">
								<image
									src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/01.jpg"
									mode="widthFix" />
								<view class="value">环境非常优美在40楼 打卡全广州最高的健身房</view>
								<view class="buttom">
									<view class="left">
										<u-avatar :src="src" size="18"></u-avatar>
										<view class="value">滑板高手</view>
									</view>
									<view class="right">
										<image
											src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/无火花.png" />
										<view class="value">1000</view>
									</view>
								</view>
							</view> -->
              <view
                class="item"
                @click="
                  $utils.toPath.navigateTo('/dynamic/publish/dongTaiDetail')
                "
                v-for="(item, index) in newsList"
                :key="index"
              >
                <image :src="item.fileUrl" mode="widthFix" />
                <view class="value">{{ item.title }}</view>
                <view class="buttom">
                  <view class="left">
                    <u-avatar :src="item.releaseUserUrl" size="18"></u-avatar>
                    <view class="value">{{ item.releaseUserName }}</view>
                  </view>
                  <view class="right">
                    <image
                      src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/火花.png"
                    />
                    <view class="value">1000</view>
                  </view>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </map>
    </view>
  </view>
</template>

<script>
const app = getApp();
import navbar from "@/components/WNavbar/index.vue";
export default {
  data() {
    return {
      globalData: app.globalData,
      img: this.$img.home,
      keyword: "",
      bgColor: "transparent",
      scrollY: 204, //初始下挪高度
      isDragging: false, //下拉状态
      list: ["关注", "美式橄榄球", "篮球", "飞盘", "电竞"],
      nowAddInfo: {
        id: 1,
        latitude: null,
        longitude: null,
        width: 58,
        height: 58,
        iconPath:
          "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/Frame.png",
      },
      searchParmas: {
        page: 1,
        pageSize: 10,
      },
      markers: [],
      newsList: [],
    };
  },
  components: {
    navbar,
  },
  async onLoad() {
    this.getList();
    if (!this.globalData.location.latitude) {
      await this.getLocation();
    }
    this.nowAddInfo.latitude = this.globalData.location.latitude;
    this.nowAddInfo.longitude = this.globalData.location.longitude;
    this.markers = [this.nowAddInfo];
  },
  methods: {
    async getList() {
      const res = await this.$requestAll.dynamics.getMainNews(
        this.searchParmas
      );
      this.newsList = [...this.newsList, ...res.data];
    },
    handleTouchStart(e) {
      this.isDragging = true;
    },
    handleTouchMove(e) {
      if (!this.isDragging) return;
      const deltaY = e.touches[0].clientY; //移动的距离
      if (deltaY >= 204 && deltaY <= this.systemInfo.windowHeight) {
        this.scrollY = deltaY;
      }
    },
    handleTouchEnd(e) {
      this.isDragging = false;
      this.scrollY < this.systemInfo.windowHeight / 2 + 30
        ? (this.scrollY = 204)
        : (this.scrollY = this.systemInfo.windowHeight - 20);
    },
    pageScrollHandle(e) {
      const detail = e.detail;
      this.scrollY > 40 && (this.scrollY -= detail.scrollTop);
      parseInt(detail.scrollTop) < 5 && (this.scrollY = 204);
      parseInt(detail.scrollTop) > 40
        ? (this.bgColor = "#fff")
        : (this.bgColor = "transparent");
    },
  },
};
</script>

<style lang="scss">
.flow-tabs-top {
  width: 750rpx;
  height: 108rpx;
  box-sizing: border-box;
  padding: 34rpx 32rpx;
  background: #fff;
  position: fixed;
  z-index: 111;

  .flow-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 134rpx;

    .left {
      width: 200rpx;
      height: 134rpx;
    }

    .center {
      width: 450rpx;
      white-space: nowrap;
      height: 134rpx;

      .center-item {
        display: inline-block;
        margin-right: 28rpx;
        font-weight: 400;
        font-size: 28rpx;
        color: rgba(29, 35, 38, 0.5);
      }
    }

    .right {
      height: 134rpx;
      width: 100rpx;
      text-align: center;

      > image {
        width: 32rpx;
        height: 32rpx;
      }
    }
  }
}

.w48-l {
  width: 48rpx;
  height: 48rpx;
  margin-left: 20rpx;
}

.w48-r {
  width: 48rpx;
  height: 48rpx;
  margin-right: 20rpx;
}

.flow-tabs {
  position: relative;
  width: 750rpx;
  height: 134rpx;
  box-shadow: 0rpx -4rpx 16rpx 0rpx rgba(98, 120, 134, 0.2);
  border: 3rpx solid;
  border-image: linear-gradient(
      360deg,
      rgba(255, 255, 255, 1),
      rgba(245, 245, 243, 1)
    )
    3 3;
  box-sizing: border-box;
  padding: 36rpx;
  border-radius: 10%;
  background: #f9f9f8;

  .flow-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 134rpx;

    .left {
      width: 200rpx;
      height: 134rpx;
    }

    .center {
      width: 450rpx;
      white-space: nowrap;
      height: 134rpx;

      .center-item {
        display: inline-block;
        margin-right: 28rpx;
        font-weight: 400;
        font-size: 28rpx;
        color: rgba(29, 35, 38, 0.5);
      }
    }

    .right {
      height: 134rpx;
      width: 100rpx;
      text-align: center;

      > image {
        width: 32rpx;
        height: 32rpx;
      }
    }
  }
}

.search-container {
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #ffffff;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.5);
  width: 80%;
  backdrop-filter: blur(30px);

  &.search-y {
    background: #ffffff;
    width: 85%;

    .back-btn {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
}

.pl-class {
  font-weight: 400;
  font-size: 14px;
  color: black;
}

.pl-class1 {
  font-weight: 400;
  font-size: 14px;
  color: black;
}

.box {
  .map-example {
    width: 750rpx;
    height: 100vh;

    .pull {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 20px;
      transition: all linear;

      .value {
        font-weight: 400;
        font-size: 20rpx;
        color: rgba(29, 35, 38, 0.5);
      }

      image {
        width: 32rpx;
        height: 16rpx;
      }
    }

    .list-box {
      position: relative;
      background-color: #fff;
      margin-top: -40rpx;
      transition: all linear;

      .main {
        column-count: 2;
        column-gap: 20rpx;
        background: #ffffff;
        border-radius: 40rpx;
        padding: 20rpx; // 新增内边距
        box-shadow: 0px -2px 8px 0px rgba(168, 186, 197, 0.2);
        box-sizing: border-box;

        .item {
          width: 100%;
          break-inside: avoid;
          /* 防止元素被分割到不同列 */
          margin-bottom: 20rpx;

          image {
            width: 100%;
            border-radius: 20rpx;
          }

          .value {
            font-size: 28rpx;
            color: #353738;
            font-weight: 600;
          }

          .buttom {
            display: flex;
            justify-content: space-between;
            margin-top: 14rpx;

            .left {
              display: flex;
              align-items: center;
              gap: 10rpx;

              image {
                width: 36rpx;
                height: 36rpx !important;
              }

              .value {
                font-size: 24rpx;
                font-weight: 400;
                color: #474747;
              }
            }

            .right {
              display: flex;
              align-items: center;
              gap: 4rpx;

              image {
                width: 40rpx;
                height: 40rpx;
              }

              .value {
                font-weight: 400;
                font-size: 24rpx;
                color: #474747;
              }
            }
          }
        }
      }
    }
  }
}
</style>
