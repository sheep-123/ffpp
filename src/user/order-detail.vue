<template>
	<view>
		<WNavbar title="订单详情" bgColor="#f7f7f7" />
		<div class="status-box">
				<u-icon name="checkmark-circle-fill" size="24"></u-icon>
				<text>已发放</text>
			</div>
			<div class="order-list_item" >
					<div class="top flex-jb">
						<div class="left flex-ac">
							<div class="type flex-center">托管奖金</div>
							<div class="title">非凡泡泡16人制羽毛球单打赛</div>
						</div>
						<div class="right">
							已支付
						</div>
					</div>
					<div class="center">
						<div class="img-box">
							<!-- <image src="" mode=""></image> -->
						</div>
						<div class="info">
							<div class="price">托管奖金 ¥500</div>
							<div class="date">取消日期：2025-12-16 12:59:46</div>
						</div>
					</div>
					<div class="bottom">
						<div class="btns">
							<div class="bt1 flex-center" @click="$utils.toPath.navigateTo('/user/order-detail')" >
								查看
							</div>
						</div>
					</div>
				</div>
			
		</view>
		
			
</template>

<script>
	import WNavbar from '@/components/WNavbar/index.vue'
	export default {
		components: {
			WNavbar,
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #F7F7F7;
	}
</style>