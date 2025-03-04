<template>
  <view>
    <view class="bt">
      <u-button type="primary" :text="num" @click="handleClick"></u-button
    ></view>
    <view class="bt1">
      <u-button type="primary" text="点击跳转到登录界面" @click="click"></u-button>
    </view>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
export default {
  data() {
    return {
      disabled: true,
      num: 0,
    };
  },
  onShow() {
    console.log(626521);
  },
  methods: {
    async handleClick() {
      this.num = this.num + 1;
      var result = await uni.$u.http.post("click");
      if (result.code === 1) {
        this.$refs.uToast.show({
          type: "success",
          message: result.msg,
          duration: 1000,
        });
      }
    },
    async click(){
      // uni.navigateTo({
      //   url: '/pages/user/login' 
      // })
      uni.$u.route({
        url: '/pages/user/login'
      })
    }
  },
};
</script>

<style>
.bt {
  width: 200px;
}

.bt1{
  width: 200px;
  margin-top: 20px;
}
</style>
