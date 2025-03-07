<template>
  <view class="box">
    <image src="../../static/images/play-bg.png" class="bg" />
    <view class="rank">
      <view class="item">
        <view class="rank-num">1st</view>
        <u-image
          src="/static/images/avatar.png"
          shape="circle"
          width="100"
          height="100"
        ></u-image>
        <view class="name">健身小趴菜</view>
        <view class="score">
          <div class="item">黄金1</div>
          <div class="item">445</div>
        </view>
      </view>
      <view class="item">
        <view class="rank-num">1st</view>
        <u-image
          src="/static/images/avatar.png"
          shape="circle"
          width="100"
          height="100"
        ></u-image>
        <view class="name">健身小趴菜</view>
        <view class="score">
          <div class="item">黄金1</div>
          <div class="item">445</div>
        </view>
      </view>
      <view class="item">
        <view class="rank-num">1st</view>
        <u-image
          src="/static/images/avatar.png"
          shape="circle"
          width="100"
          height="100"
        ></u-image>
        <view class="name">健身小趴菜</view>
        <view class="score">
          <div class="item">黄金1</div>
          <div class="item">445</div>
        </view>
      </view>
    </view>
    <u-sticky offset-top="100" style="background-color: #f3f3f4">
      <view class="search">
        <view class="item">
          <u-search placeholder="请输入赛事关键词" v-model="keyword"></u-search>
        </view>
      </view>
    </u-sticky>

    <u-sticky offset-top="165">
      <view class="type">
        <view class="item">
          <view class="left">
            <u-dropdown>
              <u-dropdown-item
                v-model="value1"
                title="商圈"
                :options="options1"
              ></u-dropdown-item>
              <u-dropdown-item
                v-model="value2"
                title="类型"
                :options="options2"
              ></u-dropdown-item>
              <u-dropdown-item
                v-model="value3"
                title="默认排序"
                :options="options3"
              ></u-dropdown-item>
            </u-dropdown>
          </view>

          <view class="right">
            <image src="/static/images/location.png" />
            <view class="value">广州市</view>
          </view>
        </view>
      </view>
    </u-sticky>

    <view class="content">
      <view class="item">
        <view class="left">
          <image
            src="/static/images/04.jpg"
            style="width: 90px; height: 90px"
          />
          <view class="buttom">
            <view class="img" style="display: flex">
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
            </view>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image src="/static/images/like.png" />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image src="/static/images/time.png" mode="scaleToFill" />
            <view class="value">2025 3.18 19:00-20:30</view>
          </view>

          <view class="right-buttom">
            <view class="end">
              <view class="c"></view>
              <view class="value">明日10:00结束报名</view>
            </view>

            <view class="bt">JOIN</view>
          </view>
        </view>
      </view>
      <view class="item">
        <view class="left">
          <image
            src="/static/images/04.jpg"
            style="width: 90px; height: 90px"
          />
          <view class="buttom">
            <view class="img" style="display: flex">
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
            </view>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image src="/static/images/like.png" />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image src="/static/images/time.png" mode="scaleToFill" />
            <view class="value">2025 3.18 19:00-20:30</view>
          </view>

          <view class="right-buttom">
            <view class="end">
              <view class="c"></view>
              <view class="value">明日10:00结束报名</view>
            </view>

            <view class="bt">JOIN</view>
          </view>
        </view>
      </view>
      <view class="item">
        <view class="left">
          <image
            src="/static/images/04.jpg"
            style="width: 90px; height: 90px"
          />
          <view class="buttom">
            <view class="img" style="display: flex">
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
            </view>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image src="/static/images/like.png" />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image src="/static/images/time.png" mode="scaleToFill" />
            <view class="value">2025 3.18 19:00-20:30</view>
          </view>

          <view class="right-buttom">
            <view class="end">
              <view class="c"></view>
              <view class="value">明日10:00结束报名</view>
            </view>

            <view class="bt">JOIN</view>
          </view>
        </view>
      </view>
      <view class="item">
        <view class="left">
          <image
            src="/static/images/04.jpg"
            style="width: 90px; height: 90px"
          />
          <view class="buttom">
            <view class="img" style="display: flex">
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
            </view>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image src="/static/images/like.png" />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image src="/static/images/time.png" mode="scaleToFill" />
            <view class="value">2025 3.18 19:00-20:30</view>
          </view>

          <view class="right-buttom">
            <view class="end">
              <view class="c"></view>
              <view class="value">明日10:00结束报名</view>
            </view>

            <view class="bt">JOIN</view>
          </view>
        </view>
      </view>
      <view class="item">
        <view class="left">
          <image
            src="/static/images/04.jpg"
            style="width: 90px; height: 90px"
          />
          <view class="buttom">
            <view class="img" style="display: flex">
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
            </view>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image src="/static/images/like.png" />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image src="/static/images/time.png" mode="scaleToFill" />
            <view class="value">2025 3.18 19:00-20:30</view>
          </view>

          <view class="right-buttom">
            <view class="end">
              <view class="c"></view>
              <view class="value">明日10:00结束报名</view>
            </view>

            <view class="bt">JOIN</view>
          </view>
        </view>
      </view>
      <view class="item">
        <view class="left">
          <image
            src="/static/images/04.jpg"
            style="width: 90px; height: 90px"
          />
          <view class="buttom">
            <view class="img" style="display: flex">
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
            </view>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image src="/static/images/like.png" />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image src="/static/images/time.png" mode="scaleToFill" />
            <view class="value">2025 3.18 19:00-20:30</view>
          </view>

          <view class="right-buttom">
            <view class="end">
              <view class="c"></view>
              <view class="value">明日10:00结束报名</view>
            </view>

            <view class="bt">JOIN</view>
          </view>
        </view>
      </view>
      <view class="item">
        <view class="left">
          <image
            src="/static/images/04.jpg"
            style="width: 90px; height: 90px"
          />
          <view class="buttom">
            <view class="img" style="display: flex">
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
            </view>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image src="/static/images/like.png" />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image src="/static/images/time.png" mode="scaleToFill" />
            <view class="value">2025 3.18 19:00-20:30</view>
          </view>

          <view class="right-buttom">
            <view class="end">
              <view class="c"></view>
              <view class="value">明日10:00结束报名</view>
            </view>

            <view class="bt">JOIN</view>
          </view>
        </view>
      </view>
      <view class="item">
        <view class="left">
          <image
            src="/static/images/04.jpg"
            style="width: 90px; height: 90px"
          />
          <view class="buttom">
            <view class="img" style="display: flex">
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
            </view>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image src="/static/images/like.png" />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image src="/static/images/time.png" mode="scaleToFill" />
            <view class="value">2025 3.18 19:00-20:30</view>
          </view>

          <view class="right-buttom">
            <view class="end">
              <view class="c"></view>
              <view class="value">明日10:00结束报名</view>
            </view>

            <view class="bt">JOIN</view>
          </view>
        </view>
      </view>
      <view class="item">
        <view class="left">
          <image
            src="/static/images/04.jpg"
            style="width: 90px; height: 90px"
          />
          <view class="buttom">
            <view class="img" style="display: flex">
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
              <image src="/static/images/avatar.png"></image>
            </view>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image src="/static/images/like.png" />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image src="/static/images/time.png" mode="scaleToFill" />
            <view class="value">2025 3.18 19:00-20:30</view>
          </view>

          <view class="right-buttom">
            <view class="end">
              <view class="c"></view>
              <view class="value">明日10:00结束报名</view>
            </view>

            <view class="bt">JOIN</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.box {
  width: 100%;
  background: #f7f7f7;

  .bg {
    width: 100%;
    height: 323px;
  }
  .rank {
    position: absolute;
    top: 21%;
    left: 0;
    right: 0;
    margin: auto;
    width: 80%;
    height: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      .rank-num {
        font-weight: 400;
        font-size: 12px;
        color: #1d2326;
      }
      .name {
        font-weight: 400;
        font-size: 14px;
        color: #242424;
      }
      .score {
        display: flex;
        border: 1px solid #f0f0f0;
        width: 64px;
        height: 20px;
        align-items: center;
        justify-content: space-evenly;
        .item {
          font-weight: 600;
          font-size: 10px;
          color: rgba(29, 35, 38, 0.5);
          &:first-child {
            border-right: 1px solid #f0f0f0;
          }
        }
      }
    }
  }
  .search {
    width: 100%;

    background-color: #f7f7f7;
    .item {
      width: 90%;
      margin: auto;
    }
  }

  .type {
    width: 100%;

    background-color: #F7F7F7;

    .item {
      width: 90%;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .left {
      width: 70%;
    }
    .right {
      display: flex;
      align-items: center;
      image {
        width: 16px;
        height: 16px;
      }
    }
  }

  .content {
    width: 90%;
    margin: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px;
      border-radius: 10px;
      background: #fff;

      .left {
        width: 30%;
        display: flex;
        flex-direction: column;
        gap: 5px;
        .buttom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .img {
            display: flex;
            image:nth-child(2) {
              margin-left: -7px;
            }
            image:nth-child(3) {
              margin-left: -7px;
            }
            image:nth-child(4) {
              margin-left: -7px;
            }
            image {
              width: 18px;
              height: 18px;
            }
          }
          .value {
            font-weight: 400;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.3);
          }
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        width: 70%;
        height: 115px;
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          .title {
            font-weight: 600;
            font-size: 14px;
            color: #333333;
          }
          .hot {
            display: flex;
            gap: 5px;
            align-items: center;
            image {
              width: 12px;
              height: 12px;
            }
          }
        }
        .second {
          font-weight: 400;
          font-size: 12px;
          color: rgba(29, 35, 38, 0.5);
          margin-top: 6px;
        }
        .time {
          display: flex;
          align-items: center;
          margin-top: 12px;
          gap: 3px;

          image {
            width: 16px;
            height: 16px;
          }
          .value {
            font-weight: 500;
            font-size: 12px;
            color: rgba(29, 35, 38, 0.8);
          }
        }
        .right-buttom {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
          .end {
            display: flex;
            align-items: center;
            gap: 5px;
            margin-top: 10px;
            .c {
              width: 8px;
              height: 8px;
              background: #cccccc;
              border-radius: 50%;
            }

            .value {
              font-weight: 400;
              font-size: 10px;
              color: rgba(29, 35, 38, 0.5);
            }
          }
          .bt {
            width: 75px;
            height: 28px;
            border-radius: 20px;
            border: 1px solid #dbdbdb;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 400;
            font-size: 16px;
            color: #1d2326;
          }
        }
      }
    }
  }
}

:deep(.u-sticky) {
  background-color: #f3f3f4;
}
</style>
