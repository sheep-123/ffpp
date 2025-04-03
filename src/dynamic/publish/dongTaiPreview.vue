<template>
  <view class="box">
    <u-navbar class="nav" autoBack leftText="发布动态" :fixed="false" bgColor="#fff">
      <view slot="left" style="display: flex;align-items: center;">
        <u-icon name="arrow-left" size="19"></u-icon>
        <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/avatar.png"
          mode="scaleToFill" style="margin-left: 6px;width: 36px;height: 36px;border-radius: 50%;" />
        <view style="font-family: PingFang SC, PingFang SC;
             font-weight: 400;
             font-size: 16px;
             color: #1D2326;
             line-height: 24px;
             text-align: left;
             font-style: normal;
             text-transform: none;
             margin-left: 8px;">爱运动的橘子
        </view>
      </view>
    </u-navbar>
    <view>
      <scroll-view scroll-y :style="{ height: windowHeight - bottomBoxHeight - statusBarHeight - 44 + 'px' }">
        <view class="parent">
          <swiper @change="monitorCurrent" :indicator-dots="false" :circular="true" :current="current" :autoplay="true">
            <block v-for="(item, index) in backgroundArr" :key="index">
              <swiper-item>
                <view :class="item"></view>
              </swiper-item>
            </block>
          </swiper>
          <view class="numDots">
            <view>
              <image src="@/static/photo.png" mode="scaleToFill" />
              <text>
                {{ current + 1 }}/3
              </text>
            </view>
          </view>
          <!-- 自定义轮播图进度点 -->
          <view class="dots">
            <block v-for="(item, index) in backgroundArr" :key="index">
              <view :class="current == index ? 'active' : ''"></view>
            </block>
          </view>
        </view>
        <view class="contentBox">
          <text class="title">2024年|我的徒步passion时刻</text><br>
          <text class="titleContent">
            晒出你的徒步照片
            看看2024你都去了哪些地方徒步
            春天大理看爱心湖夏天重庆金佛山玩水
            “秋天去川西看看雪山”
            攀冬天去丽江感受一下阳光
            回看这些走过的路，仍然充满passion
            晒出你的徒步照片
            看看2024你都去了哪些地方徒步
            春天大理看爱心湖夏天重庆金佛山玩水
            “秋天去川西看看雪山”
            攀冬天去丽江感受一下阳光
            回看这些走过的路，仍然充满passion
            晒出你的徒步照片
            看看2024你都去了哪些地方徒步
            春天大理看爱心湖夏天重庆金佛山玩水
            “秋天去川西看看雪山”
            攀冬天去丽江感受一下阳光
            回看这些走过的路，仍然充满passion
          </text>
          <u-gap height="8" bgColor="#F7F7F7"></u-gap>
          <view class="functionBox">
            <view></view>
            <view class="rightPart">
              <view>
                <!-- <view class="frie-svg"></view> -->
                <image class="frie-svg" src="@/static/images/frie.svg" mode="scaleToFill" />
                <text>0</text>
              </view>
              <view>
                <!-- <view class="star-svg"></view> -->
                <image class="star-svg" src="@/static/images/collect.svg" mode="scaleToFill" />
                <text>0</text>
              </view>
              <view>
                <!-- <view class="comment-svg"></view> -->
                <image class="comment-svg" src="@/static/images/comment.svg" mode="scaleToFill" />
                <text>0</text>
              </view>

            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="bottomBox">
      <u-button class="publishButton" color="#15181A ">立即发布</u-button>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      title: '',
      titleLength: 20,
      titleContent: '',
      bottomBoxHeight: 0,
      windowHeight: uni.getSystemInfoSync().windowHeight,
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
      isShow: false,
      isShowPopup: false,
      //轮播图的数组
      backgroundArr: ['red', 'green', 'blue'],
      //轮播图当前的下标
      current: 0,
      //是否自动播放轮播图
      autoplay: false,
      indicatorColor: '#000000',
    }
  },
  methods: {

    //图片读取后的处理函数
    afterRead(e) {
      console.log(e);
      // this.fileList = e.file
      this.fileList.push(e.file[0])
      console.log(this.fileList);
    },
    //图片删除函数
    deletePic(e) {
      this.fileList.splice(e.index, 1)
    },
    //标题输入事件
    inputEvent(e) {
      this.titleLength = 20
      if (e.length <= 20) {
        this.titleLength = this.titleLength - e.length
        this.isShowPopup = false
      } else {
        this.titleLength = 0
        uni.showToast({
          icon: 'none',
          title: '标题最多输入20个字',
          mask: false
        })
      }
      if (e.length >= 1) {
        this.isShow = true
      }
      else {
        this.isShow = false
      }

    },
    changeEvent(e) {
      console.log(e);

    },
    onClearTitle() {
      this.title = ''
    },
    toPreview() {
      uni.navigateTo({ url: '/dynamic/publish/dongTaiPreview' })

    },
    monitorCurrent: function (e) {
      this.current = e.detail.current;
    },

  },
  onLoad() {
    this.$nextTick(() => {
      uni.createSelectorQuery().select(".bottomBox").boundingClientRect(data => {
        this.bottomBoxHeight = data.height
        console.log(this.statusBarHeight);
        console.log(this.windowHeight);
      }).exec()
    })
  },
}
</script>


<style scoped lang='scss'>
.parent {
  position: relative;

  swiper {
    height: 252px;
    width: calc(100% - 24px);
    margin: 0 12px;

    swiper-item view {
      height: 100%;
    }

    .red {
      background-color: Pink;
    }

    .green {
      background-color: PaleGreen;
    }

    .blue {
      background-color: SkyBlue;
    }
  }
}




.numDots {
  position: relative;
  top: -40px;
  right: -300px;

  view {
    width: 51-16px;
    height: 24-12px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(41, 41, 41, 0.3);
    padding: 6px 8px;

    image {
      width: 12px;
      height: 12px;
      margin-right: 2px;
    }

    text {
      font-family: PingFang SC, PingFang SC;
      font-weight: 600;
      font-size: 12px;
      color: #FFFFFF;
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
    background-color: #CCCCCC;
  }

  .active {
    width: 30rpx;
    background-color: #15181A;
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

::v-deep .data-v-0e3867ac .u-input__content__field-wrapper__field.data-v-fdbb9fe6 {
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
  background-color: #fff;
  width: 100vw;
  height: 100vh;

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
    width: calc(100% - 32px);
    margin: 0 16px;
    margin-top: 24px;
    background-color: #fff;

    .title {
      font-family: PingFang SC, PingFang SC;
      font-weight: 600;
      font-size: 18px;
      color: #1D2326;
      line-height: 24px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .titleContent {
      margin-top: 12px;
      margin-bottom: 24px;
      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 16px;
      color: rgba(29, 35, 38, 0.8);
      line-height: 24px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .functionBox {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;

      .rightPart {
        display: flex;

        view {
          display: flex;
          align-items: center;

          .frie-svg {
            width: 30px;
            height: 30px;
            margin-left: 14px;

          }

          .star-svg {
            width: 30px;
            height: 30px;
            margin-left: 14px;

          }

          .comment-svg {
            width: 30px;
            height: 30px;
            margin-left: 14px;
          }

          text {
            margin-left: 6px;

          }
        }
      }
    }

  }


  .bottomBox {
    width: 100%;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    padding-bottom: 46px;
    padding-top: 12px;



    .publishButton {
      font-family: PingFang SC, PingFang SC;
      font-weight: 600;
      font-size: 16px;
      color: #FFFFFF;
      line-height: 24px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

  }
}
</style>