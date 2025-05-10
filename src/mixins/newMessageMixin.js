import { eventBus } from "@/utils/eventBus";

export default {
  created() {
    eventBus.$on("new-message-received", this.handleNewMessage);
  },
  destroyed() {
    eventBus.$off("new-message-received", this.handleNewMessage);
  },
  methods: {
    handleNewMessage(data) {
      // 所有混入该 mixin 的页面都要实现此方法
      if (typeof this.onNewMessage === "function") {
        this.onNewMessage(data);
      }
    },
  },
};
