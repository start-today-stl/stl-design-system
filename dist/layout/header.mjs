import { jsxs as o, jsx as t } from "react/jsx-runtime";
import * as l from "react";
import { cn as g } from "../lib/utils.mjs";
import { LeftIcon as N } from "../icons/LeftIcon.mjs";
import { RightIcon as R } from "../icons/RightIcon.mjs";
const S = l.forwardRef(
  ({ className: x, search: m, recentVisits: n, actions: i, children: h, ...d }, p) => {
    const s = l.useRef(null), [u, b] = l.useState(!1), [v, w] = l.useState(!1), a = l.useCallback(() => {
      const r = s.current;
      if (!r) return;
      const { scrollLeft: e, scrollWidth: c, clientWidth: k } = r;
      b(e > 0), w(e < c - k - 1);
    }, []);
    l.useEffect(() => {
      a();
      const r = s.current;
      if (!r) return;
      const e = new ResizeObserver(a);
      return e.observe(r), () => e.disconnect();
    }, [a, n]);
    const f = (r) => {
      const e = s.current;
      if (!e) return;
      const c = 100;
      e.scrollBy({
        left: r === "left" ? -c : c,
        behavior: "smooth"
      });
    };
    return /* @__PURE__ */ o(
      "div",
      {
        ref: p,
        className: g(
          "flex items-center gap-4 w-full h-[100px] px-6 pt-8 pb-4",
          "bg-slate-50 dark:bg-slate-950 backdrop-blur-[16px]",
          x
        ),
        ...d,
        children: [
          /* @__PURE__ */ t("div", { className: "flex-1 min-w-[200px] max-w-[593px]", children: m || h }),
          n && /* @__PURE__ */ o("div", { className: "flex items-center gap-1.5 flex-1 min-w-[150px] max-w-[400px]", children: [
            /* @__PURE__ */ t("span", { className: "text-xs text-slate-700 dark:text-slate-300 tracking-[-0.12px] whitespace-nowrap", children: "최근 방문" }),
            /* @__PURE__ */ o("div", { className: "flex items-center gap-1 flex-1 min-w-0", children: [
              u && /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => f("left"),
                  className: "flex-shrink-0 flex items-center justify-center w-6 h-6 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300",
                  "aria-label": "스크롤 왼쪽",
                  children: /* @__PURE__ */ t(N, { size: 24 })
                }
              ),
              /* @__PURE__ */ t(
                "div",
                {
                  ref: s,
                  onScroll: a,
                  className: "flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-1 min-w-0",
                  children: n
                }
              ),
              v && /* @__PURE__ */ t(
                "button",
                {
                  type: "button",
                  onClick: () => f("right"),
                  className: "flex-shrink-0 flex items-center justify-center w-6 h-6 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300",
                  "aria-label": "스크롤 오른쪽",
                  children: /* @__PURE__ */ t(R, { size: 24 })
                }
              )
            ] })
          ] }),
          i && /* @__PURE__ */ t("div", { className: "flex items-center gap-2 flex-shrink-0 ml-auto", children: i })
        ]
      }
    );
  }
);
S.displayName = "Header";
export {
  S as Header
};
//# sourceMappingURL=header.mjs.map
