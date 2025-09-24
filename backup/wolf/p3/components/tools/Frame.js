export default function Frame({
  title = "",
  href = "",
  hrefTitle = "更多",
  titleSize = "text-[18px]",
  className = "p-[20px]",
  children,
  options,
}) {
  return (
    <div
      className={`rounded-[10px] border border-solid border-border-color ${className}`}
    >
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-[3px]">
        {title && (
          <div className="flex items-center gap-x-[6px]">
            <div className="flex flex-col items-center justify-between h-[16px]">
              <div className="w-[6px] h-[6px] rounded-full bg-pri-color" />
              <div className="w-[6px] h-[6px] rounded-full bg-sec-color" />
            </div>
            <h2 className={`leading-[25px] ${titleSize}`}>{title}</h2>
          </div>
        )}
        <div className="flex items-center justify-end">
          {options}
          {href && (
            <a
              href={href}
              className="group flex items-center gap-x-[5px] text-pri-color hover:text-sec-color leading-[20px]"
            >
              <p className="truncate">{hrefTitle}</p>
              <div className="flex items-center justify-center rounded-[5px] w-[18px] h-[18px] bg-pri-color group-hover:bg-sec-color">
                <svg
                  width={10}
                  height={10}
                  className="fill-white stroke-white pl-[1px]"
                >
                  <use href="#arrow-right"></use>
                </svg>
              </div>
            </a>
          )}
        </div>
      </div>
      <hr className="mt-[10px] border-border-color" />
      <div className={`relative mt-[15px]`}>{children}</div>
    </div>
  );
}
