import utils from "@/utils/utils.js";
import {
	judgePermission
} from "@/utils/PermissionManager.js";
import api from "@/api";
export default {
	computed: {
		systemInfo() {
			const systemInfo = uni.getStorageSync('systemInfo')
			if (!systemInfo) {
				return uni.getSystemInfoSync()
			} else {
				return systemInfo
			}
		},
	},
	methods: {


		async TXSearch(keyword, lat, lng) {
			return new Promise((resolve) => {
				api.mapApi.placeSearch({
					keyword,
					lat,
					lng,
					radius: 1000
				}).then((reslut) => {
					if (reslut.status === 200) {
						resolve(reslut.data)
					}
				})
			})
		},

		// 获取当前未知设置 地区
		async getLocationToAddress() {
			return new Promise(async (resolve) => {
				const location = getApp().globalData.location || '';
				// 如果已经缓存记录就直接返回
				if (location.cityName) {
					resolve(location.cityName)
					return
				}

				// 已经保存经纬度
				if (location.latitude) {
					const rej = await this.getTencentMaps(location.latitude, location.longitude);
					if (rej.city) {
						resolve(rej.city)
						getApp().globalData.location.cityName = rej.city;
					} else {
						resolve('未知')
					}
					return
				}

				// 什么都没有
				const res = await this.getLocation();
				if (res) {
					const rej = await this.getTencentMaps(res.latitude, res.longitude);
					if (rej.city) {
						console.log(rej, '经纬度信息转换');
						resolve(rej.city)

						getApp().globalData.location = {
							latitude: res.latitude,
							longitude: res.longitude,
							cityName: rej.city
						};
					} else {
						resolve('未知')
					}
				} else {
					resolve('未知')
				}
			})
		},
		getTencentMaps(lat, lng, poi = 0) {
			return new Promise((resolve) => {
				api.mapApi.reverseGeocoder({
					lng,
					lat,
					getPoi: 1
				}).then(res => {
					if (res.status == 200) {
						if (poi == 0) {
							resolve(res.data.addressInfo)
						} else {
							resolve(res.data.pois)
						}
					}
					console.log(res, '看我的');
				})
			})
		},
		getLoca() {
			return new Promise((resolve) => {
				uni.getLocation({
					type: 'wgs84',
					success: res => {
						console.log(res, '经纬度信息');
						resolve(res)
					},
					fail: err => {
						console.log(err);
						utils.toast('获取定位权限失败');
						resolve()
					}
				})
			})
		},
		getLocation() {
			return new Promise(async (resolve) => {
				judgePermission("scope.userLocation", async () => {
					let res = await this.getLoca();
					if (res) {
						let location = {
							latitude: res.latitude,
							longitude: res.longitude
						}
						getApp().globalData.location = location;
						resolve(location)
					} else {
						resolve()
					}
				}, () => {
					resolve()
				});
			})
		}
	}
}