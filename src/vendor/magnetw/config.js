// magnetW/src/renderer/plugins/config.js

const baseURL = "https://magnetw.app";

const config = {
  baseURL: baseURL,
  docURL: `${baseURL}/guide`,
  icons: {
    baseUrl: `${baseURL}/favicon`,
    extension: "ico"
  },
  searchPlaceholder: [
    "火影忍者",
    "钢铁侠",
    "美国队长",
    "犬夜叉",
    "七龙珠",
    "奥特曼",
    "英雄联盟"
  ],
  proxyDocURL: `${baseURL}/guide/proxy.html`,
  guide: {
    content: []
  },
  menu: [],

  ruleUrl: `${baseURL}/rule.json`
};

export default config;
