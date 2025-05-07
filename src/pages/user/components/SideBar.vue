<template>
    <u-popup mode="left" :show="visible" @close="handleClose" custom-class="sidebar-popup">
        <div class="sidebar-content">
            <div class="cell-box">
                
            </div>
        </div>
    </u-popup>
</template>

<script>
export default {
    name: "SideBar",
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
    },
    emits: ["update:visible"],
    methods: {
        handleClose() {
            this.$emit("update:visible", false);
        },
    },
};
</script>

<style scoped lang="scss">
.sidebar-content {
    width: 616rpx;
    height: 100vh;
    background-color: #F7F7F7;
    padding: 120rpx 32rpx;
    box-sizing: border-box;
    .cell-box{
        background: #FFFFFF;
        border-radius: 24rpx;
    }
}
</style>