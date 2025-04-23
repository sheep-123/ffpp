<script>
	export default {
		globalData: {
			statusBarHeight: 0, //最顶部框高度单位(px)
			navBarHeight: 0, //导航栏高度单位(px)
			scale: 0, //手机宽度比，px转换rpx（rpx*scale=px）
			location: {}, //用户经纬度
			cachet: {}, //小程序右上角胶囊位置单位(px)
			windowHeight: 0, //可视化高度
			windowWidth: 0, //可视化宽度
			showPrivacy: false, //是否同意隐私正常
		},
		onLaunch: function() {
			console.log("App Launch");
		},
		onShow: function() {
			console.log("App Show");
			// uni.loadFontFace({
			//   family: "youshe", // 字体名称，需与样式中的 font-family 对应
			//   source:
			//     'url("https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/fonts/youshe.ttf")', // 字体文件的 URL
			//   success: () => {
			//     console.log("字体加载成功");
			//   },
			//   fail: (err) => {
			//     console.error("字体加载失败", err);
			//   },
			// });
		},
		onHide: function() {
			console.log("App Hide");
		},
	};
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";

	@import "@/static/css/common.scss";

	@font-face {
		font-family: "youshe";
		src: url("https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/fonts/youshe.ttf");
	}

	.safe-bottom {
		padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
		padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
		/* iOS 11.0 - 11.2 */
	}
</style>