<template>
  <view class="box">
    <view class="first">
      <image
        src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/play-bg.png"
        class="bg"
      >
      </image>
      <view class="rank">
        <view class="item">
          <view class="rank-num">2st</view>
          <u-avatar :src="src"></u-avatar>
          <view class="name">健身小趴菜</view>
          <view class="score">
            <div class="item">黄金1</div>
            <div class="item">445</div>
          </view>
        </view>
        <view class="item" style="margin-top: -10px">
          <view class="rank-num">1st</view>
          <u-avatar :src="src"></u-avatar>
          <view class="name">健身小趴菜</view>
          <view class="score">
            <div class="item">黄金1</div>
            <div class="item">445</div>
          </view>
        </view>
        <view class="item">
          <view class="rank-num">3st</view>
          <u-avatar :src="src"></u-avatar>
          <view class="name">健身小趴菜</view>
          <view class="score">
            <div class="item">黄金1</div>
            <div class="item">445</div>
          </view>
        </view>
      </view>
    </view>

    <view class="search" id="search">
      <u-input
        placeholder="请输入赛事关键词"
        prefixIcon="search"
        prefixIconStyle="font-size: 22px;color: #909399"
        shape="circle"
      >
        <template slot="suffix">
          <view class="bt1">搜索</view>
        </template>
      </u-input>
    </view>

    <u-navbar v-if="isSticky">
      <view slot="left">
        <u-search
          placeholder="请输入赛事关键词"
          v-model="keyword"
          bg-color="#F7F7F7"
          :show-action="false"
        ></u-search>
      </view>
    </u-navbar>

    <view
      class="type"
      :class="{ sticky: isSticky }"
      :style="{ top: isSticky ? stickyTop : '' }"
    >
      <view class="left">
        <view class="item">
          <text>商圈</text>
          <u-image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/down.png"
            width="12px"
            height="12px"
          >
          </u-image>
        </view>
        <view class="item">
          <text>类型</text>
          <u-image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/down.png"
            width="12px"
            height="12px"
          >
          </u-image>
        </view>
        <view class="item">
          <text>默认排序</text>
          <u-image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/down.png"
            width="12px"
            height="12px"
          >
          </u-image>
        </view>
      </view>
      <view class="right">
        <image
          src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/location.png"
        />
        <view class="value">广州市</view>
      </view>
    </view>

    <view class="content">
      <view class="item">
        <view class="left">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            style="width: 90px; height: 90px"
            mode="aspectFill"
          />
          <view class="buttom">
            <u-avatar-group :urls="urls" size="18" gap="0.4"></u-avatar-group>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/like.png"
              />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/time.png"
              mode="scaleToFill"
            />
            <view class="value">2025 3.18 19:00-20:30</view>
          </view>

          <view class="right-buttom">
            <view class="end">
              <view class="c"></view>
              <view class="value">明日10:00结束报名</view>
            </view>

            <view class="bt" @click="join">JOIN</view>
          </view>
        </view>
      </view>
      <view class="item">
        <view class="left">
          <image
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            style="width: 90px; height: 90px"
            mode="aspectFill"
          />
          <view class="buttom">
            <u-avatar-group :urls="urls" size="18" gap="0.4"></u-avatar-group>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/like.png"
              />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/time.png"
              mode="scaleToFill"
            />
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
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            style="width: 90px; height: 90px"
            mode="aspectFill"
          />
          <view class="buttom">
            <u-avatar-group :urls="urls" size="18" gap="0.4"></u-avatar-group>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/like.png"
              />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/time.png"
              mode="scaleToFill"
            />
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
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            style="width: 90px; height: 90px"
            mode="aspectFill"
          />
          <view class="buttom">
            <u-avatar-group :urls="urls" size="18" gap="0.4"></u-avatar-group>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/like.png"
              />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/time.png"
              mode="scaleToFill"
            />
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
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            style="width: 90px; height: 90px"
            mode="aspectFill"
          />
          <view class="buttom">
            <u-avatar-group :urls="urls" size="18" gap="0.4"></u-avatar-group>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/like.png"
              />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/time.png"
              mode="scaleToFill"
            />
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
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            style="width: 90px; height: 90px"
            mode="aspectFill"
          />
          <view class="buttom">
            <u-avatar-group :urls="urls" size="18" gap="0.4"></u-avatar-group>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/like.png"
              />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/time.png"
              mode="scaleToFill"
            />
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
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            style="width: 90px; height: 90px"
            mode="aspectFill"
          />
          <view class="buttom">
            <u-avatar-group :urls="urls" size="18" gap="0.4"></u-avatar-group>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/like.png"
              />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/time.png"
              mode="scaleToFill"
            />
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
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            style="width: 90px; height: 90px"
            mode="aspectFill"
          />
          <view class="buttom">
            <u-avatar-group :urls="urls" size="18" gap="0.4"></u-avatar-group>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/like.png"
              />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/time.png"
              mode="scaleToFill"
            />
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
            src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/02.jpg"
            style="width: 90px; height: 90px"
            mode="aspectFill"
          />
          <view class="buttom">
            <u-avatar-group :urls="urls" size="18" gap="0.4"></u-avatar-group>
            <view class="value">已报名</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">天健S1橄榄球联赛</view>
            <view class="hot">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/like.png"
              />
              <view class="value">900°</view>
            </view>
          </view>
          <view class="second">海珠区第1名 | 30人 | ￥80/人 </view>
          <view class="time">
            <image
              src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/time.png"
              mode="scaleToFill"
            />
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
    return {
      isSticky: false,
      keyword: "",
      statusBarHeight: 0,
      navbarHeight: 44,
      urls: [
        "https://uviewui.com/album/1.jpg",
        "https://uviewui.com/album/2.jpg",
        "https://uviewui.com/album/3.jpg",
        "https://uviewui.com/album/4.jpg",
      ],
    };
  },
  onShow() {
    const systemInfo = uni.getSystemInfoSync();
    this.initIntersectionObserver();
    this.statusBarHeight = systemInfo.statusBarHeight;
  },
  methods: {
    clear() {
      this.keyword = "";
    },
    initIntersectionObserver() {
      this.$nextTick(() => {
        this.observer = uni.createIntersectionObserver(this);
        this.observer.relativeToViewport().observe("#search", (res) => {
          this.isSticky = res.intersectionRatio <= 0;
        });
      });
    },
    join() {
      uni.navigateTo({
        url: "/competition/apply/appear",
      });
    },
  },

  computed: {
    stickyTop() {
      return `${this.statusBarHeight + this.navbarHeight}px`;
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100vw;
  background: #f7f7f7;
  .first {
    position: relative;
    .bg {
      width: 100%;
      height: 323px;
    }
    .rank {
      position: absolute;
      top: 48%;
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
          width: 100%;
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
  }

  .search {
    width: 90%;
    margin: auto;
    background-color: #fcfcfc;
  }

  .type.sticky {
    background-color: #ffffff;
    position: fixed;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    margin: 0;
    z-index: 999;
  }

  .type {
    width: 90%;
    margin: 10px auto;
    background-color: #f7f7f7;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: 12px;
      color: rgba(29, 35, 38, 0.6);

      .item:nth-child(1) {
        border-right: 1px solid #e6e6e6;
      }
      .item:nth-child(2) {
        border-right: 1px solid #e6e6e6;
      }
      .item {
        display: flex;
        align-items: center;
        gap: 3px;
        width: 70px;
        justify-content: center;
      }
    }
    .right {
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: 12px;
      color: rgba(29, 35, 38, 0.5);
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
    padding-bottom: 60px;

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
.bt1 {
  background-color: #ec384a;
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
  padding: 6px 15px;
  border-radius: 20px;
}
</style>
