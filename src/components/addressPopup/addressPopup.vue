<template>
	<u-popup :show="show" :round="10" :safeAreaInsetBottom='safe' @close="close">
		<!-- <view class="safe-bottom"> -->
		<view >
			<view class="flex flex-jb title">
				<view @click="close" style="color: #8D8A8E;">取消</view>
				<view @click="handelList" style="color: #3183FE;">确认</view>
			</view>
			<view class="address flex">
				<view class="address_item province">
					<scroll-view scroll-y="true" scroll-x="true" class="scrolls">
						<block v-for="(item,i) in provinceList" :key="i">
							<view class="scrolls_ele" :style="index1==i?'background-color:#fff':''"
								@click="()=>handlerSelect('p',item,i)">
								<text :class="index1==i?'blue':'grey'">{{item.Name}}</text>
							</view>
						</block>
					</scroll-view>
				</view>
				<view class="address_item city">
					<scroll-view scroll-y="true" scroll-x="true" class="scrolls">
						<view class="scrolls_ele" v-for="(item,i) in cityList" @click="()=>handlerSelect('c',item,i)"
							:key="i">
							<text :class="index2==i?'blue':'grey'">{{item.Name}}</text>
						</view>
					</scroll-view>
				</view>
				<view class="address_item area">
					<scroll-view scroll-y="true" scroll-x="true" class="scrolls">
						<view class="scrolls_ele" v-for="(item,i) in areaList" @click="()=>handlerSelect('a',item,i)"
							:key="i">
							<text :class="index3==i?'blue':'grey'">{{item.Name}}</text>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import citys from "@/utils/city.json"
	export default {
		name: "addressPopup",
		props: {
			show: {
				typeof: Boolean,
				default: false
			},
			type: {
				typeof: String,
				default: ''
			},
			safe:{
				typeof: Boolean,
				default: true
			}
		},
		data() {
			return {
				provinceList: [],
				cityList: [],
				areaList: [],
				index1: null,
				index2: null,
				index3: null,
				address: {
					province: '',
					city: '',
					area: ''
				},
			};
		},
		mounted() {
			// this.provinceList = JSON.parse(JSON.stringify(citys.options));
			this.provinceList = uni.$u.deepClone(citys.options)
			this.type == 'resume' || this.provinceList.unshift({Name: "全国"})
		},
		beforeDestroy() {
			this.provinceList = [];
		},
		methods: {
			close() {
				this.$emit('update:show', false);
			},
			handlerSelect(type, data, i) {
				switch (type) {
					case 'p':
						this.index1 = i;
						this.index2 = null;
						this.index3 = null;
						if (data.ChildList) {
							this.cityList = uni.$u.deepClone(data.ChildList);
							if (this.cityList.length > 1) {
								this.type == 'resume' || this.cityList.unshift({
									Name: "全省"
								})
							}
						} else {
							this.cityList = []
						}
						this.areaList = [];
						this.address.province = ((data.Name != '全国') ? (data.Name) : '全国');
						this.address.city = '';
						this.address.area = '';
						break;
					case 'c':
						this.index2 = i;
						this.index3 = null;
						if (data.ChildList) {
							this.areaList = uni.$u.deepClone(data.ChildList);
							if (this.areaList.length > 1) {
								this.type == 'resume' || this.areaList.unshift({
									Name: "全市"
								})
							}
						} else {
							this.areaList = []
						}
						this.address.city = ((data.Name != '全省') ? (data.Name) : '');
						this.address.area = '';
						break;
					case 'a':
						this.index3 = i;
						this.address.area = ((data.Name != '全市') ? (data.Name) : '');
						break;
					default:
						break;
				}
				console.log(this.address);
			},
			handelList() {
				if (this.type == 'resume' && !this.address.area) {
					this.showToast('请选择完整地址');
					return
				}
				this.$emit('handelAddress', this.address);
				this.close();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		padding: 28rpx;
	}

	.address {
		width: 750rpx;

		&_item {
			padding: 18rpx 0;
			width: 250rpx;
			overflow: hidden;
			font-size: 30rpx;
			text-align: center;
		}

		.province {
			background-color: #F6F7FB;
		}

		.city {
			background: #fff;
			z-index: 2;
		}

		.area {
			background: #fff;
			z-index: 3;
		}

		.scrolls {
			width: 250rpx;
			white-space: nowrap;
			height: 50vh;

			&_ele {
				padding: 38rpx 0;
			}
		}

		.blue {
			color: #EC384A;
		}

		.grey {
			color: #222;
		}
	}
</style>