import LazyImage from "./lazy_image";

export default function NoDataFound({ Iwidth, IHeight, cHeight }) {
  return (
    <div
      className="flex justify-center items-center flex-col gap-[10px] text-[14px] text-[#999]"
      style={{ height: `${cHeight || "100px"}` }}
    >
      <LazyImage
        src={"/images/nodata.png"}
        alt="no data found"
        width={Iwidth || 30}
        height={IHeight || 30}
      />
      <p>暂无数据</p>
    </div>
  );
}