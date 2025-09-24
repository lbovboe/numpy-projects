export default function NewsVideoNav({ topic = "all", activeIndex = 0, type = "news" }) {
  const subMenu = [
    {
      name: "全部新聞",
      href: "/news/",
    },
    {
      name: "全部集錦",
      href: "/video/",
    },
  ];
  const newsNav = [
    {
      name: "全部",
      topic: "all",
      src: "/images/all.png",
      href: "/news/",
    },
    {
      name: "足球",
      topic: "zuqiu",
      src: "/images/icon_zuqiu.png",
      href: "/news/zuqiu/",
    },
    {
      name: "篮球",
      topic: "lanqiu",
      src: "/images/icon_lanqiu.png",
      href: "/news/lanqiu/",
    },
    {
      name: "综合",
      topic: "zonghe",
      src: "/images/icon_zonghe.png",
      href: "/news/zonghe/",
    },
  ];
  const videoNav = [
    {
      name: "全部",
      topic: "all",
      src: "/images/all.png",
      href: "/video/",
    },
    {
      name: "足球",
      topic: "zuqiu",
      src: "/images/icon_zuqiu.png",
      href: "/video/zuqiu/",
    },
    {
      name: "篮球",
      topic: "lanqiu",
      src: "/images/icon_lanqiu.png",
      href: "/video/lanqiu/",
    },
  ];
  const currentNav = type === "video" ? videoNav : newsNav;

  return (
    <div className="flex items-center justify-between">
      <div className="flex justify-center bg-pri-color rounded-[10px] px-[6px] py-[5px]">
        {subMenu.map((ele, i) => (
          <a
            href={ele.href}
            key={i}
            className={`flex items-center justify-center rounded-[10px] py-[4px] px-[12px] ${
              activeIndex === i ? "bg-bg-color text-pri-color" : "text-white hover:bg-bg-color hover:text-pri-color"
            }`}
          >
            {ele.name}
          </a>
        ))}
      </div>
      <div className="flex text-pri-color">
        {currentNav.map((item, i) => {
          return (
            <a
              href={item.href}
              key={i}
            >
              <span className={`${topic === item.topic ? "font-semibold" : ""} hover:font-semibold`}>{item.name}</span>{" "}
              {i !== currentNav.length - 1 && <span className={`px-[14px]`}>/</span>}
            </a>
          );
        })}
      </div>
    </div>
  );
}
