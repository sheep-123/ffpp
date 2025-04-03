<template>
  <view class="box">
    <u-navbar class="nav" autoBack leftText="发布动态" :fixed="false" bgColor="#fff">
      <view slot="left" style="display: flex;align-items: center;">
        <u-icon name="arrow-left" size="19"></u-icon>
        <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/avatar.png"
          mode="scaleToFill" style="margin-left: 6px;width: 36px;height: 36px;border-radius: 50%;" />
        <view style="font-family: PingFang SC, PingFang SC;
             font-weight: 400;
             font-size: 16px;
             color: #1D2326;
             line-height: 24px;
             text-align: left;
             font-style: normal;
             text-transform: none;
             margin-left: 8px;">爱运动的橘子
        </view>
      </view>
    </u-navbar>
    <view>
      <scroll-view scroll-y :style="{ height: windowHeight - bottomBoxHeight - statusBarHeight - 44 + 'px' }">
        <view class="parent">
          <swiper @change="monitorCurrent" :indicator-dots="false" :circular="true" :current="current" :autoplay="true">
            <block v-for="(item, index) in backgroundArr" :key="index">
              <swiper-item>
                <view :class="item"></view>
              </swiper-item>
            </block>
          </swiper>
          <view class="numDots">
            <view>
              <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/photo.png"
                mode="scaleToFill" />
              <text>
                {{ current + 1 }}/3
              </text>
            </view>
          </view>
          <!-- 自定义轮播图进度点 -->
          <view class="dots">
            <block v-for="(item, index) in backgroundArr" :key="index">
              <view :class="current == index ? 'active' : ''"></view>
            </block>
          </view>
        </view>
        <view class="contentBox">
          <text class="title">2024年|我的徒步passion时刻</text><br>
          <text class="titleContent">
            晒出你的徒步照片
            看看2024你都去了哪些地方徒步
            春天大理看爱心湖夏天重庆金佛山玩水
            “秋天去川西看看雪山”
            攀冬天去丽江感受一下阳光
            回看这些走过的路，仍然充满passion
            晒出你的徒步照片
            看看2024你都去了哪些地方徒步
            春天大理看爱心湖夏天重庆金佛山玩水
            “秋天去川西看看雪山”
            攀冬天去丽江感受一下阳光
            回看这些走过的路，仍然充满passion
            晒出你的徒步照片
            看看2024你都去了哪些地方徒步
            春天大理看爱心湖夏天重庆金佛山玩水
            “秋天去川西看看雪山”
            攀冬天去丽江感受一下阳光
            回看这些走过的路，仍然充满passion
          </text>

          <view class="locaitonBox">
            <view>
              <text class="text1">天河体育中心</text>
            </view>
            <view style="display: flex;align-items: center;">
              <view style="position: relative;top:-2px"><text class="text2">889m</text></view>
              <u-icon name="arrow-right" color="#CCCCCC" size="16px"></u-icon>
            </view>
          </view>
        </view>
        <u-gap height="8" bgColor="#F7F7F7"></u-gap>
        <view class="conmentBox">
          <view v-for="(item, index) in 9" :key="index">
            <view style="display: flex;">
              <view class="rightBox">
                <image class="userAvatar"
                  src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/avatar.png"
                  mode="scaleToFill" />
              </view>
              <view class="leftBox">
                <view class="row1">
                  <view class="left">
                    <text class="text1">月诗风呤</text>
                  </view>
                  <view class="right" @tap="smallfrieActive(index)">
                    <image class="comment-svg-small"
                      src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/comment.svg"
                      mode="scaleToFill" />
                    <image v-show="!smallfrieisActive[index]" class="frie-svg-small"
                      src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/frie.svg"
                      mode="scaleToFill" />
                    <image v-show="smallfrieisActive[index]" class="frie-svg-small"
                      src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/frie-active.svg"
                      mode="scaleToFill" />
                    <text>{{ samllfrieCount[index] }}</text>
                  </view>
                </view>
                <view class="row2">
                  <text>这个场地难预定吗？</text>
                </view>
                <view class="row3">
                  <text class="text2">今天 12:00</text>
                </view>
              </view>
            </view>
            <!-- <u-divider color="#F0F0F0"></u-divider> -->
            <view style="display: flex;justify-content: flex-end;">
              <view class="hr"></view>

            </view>
            <view style="display: flex;justify-content: flex-end;">
              <view class="smallCommentBox" v-for="(item, index) in 1" :key="index">
                <view style="display: flex;">
                  <view class="rightBox">
                    <image class="userAvatar"
                      src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/avatar.png"
                      mode="scaleToFill" />
                  </view>
                  <view class="leftBox">
                    <view class="row1">
                      <view class="left">
                        <text class="text1">月诗风呤</text>

                        <text class="text2">作者</text>

                      </view>
                      <view class="right" @tap="smallfrieActive(index)">
                        <image class="comment-svg-small"
                          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/comment.svg"
                          mode="scaleToFill" />
                        <image v-show="!smallfrieisActive[index]" class="frie-svg-small"
                          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/frie.svg"
                          mode="scaleToFill" />
                        <image v-show="smallfrieisActive[index]" class="frie-svg-small"
                          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/frie-active.svg"
                          mode="scaleToFill" />
                        <text>{{ samllfrieCount[index] }}</text>
                      </view>
                    </view>
                    <view class="row2">
                      <text>这个场地难预定吗？</text>
                    </view>
                    <view class="row3">
                      <text class="text2">今天 12:00</text>
                    </view>
                  </view>
                </view>
                <!-- <u-divider color="#F0F0F0"></u-divider> -->
                <!-- <view style="display: flex;justify-content: flex-end;">
                  <view class="hr"></view>

                </view> -->
              </view>

            </view>

          </view>
        </view>
      </scroll-view>
    </view>
    <view v-show="!isCut" class="bottomBox">
      <view class="functionBox1">
        <view @tap="onFocus">
          123
          <!-- <u-input placeholder="聊聊你的想法..." @focus="focusEvent"></u-input> -->
        </view>
        <view class="rightPart">
          <view>
            <image v-show="!frieisActive" @click="frieActive" class="frie-svg"
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/frie.svg"
              mode="scaleToFill" />
            <image v-show="frieisActive" @click="frieActive" class="frie-svg"
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/frie-active.svg"
              mode="scaleToFill" />
            <text>{{ frieCount }}</text>
          </view>
          <view>

            <image v-show="!collectisActive" @click="collectActive" class="star-svg"
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/collect.svg"
              mode="scaleToFill" />
            <image v-show="collectisActive" @click="collectActive" class="star-svg"
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/collect-active.svg"
              mode="scaleToFill" />
            <text>{{ collectCount }}</text>
          </view>
          <view>
            <image class="comment-svg"
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/comment.svg"
              mode="scaleToFill" />
            <text>{{ commentCount }}</text>
          </view>
        </view>
      </view>

    </view>
    <view v-show="isCut" class="bottomBox" style="padding-bottom: 12px;" :style="{ bottom: marginBottom - 250 + 'px' }">
      <view>
        <textarea class="textareaStyle" v-model="commentContent" placeholder="聊聊你的想法..."
          placeholder-class="textarea-placeholder" @input="" :focus="isfocus" />
      </view>
      <view class="functionBox2">
        <image class="emojiIcon" src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/emoji.svg"
          mode="scaleToFill" @click="onFocus" />
        <view class="rightPart">
          <view>
            <text>{{ frieCount }}</text>
            <u-button shape="circle" color="#EC384A" @click="sendComment">发送</u-button>
          </view>
        </view>
      </view>
    </view>
    <view>

    </view>
    <view>

    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      title: '',
      titleLength: 20,
      titleContent: '',
      bottomBoxHeight: 0,
      windowHeight: uni.getSystemInfoSync().windowHeight,
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
      isShow: false,
      isShowPopup: false,
      //轮播图的数组
      backgroundArr: ['red', 'green', 'blue'],
      //轮播图当前的下标
      current: 0,
      //是否自动播放轮播图
      autoplay: false,
      indicatorColor: '#000000',
      frieisActive: false,
      frieCount: 0,
      collectisActive: false,
      collectCount: 0,
      commentCount: 0,
      smallfrieisActive: [false, false, false, false, false, false, false, false, false],
      samllfrieCount: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      commentContent: '',
      isCut: false,
      marginBottom: 0,
      isfocus: false
    }
  },
  methods: {
    onFocus() {
      this.isfocus = true
      this.isCut = true
    },
    //图片读取后的处理函数
    afterRead(e) {
      console.log(e);
      // this.fileList = e.file
      this.fileList.push(e.file[0])
      console.log(this.fileList);
    },
    //图片删除函数
    deletePic(e) {
      this.fileList.splice(e.index, 1)
    },
    //标题输入事件
    inputEvent(e) {
      this.titleLength = 20
      if (e.length <= 20) {
        this.titleLength = this.titleLength - e.length
        this.isShowPopup = false
      } else {
        this.titleLength = 0
        uni.showToast({
          icon: 'none',
          title: '标题最多输入20个字',
          mask: false
        })
      }
      if (e.length >= 1) {
        this.isShow = true
      }
      else {
        this.isShow = false
      }

    },
    changeEvent(e) {
      console.log(e);

    },
    onClearTitle() {
      this.title = ''
    },
    toPreview() {
      uni.navigateTo({ url: '/dynamic/publish/dongTaiPreview' })

    },
    monitorCurrent: function (e) {
      this.current = e.detail.current;
    },
    smallfrieActive(index) {
      this.$set(this.smallfrieisActive, index, !this.smallfrieisActive[index])
      if (this.smallfrieisActive[index]) {
        this.samllfrieCount[index]++
      } else {
        this.samllfrieCount[index]--
      }
    },
    async frieActive() {
      this.frieisActive = !this.frieisActive
      if (this.frieisActive) {
        this.frieCount++
        //点赞动态
        await uni.$u.http.get("/saveNewsSupport", {
          params: {
            newsId: 1,
          },
        }
        )
      } else {
        //取消点赞动态
        await uni.$u.http.delete("/delNewsSupport", {
          params: {
            supportId: 1,
          },
        }
        )
        this.frieCount--
      }
    },
    async collectActive() {
      this.collectisActive = !this.collectisActive
      if (this.collectisActive) {
        this.collectCount++
        //取消动态点赞
        await uni.$u.http.get("/saveNewsCollection", {
          params: {
            newsId: 1,
          },
        }
        )
      } else {
        this.collectCount--
        //取消动态收藏
        await uni.$u.http.get("/delNewsCollection", {
          params: {
            commentId: 1,
          },
        }
        )
      }
    },
    sendComment() {
      wx.hideKeyboard(
        {
          complete: res => {
            console.log('hideKeyboard res', res)
          }
        }
      )
    },
    // focusEvent(e) {
    //   this.isCut = true
    //   console.log(e);

    // }

  },
  onLoad() {
    this.$nextTick(() => {
      uni.createSelectorQuery().select(".bottomBox").boundingClientRect(data => {
        this.bottomBoxHeight = data.height
        console.log(this.statusBarHeight);
        console.log(this.windowHeight);
      }).exec()
    })
    wx.onKeyboardHeightChange(res => { //监听键盘高度变化
      console.log(res);
      if (res.height) {
        this.marginBottom = res.height
        this.isCut = true
      } else {
        this.isCut = false
      }

      // this.setChatListHeight();
      // this.scroll2Bottom();
    });
    wx.hideKeyboard({
      complete: res => {
        // this.marginBottom = 0
        this.isCut = false
        // this.isfocus = false
      }
    })
  },
  async mounted() {
    //查询动态详情
    let res1 = await uni.$u.http.get("/getNewsDetail", {
      params: {
        newsId: 2,
      },
    });
    console.log(res1);
    //查询动态评论
    let res2 = await uni.$u.http.get("/getNewsComment", {
      params: {
        newsId: 2,
        page: 1,
        pageSize: 10
      },
    });
    console.log(res2);
    //查询动态评论回复
    let res3 = await uni.$u.http.get("/getNewsCommentReply", {
      params: {
        newsCommentId: 2,
        page: 1,
        pageSize: 10
      },
    });
    console.log(res3);

  }
}
</script>


