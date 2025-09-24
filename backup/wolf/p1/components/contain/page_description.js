import Frame from "../tools/Frame";
export default function PageDescription({ desc, title }) {
  return (
    <Frame title={title+'賽事簡介'}>
      <p className="leading-[24px]" dangerouslySetInnerHTML={{ __html: desc }}></p>
    </Frame>
  );
}
