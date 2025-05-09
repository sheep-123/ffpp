<template>
  <view class="box" @click="hideTooltip">
    <u-navbar :fixed="false" :title="nick" autoBack> </u-navbar>
    <view class="challenge" v-if="challengeStatus" :style="{ top: stickyTop }">
      <view class="top">
        <view class="left"> <text>篮球使者</text> 对你发起篮球1V1挑战</view>
        <view class="right"> 10人已围观 </view>
      </view>
      <view class="mid">
        <view class="item">
          <u-avatar :src="src"></u-avatar>
          篮球使者
        </view>
        <view class="vs">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/vs.png"
            mode="scaleToFill"
            style="width: 50px; height: 50px"
          />
          10:00-12:00篮球2号场
        </view>
        <view class="item">
          <u-avatar :src="src"></u-avatar>
          篮球使者
        </view>
      </view>
      <view class="bottom">
        <view class="accpet" @click="challengeStatus = false"> 接受 </view>
        <view class="close" @click="challengeStatus = false"> 关闭 </view>
      </view>
    </view>

    <view class="first">
      <view class="left">
        <view class="item"> 今日活跃 300 </view>
        <view class="item"> 在线 48 <view class="dian"></view> </view>
      </view>
      <u-icon name="list" size="16"></u-icon>
    </view>
    <view class="second" :style="upStatus ? 'height: 47%' : 'height: 13%'">
      <view class="top">
        <input
          class="input"
          placeholder="来聊聊你的想法..."
          v-model="talk"
          @confirm="send"
          cursor-spacing="12"
        />
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/发表情.png"
          mode="scaleToFill"
          style="width: 30px; height: 30px; display: block"
        />
        <view
          @click="
            upStatus = !upStatus;
            this.scrollToBottom();
          "
        >
          <u-icon name="plus-circle" size="35" color="black"></u-icon
        ></view>
      </view>

      <view class="second-content" v-if="upStatus">
        <view class="item" @click="tozudui">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/快速组队.png"
            mode="scaleToFill"
            style="width: 54px; height: 54px"
          />
          快速组队
        </view>
        <view class="item">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/发起挑战.png"
            mode="scaleToFill"
            style="width: 54px; height: 54px"
          />
          发起挑战
        </view>
      </view>
    </view>

    <view class="myTeam">
      <view class="bg">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/我的队伍.png"
          mode="scaleToFill"
          style="width: 16px; height: 16px"
        />
      </view>
      我的队伍
    </view>
    <view class="hdlb" @click="tohuodong">
      <view class="bg">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/活动列表.png"
          mode="scaleToFill"
          style="width: 16px; height: 16px"
        />
      </view>
      活动列表
    </view>
    <scroll-view
      id="main"
      :scroll-top="scrollTop"
      scroll-y
      @click="show = false"
      :style="upStatus ? 'height: 39%' : 'height: 73%'"
    >
      <view class="main">
        <view
          class="others"
          v-if="!item.isSelf"
          v-for="(item, index) in message"
          :key="index"
        >
          <view class="avatar">
            <u-avatar
              :src="type == 2 ? item.avatar : avatar"
              size="36"
              @tap.stop="toggleTooltip(index)"
            ></u-avatar>
            <view
              class="tooltip"
              v-show="showTooltip && currentIndex === index"
            >
              <view class="item"> 查看主页 </view>
              <view class="item" @tap.stop="tozudui"> 邀请组队 </view>
              <view class="item" @tap.stop="tochallenge"> 发起挑战 </view>
            </view>
          </view>

          <view class="right">
            <view class="name">{{ type == 2 ? item.nick : nick }}</view>
            <view class="text chat-message">{{ item.text }}</view>
          </view>
        </view>
        <!-- <view class="others">
          <view class="avatar">
            <u-avatar :src="src" size="36"></u-avatar>
          </view>
          <view class="right">
            <view class="name">小明</view>
            <view class="content">
              <view class="top">
                <view class="left"> 组队信息 <text>足球</text> </view>
                <view class="right">10分钟前</view>
              </view>
              <u-avatar-group :urls="urls" gap="0.4" size="20"></u-avatar-group>
              <view class="mid"> 集合时间 <text>2022-06-01 18:00</text> </view>
              <view class="mid"> 集合地点 <text>绿茵足球2号场</text> </view>
              <view class="third">
                <view class="left">
                  <view class="item"> 10等1</view>
                  <view class="item"><u-icon name="account"></u-icon>11</view>
                </view>
                <view class="look">查看</view>
              </view>
            </view>
          </view>
        </view> -->
        <view class="user" v-else>
          <view class="right">
            <view class="text chat-message">{{ item.text }}</view>
          </view>
          <u-avatar :src="src" size="36"></u-avatar>
        </view>
        <!-- <view class="user">
          <view class="right">
            <view class="content">
              <view class="top">
                <view class="left"> 组队信息 <text>足球</text> </view>
                <view class="right">10分钟前</view>
              </view>
              <u-avatar-group :urls="urls" gap="0.4" size="20"></u-avatar-group>
              <view class="mid"> 集合时间 <text>2022-06-01 18:00</text> </view>
              <view class="mid"> 集合地点 <text>绿茵足球2号场</text> </view>
              <view class="third">
                <view class="left">
                  <view class="item"> 10等1</view>
                  <view class="item"><u-icon name="account"></u-icon>11</view>
                </view>
                <view class="look">查看</view>
              </view>
            </view>
          </view>
          <u-avatar :src="src" size="36"></u-avatar>
        </view> -->
      </view>
    </scroll-view>
    <u-toast ref="notice"></u-toast>
  </view>
