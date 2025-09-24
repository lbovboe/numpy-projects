import { useState } from "react";
import LazyImage from "../../tools/lazy_image";
import { Rank } from "./RankingContainer";
import Frame from "../../tools/Frame";
import Button from "../../tools/Button";
import { chunkArray } from "../../../public/scripts/publicFunction";
export default function UFCRank({ data, title }) {
  const [activeTab, setActiveTab] = useState(0);
  const options = ["男子", "女子"];

  return (
    data && (
      <div>
        <Frame title={title}>
          <div className="flex gap-x-[12px] my-[15px]">
            {options.map((ele, i) => {
              return (
                <Button
                  text={ele}
                  key={i}
                  isActive={activeTab === i}
                  isHover={true}
                  onClick={() => setActiveTab(i)}
                />
              );
            })}
          </div>
          <div className="flex flex-col gap-[20px]">
            {data?.[activeTab]?.List.map((ele, i) => (
              <div
                key={i}
                className="rounded-[5px] overflow-hidden"
              >
                <div
                  className={`gap-x-[15px] min12:gap-x-[10px] bg-pri-color text-white py-[7px] px-[10px] text-[12px] rounded-[10px] whitespace-nowrap h-[33px]`}
                >
                  {ele.type_name}
                </div>
                <div className="flex px-[15px] gap-x-[15px] mt-[15px]">
                  {ele.Players?.slice(0, 1).map((v, i) => (
                    <div
                      className=""
                      key={i}
                    >
                      {i == 0 && (
                        <div className="group py-[12px] shrink-0 w-[180px] h-[148px] rounded-[10px] border border-solid border-border-color flex flex-col justify-center items-center">
                          <div className="h-[50px]">
                            <LazyImage
                              src={v.image}
                              alt={v.name}
                              width={50}
                              height={50}
                              className="rounded-[10px] overflow-hidden "
                            />
                          </div>
                          <div className="flex flex-col gap-y-[4px] mt-[10px]">
                            <div className="flex items-center group-hover:text-ter-color">
                              <span className="truncate text-[16px] leading-[22px] group-hover:text-sec-color">
                                {v.name_cn}
                              </span>
                            </div>
                            <div className="flex items-center justify-center gap-x-[2px] leading-[20px]">
                              <p className=" text-pri-color">冠軍</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="grid grid-cols-3 gap-[15px] w-full">
                    {chunkArray(ele.Players?.slice(1), 5).map((group, index) => {
                      return (
                        <div
                          className="flex flex-col gap-[12px]"
                          key={index}
                        >
                          {group.map((v, i) => (
                            <div
                              key={i}
                              className="gap-x-[15px] flex items-center"
                            >
                              <div
                                className={`group grid grid-cols-[20px_1fr] gap-x-[10px]  hover:text-sec-color items-center`}
                              >
                                <Rank
                                  i={i + index * 5}
                                  rank={i + 1 + index * 5}
                                />
                                <p className="text-[14px] truncate text-start leading-[20px]">{v.name_cn}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Frame>
      </div>
    )
  );
}
