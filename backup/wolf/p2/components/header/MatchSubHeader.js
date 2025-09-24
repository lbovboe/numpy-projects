import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const isActiveTab = (href, path) => {
  path = path.replace(/#.*/, "");
  return path.includes(href);
};

export default function MatchSubheader() {
  const router = useRouter();
  const [navItems, setNavItems] = useState([
    {
      name: "熱門比賽",
      href: "/hot/",
    },
    {
      name: "全部比赛",
      href: "/all/",
    },
    {
      name: "足球比赛",
      href: "/zuqiu/",
    },
    {
      name: "籃球比賽",
      href: "/lanqiu/",
    },
    {
      name: "綜合比賽",
      href: "/zonghe/",
    },
  ]);

  useEffect(() => {
    if (router.asPath.includes("match")) {
      setNavItems([
        {
          name: "熱門比賽",
          href: "/match/hot/",
        },
        {
          name: "全部比赛",
          href: "/match/all/",
        },
        {
          name: "足球比赛",
          href: "/match/zuqiu/",
        },
        {
          name: "籃球比賽",
          href: "/match/lanqiu/",
        },
        {
          name: "綜合比賽",
          href: "/match/zonghe/",
        },
      ]);
    }
  }, [router.asPath]);

  return (
    <div className="flex justify-center bg-pri-color rounded-[10px] px-[6px] py-[5px]">
      {navItems.map(({ name, href }, i) => {
        const isActive = isActiveTab(href, router.asPath);
        return (
          <a
            href={href}
            key={i}
            className={`flex items-center justify-center rounded-[10px] py-[4px] px-[12px] ${
              isActive
                ? "bg-bg-color text-pri-color"
                : "text-white hover:bg-bg-color hover:text-pri-color"
            }`}
          >
            {name}
          </a>
        );
      })}
    </div>
  );
}
