import { defHttp } from '@/utils/request/index.js';


export default {

    // 查询用户信息
    getUserInfoById(id){
        return defHttp.get('/userPage/getUserPageInfo',{
            userId:id
        })
    },
    // 查询我的动态 /news/getMyNews
    getMyNews(params){
        return defHttp.get('/news/getMyNews',{
            params
        })
    },
	// 获取我的订单 /userPage/getUserOrderInfo
	getMyOrderList(data){
		return defHttp.get('/userPage/getUserOrderInfo',data)
	},
	// 获取修改用户信息源数据 /userPage/getUserBasicInfo
	getUserBasicInfo(userId){
		return defHttp.get('/userPage/getUserBasicInfo',{userId})
	},
    // 修改用户信息 /userPage/updateUserBasicInfo
    updateUserBasicInfo(data){
        return defHttp.post('/userPage/updateUserBasicInfo',{
            userId:uni.getStorageSync('user').id,
            ...data
        })
    },
    // 关注用户 /userInteraction/follow
    followUser(data){
        return defHttp.post('/userInteraction/follow',data)
    },
    // 取消关注用户 /userInteraction/unfollow
    unfollowUser(data){
        return defHttp.post('/userInteraction/unfollow',data)
    },
}