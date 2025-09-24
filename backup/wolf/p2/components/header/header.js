import { useRouter } from "next/router";
import LazyImage from "../tools/lazy_image";
import { useState, useEffect } from "react";

const mainNavItems = [
  { name: "熱門比賽", href: "/hot/" },
  { name: "全部比賽", href: "/all/" },
  { name: "全部賽事", href: "/saishi/" },
  { name: "全部頻道", href: "/channel/" },
];
const headerNavItems = [
  { name: "首頁", href: "/" },
  {
    name: "足球",
    href: "/zuqiu/",
  },
  {
    name: "籃球",
    href: "/lanqiu/",
  },
  {
    name: "NBA",
    href: "/lanqiu/nba/",
  },
  {
    name: "CBA",
    href: "/lanqiu/cba/",
  },
  { name: "世界杯", href: "/zuqiu/shijiebei/" },
  { name: "英超", href: "/zuqiu/yingchao/" },
  { name: "西甲", href: "/zuqiu/xijia/" },
  { name: "德甲", href: "/zuqiu/dejia/" },
  { name: "意甲", href: "/zuqiu/yijia/" },
  { name: "美職業", href: "/zuqiu/meizhiye/" },
  { name: "沙特聯", href: "/zuqiu/shadilian/" },
  {
    name: "綜合",
    href: "/zonghe/",
  },

  { name: "網球", href: "/wangqiu/" },
  { name: "新聞", href: "/news/" },
  { name: "轉會", href: "/transfer_soccer/" },

  {
    name: "更多",
    // href: "",
    more: [
      { name: "中超", href: "/zuqiu/zhongchao/" },
      { name: "亞冠", href: "/zuqiu/yaguan/" },
      { name: "日職聯", href: "/zuqiu/jls/" },
      { name: "韓K聯", href: "/zuqiu/kls/" },
      {
        name: "電競",
        href: "/zonghe/dianjing/",
      },
      { name: "法甲", href: "/zuqiu/fajia/" },
      { name: "歐冠", href: "/zuqiu/ouguan/" },
      { name: "歐洲杯", href: "/zuqiu/ouzhoubei/" },
      { name: "亞洲杯", href: "/zuqiu/yazhoubei/" },
      {
        name: "UFC",
        href: "/zonghe/ufc/",
      },
    ],
  },
];

const isActiveTab = (href, path) => {
  switch (href) {
    case "/":
      return path === "" || path === "/";
    case "/lanqiu/nba/news/":
    case "/lanqiu/cba/news/":
    case "/zuqiu/zhongchao/news/":
    case "/zuqiu/yingchao/news/":
    case "/zuqiu/xijia/news/":
    case "/zuqiu/dejia/news/":
    case "/zuqiu/yijia/news/":
    case "/zuqiu/fajia/news/":
    case "/video/zuqiu/":
    case "/video/lanqiu/":
      return path.includes(href);
    case "/zuqiu/":
    case "/lanqiu/":
    case "/zonghe/":
      const regex = new RegExp(`^/(match|playback)/${href.replace("/", "")}$`);
      return path.match(regex) || path === href;
    case "/channel/":
      return path === href;
    case "/news/":
      return path.match(/^\/news\/(\d+\/)?$/g);
    case "/transfer_soccer/":
      return path.includes("transfer_soccer") || path.includes("transfer_basketball");
    default:
      if (path.includes("/match/")) {
        const pathSegments = path.split("/").filter(Boolean);
        const matchIndex = pathSegments.indexOf("match");
        if (matchIndex > 0) {
          const middleSegment = pathSegments[matchIndex - 1];
          return href?.includes(middleSegment);
        }
      }
      return path === href;
  }
};

const allNavItems = headerNavItems.reduce((acc, item) => {
  acc.push({ name: item.name, href: item.href });
  if (item.more) {
    acc.push(...item.more);
  }
  return acc;
}, []);

export default function Header({ data, injectComponent, isNavDisplay = true }) {
  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState(null);
  const [smallNav, setSmallNav] = useState("init");
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth) {
      if (screenWidth < 1200) {
        setSmallNav(true);
      } else {
        setSmallNav(false);
      }
    }
  }, [screenWidth]);
  return (
    <>
      <div className="h-[66px] flex items-center max-w-[1200px] mx-auto justify-between">
        <LazyImage src={"/images/header_logo.png"} width={142} height={36} alt={"logo"} className="shrink-0" />
        {isNavDisplay && (
          <div className="flex text-pri-color">
            {mainNavItems.map((item, i) => {
              return (
                <a href={item.href} key={i}>
                  <span className={`${isActiveTab(item.href, router.asPath) ? "font-semibold" : ""} hover:font-semibold`}>{item.name}</span>{" "}
                  {i !== mainNavItems.length - 1 && <span className={`px-[14px]`}>/</span>}
                </a>
              );
            })}
          </div>
        )}
      </div>
      <div className="bg-pri-color rounded-[10px] mx-[60px] max12:mx-[10px] shadow-[2px_2px_10px_0px_rgba(32,58,59,0.20)] flex items-center py-[15px]">
        <div
          className={`flex items-center  flex-wrap min12:flex-nowrap max-w-[1200px] w-full mx-auto max12:justify-center ${
            !isNavDisplay ? "gap-x-[50px]" : "gap-x-[150px]"
          }`}
        >
          {isNavDisplay ? (
            <>
              {!smallNav ? (
                <div className="flex items-center justify-center gap-x-[28px] w-full max12:hidden text-white ">
                  {headerNavItems.flat().map(({ name, href, more }, i) => (
                    <div key={i} className="relative flex items-center group">
                      <a href={href} className="block group">
                        <div className={`text-center text-[16px] leading-normal  ${isActiveTab(href, router.asPath) ? "font-bold" : ""}`}>{name}</div>
                      </a>
                      <div
                        className={`h-[4px] w-full bg-white rounded-t-[10px] absolute bottom-[-15px]  ${
                          isActiveTab(href, router.asPath) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        } transition-opacity duration-200`}
                      ></div>
                      {more && (
                        <>
                          <div className="hidden absolute top-full h-[15px] left-0 w-full group-hover:block"></div>
                          <div className="hidden absolute top-full translate-y-[15px] left-1/2 -translate-x-1/2 z-[1] group-hover:flex flex-wrap flex-col gap-x-[20px] gap-y-[15px] max-h-[200px] rounded-b-[10px]  bg-white w-max px-[20px] py-[15px] text-[#4A4D52] shadow-[2px_2px_10px_0px_rgba(22,42,81,0.20)]">
                            {more.map(({ name, href }, i) => (
                              <a
                                key={i}
                                href={href}
                                className={`block w-[65px] text-center text-[14px] text-pri-color ${
                                  isActiveTab(href, router.asPath) ? "font-semibold" : "hover:font-semibold"
                                }`}
                              >
                                {name}
                              </a>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="hidden w-full overflow-hidden text-white max12:block">
                  <div className="flex overflow-x-auto gap-x-[15px] gap-y-[15px] no-scrollbar whitespace-nowrap pb-2 w-full scrollbar-hide px-4">
                    {allNavItems.map(({ name, href }, i) => (
                      <a key={i} href={href} className="relative flex-shrink-0 block group">
                        <div
                          className={`text-center text-[16px] leading-normal group-hover:font-semibold ${
                            isActiveTab(href, router.asPath) ? "font-semibold" : ""
                          }`}
                        >
                          {name}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            injectComponent
          )}
        </div>
      </div>
    </>
  );
}
