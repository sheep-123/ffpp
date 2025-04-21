<template>
  <view class="box">
    <u-navbar
      class="nav"
      autoBack
      leftText="发布动态"
      :fixed="false"
      bgColor="#fff"
    >
    </u-navbar>
    <view>
      <scroll-view
        scroll-y
        scrollbar="true"
        :style="{
          height: windowHeight - bottomBoxHeight - statusBarHeight - 44 + 'px',
        }"
      >
        <view class="contentBox">
          <view>
            <scroll-view scroll-x style="width: 100%">
              <u-upload
                class="custom-upload"
                :fileList="fileList"
                @afterRead="afterRead"
                @delete="deletePic"
                accept="image"
                name="6"
                multiple
                :maxCount="18"
                width="86"
                height="86"
                :deleteIcon="'close'"
                :deleteIconColor="'#ff0000'"
                :deleteIconSize="20"
                :previewFullImage="true"
              >
                <view class="custom-upload">
                  <view class="plusIcon">
                    <u-icon name="plus" size="13px" color="#CCCCCC"></u-icon>
                  </view>
                  <text class="upload-text">图片/视频</text>
                </view>
              </u-upload>
            </scroll-view>
          </view>
          <view class="tipsBox">
            <image
              class="topIcon"
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/topArrow.svg"
              mode="scaleToFill"
            />
            <view class="box1">
              <image
                class="tipsIcon"
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/tips.png"
                mode="scaleToFill"
              />
              <text class="tipsText"> 说说你最近一次运动 </text>
              <image
                class="reloadIcon"
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/reload.svg"
                mode="scaleToFill"
              />
            </view>
          </view>
          <view class="textBox">
            <u-input
              v-model="title"
              type="text"
              placeholder="添加标题"
              :maxlength="300"
              border="none"
              @input="inputEvent"
              @focus="focusEvent"
              @change="changeEvent"
            >
              <template slot="suffix">
                <view style="display: flex; align-items: center">
                  <image
                    v-show="isShow"
                    src="@https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/close.png"
                    mode="scaleToFill"
                    style="width: 20px; height: 20px"
                    @click="onClearTitle"
                  />
                  <text
                    style="
                      font-family: PingFang SC, PingFang SC;
                      font-weight: 400;
                      font-size: 12px;
                      color: rgba(29, 35, 38, 0.3);
                      line-height: 16px;
                      text-align: left;
                      font-style: normal;
                      text-transform: none;
                    "
                    >{{ titleLength }}</text
                  >
                </view>
              </template>
            </u-input>
            <view style="margin-top: 8px; margin-bottom: 12px">
              <u-divider color="#F0F0F0"></u-divider>
            </view>
            <view style="display: flex">
              <scroll-view scroll-y style="height: 278px" @scroll="onScroll">
                <textarea
                  placeholder-style="color:rgba(29,35,38,0.3);font-size:14px;font-weig1ht: 400;"
                  style="
                    width: 100%;
                    overflow: scroll !important;
                    -webkit-overflow-scrolling: touch !important;
                  "
                  v-model="titleContent"
                  type="text"
                  maxlength="800"
                  disable-default-padding="true"
                  placeholder="和大家聊聊你的热爱吧..."
                  border="none"
                  autoHeight="true"
                ></textarea>
              </scroll-view>
              <view style="height: 100px">
                <view
                  style="width: 5px; height: 10px; background-color: #f0f0f0"
                  :style="{ paddingTop: obj.lineTop + 'px' }"
                >
                  {{ obj.lineTop }}
                </view>
              </view>
            </view>

            <!-- <scroll-view scroll-y :scroll-top="obj.lineTop" style="height: 278px;">
                    </scroll-view> -->
          </view>
        </view>
        <view class="siteSelectionBox">
          <view class="box1">
            <view class="left">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/location.png"
                mode="scaleToFill"
                style="width: 16px; height: 16px"
              />
              <text
                style="
                  padding-left: 3px;
                  font-family: PingFang SC, PingFang SC;
                  font-weight: 400;
                  font-size: 14px;
                  color: #1d2326;
                  line-height: 22px;
                  text-align: left;
                  font-style: normal;
                  text-transform: none;
                "
                >添加位置</text
              >
            </view>
            <view class="right" @tap="toAddLocation()">
              <text v-if="obj.addAddressName != ''">{{
                obj.addAddressName
              }}</text>
              <text v-else>去选择</text>
              <u-icon name="arrow-right" size="6 10" color="#CCCCCC"></u-icon>
            </view>
          </view>
          <!-- <view class="box2">
            <image class="top2Icon" src="@https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/topArrow2.svg" mode="scaleToFill" />
            <view class="scrollxBox">
              <scroll-view scroll-x style="width:100%;">
                <view class="cardBox">
                  <view class="card"><text>红盾大厦</text></view>
                  <view class="card"><text>体育西路(地铁站)</text></view>
                  <view class="card"><text>CityNote希诺</text></view>
                  <view class="card"><text>CityNote希诺</text></view>
                </view>
              </scroll-view>
            </view>
          </view> -->
        </view>
      </scroll-view>
    </view>
    <view class="bottomBox">
      <view class="layoutBox">
        <view class="part">
          <view class="draftBox">
            <u-icon name="file-text" color="#000" size="24"></u-icon>
            <view>存草稿</view>
          </view>
          <view class="previewBox" @click="toPreview">
            <u-icon name="eye" color="#000" size="24"></u-icon>
            <view>预览</view>
          </view>
        </view>
        <u-button class="publishButton" color="#15181A " @click="sendDongTai"
          >发布动态</u-button
        >
      </view>
    </view>
    <!-- <upload></upload> -->
    <!-- <uUpload></uUpload> -->
  </view>
