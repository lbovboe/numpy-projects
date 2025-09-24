import { useEffect, useState } from "react";
import DetailsCard from "../contain/details-card/details_content";
import TopContentCard from "../contain/details-card/top_content_card";
import { enc, AES } from "crypto-js";
import StreamCard from "../contain/details-card/streams_card";
import Frame from "../tools/Frame";
import ArticleList from "../contain/articleCards/ArticleList";
import MatchSideContainer from "../contain/matchCards/MatchSideContainer";
import LastUpdate from "../tools/last_update";

export default function ShareLiveMatchTypeTopicName({ data }) {
  const [dataCard, setDataCard] = useState(data.carddataA);
  const [triggerUpdate, setTriggerUpdate] = useState(null);
  useEffect(() => {
    if (data.locData && data.locationCheck && data?.carddata?.MatchLives) {
      const locData = JSON.parse(
        AES.decrypt(data.locData, process.env.ENCRYPT_KEY).toString(enc.Utf8)
      );
      const isShow =
        locData.regions.includes(data.locationCheck.pos) ||
        locData.ip.includes(data.locationCheck.ip)
          ? false
          : true;
      data.carddata.MatchLives = data.carddata.MatchLives.filter((item1) => {
        return isShow || item1.vendor_id === 5;
      });
      setDataCard(data.carddata);
      setTriggerUpdate("Y");
    }
  }, [data]);
  return (
    <div className="mt-[30px]">
      <TopContentCard
        data={dataCard}
        matchType={data.matchType}
        topicName={data.topicName}
      />
      <div className="flex flex-wrap gap-[20px] w-full mt-[25px]">
        <div className="min12:max-w-[790px] w-full flex flex-col gap-[25px]">
          <StreamCard data={dataCard} />
          <DetailsCard data={data} matchType={data.matchType} />
        </div>
        <div className="min12:max-w-[390px] w-full flex flex-col gap-[20px]">
          <MatchSideContainer
            data={data.hotMatches}
            href={"/" + data.otherType + "/"}
          />
        </div>
      </div>
      {/* <LastUpdate lastUpdate={data.lastUpdate} /> */}
    </div>
  );
}
