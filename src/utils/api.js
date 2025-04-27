export async function queryCdInfo(params) {
  const result = await uni.$u.http.post("/cd/queryCdInfo", params);
  return result;
}
