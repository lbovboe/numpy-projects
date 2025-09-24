import Frame from "../../tools/Frame";
import ImageTextButtonList from "../sharedButtonCards/ImageTextButtonList";
export default function ChannelSideCard({ data }) {
  return (
    <Frame
      title="常用頻道"
      href="/channel/"
      iconName="icon_channel"
    >
      <ImageTextButtonList
        data={data?.Channels}
        width={170}
      ></ImageTextButtonList>
    </Frame>
  );
}
