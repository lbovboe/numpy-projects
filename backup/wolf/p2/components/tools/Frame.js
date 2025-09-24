import LazyImage from "./lazy_image";

export default function Frame({
  title = "",
  href = "",
  titleSize = "text-[16px]",
  className = "p-[20px]",
  children,
  options,
  isSwiper = false,
  hasBorder = true,
  iconName = "",
}) {
  return (
    <div className={`rounded-[10px] bg-white ${className}`}>
      <div className={`flex items-center ${isSwiper ? "" : "justify-between"} `}>
        {title && (
          <div
            className={`flex items-center gap-x-[8px] rounded-[10px] bg-pri-color pl-[8px] pr-[6px] h-[40px] ${titleSize}`}
          >
            {iconName && (
              <div className="flex items-center justify-center rounded-full w-[18px] h-[18px]">
                <LazyImage
                  src={`/images/${iconName}.png`}
                  width={18}
                  height={18}
                  alt=""
                />
              </div>
            )}
            <div className="rounded-[8px] bg-bg-color px-[12px] py-[4px]">
              <h2 className="text-pri-color font-medium truncate">{title}</h2>
            </div>
          </div>
        )}
        <div className="overflow-hidden">
          {href && (
            <a
              href={href}
              className="group flex items-center place-self-end gap-[5px]"
            >
              <p className="text-pri-color leading-[20px] group-hover:font-bold">更多</p>
              <div className="flex items-center justify-center rounded-full w-[14px] h-[14px] border border-solid border-pri-color group-hover:bg-pri-color fill-pri-color group-hover:fill-white">
                <svg
                  width={20}
                  height={20}
                  className=""
                >
                  <use href="#icon-arrow"></use>
                </svg>
              </div>
            </a>
          )}
          {options}
        </div>
      </div>
      {hasBorder && <hr className="border-border-color my-[15px]" />}
      <div className={`relative`}>{children}</div>
    </div>
  );
}
