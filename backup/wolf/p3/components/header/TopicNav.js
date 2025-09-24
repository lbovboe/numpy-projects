import { useRouter } from "next/router";

const isActiveTab = (href, path) => {
  return href === path;
};

export default function TopicNav({ baseUrl }) {
  const router = useRouter();
  const topics = [
    { name: "比賽", href: baseUrl + "/", icon: "trophy" },
    { name: "集錦", href: baseUrl + "/playback/", icon: "playback" },
  ];
  return (
    <div className="w-full flex justify-center items-center gap-x-[30px] rounded-[10px] border border-solid border-border-color h-[46px]">
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
              width="18"
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
