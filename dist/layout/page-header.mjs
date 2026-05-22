import { jsxs as l, Fragment as g, jsx as r } from "react/jsx-runtime";
import * as s from "react";
import { cn as v } from "../lib/utils.mjs";
import { PageTitle as b } from "./page-title.mjs";
const w = s.forwardRef(
  ({ className: o, title: i, subtitle: c, bookmarked: f, onBookmark: d, tabs: n, sticky: e, ...m }, u) => {
    const [x, h] = s.useState(!1), t = s.useRef(null);
    return s.useEffect(() => {
      if (!e || !t.current) return;
      const a = new IntersectionObserver(
        ([p]) => {
          h(!p.isIntersecting);
        },
        { threshold: 0 }
      );
      return a.observe(t.current), () => a.disconnect();
    }, [e]), /* @__PURE__ */ l(g, { children: [
      e && /* @__PURE__ */ r("div", { ref: t, className: "h-0" }),
      /* @__PURE__ */ l(
        "div",
        {
          ref: u,
          className: v(
            "flex items-end w-full",
            e && "sticky top-0 z-30 bg-slate-50 dark:bg-slate-950",
            e && x && "[box-shadow:0_4px_4px_-4px_rgb(0_0_0/0.15)]",
            o
          ),
          ...m,
          children: [
            /* @__PURE__ */ r(
              b,
              {
                title: i,
                subtitle: c,
                bookmarked: f,
                onBookmark: d,
                className: "flex-shrink-0"
              }
            ),
            n && /* @__PURE__ */ r("div", { className: "flex flex-1 min-w-0 ml-2 justify-end overflow-x-auto scrollbar-hide", children: /* @__PURE__ */ r("div", { className: "shrink-0", children: n }) })
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
