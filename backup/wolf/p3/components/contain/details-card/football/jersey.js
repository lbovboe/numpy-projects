import LazyImage from "../../../tools/lazy_image";

export default function Jersey({ number, side }) {
  return (
    <div className="relative w-[23px] h-[22px]">
      <LazyImage
        width={23}
        height={22}
        src={
          side === "home"
            ? "/images/jersey_home.png"
            : "/images/jersey_away.png"
        }
      />
      <p
        className="absolute inset-0 mx-auto top-[6px] w-max z-[2] text-[9px] tracking-[0.4px] font-['PingFang_SC','Arial']"
        style={{ color: "white" }}
      >
        {number}
      </p>
    </div>
  );
}