</template>
<script>
// import { upload } from '@/competition/upload/upload.vue'
export default {
  // components: {
  //   upload
  // },
  data() {
    return {
      fileList: [],
      title: "",
      titleLength: 20,
      titleContent: "",
      bottomBoxHeight: 0,
      windowHeight: uni.getSystemInfoSync().windowHeight,
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
      isShow: false,
      isShowPopup: false,
      showPreview: false,
      obj: {
        lineTop: 0,
        addAddressName: "",
      },
      isShowInput: false,
    };
  },
  methods: {
    //图片读取后的处理函数
    afterRead(e) {
      console.log(e);
      // this.fileList = e.file
      e.file.forEach((element) => {
        this.fileList.push(element);
      });
    },
    //图片删除函数
    deletePic(e) {
      this.fileList.splice(e.index, 1);
    },
    //标题输入事件
    inputEvent(e) {
      this.titleLength = 20;
      if (e.length <= 20) {
        this.titleLength = this.titleLength - e.length;
        this.isShowPopup = false;
      } else {
        this.titleLength = 0;
        uni.showToast({
          icon: "none",
          title: "标题最多输入20个字",
          mask: false,
        });
      }
      if (e.length >= 1) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    changeEvent(e) {
      console.log(e);
    },
    onClearTitle() {
      this.title = "";
    },
    toPreview() {
      uni.navigateTo({ url: "/dynamic/publish/dongTaiPreview" });
    },
    toAddLocation() {
      var that = this;
      uni.chooseLocation({
        success: function (res) {
          console.log(res);

          // this.addAddressName = res.name
          that.$set(that.obj, "addAddressName", res.name);
          console.log(that.obj.addAddressName);

          // uni.setStorageSync("fullAddress", res.address);
          // uni.navigateTo({
          //   url: `/competition/publish/saishi`,
          // });
        },
        fail: function () {},
        complete: function () {},
      });
      // uni.navigateTo({ url: '/competition/publish/addLocation' })
    },
    onScroll(e) {
      this.$set(this.obj, "lineTop", e.detail.scrollTop);
      console.log(e.detail.scrollTop);

      // this.$nextTick(() => {
      //   this.obj.lineTop = e.detail.scrollTop
      //   console.log(this.obj.lineTop);

      // })
    },
    sendDongTai() {
      let res = uni.$u.http.post("/saveNewsRelease", {
        matchId: this.matchId,
        serialNum: this.serialNum,
        way: this.way,
        number: this.number,
        genderLimit: this.genderLimit,
        ageLimitMin: this.ageLimitMin,
        ageLimitMax: this.ageLimitMax,
        entryFee: this.entryFee,
        keyboardHeight: 0,
      });
      console.log(res);
    },
    focusEvent() {
      this.isShowInput = true;
    },
  },
  onLoad() {
    this.$nextTick(() => {
      uni
        .createSelectorQuery()
        .select(".bottomBox")
        .boundingClientRect((data) => {
          this.bottomBoxHeight = data.height;
          console.log(this.statusBarHeight);
          console.log(this.windowHeight);
        })
        .exec();
    });
    wx.onKeyboardHeightChange((res) => {
      //监听键盘高度变化
      this.setData({
        keyboardHeight: res.height,
      });
      console.log(this.keyboardHeight);

      // this.setChatListHeight();
      // this.scroll2Bottom();
    });
  },
};
</script>

<style lang="scss">
::v-deep .u-upload__deletable.data-v-49deb6f2 {
  white-space: nowrap;
  /* 禁止换行 */
}

::v-deep .u-upload__wrap.data-v-49deb6f2 {
  flex-wrap: nowrap !important;
}

::v-deep .u-upload__wrap__preview.data-v-49deb6f2 {
  margin: 0px 8px 0px 0px !important;
}

::v-deep .u-upload__deletable.data-v-49deb6f2 {
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #71767c;
}

::v-deep .u-icon__icon.data-v-172979f2.uicon-close {
  font-size: 15px !important;
  top: 50% !important;
  right: 50% !important;
  transform: translate(8px, 3px) !important;
}

::v-deep .u-input__content.data-v-fdbb9fe6 {
  background-color: #fff;
}

::v-deep .u-input__content__field-wrapper__field.data-v-fdbb9fe6 {
  font-size: 14px !important;
}

::v-deep
  .data-v-0e3867ac
  .u-input__content__field-wrapper__field.data-v-fdbb9fe6 {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: rgba(29, 35, 38, 0.3);
  line-height: 24px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

::v-deep .u-button--square.data-v-3bf2dba7 {
  border-radius: 40px;
}

::v-deep .u-button.data-v-3bf2dba7 {
  width: 220px;
  height: 44px;
}

.box {
  background-color: #fff;
  width: 100vw;
  height: 100vh;

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 26rpx;
    color: #999999;
  }

  image {
    width: 750rpx;
  }

  .contentBox {
    width: calc(100% - 60px);
    margin: 0 16px;
    padding: 12px;
    background-color: #f3f4f5;
    border-radius: 10px;

    .custom-preview-image {
      width: 100%;
      max-height: 80vh;
      object-fit: contain;
      border-radius: 8px;
    }

    .close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
    }

    .tipsBox {
      .topIcon {
        position: relative;
        top: 4px;
        left: 13px;
        width: 20px;
        height: 8px;
      }

      .box1 {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        width: 208px;
        height: 24px;
        background: #ffffff;
        border-radius: 4px 4px 4px 4px;

        .tipsText {
          padding: 0 5px;
          width: 130px;
          height: 12px;
          font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;

          font-weight: 400;
          font-size: 14px;
          color: #1d2326;
          line-height: 12px;
          // text-align: left;
          font-style: normal;
          // text-transform: none;
        }

        .tipsIcon {
          margin-left: 4px;
          width: 45px;
          height: 16px;
        }

        .reloadIcon {
          width: 16px;
          height: 16px;
        }
      }
    }

    .custom-upload {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      width: 86px;
      height: 86px;
      border-radius: 4px;
      // margin: 0 8px 8px 0;

      .plusIcon {
        width: 28px;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .upload-text {
        width: 55px;
        height: 16px;
        font-family: PingFang SC, PingFang SC;
        font-weight: 400;
        font-size: 12px;
        color: rgba(29, 35, 38, 0.6);
        line-height: 16px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }

    .textBox {
      width: calc(100% - 24px);
      padding: 12px;
      background-color: #fff;
    }
  }

  .siteSelectionBox {
    margin-top: 16px;
    width: 100%;

    .box1 {
      margin: 0 16px;
      width: calc(100% - 36px);
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;
      }

      .right {
        color: #8a8a8a;
        display: flex;
        align-items: center;
      }
    }

    .box2 {
      margin: 0 16px;
      width: calc(100% - 36px);

      .top2Icon {
        position: relative;
        top: 4px;
        left: 18px;
        width: 20px;
        height: 8px;
      }

      .scrollxBox {
        padding: 0 6px;
        width: calc(100% - 12px);
        display: flex;
        border-radius: 4px;
        background-color: #f3f4f5;

        .cardBox {
          width: calc(100% - 12px);
          display: flex;
          align-items: center;
          padding: 6px 0px;

          .card {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 22px;
            padding: 5px 8px;
            border-radius: 4px;
            margin-right: 8px;
            background-color: #fff;
            white-space: nowrap;

            text {
              font-family: PingFang SC, PingFang SC;
              font-weight: 400;
              font-size: 14px;
              color: rgba(29, 35, 38, 0.6);
              line-height: 22px;
              text-align: left;
              font-style: normal;
              text-transform: none;
            }
          }
        }
      }
    }
  }

  .bottomBox {
    box-shadow: 0px -4px 10px 0px rgba(203, 212, 226, 0.28);
    width: 100%;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    padding-bottom: 34px;

    .layoutBox {
      width: calc(100% - 48px);
      margin: 0 16px;
      display: flex;
      align-items: center;
      padding: 12px 0px;
      padding-left: 16px;
      justify-content: space-between;

      .part {
        display: flex;

        .draftBox {
          width: 48px;
          height: 44px;
          margin-right: 16px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 12px;
        }

        .previewBox {
          width: 48px;
          height: 44px;
          margin-right: 11px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 12px;
        }
      }

      .publishButton {
        font-family: PingFang SC, PingFang SC;
        font-weight: 600;
        font-size: 16px;
        color: #ffffff;
        line-height: 24px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
  }
}
</style>
