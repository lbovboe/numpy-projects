import { useRouter } from "next/router";

const topics = [
  { name: "全部", href: "/video/" },
  { name: "足球", href: "/video/zuqiu/" },
  { name: "籃球", href: "/video/lanqiu/" },
    { name: "綜合", href: "/video/zonghe/" },
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
