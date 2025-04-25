import utils from "@/utils/utils.js";
import {
	judgePermission
} from "@/utils/PermissionManager.js";
			const apiKey = "OVPBZ-6ABC5-XWDIP-IVGK4-UJMIS-ALBZT";
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
		
		async TXInverse(address){
			// 
			return new Promise((resolve)=>{
				uni.request({
					url:'https://apis.map.qq.com/ws/geocoder/v1',
					method:'GET',
					data:{
						key:apiKey,
						address
					},
					success(res) {
						console.log(res,'你解析');
					}
				})
			})
		},
		
		async TXSearch(keyword,lat,lng){
			return new Promise((resolve)=>{
				uni.request({
					url:'https://apis.map.qq.com/ws/place/v1/search',
					method:'GET',
					data:{
						key:apiKey,
						keyword,
						boundary:`nearby(${lat},${lng},1000,1)`,
						page_size:20
					},
					success(res) {
						const reslut = res.data;
						if(reslut.status===0){
							resolve(reslut.data)
						}
					}
				})
			})
		},
		
		// 获取当前未知设置 地区
		async getLocationToAddress() {
			return new Promise(async (resolve) => {
				const location = getApp().globalData.location;

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
				if(res){
					const rej = await this.getTencentMaps(res.latitude, res.longitude);
					if(rej.city){
						resolve(rej.city)
						getApp().globalData.location.cityName = rej.city;
					}else{
						resolve('未知')
					}
				}else{
					resolve('未知')
				}
			})
		},
		getTencentMaps(lat, lng, poi = 0) {
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