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
};
