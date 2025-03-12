<template>
  <view class="box">
    <u-navbar bgColor="rgba(0,0,0,0)">
      <view slot="left" class="nav">
        <image
          src="/static/images/back.png"
          mode="scaleToFill"
          style="width: 24px; height: 24px"
          @click="back"
        />
        登录
      </view>
    </u-navbar>

    <view class="main">
      <image
        src="/static/images/LOGO.png"
        mode="scaleToFill"
        style="width: 106px; height: 106px"
      />
      <view class="title">欢迎登录非凡泡泡</view>
      <view class="next-title">热爱让你我相遇</view>
      <view class="bt" @click="login">微信一键登录</view>
      <view class="notice">
        <u-checkbox-group v-model="checked">
          <u-checkbox activeColor="red" shape="circle"></u-checkbox>
        </u-checkbox-group>
        <view class="value"
          >我已阅读同意火爆玩家 <text>《用户协议》</text>和<text
            >《隐私政策》</text
          ></view
        >
      </view>
    </view>

    <u-toast ref="notice"></u-toast>
  </view>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    back() {
      uni.switchTab({
        url: "/pages/index/index",
      });
    },

    login() {
      uni.login({
        provider: "weixin", //使用微信登录
        success: async (res) => {
          let code = res.code ?? "";
          console.log(code);
          if (!code) {
            this.$refs.notice.show({
              type: "error",
              icon: false,
              message: "临时凭证获取失败",
            });
            return false;
          }
          let result= await uni.$u.http.post("/player/login", {code})

          if(result.status==500){
            uni.$refs.notice.show({
              type: "error",
              message: "登录失败",
            });

            uni.setStorageSync("token", result.data.token);
            uni.setStorageSync("user", result.data.user);
            uni.$refs.notice.show({
              type: "success",
              message: "登录成功",
            });   
          }
          
        },
      });
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .nav {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
    color: #1d2326;
  }

  .main {
    width: 80%;
    text-align: center;

    .title {
      font-weight: 600;
      font-size: 20px;
      color: #000000;
      margin-top: 24px;
    }

    .next-title {
      font-weight: 400;
      font-size: 16px;
      color: rgba(29, 35, 38, 0.6);
      margin-top: 10px;
    }

    .bt {
      height: 44px;
      border-radius: 20px;
      background-color: black;
      font-weight: 600;
      font-size: 16px;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 50px;
    }

    .notice {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 400;
      font-size: 10px;
      color: rgba(29, 35, 38, 0.6);
      margin-top: 12px;

      text {
        color: #ec384a;
      }
    }
  }
}
</style>
