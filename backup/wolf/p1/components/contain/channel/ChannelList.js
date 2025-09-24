import Frame from "../../tools/Frame";
import LazyImage from "../../tools/lazy_image";

export default function HotChannel({ data, title = "熱門頻道", type = "n" }) {
  return (
    <>
      <Frame title={title}>
        <div
          className={`grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-[12px] mt-[15px]`}
        >
          {data &&
            data.map((channel, i) =>
              type === "n" ? (
                <a
                  href={channel.url || `/channel/${channel.name}/`}
                  key={i}
                  target={channel.is_internal_link ? "_self" : "_blank"}
                  className="flex items-center justify-center gap-y-[5px] px-[20px] py-[7px] rounded-[10px] border border-solid border-border-color hover:border-sec-color hover:text-sec-color"
                >
                  <span className="truncate">{channel.title}</span>
                </a>
              ) : (
                <a
                  href={channel.url || `/channel/${channel.name}/`}
                  key={i}
                  target={channel.is_internal_link ? "_self" : "_blank"}
                  className="flex flex-col items-center justify-center gap-y-[5px] px-[20px] py-[7px] rounded-[10px] border border-solid border-border-color hover:border-sec-color hover:text-sec-color"
                >
                  <LazyImage
                    src={channel.icon}
                    alt={channel.name}
                    width={40}
                    height={40}
                    className="rounded-[2px] overflow-hidden"
                  />
                  <p className="truncate text-center">{channel.title}</p>
                </a>
              )
            )}
        </div>
      </Frame>
    </>
  );
}
