import { useRouter } from "next/router";
import Frame from "../tools/Frame";

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

export default function SideNav() {
  const router = useRouter();
  const navItems = [
    { name: "熱門", href: "/match/hot/", items: [] },
    {
      name: "足球",
      href: "",
      items: [
        ["足球比賽", "/zuqiu/"],
        ["英超", "/zuqiu/yingchao/"],
        ["西甲", "/zuqiu/xijia/"],
        ["德甲", "/zuqiu/dejia/"],
        ["世界杯", "/zuqiu/shijiebei/"],
        ["歐洲杯", "/zuqiu/ouzhoubei/"],
        ["意甲", "/zuqiu/yijia/"],
        ["法甲", "/zuqiu/fajia/"],
        ["歐冠", "/zuqiu/ouguan/"],
        ["中超", "/zuqiu/zhongchao/"],
        ["亞洲杯", "/zuqiu/yazhoubei/"],
        ["亞冠", "/zuqiu/yaguan/"],
        ["沙特聯", "/zuqiu/shadilian/"],
        ["美職業", "/zuqiu/meizhiye/"],
        ["日職聯", "/zuqiu/jls/"],
        ["韩K聯", "/zuqiu/kls/"],
        ["中協杯", "/zuqiu/zxb/"],
      ],
    },
    {
      name: "籃球",
      href: "",
      items: [
        ["籃球比賽", "/lanqiu/"],
        ["NBA", "/lanqiu/nba/"],
        ["CBA", "/lanqiu/cba/"],
      ],
    },
    {
      name: "網球",
      href: "/wangqiu/",
      items: [],
    },
    {
      name: "綜合",
      href: "",
      items: [
        ["綜合體育", "/zonghe/"],
        ["UFC", "/zonghe/ufc/"],
        ["電競", "/zonghe/dianjing/"],
      ],
    },
    {
      name: "新聞",
      href: "",
      items: [
        ["新聞", "/news/"],
        ["足球新聞", "/news/zuqiu/"],
        ["籃球新聞", "/news/lanqiu/"],
        ["綜合新聞", "/news/zonghe/"],
        ["網球新聞", "/news/wangqiu/"],
      ],
    },
    {
      name: "頻道",
      href: "",
      items: [
        ["全部頻道", "/channel/"],
        ["CCTV5", "/channel/CCTV5/"],
        ["CCTV5+", "/channel/CCTV5plus/"],
        ["緯來體育", "/channel/wlty/"],
        ["廣東體育", "/channel/gdty/"],
        ["上海體育", "/channel/shty/"],
      ],
    },
    {
      name: "其它",
      href: "",
      items: [
        ["轉會情報", "/transfer/"],
        ["全部賽事", "/saishi/"],
        ["全部比賽", "/all/"],
      ],
    },
  ];

  return (
    <div className="space-y-[20px] rounded-[10px] border border-solid border-border-color p-[20px]">
      {navItems.map(({ name, href, items }, i) => (
        <Frame
          key={i}
          title={name}
          href={href}
          hrefTitle="進入頁面"
          className=""
        >
          <div className="flex flex-wrap gap-[10px] mt-[15px]">
            {items.map(([name, href], itemIdx) => {
              const isActive = isActiveTab(href, router.asPath);
              return (
                <a
                  key={itemIdx}
                  href={href}
                  className={`flex items-center justify-center rounded-[10px] h-[30px] px-[10px] border border-solid ${
                    isActive
                      ? "border-transparent bg-pri-color text-white"
                      : "border-border-color hover:border-sec-color hover:text-sec-color"
                  }`}
                >
                  {name}
                </a>
              );
            })}
          </div>
        </Frame>
      ))}
    </div>
  );
}
