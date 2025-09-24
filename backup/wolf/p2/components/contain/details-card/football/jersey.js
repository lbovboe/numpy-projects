import LazyImage from "../../../tools/lazy_image";

export default function Jersey({ number, side }) {
  return (
    <div className="relative w-[30px] h-[30px]">
      <LazyImage
        width={30}
        height={30}
        src={
          side === "home"
            ? "/images/jersey_home.png"
            : "/images/jersey_away.png"
        }
      />
      <p
        className="absolute inset-0 mx-auto top-[10px] w-max z-[2] text-[12px] tracking-[0.3px] font-semibold font-['Chakra_Petch','Arial']"
        style={{ color: "white" }}
      >
        {number}
      </p>
    </div>
  );
}
