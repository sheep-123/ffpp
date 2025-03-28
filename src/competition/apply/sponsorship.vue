<template>
  <view class="box">
    <u-navbar autoBack leftText="申请赞助" :fixed="false"></u-navbar>
    <view class="title">
      <view class="name">现金赞助</view>
      <image
        src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/删减.png"
        mode="scaleToFill"
        style="width: 24px; height: 24px"
      />
    </view>
    <view class="content">
      <view class="item">
        <view class="left">赞助金额</view>
        <view style="width: 60px" class="right">
          ￥<u-input
            placeholder="0.00"
            border="none"
            v-model="value"
            input-algin="right"
            placeholderClass="pl-class"
          ></u-input>
        </view>
      </view>
    </view>

    <view class="title">
      <view class="name">奖品赞助</view>
      <image
        src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/删减.png"
        mode="scaleToFill"
        style="width: 24px; height: 24px"
      />
    </view>
    <view class="content">
      <view class="item">
        <view class="left">赞助类型 <view class="icon">*</view></view>
        <view class="right">
          <u-radio-group v-model="value">
            <u-radio
              shape="circle"
              label="实物赞助"
              customStyle="margin-right: 20px"
            ></u-radio>
            <u-radio shape="circle" label="服务赞助"></u-radio>
          </u-radio-group>
        </view>
      </view>
      <view class="item-l">
        <view class="top">领取方式 <view class="icon">*</view></view>
        <view class="down">
          <u-radio-group v-model="value">
            <u-radio
              shape="circle"
              label="比赛现场发放"
              customStyle="margin-right: 20px"
            ></u-radio>
            <u-radio
              shape="circle"
              label="到店领取"
              customStyle="margin-right: 20px"
            ></u-radio>
            <u-radio shape="circle" label="两者都支持"></u-radio>
          </u-radio-group>
        </view>
      </view>
      <view class="item-o">
        <view class="top">
          <view class="left"> 奖品名称 <view class="icon">*</view> </view>
          <view class="right">
            <view style="width: 110px">
              <u-input
                v-model="rewardName"
                placeholder="请填写奖品名称"
                border="none"
                @change="blur7"
                input-align="right"
                placeholderClass="pl-class"
              ></u-input>
            </view>
          </view>
        </view>
        <view class="bt">
          <view class="left">
            <view class="l1">数量</view>
            <view style="width: 40%">
              <u-input
                v-model="rewardNum"
                placeholder="请输入"
                border="none"
                @change="blur8"
                input-align="right"
                placeholderClass="pl-class"
              ></u-input>
            </view>
          </view>

          <view class="right">
            <view class="r1">单位</view>
            <view style="width: 40%">
              <u-input
                v-model="rewardUnit"
                placeholder="请输入"
                border="none"
                @change="blur9"
                input-align="right"
                placeholderClass="pl-class"
              ></u-input>
            </view>
          </view>

          <view class="new">
            <view class="n1">目标对象</view>
            <view class="n2"
              >请选择<u-icon
                name="arrow-right"
                size="12"
                color="#CCCCCC"
              ></u-icon
            ></view>
          </view>
        </view>
      </view>
      <view class="item">
        <view class="left">到店领取地址 <view class="icon">*</view></view>
        <view class="right">
          请选择<u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
        </view>
      </view>
      <view class="item">
        <view class="left">联系方式 <view class="icon">*</view></view>
        <view class="right">
          <view style="width: 110px">
            <u-input
              v-model="rewardName"
              placeholder="请填写联系方式"
              border="none"
              @change="blur7"
              input-align="right"
              placeholderClass="pl-class"
            ></u-input>
          </view>
        </view>
      </view>
      <view class="item">
        <view class="left">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/添加.png"
            mode="scaleToFill"
            style="width: 24px; height: 24px"
          />
          新增奖品
        </view>
        <view class="right">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/删除.png"
            mode="scaleToFill"
            style="width: 24px; height: 24px"
          />
        </view>
      </view>
    </view>

    <view class="title">
      <view class="name">现场服务</view>
      <image
        src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/删减.png"
        mode="scaleToFill"
        style="width: 24px; height: 24px"
      />
    </view>
    <view class="content">
      <view class="item">
        <view class="left">服务内容 <view class="icon">*</view></view>
        <view class="right">
          <view style="width: 110px">
            <u-input
              v-model="rewardName"
              placeholder="请填写服务内容"
              border="none"
              @change="blur7"
              input-align="right"
              placeholderClass="pl-class"
            ></u-input>
          </view>
        </view>
      </view>
      <view class="item">
        <view class="left">目标对象 <view class="icon">*</view></view>
        <view class="right">
          请选择<u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
        </view>
      </view>
      <view class="item">
        <view class="left">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/添加.png"
            mode="scaleToFill"
            style="width: 24px; height: 24px"
          />
          新增一项
        </view>
        <view class="right">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/删除.png"
            mode="scaleToFill"
            style="width: 24px; height: 24px"
          />
        </view>
      </view>
    </view>

    <view class="title">
      <view class="name">赞助方要求</view>
    </view>
    <view class="content" style="padding-bottom: 25px">
      <view class="title" style="margin-top: 16px">要求说明</view>
      <textarea placeholder-class="pl-class" auto-height class="t1" />
      <view class="title" style="margin-top: 32px">赞助宣言</view>
      <textarea
        placeholder-class="pl-class"
        auto-height
        class="t1"
        placeholder="最多不超过25个字"
      />
    </view>

    <view class="button"> 提交赞助申请 </view>
  </view>
