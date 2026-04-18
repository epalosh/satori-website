"use client";

import { useEffect } from "react";

const CAL_LINK = "arnav-shah-satori";
const NAMESPACE = "demo";

declare global {
  interface Window {
    Cal?: unknown;
  }
}

type CalApi = {
  (...args: unknown[]): void;
  loaded?: boolean;
  q?: unknown[];
  ns?: Record<string, CalApi>;
};

export default function BookDemo() {
  useEffect(() => {
    (function (C: Window, A: string, L: string) {
      const p = (a: CalApi, ar: unknown) => { a.q!.push(ar); };
      const d = C.document;
      const cal: CalApi = (C.Cal as CalApi) || ((...args: unknown[]) => {
        const calInner = C.Cal as CalApi;
        if (!calInner.loaded) {
          calInner.ns = {};
          calInner.q = calInner.q || [];
          d.head.appendChild(d.createElement("script")).setAttribute("src", A);
          calInner.loaded = true;
        }
        if (args[0] === L) {
          const api: CalApi = ((...inner: unknown[]) => { p(api, inner); }) as CalApi;
          const namespace = args[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            calInner.ns![namespace] = calInner.ns![namespace] || api;
            p(calInner.ns![namespace], args);
            p(calInner, ["initNamespace", namespace]);
          } else {
            p(calInner, args);
          }
          return;
        }
        p(calInner, args);
      }) as CalApi;
      if (!C.Cal) {
        C.Cal = cal;
        cal.q = cal.q || [];
      }
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = window.Cal as CalApi;
    Cal("init", NAMESPACE, { origin: "https://cal.com" });
    Cal.ns![NAMESPACE]("inline", {
      elementOrSelector: "#book-demo-embed",
      config: { layout: "month_view", theme: "dark" },
      calLink: CAL_LINK,
    });
    Cal.ns![NAMESPACE]("ui", {
      cssVarsPerTheme: {
        light: { "cal-brand": "#14b8a6" },
        dark: { "cal-brand": "#14b8a6" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
      theme: "dark",
    });
  }, []);

  return (
    <section id="book-demo" style={{ padding: "64px 0" }}>
      <div className="container">
        <h2
          className="h-xl"
          style={{
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          Book a <span style={{ color: "#14b8a6" }}>product demo</span>.
        </h2>
        <div
          id="book-demo-embed"
          style={{
            width: "100%",
            maxWidth: 560,
            margin: "0 auto",
            minHeight: 420,
          }}
        />
      </div>
    </section>
  );
}
