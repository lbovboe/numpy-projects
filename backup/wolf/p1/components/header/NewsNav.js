import { useRouter } from "next/router";

const topics = [
  { name: "全部", href: "/news/" },
  { name: "足球", href: "/news/zuqiu/" },
  { name: "籃球", href: "/news/lanqiu/" },
  { name: "綜合", href: "/news/zonghe/" },
  { name: "網球", href: "/news/wangqiu/" },
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
    <div className="flex gap-x-[10px] mt-[15px]">
      {topics.map((ele, i) => (
        <div key={i} className="">
          <a
            href={ele.href}
            className={`block rounded-[10px] px-[10px] py-[5px] border border-solid ${
              isActiveTab(ele.href, router.asPath)
                ? "bg-pri-color text-white border-transparent"
                : "hover:bg-sec-color hover:text-white border-border-color hover:border-transparent"
            }`}
          >
            {ele.name}
          </a>
        </div>
      ))}
    </div>
  );
}
