import { useRouter } from "next/router";
import Button from "../tools/Button";
import { useEffect, useState } from "react";
const isActiveTab = (href, path) => {
  path = path.replace(/#.*/, "");
  return path === href;
};

export default function MatchSubheader() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{
    setMounted(true);
  },[])
  if (!mounted || !router.asPath.includes('match')){
    return null;
  }
  const navItems = router.asPath.includes("match")
    ? [
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
        {
          name: "全部集錦",
          href: "/match/playback/",
        },
      ]
    : [
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
      ];

  return (
    <div className="flex items-center gap-x-[10px]  ">
      {navItems.map(({ name, href }) => {
        const isActive = isActiveTab(href, router.asPath);
        return (
          <Button
            key={href}
            href={href}
            isActive={isActive}
            isHover={true}
            text={name}
          />
        );
      })}
    </div>
  );
}
