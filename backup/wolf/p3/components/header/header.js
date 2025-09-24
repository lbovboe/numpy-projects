import { useRouter } from "next/router";
import LazyImage from "../tools/lazy_image";
import { useEffect, useState } from "react";

const topNavItems = [
  { name: "首頁", href: "/" },
  { name: "比賽", href: "/all/" },
  { name: "足球", href: "/zuqiu/" },
  { name: "籃球", href: "/lanqiu/" },
  { name: "綜合體育", href: "/zonghe/" },
  { name: "轉會", href: "/transfer_soccer/" },
  { name: "新聞", href: "/news/" },
  { name: "頻道", href: "/channel/" },
  { name: "集錦錄像", href: "/video/" },
  { name: "全部賽事", href: "/saishi/" },
];

const btmNavItems = [
  { name: "熱門", href: "/match/hot/" },
  { name: "英超", href: "/zuqiu/yingchao/" },
  { name: "歐冠", href: "/zuqiu/ouguan/" },
  { name: "亞冠", href: "/zuqiu/yaguan/" },
  { name: "中超", href: "/zuqiu/zhongchao/" },
  { name: "NBA", href: "/lanqiu/nba/" },
  { name: "西甲", href: "/zuqiu/xijia/" },
  { name: "日職聯", href: "/zuqiu/jls/" },
  { name: "沙特聯", href: "/zuqiu/shadilian/" },
  { name: "歐聯杯", href: "/zuqiu/oulian/" },
  { name: "意甲", href: "/zuqiu/yijia/" },
  { name: "UFC", href: "/zonghe/ufc/" },
  { name: "奧運會", href: "/zonghe/aoyunhui/" },
  { name: "全部比賽", href: "/match/all/" },
  { name: "世界杯", href: "/zuqiu/shijiebei/" },
  { name: "歐洲杯", href: "/zuqiu/ouzhoubei/" },
  { name: "亞洲杯", href: "/zuqiu/yazhoubei/" },
  { name: "中甲", href: "/zuqiu/zhongjia/" },
  { name: "CBA", href: "/lanqiu/cba/" },
  { name: "德甲", href: "/zuqiu/dejia/" },
  { name: "韓K聯", href: "/zuqiu/kls/" },
  { name: "美職業", href: "/zuqiu/meizhiye/" },
  { name: "國足", href: "/tzu/896/" },
  { name: "法甲", href: "/zuqiu/fajia/" },
  { name: "網球", href: "/wangqiu/" },
  { name: "電競", href: "/zonghe/dianjing/" },
];

const moreItems = [
  {
    name: "CCTV5",
    href: "/channel/cctv5/",
  },
  {
    name: "CCTV5+",
    href: "/channel/cctv5plus/",
  },
  {
    name: "緯來體育",
    href: "/channel/wlty/",
  },
  {
    name: "廣東體育",
    href: "/channel/gdty/",
  },
  {
    name: "上海體育",
    href: "/channel/shty/",
  },
  {
    name: "JRS直播",
    href: "/channel/jrszhibo/",
  },
];

const isActiveTab = (href, path) => {
  switch (href) {
    case "/":
      return path === "" || path === "/";
    case "/zuqiu/":
    case "/lanqiu/":
    case "/zonghe/":
      const regex = new RegExp(`^/(match|playback)/${href.replace("/","")}$`);
      return path.match(regex) || path === href;
    case "/channel/":
      return path === href;
    case "/match/zonghe/":
      return path === href || path === "/news/zonghe/";
    case "/match/all/":
      return path === href || path === "/all/"
    case "/match/hot/":
      return path === href || path === "/hot/"
    case "/news/":
      return path.match(/^\/news\/(\d+\/)?$/g);
    case "/transfer_soccer/":
       return path === href || path === "/transfer_basketball/";
    default:
      if (path.includes("/match/")) {
        const pathSegments = path.split("/").filter(Boolean);
        const matchIndex = pathSegments.indexOf("match");
        if (matchIndex > 0) {
          const middleSegment = pathSegments[matchIndex - 1];
          return href.includes(middleSegment);
        }
      }
      return path.includes(href);
  }
};

export default function Header({ data, injectComponent, isNavDisplay = true }) {
  const router = useRouter();

  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);
  if (!isMount) {
    return ;
  }

  return (
    <>
      <div className="relative w-full border-b border-solid border-border-color">
        <div className="flex items-center justify-center max-w-[1200px] w-full mx-auto h-[66px]">
          <LazyImage
            src={"/images/headerlogo.png"}
            width={141}
            height={66}
            alt={"logo"}
          />
        </div>
      </div>
      <div className="max-w-[1200px] w-full mx-auto mt-[15px]">
        <div className="flex gap-x-[12px] no-scrollbar overflow-x-auto whitespace-nowrap">
          {topNavItems.map(({ name, href }, i) => (
            <a
              key={i}
              href={href}
              className={`shrink-0 flex justify-center items-center rounded-[10px] w-[74px] min12:w-[109px] h-[38px] text-white ${
                isActiveTab(href, router.asPath) ? "bg-sec-color" : "bg-pri-color hover:bg-sec-color"
              }`}
            >
              <div className={`text-center text-[16px] `}>{name}</div>
            </a>
          ))}
        </div>
        <div className="hidden min12:grid grid-cols-[1fr_1px_105px] rounded-[10px] border border-solid border-border-color mt-[15px] p-[20px] pr-0">
          <div className="flex flex-wrap gap-[12px] whitespace-nowrap">
            {btmNavItems.map(({ name, href }, i) => (
              <a
                key={i}
                href={href}
                className={`shrink-0 block text-center w-[70px] ${
                  isActiveTab(href, router.asPath) ? "text-sec-color" : " hover:text-sec-color"
                }`}
              >
                <div className={`text-center text-[16px] `}>{name}</div>
              </a>
            ))}
          </div>
          <div className="w-[1px] h-full bg-border-color" />
          <div className="group relative flex items-center justify-center px-[20px]">
            <div className="flex justify-center items-center gap-x-[5px] text-[16px] w-full h-full cursor-pointer">
              更多
              <svg
                className="fill-text-color stroke-text-color"
                width="11"
                height="6"
              >
                <use xlinkHref="#icon-arrow-sm" />
              </svg>
            </div>
            <div className="absolute z-[1] top-full hidden group-hover:block pt-[10px] w-full">
              <div className="flex flex-col gap-y-[12px] mt-[11px] p-[15px] rounded-[10px] border border-solid border-border-color bg-white">
                {moreItems.map(({ name, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className={`shrink-0 block text-center w-full ${
                      isActiveTab(href, router.asPath) ? "text-sec-color" : " hover:text-sec-color"
                    }`}
                  >
                    <div className={`text-center text-[16px] `}>{name}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="min12:hidden border border-solid border-border-color mt-[15px] py-[10px]">
          <div className="flex gap-x-[12px] no-scrollbar overflow-x-auto px-[20px] ">
            {[...btmNavItems, ...moreItems].map(({ name, href }, i) => (
              <a
                key={i}
                href={href}
                className={`shrink-0 block text-center w-[70px] ${
                  isActiveTab(href, router.asPath) ? "text-sec-color" : " hover:text-sec-color"
                }`}
              >
                <div className={`text-center text-[16px] `}>{name}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
      {injectComponent}
    </>
  );
}
