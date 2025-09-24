module.exports = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
  env: {
    /*static page time out*/
    ENVIRONMENT: "staging",
    TIME_OUT_S: 60,
    TIME_OUT_M: 120,
    TIME_OUT_L: 160,
    TIME_OUT_XL: 3600,
    DOMAIN_PC: "https://www.51766.com/",
    /*page TDK*/
    DEF_TITLE: "tdk",
    DEF_DESCRIPTION: "tdk",
    DEF_KEYWORD: "tdk",
    /*--------*/
    API_DOMAIN: "https://api-pre.test030.com",
    API_HEADER: {
      "Content-Type": "application/x-www-form-urlencoded",
      SiteId: 64,
      ProductId: 64,
    },
    RECORD_STREAM: "https://datas.24zbw-stg.mysportshub.co/api/analytics/stream_log",
    DEFAULT_ICON: "/images/default_img.png",
    ENCRYPT_KEY: "local",
    MOBILE_DOMAIN: "",
  },
};
