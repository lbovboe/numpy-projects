import Frame from "../../tools/Frame";
import ImageTextButtonList from "../sharedButtonCards/ImageTextButtonList";
export default function SaishiSideCard({ data }) {
  return (
    <Frame
      title="熱門賽事"
      href="/saishi/"
      iconName="icon_saishi_hot"
    >
      <ImageTextButtonList
        data={data}
        width={170}
      ></ImageTextButtonList>
    </Frame>
  );
}
