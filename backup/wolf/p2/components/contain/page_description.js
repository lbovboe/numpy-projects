import Frame from "../tools/Frame";

export default function PageDescription({ desc, title }) {
  return (
    <Frame title={`${title}賽事簡介`} iconName="icon_desc">
      <p
        className="text-[14px] leading-[28px] text-[#888]"
        dangerouslySetInnerHTML={{ __html: desc }}
      ></p>
    </Frame>
  );
}
