import LazyImage from "../../tools/lazy_image";
import Frame from "../../tools/Frame";

export default function HotSaishi({ data }) {
  return (
    <>
      <Frame title="熱門賽事" href="/saishi/">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-[12px] mt-[15px]">
          {data?.map((ele, i) => {
            return (
              <a
                href={ele.url}
                target="_self"
                key={i}
                className="flex flex-col items-center justify-center gap-y-[5px] px-[20px] py-[8px] rounded-[10px] border border-solid border-border-color hover:border-sec-color hover:text-sec-color"
              >
                <LazyImage
                  src={ele.icon}
                  alt={ele.name}
                  width={40}
                  height={40}
                  className="rounded-[2px] overflow-hidden"
                />
                <p className="truncate text-center w-full">{ele.name}</p>
              </a>
            );
          })}
        </div>
      </Frame>
    </>
  );
}
