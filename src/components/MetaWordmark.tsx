"use client";

import { useLayoutEffect, useRef } from "react";

export default function MetaWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const fit = () => {
      const el = ref.current;
      if (!el || !el.parentElement) return;
      const longest = el.querySelector<HTMLElement>("[data-measure]");
      if (!longest) return;
      el.style.fontSize = "100px";
      const baseW = longest.getBoundingClientRect().width;
      const targetW = el.parentElement.getBoundingClientRect().width;
      if (baseW > 0) {
        const next = 100 * (targetW / baseW) * 0.995;
        el.style.fontSize = next + "px";
      }
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(document.body);
    window.addEventListener("resize", fit);
    return () => { ro.disconnect(); window.removeEventListener("resize", fit); };
  }, []);
  return (
    <section className="wordmark-section" aria-hidden="true">
      <div className="wordmark-inner">
        <div ref={ref} className="wordmark-text">
          <span>SATORI</span><br /><span data-measure>INFERENCE</span>
        </div>
      </div>
    </section>
  );
}
