<template>
	<u-sticky :offsetTop="(44+systemInfo.statusBarHeight)+'px'">
		<view class="filter-box">
			<view class="left">
				<view @click="controlModalHandle('1')" :class="activeSelect=='1'?'filter-item active':'filter-item'">
					<text>{{useAddInfo.street?useAddInfo.street:`${useAddInfo.district?useAddInfo.district:'商圈'}`}}</text>
					<view :class="activeSelect=='1'?'triangle-down-999C9D active1':'triangle-down-999C9D'"></view>
				</view>
				<view @click="controlModalHandle('2')" :class="activeSelect=='2'?'filter-item active':'filter-item'">
					<text>{{useSportTypeInfo.name||'类型'}}</text>
					<view :class="activeSelect=='2'?'triangle-down-999C9D active1':'triangle-down-999C9D'"></view>
				</view>
				<view @click="controlModalHandle('3')"
					:class="activeSelect=='3'?'filter-item active no-boder':'filter-item no-boder'">
					<text>{{useSortTypeInfo.name||'默认排序'}}</text>
					<view :class="activeSelect=='3'?'triangle-down-999C9D active1 ':'triangle-down-999C9D'"></view>
				</view>
			</view>
			<view class="right">
				<view class="address-box">
					<u-icon name="map"></u-icon>
					<text>{{userLocation.cityName}}</text>
				</view>
			</view>
		</view>
		<!-- 弹窗 -->
		<view class="modal" v-if="modalShow"
			:style="{height:modalShow?`calc(100vh - ${94+systemInfo.statusBarHeight}px)`:0}">
			<view class="inner" :style="{height:modalShow?'664rpx':0}">
				<view class="chose-box" v-if="modalShow">
					<!-- 商圈选择 -->
					<view class="chose1" v-if="activeSelect=='1'">
						<scroll-view scroll-y="true" class="chose1-left">
							<div :class="item.adcode==adInfo.distCode?'chose1-left-item active':'chose1-left-item'"
								@click="choseDistrictHandle(item)" v-for="(item,index) in districtList" :key="index">
								{{ item.name }}
							</div>
						</scroll-view>
						<scroll-view scroll-y="true" class="chose1-right">
							<u-radio-group v-model="adInfo.streetCode" @change="changeHandle" placement="column">
								<u-radio shape="circle" :label="item.street_name" :name="item.street_code"
									activeColor="red" v-for="(item, index) in streetList" :key="index"
									customStyle="margin-bottom: 20px"></u-radio>
							</u-radio-group>
						</scroll-view>
					</view>
					<!-- 类型选择 -->
					<scroll-view v-if="activeSelect=='2'" scroll-y="true" class="chose2">
						<view class="chose2-box">
							<div :class="choseSportTypeInfo.value==item.label_code?'chose-2-item active':'chose-2-item'" @click="choseSportTypeHandle(item)"
								v-for="(item,index) in sportTypeList" :key="index">
								{{ item.label_name }}
							</div>
						</view>
					</scroll-view>
					<!-- 排序选择 -->
					<scroll-view v-if="activeSelect=='3'" scroll-y="true" class="chose3">
						<u-radio-group v-model="choseSortTypeInfo.value"  @change="sortChangeHandle" placement="column">
							<u-radio shape="circle" :label="item.label" :name="item.value" activeColor="red"
								v-for="(item, index) in sortTypeList" :key="index"
								customStyle="margin-bottom: 20px"></u-radio>
						</u-radio-group>
					</scroll-view>
				</view>
				<view class="inner-bottom" v-if="modalShow">
					<view class="reset" @click="resetHandle">
						<u-icon color="#1D2326" name="reload" size="24"></u-icon>
						<text>重置</text>
					</view>
					<view class="confrimBtn" @click="confrimHandle">
						确定
					</view>
				</view>
			</view>
			<view class="other" @click.stop="modalShow=false;activeSelect=0"></view>
		</view>
	</u-sticky>
</template>

