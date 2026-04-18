"use client";

import { useEffect, useState } from "react";

export function useViewportWidth(): number {
  // Always start at the SSR default so server + client initial render match.
  // useEffect syncs to the real window width on the client after mount.
  const [w, setW] = useState<number>(1440);
  useEffect(() => {
    setW(window.innerWidth);
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setW(window.innerWidth));
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);
  return w;
}

export function useIsMobile() {
  return useViewportWidth() < 760;
}
export function useIsNarrow() {
  return useViewportWidth() < 1040;
}
