import { jsxs as o, Fragment as g, jsx as t } from "react/jsx-runtime";
import * as r from "react";
import { cn as b } from "../lib/utils.mjs";
import { PageTitle as v } from "./page-title.mjs";
const w = r.forwardRef(
  ({ className: l, title: c, subtitle: i, bookmarked: f, onBookmark: m, tabs: n, sticky: e, ...d }, u) => {
    const [x, p] = r.useState(!1), s = r.useRef(null);
    return r.useEffect(() => {
      if (!e || !s.current) return;
      const a = new IntersectionObserver(
        ([h]) => {
          p(!h.isIntersecting);
        },
        { threshold: 0 }
      );
      return a.observe(s.current), () => a.disconnect();
    }, [e]), /* @__PURE__ */ o(g, { children: [
      e && /* @__PURE__ */ t("div", { ref: s, className: "h-0" }),
      /* @__PURE__ */ o(
        "div",
        {
          ref: u,
          className: b(
            "flex items-end w-full",
            e && "sticky top-0 z-30 bg-slate-50 dark:bg-slate-950",
            e && x && "[box-shadow:0_4px_4px_-4px_rgb(0_0_0/0.15)]",
            l
          ),
          ...d,
          children: [
            /* @__PURE__ */ t(
              v,
              {
                title: c,
                subtitle: i,
                bookmarked: f,
                onBookmark: m,
                className: "flex-shrink-0"
              }
            ),
            n && /* @__PURE__ */ t("div", { className: "flex-1 min-w-0 ml-2 overflow-x-auto scrollbar-hide", children: n })
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
