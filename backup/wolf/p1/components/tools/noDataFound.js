import LazyImage from "./lazy_image";

export default function NoDataFound({ Iwidth, IHeight, cHeight }) {
  return (
    <div
      className="flex justify-center items-center flex-col gap-[10px] text-[14px] text-[#888]"
      style={{ height: `${cHeight || "100px"}` }}
    >
      <LazyImage
        src={"/images/nodata.png"}
        alt="no data found"
        width={Iwidth || 40}
        height={IHeight || 40}
      />
      <p>暫無數據</p>
    </div>
  );
}