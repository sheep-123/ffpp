const state = {
  allMessage: uni.getStorageSync("allMessage") || [],
};

const mutations = {
  SET_ALL_MESSAGE(state, messages) {
    state.allMessage = messages;
    uni.setStorageSync("allMessage", messages);
  },
};

const actions = {
  async updateAllMessage({ commit }) {
    // 从接口获取最新数据
    const newMessages = await this.$api.getUpdatedMessages();
    commit("SET_ALL_MESSAGE", newMessages);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
