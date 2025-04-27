<template>
	<view class="box">
		<WNavbar title="添加位置" />
		<u-sticky :offsetTop="(44+systemInfo.statusBarHeight)+'px'">
			<view class="tabs-box">
				<u-tabs :activeStyle="{color:'#1D2326','font-weight':600}" lineColor="#EC384A" :list="list1"
					@click="tabClickHandle"></u-tabs>
				<div class="search-box" v-if="currentKey==0">
					<WSerch  @clear="searchParams.keywords='';searchHandle()" v-model="searchParams.keywords"
						@search="searchHandle" :cityName="cityName" @choseAddHandle="choseAddHandle" />
				</div>
			</view>
		</u-sticky>

		<view class="chose-site-box" v-if="currentKey==0">
			<div class="chose-site-box-item" @click="choseSiteHandle(item)" v-for="(item,index) in siteList" :key="index">
				<div class="left">
					<image :src="item.doorPhoto" mode=""></image>
				</div>
				<div class="right">
					<div class="site-info flex-jb">
						<div class="site-name u-line-1">{{item.siteName}}</div>
						<div class="km">{{(item.distance/1000).toFixed(2)}}km</div>
					</div>
					<div class="site-type">{{item.siteType}}</div>
					<div class="site-address flex-jb">
						<text style="width: 80%;" class="u-line-1">{{item.siteAddress}}</text>
						<u-icon v-if="choseInfo.id==item.id" name="checkbox-mark" size="38rpx" color="#EC384A"></u-icon>
					</div>
				</div>
			</div>
		</view>

		<view class="chose-map-box" v-if="currentKey==1">
			<map id="search-box" @tap="poitap" style="width: 100%;height: 466rpx;"
				:longitude="globalData.location.longitude" :latitude="globalData.location.latitude" :markers="markers">
			</map>

			<view class="map-list-box">
				<div class="search-box">
					<WSerch :leftShow="false" @choseAddHandle="addPopupShowChoseMap=true"  v-model="mapKeyWord" :cityName="cityName" @search="mapSearchHandle"  placeholder="请输入地点关键词" />
				</div>
				<div class="list">
					<div class="map-list-item" @click="choseAddressHandle(item)" v-for="(item,index) in mapList" :key="index">
						<div class="top flex-jb">
							<div class="title">{{item.title}}</div>
							<div class="distance">{{(item._distance/1000).toFixed(2)}}km</div>
						</div>
						<div class="bottom flex-jb">
							<div class="add u-line-1" >{{item.address}}</div>
							<u-icon v-if="choseInfo.id==item.id" name="checkbox-mark" size="38rpx" color="#EC384A"></u-icon>
						</div>
					</div>
				</div>
			</view>
		</view>

		<addressPopup :show.sync="addPopupShow" :safe='false' @handelAddress="handleAddress"></addressPopup>
		<addressPopup :show.sync="addPopupShowChoseMap" :safe='false' @handelAddress="handleAddressByMap"></addressPopup>
		
		<!-- 占位用 -->
		<view style="height: 136rpx;"></view>

		<!-- 底部选择按钮 -->
		<view class="safe-bottom bottom-btn">
			<view class="btn"  @click="sureHandle"  :style="{'background-color':choseInfo?'#15181A':'#B9BABA'}">
				确认选择
			</view>
		</view>


	</view>
</template>


