<template>
  <view class="box">
    <u-navbar autoBack leftText="修改赞助" :fixed="false"> </u-navbar>
    <view class="reason">
      <u-icon name="close-circle-fill" color="#EC384A" size="24"></u-icon>
      审核未通过
    </view>
    <view class="idea">
      <view class="top">
        <view class="dian"></view>
        审核意见
      </view>
      <view class="text"> 请重新填写到店领取地址 </view>
    </view>
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
        <view class="right">
          <input
            placeholder="0.00"
            border="none"
            v-model="sponsorAmount"
            input-algin="right"
            placeholderClass="pl-class-money"
            type="number"
            class="input"
          />
          <text>￥</text>
        </view>
      </view>
      <view class="item" v-if="type == 2">
        <view class="left">期望赞助参赛数</view>
        <view style="width: 80px" class="right">
          <input
            placeholder="请填写数量"
            border="none"
            input-algin="right"
            placeholderClass="pl-class"
            type="number"
            class="input"
          />
        </view>
      </view>
    </view>

    <view class="title" v-if="type == 1">
      <view class="name">奖品赞助</view>
      <image
        src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/删减.png"
        mode="scaleToFill"
        style="width: 24px; height: 24px"
      />
    </view>
    <view class="content" v-if="type == 1">
      <view class="item">
        <view class="left">赞助类型 <view class="icon">*</view></view>
        <view class="right">
          <u-radio-group v-model="sponsorType">
            <u-radio
              shape="circle"
              label="实物赞助"
              customStyle="margin-right: 20px"
              name="1"
              activeColor="red"
            ></u-radio>
            <u-radio
              shape="circle"
              label="服务赞助"
              name="2"
              activeColor="red"
            ></u-radio>
          </u-radio-group>
        </view>
      </view>
      <view class="item-l">
        <view class="top">领取方式 <view class="icon">*</view></view>
        <view class="down">
          <u-radio-group v-model="receiveMethod">
            <u-radio
              shape="circle"
              label="比赛现场发放"
              customStyle="margin-right: 20px"
              name="1"
              activeColor="red"
            ></u-radio>
            <u-radio
              shape="circle"
              label="到店领取"
              customStyle="margin-right: 20px"
              name="2"
              activeColor="red"
            ></u-radio>
            <u-radio
              shape="circle"
              label="两者都支持"
              activeColor="red"
            ></u-radio>
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
                input-align="right"
                placeholderClass="pl-class"
              ></u-input>
            </view>
          </view>

          <view class="new">
            <view class="n1">目标对象</view>
            <view
              class="n2"
              @click="show = true"
              :style="targetAudienceName ? 'color: black' : ''"
              >{{ targetAudienceName || "请选择"
              }}<u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon
            ></view>
          </view>
        </view>
      </view>
      <view class="item">
        <view class="left">到店领取地址 <view class="icon">*</view></view>
        <view class="right" @click="chooseAddress">
          {{ pickupAddress || "请选择"
          }}<u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
        </view>
      </view>
      <view class="item">
        <view class="left">联系方式 <view class="icon">*</view></view>
        <view class="right">
          <view style="width: 110px">
            <u-input
              v-model="contactInfo"
              placeholder="请填写联系方式"
              border="none"
              input-align="right"
              placeholderClass="pl-class"
              type="number"
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

    <view class="list" v-if="type == 2">
      <view class="title"
        >实物赞助
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/删减.png"
          mode="scaleToFill"
          style="width: 24px; height: 24px"
      /></view>
      <view class="content">
        <view class="item-o">
          <view class="top">
            <view class="left">实物名称 <text>*</text></view>
            <view class="right" style="flex: 1">
              <u-input
                placeholder="实物名称，运动饮料、运动装备等"
                border="none"
                input-align="right"
                placeholderClass="pl-class"
              ></u-input> </view
          ></view>
          <view class="next">
            <view class="item-n">
              数量
              <view style="width: 110px">
                <u-input
                  placeholder="请输入"
                  border="none"
                  input-align="right"
                  placeholderClass="pl-class"
                ></u-input>
              </view>
            </view>
            <view class="item-n">
              单位
              <view style="width: 110px">
                <u-input
                  placeholder="请输入"
                  border="none"
                  input-align="right"
                  placeholderClass="pl-class"
                ></u-input>
              </view>
            </view>
          </view>
        </view>
        <view class="item">
          <view class="left">
            <u-icon name="plus-circle-fill" size="22" color="black"></u-icon>
            新增一项
          </view>
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/删除.png"
            mode="scaleToFill"
            style="width: 24px; height: 24px"
          />
        </view>
      </view>
    </view>

    <view class="title" v-if="type == 1">
      <view class="name">现场服务</view>
      <image
        src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/删减.png"
        mode="scaleToFill"
        style="width: 24px; height: 24px"
      />
    </view>
    <view class="content" v-if="type == 1">
      <view class="item">
        <view class="left">服务内容 <view class="icon">*</view></view>
        <view class="right">
          <view style="width: 110px">
            <u-input
              v-model="serveContent"
              placeholder="请填写服务内容"
              border="none"
              input-align="right"
              placeholderClass="pl-class"
            ></u-input>
          </view>
        </view>
      </view>
      <view class="item">
        <view class="left">目标对象 <view class="icon">*</view></view>
        <view class="right" @click="show = true">
          {{ targetAudienceName || "请选择"
          }}<u-icon name="arrow-right" size="12" color="#CCCCCC"></u-icon>
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

    <view class="list" v-if="type == 2">
      <view class="title"
        >服务赞助
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/删减.png"
          mode="scaleToFill"
          style="width: 24px; height: 24px"
      /></view>
      <view class="content">
        <view class="item-o">
          <view class="top">
            <view class="left">服务内容 <text>*</text></view>
            <view class="right" style="flex: 1">
              <u-input
                placeholder="服务名称、培训指导、运动康复等"
                border="none"
                input-align="right"
                placeholderClass="pl-class"
              ></u-input> </view
          ></view>
          <view class="next">
            <view class="item-n">
              数量
              <view style="width: 110px">
                <u-input
                  placeholder="请输入"
                  border="none"
                  input-align="right"
                  placeholderClass="pl-class"
                ></u-input>
              </view>
            </view>
            <view class="item-n">
              单位
              <view style="width: 110px">
                <u-input
                  placeholder="请输入"
                  border="none"
                  input-align="right"
                  placeholderClass="pl-class"
                ></u-input>
              </view>
            </view>
          </view>
        </view>
        <view class="item">
          <view class="left">
            <u-icon name="plus-circle-fill" size="22" color="black"></u-icon>
            新增一项
          </view>
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/删除.png"
            mode="scaleToFill"
            style="width: 24px; height: 24px"
          />
        </view>
      </view>
    </view>

    <view class="content" style="margin-top: 16px" v-if="type == 2">
      <view class="item">
        <view class="left">赞助时间</view>
        <view style="width: 200px" class="right">
          <input
            placeholder="0.00"
            border="none"
            v-model="time"
            input-algin="right"
            placeholderClass="pl-class-money"
            type="number"
            class="input"
          />个月
        </view>
      </view>
    </view>

    <view class="title" v-if="type == 1">
      <view class="name">赞助方要求</view>
    </view>
    <view class="content" style="padding-bottom: 25px" v-if="type == 1">
      <view class="title" style="margin-top: 16px">要求说明</view>
      <textarea placeholder-class="pl-class" class="t1" v-model="explain" />
      <view class="title" style="margin-top: 32px">赞助宣言</view>
      <textarea
        placeholder-class="pl-class"
        class="t1"
        placeholder="最多不超过25个字"
        v-model="sponsorDeclaration"
      />
    </view>

    <view class="first" v-if="type == 2">
      <view class="title"> 赞助方要求 </view>
      <view class="text"></view>
    </view>

    <view class="second" v-if="type == 2">
      <view class="title"> 赞助口号 </view>
      <view class="text"></view>
      <view class="next">
        <view class="left">赞助商logo</view>
        <view class="right">
          <u-avatar :src="src" size="50"></u-avatar>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>
    </view>
    <view class="bt-n">
      <view class="button" @click="save" v-if="type == 1">
        重新提交赞助申请
      </view>
      <view class="button" @click="save" v-if="type == 2"> 再次提交 </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      sponsorAmount: "500.00",
      sponsorType: "1",
      receiveMethod: "1",
      rewardName: "椰椰盲盒",
      rewardNum: "30",
      rewardUnit: "个",
      targetAudienceName: "前三名",
      contactInfo: "15323333458",
      serveContent: "全套肌肉拉伸",
      targetAudienceName: "前三名",
      explain:
        "1.希望能在现场设置品牌A字版2.比赛过程中可以口播品牌门店优惠信息",
      sponsorDeclaration: "李宁天河城店限时优惠满500减100，快来抢购",
      type: 0,
    };
  },
  onLoad(options) {
    this.type = options.type;
  },
};
</script>

