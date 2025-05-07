import TIM from "tim-js-sdk/tim-js-friendship.js";
import TIMUploadPlugin from "tim-upload-plugin";
import TIMProfanityFilterPlugin from "tim-profanity-filter-plugin";
import config from "@/config/index.js";
const options = {
  SDKAppID: config.SDKAppID,
  // 接入时需要将0替换为您的即时通信应用的 SDKAppID
};
// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
const tim = TIM.create(options); // SDK 实例通常用 tim 表示
// tim.setLogLevel(0);
const TIMData = TIM;
// 注册腾讯云即时通信 IM 上传插件
tim.registerPlugin({
  "tim-upload-plugin": TIMUploadPlugin,
  "tim-profanity-filter-plugin": TIMProfanityFilterPlugin,
});
/* eslint-disable require-jsdoc */
function genTestUserSig(userID) {
  const SDKAPPID = config.SDKAppID;
  const EXPIRETIME = 604800;
  const SECRETKEY =
    "a03e633a7f9e49784a8f1b1d87ebc4d930be70544e13822bdd8f9a0af40acc1";
  const generator = new LibGenerateTestUserSig(SDKAPPID, SECRETKEY, EXPIRETIME);
  const userSig = generator.genTestUserSig(userID);
  return {
    sdkAppId: SDKAPPID,
    userSig: userSig,
  };
}

export default {
  tim,
  TIMData,
  genTestUserSig,
};
