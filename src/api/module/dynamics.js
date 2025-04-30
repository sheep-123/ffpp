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
		return defHttp.post('/cd/queryCdInfo',data)
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
	},
	// 首页动态列表 /news/getMainNews
	getMainNews(data){
		return defHttp.get('/news/getMainNews',data)
	},
	newsDetail(data){
		return defHttp.get('/news/getNewsDetail',data)
	},
	newsCommentList(data){
		return defHttp.get('/news/getNewsComment',data)
	},
	// /news/
	getNewsCommentReply(data){
		return defHttp.get('/news/getNewsCommentReply',data)
	},
	// 发评论 
	saveNewsComments(data){
		return defHttp.post('/news/saveNewsComments',data)
	},
	// 回复某人评论 /news/saveNewsCommentReply
	saveNewsCommentReply(data){
		return defHttp.post('/news/saveNewsCommentReply',data)
	},
	
	// 动态点赞 /news/saveNewsSupport
	saveNewsSupport(id){
		return defHttp.post('/news/saveNewsSupport?newsId='+id)
	},
	// 收藏 /news/
	 saveNewsCollection(id){
		 return defHttp.post('/news/saveNewsCollection?newsId='+id)
	 },
	 // 动态评论回复 /news/getNewsCommentReply
	 getNewsCommentReply(data){
		 return defHttp.get('/news/getNewsCommentReply',data)
	 },
	 // 回复点赞 /news/saveNewsCommentSupport
	saveNewsCommentSupport(data){
		return defHttp.post(`saveNewsCommentSupport?newsId=${data.newsId}&commentId=${data.commentId}`)
	}
  
}