import Frame from "../../tools/Frame";
import { useState } from "react";
import LazyImage from "../../tools/lazy_image";
import FrameOptions from "../../tools/FrameOptions";
export default function HotProducts({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      {data && data?.length > 0 && (
        <>
          <Frame title="熱門產品">
            <>
              <FrameOptions
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                list={data.map((ele) => ele.title)}
              />
              <div className="grid grid-cols-[repeat(auto-fill,minmax(178px,1fr))] gap-[12px] mt-[15px]">
                {data?.[activeIndex]?.products &&
                  data?.[activeIndex]?.products?.map((ele, i) => (
                    <a
                      href={ele.url}
                      target="_self"
                      key={i}
                      className="group flex flex-col items-center justify-center gap-y-[5px] hover:text-sec-color"
                    >
                      <div className="flex items-center justify-center w-full px-[20px] py-[8px] rounded-[10px] border border-solid border-border-color group-hover:border-sec-color">
                        <LazyImage
                          src={ele.icon}
                          alt={ele.name}
                          width={40}
                          height={40}
                          className="rounded-[5px] overflow-hidden"
                        />
                      </div>
                      <p className="truncate text-center w-full">{ele.title}</p>
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
