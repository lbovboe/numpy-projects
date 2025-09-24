import Frame from "../tools/Frame";

export default function PageDescription({ desc, title }) {
  return (
    <Frame title={`${title}賽事簡介`}>
      <p
        className="text-[14px] leading-[26px]"
        dangerouslySetInnerHTML={{ __html: desc }}
      ></p>
    </Frame>
  );
}
