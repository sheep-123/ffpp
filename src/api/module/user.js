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
}