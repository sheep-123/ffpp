const configs = {
  development: {
    // url: "http://192.168.3.36:8001",
    url: "http://192.168.3.46:8001",
  },
  production: {
    url: "https://testfeifanpaopao.jireplayer.com/wjapi",
  },
};

// const env = "development";
const env = "production";
module.exports = configs[env];
