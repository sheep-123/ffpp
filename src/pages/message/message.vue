<template>
  <view class="box">
    <u-navbar :fixed="false">
      <view class="m-top" slot="left">
        <view class="left">
          <view
            @click="active = 1"
            :class="active == 1 ? 'item-active' : 'item'"
            >聊天 <view class="dian1"></view
          ></view>
          <view
            @click="active = 2"
            :class="active == 2 ? 'item-active' : 'item'"
            >互动 <view class="dian1"></view
          ></view>
        </view>
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/message.png"
          mode="scaleToFill"
          style="width: 28px; height: 28px; margin-right: 16px"
        />
      </view>
    </u-navbar>

    <view class="main">
      <view class="message" v-if="active == 2">
        <u-icon name="chat" size="16"></u-icon>
        全部消息
        <view class="biao"></view>
      </view>
      <view class="search" @click="toSearch" v-if="active == 1">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/搜索.png"
          mode="scaleToFill"
          style="width: 24px; height: 24px"
        />
        搜索好友、群聊、等聊天记录
      </view>

      <view class="type" v-if="active == 1">
        <view
          :class="typeIndex == index ? 'item-active' : 'item'"
          v-for="(item, index) in typeList"
          :key="inex"
          @click="typeIndex = index"
          >{{ item }}</view
        >
      </view>

      <view class="list">
        <view
          class="item"
          @click="toChat(item)"
          v-if="active == 1"
          v-for="(item, index) in allMessage"
          :key="index"
        >
          <view class="avatar">
            <u-avatar
              :src="item.type == 1 ? item.avatar : item.groupInfo.faceUrl"
              size="48"
            ></u-avatar>
            <view class="dian" v-if="item.unreadCount > 0"></view>
          </view>

          <view class="right">
            <view class="top-value">
              <view class="name">{{ item.nick }}</view>
              <view class="time">{{
                item.type == 1 ? item.msgTime : item.lastMsgTime
              }}</view>
            </view>
            <view class="value">{{ item.lastMsg }}</view>
          </view>
        </view>
        <view class="move" v-if="active == 2">
          <view class="avatar">
            <u-avatar :src="src" size="48"></u-avatar>
          </view>

          <view class="right">
            <view class="r1">
              <view class="name">奶瓶打不开</view>
              <view class="value">赞了你的动态 10/13 12:00</view>
            </view>
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
              mode="aspectFill"
              style="width: 44px; height: 44px"
            />
          </view>
        </view>
      </view>
    </view>
    <u-toast ref="notice"></u-toast>
    <tabar-view :currentIndex="3"></tabar-view>
  </view>
</template>

