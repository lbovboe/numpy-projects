import { useEffect, useRef, useState } from "react";

export default function OverflowSlideDiv({ text, position, className }) {
  const divRef = useRef(null);
  const pRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(null);
  useEffect(() => {
    const checkOverflow = () => {
      if (divRef.current && pRef.current) {
        const isOverflow = pRef.current.scrollWidth > divRef.current.clientWidth;
        setIsOverflowing(isOverflow);
        if (isOverflow) {
          const overflowDistance = divRef.current.clientWidth - pRef.current.scrollWidth;
          pRef.current.style.setProperty("--slide-distance", `${overflowDistance}px`);
          const duration = (overflowDistance * -1) / 50;
          pRef.current.style.setProperty("--slide-speed", `${duration}s`);
        } else {
          pRef.current.style.setProperty("--slide-distance", `0px`);
          pRef.current.style.setProperty("--slide-speed", `0s`);
        }
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <div className={`${className} w-full overflow-hidden`}>
      <div ref={divRef} className={`  ${position == "end" ? `justify-end` : `justify-start`} w-full `}>
        <p
          ref={pRef}
          className={`${isOverflowing ? `group-hover:animate-slide group-hover:overflow-visible` : ``} truncate mx-auto w-full group-hover:text-sec-color`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