<script>
	export default {
		name: 'filterArea',
		data() {
			return {
				modalShow: false,
				activeSelect: 0,
				sportTypeList: [],
				sortTypeList: [],
				useSortTypeInfo: {
					name: '',
					value: ''
				},
				useSportTypeInfo: {
					name: '',
					value: ''
				},
				choseSortTypeInfo: {
					name: '',
					value: ''
				},
				choseSportTypeInfo: {
					name: '',
					value: ''
				},
				sortType: '',
				userLocation: {
					cityName: '',
					code: ''
				},
				adInfo: {
					district: '',
					distCode: '',
					street: '',
					streetCode: ''
				},
				useAddInfo: {
					district: '',
					distCode: '',
					street: '',
					streetCode: ''
				},
				districtList: [], //区
				streetList: []
			}
		},
		methods: {
			confrimHandle() {
				if(this.activeSelect=='1'){
					Object.assign(this.useAddInfo,this.adInfo);
					
				}
				if(this.activeSelect=='2'){
					Object.assign(this.useSportTypeInfo,this.choseSportTypeInfo);
				}
				if(this.activeSelect=='3'){
					Object.assign(this.useSortTypeInfo,this.choseSortTypeInfo);
				}
				this.emitHandle();
			},
			resetHandle(){
				if(this.activeSelect=='1'){
					Object.keys(this.adInfo).forEach(key=>{
						this.adInfo[key] = ''
					})
					Object.keys(this.useAddInfo).forEach(key=>{
						this.useAddInfo[key] = ''
					})
					
				}
				if(this.activeSelect=='2'){
					Object.keys(this.useSportTypeInfo).forEach(key=>{
						this.useSportTypeInfo[key] = ''
					})
					Object.keys(this.choseSportTypeInfo).forEach(key=>{
						this.choseSportTypeInfo[key] = ''
					})
				}
				if(this.activeSelect=='3'){
					Object.keys(this.useSortTypeInfo).forEach(key=>{
						this.useSortTypeInfo[key] = ''
					})
					Object.keys(this.choseSortTypeInfo).forEach(key=>{
						this.choseSortTypeInfo[key] = ''
					})
				} 
				this.emitHandle();
			},
			emitHandle(){
				this.modalShow = false;
				if(this.activeSelect=='1'){
					this.$emit('choseAdd',this.useAddInfo);
				}
				if(this.activeSelect=='2'){
					this.$emit('choseSport',this.useSportTypeInfo);
				}
				if(this.activeSelect=='3'){
					this.$emit('choseSort',this.useSortTypeInfo);
				}
				this.activeSelect = '0';
				// this.$emit('')
			},
			changeHandle(e) {
				console.log(e, 'x!xx');
				this.adInfo.street = this.streetList.find(i => i.street_code == e)?.street_name
			},
			sortChangeHandle(e){
				console.log(e,'x2xx');
				this.choseSortTypeInfo.name = this.sortTypeList.find(i => i.value == e)?.label
			},
			controlModalHandle(value) {
				if (this.activeSelect == value) {
					this.activeSelect = 0;
					this.modalShow = false;
				} else {
					this.activeSelect = value;
					this.modalShow = true;
				}
			},
			// 获取运动类型
			async getSportTypeList() {
				const res = await this.$requestAll.dynamics.getSportTypeList();
				this.sportTypeList = res.data;
			},
			// 获取筛选排序方式 
			async getSortWayList() {
				const res = await this.$requestAll.dynamics.getDicByName('match_list_sort_type');
				this.sortTypeList = res.data;
			},
			async getLocationInfo() {
				const res = await this.getLocationToAddress();
				const cityCode = this.$utils.getCodeByCity(res)
				this.userLocation.cityName = res;
				this.userLocation.code = cityCode;
				// 根据code换取区县
				this.getAreaByCode()
			},
			async getAreaByCode() {
				const res = await this.$requestAll.dynamics.queryAdCode(this.userLocation.code.slice(0, 4));
				this.districtList = res.data;
			},
			// 选择区县
			async choseDistrictHandle(e) {
				this.adInfo.distCode = e.adcode;
				this.adInfo.district = e.name;
				const res = await this.$requestAll.dynamics.queryStreetCode(e.adcode);
				this.streetList = res.data;

			},
			choseSportTypeHandle(e) {
				this.choseSportTypeInfo.name = e.label_name;
				this.choseSportTypeInfo.value = e.label_code;
				console.log(e,'2222222222222');
			}
		},
		mounted() {
			// 获取运动类型
			this.getSportTypeList();

			// 获取排序方式
			this.getSortWayList();

			// 获取经纬度信息
			this.getLocationInfo();
		}
	}
</script>

<style lang="scss">
	.modal {
		position: absolute;
		width: 100%;
		background-color: rgb(0, 0, 0, .1);
		z-index: 1;
		display: flex;
		flex-direction: column;

		.inner {
			background: #FFFFFF;
			transition: all .1s linear;
			display: flex;
			flex-direction: column;

			.chose-box {
				height: 528rpx;

				.chose1 {
					height: 100%;
					display: flex;

					.chose1-left {
						width: 220rpx;
						height: 100%;
						background: #F5F5F5;

						.active {
							background-color: #fff;
						}

						.chose1-left-item {
							height: 92rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							font-weight: 400;
							font-size: 28rpx;
							color: #1D2326;
						}
					}

					.chose1-right {
						flex: 1;
						height: 100%;
						padding: 30rpx 28rpx;
					}
				}

				.chose2 {
					height: 100%;
					padding: 32rpx;
					box-sizing: border-box;

					.chose2-box {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						.active{
							border:  2rpx solid #EC384A;
							box-sizing: border-box;
						}
						.chose-2-item {
							width: 160rpx;
							height: 64rpx;
							box-sizing: border-box;
							font-weight: 400;
							font-size: 24rpx;
							color: #1D2326;
							// padding: 16rpx 56rpx;
							margin: 0 8rpx 8rpx 0;
							text-align: center;
							line-height: 64rpx;
							background: #F7F7F7;
							border-radius: 8rpx;
						}
					}

				}

				.chose3 {
					height: 100%;
					padding: 32rpx;
					box-sizing: border-box;
				}
			}

			.inner-bottom {
				flex: 1;
				padding: 28rpx 48rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.reset {
					font-weight: 400;
					font-size: 28rpx;
					color: #1D2326;
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.confrimBtn {
					width: 538rpx;
					height: 88rpx;
					background: #15181A;
					border-radius: 44rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-weight: 600;
					font-size: 32rpx;
					color: #FFFFFF;
				}
			}
		}

		.other {
			flex: 1;
		}
	}

	.filter-box {
		// padding: 32rpx 0;
		height: 50px;
		background-color: #fff;
		font-weight: 400;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left {
			display: flex;
			align-items: center;

			.no-boder {
				border: 0 !important;
			}

			.active {
				color: #15181A !important;
			}

			.filter-item {
				padding: 0 32rpx;
				display: flex;
				align-items: center;
				color: #999C9D;
				border-right: 2rpx solid #E6E6E6;

				>text {
					margin-right: 8rpx;
				}

				.active1 {
					border-top: 12rpx solid #15181A !important;
				}

				.triangle-down-999C9D {
					width: 0;
					height: 0;
					border-left: 10rpx solid transparent;
					border-right: 10rpx solid transparent;
					border-top: 12rpx solid #999C9D;
				}
			}
		}

		.right {
			.address-box {
				padding-right: 32rpx;
				display: flex;
				align-items: center;
			}
		}
	}
</style>