<script>
	const app = getApp();
	import WNavbar from '@/components/WNavbar/index.vue';
	import WSerch from '@/components/WSerch/WSerch.vue';
	import addressPoup from '@/components/addressPopup/addressPopup.vue';
	export default {
		components: { 
			WNavbar,
			WSerch,
			addressPoup
		},
		data() {
			return {
				globalData: app.globalData,
				addPopupShow: false,
				addPopupShowChoseMap:false,
				currentKey: 0,
				list1: [{
					name: '选场地',
				}, {
					name: '选地址',
				}],
				markers: [],
				nowAddInfo: {
					id: 1,
					latitude: null,
					longitude: null,
					width:58,
					height:58,
					iconPath: 'https://testfeifanpaopao.jireplayer.com/download/upload/ffpp_xcx/images/Frame.png'
				},
				mapList: [],
				searchParams: { 
					city: '',
					keywords: '',
					userLat: 0,
					userLng: 0,
					page: 1,
					pageSize: 15
				},
				siteList: [],
				choseInfo: '', //选择的信息
				loading: false,
				cityName: '未知',
				mapKeyWord:''
			}
		},
		onReachBottom() {
			if(this.currentKey==0){
				if (this.loading) {
					return
				}
				this.searchParams.page++;
				this.getSiteList();
			}
			
		},
		async onLoad() {
			if (!this.globalData.location.latitude) {
				await this.getLocation();
			}
			this.cityName = await this.getLocationToAddress();
			this.nowAddInfo.latitude = this.globalData.location.latitude;
			this.nowAddInfo.longitude = this.globalData.location.longitude;
			this.searchParams.userLat = this.globalData.location.latitude;
			this.searchParams.userLng = this.globalData.location.longitude;
			this.getSiteList();
			this.markers = [this.nowAddInfo];
			this.mapList = await this.getTencentMaps(this.nowAddInfo.latitude, this.nowAddInfo.longitude, 1);
		},
		methods: {
			sureHandle(){
				if(!this.choseInfo){
					return 
				}
				console.log(this.choseInfo,'this.choseInfo');
				let data;
				if(this.choseInfo.type==='site'){
					const data = {
						venueId:this.choseInfo.id,
						address:this.choseInfo.siteName,
						detailAddress:this.choseInfo.siteAddress,
						locationLng:this.choseInfo.locationLng,
						locationLat:this.choseInfo.locationLat,
					}
					uni.setStorageSync('choseAddressInfo',JSON.stringify(data));
				}
				if(this.choseInfo.type==='address'){
					console.log('???');
					const data = {
						address:this.choseInfo.title,
						detailAddress:this.choseInfo.address,
						locationLng:this.choseInfo.locationLng,
						locationLat:this.choseInfo.locationLat,
					}
					uni.setStorageSync('choseAddressInfo',JSON.stringify(data));
				}
				uni.navigateBack();
			
			},
			handleAddressByMap({
				province,
				city,
				area
			}){
				const address = province+city+area;
				this.TXInverse(address)        	
			},
			async mapSearchHandle(){
				if(!this.mapKeyWord){
					this.mapList = await this.getTencentMaps(this.nowAddInfo.latitude, this.nowAddInfo.longitude, 1);
					return
				}
				this.mapList = await this.TXSearch(this.mapKeyWord,this.nowAddInfo.latitude,this.nowAddInfo.longitude);
			},
			choseAddressHandle(e){
				this.choseInfo = {
					...e,
					type:'address'
				}
			},
			choseSiteHandle(e){
				this.choseInfo = {
					...e,
					type:'site'
				}
			},
			searchHandle() {
				this.searchParams.page = 1;
				this.siteList = [];
				this.getSiteList();
			},
			async getSiteList() {
				uni.showLoading({
					title: '加载中...'
				})
				try {
					if (this.cityName && this.cityName != '未知') {
						this.searchParams.city = this.cityName;
					}
					this.loading = true;
					const res = await this.$requestAll.dynamics.getSiteList(this.searchParams);
					this.siteList = [...this.siteList, ...res.data];
					this.loading = false;
					uni.hideLoading();
				} catch (error) {
					uni.hideLoading();
				}

			},
			async poitap(evt) {
				this.nowAddInfo.latitude = evt.detail.latitude
				this.nowAddInfo.longitude = evt.detail.longitude
				this.markers = [this.nowAddInfo]
				this.mapList = await this.getTencentMaps(evt.detail.latitude, evt.detail.longitude, 1)
			},
			tabClickHandle(e) {
				this.choseInfo = '';
				this.currentKey = e.index;
			},
			choseAddHandle() {
				this.addPopupShow = true;
			},
			handleAddress({
				province,
				city,
				area
			}) {
				if (area) {
					this.cityName = area;
					this.searchHandle();
					return
				}
				if (city) {
					this.cityName = city;
					this.searchHandle();
					return
				}
				this.cityName = province;
				this.searchHandle();
			},
		},
	}
</script>


<style lang="scss">
	page {
		height: 100%;
		background-color: #F7F7F7;
	}

	.tabs-box {
		padding: 8rpx 32rpx;
		background-color: #fff;

		.search-box {
			margin-top: 20rpx;
		}
	}

	.chose-map-box {
		.map-list-box {
			padding: 24rpx 32rpx;
			background-color: #fff;

			.search-box {
				margin-bottom: 24rpx;
			}

			.list {
				.map-list-item {
					padding: 22rpx 0;

					.top {
						width: 100%;
						margin-bottom: 8rpx;

						.title {
							font-weight: 400;
							font-size: 32rpx;
							color: #1D2326;
						}

						.distance {
							font-weight: 400;
							font-size: 24rpx;
							color: rgba(29, 35, 38, 0.5);
						}
					}

					.bottom {
						.add {
							width: 80%;
							font-weight: 400;
							font-size: 24rpx;
							color: rgba(29, 35, 38, 0.5);
						}
					}
				}
			}
		}
	}

	.chose-site-box {
		padding: 48rpx 23rpx;

		.chose-site-box-item {
			height: 204rpx;
			box-sizing: border-box;
			padding: 24rpx;
			background: #FFFFFF;
			border-radius: 8rpx;
			display: flex;
			margin-bottom: 24rpx;

			.left {
				width: 156rpx;
				height: 156rpx;
				background-color: #ccc;
				margin-right: 28rpx;

				>image {
					width: 100%;
					height: 100%;
				}
			}

			.right {
				flex: 1;
				height: 100%;

				.site-info {
					width: 100%;
					margin-bottom: 12rpx;

					.site-name {
						font-weight: 600;
						font-size: 28rpx;
						color: #15181A;
					}

					.km {
						font-weight: 400;
						font-size: 24rpx;
						color: rgba(29, 35, 38, 0.6);
					}
				}

				.site-type {
					font-weight: 400;
					font-size: 24rpx;
					color: rgba(29, 35, 38, 0.6);
					margin-bottom: 36rpx;
				}

				.site-address {
					width: 100%;
					font-weight: 400;
					font-size: 24rpx;
					color: rgba(29, 35, 38, 0.6);
				}
			}
		}
	}

	.bottom-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 136rpx;
		background-color: #fff;
		padding: 24rpx 38rpx;

		.btn {
			font-weight: 600;
			font-size: 32rpx;
			color: #FFFFFF;
			width: 654rpx;
			height: 88rpx;
			background: #15181A;
			border-radius: 80rpx 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>