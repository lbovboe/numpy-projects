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
        className={`w-[30px] h-[30px] rounded-[5px] bg-pri-color hover:bg-sec-color fixed bottom-[200px] cursor-pointer z-10 min12:right-[calc(calc(calc(100%_-_1200px)_/_2)_-_70px)] max12:right-[25px] ${
          showAlways || showButton
            ? "flex justify-center items-center"
            : "hidden"
        }`}
        onClick={handleButtonClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="15"
          viewBox="0 0 18 15"
          fill="none"
          className="mb-[1px]"
        >
          <path
            d="M3.76953 11.6162C3.30896 11.9921 2.62954 11.9655 2.2002 11.5361L2.11914 11.4473C1.76846 11.0175 1.76855 10.3967 2.11914 9.9668L2.2002 9.87793L8.17187 3.90527C8.40076 3.67666 8.70142 3.5625 9.00098 3.5625C9.26331 3.56252 9.52637 3.65007 9.74121 3.8252L9.83008 3.90625L15.8018 9.87793C16.2597 10.3359 16.2597 11.0783 15.8018 11.5361L15.7129 11.6172C15.2524 11.9927 14.5729 11.9653 14.1436 11.5361L9.00098 6.39355L3.8584 11.5361L3.76953 11.6162Z"
            fill="white"
            stroke="white"
            strokeWidth="0.4"
          />
        </svg>
      </div>
    </>
  );
}
