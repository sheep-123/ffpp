const albumTips = "我们访问您的存储权限，为您提供使用与保存图片、视频、文件等服务...";
const audioTips = "我们访问您的麦克风权限，为您提供发送语音、视频等服务...";
const locationTips = "我们访问您的位置信息，根据您的位置推荐最近招工找活等服务...";

function getTips(permissionName) {
	if (permissionName == "scope.writePhotosAlbum" || permissionName == "uni.saveVideoToPhotosAlbum") {
		return albumTips;
	} else if (permissionName == "scope.record") {
		return audioTips;
	} else if (permissionName == "scope.userLocation") {
		return locationTips;
	}
}

function getPermissionName(permissionName) {
	if (permissionName == "scope.writePhotosAlbum" || permissionName == "uni.saveVideoToPhotosAlbum") {
		return "存储";
	} else if (permissionName == "scope.record") {
		return "麦克风";
	} else if (permissionName == "scope.userLocation") {
		return "位置";
	}
}

//授权说明弹窗
function showPermissionTips(content, callback) {
	uni.showModal({
		title: "授权说明",
		content: content,
		confirmText: "确定",
		showCancel: false,
		success: function(res) {
			if (res.confirm) {
				callback && callback();
			}
		},
	});
}

//小程序判断授权
export const judgePermission = (permissionName, agreeCallback, refuseCallback)=>{
	if (permissionName == "scope.userLocation") {
		let systemInfo = uni.getSystemInfoSync();
		if (!systemInfo.locationEnabled) {
			//如果是定位权限并且系统设置未开启定位
			uni.showModal({
				title: "提示",
				content: "系统设置未开启GPS服务,请开启!",
			});
			refuseCallback && refuseCallback();
			return;
		}
	}
	uni.getSetting({
		success(res) {
			if (res.authSetting[permissionName] == undefined) {
				//1、首次授权
				// let tips = getTips(permissionName);
				// showPermissionTips(tips,
				// 	() => {
				// 		agreeCallback && agreeCallback();
				// 	})
				agreeCallback()
			} else if (res.authSetting[permissionName] == true) {
				//2、之前同意了授权
				agreeCallback && agreeCallback();
			} else if (res.authSetting[permissionName] != undefined &&
				res.authSetting[permissionName] != true) {
				//3、之前拒绝了权限
				uni.showModal({
					title: '提示',
					content: '您之前拒绝了' + getPermissionName(permissionName) + '权限，是否打开设置重新授权？',
					success: function(res) {
						if (res.confirm) {
							//打开权限设置页
							uni.openSetting({
								success: function(res) {
									if (res.authSetting[permissionName] == true) {
										//用户在设置页打开了权限
										this.showToast('授权成功')
										agreeCallback && agreeCallback();
									} else {
										//用户在设置页未打开权限
										this.showToast('授权失败')
										refuseCallback && refuseCallback();
									}
								}
							})
						} else if (res.cancel) {
							refuseCallback && refuseCallback();
						}
					}
				});
			}
		},
	})
}

/*使用例子:
//导入
import { judgePermission } from "@/utils/PermissionManager.js"

第一个参数:需要获取权限名(例:scope.userLocation);
第二个获取数据方法(例:uni.getLocation());
第三个传空就行

judgePermission("scope.userLocation", () => {
	uni.getLocation({
		type: 'gcj02',
		success:(res)=>{
			console.log(res)
		}
	});
},()=>{});
*/