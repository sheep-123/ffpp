const userId = uni.getStorageSync("user").id;
const configs = {
  development: {
    url: "http://192.168.3.36:8001",
    // url: "http://192.168.3.46:8001",
    wsUrl: `ws://192.168.3.46:8001/ws/message/${userId}`,
    globalWsUrl: `ws://192.168.3.46:8001/ws/notification/${userId}`,
  },
  production: {
    url: "https://testfeifanpaopao.jireplayer.com/wjapi",
    wsUrl: `wss://testfeifanpaopao.jireplayer.com/websocket/ws/message/${userId}`,
    globalWsUrl: `wss://testfeifanpaopao.jireplayer.com/websocket/ws/notification/${userId}`,
  },
};

const env = "development";
// const env = "production";
module.exports = configs[env];
