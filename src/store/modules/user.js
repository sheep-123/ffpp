
import api from '@/api';

// 1、登录 拿到token 本地存储以及state存储
// 2、获取用户信息 本地存储以及state存储

// getter
// isLogin 根据token判断
// getUserInfo 返回state里或者本地存储的用户信息

const state = {
    userInfo: '', // 用户信息
    
};

const getters = {
    // 获取用户信息
    getUserInfoGetter(state) {
        return state.userInfo || JSON.parse(uni.getStorageSync('userInfo')) ;
    },
};

const mutations = { 
    // 设置用户信息
    SET_USER_INFO(state, userInfo) {
        state.userInfo = userInfo;
    },
};

const actions = {
    // 获取用户信息
    async getUserInfo({ commit }) {
        console.log('获取用户信息，调用');
        const userId = uni.getStorageSync("user").id;
        const res = await api.user.getUserInfoById(userId);
        console.log(res,'1111111111111111');
        if(res.status==200){
            // 存储用户信息到本地
            uni.setStorageSync('userInfo', res.data.userInfo);
            // 存储用户信息到state
            commit('SET_USER_INFO', res.data.userInfo);
        }

    },


};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};