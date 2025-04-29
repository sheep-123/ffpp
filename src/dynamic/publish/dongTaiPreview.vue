<template>
  <view class="box" v-if="postBody">
    <Navbar bgColor="#fff">
      <view
        @click="$utils.toPath.back()"
        slot="left"
        style="display: flex; align-items: center"
      >
        <u-icon name="arrow-left" size="19"></u-icon>
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/avatar.png"
          mode="scaleToFill"
          class="img-1"
        />
        <view class="img-2">爱运动的橘子</view>
      </view>
    </Navbar>
    <view class="parent">
      <swiper
        :indicator-dots="false"
        :circular="true"
        :current="current"
        :autoplay="true"
      >
        <block v-for="(item, index) in postBody.fileUrlList" :key="index">
          <swiper-item>
            <image
              style="height: 504rpx; width: 702rpx; border-radius: 8rpx"
              :src="item"
              mode=""
            >
            </image>
          </swiper-item>
        </block>
      </swiper>
      <view class="numDots">
        <view>
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/photo.png"
            mode="scaleToFill"
          />
          <text> {{ current + 1 }}/{{ postBody.fileUrlList.length }} </text>
        </view>
      </view>
      <view class="dots">
        <block v-for="(item, index) in postBody.fileUrlList" :key="index">
          <view :class="current == index ? 'active' : ''"></view>
        </block>
      </view>
    </view>
    <view class="contentBox">
      <view style="margin-bottom: 24rpx">
        <view class="title">{{ postBody.title }}</view>
        <text class="titleContent">
          {{ postBody.content }}
        </text>
      </view>
      <div class="address flex-jb">
        <text>{{ postBody.address }}</text>
        <u-icon name="arrow-right" color="#484D4F"></u-icon>
      </div>
      <div v-if="postBody.matchName" class="match flex-jb">
        <text>{{ postBody.matchName }}</text>
        <u-icon name="arrow-right" color="#484D4F"></u-icon>
      </div>
      <div v-if="postBody.labelCode" class="sport">
        <text>#</text>
        <view v-if="sportList.length" class="l-box">
          <div
            class="l-box-item"
            v-for="(item, index) in sportList"
            :key="index"
          >
            {{ item }}
          </div>
        </view>
      </div>
    </view>
    <view class="functionBox">
      <view></view>
      <view class="rightPart">
        <view>
          <image
            class="frie-svg"
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/frie.svg"
            mode="scaleToFill"
          />
          <text>0</text>
        </view>
        <view>
          <image
            class="star-svg"
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/collect.svg"
            mode="scaleToFill"
          />
          <text>0</text>
        </view>
        <view>
          <image
            class="comment-svg"
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/comment.svg"
            mode="scaleToFill"
          />
          <text>0</text>
        </view>
      </view>
    </view>

    <view style="height: 120rpx"></view>
    <view class="bottomBox safe-bottom">
      <view class="publishButton" color="#15181A " @click="submitEvent"
        >立即发布</view
      >
    </view>
  </view>
</template>
<script>
import Navbar from "@/components/WNavbar/index.vue";
export default {
  data() {
    return {
      current: 0,
      indicatorColor: "#000000",
      postBody: "",
      sportList: [],
    };
  },
  components: {
    Navbar,
  },
  methods: {
    async submitEvent() {
      this.postBody.state = "1";
      const res = await this.$requestAll.dynamics.saveNewsRelease(
        this.postBody
      );
      uni.hideLoading();
      if (res.status == 200) {
        this.$utils.toast(this.postBody.state == "1" ? "发布成功" : "保存成功");
        setTimeout(() => {
          this.$utils.toPath.switchTab("/pages/user/user");
        }, 1500);
      } else {
        this.$utils.toast(res.message);
      }
    },
  },
  onLoad(option) {
    console.log(decodeURIComponent(option.postBody), "????");
    this.postBody = JSON.parse(decodeURIComponent(option.postBody));
    if (this.postBody.labelName) {
      this.sportList = this.postBody.labelName.split(",");
    }
  },
};
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: #f5f5f5;
}

.functionBox {
  display: flex;
  justify-content: space-between;
  align-items: start;
  background-color: #fff;
  padding: 44rpx;
  box-sizing: border-box;
  .rightPart {
    display: flex;

    view {
      display: flex;
      align-items: center;

      .frie-svg {
        width: 60rpx;
        height: 60rpx;
        margin-left: 28rpx;
      }

      .star-svg {
        width: 60rpx;
        height: 60rpx;
        margin-left: 28rpx;
      }

      .comment-svg {
        width: 60rpx;
        height: 60rpx;
        margin-left: 28rpx;
      }

      text {
        margin-left: 12rpx;
      }
    }
  }
}

