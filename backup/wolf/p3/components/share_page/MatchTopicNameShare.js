import LastUpdate from "../tools/last_update";
import MatchContainer from "../contain/matchCards/MatchContainer";
import Frame from "../tools/Frame";
import ArticleImage from "../contain/articleCards/ArticleImage";
import RecomMatches from "../contain/matchCards/RecomMatches";

export default function MatchTopicNameShare({ data, children }) {
  const matchData = data?.matches;
  return (
    <>
      {children}
      <div className="flex gap-x-[20px] flex-wrap mt-[20px]">
        <div className="min12:max-w-[790px] w-full space-y-[20px]">
          <div className="space-y-[20px]">
            <Frame title={`${data.topic}比賽`}>
              <MatchContainer data={matchData} />
            </Frame>
            {data.newsData?.length > 0 && (
              <Frame title={`熱門新聞`}>
                <div className="grid grid-cols-2 gap-[15px] mt-[15px]">
                  {data?.newsData?.map((news, i) => (
                    <ArticleImage key={i} data={news} />
                  ))}
                </div>
              </Frame>
            )}
          </div>
        </div>
        <div className="min12:max-w-[390px] w-full space-y-[20px]">
          <RecomMatches
            data={data.hotMatches}
            title={`${data.topic}賽事集錦`}
            layout=""
          />
        </div>
      </div>
    </>
  );
}
