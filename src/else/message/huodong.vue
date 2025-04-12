<template>
  <view class="box">
    <u-navbar :fixed="false">
      <view class="nav" slot="left" @click="back">
        <u-icon name="arrow-left" color="black"></u-icon>活动列表
      </view>
    </u-navbar>
    <view class="content">
      <view class="item" v-for="(item, index) in matchList" :key="index">
        <view class="left">
          <image
            :src="item.mainImageUrl"
            style="width: 90px; height: 90px"
            mode="aspectFill"
          />
          <view class="buttom">
            <u-avatar-group :urls="urls" size="18" gap="0.4"></u-avatar-group>
            <view class="value">已上车</view>
          </view>
        </view>

        <view class="right">
          <view class="top">
            <view class="title">{{ item.name }}</view>
            <view class="hot">
              <image
                src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/like.png"
              />
              <view class="value">{{ item.heat }}°</view>
            </view>
          </view>
          <view class="second"
            >海珠区第1名 | {{ item.registerNum }}人 | ￥{{ item.entryFee }}/人
          </view>
          <view class="time">
            <u-icon name="clock" size="16" color="#CCCCCC"></u-icon>
            <view class="value">{{ item.startTime + "-" + item.endTime }}</view>
          </view>

          <view class="right-buttom">
            <view class="end">
              <view class="c"></view>
              <view class="value">{{ item.registrationEndTime }}结束报名</view>
            </view>

            <view class="bt" @click="join(item)">去玩</view>
          </view>
        </view>
      </view>
      <u-loadmore :status="status" @loadmore="getQueryMatchList" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      matchList: [],
      pageNum: 1,
      pageSize: 10,
      status: "more",
      urls: [],
    };
  },
  onLoad() {
    this.getQueryMatchList();
  },
  methods: {
    async getQueryMatchList() {
      this.status = "loading";
      try {
        const result = await uni.$u.http.post("/match/queryMatchList", {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          sortType: this.sortType,
          keywords: this.keyword,
        });

        if (result.status === 200) {
          const newData = result.data.list; // 获取新数据
          if (newData.length > 0) {
            this.matchList = this.matchList.concat(newData); // 将新数据追加到现有列表
            this.pageNum++; // 更新页码
            this.status = "loadmore"; // 恢复加载状态
          } else {
            this.status = "nomore"; // 没有更多数据
          }
        }
      } catch (err) {
        console.error(err);
        this.status = "loadmore"; // 恢复加载状态
      }
    },
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  .nav {
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 600;
    font-size: 16px;
    color: #1d2326;
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
          white-space: nowrap;
        }
        .time {
          display: flex;
          align-items: center;
          margin-top: 12px;
          gap: 10px;

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
          align-items: center;
          gap: 5px;
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
              white-space: nowrap;
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
            font-family: youshe;
          }
        }
      }
    }
  }
}
</style>
