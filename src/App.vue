<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  // onShow() {
  //   uni.loadFontFace({
  //     family: "youshe", // 字体名称，需与样式中的 font-family 对应
  //     source:
  //       'url("https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/fonts/youshe.ttf")', // 字体文件的 URL
  //     success: () => {
  //       console.log("字体加载成功");
  //     },
  //     fail: (err) => {
  //       console.error("字体加载失败", err);
  //     },
  //   });
  // },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-ui/index.scss";
</style>
