import type { ImgHTMLAttributes } from "react";

type OptimizedImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  alt: string;
  /** Intrinsic width of the default `src` asset (layout reservation). */
  width: number;
  /** Intrinsic height of the default `src` asset (layout reservation). */
  height: number;
};

/**
 * Image helper for Prompt 09: keeps alt text, supports srcset/sizes,
 * and always reserves layout space via width/height.
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  loading = "lazy",
  decoding = "async",
  ...rest
}: OptimizedImageProps) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    loading={loading}
    decoding={decoding}
    {...rest}
  />
);

export default OptimizedImage;