</template>

<style lang="scss">
.box {
  width: 100vw;
  height: auto;
  background-color: #f7f7f7;
  padding-bottom: 200px;
  .title {
    width: 90%;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    font-weight: 600;
    font-size: 16px;
    color: #1d2326;
  }
  .content {
    background-color: #fff;
    margin-top: 8px;
    overflow: hidden;
    .item {
      display: flex;
      align-items: center;
      width: 90%;
      margin: auto;
      padding: 18px 0;
      justify-content: space-between;
      border-bottom: 1px solid #f0f0f0;
      .left {
        font-weight: 600;
        font-size: 14px;
        color: #1d2326;
        display: flex;
        align-items: center;
        gap: 5px;
        .icon {
          color: red;
        }
      }
      .right {
        display: flex;
        align-items: center;
        gap: 5px;
        font-weight: 400;
        font-size: 14px;
        color: #1d2326;
      }
    }
    .item-l {
      display: flex;
      flex-direction: column;
      width: 90%;
      margin: auto;
      padding: 18px 0;
      gap: 15px;
      border-bottom: 1px solid #f0f0f0;
      .top {
        font-weight: 600;
        font-size: 14px;
        color: #1d2326;
        display: flex;
        align-items: center;
        gap: 5px;
        .icon {
          color: red;
        }
      }
      .down {
        display: flex;
        align-items: center;
      }
    }
    .item-o {
      width: 90%;
      margin: auto;
      display: flex;
      flex-direction: column;
      padding: 16px 0px;
      border-bottom: 1px solid #f0f0f0;
      gap: 10px;

      .top {
        font-weight: 600;
        font-size: 14px;
        color: #1d2326;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5px;

        .wh {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #4aa9df;
          border: 1px solid gray;
          background-color: #f2f7ff;
          font-size: 10px;
        }

        .icon {
          color: red;
        }
      }

      .bt {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2px;
        font-weight: 400;
        font-size: 14px;
        color: #1d2326;
        .new {
          display: flex;
          align-items: center;
          gap: 5px;
          .n1 {
            font-weight: 400;
            font-size: 14px;
            color: #1d2326;
            white-space: nowrap;
          }
          .n2 {
            display: flex;
            align-items: center;
            gap: 5px;
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
            white-space: nowrap;
          }
        }
        .right {
          display: flex;
          align-items: center;
          gap: 5px;

          .r1 {
            white-space: nowrap;
          }

          .time {
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
            width: 49%;
          }

          text {
            font-weight: 400;
            font-size: 14px;
            color: rgba(29, 35, 38, 0.3);
          }
        }
      }

      .left {
        font-weight: 600;
        font-size: 14px;
        color: #1d2326;
        display: flex;
        align-items: center;
        gap: 5px;
        //不换行
        white-space: nowrap;

        .wh {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #4aa9df;
          border: 1px solid gray;
          background-color: #f2f7ff;
          font-size: 10px;
        }

        .icon {
          color: red;
        }
      }

      .right {
        display: flex;
        align-items: center;
        gap: 5px;

        .r1 {
          white-space: nowrap;
        }

        .time {
          font-weight: 400;
          font-size: 14px;
          color: rgba(29, 35, 38, 0.3);
          width: 49%;
        }

        text {
          font-weight: 400;
          font-size: 14px;
          color: rgba(29, 35, 38, 0.3);
        }
      }
    }
    .title {
      font-weight: 600;
      font-size: 14px;
      color: #1d2326;
    }
    .t1 {
      width: 90%;
      margin: auto;
      border: 1px solid #f0f0f0;
      border-radius: 5px;
      margin-top: 12px;
    }
  }

  .button {
    width: 80%;
    margin: auto;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
    background-color: black;
    border-radius: 25px;
    margin-top: 30px;
  }
}

.pl-class {
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.3);
}
</style>
