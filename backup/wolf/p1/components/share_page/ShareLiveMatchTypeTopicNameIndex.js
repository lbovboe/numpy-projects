import PageDescription from "../contain/page_description";
import { getBaseUrl, chunkArray } from "../../public/scripts/publicFunction";
import MatchContainer from "../contain/matchCards/MatchContainer";
import Frame from "../tools/Frame";
import ArticleList from "../contain/articleCards/ArticleList";
import RankingContainer from "../contain/RankingCards/RankingContainer";
import MatchCard from "../contain/matchCards/MatchCard";
import MatchSideSubHeader from "../header/MatchSideSubHeader";
import TransferTable from "../contain/TransferTable";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState, useEffect } from "react";
import "swiper/swiper-bundle.min.css";

export default function ShareLiveMatchTypeTopicNameIndex({ data }) {
  const baseUrl = getBaseUrl(data.matchType, data.topicName);
  const hotMatchesChunks = chunkArray(data?.hotMatches, 3);
  const [activeIdx, setActiveIdx] = useState(0);
  const swiperRef = useRef(null);
  const [showButtons, setShowButtons] = useState({
    prev: false,
    next: true,
  });

  const handlePrevClick = () => {
    if (swiperRef?.current?.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef?.current?.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  const handleBtnClick = (index) => {
    const swiperInstance = swiperRef?.current?.swiper;
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
      setActiveIdx(index);
    }
  };
  useEffect(() => {
    if (swiperRef?.current?.swiper) {
      swiperRef?.current?.swiper.onAny(() => {
        setShowButtons({
          prev: !swiperRef?.current?.swiper.isBeginning,
          next: !swiperRef?.current?.swiper.isEnd,
        });
      });
      const swiperInstance = swiperRef?.current?.swiper;
      const handleSlideChange = () => {
        setActiveIdx(swiperInstance?.activeIndex);
      };
      swiperInstance.on("slideChange", handleSlideChange);
      handleSlideChange();
      return () => {
        swiperInstance.off("slideChange", handleSlideChange);
      };
    }
  }, [swiperRef]);

  return (
    <>
      <MatchSideSubHeader></MatchSideSubHeader>
      <div className="space-y-[20px]">
        <div>
          <MatchContainer
            data={data.matches}
            showDate={true}
          />
        </div>
        {data.newsData?.length > 0 && (
          <Frame
            title={`${data.topic}新聞`}
            href={baseUrl + "/news/"}
          >
            <ArticleList
              data={data.newsData}
              layout="row"
            />
          </Frame>
        )}
        {data.videosData?.length > 0 && (
          <Frame
            title={data?.matchType === "zonghe" ? "熱門集錦" : data.topic + "錄像"}
            href={"/video/" + data?.matchType + "/"}
          >
            <ArticleList
              data={data.videosData}
              layout="row"
              type="video"
            />
          </Frame>
        )}

        {!["dianjing", "aoyunhui", "dongaohui"].includes(data.topicName) && (
          <RankingContainer
            jifen={data.rankData}
            matchType={data.matchType}
            topicName={data.topicName}
            shooter={data.shooterData}
            assist={data.assistData}
          />
        )}
        {data?.transfer && <TransferTable data={data?.transfer}></TransferTable>}
        {(data.matchType === "wangqiu" || data.matchType === "zonghe") &&
          data?.hotMatches &&
          data?.hotMatches.length > 0 && (
            <Frame title={"熱門比賽推薦"}>
              <div className="relative">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={1}
                  ref={swiperRef}
                  className="!mr-0 !ml-0"
                >
                  {hotMatchesChunks.map((chunk, index) => (
                    <SwiperSlide
                      key={index}
                      className="cursor-pointer "
                    >
                      <MatchCard data={chunk} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="flex items-center justify-center mt-[20px] gap-x-[15px]">
                <button
                  onClick={handlePrevClick}
                  disabled={!showButtons.prev}
                >
                  <svg
                    width={20}
                    height={20}
                    className={`h-full ${showButtons.prev ? "fill-[#2F3035] hover:fill-sec-color" : "fill-[#d6d1d1]"}`}
                  >
                    <use href="#swiper-left" />
                  </svg>
                </button>
                <div className="flex items-center gap-x-[10px]">
                  {hotMatchesChunks?.map((match, index) => {
                    return (
                      <div
                        key={index}
                        className="h-[15px] flex cursor-pointer group justify-center items-center"
                        onClick={() => handleBtnClick(index)}
                      >
                        <i
                          className={`w-[8px] h-[8px] block rounded-full group-hover:scale-110 ${
                            activeIdx == index ? `bg-pri-color` : `bg-[#2F3035]`
                          }`}
                        ></i>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={handleNextClick}
                  disabled={!showButtons.next}
                >
                  <svg
                    width={20}
                    height={20}
                    className={`h-full ${showButtons.next ? "fill-[#2F3035] hover:fill-sec-color" : "fill-[#d6d1d1] "}`}
                  >
                    <use href="#swiper-right" />
                  </svg>
                </button>
              </div>
            </Frame>
          )}
        {data.pageDescription && (
          <PageDescription
            desc={data.pageDescription}
            title={data.topic}
          />
        )}
      </div>
    </>
  );
}