<script>
import newMessageMixin from "@/mixins/newMessageMixin";
export default {
  mixins: [newMessageMixin],
  data() {
    return {
      keyword: "",
      active: 1, //1为聊天，2为互动
      messageList: [],
      typeList: ["玩家", "小队", "场地"],
      typeIndex: 0,
      status: "loadmore",
      allMessage: uni.getStorageSync("allMessage") || [],
    };
  },
  onLoad() {
    this.loadChatData();
  },
  onShow() {
    this.allMessage = uni.getStorageSync("allMessage") || [];
  },
  methods: {
    async onNewMessage(data) {
      setTimeout(() => {
        this.allMessage = uni.getStorageSync("allMessage") || [];
      }, 1500);
    },
    toChat(item) {
      if (item.type == 2) {
        uni.navigateTo({
          url:
            "/else/message/chat?type=" +
            item.type +
            "&GroupId=" +
            item.GroupId +
            "&nick=" +
            item.nick,
        });
      } else {
        uni.navigateTo({
          url:
            "/else/message/chat?Peer_Account=" +
            item.Peer_Account +
            "&nick=" +
            item.nick +
            "&avatar=" +
            item.avatar +
            "&type=" +
            item.type,
        });
      }
    },
    toSearch() {
      uni.navigateTo({
        url: "/else/message/search",
      });
    },
    formatTime(timestamp) {
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    dian(value) {
      return value.substring(0, 20) + (value.length > 20 ? "..." : "");
    },
    async loadChatData() {
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

      let res = await this.$api.getMessageList(data);

      if (res.status === 200) {
        const sessionItems = res.data.sessionItem;

        const users = sessionItems
          .filter((item) => item.type !== 2)
          .map((item) => item.to_Account);
        const groups = sessionItems
          .filter((item) => item.type === 2)
          .map((item) => item.groupId);

        const allMessage = [];

        // 获取用户资料
        if (users.length > 0) {
          const profileParams = {
            To_Account: users,
            TagList: ["Tag_Profile_IM_Nick", "Tag_Profile_IM_Image"],
          };
          const profileRes = await this.$api.getUserProfile(profileParams);

          if (profileRes.status === 200) {
            for (const profile of profileRes.data.userProfileItem) {
              const matched = sessionItems.find(
                (item) => item.to_Account === profile.to_Account
              );
              if (matched) {
                const historyRes = await this.$api.getMessageHistory({
                  Operator_Account: user.id,
                  Peer_Account: matched.to_Account,
                  MaxCnt: 20,
                  MinTime: 0,
                  MaxTime: Math.floor(Date.now() / 1000),
                });

                const messages = [];
                if (
                  historyRes.status === 200 &&
                  historyRes.data.msgList?.length > 0
                ) {
                  historyRes.data.msgList.forEach((msg) => {
                    const textElem = msg.msgBody.find(
                      (body) => body.MsgType === "TIMTextElem"
                    );
                    if (textElem) {
                      messages.push({
                        text: textElem.MsgContent.Text,
                        time: msg.msgTime,
                        isSelf: msg.from_Account == user.id,
                      });
                    }
                  });
                }

                const lastMsg =
                  messages.length > 0
                    ? messages[messages.length - 1]?.text
                    : "";

                allMessage.push({
                  type: 1,
                  Peer_Account: matched.to_Account,
                  nick: profile.profileItem[0]?.value || "未知用户",
                  avatar: profile.profileItem[1]?.value || "",
                  lastMsg: this.dian(lastMsg),
                  message: messages,
                  msgTime: this.formatTime(matched.msgTime),
                });
              }
            }
          }
        }

        // 获取群组信息
        if (groups.length > 0) {
          const groupData = {
            GroupIdList: groups,
            ResponseFilter: {
              GroupBaseInfoFilter: ["Name", "FaceUrl", "LastMsgTime"],
            },
          };
          const groupRes = await this.$api.getGroupList(groupData);

          if (groupRes.status === 200) {
            for (const g of groupRes.data.groupInfo) {
              const matched = sessionItems.find(
                (item) => item.groupId === g.groupId
              );

              if (matched) {
                const groupHistoryRes = await this.$api.getGroupHistory({
                  GroupId: matched.groupId,
                  ReqMsgNumber: 20,
                });

                const groupMessages = [];
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
                    // 构建一个 from_Account -> 用户信息 的映射表
                    for (const profile of profileRes.data.userProfileItem) {
                      const accountId = profile.to_Account;
                      const nick = profile.profileItem[0]?.value || "匿名";
                      const avatar = profile.profileItem[1]?.value || "";

                      userProfiles[accountId] = { nick, avatar };
                    }
                  }
                  groupHistoryRes.data.rspMsgList.forEach((msg) => {
                    const textElem = msg.msgBody.find(
                      (body) => body.MsgType === "TIMTextElem"
                    );

                    if (textElem) {
                      groupMessages.push({
                        text: textElem.MsgContent.Text,
                        time: msg.msgTime,
                        isSelf: msg.from_Account == user.id,
                        from_Account: msg.from_Account,
                        nick:
                          userProfiles[msg.from_Account]?.nick || "未知用户",
                        avatar: userProfiles[msg.from_Account]?.avatar || "",
                      });
                    }
                  });
                }

                const lastMsg =
                  groupMessages.length > 0 ? groupMessages[0]?.text : "";

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
        }

        this.allMessage = allMessage.sort((a, b) => {
          const timeA = a.message[a.message.length - 1]?.time || 0;
          const timeB = b.message[b.message.length - 1]?.time || 0;
          return timeB - timeA;
        });
        uni.setStorageSync("allMessage", this.allMessage);
      }
    },
    async getUserUnreadCount() {
      try {
        const user = uni.getStorageSync("user");
        const allMessage = this.allMessage;
        const peerAccounts = allMessage
          .filter((item) => item.type === 1) // type=1 是单聊
          .map((item) => item.Peer_Account);

        const result = await this.$api.getUserUnreadCount({
          To_Account: user.id,
          Peer_Account: peerAccounts, // 动态传入所有单聊用户
        });

        if (result.status === 200) {
          const unreadList = result.data.unreadList || [];

          const unreadMap = {};
          unreadList.forEach((item) => {
            const key = item.Peer_Account || item.GroupId;
            unreadMap[key] = item.unreadCount || 0;
          });

          const updatedAllMessage = this.allMessage.map((item) => {
            const key = item.Peer_Account || item.GroupId;
            return {
              ...item,
              unreadCount: unreadMap[key] || 0,
            };
          });

          this.allMessage = updatedAllMessage;
          uni.setStorageSync("allMessage", this.allMessage);
        }
      } catch (err) {
        console.error("获取未读消息失败:", err);
      }
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  padding-bottom: 100px;
  .m-top {
    margin-left: 5%;
    display: flex;
    justify-content: space-between;
    width: 280px;
    .left {
      display: flex;
      gap: 27px;
      .item {
        font-weight: 600;
        font-size: 20px;
        color: rgba(29, 35, 38, 0.3);
        position: relative;
        .dian1 {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #ec383c;
          position: absolute;
          top: 0;
          right: -3px;
        }
      }
      .item-active {
        font-weight: 600;
        font-size: 20px;
        color: black;
        position: relative;
        .dian1 {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #ec383c;
          position: absolute;
          top: 0;
          right: -3px;
        }
      }
    }
  }
  .main {
    width: 90%;
    height: 100%;
    margin: auto;
    .message {
      display: flex;
      align-items: center;
      gap: 5px;
      width: 105px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 22px;
      border: 1px solid #f0f0f0;
      box-sizing: border-box;
      font-weight: 600;
      font-size: 12px;
      color: #1d2326;
      margin-top: 25px;
      .biao {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid black;
      }
    }

    .search {
      margin-top: 10px;
      height: 36px;
      border-radius: 18px;
      background-color: #f7f7f7;
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 400;
      font-size: 14px;
      color: rgba(29, 35, 38, 0.5);
      padding-left: 12px;
    }
    .type {
      margin-top: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      .item-active {
        background: url("https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/group.png")
          no-repeat center;
        width: 70px;
        height: 36px;
        font-weight: 600;
        font-size: 14px;
        color: #ffffff;
        text-align: center;
        line-height: 31px;
        padding-left: 3px;
      }
      .item {
        width: 76px;
        height: 30px;
        border-radius: 15px;
        border: 1px solid #f0f0f0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 14px;
        color: rgba(29, 35, 38, 0.3);
      }
    }

    .list {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      gap: 18px;
      .item {
        display: flex;
        align-items: center;
        gap: 10px;
        .avatar {
          position: relative;
          .dian {
            position: absolute;
            top: 0;
            right: 0;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #ec383c;
          }
        }
        image {
          width: 48px;
          height: 48px;
        }
        .right {
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex: 1;

          .top-value {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .name {
              font-weight: 400;
              font-size: 16px;
              color: #1d2326;
            }
            .time {
              font-weight: 400;
              font-size: 12px;
              color: rgba(29, 35, 38, 0.5);
            }
          }

          .value {
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.5);
          }
        }
      }
      .move {
        display: flex;
        align-items: center;
        gap: 10px;
        .avatar {
          position: relative;
          .dian {
            position: absolute;
            top: 0;
            right: 0;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #ec383c;
          }
        }

        .right {
          gap: 6px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .r1 {
            display: flex;
            flex-direction: column;
            gap: 5px;
            .name {
              font-weight: 400;
              font-size: 16px;
              color: #1d2326;
            }
            .value {
              font-weight: 400;
              font-size: 12px;
              color: rgba(29, 35, 38, 0.5);
            }
          }
        }
      }
    }
  }
}
</style>
