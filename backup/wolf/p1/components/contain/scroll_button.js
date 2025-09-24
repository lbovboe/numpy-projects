import { useState, useEffect } from "react";
import LazyImage from "../tools/lazy_image";

export default function ScrollButton({ showAlways = false }) {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY === 0;
      if (window.scrollY >= 700 && !isTop) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div
        className={`group w-[20px] h-max hover:text-sec-color fixed bottom-[200px] cursor-pointer z-10 min12:right-[calc(calc(calc(100%_-_1200px)_/_2)_-_70px)] max12:right-[25px] ${
          showAlways || showButton
            ? "flex flex-col justify-center items-center gap-[5px]"
            : "hidden"
        }`}
        onClick={handleButtonClick}
      >
        <svg width={12} height={12} className="-rotate-90 fill-text-color group-hover:fill-sec-color">
          <use href="#icon-more"></use>
        </svg>
        <p className="text-center">回到頂部</p>
      </div>
    </>
  );
}
