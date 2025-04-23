<template>
	<view class="box">
		<WNavbar title="添加位置" />
		<u-sticky :offsetTop="(44+systemInfo.statusBarHeight)+'px'">
			<view class="tabs-box">
				<u-tabs :activeStyle="{color:'#1D2326','font-weight':600}" lineColor="#EC384A" :list="list1"
					@click="tabClickHandle"></u-tabs>
				<div class="search-box" v-if="currentKey==0" >
					<WSerch @choseAddHandle="choseAddHandle" />
				</div>
			</view>
		</u-sticky>

		<view class="chose-site-box" v-if="currentKey==0" >
			<div class="chose-site-box-item" v-for="(item,index) in 9" :key="index">
				<div class="left"></div>
				<div class="right">
					<div class="site-info flex-jb">
						<div class="site-name">奥特莱斯篮球中心</div>
						<div class="km">1.4km</div>
					</div>
					<div class="site-type">篮球馆</div>
					<div class="site-address flex-jb">
						<text>天河路·体育中心57号</text>
						<u-icon name="checkbox-mark" size="24" color="#EC384A"></u-icon>
					</div>
				</div>
			</div>
		</view>
		
		<view class="chose-map-box" v-if="currentKey==1"  >
			<map @tap="poitap" style="width: 100%;height: 466rpx;" :longitude="globalData.location.longitude" :latitude="globalData.location.latitude" :markers="markers" >
				
			</map>
			<view class="map-list-box">
				<div class="search-box" id="search-box" >
					<WSerch @choseAddHandle="choseAddHandle" />
				</div>
				<div class="list" @click="aaa" >
					<div class="map-list-item" v-for="(item,index) in mapList" :key="index" >
						<div class="top flex-jb">
							<div class="title">{{item.title}}</div>
							<div class="distance">{{item._distance}}m</div>
						</div>
						<div class="bottom">
							<div class="add">{{item.address}}</div>
						</div>
					<!-- 	<div class="left">
							<div class="title">{{item.title}}</div>
						</div>
						<div class="right">
							<div class="distance">{{item._distance}}m</div>
						</div> -->
					</div>
				</div>
			</view>
		</view>
		
		<addressPopup :show.sync="addPopupShow" :safe='false' @handelAddress="handleAddress"></addressPopup>

		<!-- 占位用 -->
		<view style="height: 136rpx;"></view>

		<!-- 底部选择按钮 -->
		<view class="safe-bottom bottom-btn">
			<view class="btn" :style="{'background-color':choseOne?'#15181A':'#B9BABA'}">
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
				addPopupShow:false,
				choseOne: '',
				keyword: '',
				currentKey:0,
				list1: [{
					name: '选场地',
				}, {
					name: '选地址',
				}],
				markers: [
				],
				nowAddInfo: {
					id: 1,
					latitude: null,
					longitude: null,
					// iconPath: '/static/add.png'
				},
				mapList: [],
			}
		},
		async onLoad() {
			if(!this.globalData.location.latitude){
				await this.getLocation();
			}
			this.nowAddInfo.latitude = this.globalData.location.latitude;
			this.nowAddInfo.longitude = this.globalData.location.longitude;
			this.markers = [this.nowAddInfo];
			this.mapList = await this.getTencentMaps(this.nowAddInfo.latitude, this.nowAddInfo.longitude,1);
		},
		methods: {
			async poitap(evt) {
				this.nowAddInfo.latitude = evt.detail.latitude
				this.nowAddInfo.longitude = evt.detail.longitude
				this.markers = [this.nowAddInfo]
				this.mapList = await this.getTencentMaps(evt.detail.latitude, evt.detail.longitude,1)
			},
			tabClickHandle(e){
				this.currentKey = e.index;
			} ,
			choseAddHandle(){
				this.addPopupShow = true;
			},
			handleAddress(){
				
			},
			aaa(){
				uni.pageScrollTo({
					selector:'#search-box'
				})
			}
		}
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
	.chose-map-box{
		.map-list-box{
			padding: 24rpx 32rpx;
			background-color: #fff;
			.search-box{
				margin-bottom: 24rpx;
			}
			.list{
				.map-list-item{
					padding: 22rpx 0;
					.top{
						width: 100%;
						margin-bottom: 8rpx;
						.title{
							font-weight: 400;
							font-size: 32rpx;
							color: #1D2326;
						}
						.distance{
							font-weight: 400;
							font-size: 24rpx;
							color: rgba(29,35,38,0.5);
						}
					}
					.bottom{
						.add{
							font-weight: 400;
							font-size: 24rpx;
							color: rgba(29,35,38,0.5);
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
			.left{
				width: 156rpx;
				height: 156rpx;
				background-color: #ccc;
				margin-right: 28rpx;
				>image{
					width: 100%;
					height: 100%;
				}
			}
			.right{
				flex: 1 ;
				height: 100%;
				.site-info{
					width: 100%;
					margin-bottom: 12rpx;
					.site-name{
						font-weight: 600;
						font-size: 28rpx;
						color: #15181A;
					}
					.km{
						font-weight: 400;
						font-size: 24rpx;
						color: rgba(29,35,38,0.6);
					} 
				}
				.site-type{
					font-weight: 400;
					font-size: 24rpx;
					color: rgba(29,35,38,0.6);
					margin-bottom: 36rpx;
				}
				.site-address{
					width: 100%;
					font-weight: 400;
					font-size: 24rpx;
					color: rgba(29,35,38,0.6);
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