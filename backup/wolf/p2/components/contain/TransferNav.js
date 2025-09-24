import { useRouter } from "next/router";
export default function TransferNav() {
  const subMenu = [
    {
      name: "足球",
      href: "/transfer_soccer/",
    },
    {
      name: "籃球",
      href: "/transfer_basketball/",
    },
  ];
  const router = useRouter();
  return (
    <div className="bg-pri-color rounded-[10px] px-[6px] py-[5px] inline-flex">
      {subMenu.map((ele, i) => (
        <a
          href={ele.href}
          key={i}
          className={`flex items-center justify-center rounded-[10px] py-[4px] px-[12px] ${
            router.asPath.includes(ele.href)
              ? "bg-bg-color text-pri-color"
              : "text-white hover:bg-bg-color hover:text-pri-color"
          }`}
        >
          {ele.name}
        </a>
      ))}
    </div>
  );
}
