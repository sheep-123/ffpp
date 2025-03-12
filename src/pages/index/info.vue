<template>
  <view class="box">
    <u-navbar
      :is-back="true"
      background="red"
      :border-bottom="false"
      :is-fixed="true"
      bgColor="red"
    >
      <view class="info-top">
        <image
          src="/static/images/avatar.png"
          mode="scaleToFill"
          style="width: 36px; height: 36px"
        />
        <view class="right">
          <view class="name">爱运动的橘子</view>
          <view class="time">11.08 12:00 发布</view>
        </view>
      </view>
    </u-navbar>
    <view class="main">
      <u-swiper :list="list" height="704" :effect3d="true"></u-swiper>
      <view class="title"
        >分享我的俱乐部时光，每周三、周四下午五点天河体育场🎾训练</view
      >

      <view class="content">
        位置：体育中心站地铁口D1出来500米，停车方便且划算。价格：室外晚上70，白天60，室内150。
        拍照容易出大片，硬地速度中等。1-4，11-12号场是最香的。
      </view>

      <view class="course">
        <view class="left">
          <view class="ke">课</view>
          <view class="value">1v1网球高阶之路私教体验课</view>
        </view>
        <view class="right">
          <view class="do">去看看</view>
          <image
            src="/static/images/right.png"
            mode="scaleToFill"
            style="width: 12px; height: 12px"
          />
        </view>
      </view>
      <view class="course">
        <view class="left">
          <view class="chang">场</view>
          <view class="value">天河体育中心露天网球场</view>
        </view>
        <view class="right">
          <view class="do">899m</view>
          <image
            src="/static/images/right.png"
            mode="scaleToFill"
            style="width: 12px; height: 12px"
          />
        </view>
      </view>

      <view class="gray"></view>

      <view class="list">
        <view class="item">
        <image
            src="/static/images/avatar.png"
            mode="scaleToFill"
            style="width: 34px;height: 34px;"
        />
        <view class="right">
            <view class="top">
                <view class="left">
                    <view class="name">月诗风吟</view>
                    <view class="time">今天12:00</view>
                </view>
                <view class="right">
                    <image
                        src=""
                        mode="scaleToFill"
                    />

                </view>
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
      list: [
        "/static/images/01.jpg",
        "/static/images/02.jpg",
        "/static/images/03.jpg",
      ],
    };
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;

  .info-top {
    display: flex;
    align-items: center;
    gap: 8px;
    .right {
      .name {
        font-weight: 400;
        font-size: 16px;
        color: #1d2326;
      }

      .time {
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.5);
      }
    }
  }

  .main {
    width: 95%;
    margin: auto;

    .title {
      font-weight: 600;
      font-size: 18px;
      color: #353738;
      margin-top: 12px;
    }

    .content {
      margin-top: 12px;
      font-weight: 400;
      font-size: 16px;
      color: rgba(29, 35, 38, 0.8);
    }

    .course {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f5f5f5;
      padding: 8px 14px;
      margin: 12px 0;
      .left {
        display: flex;
        align-items: center;
        gap: 8px;
        .ke {
          background-color: #ec384a;
          color: white;
          padding: 2px;
          border-radius: 2px;
        }

        .chang {
          background-color: #2a8aba;
          color: white;
          padding: 2px;
          border-radius: 2px;
        }
        .value {
          font-weight: 400;
          font-size: 14px;
          color: rgba(29, 35, 38, 0.8);
        }
      }

      .right {
        display: flex;
        align-items: center;
        .do {
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.6);
        }
      }
    }

    .gray {
      background: #F7F7F7;
      height: 8px;
    }
  }
}
</style>
