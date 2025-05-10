import { eventBus } from "@/utils/eventBus";

let socket = null;
let isConnecting = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_INTERVAL = 3000;

function initWebSocket(url) {
  if (
    socket &&
    (socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING)
  ) {
    console.log("WebSocket 已连接或正在连接中");
    return;
  }

  if (isConnecting) return;

  isConnecting = true;

  try {
    socket = uni.connectSocket({ url });
    uni.onSocketMessage((res) => {
      try {
        const data = JSON.parse(res.data);
        // ✅ 触发全局事件，让页面自己决定是否刷新
        eventBus.$emit("new-message-received", data);
      } catch (e) {
        console.error("解析失败:", e);
      }
    });
  } catch (error) {
    console.error("初始化 WebSocket 失败:", error);
    isConnecting = false;
    handleReconnect(url);
  }
}

function handleReconnect(url) {
  if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
    setTimeout(() => {
      console.log(`尝试重连 WebSocket... 第 ${reconnectAttempts + 1} 次`);
      reconnectAttempts++;
      initWebSocket(url);
    }, RECONNECT_INTERVAL);
  } else {
    console.warn("已达到最大重连次数，停止自动重连");
  }
}

function sendWebSocketMessage(message) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send({ data: JSON.stringify(message) });
  } else {
    console.warn("WebSocket 未连接，无法发送消息:", message);
  }
}

export default {
  initWebSocket,
  sendWebSocketMessage,
};
