<template>
  <view class="confirm-select">
    <text @click="click">确认选择</text>
  </view>
</template>

<script>
export default {
  methods: {
    click() {
      //触发自定义事件
      this.$emit("onConfirm");
    },
  },
};
</script>

<style lang="scss">
.confirm-select {
  width: 100%;
  height: 102px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1);

  text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 44px;
    border-radius: 22px;
    background-color: black;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    margin-top: 12px;
  }
}
</style>
