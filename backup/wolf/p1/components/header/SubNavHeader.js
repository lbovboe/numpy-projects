export default function SubNavHeader({ tags = [], title = "" }) {
  return (
    <div className="flex justify-between items-center gap-x-[30px] mt-[30px] whitespace-nowrap w-full">
      <div className="flex gap-x-[10px] leading-[20px] max12:mx-[20px] min-w-0">
        <a href="/" className="text-pri-color hover:text-sec-color">
          首頁
        </a>
        {tags?.length > 0 &&
          tags.map(([href, name], index) => (
            <div key={index}>
              <span className="">– </span>
              <a href={href}>
                <span className={`text-pri-color hover:text-sec-color`}>
                  {name}
                </span>
              </a>
            </div>
          ))}
        {title && (
          <>
            <span className="">–</span>
            <span className="truncate">{title}</span>
          </>
        )}
      </div>
    </div>
  );
}
