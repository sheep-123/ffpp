import { defHttp } from '@/utils/request/index.js';

export default {
    // 获取地图赛事信息 /api/map/getMapMatchInfo
    getMapMatchInfo(params) {
        return defHttp.get('/api/map/getMapMatchInfo', params);
    },
    // 获取地图场地信息 /api/map/getMapCdInfo
    getMapCdInfo(params) {
        return defHttp.get('/api/map/getMapCdInfo', params);
    },
    // 获取赛事详细信息 /api/map/getMatchDetail
    getMatchDetail(params) {
        return defHttp.get('/api/map/getMatchDetail', params);
    },
    // 获取场地详细信息 /api/map/getCdDetail
    getCdDetail(params) {
        return defHttp.get('/api/map/getCdDetail', params);
    },

}