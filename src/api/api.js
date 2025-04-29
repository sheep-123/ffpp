export default {
  queryCdInfo(params) {
    return uni.$u.http.post("/cd/queryCdInfo", params);
  },
};
