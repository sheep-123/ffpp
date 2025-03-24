const configs = {
  development: {
    url: "http://192.168.3.36:8001",
  },
  production: {
    url: "https://testfeifanpaopao.jireplayer.com/wjapi",
  },
};

const env = process.env.NODE_ENV || 'development';
module.exports = configs[env];