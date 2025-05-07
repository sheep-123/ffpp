export default {
  queryCdInfo(params) {
    return uni.$u.http.post("/cd/queryCdInfo", params);
  },
  deleteRuleFile(params) {
    return uni.$u.http.post("/file/deleteRuleFile", params);
  },
  getMatchRulesConfig(params) {
    return uni.$u.http.get("/match/getMatchRulesConfig", { params });
  },
  getMessageList(params) {
    return uni.$u.http.post("/api/im/recentContact/getList", params);
  },
  getUserProfile(params) {
    return uni.$u.http.post("/api/im/profile/get", params);
  },
  getMessageHistory(params) {
    return uni.$u.http.post("/api/im/message/history", params);
  },
  sendMessage(params) {
    return uni.$u.http.post("/api/im/message/send", params);
  },
  getGroupList(params) {
    return uni.$u.http.post("/api/im/group/info", params);
  },
  getGroupHistory(params) {
    return uni.$u.http.post("/api/im/message/group/history", params);
  },
};
