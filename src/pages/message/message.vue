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
          v-for="(item, index) in messageList"
          :key="index"
        >
          <view class="avatar">
            <u-avatar
              :src="item.type == 1 ? item.avatar : item.groupInfo.faceUrl"
              size="48"
            ></u-avatar>
            <view class="dian"></view>
          </view>

          <view class="right">
            <view class="top-value">
              <view class="name">{{
                item.type == 1 ? item.nick : item.groupInfo.nick
              }}</view>
              <view class="time">{{
                item.type == 1 ? item.msgTime : item.groupInfo.lastMsgTime
              }}</view>
            </view>
            <view class="value">{{
              item.type == 1 ? item.message : item.groupInfo.lastMsg
            }}</view>
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
  </view>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      active: 1, //1为聊天，2为互动
      messageList: [],
      typeList: ["玩家", "小队", "场地"],
      typeIndex: 0,
      status: "loadmore",
    };
  },
  onLoad() {
    this.getMessageList();
  },
  onShow() {},
  methods: {
    toChat(item) {
      if (item.type == 2) {
        uni.navigateTo({
          url:
            "/else/message/chat?type=" +
            item.type +
            "&GroupId=" +
            item.groupId +
            "&nick=" +
            item.groupInfo.nick,
        });
      } else {
        uni.navigateTo({
          url:
            "/else/message/chat?Peer_Account=" +
            item.to_Account +
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
        this.messageList = res.data.sessionItem;
        const users = this.messageList
          .filter((item) => item.type !== 2)
          .map((item) => item.to_Account);
        const groups = this.messageList
          .filter((item) => item.type === 2)
          .map((item) => item.groupId);

        // 获取用户资料
        if (users.length > 0) {
          const profileParams = {
            To_Account: users,
            TagList: ["Tag_Profile_IM_Nick", "Tag_Profile_IM_Image"],
          };
          const profileRes = await this.$api.getUserProfile(profileParams);

          if (profileRes.status === 200) {
            profileRes.data.userProfileItem.forEach(async (profile) => {
              const matched = this.messageList.find(
                (item) => item.to_Account === profile.to_Account
              );
              if (matched) {
                // let lastMessage = messageMap[matched.to_Account] || "";
                let lastMessage = matched.message || "";
                if (!lastMessage) {
                  const data = {
                    Operator_Account: uni.getStorageSync("user").id,
                    Peer_Account: matched.to_Account,
                    MaxCnt: 20,
                    MinTime: 1,
                    MaxTime: Math.floor(Date.now() / 1000) + 30,
                  };
                  const res = await this.$api.getMessageHistory(data);
                  if (res.status === 200 && res.data.msgList.length > 0) {
                    const textElem = res.data.msgList[0].msgBody.find(
                      (body) => body.MsgType === "TIMTextElem"
                    );
                    lastMessage = textElem?.MsgContent.Text || "";
                  }
                }

                matched.nick = profile.profileItem[0].value;
                matched.avatar = profile.profileItem[1].value;
                matched.msgTime = this.formatTime(matched.msgTime);
                matched.message =
                  (lastMessage || "").substring(0, 20) +
                  (lastMessage.length > 20 ? "..." : "");
              }
            });
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
            groupRes.data.groupInfo.forEach(async (g) => {
              const matched = this.messageList.find(
                (item) => item.groupId === g.groupId
              );
              if (matched) {
                let lastMsg = matched.groupInfo?.lastMsg || "";
                if (!lastMsg) {
                  const result = await this.$api.getGroupHistory({
                    GroupId: matched.groupId,
                    ReqMsgNumber: 1,
                  });
                  if (result.status === 200) {
                    const msgBody = result.data.rspMsgList[0].msgBody;
                    const textElem = Array.isArray(msgBody)
                      ? msgBody.find((body) => body.MsgType === "TIMTextElem")
                      : msgBody?.MsgType === "TIMTextElem"
                      ? msgBody
                      : null;

                    lastMsg = textElem?.MsgContent.Text || "";
                  }
                }
                this.$set(matched, "groupInfo", {
                  nick: g.name,
                  faceUrl: g.FaceUrl || "",
                  lastMsgTime: this.formatTime(g.lastMsgTime),
                  lastMsg:
                    (lastMsg || "").substring(0, 20) +
                    (lastMsg.length > 20 ? "..." : ""),
                });
              }
            });
          }
          for (let item of this.messageList) {
            if (item.type === 2 && !item.groupInfo?.lastMsg) {
              const data = {
                GroupId: item.groupId,
                ReqMsgNumber: 1,
              };
              const result = await this.$api.getGroupHistory(data);
              if (result.status === 200 && result.data.rspMsgList.length > 0) {
                const msgBody = result.data.rspMsgList[0].msgBody;
                const textElem = Array.isArray(msgBody)
                  ? msgBody.find((body) => body.MsgType === "TIMTextElem")
                  : msgBody?.MsgType === "TIMTextElem"
                  ? msgBody
                  : null;

                item.groupInfo.lastMsg = textElem?.MsgContent.Text;
              }
            }
          }
        }
        this.messageList = this.messageList.reverse();
        console.log(this.messageList);
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
