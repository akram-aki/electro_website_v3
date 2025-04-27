// src/hooks/useImagePreloader.js
import { useState, useEffect } from "react";

export function useImagePreloader(imageSources) {
  const [loaded, setLoaded] = useState(false);
  const [cache, setCache] = useState(new Map());

  useEffect(() => {
    let isMounted = true;
    const newCache = new Map();
    let loadedCount = 0;

    imageSources.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        newCache.set(src, img);
        loadedCount++;
        if (loadedCount === imageSources.length && isMounted) {
          setCache(newCache);
          setLoaded(true);
        }
      };
      img.onerror = () => {
        // Even if an image fails, continue
        newCache.set(src, img);
        loadedCount++;
        if (loadedCount === imageSources.length && isMounted) {
          setCache(newCache);
          setLoaded(true);
        }
      };
    });

    return () => {
      isMounted = false;
    };
  }, [imageSources]);

  return { loaded, cache };
}
