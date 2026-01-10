import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "group-quick-access-colors",

  initialize() {
    withPluginApi((api) => {
      api.onPageChange(() => {
        const links = document.querySelectorAll(".group-filter-dot");
        const currentPath = window.location.pathname;
        const queryString = window.location.search;

        links.forEach((link) => {
          const groupName = link.getAttribute("data-group-name");
          // const color = link.getAttribute("data-group-color");

          // Add selected class if current path matches group
          if (
            queryString.includes(encodeURIComponent(`group:${groupName}`)) ||
            currentPath.includes(`/g/${groupName}`)
          ) {
            link.classList.add("selected");
          } else {
            link.classList.remove("selected");
          }
        });
      });
    });
  },
};
