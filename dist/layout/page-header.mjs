import { jsxs as i, Fragment as E, jsx as t } from "react/jsx-runtime";
import * as s from "react";
import { cn as I } from "../lib/utils.mjs";
import { LeftIcon as m } from "../icons/LeftIcon.mjs";
import { Button as u } from "../components/ui/button.mjs";
import { PageTitle as P } from "./page-title.mjs";
const W = s.forwardRef(
  ({ className: h, title: v, subtitle: x, bookmarked: p, onBookmark: b, tabs: o, sticky: l, ...g }, S) => {
    const [N, R] = s.useState(!1), c = s.useRef(null), a = s.useRef(null), [w, k] = s.useState(!1), [z, L] = s.useState(!1);
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
        const { scrollLeft: d, scrollWidth: _, clientWidth: C } = e;
        k(d > 0), L(d + C < _ - 1);
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
    return /* @__PURE__ */ i(E, { children: [
      l && /* @__PURE__ */ t("div", { ref: c, className: "h-0" }),
      /* @__PURE__ */ i(
        "div",
        {
          ref: S,
          className: I(
            "flex items-end w-full",
            l && "sticky top-0 z-30 bg-slate-50 dark:bg-slate-950",
            l && N && "[box-shadow:0_4px_4px_-4px_rgb(0_0_0/0.15)]",
            h
          ),
          ...g,
          children: [
            /* @__PURE__ */ t(
              P,
              {
                title: v,
                subtitle: x,
                bookmarked: p,
                onBookmark: b,
                className: "flex-shrink-0"
              }
            ),
            o && /* @__PURE__ */ i("div", { className: "flex flex-1 min-w-0 ml-2 items-end", children: [
              w && /* @__PURE__ */ t(
                u,
                {
                  variant: "text",
                  size: "icon",
                  onClick: () => f("left"),
                  "aria-label": "탭 왼쪽으로 스크롤",
                  className: "shrink-0",
                  children: /* @__PURE__ */ t(m, { size: 24 })
                }
              ),
              /* @__PURE__ */ t(
                "div",
                {
                  ref: a,
                  className: "flex flex-1 min-w-0 overflow-x-auto scrollbar-hide",
                  children: /* @__PURE__ */ t("div", { className: "shrink-0 ml-auto", children: o })
                }
              ),
              z && /* @__PURE__ */ t(
                u,
                {
                  variant: "text",
                  size: "icon",
                  onClick: () => f("right"),
                  "aria-label": "탭 오른쪽으로 스크롤",
                  className: "shrink-0",
                  children: /* @__PURE__ */ t(m, { size: 24, className: "rotate-180" })
                }
              )
            ] })
          ]
        }
      )
    ] });
  }
);
W.displayName = "PageHeader";
export {
  W as PageHeader
};
//# sourceMappingURL=page-header.mjs.map
