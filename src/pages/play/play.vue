<template>
  <view class="box">
    <view class="first">
      <image
        src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/play-bg.png"
        class="bg"
      >
      </image>
      <view class="rank">
        <view class="top">
          <view class="title">运动积分等级排行</view>
          <view class="more" @click="toMore"
            >更多
            <view class="icon">
              <u-icon name="arrow-right" color="#fff" size="8"></u-icon>
            </view>
          </view>
        </view>
        <view class="bt">
          <view class="item">
            <view class="rank-num">2ST</view>
            <view class="b1">
              <view class="b2">
                <u-avatar :src="src"></u-avatar>
              </view>
            </view>

            <view class="name">健身小趴菜</view>
            <view class="score">
              <div class="item">黄金1</div>
              <div class="item">445</div>
            </view>
          </view>
          <view class="item" style="margin-top: -10px">
            <view class="rank-num">1ST</view>
            <view class="b3">
              <view class="b4">
                <u-avatar :src="src" size="50"></u-avatar>
              </view>
            </view>

            <view class="name">健身小趴菜</view>
            <view class="score">
              <div class="item">黄金1</div>
              <div class="item">445</div>
            </view>
          </view>
          <view class="item">
            <view class="rank-num">3ST</view>
            <view class="b1">
              <view class="b2">
                <u-avatar :src="src"></u-avatar>
              </view>
            </view>
            <view class="name">健身小趴菜</view>
            <view class="score">
              <div class="item">黄金1</div>
              <div class="item">445</div>
            </view>
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
          placeholderClass="placeholder-class"
        ></u-search>
      </view>
    </u-navbar>

    <view
      class="type"
      :class="{ sticky: isSticky }"
      :style="{ top: isSticky ? stickyTop : '' }"
    >
      <view class="left">
        <view class="item" @click="selectTab(0)">
          <text :style="{ color: activeTab === 0 ? '#EC384A' : '' }">商圈</text>
          <u-icon
            name="arrow-down-fill"
            size="8"
            :color="activeTab === 0 ? '#EC384A' : '#ccc'"
          ></u-icon>
        </view>
        <view class="item" @click="selectTab(1)">
          <text :style="{ color: activeTab === 1 ? '#EC384A' : '' }">类型</text>
          <u-icon
            name="arrow-down-fill"
            size="8"
            :color="activeTab === 1 ? '#EC384A' : '#ccc'"
          ></u-icon>
        </view>
        <view class="item" style="margin-left: 13px" @click="selectTab(2)">
          <text :style="{ color: activeTab === 2 ? '#EC384A' : '' }"
            >默认排序</text
          >
          <u-icon
            name="arrow-down-fill"
            size="8"
            :color="activeTab === 2 ? '#EC384A' : '#ccc'"
          ></u-icon>
        </view>
      </view>
      <view class="right">
        <u-icon name="map" size="16" color="#CCCCCC"></u-icon>
        <view class="value">{{ city }}</view>
      </view>
    </view>

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
            <view class="value">已报名</view>
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

            <view class="bt" @click="join(item)">JOIN</view>
          </view>
        </view>
      </view>
      <u-loadmore :status="status" @loadmore="getQueryMatchList" />
    </view>

    <u-popup
      :show="show"
      mode="bottom"
      @close="closeModal"
      :safeAreaInsetBottom="false"
    >
      <view class="local">
        <view class="top" v-if="activeTab == 0">
          <view class="left">
            <view class="item">荔湾区</view>
            <view class="item">荔湾区</view>
            <view class="item">荔湾区</view>
            <view class="item">荔湾区</view>
            <view class="item">荔湾区</view>
            <view class="item">荔湾区</view>
            <view class="item">荔湾区</view>
            <view class="item">荔湾区</view>
            <view class="item">荔湾区</view>
            <view class="item">荔湾区</view>
          </view>
          <view class="right">
            <u-radio-group v-model="value" placement="column">
              <u-radio
                activeColor="red"
                label="不限"
                customStyle="margin-bottom: 20px;margin-left: 20px"
              ></u-radio>
              <u-radio
                activeColor="red"
                label="车陂"
                customStyle="margin-bottom: 20px;margin-left: 20px"
              ></u-radio>
              <u-radio
                activeColor="red"
                label="东圃"
                customStyle="margin-bottom: 20px;margin-left: 20px"
              ></u-radio>
            </u-radio-group>
          </view>
        </view>
        <view class="type" v-if="activeTab == 1">
          <view
            :class="active === index ? 'item-active' : 'item'"
            v-for="(item, index) in matchLabel"
            :key="index"
            @click="checkThis(item, index)"
            >{{ item.label_name }}</view
          >
        </view>
        <view class="sort">
          <u-radio-group v-model="sortType" placement="column">
            <u-radio
              shape="circle"
              :label="item.label"
              :name="item.value"
              activeColor="red"
              v-for="(item, index) in sortList"
              :key="index"
              customStyle="margin-bottom: 20px"
            ></u-radio>
          </u-radio-group>
        </view>
        <view class="next">
          <view class="left" @click="reset">
            <u-icon name="reload" size="24"></u-icon>
            重置
          </view>
          <view class="right" @click="enter"> 确定 </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      status: "loadmore",
      isSticky: false,
      keyword: "",
      statusBarHeight: 0,
      navbarHeight: 44,
      activeTab: null,
      urls: [
        "https://uviewui.com/album/1.jpg",
        "https://uviewui.com/album/2.jpg",
        "https://uviewui.com/album/3.jpg",
        "https://uviewui.com/album/4.jpg",
      ],
      city: "暂无",
      show: false,
      matchList: [],
      matchLabel: [],
      sortList: [],
      pageNum: 1,
      pageSize: 10,
      sortType: "0",
      labelCode: "",
      active: "",
    };
  },
  onload() {},
  onShow() {
    const systemInfo = uni.getSystemInfoSync();
    this.initIntersectionObserver();
    this.statusBarHeight = systemInfo.statusBarHeight;
    this.queryMatchLabel();
    this.getSort();
    this.getQueryMatchList();
    this.city = uni.getStorageSync("city") || "暂无";
  },
  methods: {
    initIntersectionObserver() {
      this.$nextTick(() => {
        this.observer = uni.createIntersectionObserver(this);
        this.observer.relativeToViewport().observe("#search", (res) => {
          this.isSticky = res.intersectionRatio <= 0;
        });
      });
    },
    join(item) {
      uni.navigateTo({
        url: `/competition/apply/appear?matchId=${item.id}`,
      });
    },
    toMore() {
      uni.navigateTo({
        url: "/else/play/more",
      });
    },
    selectTab(index) {
      this.activeTab = index;
      this.show = true;
    },

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
    async queryMatchLabel() {
      var result = await uni.$u.http.get("/match/queryMatchLabel");
      if (result.status == 200) {
        this.matchLabel = result.data;
      }
    },
    closeModal() {
      this.show = false;
      this.activeTab = null;
    },
    async getSort() {
      var result = await uni.$u.http.get("/match/getSysDictByName", {
        params: {
          sysDicName: "match_list_sort_type",
        },
      });
      this.sortList = result.data;
    },
    checkThis(item, index) {
      this.active = index;
      this.labelCode = item.label_code;
    },
    enter() {
      this.show = false;
      this.matchList = [];
      this.getQueryMatchList();
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
body {
  background: #f7f7f7;
}
.box {
  width: 100vw;
  .first {
    position: relative;
    .bg {
      width: 100%;
      height: 323px;
    }
    .rank {
      position: absolute;
      top: 33%;
      left: 0;
      right: 0;
      margin: auto;
      width: 90%;
      height: 200px;

      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 12px;
        height: 50px;
        .title {
          font-weight: 400;
          font-size: 18px;
          color: #ffffff;
          font-family: youshe;
        }
        .more {
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 400;
          font-size: 12px;
          color: #ffffff;

          .icon {
            width: 13px;
            height: 13px;
            border-radius: 50%;
            background-color: black;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .bt {
        display: flex;
        justify-content: space-evenly;
        padding-top: 10px;
        height: 150px;
        box-sizing: border-box;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          .rank-num {
            font-weight: 400;
            font-size: 12px;
            color: #1d2326;
            font-family: youshe;
          }
          .name {
            font-weight: 400;
            font-size: 14px;
            color: #242424;
          }
          .score {
            display: flex;
            width: 100%;
            height: 20px;
            .item {
              flex: 1;
              font-weight: 600;
              font-size: 10px;
              color: rgba(29, 35, 38, 0.5);
              box-sizing: border-box;
              border: 1px solid #f0f0f0;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }

          .b1 {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: 2px solid #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            .b2 {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              border: 2px solid #dedede;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }

          .b3 {
            width: 54px;
            height: 54px;
            border-radius: 50%;
            border: 2px solid #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
            .b4 {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              border: 2px solid #dedede;
              display: flex;
              align-items: center;
              justify-content: center;
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
    border-radius: 20px;
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
.bt1 {
  background-color: #ec384a;
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
  padding: 6px 15px;
  border-radius: 20px;
}

.local {
  height: 332px;
  position: relative;
  .top {
    display: flex;
    align-items: center;
    .left {
      display: flex;
      width: 30%;
      background-color: #f5f5f5;
      flex-direction: column;
      overflow-y: scroll;
      height: 264px;
      .item {
        width: 100%;
        height: 46px;
        padding: 12px 0;
        box-sizing: border-box;
        font-weight: 400;
        font-size: 14px;
        color: #1d2326;
        text-indent: 30px;
      }
    }
    .right {
      width: 70%;
      height: 264px;
      padding-top: 20px;
      box-sizing: border-box;
    }
  }

  .sort {
    height: 264px;
    overflow-y: scroll;
    padding: 15px 16px;
    box-sizing: border-box;
  }

  .type {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: space-between;
    background-color: white;
    overflow-y: scroll;
    height: 252px;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 32px;
      background-color: #f7f7f7;
      font-weight: 400;
      font-size: 12px;
      color: #1d2326;
      white-space: nowrap;
    }
    .item-active {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 32px;
      background-color: #f7f7f7;
      font-weight: 400;
      font-size: 12px;
      color: red;
      white-space: nowrap;
    }
  }
}
.next {
  height: 68px;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
  background-color: #ffffff;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.05);
  position: absolute;
  bottom: 0;
  width: 100%;
  justify-content: space-around;
  .left {
    display: flex;
    gap: 5px;
    font-weight: 400;
    font-size: 14px;
    color: #1d2326;
    flex-direction: column;
    align-items: center;
  }
  .right {
    width: 80%;
    background-color: black;
    height: 44px;
    border-radius: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
  }
}
.placeholder-class {
  font-weight: 400;
  font-size: 14px;
  color: rgba(29, 35, 38, 0.3);
}
</style>
