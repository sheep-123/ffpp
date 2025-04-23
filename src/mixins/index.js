import utils from "@/utils/utils.js";
import {
	judgePermission
} from "@/utils/PermissionManager.js"
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
		getTencentMaps(lat, lng, poi = 0) {
			const apiKey = "OVPBZ-6ABC5-XWDIP-IVGK4-UJMIS-ALBZT";
			const url = `https://apis.map.qq.com/ws/geocoder/v1?location=${lat+','+lng}&key=${apiKey}&get_poi=${poi}`
			return new Promise((resolve) => {
				uni.request({
					url,
					success: ({
						data
					}) => {
						if (data.status == 0) {
							if (poi == 0) {
								resolve(data.result.address_component)
							} else {
								resolve(data.result.pois || [])
							}
						} else {
							resolve()
						}
					},
					fail: (err) => {
						console.log(err);
						resolve()
					}
				})
			})
		},
		getLoca() {
			return new Promise((resolve) => {
				uni.getLocation({
					type: 'wgs84',
					success: res => {
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