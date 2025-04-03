<template>
  <view class="box">
    <u-navbar
      class="nav"
      autoBack
      leftText="发布动态"
      :fixed="false"
      bgColor="#fff"
    >
      <view
        class="u-nav-slot"
        slot="left"
        style="display: flex; align-items: center"
      >
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/left.png"
          @click="back"
          class="back-btn"
        />
        <text class="navTitle">标记场地</text>
      </view>
    </u-navbar>
    <view>
      <scroll-view
        scroll-y
        :style="{
          height: windowHeight - bottomBoxHeight - statusBarHeight - 44 + 'px',
        }"
      >
        <view class="formBox">
          <u-form
            labelPosition="top"
            :borderBottom="false"
            :model="model1"
            :rules="rules"
            ref="uForm"
            style="width: 100%"
          >
            <u-gap height="12" bgColor="#F7F7F7"></u-gap>
            <u-form-item
              class="formItemBox"
              prop="userInfo.name"
              ref="item1"
              :borderBottom="false"
            >
              <template #label>
                <view
                  style="
                    width: 100%;
                    height: 54px;
                    display: flex;
                    align-items: center;
                  "
                >
                  <text
                    class="label"
                    style="
                      font-family: PingFang SC, PingFang SC;
                      font-weight: 600;
                      font-size: 14px;
                      color: #1d2326;
                      line-height: 22px;
                      text-align: left;
                      font-style: normal;
                      text-transform: none;
                    "
                    >场地入口照片</text
                  >
                  <text
                    class="starIcon"
                    style="padding-left: 4px; color: #ec384a"
                    >*</text
                  >
                </view>
              </template>
              <u-upload
                :fileList="fileList"
                @clickPreview="clickPreview"
                @afterRead="afterRead"
                @delete="deletePic"
                accept="image"
                name="6"
                multiple
                :maxCount="1"
                width="86"
                height="86"
                :deleteIcon="'close'"
                :deleteIconColor="'#ff0000'"
                :deleteIconSize="20"
                :previewFullImage="true"
              >
                <view class="custom-upload">
                  <view class="plusIcon">
                    <u-icon name="plus" size="20px" color="#CCCCCC"></u-icon>
                  </view>
                  <text class="upload-text">上传图片</text>
                </view>
              </u-upload>
            </u-form-item>
            <u-gap height="12" bgColor="#F7F7F7"></u-gap>
            <u-form-item
              class="formItemBox"
              prop="userInfo.name"
              ref="item1"
              :borderBottom="false"
            >
              <template #label>
                <view
                  style="
                    width: 100%;
                    height: 54px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <view>
                    <text
                      class="label"
                      style="
                        font-family: PingFang SC, PingFang SC;
                        font-weight: 600;
                        font-size: 14px;
                        color: #1d2326;
                        line-height: 22px;
                        text-align: left;
                        font-style: normal;
                        text-transform: none;
                      "
                      >场地位置</text
                    >
                    <text
                      class="starIcon"
                      style="padding-left: 4px; color: #ec384a"
                      >*</text
                    >
                  </view>
                  <view>
                    <text
                      class="tips"
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
                      >需要使用您的定位信息</text
                    >
                  </view>
                </view>
              </template>
              <view class="SitePositonBox">
                <view>
                  <image
                    src="@/static/images/whileLocation.svg"
                    mode="scaleToFill"
                  />
                  <view>
                    <text>请在地图上选择位置</text>
                  </view>
                </view>
              </view>
              <view class="addressDetailBox">
                <view class="left">
                  <text>广州市</text>
                  <u-icon
                    name="arrow-down-fill"
                    size="12"
                    style="margin-left: 6px"
                  ></u-icon>
                </view>
                <view>
                  <u-input
                    v-model="addressDetail"
                    placeholder="请填写详情地址(选填)"
                    placeholder-class="input-placeholder"
                    placeholder-style="text-align:right;color: rgba(29,35,38,0.3);font-size:14px"
                    border="false"
                    @input=""
                  />
                </view>
              </view>
            </u-form-item>
            <u-gap height="12" bgColor="#F7F7F7"></u-gap>
          </u-form>
          <u-form
            labelPosition="left"
            :model="model1"
            :rules="rules"
            ref="uForm"
            style="width: 80%"
          >
            <view style="background-color: #fff; border-radius: 8px">
              <view
                style="
                  background-color: #fff;
                  padding-left: 12px;
                  padding-top: 12px;
                  border-radius: 8px;
                "
              >
                <text
                  style="
                    font-family: PingFang SC, PingFang SC;
                    font-weight: 600;
                    font-size: 16px;
                    color: #1d2326;
                    line-height: 24px;
                    text-align: center;
                    font-style: normal;
                    text-transform: none;
                  "
                  >商家信息</text
                >
              </view>
              <u-form-item
                prop="userInfo.name"
                ref="item1"
                :borderBottom="true"
              >
                <template #label>
                  <view
                    style="height: 54px; display: flex; align-items: center"
                  >
                    <text
                      class="label"
                      style="
                        font-family: PingFang SC, PingFang SC;
                        font-weight: 600;
                        font-size: 14px;
                        color: #1d2326;
                        line-height: 22px;
                        text-align: left;
                        font-style: normal;
                        text-transform: none;
                      "
                      >商家类型</text
                    >
                  </view>
                </template>
                <view
                  style="width: 100%; display: flex; justify-content: flex-end"
                >
                  <view>
                    <view style="display: flex">
                      <text
                        style="
                          font-family: PingFang SC, PingFang SC;
                          font-weight: 400;
                          font-size: 14px;
                          color: rgba(29, 35, 38, 0.3);
                          line-height: 22px;
                          text-align: right;
                          font-style: normal;
                          text-transform: none;
                          text-align: end;
                        "
                        >请选择商家类型</text
                      >
                      <u-icon name="arrow-right" size="12px"></u-icon>
                    </view>
                  </view>
                </view>
              </u-form-item>
              <u-form-item
                prop="userInfo.name"
                ref="item1"
                :borderBottom="true"
              >
                <template #label>
                  <view
                    style="height: 54px; display: flex; align-items: center"
                  >
                    <text
                      class="label"
                      style="
                        font-family: PingFang SC, PingFang SC;
                        font-weight: 600;
                        font-size: 14px;
                        color: #1d2326;
                        line-height: 22px;
                        text-align: left;
                        font-style: normal;
                        text-transform: none;
                      "
                      >手机号</text
                    >
                  </view>
                </template>
                <view
                  style="width: 100%; display: flex; justify-content: flex-end"
                >
                  <view>
                    <u-input
                      v-model="model1.userInfo.name"
                      border="none"
                      placeholder="请填写手机号"
                      placeholder-style="text-align:right;color: rgba(29,35,38,0.3);font-size:14px"
                    ></u-input>
                  </view>
                </view>
              </u-form-item>
              <u-form-item
                prop="userInfo.name"
                ref="item1"
                :borderBottom="true"
              >
                <template #label>
                  <view
                    style="height: 54px; display: flex; align-items: center"
                  >
                    <text
                      class="label"
                      style="
                        font-family: PingFang SC, PingFang SC;
                        font-weight: 600;
                        font-size: 14px;
                        color: #1d2326;
                        line-height: 22px;
                        text-align: left;
                        font-style: normal;
                        text-transform: none;
                      "
                      >经营状态</text
                    >
                  </view>
                </template>
                <view
                  style="width: 100%; display: flex; justify-content: flex-end"
                >
                  <view>
                    <view style="display: flex">
                      <text
                        style="
                          font-family: PingFang SC, PingFang SC;
                          font-weight: 400;
                          font-size: 14px;
                          color: rgba(29, 35, 38, 0.3);
                          line-height: 22px;
                          text-align: right;
                          font-style: normal;
                          text-transform: none;
                          text-align: end;
                        "
                        >请选择经营状态</text
                      >
                      <u-icon name="arrow-right" size="12px"></u-icon>
                    </view>
                  </view>
                </view>
              </u-form-item>
              <u-form-item
                prop="userInfo.name"
                ref="item1"
                :borderBottom="false"
              >
                <template #label>
                  <view
                    style="height: 54px; display: flex; align-items: center"
                  >
                    <text
                      class="label"
                      style="
                        font-family: PingFang SC, PingFang SC;
                        font-weight: 600;
                        font-size: 14px;
                        color: #1d2326;
                        line-height: 22px;
                        text-align: left;
                        font-style: normal;
                        text-transform: none;
                      "
                      >经营时间</text
                    >
                  </view>
                </template>
                <view
                  style="width: 100%; display: flex; justify-content: flex-end"
                >
                  <view>
                    <view style="display: flex">
                      <text
                        style="
                          font-family: PingFang SC, PingFang SC;
                          font-weight: 400;
                          font-size: 14px;
                          color: rgba(29, 35, 38, 0.3);
                          line-height: 22px;
                          text-align: right;
                          font-style: normal;
                          text-transform: none;
                          text-align: end;
                        "
                        >请选择经营时间</text
                      >
                      <u-icon name="arrow-right" size="12px"></u-icon>
                    </view>
                  </view>
                </view>
              </u-form-item>
            </view>
          </u-form>
          <u-gap height="12" bgColor="#F7F7F7"></u-gap>
          <u-form
            labelPosition="left"
            :model="model1"
            :rules="rules"
            ref="uForm"
            style="width: 80%"
          >
            <view style="background-color: #fff; border-radius: 8px">
              <view
                style="
                  background-color: #fff;
                  padding-left: 12px;
                  padding-top: 12px;
                  border-radius: 8px;
                "
              >
                <text
                  style="
                    font-family: PingFang SC, PingFang SC;
                    font-weight: 600;
                    font-size: 16px;
                    color: #1d2326;
                    line-height: 24px;
                    text-align: center;
                    font-style: normal;
                    text-transform: none;
                  "
                  >场地信息</text
                >
              </view>
              <u-form-item
                prop="userInfo.name"
                ref="item1"
                :borderBottom="true"
              >
                <template #label>
                  <view
                    style="height: 54px; display: flex; align-items: center"
                  >
                    <text
                      class="label"
                      style="
                        font-family: PingFang SC, PingFang SC;
                        font-weight: 600;
                        font-size: 14px;
                        color: #1d2326;
                        line-height: 22px;
                        text-align: left;
                        font-style: normal;
                        text-transform: none;
                      "
                      >场地类型</text
                    >
                  </view>
                </template>
                <view
                  style="width: 100%; display: flex; justify-content: flex-end"
                >
                  <view>
                    <view style="display: flex">
                      <text
                        style="
                          font-family: PingFang SC, PingFang SC;
                          font-weight: 400;
                          font-size: 14px;
                          color: rgba(29, 35, 38, 0.3);
                          line-height: 22px;
                          text-align: right;
                          font-style: normal;
                          text-transform: none;
                          text-align: end;
                        "
                        >请选择场地类型</text
                      >
                      <u-icon name="arrow-right" size="12px"></u-icon>
                    </view>
                  </view>
                </view>
              </u-form-item>
              <u-form-item
                prop="userInfo.name"
                ref="item1"
                :borderBottom="true"
              >
                <template #label>
                  <view
                    style="height: 54px; display: flex; align-items: center"
                  >
                    <text
                      class="label"
                      style="
                        font-family: PingFang SC, PingFang SC;
                        font-weight: 600;
                        font-size: 14px;
                        color: #1d2326;
                        line-height: 22px;
                        text-align: left;
                        font-style: normal;
                        text-transform: none;
                      "
                      >最小场地单元</text
                    >
                  </view>
                </template>
                <view
                  style="width: 100%; display: flex; justify-content: flex-end"
                >
                  <view>
                    <u-input
                      v-model="model1.userInfo.name"
                      border="none"
                      placeholder="请选择最小单元"
                      placeholder-style="text-align:right;color: rgba(29,35,38,0.3);font-size:14px"
                    ></u-input>
                  </view>
                </view>
              </u-form-item>
              <u-form-item
                prop="userInfo.name"
                ref="item1"
                :borderBottom="true"
              >
                <template #label>
                  <view
                    style="height: 54px; display: flex; align-items: center"
                  >
                    <text
                      class="label"
                      style="
                        font-family: PingFang SC, PingFang SC;
                        font-weight: 600;
                        font-size: 14px;
                        color: #1d2326;
                        line-height: 22px;
                        text-align: left;
                        font-style: normal;
                        text-transform: none;
                      "
                      >场地数量</text
                    >
                  </view>
                </template>
                <view
                  style="width: 100%; display: flex; justify-content: flex-end"
                >
                  <view>
                    <view style="display: flex">
                      <text
                        style="
                          font-family: PingFang SC, PingFang SC;
                          font-weight: 400;
                          font-size: 14px;
                          color: rgba(29, 35, 38, 0.3);
                          line-height: 22px;
                          text-align: right;
                          font-style: normal;
                          text-transform: none;
                          text-align: end;
                        "
                        >请选择场地数量</text
                      >
                      <u-icon name="arrow-right" size="12px"></u-icon>
                    </view>
                    <!-- <u-input v-model="model1.userInfo.name" border="none" placeholder="请填写手机号"
                placeholder-style="text-align:right;color: rgba(29,35,38,0.3);"></u-input> -->
                  </view>
                </view>
              </u-form-item>
              <u-form-item
                prop="userInfo.name"
                ref="item1"
                :borderBottom="false"
              >
                <template #label>
                  <view
                    style="height: 54px; display: flex; align-items: center"
                  >
                    <text
                      class="label"
                      style="
                        font-family: PingFang SC, PingFang SC;
                        font-weight: 600;
                        font-size: 14px;
                        color: #1d2326;
                        line-height: 22px;
                        text-align: left;
                        font-style: normal;
                        text-transform: none;
                      "
                      >适合运动</text
                    >
                  </view>
                </template>
                <view
                  style="width: 100%; display: flex; justify-content: flex-end"
                >
                  <view>
                    <view style="display: flex">
                      <text
                        style="
                          font-family: PingFang SC, PingFang SC;
                          font-weight: 400;
                          font-size: 14px;
                          color: rgba(29, 35, 38, 0.3);
                          line-height: 22px;
                          text-align: right;
                          font-style: normal;
                          text-transform: none;
                          text-align: end;
                        "
                        >请选择标签</text
                      >
                      <u-icon name="arrow-right" size="12px"></u-icon>
                    </view>
                  </view>
                </view>
              </u-form-item>
              <view
                style="
                  display: flex;
                  justify-content: center;
                  background-color: #fff;
                  width: calc(100% - 24px);
                  padding: 0 12px;
                  border-radius: 8px;
                "
              >
                <view
                  style="
                    display: flex;
                    border-radius: 8px 8px 8px 8px;
                    width: 100%;
                    justify-content: center;
                    border: 1px solid #f0f0f0;
                    padding: 10px 0;
                    margin-bottom: 12px;
                  "
                >
                  <image
                    src="@/static/images/redAdd.svg"
                    mode="scaleToFill"
                    style="width: 24px; height: 24px"
                  />
                  <text
                    style="
                      padding-left: 2px;
                      font-family: PingFang SC, PingFang SC;
                      font-weight: 600;
                      font-size: 16px;
                      color: #ec384a;
                      line-height: 24px;
                      text-align: left;
                      font-style: normal;
                      text-transform: none;
                    "
                    >添加其他类型</text
                  >
                </view>
              </view>
            </view>
          </u-form>
        </view>
      </scroll-view>
    </view>

    <view class="bottomBox">
      <u-button class="publishButton" color="#15181A">
        <text>提交</text>
      </u-button>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      addressDetail: "",
      bottomBoxHeight: 0,
      windowHeight: uni.getSystemInfoSync().windowHeight,
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
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
  },
};
</script>