<style lang="scss">
body {
  background-color: #f7f7f7;
}
.box {
  .reason {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 16px 18px;
    font-weight: 600;
    font-size: 20px;
    color: #1d2326;
  }
  .idea {
    padding: 12px;
    background-color: #fff;
    .top {
      display: flex;
      align-items: center;
      gap: 5px;
      font-weight: 600;
      font-size: 14px;
      color: #000000;
      .dian {
        width: 6px;
        height: 6px;
        background-color: #ec384a;
        border-radius: 50%;
      }
    }
    .text {
      border-radius: 4px;
      background-color: #fef2f1;
      font-weight: 400;
      font-size: 14px;
      color: #000000;
      padding: 12px;
      margin-top: 8px;
    }
  }

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
    .item:nth-last-child(1) {
      border: none;
    }
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
        white-space: nowrap;
        text {
          font-weight: 800;
          font-size: 18px;
          color: #1d2326;
        }
        .input {
          font-weight: 800;
          font-size: 18px;
          color: #1d2326;
          text-align: right;
        }
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
      height: 160px;
      padding: 12px;
    }
  }
  .bt-n {
    width: 100%;
    height: 102px;
    background-color: #fff;
    overflow: hidden;
    margin-top: 19px;
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
      margin-top: 12px;
    }
  }

  .list {
    .title {
      width: 90%;
      margin: auto;
      font-weight: 600;
      font-size: 16px;
      color: #1d2326;
      margin-top: 12px;
      padding-bottom: 8px;
    }
    .content {
      background-color: #fff;
      .item:nth-last-child(1) {
        border-bottom: none;
      }

      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 0;
        border-bottom: 1px solid #f0f0f0;

        .money {
          font-weight: 800;
          font-size: 18px;
          color: #1d2326;
        }
        .right {
          font-weight: 400;
          font-size: 14px;
          color: #1d2326;
        }
      }

      .item-o {
        display: flex;
        flex-direction: column;
        padding: 16px 0;
        gap: 16px;
        border-bottom: 1px solid #f0f0f0;
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .left {
            font-weight: 600;
            font-size: 14px;
            color: #1d2326;
            display: flex;
            align-items: center;
            gap: 5px;

            text {
              color: #ec384a;
            }
          }
          .right {
            font-weight: 400;
            font-size: 14px;
            color: #1d2326;
          }
        }
        .next {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .item-n {
            display: flex;
            align-items: center;
            gap: 20px;
            font-weight: 400;
            font-size: 14px;
            color: #1d2326;
          }
        }
      }
      .explain {
        .name {
          font-weight: 600;
          font-size: 14px;
          color: #1d2326;
          padding: 16px 0 12px;
        }
        .text {
          padding: 12px;
          border: 1px solid #f0f0f0;
          border-radius: 4px;
          font-weight: 400;
          font-size: 14px;
          color: #1d2326;
        }
      }
    }
  }

  .first {
    background-color: #fff;
    padding: 16px;
    margin-top: 16px;
    .title {
      font-weight: 600;
      font-size: 14px;
      color: #1d2326;
    }
    .text {
      margin-top: 16px;
      padding: 12px;
      font-weight: 400;
      font-size: 14px;
      color: #1d2326;
      border: 1px solid #f0f0f0;
      height: 176px;
      border-radius: 4px;
    }
  }
  .second {
    background-color: #fff;
    padding: 16px;
    margin-top: 16px;
    .title {
      font-weight: 600;
      font-size: 14px;
      color: #1d2326;
    }
    .text {
      margin-top: 16px;
      padding: 12px;
      font-weight: 400;
      font-size: 14px;
      color: #1d2326;
      border: 1px solid #f0f0f0;
      height: 100px;
      border-radius: 4px;
    }
    .next {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 17px;
      .left {
        font-weight: 600;
        font-size: 14px;
        color: #1d2326;
      }
      .right {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
}

.pl-class-money {
  font-weight: 800;
  font-size: 18px;
  color: #1d2326;
}
.pl-class {
  font-weight: 400;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
}
</style>
