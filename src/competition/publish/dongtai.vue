<template>
  <view class="box">
    <u-navbar class="nav" autoBack leftText="发布动态" :fixed="false" bgColor="#f7f7f7"> </u-navbar>
    <view>
      <scroll-view scroll-y :style="{ height: windowHeight - bottomBoxHeight - statusBarHeight - 44 + 'px' }">
        <view class="contentBox">
          <u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="6" multiple :maxCount="6"
            width="100" height="100" :deleteIcon="'close'" :deleteIconColor="'#ff0000'" :deleteIconSize="20">
            <!-- <image src="@/static/addImage.png" mode="widthFix" style="margin-bottom:10px ;width: 100px;height: 100px;">
            </image> -->
          </u-upload>
          <view style="width: 200px;height: 30px;margin-bottom: 10px;">
            <image src="@/static/tips.png" mode="scaleToFill" style="width: 200px;height: 30px;" />
          </view>
          <view class="textBox">
            <u-input v-model="title" type="text" placeholder="添加标题" :maxlength="20" border="none" @input="inputEvent">
              <template slot="suffix">
                <view style="display: flex;align-items: center;">
                  <image src="@/static/clear.png" mode="scaleToFill" style="width: 20px;height: 20px;"
                    @click="onClearTitle" />
                  <text style="color: #c0c4cc;font-size: 20px;">{{ titleLength }}</text>
                </view>
              </template>
            </u-input>
            <u-divider></u-divider>
            <textarea style="width: 100%;height: 300px;overflow: scroll;" v-model="titleContent" type="text"
              maxlength="300" disable-default-padding="true" placeholder="和大家聊聊你的热爱吧..." border="none"></textarea>
          </view>
        </view>
        <view class="siteSelectionBox">
          <view class="box1">
            <view class="left">
              <image src="@/static/location.png" mode="scaleToFill" style="width: 30px;height: 30px;" />
              <text>添加位置</text>
            </view>
            <view class="right">
              <text>去选择</text>
              <image src="@/static/left.png" mode="scaleToFill" style="width: 30px;height: 30px;" />
            </view>
          </view>
          <view class="box2">
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="bottomBox">
      <view class="layoutBox">
        <view class="draftBox">
          <u-icon name="file-text" color="#000" size="24"></u-icon>
          <view>存草稿</view>
        </view>
        <view class="previewBox">
          <u-icon name="eye" color="#000" size="24"></u-icon>
          <view>预览</view>
        </view>
        <u-button shape="circle" color="#000 ">发布动态</u-button>
      </view>
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
      statusBarHeight: uni.getSystemInfoSync().statusBarHeight
    }
  },
  methods: {

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
      this.titleLength = this.titleLength - e.length
    },
    onClearTitle() {
      this.title = ''
    }

  },
  onLoad() {
    this.$nextTick(() => {
      uni.createSelectorQuery().select(".bottomBox").boundingClientRect(data => {
        this.bottomBoxHeight = data.height
        console.log(this.statusBarHeight);
        console.log(this.windowHeight);
      }).exec()
    })

  }
}
</script>


<style scoped lang='scss'>
::v-deep .u-upload__deletable.data-v-49deb6f2 {
  background-color: #8a8a8a !important;
  border-bottom-left-radius: 0 !important;
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
  // height: 50px;
  // line-height: 50px;
  font-size: 14px !important;
}


.box {
  background-color: #f7f7f7;
  width: 100vw;
  height: 100vh;

  .contentBox {
    width: calc(100% - 60px);
    margin: 0 16px;
    padding: 12px;
    background-color: #f0f0f0;
    border-radius: 10px;

    .textBox {
      width: calc(100% - 24px);
      padding: 12px;
      background-color: #fff;
    }
  }

  .siteSelectionBox {
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

    .box2 {}

  }

  .bottomBox {
    padding-top: 10px;
    width: 100%;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    padding-bottom: 50px;

    .layoutBox {
      width: calc(100% - 32px);
      margin: 0 16px;
      display: flex;
      align-items: center;

      .draftBox {
        width: calc(30% - 12px);
        margin: 0 6px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 12px;
      }

      .previewBox {
        width: calc(30% - 12px);
        margin: 0 6px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 12px;
      }
    }
  }
}
</style>