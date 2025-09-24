import LazyImage from "../../tools/lazy_image";
import Frame from "../../tools/Frame";
import "swiper/swiper-bundle.min.css";
import ImageTextButtonList from "../sharedButtonCards/ImageTextButtonList";
export default function HotSaishi({ data }) {
  return (
    data && (
      <Frame
        title="熱門賽事"
        href="/saishi/"
        iconName="icon_saishi_hot"
      >
        <ImageTextButtonList data={data}></ImageTextButtonList>
      </Frame>
    )
  );
}
