import { useRef } from "react";

export default function Frame({
  title = "",
  href = "",
  hrefTitle = "更多",
  titleSize = "text-[18px]",
  className = "rounded-[10px] border border-solid border-border-color p-[20px]",
  children,
  options,
}) {
  const ref = useRef();
  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-[3px]">
        {title && (
          <div
            ref={ref}
            className={`leading-[25px] ${titleSize}`}
          >
            {title}
          </div>
        )}
        <div>
          {options}
          {href && (
            <a
              href={href}
              className="group flex items-center justify-end gap-x-[5px] hover:text-sec-color leading-[20px]"
            >
              <svg
                width={12}
                height={12}
                className="group-hover:fill-sec-color"
              >
                <use href="#icon-more"></use>
              </svg>
              <p className="truncate">{hrefTitle}</p>

            </a>
          )}
        </div>
      </div>
      <div className="relative mt-[5px] mb-[10px]">
        <div
          className={`relative z-[1] grid grid-cols-3`}
          style={{ width: ref?.current?.offsetWidth || "36px" }}
        >
          <div className="h-[5px] w-full bg-text-color rounded-l-full" />
          <div className="h-[5px] w-full bg-pri-color" />
          <div className="h-[5px] w-full bg-border-color rounded-tr-[2px]" />
        </div>
        <div className="absolute left-0 bottom-0 w-full h-[2px] rounded-full bg-bg-color"></div>
      </div>
      <div className={`relative`}>{children}</div>
    </div>
  );
}
