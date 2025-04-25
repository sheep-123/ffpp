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


const uploadImg = (requestUrl,filePath,params)=>{
	uni.showLoading({
		title:'上传中...'
	})
	return new Promise((resolve,reject)=>{
		uni.uploadFile({
			url: requestUrl,
			filePath,
			name: "file",
			fileType: "image",
			formData: params,
			header: {
				Authorization: "Bearer " + uni.getStorageSync('token'), // 示例：添加认证信息
			},
			success: (res) => {
				resolve(JSON.parse(res.data).data);
			},
			fail: (err) => {
				reject(err)
			},
			complete() {
				uni.hideLoading()
			}
		});
	})
}


export default {
	toast,
	toPath,
	uploadImg
}