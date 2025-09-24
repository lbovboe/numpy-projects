import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const isActiveTab = (href, path) => {
  path = path.replace(/#.*/, "");
  return path.includes(href);
};

export default function MatchSubheader() {
  const router = useRouter();
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);
  }, []);
  if (!isMount) {
    return;
  }
  const navItems = router.asPath.includes("match")
    ? [
        {
          name: "熱門比賽",
          href: "/match/hot/",
          icon: "hot",
        },
        {
          name: "全部比赛",
          href: "/match/all/",
          icon: "all",
        },
        {
          name: "足球比赛",
          href: "/match/zuqiu/",
          icon: "zuqiu",
        },
        {
          name: "籃球比賽",
          href: "/match/lanqiu/",
          icon: "lanqiu",
        },
        {
          name: "綜合比賽",
          href: "/match/zonghe/",
          icon: "zonghe",
        },
      ]
    : [
        {
          name: "熱門比賽",
          href: "/hot/",
          icon: "hot",
        },
        {
          name: "全部比赛",
          href: "/all/",
          icon: "all",
        },
        {
          name: "足球比赛",
          href: "/zuqiu/",
          icon: "zuqiu",
        },
        {
          name: "籃球比賽",
          href: "/lanqiu/",
          icon: "lanqiu",
        },
        {
          name: "綜合比賽",
          href: "/zonghe/",
          icon: "zonghe",
        },
      ];

  return (
    <div className="w-full flex justify-center items-center gap-x-[30px] rounded-[10px] border border-solid border-border-color h-[46px]">
      {navItems.map(({ name, href, icon }, i) => {
        const isActive = isActiveTab(href, router.asPath);
        return (
          <a
            href={href}
            key={i}
            className={`group flex items-center gap-x-[5px] ${
              isActive ? "text-sec-color" : "text-pri-color hover:text-sec-color"
            }`}
          >
            <span>{name}</span>
            <svg
              className={`${isActive ? "fill-sec-color" : "fill-pri-color group-hover:fill-sec-color"} `}
              width="19"
              height="19"
            >
              <use xlinkHref={`#icon-${icon}`} />
            </svg>
          </a>
        );
      })}
    </div>
  );
}
