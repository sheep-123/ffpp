import { defHttp } from '@/utils/request/index.js';

 
export default {
	// 获取赛事列表
	getRaceList(data){
		return defHttp.post('/match/queryMatchList',data)
	},
	// 获取运动类型
	getSportTypeList(data){
		 return defHttp.get('/match/queryMatchLabel')
	},
	// 获取筛选排序方式
	getDicByName(sysDicName){
		return defHttp.get('/match/getSysDictByName',{
			sysDicName
		})
	}
}