<style scoped lang='scss'>
// ::v-deep .u-button--normal.data-v-3bf2dba7 {
//   height: 60px;
//   width: 28px;
// }
::v-deep .data-v-7abf6a7b .u-button.data-v-3bf2dba7 {
  width: 60px;
  height: 28px;
}

.textareaStyle {
  background-color: #F0F0F0;
  border-radius: 8px;
  padding: 8px 12px;
  height: 86px;
  width: calc(100% - 24px);
  margin: 12px 0px;
}

.parent {
  position: relative;

  swiper {
    height: 252px;
    width: calc(100% - 24px);
    margin: 0 12px;

    swiper-item view {
      height: 100%;
    }

    .red {
      background-color: Pink;
    }

    .green {
      background-color: PaleGreen;
    }

    .blue {
      background-color: SkyBlue;
    }
  }
}




.numDots {
  position: relative;
  top: -40px;
  right: -300px;

  view {
    width: 51-16px;
    height: 24-12px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(41, 41, 41, 0.3);
    padding: 6px 8px;

    image {
      width: 12px;
      height: 12px;
      margin-right: 2px;
    }

    text {
      font-family: PingFang SC, PingFang SC;
      font-weight: 600;
      font-size: 12px;
      color: #FFFFFF;
      line-height: 16px;
      text-align: right;
      font-style: normal;
      text-transform: none;
    }
  }
}



