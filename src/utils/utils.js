import citys from "@/utils/city.json";
const toast = (title, icon = "none", duration = 1500) => {
  uni.showToast({
    icon,
    title,
    duration,
  });
};

const toPath = {
  navigateTo(url) {
    if (!url) {
      return;
    }
    uni.navigateTo({
      url,
    });
  },
  reLaunch(url) {
    if (!url) {
      return;
    }
    uni.reLaunch({
      url,
    });
  },
  redirectTo(url) {
    if (!url) {
      return;
    }
    uni.redirectTo({
      url,
    });
  },
  switchTab(url) {
    if (!url) {
      return;
    }
    uni.switchTab({
      url,
    });
  },
  back(showTabar = false) {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      uni.navigateBack({
        delta: 1,
      });
      // showTabar && uni.showTabBar();
    } else {
      uni.reLaunch({
        url: "/pages/index/index",
      });
      // showTabar && uni.showTabBar();
    }
  },
};

const uploadImg = (requestUrl, filePath, params) => {
  uni.showLoading({
    title: "上传中...",
  });
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: requestUrl,
      filePath,
      name: "file",
      fileType: "image",
      formData: params,
      header: {
        Authorization: "Bearer " + uni.getStorageSync("token"), // 示例：添加认证信息
      },
      success: (res) => {
        resolve(JSON.parse(res.data).data);
      },
      fail: (err) => {
        reject(err);
      },
      complete() {
        uni.hideLoading();
      },
    });
  });
};

function findCityCode(data, cityName) {
  for (const item of data) {
    // 检查当前节点名称是否匹配
    if (item.Name === cityName) {
      return item.Code;
    }

    // 递归检查子节点
    if (item.ChildList && item.ChildList.length > 0) {
      const code = findCityCode(item.ChildList, cityName);
      if (code) return code;
    }
  }
  return null; // 未找到时返回 null
}
const getCodeByCity = (code) => {
  const provinceList = uni.$u.deepClone(citys.options);
  return findCityCode(provinceList, code);
};

/**
 * @description 去重方法
 * @param {Array} arr 去重数组
 * @param {String} key 去重依据
 * @returns 去重后的数组
 *
 */
function uniqueById(arr, key = "id") {
  const map = new Map();
  arr.forEach((item) => {
    if (!map.has(item[key])) {
      map.set(item[key], item);
    }
  });
  return Array.from(map.values());
}

export default {
  uniqueById,
  toast,
  toPath,
  uploadImg,
  getCodeByCity,
};
