import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  placeholder,
  ImgClassName = "",
  ...props
}) {
  const [error, setError] = useState(false);
  const handleError = () => {
    setError(true);
  };
  const defaultImgWidth = 64;
  const defaultImgHeight = 64;

  const getStyle = (width, height) => {
    const style = {};
    if (typeof width === "string" && width.endsWith("%")) {
      style.width = width;
      style.background = "#F5F5F5";
    } else {
      if (width > defaultImgWidth) {
        style.background = "#F5F5F5";
      }
      style.width = `${width}px`;
    }
    style.height =
      typeof height === "string" && height.endsWith("%")
        ? height
        : `${height}px`;

    return style;
  };
  if (error || !src) {
    const divStyle = getStyle(width, height);
    
    const imgW =
      typeof width === "string" && width.endsWith("%")
        ? defaultImgWidth
        : width > defaultImgWidth
        ? defaultImgWidth
        : width;
    const imgH =
      typeof height === "string" && height.endsWith("%")
        ? defaultImgHeight
        : height > defaultImgHeight
        ? defaultImgHeight
        : height;
    return (
      <div style={divStyle} className={`flex justify-center items-center`}>
        <LazyLoadImage
          alt={alt}
          src={process.env.DEFAULT_ICON}
          width={imgW}
          height={imgH}
          effect="opacity"
          style={{width:`${imgW}px`,height:`${imgH}px`}}
        />
      </div>
    );
  }
  return (
    <LazyLoadImage
      alt={alt}
      src={src}
      width={width}
      height={height}
      effect="opacity"
      wrapperClassName={className}
      className={`box-border w-[inherit] h-[inherit] ${ImgClassName}`}
      placeholderSrc={placeholder || process.env.DEFAULT_ICON}
      onError={handleError}
      {...props}
    />
  );
}
