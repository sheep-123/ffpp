<template>
  <view class="box">
    <u-navbar class="nav" autoBack leftText="发布动态" :fixed="false" bgColor="#fff">
      <view class="u-nav-slot" slot="left" style="display: flex;align-items: center;">
        <image src="https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/left.png" @click="back"
          class="back-btn" />
        <text class="navTitle">添加位置</text>
      </view>
    </u-navbar>
    <button @tap="nearby_search">搜索周边KFC</button>
    <!-- 地图容器 -->
    <!-- <map id="myMap" :latitude="latitude" :longitude="longitude" scale="16" /> -->
    <map id="myMap" :markers="markers" style="width:100%;height:300px;" longitude="116.313972" latitude="39.980014"
      scale='16'>
    </map>
    <view style="position: absolute;">
      <!-- 搜索栏 -->
      <view class="search-box">
        <view
          style="display: flex;align-items: center;background-color: #F5F5F5;width: 100%;border-radius: 20px;padding: 7px 16px;">
          <view style="display: flex;align-items: center;">
            <text style="font-size: 12px;">广州</text>
            <image src="@/static/images/bottomArrow.svg" mode="scaleToFill" style="width: 12px;height: 12px;" />
          </view>
          <view style="width: 1px;height: 14px;background-color: #DBDBDB;margin-left: 6px;"></view>
          <u-input v-model="addressDetail" placeholder="输入地点关键词" placeholder-class="input-placeholder"
            placeholder-style="color:#1D2326;font-size:14px" border="false" @input="" />
        </view>
        <!-- <input placeholder="输入地点关键词" @input.throttle="onSearchInput" /> -->
      </view>
      <!-- 地址列表 -->
      <view class="addressList">
        <scroll-view class="list-container" scroll-y style="height: 100px;">
          <view style="width: calc(100vw - 32px);margin: 0px 16px;">
            <view style="padding: 11px 0;" v-for="(item, index) in 10" :key="index">
              <view style="display: flex;justify-content: space-between;">
                <view><text style="font-size: 16px;
color: #EC384A;">红盾大厦省市场监督管理局大楼</text></view>
                <view><text style="font-size: 12px;
color: rgba(29,35,38,0.5);">18m</text></view>
              </view>
              <view>
                <view><text style="font-size: 12px;
color: rgba(29,35,38,0.5);">广东省广州市天河区体育西路57号(体育西路地铁A口旁)</text></view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="bottomBox">
      <u-button class="publishButton" color="#15181A">
        <text>确认选择</text>
      </u-button>
    </view>
  </view>
</template>
<script>
import { onLoad } from 'uview-ui/libs/mixin/mixin'



export default {

  data() {
    return {
      latitude: 39.90469,  // 默认北京中心坐标
      longitude: 116.40717,
      poiList: [],
      keyword: '',
      markers: [],
      // QQMapWX: {},
      qqmapsdk: {}

    }
  },
  onLoad() {
    // 引入SDK核心类
    var QQMapWX = require('../../assets/qqmap-wx-jssdk1.2/qqmap-wx-jssdk');

    // 实例化API核心类
    this.qqmapsdk = new QQMapWX({
      key: 'OVPBZ-6ABC5-XWDIP-IVGK4-UJMIS-ALBZT' // 必填
    });


  },
  methods: {
    // 正确初始化插件
    // 事件触发，调用接口
    nearby_search: function () {
      var _this = this
      // 调用接口
      this.qqmapsdk.search({
        keyword: 'kfc',  //搜索关键词
        location: '39.980014,116.313972',  //设置周边搜索中心点
        success: function (res) { //搜索成功后的回调
          console.log(res);

          var mks = []
          for (var i = 0; i < res.data.length; i++) {
            mks.push({ // 获取返回结果，放到mks数组中
              title: res.data[i].title,
              id: res.data[i].id,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              iconPath: "/resources/my_marker.png", //图标路径
              width: 20,
              height: 20,
            })
          }
          _this.markers = mks

        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        }
      })
    }
    // // 搜索地点
    // onSearchInput(e) {
    //   this.keyword = e.detail.value.trim()
    // },
    // // 调用腾讯地图POI搜索
    // searchPOI() {
    //   const qqmap = requirePlugin('qqmap-wx-jssdk')
    //   new qqmap({ key: 'ZGVBZ-W2HCJ-HFUFU-XNBUP-NF56V-IKBT7' }).search({
    //     keyword: this.keyword,
    //     success: res => {
    //       this.poiList = res.data
    //     }
    //   })
    // },
    // // 选择地点
    // selectPOI(e) {
    //   const { latitude, longitude } = e.currentTarget.dataset.item.location
    //   this.setData({ latitude, longitude })
    //   wx.navigateBack({ delta: 1 })  // 返回上一页带参数
    // }
  }
}

</script>


<style scoped lang="scss">
::v-deep .u-button.u-reset-button.data-v-3bf2dba7.u-button--square.u-button--normal {
  border-radius: 40px;
  padding: 10px 0;
}

.box {
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
        color: #FFFFFF;
        line-height: 24px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
  }

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
    color: #1D2326;
    line-height: 24px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  .formBox {
    width: calc(100% - 32px);
    padding: 12px 16px;
  }
}

/* 地图容器 */
#myMap {
  width: 100%;
  height: 50vh;
}

/* 搜索栏 */
.search-box {
  width: calc(100vw - 32px);
  margin: 0 16px;
  margin-top: 12px;
  display: flex;
  background: #fff;
}

.search-box input {
  flex: 1;
  border: 1rpx solid #ddd;
  padding: 10rpx 20rpx;
}

.search-box image {
  width: 40rpx;
  height: 40rpx;
  margin-left: 20rpx;
}

/* 地址列表 */
.poi-item {
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.poi-item .name {
  font-weight: bold;
  display: block;
}

.poi-item .address {
  color: #666;
  font-size: 24rpx;
}

.poi-item .distance {
  float: right;
  color: #888;
}
</style>