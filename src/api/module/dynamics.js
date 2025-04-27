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
	},
	// 获取发布动态流水号
	getNewsSerialNum(){
		return defHttp.get('/news/getNewsSerialNum')
	},
	// 根据id删除图片
	delImg(id){
		return defHttp.delete('/news/delFile?id='+id)
	},
	// 获取场地列表
	getSiteList(data){
		return defHttp.get('/cd/queryCdInfo',data)
	} ,
	// 获取行政区县信息
	queryAdCode(code){
		return defHttp.get('/match/queryAdCode',{adcode4:code})
	},
	// 根据区县查街道
	queryStreetCode(code){
		return defHttp.get('/match/queryStreetCode',{adcode6:code})
	},
	// 动态发布 /news/saveNewsRelease
	saveNewsRelease(data){
		return defHttp.post('/news/saveNewsRelease',data)
	}
	
	
	
	
  
}