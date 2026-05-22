import { jsxs as n, Fragment as g, jsx as r } from "react/jsx-runtime";
import * as s from "react";
import { cn as v } from "../lib/utils.mjs";
import { PageTitle as b } from "./page-title.mjs";
const w = s.forwardRef(
  ({ className: o, title: i, subtitle: c, bookmarked: f, onBookmark: m, tabs: a, sticky: e, ...d }, u) => {
    const [x, h] = s.useState(!1), t = s.useRef(null);
    return s.useEffect(() => {
      if (!e || !t.current) return;
      const l = new IntersectionObserver(
        ([p]) => {
          h(!p.isIntersecting);
        },
        { threshold: 0 }
      );
      return l.observe(t.current), () => l.disconnect();
    }, [e]), /* @__PURE__ */ n(g, { children: [
      e && /* @__PURE__ */ r("div", { ref: t, className: "h-0" }),
      /* @__PURE__ */ n(
        "div",
        {
          ref: u,
          className: v(
            "flex items-end w-full",
            e && "sticky top-0 z-30 bg-slate-50 dark:bg-slate-950",
            e && x && "[box-shadow:0_4px_4px_-4px_rgb(0_0_0/0.15)]",
            o
          ),
          ...d,
          children: [
            /* @__PURE__ */ r(
              b,
              {
                title: i,
                subtitle: c,
                bookmarked: f,
                onBookmark: m,
                className: "flex-shrink-0"
              }
            ),
            a && /* @__PURE__ */ r("div", { className: "flex flex-1 min-w-0 ml-2 overflow-x-auto scrollbar-hide", children: /* @__PURE__ */ r("div", { className: "shrink-0 ml-auto", children: a }) })
          ]
        }
      )
    ] });
  }
);
w.displayName = "PageHeader";
export {
  w as PageHeader
};
//# sourceMappingURL=page-header.mjs.map
