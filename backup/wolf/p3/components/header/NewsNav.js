import { useRouter } from "next/router";

const topics = [
  { name: "全部", href: "/news/", icon: "news" },
  { name: "足球", href: "/news/zuqiu/", icon: "zuqiu" },
  { name: "籃球", href: "/news/lanqiu/", icon: "lanqiu" },
  { name: "綜合", href: "/news/zonghe/", icon: "zonghe" },
  { name: "網球", href: "/news/wangqiu/", icon: "wangqiu" },
];

const isActiveTab = (href, path) => {
  const regex = /\/news\/(?:\d+\/)?$/;
  switch (href) {
    case "/news/zuqiu/":
      return path.includes("zuqiu");
    case "/news/lanqiu/":
      return path.includes("lanqiu");
    case "/news/zonghe/":
      return path.includes("zonghe");
    case "/news/wangqiu/":
      return path.includes("wangqiu");
    default:
      return regex.test(path);
  }
};

export default function NewsNav() {
  const router = useRouter();

  return (
    <div className="flex gap-x-[15px]">
      {topics.map((ele, i) => (
        <div key={i} className="">
          <a
            href={ele.href}
            className={`group flex items-center gap-x-[5px] ${
              isActiveTab(ele.href, router.asPath)
                ? "text-sec-color"
                : "text-pri-color hover:text-sec-color"
            }`}
          >
            <span>{ele.name}</span>
            <svg
              className={`${
                isActiveTab(ele.href, router.asPath)
                  ? "fill-sec-color"
                  : "fill-pri-color group-hover:fill-sec-color"
              } `}
              width="19"
              height="18"
            >
              <use xlinkHref={`#icon-${ele.icon}`} />
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
}
