import { useRouter } from "next/router";
import LazyImage from "../tools/lazy_image";
import { useEffect, useState } from "react";
const headerNavItems = [
  { name: "首頁", href: "/" },
  {
    name: "足球比賽",
    href: "/zuqiu/",
    more: [
      { name: "英超", href: "/zuqiu/yingchao/" },
      { name: "意甲", href: "/zuqiu/yijia/" },
      { name: "西甲", href: "/zuqiu/xijia/" },
      { name: "法甲", href: "/zuqiu/fajia/" },
      { name: "德甲", href: "/zuqiu/dejia/" },
      { name: "中超", href: "/zuqiu/zhongchao/" },
      { name: "葡超", href: "/zuqiu/puchao/" },
      { name: "芬超", href: "/zuqiu/fenchao/" },
      { name: "歐洲杯", href: "/zuqiu/ouzhoubei/" },
      { name: "歐聯杯", href: "/zuqiu/oulian/" },
      { name: "歐冠", href: "/zuqiu/ouguan/" },
      { name: "亞冠", href: "/zuqiu/yaguan/" },
      { name: "中協杯", href: "/zuqiu/zxb/" },
      { name: "美職業", href: "/zuqiu/meizhiye/" },
      { name: "韓K聯", href: "/zuqiu/kls/" },
      { name: "亞洲杯", href: "/zuqiu/yazhoubei/" },
      { name: "日職聯", href: "/zuqiu/jls/" },
      { name: "沙特聯", href: "/zuqiu/shadilian/" },
      { name: "國足", href: "/tzu/896/" },
    ],
  },

  {
    name: "籃球比賽",
    href: "/lanqiu/",
    more: [
      {
        name: "NBA",
        href: "/lanqiu/nba/",
      },
      {
        name: "CBA",
        href: "/lanqiu/cba/",
      },
    ],
  },
  {
    name: "綜合體育",
    href: "/zonghe/",
    more: [
      {
        name: "UFC",
        href: "/zonghe/ufc/",
      },
      {
        name: "電競",
        href: "/zonghe/dianjing/",
      },
    ],
  },
  { name: "網球", href: "/wangqiu/" },
  { name: "新聞", href: "/news/" },
  { name: "全部比賽", href: "/all/" },
  { name: "全部賽事", href: "/saishi/" },
  { name: "全部頻道", href: "/channel/" },
];

const isActiveTab = (href, path) => {
  switch (href) {
    case "/":
      return path === "" || path === "/";
    case "/zuqiu/":
    case "/lanqiu/":
    case "/zonghe/":
    case "/channel/":
      return path === href;
    case "/match/zonghe/":
      return path === href || path === "/news/zonghe/";
    case "/news/":
      return path.match(/^\/news\/(\d+\/)?$/g);
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

export default function Header({
  data,
  injectComponent,
  isNavDisplay = true,
}) {
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

  return (
    <>
      <div className="relative w-full border-b border-solid border-border-color">
        <div className="flex items-center justify-center max-w-[1200px] w-full mx-auto h-[60px]">
          <LazyImage
            src={"/images/headerlogo.png"}
            width={141}
            height={36}
            alt={"logo"}
          />
        </div>
        <div
          className={`${
            isNavDisplay
              ? "grid grid-cols-[140px_1fr] gap-x-[50px] items-center"
              : "flex items-center justify-center"
          }  max-w-[1200px] w-full mx-auto`}
        >
          {isNavDisplay && (
            <>
              {/* Existing navigation - hide on small screens */}
              {!smallNav ? (
                <div className="pl-[10%] flex justify-between w-full max12:hidden">
                  {headerNavItems.map(({ name, href, more }, i) => (
                    <div key={i} className={`relative group`}>
                      <a
                        href={href}
                        className="flex items-center gap-x-[10px] py-[25px]"
                      >
                        <div
                          className={`text-center text-[16px] ${
                            isActiveTab(href, router.asPath)
                              ? "text-pri-color"
                              : "group-hover:text-ter-color"
                          }`}
                        >
                          {name}
                        </div>
                        {more && (
                          <svg
                            width={10}
                            height={10}
                            className={`rotate-[-90deg] ${
                              isActiveTab(href, router.asPath)
                                ? "fill-pri-color stroke-pri-color"
                                : "fill-white stroke-white group-hover:fill-ter-color group-hover:stroke-ter-color"
                            }`}
                          >
                            <use href="#icon-header-arrow"></use>
                          </svg>
                        )}
                      </a>
                      {more && (
                        <div className="hidden absolute top-[74px] left-1/2 -translate-x-1/2 z-[1] group-hover:flex flex-wrap flex-col gap-[15px] max-h-[305px] rounded-b-[5px] border-x border-b border-solid border-border-color bg-white w-max px-[20px] py-[15px] text-sec-color">
                          {more.map(({ name, href }, i) => (
                            <a
                              key={i}
                              href={href}
                              className={`block w-[70px] text-center text-[14px] ${
                                isActiveTab(href, router.asPath)
                                  ? "text-pri-color"
                                  : "hover:text-ter-color"
                              }`}
                            >
                              {name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="hidden w-full overflow-hidden max12:block">
                  <div className="relative flex gap-x-[30px] overflow-auto whitespace-nowrap w-full">
                    {headerNavItems
                      .reduce((acc, curr) => {
                        acc.push(curr);
                        if (curr.more) {
                          acc = [...acc, ...curr.more];
                        }
                        return acc;
                      }, [])
                      .map(({ name, href, more }, i) => (
                        <div key={i}>
                          <a
                            key={name}
                            href={href}
                            className="flex-shrink-0 block group"
                          >
                            <div
                              className={`text-center text-[16px] leading-normal ${
                                isActiveTab(href, router.asPath)
                                  ? "text-pri-color"
                                  : "hover:text-ter-color"
                              }`}
                            >
                              {name}
                            </div>
                          </a>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {injectComponent}
    </>
  );
}
