<template>
	<u-sticky :offsetTop="(44+systemInfo.statusBarHeight)+'px'">
		<view class="filter-box">
			<view class="left">
				<view @click="controlModalHandle('1')" :class="activeSelect=='1'?'filter-item active':'filter-item'">
					<text>商圈</text>
					<view :class="activeSelect=='1'?'triangle-down-999C9D active1':'triangle-down-999C9D'"></view>
				</view>
				<view @click="controlModalHandle('2')" :class="activeSelect=='2'?'filter-item active':'filter-item'">
					<text>类型</text>
					<view :class="activeSelect=='2'?'triangle-down-999C9D active1':'triangle-down-999C9D'"></view>
				</view>
				<view @click="controlModalHandle('3')"
					:class="activeSelect=='3'?'filter-item active no-boder':'filter-item no-boder'">
					<text>默认排序</text>
					<view :class="activeSelect=='3'?'triangle-down-999C9D active1 ':'triangle-down-999C9D'"></view>
				</view>
			</view> 
			<view class="right">
				<view class="address-box"></view>
			</view>
		</view>
		<!-- 弹窗 -->
		<view class="modal" v-if="modalShow" :style="{height:modalShow?`calc(100vh - ${94+systemInfo.statusBarHeight}px)`:0}">
			<view class="inner" :style="{height:modalShow?'664rpx':0}">
				<view class="chose-box" v-if="modalShow">
					<!-- 商圈选择 -->
					<view class="chose1" v-if="activeSelect=='1'">
						<scroll-view scroll-y="true" class="chose1-left">
							<div class="chose1-left-item" v-for="(item,index) in sportTypeList" :key="index" >
								{{ item.label_name }}
							</div>
						</scroll-view>
						<scroll-view scroll-y="true" class="chose1-right">
							<u-radio-group v-model="sortType" placement="column">
								<u-radio shape="circle" :label="item.label" :name="item.value" activeColor="red"
									v-for="(item, index) in sortTypeList" :key="index" customStyle="margin-bottom: 20px"></u-radio>
							</u-radio-group>
						</scroll-view>
					</view>
					<!-- 类型选择 -->
					<scroll-view v-if="activeSelect=='2'" scroll-y="true" class="chose2">
						<view class="chose2-box">
							<div class="chose-2-item" v-for="(item,index) in sportTypeList" :key="index" >
								{{ item.label_name }}
							</div>
						</view>
					</scroll-view>
					<!-- 排序选择 -->
					<scroll-view v-if="activeSelect=='3'" scroll-y="true" class="chose3">
						<u-radio-group v-model="sortType" placement="column">
							<u-radio shape="circle" :label="item.label" :name="item.value" activeColor="red"
								v-for="(item, index) in sortTypeList" :key="index" customStyle="margin-bottom: 20px"></u-radio>
						</u-radio-group>
					</scroll-view>
				</view>
				<view class="inner-bottom" v-if="modalShow">
					<view class="reset">
						<u-icon color="#1D2326" name="reload" size="24"></u-icon>
						<text>重置</text>
					</view>
					<view class="confrimBtn">
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
				sortType: ''
			}
		},
		methods: {
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
			}
		},
		mounted() {
			this.getSportTypeList();
			this.getSortWayList();

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
				.chose1{
					height: 100%;
					display: flex;
					.chose1-left{
						width: 220rpx;
						height: 100%;
						background: #F5F5F5;
						.chose1-left-item{
							height: 92rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							font-weight: 400;
							font-size: 28rpx;
							color: #1D2326;
						}
					}
					.chose1-right{
						flex:1;
						height: 100%;
						padding: 30rpx 28rpx;
					}
				}
				.chose2{
					height: 100%;
					padding: 32rpx;
					box-sizing: border-box;
					
					.chose2-box{
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						.chose-2-item{
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
				.chose3{
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
			}
		}
	}
</style>