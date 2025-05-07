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

}