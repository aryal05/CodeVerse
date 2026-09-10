'use client';

import { useState } from 'react';
import Image from 'next/image';

// Cloudinary already provides a global image CDN and on-the-fly transforms.
// Sending its large source PNGs through Next's optimizer adds a second network
// hop and can hit Next's upstream timeout. A custom loader lets the browser
// request a correctly sized WebP/AVIF-capable asset from Cloudinary directly.
const cloudinaryLoader = ({ src, width, quality }) => {
  if (!src?.includes('res.cloudinary.com') || !src.includes('/image/upload/')) {
    return src;
  }

  const transformation = `f_auto,q_${quality || 'auto'},w_${width},c_limit,dpr_auto`;
  return src.replace('/image/upload/', `/image/upload/${transformation}/`);
};

/**
 * Optimized Image Component with Cloudinary support
 * Automatically optimizes images for fast loading
 */

export default function OptimizedImage({
  src,
  alt = '',
  width,
  height,
  className = '',
  fill = false,
  priority = false,
  quality = 'auto',
  sizes,
  style,
  onLoad,
  onClick,
  loading = 'lazy',
}) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || error) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-800 ${className}`}
        style={style}
      >
        <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  const handleLoad = (e) => {
    setIsLoading(false);
    if (onLoad) onLoad(e);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  const imgStyle = {
    ...style,
    opacity: isLoading ? 0 : 1,
    transition: 'opacity 300ms',
  };

  const imageProps = {
    src,
    alt,
    className,
    style: imgStyle,
    onLoad: handleLoad,
    onError: handleError,
    onClick,
    quality: typeof quality === 'number' ? quality : 75,
    ...(String(src).includes('res.cloudinary.com')
      ? { loader: cloudinaryLoader }
      : {}),
    ...(fill ? { fill: true, sizes: sizes || '100vw' } : { width, height }),
    ...(priority ? { priority: true } : { loading }),
  };

  return <Image {...imageProps} />;
}
