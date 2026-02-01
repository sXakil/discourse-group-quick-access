import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "group-quick-access-colors",

  initialize() {
    withPluginApi((api) => {
      api.onPageChange(() => {
        const currentPath = window.location.pathname;
        const container = document.getElementById("group-quick-access");
        if (currentPath === "" || currentPath === "/latest") {
          container?.classList.add("active");
        }
      });
    });
  },
};
