<script>
import websocket from "@/utils/websocket";
import config from "@/config";
import newMessageMixin from "@/mixins/newMessageMixin";
export default {
  mixins: [newMessageMixin],
  globalData: {
    statusBarHeight: 0, //最顶部框高度单位(px)
    navBarHeight: 0, //导航栏高度单位(px)
    scale: 0, //手机宽度比，px转换rpx（rpx*scale=px）
    location: {}, //用户经纬度
    cachet: {}, //小程序右上角胶囊位置单位(px)
    windowHeight: 0, //可视化高度
    windowWidth: 0, //可视化宽度
    showPrivacy: false, //是否同意隐私正常
    ws: null,
  },
  onLaunch: function () {
    console.log("App Launch");
    //获取手机信息
    const res = uni.getSystemInfoSync();
    uni.setStorageSync("systemInfo", res);
    // 初始化 WebSocket
    this.globalData.ws = websocket;
    websocket.initWebSocket(config.globalWsUrl);
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },

  methods: {
    formatTime(timestamp) {
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    onNewMessage(data) {
      this.getMessageList();
    },
    dian(value) {
      return value.substring(0, 20) + (value.length > 20 ? "..." : "");
    },
    async getMessageList() {
      const user = uni.getStorageSync("user");
      const data = {
        From_Account: user.id,
        TimeStamp: 0,
        StartIndex: 0,
        TopTimeStamp: 0,
        TopStartIndex: 0,
        AssistFlags: 15,
      };

      try {
        // 1. 获取会话列表
        let res = await this.$api.getMessageList(data);
        if (res.status !== 200) throw new Error("获取会话失败");

        const sessionItems = res.data.sessionItem;

        const users = sessionItems
          .filter((item) => item.type !== 2)
          .map((item) => item.to_Account);
        const groups = sessionItems
          .filter((item) => item.type === 2)
          .map((item) => item.groupId);

        const allMessage = [];

        // 2. 获取用户资料
        let profileMap = {};
        if (users.length > 0) {
          const profileRes = await this.$api.getUserProfile({
            To_Account: users,
            TagList: ["Tag_Profile_IM_Nick", "Tag_Profile_IM_Image"],
          });

          if (profileRes.status === 200) {
            profileRes.data.userProfileItem.forEach((profile) => {
              profileMap[profile.to_Account] = {
                nick: profile.profileItem[0]?.value || "未知用户",
                avatar: profile.profileItem[1]?.value || "",
              };
            });
          }
        }

        // 3. 获取单聊所有消息 + 最后一条消息 + 用户信息
        const chatPromises = sessionItems
          .filter((item) => item.type === 1)
          .map(async (matched) => {
            const historyRes = await this.$api.getMessageHistory({
              Operator_Account: user.id,
              Peer_Account: matched.to_Account,
              MaxCnt: 20,
              MinTime: 0,
              MaxTime: Math.floor(Date.now() / 1000),
            });

            let messages = [];
            let lastMsg = "";
            if (
              historyRes.status === 200 &&
              historyRes.data.msgList?.length > 0
            ) {
              messages = historyRes.data.msgList.map((msg) => {
                const textElem = msg.msgBody.find(
                  (body) => body.MsgType === "TIMTextElem"
                );
                return {
                  text: textElem?.MsgContent.Text || "",
                  time: msg.msgTime,
                  isSelf: msg.from_Account == user.id,
                };
              });

              lastMsg =
                messages.length > 0 ? messages[messages.length - 1]?.text : "";
            }

            return {
              type: 1,
              Peer_Account: matched.to_Account,
              ...profileMap[matched.to_Account],
              lastMsg: this.dian(lastMsg),
              message: messages, // ✅ 完整消息数组
              msgTime: this.formatTime(matched.msgTime),
            };
          });

        const chatResults = await Promise.all(chatPromises);
        allMessage.push(...chatResults);

        // 4. 获取群组信息 + 所有消息 + 最后一条消息
        if (groups.length > 0) {
          const groupRes = await this.$api.getGroupList({
            GroupIdList: groups,
            ResponseFilter: {
              GroupBaseInfoFilter: ["Name", "FaceUrl", "LastMsgTime"],
            },
          });

          if (groupRes.status === 200) {
            for (const g of groupRes.data.groupInfo) {
              const matched = sessionItems.find(
                (item) => item.groupId === g.groupId
              );
              if (!matched) continue;

              const groupHistoryRes = await this.$api.getGroupHistory({
                GroupId: matched.groupId,
                ReqMsgNumber: 20,
              });

              let groupMessages = [];
              let lastMsg = "";

              if (
                groupHistoryRes.status === 200 &&
                groupHistoryRes.data.rspMsgList?.length > 0
              ) {
                const fromAccounts = [
                  ...new Set(
                    groupHistoryRes.data.rspMsgList.map(
                      (msg) => msg.from_Account
                    )
                  ),
                ];

                const profileRes = await this.$api.getUserProfile({
                  To_Account: fromAccounts,
                  TagList: ["Tag_Profile_IM_Nick", "Tag_Profile_IM_Image"],
                });

                let userProfiles = {};
                if (
                  profileRes.status === 200 &&
                  profileRes.data.userProfileItem
                ) {
                  profileRes.data.userProfileItem.forEach((profile) => {
                    userProfiles[profile.to_Account] = {
                      nick: profile.profileItem[0]?.value || "匿名",
                      avatar: profile.profileItem[1]?.value || "",
                    };
                  });
                }

                groupMessages = groupHistoryRes.data.rspMsgList.map((msg) => {
                  const textElem = msg.msgBody.find(
                    (body) => body.MsgType === "TIMTextElem"
                  );
                  return {
                    text: textElem?.MsgContent.Text || "",
                    time: msg.msgTime,
                    isSelf: msg.from_Account == user.id,
                    from_Account: msg.from_Account,
                    nick: userProfiles[msg.from_Account]?.nick || "未知用户",
                    avatar: userProfiles[msg.from_Account]?.avatar || "",
                  };
                });

                lastMsg = groupMessages[0]?.text || "";
              }

              allMessage.push({
                type: 2,
                GroupId: g.groupId,
                nick: g.name,
                faceUrl: g.FaceUrl || "",
                lastMsg: this.dian(lastMsg),
                message: groupMessages.reverse(),
                lastMsgTime: this.formatTime(g.lastMsgTime),
              });
            }
          }
        }

        // 5. 获取未读数
        const peerAccounts = allMessage
          .filter((item) => item.type === 1)
          .map((item) => item.Peer_Account);

        const unreadRes = await this.$api.getUserUnreadCount({
          To_Account: user.id,
          Peer_Account: peerAccounts,
        });

        const unreadMap = {};
        if (unreadRes.status === 200 && unreadRes.data.c2CUnreadMsgNumList) {
          unreadRes.data.c2CUnreadMsgNumList.forEach((item) => {
            unreadMap[item.peer_Account] = item.c2CUnreadMsgNum || 0;
          });
        }

        // 6. 合并未读数 & 排序
        const updatedAllMessage = allMessage
          .map((item) => ({
            ...item,
            unreadCount: unreadMap[item.Peer_Account] || 0,
          }))
          .sort((a, b) => {
            const timeA = a.message[a.message.length - 1]?.time || 0;
            const timeB = b.message[b.message.length - 1]?.time || 0;
            return timeB - timeA;
          });

        this.allMessage = updatedAllMessage;
        uni.setStorageSync("allMessage", this.allMessage);
      } catch (err) {
        console.error("加载聊天数据失败:", err);
      }
    },
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
@import "uview-ui/index.scss";

@import "@/static/css/common.scss";

@font-face {
  font-family: "youshe";
  src: url("https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/fonts/youshe.ttf");
}

.safe-bottom {
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
  /* iOS 11.0 - 11.2 */
}
</style>