</template>

<script>
import config from "@/config";
export default {
  data() {
    return {
      src: uni.getStorageSync("user").avatarUrl,
      urls: [
        "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/头像.png",
        "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/头像.png",
        "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/头像.png",
        "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/头像.png",
        "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/头像.png",
        "https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/头像.png",
      ],
      upStatus: false,
      scrollTop: 0,
      show: false,
      challengeStatus: false,
      statusBarHeight: 0,
      navbarHeight: 44,
      Peer_Account: null,
      nick: null,
      avatar: null,
      message: [],
      talk: "",
      currentIndex: null,
      showTooltip: false,
      allMessage: uni.getStorageSync("allMessage") || [],
      socket: null,
      GroupId: null,
      type: null,
      memberList: [],
    };
  },
  onLoad(options) {
    this.initWebSocket();
    if (options.challengeStatus) {
      this.challengeStatus = true;
    }
    if (options.type == 1) {
      this.type = 1;
      this.Peer_Account = options.Peer_Account;
      this.nick = options.nick;
      this.avatar = options.avatar;
      // 先从缓存获取消息
      const cached = this.allMessage.find(
        (item) => item.Peer_Account === this.Peer_Account
      );
      if (cached) {
        this.message = cached.message || [];
        this.nick = cached.nick || this.nick;
        this.avatar = cached.avatar || this.avatar;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        return;
      }

      // 如果没有缓存，则请求接口
      this.getMessageHistory();
    }
    if (options.type == 2) {
      this.type = 2;
      this.GroupId = options.GroupId;
      this.nick = options.nick;

      // 先从缓存获取消息
      const cached = this.allMessage.find(
        (item) => item.GroupId === this.GroupId
      );
      if (cached) {
        this.message = cached.message || [];
        this.nick = cached.nick || this.nick;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        return;
      }

      // 如果没有缓存，则请求接口
      this.getGroupHistory();
    }

    const systemInfo = uni.getSystemInfoSync();
    this.statusBarHeight = systemInfo.statusBarHeight;
  },
  onUnload() {
    uni.closeSocket();
  },

  computed: {
    stickyTop() {
      return `${this.statusBarHeight + this.navbarHeight}px`;
    },
  },
  methods: {
    async getMessageHistory() {
      try {
        var data = {
          Operator_Account: uni.getStorageSync("user").id,
          Peer_Account: this.Peer_Account,
          MaxCnt: 20,
          MinTime: 1,
          MaxTime: Math.floor(Date.now() / 1000) + 30,
        };
        var res = await this.$api.getMessageHistory(data);

        if (res.status == 200) {
          const list = res.data.msgList;
          this.message = list.map((msg) => {
            const textElem = msg.msgBody.find(
              (body) => body.MsgType == "TIMTextElem"
            );
            return {
              text: textElem?.MsgContent.Text || "",
              isSelf: msg.from_Account == uni.getStorageSync("user").id,
            };
          });
          const userIndex = this.allMessage.findIndex(
            (item) => item.Peer_Account == this.Peer_Account
          );
          if (userIndex >= 0) {
            this.allMessage[userIndex].message = this.message;
          } else {
            this.allMessage.push({
              type: 1,
              Peer_Account: this.Peer_Account,
              nick: this.nick,
              avatar: this.avatar,
              message: this.message,
            });
          }

          uni.setStorageSync("allMessage", this.allMessage);
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        }
      } catch (e) {
        console.log(e);
        this.$refs.notice.show({
          type: "default",
          message: e.data.message || "获取消息失败",
        });
      }
    },
    tozudui() {
      this.hideTooltip();
      uni.navigateTo({
        url: "/else/message/team",
      });
    },
    scrollToBottom() {
      setTimeout(() => {
        this.scrollTop += 10000000000000000;
      }, 50);
    },
    back() {
      uni.switchTab({ url: "/pages/message/message" });
    },
    toggleTooltip(index) {
      if (this.currentIndex === index) {
        this.showTooltip = !this.showTooltip;
      } else {
        this.showTooltip = true;
      }
      this.currentIndex = index;
    },
    hideTooltip() {
      this.showTooltip = false;
      this.currentIndex = null;
    },
    tohuodong() {
      uni.navigateTo({
        url: "/else/message/huodong",
      });
    },
    tochallenge() {
      this.hideTooltip();
      uni.navigateTo({
        url: "/else/message/challenge",
      });
    },
    async send() {
      if (!this.talk.trim()) return;
      try {
        if (this.type == 1) {
          var data = {
            From_Account: uni.getStorageSync("user").id,
            To_Account: this.Peer_Account,
            MsgRandom: Math.floor(Math.random() * 9000000) + 1000000,
            MsgBody: [
              {
                MsgType: "TIMTextElem",
                MsgContent: {
                  Text: this.talk,
                },
              },
            ],
            SyncOtherMachine: 1,
            OnlineOnlyFlag: 0,
          };
          var result = await this.$api.sendMessage(data);
          if (result.status == 200) {
            const messageItem = {
              text: this.talk,
              isSelf: true,
            };

            // 更新缓存
            const userIndex = this.allMessage.findIndex(
              (item) => item.Peer_Account === this.Peer_Account
            );
            if (userIndex >= 0) {
              this.allMessage[userIndex].message.push(messageItem);
            } else {
              this.allMessage.push({
                type: 1,
                Peer_Account: this.Peer_Account,
                nick: this.nick,
                avatar: this.avatar,
                message: [messageItem],
              });
            }
            uni.setStorageSync("allMessage", this.allMessage);
            this.talk = "";
            this.$nextTick(() => {
              this.scrollToBottom();
            });
          }
        } else {
          var data = {
            GroupId: this.GroupId,
            Random: Math.floor(Math.random() * 1000000),
            MsgBody: [
              {
                MsgType: "TIMTextElem",
                MsgContent: {
                  Text: this.talk,
                },
              },
            ],
            From_Account: uni.getStorageSync("user").id,
          };
          var res = await this.$api.sendGroupMessage(data);
          if (res.status == 200) {
            const messageItem = {
              text: this.talk,
              isSelf: true,
              nick: this.nick,
              avatar: this.src,
              from_Account: uni.getStorageSync("user").id,
            };

            // 更新缓存
            const groupIndex = this.allMessage.findIndex(
              (item) => item.GroupId === this.GroupId
            );
            if (groupIndex >= 0) {
              this.allMessage[groupIndex].message.push(messageItem);
            } else {
              this.allMessage.push({
                type: 2,
                GroupId: this.GroupId,
                nick: this.nick,
                message: [messageItem],
              });
            }
            uni.setStorageSync("allMessage", this.allMessage);
            this.talk = "";
            this.$nextTick(() => {
              this.scrollToBottom();
            });
          }
        }
      } catch (err) {
        console.log(err);
        this.$refs.notice.show({
          type: "default",
          message: err.data.message || "发送失败",
        });
      }
    },
    initWebSocket() {
      const ws = config.wsUrl;
      this.socket = uni.connectSocket({
        url: ws,
      });
      uni.onSocketMessage(async (res) => {
        if (this.type == 1) {
          this.getMessageHistory();
        } else {
          this.getGroupHistory();
        }
      });

      uni.onSocketError((res) => {
        console.log("连接失败", res);
      });
    },
    async getGroupHistory() {
      try {
        var data = {
          GroupId: this.GroupId,
          ReqMsgNumber: 20,
        };
        var res = await this.$api.getGroupHistory(data);
        if (res.status == 200) {
          const list = res.data.rspMsgList;
          const newList = list.filter((item) => Array.isArray(item.msgBody));
          this.message = newList
            .map((msg) => {
              const textElem = msg.msgBody.find(
                (body) => body.MsgType === "TIMTextElem"
              );
              const sender = this.memberList.find(
                (item) => item.member_Account == msg.from_Account
              );
              return {
                text: textElem?.MsgContent.Text || "",
                isSelf: msg.from_Account == uni.getStorageSync("user").id,
                nick: sender?.nick || "",
                avatar: sender?.avatar || "",
                from_Account: msg.from_Account,
              };
            })
            .reverse();
          const userIndex = this.allMessage.findIndex(
            (item) => item.GroupId == this.GroupId
          );
          if (userIndex >= 0) {
            this.allMessage[userIndex].message = this.message;
          } else {
            this.allMessage.push({
              type: 2,
              GroupId: this.GroupId,
              nick: this.nick,
              message: this.message,
            });
          }

          uni.setStorageSync("allMessage", this.allMessage);
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        }
      } catch (err) {
        console.log(err);
        this.$refs.notice.show({
          type: "default",
          message: err.data.message || "消息获取失败",
        });
      }
    },
    async getGroupMember() {
      var result = await this.$api.getGroupMember({
        GroupId: this.GroupId,
      });
      if (result.status == 200) {
        const memberList = result.data.memberList;
        const member_Account = memberList.map(
          (member) => member.member_Account
        );
        const res = await this.$api.getUserProfile({
          To_Account: member_Account,
          TagList: ["Tag_Profile_IM_Nick", "Tag_Profile_IM_Image"],
        });
        if (res.status == 200) {
          const profiles = res.data.userProfileItem;
          const profileMap = {};
          profiles.forEach((profile) => {
            profileMap[profile.to_Account] = {
              nick: profile.profileItem[0].value,
              avatar: profile.profileItem[1].value,
            };
          });
          const info = memberList.map((member) => ({
            ...member,
            nick: profileMap[member.member_Account]?.nick || "",
            avatar: profileMap[member.member_Account]?.avatar || "",
          }));
          this.memberList = info;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  position: relative;
  display: flex;
  flex-direction: column;
  .nav {
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 600;
    font-size: 16px;
    color: #1d2326;
  }
  .first {
    position: sticky;
    top: 0;
    left: 0;
    background-color: #fbfbfb;
    width: 100%;
    height: 34px;
    font-weight: 400;
    font-size: 12px;
    color: #1d2326;
    display: flex;
    align-items: center;
    padding: 0 16px;
    justify-content: space-between;
    box-sizing: border-box;

    .left {
      display: flex;
      align-items: center;
      gap: 14px;
      .item {
        display: flex;
        align-items: center;
        gap: 4px;
        .dian {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #06b66c;
        }
      }
    }
  }
  .second {
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    z-index: 99;
    .top {
      display: flex;
      padding-top: 16px;
      justify-content: space-around;
      box-sizing: border-box;
      .input {
        width: 70%;
        background-color: #f0f0f0;
        height: 36px;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 0px 12px;
        font-weight: 400;
        font-size: 14px;
        color: rgba(29, 35, 38, 0.6);
      }
    }
    .second-content {
      width: 90%;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      margin-top: 32px;
      .item {
        width: 25%;
        display: flex;
        flex-direction: column;
        gap: 6px;
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.6);
        align-items: center;
        margin-bottom: 12px;
      }
    }
  }
  .challenge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(360deg, #fef8f8 0%, #ffffff 100%);
    overflow: hidden;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border: 1px solid #fff;
    z-index: 999999999;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 90%;
      margin: auto;
      text {
        font-weight: 400;
        font-size: 14px;
        color: #ec384a;
      }
    }
    .mid {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin-top: 20px;
      .item {
        display: flex;
        flex-direction: column;
        gap: 3px;
        align-items: center;
        font-weight: 600;
        font-size: 12px;
        color: #1d2326;
      }
      .vs {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        font-weight: 400;
        font-size: 12px;
        color: #ec384a;
      }
    }
    .bottom {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin: 12px 0;
      .accpet {
        width: 30%;
        height: 32px;
        border-radius: 18px;
        background-color: #ec384a;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 400;
        font-size: 14px;
        color: #ffffff;
      }
      .close {
        width: 30%;
        height: 32px;
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #f0f0f0;
        font-weight: 400;
        font-size: 14px;
        color: #1d2326;
      }
    }
  }
  .myTeam {
    position: absolute;
    right: 5px;
    top: 73%;
    z-index: 999;
    .bg {
      width: 28px;
      height: 28px;
      background-color: #d2f0ff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 4px auto;
    }
    font-weight: 400;
    font-size: 10px;
    color: rgba(29, 35, 38, 0.6);
  }
  .hdlb {
    position: absolute;
    right: 5px;
    top: 80%;
    z-index: 999;
    .bg {
      width: 28px;
      height: 28px;
      background-color: #d2f0ff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 4px auto;
    }
    font-weight: 400;
    font-size: 10px;
    color: rgba(29, 35, 38, 0.6);
  }
  .main {
    width: 90%;
    margin: auto;
    z-index: 88;
    padding-bottom: 16px;
    box-sizing: border-box;
    .others {
      display: flex;
      gap: 10px;
      margin-top: 16px;
      .avatar {
        position: relative;
        .tooltip {
          position: absolute;
          left: 47px;
          top: 0;
          background-color: #1d2326;
          padding: 0 15px;
          border-radius: 5px;
          .item {
            font-weight: 400;
            font-size: 14px;
            color: #ffffff;
            white-space: nowrap;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            padding: 12px 0;

            &:last-child {
              border-bottom: none;
            }
            &:first-child {
              position: relative;
              &:before {
                content: "";
                position: absolute;
                top: 5px;
                left: -20px;
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
                border-right: 5px solid #1d2326;
              }
            }
          }
        }
      }

      .right {
        max-width: 70%;
        .name {
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.6);
        }
        .text {
          display: inline-block;
          box-sizing: border-box;
          padding: 10px 12px;
          font-weight: 400;
          font-size: 16px;
          color: #1d2326;
          background-color: #fff;
          margin-top: 4px;
          border-radius: 5px;
        }
        .content {
          box-sizing: border-box;
          padding: 12px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-radius: 5px;
          .top {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .left {
              font-weight: 400;
              font-size: 14px;
              color: #1d2326;
              display: flex;
              align-items: center;
              gap: 5px;
              text {
                border: 1px solid #ec384a;
                width: 28px;
                height: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 10px;
                color: #ec384a;
              }
            }
            .right {
              font-weight: 400;
              font-size: 12px;
              color: rgba(29, 35, 38, 0.3);
              width: auto;
            }
          }
          .mid {
            display: flex;
            align-items: center;
            gap: 3px;
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.6);
            text {
              color: rgba(29, 35, 38, 1);
            }
          }
          .third {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left {
              display: flex;
              align-items: center;
              gap: 12px;
              font-weight: 400;
              font-size: 12px;
              color: #15181a;
              .item {
                display: flex;
                align-items: center;
                gap: 2px;
              }
            }
            .look {
              width: 52px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: black;
              font-weight: 600;
              font-size: 12px;
              color: #ffffff;
              border-radius: 12px;
            }
          }
        }
      }
    }
    .user {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: 16px;

      .right {
        max-width: 70%;
        .name {
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.6);
        }
        .text {
          box-sizing: border-box;
          padding: 10px 12px;
          font-weight: 400;
          font-size: 16px;
          color: #1d2326;
          background-color: #fff;
          margin-top: 4px;
          border-radius: 5px;
        }
        .content {
          box-sizing: border-box;
          padding: 12px;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-radius: 5px;
          .top {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .left {
              font-weight: 400;
              font-size: 14px;
              color: #1d2326;
              display: flex;
              align-items: center;
              gap: 5px;
              text {
                border: 1px solid #ec384a;
                width: 28px;
                height: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 10px;
                color: #ec384a;
              }
            }
            .right {
              font-weight: 400;
              font-size: 12px;
              color: rgba(29, 35, 38, 0.3);
              width: auto;
            }
          }
          .mid {
            display: flex;
            align-items: center;
            gap: 3px;
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.6);
            text {
              color: rgba(29, 35, 38, 1);
            }
          }
          .third {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left {
              display: flex;
              align-items: center;
              gap: 12px;
              font-weight: 400;
              font-size: 12px;
              color: #15181a;
              .item {
                display: flex;
                align-items: center;
                gap: 2px;
              }
            }
            .look {
              width: 52px;
              height: 24px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: black;
              font-weight: 600;
              font-size: 12px;
              color: #ffffff;
              border-radius: 12px;
            }
          }
        }
      }
    }
  }
}
.chat-message {
  word-break: break-all; //保留空白符，允许自动换行
  white-space: pre-wrap; //强制英文/数字在边界处换行
  overflow-wrap: break-word; //长词会换行到下一行
}
</style>
