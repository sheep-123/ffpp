<template>
  <view class="box">
    <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/fabu-bg.png"
      style="width: 100%" />
    <view class="main">
      <view class="tips">
        <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/tips.png" />
        <text>你已加入泡泡{{
           joinDate
        }}天</text>
      </view>
      <view class="content">
        <view class="item" v-for="(item, index) in navList" :key="index">
          <image :src="item.imgUrl" @click="$utils.toPath.navigateTo(item.path)" />
          <view class="title">{{ item.title }}</view>
          <view class="value">{{ item.value }}</view>
        </view>
      </view>
      <view class="delete" @click="$utils.toPath.back(true)">
        <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/delete.png"
          mode="scaleToFill" style="width: 24px; height: 24px" />
      </view>
    </view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      navList: [
        {
          imgUrl:
            "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/发赛事.png",
          title: "发赛事",
          value: "赛场上见",
          path: "/competition/publish/saishi",
        },
        {
          imgUrl:
            "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/发动态.png",
          title: "发动态",
          value: "记录好心情",
          path: "/dynamic/publish/dongtai",
        },
        {
          imgUrl:
            "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/发活动.png",
          title: "发活动",
          value: "敬请期待...",
          path: "",
        },
        {
          imgUrl:
            "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/1V1挑战.png",
          title: "1V1挑战",
          value: "挑战即将开启",
          path: "",
        },
      ],
    };
  },
  computed: {
    joinDate(){
		return uni.getStorageSync('userInfo').joinDays||0
	}
  },
  onShow() {
    uni.hideTabBar();
  },

  methods: {},
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;

  .main {
    width: 90%;
    margin: auto;
    position: relative;

    .tips {
      background: #f3f3f3;
      display: inline-flex;
      gap: 5px;
      align-items: center;
      padding: 4px;
      border-radius: 8rpx;

      image {
        width: 45px;
        height: 16px;
      }

      text {
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.5);
      }
    }

    .content {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 60%;
      justify-content: space-between;

      .item {
        width: 48%;
        position: relative;

        .title {
          position: absolute;
          top: 20px;
          left: 12px;
          font-weight: 400;
          font-size: 20px;
          color: #1d2326;
          font-family: youshe;
        }

        .value {
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.5);
          position: absolute;
          top: 50px;
          left: 12px;
        }

        image {
          width: 100%;
          height: 90px;
        }
      }
    }

    .delete {
      width: 60px;
      height: 60px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 36px;
      background-color: #f5f5f5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