.sport {
  > text {
    color: #f0f0f0;
    font-size: 32rpx;
    font-weight: bolder;
    margin-right: 16rpx;
  }

  .l-box {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    .l-box-item {
      padding: 6rpx 12rpx;
      font-weight: 600;
      font-size: 24rpx;
      color: #ec383c;
      border: 2rpx solid rgba(236, 56, 74, 0.2);
      border-radius: 4rpx;
      margin-right: 12rpx;
      box-sizing: border-box;
    }
  }
}

.img-1 {
  margin-left: 6px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.img-2 {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #1d2326;
  line-height: 24px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-left: 8px;
}

.parent {
  position: relative;
  background-color: #fff;
  padding: 0 24rpx;
  swiper {
    height: 510rpx;

    swiper-item view {
      height: 100%;
    }
  }
}

.numDots {
  position: absolute;
  top: 432rpx;
  right: 48rpx;

  view {
    // width: 102rpx;
    // height: 48rpx;
    background: rgba(41, 41, 41, 0.3);
    border-radius: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(41, 41, 41, 0.3);
    padding: 12rpx 16rpx;
    box-sizing: border-box;
    image {
      width: 12px;
      height: 12px;
      margin-right: 2px;
    }

    text {
      font-family: PingFang SC, PingFang SC;
      font-weight: 600;
      font-size: 12px;
      color: #ffffff;
      line-height: 16px;
      text-align: right;
      font-style: normal;
      text-transform: none;
    }
  }
}

.dots {
  position: absolute;
  bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  view {
    width: 10rpx;
    height: 10rpx;
    margin: 0 6rpx;
    border-radius: 10rpx;
    background-color: #cccccc;
  }

  .active {
    width: 30rpx;
    background-color: #15181a;
  }
}

::v-deep .u-icon__icon.data-v-172979f2.uicon-close {
  font-size: 15px !important;
  top: 50% !important;
  right: 50% !important;
  transform: translate(8px, 3px) !important;
}

::v-deep .u-input__content.data-v-fdbb9fe6 {
  background-color: #fff;
}

::v-deep .u-input__content__field-wrapper__field.data-v-fdbb9fe6 {
  font-size: 14px !important;
}

::v-deep
  .data-v-0e3867ac
  .u-input__content__field-wrapper__field.data-v-fdbb9fe6 {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: rgba(29, 35, 38, 0.3);
  line-height: 24px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

::v-deep .u-button--square.data-v-3bf2dba7 {
  border-radius: 40px;
}

::v-deep .u-button.data-v-3bf2dba7 {
  width: 327px;
  height: 44px;
}

.box {
  .indicator {
    @include flex(row);
    justify-content: center;

    &__dot {
      height: 6px;
      width: 6px;
      border-radius: 100px;
      background-color: rgba(255, 255, 255, 0.35);
      margin: 0 5px;
      transition: background-color 0.3s;

      &--active {
        background-color: #ffffff;
      }
    }
  }

  .indicator-num {
    padding: 2px 0;
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 100px;
    width: 35px;
    @include flex;
    justify-content: center;

    &__text {
      color: #ffffff;
      font-size: 12px;
    }
  }

  .contentBox {
    background-color: #fff;
    padding: 48rpx 24rpx;
    margin-bottom: 16rpx;
    box-sizing: border-box;
    .title {
      font-weight: 600;
      font-size: 36rpx;
      color: #1d2326;
      margin-bottom: 24rpx;
    }

    .titleContent {
      margin-bottom: 32rpx;
      font-weight: 400;
      font-size: 32rpx;
      color: rgba(29, 35, 38, 0.8);
    }

    .address {
      // width: 686rpx;
      height: 76rpx;
      background: #f5f5f5;
      border-radius: 8rpx;
      padding: 16rpx 24rpx;
      font-weight: 400;
      font-size: 28rpx;
      color: rgba(29, 35, 38, 0.8);
      margin-bottom: 24rpx;
      box-sizing: border-box;
    }

    .match {
      // width: 686rpx;
      height: 76rpx;
      background: #f5f5f5;
      border-radius: 8rpx;
      padding: 16rpx 24rpx;
      font-weight: 400;
      font-size: 28rpx;
      color: rgba(29, 35, 38, 0.8);
      margin-bottom: 40rpx;
      box-sizing: border-box;
    }
  }

  .bottomBox {
    width: 750rpx;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 24rpx 48rpx;
    box-sizing: border-box;
    .publishButton {
      width: 654rpx;
      height: 88rpx;
      background: #15181a;
      border-radius: 80rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 600;
      font-size: 32rpx;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
