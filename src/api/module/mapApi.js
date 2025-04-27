import { defHttp } from '@/utils/request/index.js';

export default {
	// 逆解析接口 /txmap/reverseGeocoder
	reverseGeocoder(data){
		return defHttp.get('/txmap/reverseGeocoder',data)
	},
	// 地址搜索 /txmap/placeSearch
	placeSearch(data){
		return defHttp.get('/txmap/placeSearch',data)
	}
}