<style scoped lang="scss">
::v-deep
  .u-button.u-reset-button.data-v-3bf2dba7.u-button--square.u-button--normal {
  border-radius: 40px;
}

::v-deep .u-input.data-v-fdbb9fe6.u-input--square {
  padding-right: 0px !important;
}

::v-deep .u-form-item__body.data-v-5e7216f1 {
  width: calc(100% - 24px);
  background-color: #fff;
  border-radius: 8px 8px 8px 8px;
  padding: 0 12px !important;
}

::v-deep .u-form-item__body__left__content__label.data-v-5e7216f1 {
  font-family: PingFang SC, PingFang SC;
  font-weight: 600;
  font-size: 14px;
  color: #1d2326;
  line-height: 22px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

::v-deep .u-input__content__field-wrapper__field.data-v-fdbb9fe6 {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: rgba(29, 35, 38, 0.3);
  line-height: 22px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

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

::v-deep .custom-upload.data-v-5180a08a {
  margin-bottom: 12px;
}

.custom-upload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  width: 86px;
  height: 86px;
  border-radius: 4px;

  .plusIcon {
    width: 36px;
    height: 36px;
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
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}

.SitePositonBox {
  width: 100%;
  height: 86px;
  border-radius: 4px 4px 4px 4px;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;

  view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    image {
      width: 24px;
      height: 24px;
    }

    text {
      padding-top: 6px;
      font-family: PingFang SC, PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #ffffff;
      line-height: 22px;
      text-align: center;
      font-style: normal;
      text-transform: none;
    }
  }
}

.addressDetailBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;

  .left {
    display: flex;
    align-items: center;
  }
}

.box {
  width: 100vw;
  height: 100vh;
  background-color: #f7f7f7;

  .back-btn {
    width: 24px;
    height: 24px;
    margin-right: 16px;
  }

  .navTitle {
    margin-left: 4px;
    font-family: PingFang SC, PingFang SC;
    font-weight: 600;
    font-size: 16px;
    color: #1d2326;
    line-height: 24px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  .formBox {
    width: calc(100% - 32px);
    padding: 12px 16px;
  }

  .bottomBox {
    width: calc(100vw - 48px);
    padding: 0 24px;
    padding-top: 12px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    padding-bottom: 34px;

    .publishButton {
      text {
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
