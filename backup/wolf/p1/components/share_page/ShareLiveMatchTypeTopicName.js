import { useEffect, useState } from "react";
import DetailsCard from "../contain/details-card/details_content";
import TopContentCard from "../contain/details-card/top_content_card";
import { enc, AES } from "crypto-js";
import StreamCard from "../contain/details-card/streams_card";

export default function ShareLiveMatchTypeTopicName({ data }) {
  const [dataCard, setDataCard] = useState(data.carddataA);
  const [triggerUpdate, setTriggerUpdate] = useState(null);
  useEffect(() => {
    if (data.locData && data.locationCheck && data?.carddata?.MatchLives) {
      const locData = JSON.parse(AES.decrypt(data.locData, process.env.ENCRYPT_KEY).toString(enc.Utf8));
      const isShow =
        locData.regions.includes(data.locationCheck.pos) || locData.ip.includes(data.locationCheck.ip) ? false : true;
      data.carddata.MatchLives = data.carddata.MatchLives.filter((item1) => {
        return isShow || item1.vendor_id === 5;
      });
      setDataCard(data.carddata);
      setTriggerUpdate("Y");
    }
  }, [data]);

  return (
    <div className="space-y-[20px]">
      <TopContentCard
        data={dataCard}
        matchType={data.matchType}
        topicName={data.topicName}
      />
      <StreamCard data={dataCard} />
      <DetailsCard
        data={data}
        matchType={data.matchType}
      />
    </div>
  );
}
