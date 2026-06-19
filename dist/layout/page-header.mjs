import { jsxs as i, Fragment as P, jsx as t } from "react/jsx-runtime";
import * as s from "react";
import { cn as m } from "../lib/utils.mjs";
import { LeftIcon as h } from "../icons/LeftIcon.mjs";
import { Button as u } from "../components/ui/button.mjs";
import { PageTitle as W } from "./page-title.mjs";
const j = s.forwardRef(
  ({ className: v, title: x, subtitle: p, bookmarked: b, onBookmark: g, tabs: o, tabsAlign: S = "end", sticky: l, ...N }, _) => {
    const [w, R] = s.useState(!1), c = s.useRef(null), a = s.useRef(null), [k, z] = s.useState(!1), [L, C] = s.useState(!1);
    s.useEffect(() => {
      if (!l || !c.current) return;
      const e = new IntersectionObserver(
        ([r]) => {
          R(!r.isIntersecting);
        },
        { threshold: 0 }
      );
      return e.observe(c.current), () => e.disconnect();
    }, [l]), s.useEffect(() => {
      const e = a.current;
      if (!e || !o) return;
      const r = () => {
        const { scrollLeft: d, scrollWidth: E, clientWidth: I } = e;
        z(d > 0), C(d + I < E - 1);
      };
      r(), e.addEventListener("scroll", r);
      const n = new ResizeObserver(r);
      return n.observe(e), () => {
        e.removeEventListener("scroll", r), n.disconnect();
      };
    }, [o]);
    const f = (e) => {
      const r = a.current;
      if (!r) return;
      const n = r.clientWidth * 0.7;
      r.scrollBy({ left: e === "left" ? -n : n, behavior: "smooth" });
    };
    return /* @__PURE__ */ i(P, { children: [
      l && /* @__PURE__ */ t("div", { ref: c, className: "h-0" }),
      /* @__PURE__ */ i(
        "div",
        {
          ref: _,
          className: m(
            "flex items-end w-full",
            l && "sticky top-0 z-30 bg-slate-50 dark:bg-slate-950",
            l && w && "[box-shadow:0_4px_4px_-4px_rgb(0_0_0/0.15)]",
            v
          ),
          ...N,
          children: [
            /* @__PURE__ */ t(
              W,
              {
                title: x,
                subtitle: p,
                bookmarked: b,
                onBookmark: g,
                className: "flex-shrink-0"
              }
            ),
            o && /* @__PURE__ */ i("div", { className: "flex flex-1 min-w-0 ml-2 items-end shadow-[inset_0_-1px_0_var(--color-border)]", children: [
              k && /* @__PURE__ */ t(
                u,
                {
                  variant: "text",
                  size: "icon",
                  onClick: () => f("left"),
                  "aria-label": "탭 왼쪽으로 스크롤",
                  className: "shrink-0",
                  children: /* @__PURE__ */ t(h, { size: 24 })
                }
              ),
              /* @__PURE__ */ t(
                "div",
                {
                  ref: a,
                  className: "flex flex-1 min-w-0 overflow-x-auto scrollbar-hide",
                  children: /* @__PURE__ */ t("div", { className: m("shrink-0", S === "end" && "ml-auto"), children: o })
                }
              ),
              L && /* @__PURE__ */ t(
                u,
                {
                  variant: "text",
                  size: "icon",
                  onClick: () => f("right"),
                  "aria-label": "탭 오른쪽으로 스크롤",
                  className: "shrink-0",
                  children: /* @__PURE__ */ t(h, { size: 24, className: "rotate-180" })
                }
              )
            ] })
          ]
        }
      )
    ] });
  }
);
j.displayName = "PageHeader";
export {
  j as PageHeader
};
//# sourceMappingURL=page-header.mjs.map
