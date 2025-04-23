const toast = (title, icon = 'none', duration=1500) => {
	uni.showToast({
		icon,
		title,
		duration
	})
}

const toPath = {
	navigateTo(url) {
		if (!url) {
			return
		}
		uni.navigateTo({
			url
		})
	},
	reLaunch(url) {
		if (!url) {
			return
		}
		uni.reLaunch({
			url
		})
	},
	redirectTo(url) {
		if (!url) {
			return
		}
		uni.redirectTo({
			url
		})
	},
	switchTab(url) {
		if (!url) {
			return
		}
		uni.switchTab({
			url
		})
	},
	back(showTabar = false) {
		const pages = getCurrentPages();
		if (pages.length > 1) {
			uni.navigateBack({
				delta: 1
			});
			showTabar && uni.showTabBar();
		} else {
			uni.reLaunch({
				url: "/pages/index/index"
			});
			showTabar && uni.showTabBar();
		}
	}
}


export default {
	toast,
	toPath
}