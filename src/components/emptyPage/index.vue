<template>
    <view class="empty-page">
        <image :src="imageSrc" mode="" />
        <div class="text">{{ text  }}</div>
        <div @click="clickHandle" v-if="btnText" class="btn">{{ btnText }}</div>
    </view>
</template>

<script>
export default {
    name: 'EmptyPage',
    props: {
        // Define your props here
        imageSrc: {
            type: String,
            default: '/static/templateImage/empty/empty.png'
        },
        text:{
            type: String,
            default: ''
        },
        btnText:{
            type: String,
            default: ''
        },
    },
    data() {
        return {
            // Add your data properties here
        };
    },
    methods: {
        // Add your methods here
        clickHandle() {
            this.$emit('clickHandle');
        }
    },
    mounted() {
        // Add your mounted lifecycle hook logic here
    }
};
</script>


<style lang="scss">
.empty-page {
    width: 100%;
    height: 450rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    >image {
        width: 248rpx;
        height: 210rpx;
        margin-bottom: 16rpx;
    }

    .text {
        font-size: 28rpx;
        color: rgba(29, 35, 38, 0.6);
        margin-bottom: 16rpx;

    }

    .btn {
        width: 156rpx;
        height: 64rpx;
        background: #FFFFFF;
        border-radius: 56rpx 56rpx 56rpx 56rpx;
        border: 2rpx solid #F0F0F0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-weight: 400;
        font-size: 28rpx;
        color: #1D2326;
    }
}
</style>
