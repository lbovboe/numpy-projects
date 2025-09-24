import { useState } from "react";
import Frame from "../tools/Frame";
import FrameOptions from "../tools/FrameOptions";
export default function SaishiSideCard({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    data && (
      <>
        <Frame title="賽事推薦">
          <FrameOptions
            list={data.map((ele) => ele.title)}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-[12px] mt-[15px]">
            {data[activeIndex]?.competitions &&
              data[activeIndex]?.competitions.map((saishi, i) => (
                <a
                  href={`/${saishi.match_type}/${saishi.topic_name}/`}
                  key={i}
                  target={saishi.is_internal_link ? "_self" : "_blank"}
                  className="h-[36px] flex flex-col items-center justify-center gap-y-[5px] px-[20px] py-[8px] rounded-[10px] border border-solid border-border-color hover:border-sec-color hover:text-sec-color"
                >
                  <p className="truncate text-center leading-[20px]">{saishi.name_abbr || saishi.title}</p>
                </a>
              ))}
          </div>
        </Frame>
      </>
    )
  );
}
