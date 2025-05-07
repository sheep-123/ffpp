
const state = {
    aaa:''
};

const mutations = {
    
};

const actions = {
    getUserInfo({ commit }, params) {
        return new Promise((resolve, reject) => {
            // Simulate an API call
            setTimeout(() => {
                if (params.username === 'admin') {
                    resolve({ name: 'Admin User', role: 'admin' });
                } else {
                    reject(new Error('User not found'));
                }
            }, 1000);
        });
    }

};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};