<template>
  <view>
    <view>123</view>
    <!-- 地图容器 -->
    <map id="myMap" :latitude="latitude" :longitude="longitude" scale="16" />
    <!-- 搜索栏 -->
    <view class="search-box">
      <input placeholder="输入地点关键词" @input.throttle="onSearchInput" />
      <image src="@/static/images/chat.png" @tap="searchPOI" />
    </view>
    <!-- 地址列表 -->
    <scroll-view class="list-container" scroll-y>
      <block v-for="(item, index) in poiList" :key="index">
        <view class="poi-item" @bindtap="selectPOI" :data-item="item">
          <text class="name">{{ item.title }}</text>
          <text class="address">{{ item.address }}</text>
          <text class="distance">{{ item.distance }}米</text>
        </view>
      </block>
    </scroll-view>
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
    }
  },
  onLoad() {

  },
  methods: {
    // 正确初始化插件

    // 搜索地点
    onSearchInput(e) {
      this.keyword = e.detail.value.trim()
    },
    // 调用腾讯地图POI搜索
    searchPOI() {
      const qqmap = requirePlugin('qqmap-wx-jssdk')
      new qqmap({ key: 'ZGVBZ-W2HCJ-HFUFU-XNBUP-NF56V-IKBT7' }).search({
        keyword: this.keyword,
        success: res => {
          this.poiList = res.data
        }
      })
    },
    // 选择地点
    selectPOI(e) {
      const { latitude, longitude } = e.currentTarget.dataset.item.location
      this.setData({ latitude, longitude })
      wx.navigateBack({ delta: 1 })  // 返回上一页带参数
    }
  }
}

</script>


<style scoped>
/* 地图容器 */
#myMap {
  width: 100%;
  height: 50vh;
}

/* 搜索栏 */
.search-box {
  display: flex;
  padding: 15rpx;
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