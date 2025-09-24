import { useRouter } from "next/router";
import LazyImage from "../tools/lazy_image";

const isActiveTab = (href, path) => {
  path = path.replace(/#.*/, "");
  if (href.includes("news")) {
    return path.includes("news");
  }
  return path === href;
};

export default function TopicNav({ baseUrl, matchType, topic }) {
  const router = useRouter();
  const navItems = [
    { name: "首頁", href: `${baseUrl}/`, icon: "#icon-main" },
    { name: "比賽", href: `${baseUrl}/match/`, icon: "#icon-match" },
    { name: "集錦", href: `${baseUrl}/playback/`, icon: "#icon-video" },
    { name: "新聞", href: `${baseUrl}/news/`, icon: "#icon-news" },
  ];
  return (
    <>
      <div className="flex items-center gap-x-[30px] rounded-[10px] bg-bg-color justify-center py-[15px]">
        {navItems.map(({ name, href, icon }, index) => {
          const isActive = isActiveTab(href, router.asPath);
          return (
            <a
              href={href}
              key={index}
              className={`group flex gap-x-[5px] ${isActive ? "text-pri-color" : " hover:text-sec-color "}`}
            >
              <svg
                className={`group-hover:fill-pri-color ${isActive ? "fill-pri-color" : "  "}`}
                width={22}
                height={22}
              >
                <use href={icon}></use>
              </svg>
              <p className="text-[16px] leading-[22px]">{name}</p>
            </a>
          );
        })}
      </div>
    </>
  );
}