.dots {
  position: absolute;
  bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  view {
    width: 10rpx;
    height: 10rpx;
    margin: 0 6rpx;
    border-radius: 10rpx;
    background-color: #CCCCCC;
  }

  .active {
    width: 30rpx;
    background-color: #15181A;
  }
}


::v-deep .u-icon__icon.data-v-172979f2.uicon-close {
  font-size: 15px !important;
  top: 50% !important;
  right: 50% !important;
  transform: translate(8px, 3px) !important;
}

// ::v-deep .u-input.data-v-fdbb9fe6.u-border.u-input--radius.u-input--square {
//   padding-top: 0px !important;
//   padding-bottom: 0px !important;
//   padding-left: 0px !important;
//   padding-right: 0px !important;
// }


::v-deep .u-input__content.data-v-fdbb9fe6 {
  background-color: #F0F0F0;
  // padding-left: 8px 12px;

}

::v-deep .u-input__content__field-wrapper__field.data-v-fdbb9fe6 {
  font-size: 14px !important;
  // padding: 8px 12px;
  // border-radius: 20px;
}

::v-deep .u-input--radius.data-v-fdbb9fe6,
.u-input--square.data-v-fdbb9fe6 {
  border-radius: 20px;
  background-color: #F0F0F0;
}

::v-deep .data-v-0e3867ac .u-input__content__field-wrapper__field.data-v-fdbb9fe6 {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: rgba(29, 35, 38, 0.6);
  line-height: 22px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

::v-deep .u-button--square.data-v-3bf2dba7 {
  border-radius: 40px;
}

::v-deep .u-button.data-v-3bf2dba7 {
  width: 327px;
  height: 44px;
}



.box {
  background-color: #fff;
  width: 100vw;
  height: 100vh;

  .conmentBox {
    width: calc(100% - 32px);
    margin: 0 16px;

    .hr {
      margin-bottom: 12px;
      width: calc(100% - 48px);
      border-bottom: 1px solid #F0F0F0;
    }

    .smallCommentBox {
      width: calc(100% - 48px);

      .rightBox {
        width: 22px;


        .userAvatar {
          width: 22px;
          height: 22px;
        }
      }

      .leftBox {
        width: calc(100% - 36px);
        margin-left: 12px;
        display: flex;
        flex-direction: column;

        .row1 {
          width: 100%;
          display: flex;
          justify-content: space-between;

          .left {
            width: 300px;

            .text1 {
              padding-right: 8px;
              font-family: PingFang SC, PingFang SC;
              font-weight: 400;
              font-size: 14px;
              color: rgba(29, 35, 38, 0.5);
              line-height: 22px;
              text-align: left;
              font-style: normal;
              text-transform: none;
            }

            .text2 {
              width: 20px;
              height: 12px;
              padding: 2px 4px;
              border-radius: 2px 2px 2px 2px;
              border: 1px solid #EC384A;
              font-family: PingFang SC, PingFang SC;
              font-weight: 600;
              font-size: 10px;
              color: #EC384A;
              line-height: 12px;
              text-align: left;
              font-style: normal;
              text-transform: none;
            }

          }

          .right {
            display: flex;

            .frie-svg-small {
              width: 16px;
              height: 16px;
              margin-right: 3px;
            }

            .comment-svg-small {
              width: 16px;
              height: 16px;
              margin-right: 16px;
            }

            text {
              font-family: PingFang SC, PingFang SC;
              font-weight: 400;
              font-size: 12px;
              color: #1D2326;
              line-height: 16px;
              text-align: right;
              font-style: normal;
              text-transform: none;
            }
          }
        }

        .row2 {
          margin-top: 2px;

          text {
            font-family: PingFang SC, PingFang SC;
            font-weight: 400;
            font-size: 14px;
            color: #1D2326;
            line-height: 22px;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }
        }

        .row3 {
          margin-top: 0px;
          margin-bottom: 12px;

          .text2 {
            font-family: PingFang SC, PingFang SC;
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.5);
            line-height: 16px;
            text-align: right;
            font-style: normal;
            text-transform: none;
          }
        }
      }
    }

    .rightBox {
      width: 34px;


      .userAvatar {
        width: 34px;
        height: 34px;
      }
    }

    .leftBox {
      width: calc(100% - 46px);
      margin-left: 12px;
      display: flex;
      flex-direction: column;

      .row1 {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .left {
          width: 300px;

          .text1 {
            padding-right: 8px;
            font-family: PingFang SC, PingFang SC;
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.5);
            line-height: 22px;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }


        }

        .right {
          display: flex;

          .frie-svg-small {
            width: 16px;
            height: 16px;
            margin-right: 3px;
          }

          .comment-svg-small {
            width: 16px;
            height: 16px;
            margin-right: 16px;
          }

          text {
            font-family: PingFang SC, PingFang SC;
            font-weight: 400;
            font-size: 12px;
            color: #1D2326;
            line-height: 16px;
            text-align: right;
            font-style: normal;
            text-transform: none;
          }
        }
      }

      .row2 {
        margin-top: 7px;

        text {
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: 14px;
          color: #1D2326;
          line-height: 22px;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }
      }

      .row3 {
        margin-top: 7px;
        margin-bottom: 6px;

        .text2 {
          font-family: PingFang SC, PingFang SC;
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.5);
          line-height: 16px;
          text-align: right;
          font-style: normal;
          text-transform: none;
        }
      }
    }

  }

  .indicator {
    @include flex(row);
    justify-content: center;

    &__dot {
      height: 6px;
      width: 6px;
      border-radius: 100px;
      background-color: rgba(255, 255, 255, 0.35);
      margin: 0 5px;
      transition: background-color 0.3s;

      &--active {
        background-color: #ffffff;
      }
    }
  }

  .indicator-num {
    padding: 2px 0;
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 100px;
    width: 35px;
    @include flex;
    justify-content: center;

    &__text {
      color: #ffffff;
      font-size: 12px;
    }
  }

  .contentBox {
    width: calc(100% - 32px);
    margin: 0 16px;
    margin-top: 24px;
    background-color: #fff;

    .title {
      font-family: PingFang SC, PingFang SC;
      font-weight: 600;
      font-size: 18px;
      color: #1D2326;
      line-height: 24px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .titleContent {
      margin-top: 12px;
      margin-bottom: 24px;
      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 16px;
      color: rgba(29, 35, 38, 0.8);
      line-height: 24px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

    .locaitonBox {
      height: 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #F5F5F5;
      padding: 8px 12px;
      margin: 16px 0;

      .text1 {
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: rgba(29, 35, 38, 0.8);
        line-height: 22px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .text2 {
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.6);
        height: 16px;
        line-height: 16px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }


  }


  .bottomBox {
    box-shadow: 0px -4px 10px 0px rgba(203, 212, 226, 0.28);
    width: calc(100% - 32px);
    background-color: #fff;
    position: absolute;
    bottom: 0;
    padding: 0 16px;
    padding-bottom: 46px;
    // padding-top: 12px;

    .functionBox1 {
      // margin-bottom: 34px;
      margin-top: 12px;
      display: flex;
      justify-content: space-between;

      .rightPart {
        display: flex;

        view {
          display: flex;
          align-items: center;

          .frie-svg {
            width: 30px;
            height: 30px;
            margin-left: 14px;

          }

          .star-svg {
            width: 30px;
            height: 30px;
            margin-left: 14px;

          }

          .comment-svg {
            width: 30px;
            height: 30px;
            margin-left: 14px;
          }

          text {
            margin-left: 6px;

          }
        }
      }
    }

    .functionBox2 {
      margin-top: 12px;
      display: flex;
      justify-content: space-between;

      .emojiIcon {
        width: 20px;
        height: 20px;
      }

      .rightPart {
        display: flex;

        view {
          display: flex;
          align-items: center;

          .frie-svg {
            width: 30px;
            height: 30px;
            margin-left: 14px;

          }

          .star-svg {
            width: 30px;
            height: 30px;
            margin-left: 14px;

          }

          .comment-svg {
            width: 30px;
            height: 30px;
            margin-left: 14px;
          }

          text {
            font-family: PingFang SC, PingFang SC;
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.3);
            line-height: 16px;
            text-align: right;
            font-style: normal;
            text-transform: none;
            margin-right: 12px;

          }
        }
      }
    }

    .publishButton {
      font-family: PingFang SC, PingFang SC;
      font-weight: 600;
      font-size: 16px;
      color: #FFFFFF;
      line-height: 24px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }

  }
}
</style>