import Frame from "../../tools/Frame";
import { useState } from "react";
import LazyImage from "../../tools/lazy_image";
import FrameOptions from "../../tools/FrameOptions";
export default function DhChannels({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const channels = data?.filter(ele => ele.title!=="推薦熱門頻道") || []
  return (
    <>
      {data && data?.length > 0 && (
        <>
          <Frame title="線上頻道列表" href="/channel/">
            <>
              <FrameOptions
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                list={channels.map((ele) => ele.title)}
              />
              <div className="grid grid-cols-[repeat(auto-fill,minmax(155px,1fr))] gap-[12px] mt-[15px]">
                {channels?.[activeIndex]?.Channels &&
                  channels?.[activeIndex]?.Channels?.map((channel, i) => (
                    <a
                      href={channel.url}
                      key={i}
                      target={channel.is_internal_link ? "_self" : "_blank"}
                      className="flex flex-col items-center justify-center gap-y-[5px] px-[20px] py-[8px] rounded-[10px] border border-solid border-border-color hover:border-sec-color hover:text-sec-color"
                    >
                      <span className="truncate">{channel.title}</span>
                    </a>
                  ))}
              </div>
            </>
          </Frame>
        </>
      )}
    </>
  );
}
