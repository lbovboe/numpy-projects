import { useRouter } from "next/router";

const topics = [
  { name: "全部", href: "/video/", icon: "video" },
  { name: "足球", href: "/video/zuqiu/", icon: "zuqiu" },
  { name: "籃球", href: "/video/lanqiu/", icon: "lanqiu" },
  { name: "綜合", href: "/video/zonghe/", icon: "zonghe" },
];

const isActiveTab = (href, path) => {
  const regex = /\/video\/(?:\d+\/)?$/;
  switch (href) {
    case "/video/zuqiu/":
      return path.includes("zuqiu");
    case "/video/lanqiu/":
      return path.includes("lanqiu");
    case "/video/zonghe/":
      return path.includes("zonghe");
    default:
      return regex.test(path);
  }
};

export default function VideoNav() {
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
