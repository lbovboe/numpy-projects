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
        className={`group w-[36px] h-[95px] rounded-[10px] overflow-hidden bg-white fixed bottom-[250px] cursor-pointer z-10 min12:right-[30px] max12:right-[25px] shadow-[1px_1px_10px_0px_rgba(32_58_59_0.20)] ${
          showAlways || showButton ? "block" : "hidden"
        }`}
        onClick={handleButtonClick}
      >
        <div className="relative">
          <div className="h-[23px] w-full bg-pri-color"></div>
          <div className="text-center flex items-center justify-center ">
            <div className="w-[16px] font-medium mt-[18px]">頂部</div>
          </div>
          <div className="absolute top-0 translate-x-[5px] p-[1px] translate-y-[10px] rounded-full bg-border-color h-[26px] w-[26px] flex items-center justify-center">
            <div className="group-hover:bg-pri-color rounded-full w-full h-full flex items-center justify-center">
              <svg
                width={20}
                height={20}
                className={` group-hover:fill-white -rotate-90`}
              >
                <use href="#icon-arrow"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
